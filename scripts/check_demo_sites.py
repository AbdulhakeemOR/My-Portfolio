"""Audit demo assets and exercise the seven public demos in Edge."""
from pathlib import Path
from html.parser import HTMLParser
from urllib.parse import unquote, urlsplit
from urllib.request import urlopen
import argparse
import base64
import importlib.util
import json
import re
import subprocess
import tempfile
import time

ROOT = Path(__file__).resolve().parent.parent
NAMES = ('bridgearabic','calculator','evergreencatalog','framehouse','gatherforum','scopecraft','signalstudio')


class References(HTMLParser):
    def __init__(self): super().__init__(); self.urls = []
    def handle_starttag(self, tag, fields):
        fields = dict(fields)
        for attribute in ('src','href','poster'):
            if fields.get(attribute): self.urls.append(fields[attribute])


def static_checks():
    total = 0
    for path in (ROOT / 'demos').rglob('*'):
        if not path.is_file(): continue
        assert path.suffix not in ('.py','.php','.jsx'), path
        urls = []
        if path.suffix == '.html':
            parser = References(); parser.feed(path.read_text(encoding='utf-8')); urls=parser.urls
        elif path.suffix == '.css':
            urls = re.findall(r'url\([\s\'"]*([^\)\'"\s]+)', path.read_text(encoding='utf-8'))
        for url in urls:
            parsed=urlsplit(url)
            if parsed.scheme or parsed.netloc or not parsed.path: continue
            target = ROOT / unquote(parsed.path).lstrip('/') if parsed.path.startswith('/') else path.parent / unquote(parsed.path)
            assert target.exists(), (path.relative_to(ROOT),url)
            total += 1
    print(f'PASS: {total} local demo links/assets; no backend scripts or source generators in public demos.')


