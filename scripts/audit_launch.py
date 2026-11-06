"""Collect local launch-audit evidence without changing website files."""
from pathlib import Path
from html.parser import HTMLParser
from collections import Counter
import json
import os
import subprocess
import tempfile
import threading
import time
from urllib.request import urlopen

from check_browser import Browser, PreviewServer, QuietHandler, EDGE

ROOT = Path(__file__).resolve().parent.parent
OUT = ROOT / 'audit'


class Document(HTMLParser):
    def __init__(self):
        super().__init__()
        self.tags = []
        self.title = ''
        self.in_title = False

    def handle_starttag(self, tag, attrs):
        self.tags.append((tag, dict(attrs)))
        if tag == 'title':
            self.in_title = True

    def handle_endtag(self, tag):
        if tag == 'title':
            self.in_title = False

    def handle_data(self, data):
        if self.in_title:
            self.title += data


def main():
    OUT.mkdir(exist_ok=True)
    result = {'pages': [], 'browser': [], 'errors': []}
    public = ROOT / 'dist'
    for path in sorted(public.rglob('*.html')):
        doc = Document()
        doc.feed(path.read_text(encoding='utf-8'))
        metas = {a.get('name', a.get('property', '')): a.get('content') for t, a in doc.tags if t == 'meta'}
        imgs = [a for t, a in doc.tags if t == 'img']
        result['pages'].append({
            'path': path.relative_to(public).as_posix(), 'title': doc.title,
            'description': metas.get('description'), 'og_image': metas.get('og:image'),
            'favicon': [a.get('href') for t, a in doc.tags if t == 'link' and 'icon' in a.get('rel', '')],
            'h1_count': sum(t == 'h1' for t, a in doc.tags),
            'missing_alt': [a.get('src') for a in imgs if 'alt' not in a],
            'empty_alt': [a.get('src') for a in imgs if a.get('alt') == ''],
            'without_dimensions': [a.get('src') for a in imgs if not a.get('width') or not a.get('height')],
            'schema': sum(t == 'script' and a.get('type') == 'application/ld+json' for t, a in doc.tags),
        })
    files = [p for p in (public / 'assets').rglob('*') if p.is_file()]
    result['asset_bytes'] = sum(p.stat().st_size for p in files)
    result['largest_assets'] = [{'path': p.relative_to(public).as_posix(), 'bytes': p.stat().st_size} for p in sorted(files, key=lambda p: p.stat().st_size, reverse=True)[:15]]
    # Serve only the deployment package. Python cannot execute the PHP endpoint.
    import check_browser
    check_browser.ROOT = public
    server = PreviewServer(('127.0.0.1', 0), QuietHandler)
    threading.Thread(target=server.serve_forever, daemon=True).start()
    address = f'http://127.0.0.1:{server.server_port}'
    process = None
    browser = None
    try:
        with tempfile.TemporaryDirectory(prefix='aor-launch-audit-', ignore_cleanup_errors=True) as profile:
            process = subprocess.Popen([str(EDGE), '--headless=new', '--disable-gpu', '--no-first-run', '--no-default-browser-check', '--remote-debugging-port=0', '--remote-allow-origins=*', f'--user-data-dir={profile}', 'about:blank'], stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
            try:
                port_file = Path(profile) / 'DevToolsActivePort'
                for _ in range(100):
                    if port_file.exists():
                        break
                    time.sleep(.1)
                port = port_file.read_text().splitlines()[0]
                pages = json.load(urlopen(f'http://127.0.0.1:{port}/json/list'))
                browser = Browser(next(p['webSocketDebuggerUrl'] for p in pages if p['type'] == 'page'))
                browser.call('Runtime.enable')
                browser.call('Page.enable')
                for lang in ('en', 'ar'):
                    for name in sorted(p.stem for p in public.glob('*.html')):
                        for width, height in ((320, 812), (375, 812), (768, 900), (1024, 900), (1440, 900)):
                            browser.call('Emulation.setDeviceMetricsOverride', {'width': width, 'height': height, 'deviceScaleFactor': 1, 'mobile': width < 500})
                            browser.call('Page.navigate', {'url': f'{address}/{lang}/{name}.html'})
                            browser.evaluate("new Promise(resolve => {const ready=()=>document.readyState==='complete'?setTimeout(resolve,450):setTimeout(ready,50);ready()})")
                            data = browser.evaluate("""(() => {
                              const visible=e=>{const r=e.getBoundingClientRect(),s=getComputedStyle(e);return r.width>0&&r.height>0&&s.visibility!=='hidden'&&s.display!=='none'};
                              const rect=e=>{const r=e.getBoundingClientRect();return {top:r.top,bottom:r.bottom,width:r.width,height:r.height}};
                              return {
                                overflow: document.documentElement.scrollWidth>innerWidth,
                                headings:[...document.querySelectorAll('main h1')].map(e=>e.textContent.trim()),
                                brokenImages:[...document.images].filter(e=>e.getAttribute('src')&&e.complete&&!e.naturalWidth).map(e=>e.getAttribute('src')),
                                aboveFoldCTAs:[...document.querySelectorAll('main a, .header-cta')].filter(e=>visible(e)&&e.getBoundingClientRect().top>=0&&e.getBoundingClientRect().bottom<=innerHeight).map(e=>({text:e.textContent.trim(),href:e.getAttribute('href')})),
                                header:{...rect(document.querySelector('.site-header')),position:getComputedStyle(document.querySelector('.site-header')).position},
                                headerCTA:{visible:visible(document.querySelector('.header-cta')),...rect(document.querySelector('.header-cta'))},
                                smallControls:[...document.querySelectorAll('a,button')].filter(e=>visible(e)).filter(e=>{const r=e.getBoundingClientRect();return r.width<24||r.height<24}).slice(0,20).map(e=>({text:e.textContent.trim().slice(0,60),label:e.getAttribute('aria-label'),...rect(e)})),
                                resources:performance.getEntriesByType('resource').reduce((a,e)=>a+e.transferSize,0),
                                bodyStart:document.querySelector('main').innerText.slice(0,1200)
                              };
                            })()""")
                            data.update({'language':lang,'page':name,'width':width})
                            data['dark'] = browser.evaluate("""(() => {document.documentElement.dataset.theme='dark';return {overflow:document.documentElement.scrollWidth>innerWidth,background:getComputedStyle(document.body).backgroundColor,color:getComputedStyle(document.body).color}})()""")
                            browser.evaluate("document.documentElement.dataset.theme='light'")
                            result['browser'].append(data)
                            if name in ('index','about','contact') and lang == 'en' and width in (375,1440):
                                import base64
                                shot=browser.call('Page.captureScreenshot',{'format':'png','captureBeyondViewport':False})
                                (OUT / f'{lang}-{name}-{width}.png').write_bytes(base64.b64decode(shot['data']))
                # Exercise actual menu and form controls without sending messages.
                browser.call('Page.navigate', {'url':f'{address}/en/contact.html'})
                browser.evaluate('new Promise(r=>setTimeout(r,400))')
                result['form_validation'] = browser.evaluate("""(() => {const f=document.querySelector('form');document.querySelector('#email').value='invalid';return {invalidRejected:!f.reportValidity(),emailInvalid:document.querySelector('#email').getAttribute('aria-invalid'),action:f.getAttribute('action')}})()""")
                browser.call('Emulation.setDeviceMetricsOverride', {'width':375,'height':812,'deviceScaleFactor':1,'mobile':True})
                result['menu'] = browser.evaluate("""(() => {const b=document.querySelector('.nav-toggle');b.click();const opened=b.getAttribute('aria-expanded');document.dispatchEvent(new KeyboardEvent('keydown',{key:'Escape'}));return {opened,afterEscape:b.getAttribute('aria-expanded')}})()""")
                # Localhost deliberately opens mail drafts, so test hosted submit logic
                # separately in the report rather than pretending this sends PHP mail.
                browser.call('Emulation.setScriptExecutionDisabled', {'value':True})
                browser.call('Page.navigate', {'url':f'{address}/ar/projects.html'})
                time.sleep(.5)
                browser.call('Emulation.setScriptExecutionDisabled', {'value':False})
                result['no_js_projects'] = browser.evaluate("({cards:document.querySelectorAll('.project-card').length,main:document.querySelector('main').innerText.length,menu:getComputedStyle(document.querySelector('.nav-labels')).display})")
                result['runtime_errors'] = browser.errors
            finally:
                if browser:
                    browser.socket.close()
                if process:
                    process.terminate()
                    process.wait(timeout=15)
    except Exception as error:
        result['errors'].append(str(error))
    finally:
        server.shutdown()
        (OUT / 'launch-evidence.json').write_text(json.dumps(result,indent=2,ensure_ascii=False),encoding='utf-8')
    print(f'Audit evidence: {len(result["pages"])} HTML pages, {len(result["browser"])} browser views, {len(result["errors"])} harness errors.')
    for error in result['errors']:
        print(error)


if __name__ == '__main__':
    main()