def main():
    parser=argparse.ArgumentParser(); parser.add_argument('--url',default='http://127.0.0.1:5176');parser.add_argument('--capture',action='store_true');parser.add_argument('--projects',action='store_true');parser.add_argument('--projects-only',action='store_true');args=parser.parse_args()
    static_checks()
    spec=importlib.util.spec_from_file_location('browser',ROOT.parent/'scripts/check_browser.py')
    module=importlib.util.module_from_spec(spec);spec.loader.exec_module(module)
    with tempfile.TemporaryDirectory(prefix='demo-browser-',ignore_cleanup_errors=True) as temporary:
        profile=Path(temporary)
        process=subprocess.Popen([str(module.EDGE),'--headless=new','--disable-gpu','--no-first-run','--no-default-browser-check','--remote-debugging-port=0','--remote-allow-origins=*',f'--user-data-dir={profile}','about:blank'],stdout=subprocess.DEVNULL,stderr=subprocess.DEVNULL,creationflags=getattr(subprocess,'CREATE_NO_WINDOW',0))
        browser=None
        try:
            port_file=profile/'DevToolsActivePort'
            for _ in range(100):
                if port_file.exists():break
                time.sleep(.1)
            port=port_file.read_text().splitlines()[0]
            pages=json.load(urlopen(f'http://127.0.0.1:{port}/json/list'))
            browser=module.Browser(next(page['webSocketDebuggerUrl'] for page in pages if page['type']=='page'))
            browser.call('Runtime.enable');browser.call('Page.enable')
            for name in (() if args.projects_only else NAMES):
                browser.errors.clear()
                browser.call('Emulation.setDeviceMetricsOverride',{'width':1280,'height':900,'deviceScaleFactor':1,'mobile':False})
                browser.call('Page.navigate',{'url':f'{args.url}/demos/{name}/'})
                for _ in range(100):
                    ready=browser.evaluate('document.readyState === "complete" && !!document.querySelector("[data-aor-demo]")')
                    if ready:break
                    time.sleep(.1)
                time.sleep(.5)
                assert ready,name
                for width in (375,1280):
                    browser.call('Emulation.setDeviceMetricsOverride',{'width':width,'height':900,'deviceScaleFactor':1,'mobile':False})
                    time.sleep(.1)
                    result=browser.evaluate('''({overflow:document.documentElement.scrollWidth>innerWidth+1,localBroken:[...document.images].filter(i=>i.complete&&!i.naturalWidth&&new URL(i.src).origin===location.origin).map(i=>i.src)})''')
                    assert not result['localBroken'],(name,result)
                    assert not result['overflow'],(name,width,result)
                if name=='framehouse':
                    assert browser.evaluate('document.querySelectorAll(".poster-button").length')==9
                    browser.evaluate('document.querySelector(".poster-button").click()')
                    time.sleep(.2)
                    assert browser.evaluate('!!document.querySelector("[role=dialog]")')
                    browser.call('Input.dispatchKeyEvent',{'type':'keyDown','key':'Escape','code':'Escape','windowsVirtualKeyCode':27})
                    browser.call('Input.dispatchKeyEvent',{'type':'keyUp','key':'Escape','code':'Escape','windowsVirtualKeyCode':27})
                if name=='scopecraft':
                    assert browser.evaluate('document.querySelector("#estimator").textContent.includes("660")')
                    browser.evaluate('''document.querySelector('[aria-label="Increase page count"]').click()''')
                    assert browser.evaluate('document.querySelector("#estimate-total").textContent.includes("810")')
                    browser.evaluate('''document.querySelector('[aria-label="Decrease page count"]').click()''')
                if name=='calculator':
                    assert browser.evaluate('''(() => { const dialog=document.querySelector('#help');dialog.showModal();dialog.querySelector('button[type=submit]').click();return !dialog.open;})()''')
                if name=='bridgearabic':
                    assert browser.evaluate('document.querySelector("audio source").getAttribute("src")')=='assets/marhaban.mp3'
                if name=='evergreencatalog':
                    assert browser.evaluate('document.querySelectorAll(".kit-card").length')>0
                if name=='gatherforum':
                    assert browser.evaluate('document.querySelectorAll(".session").length')>0
                    browser.evaluate('document.querySelector(".session").click()')
                    assert browser.evaluate('document.querySelector("#session-dialog").open')
                    browser.evaluate('document.querySelector("#session-dialog").close()')
                assert not browser.errors,(name,browser.errors)
                if args.capture:
                    destination=ROOT/'demos/previews';destination.mkdir(exist_ok=True)
                    browser.evaluate('window.scrollTo(0,0)')
                    screenshot=browser.call('Page.captureScreenshot',{'format':'png','captureBeyondViewport':False})
                    (destination/f'{name}.png').write_bytes(base64.b64decode(screenshot['data']))
                print(f'PASS: {name}, desktop/mobile, local images, runtime checks'+(', screenshot captured' if args.capture else ''))
            if args.projects or args.projects_only:
                for language in ('en','ar'):
                    browser.call('Page.navigate',{'url':f'{args.url}/{language}/projects.html'})
                    for _ in range(100):
                        if browser.evaluate('document.readyState === "complete" && document.querySelector("#project-list")?.classList.contains("project-expanding") && document.querySelectorAll(".project-card[data-category~=websites]").length === 7'): break
                        time.sleep(.1)
                    assert browser.evaluate('document.querySelectorAll(".project-card[data-category~=websites]").length')==7
                    browser.evaluate('document.querySelector("[data-filter=websites]").click()')
                    time.sleep(.3)
                    assert browser.evaluate('[...document.querySelectorAll(".project-card")].filter(c=>!c.hidden).length')==7, (language,browser.evaluate('({ready:document.readyState,pressed:document.querySelector("[data-filter=websites]").getAttribute("aria-pressed"),visible:[...document.querySelectorAll(".project-card")].filter(c=>!c.hidden).map(c=>c.id)})'))
                    assert browser.evaluate('''[...document.querySelectorAll('.project-link')].filter(a=>new URL(a.href).pathname.startsWith('/demos/')).length''')==7
                    assert browser.evaluate('[...document.querySelectorAll(".project-card[data-category~=websites] img")].every(i=>i.complete&&i.naturalWidth>0)')
                    browser.evaluate('document.querySelector(".project-card[data-active=true] .project-link").click()')
                    time.sleep(.5)
                    assert browser.evaluate('location.pathname.startsWith("/demos/")')
                    assert not browser.errors,browser.errors
                print('PASS: seven demo cards, screenshots, Websites filter, and working demo navigation in English and Arabic.')
        finally:
            if browser:browser.socket.close()
            process.terminate();process.wait(timeout=10)


if __name__=='__main__':main()
