"""Content-aware browser regressions for the current English/Arabic website."""
import json
import subprocess
import tempfile
import threading
import time
from pathlib import Path
from urllib.request import urlopen

from check_browser import Browser, PreviewServer, QuietHandler, EDGE, ROOT
from project_collections import media_items


def main():
    projects = json.loads((ROOT / 'content/projects.json').read_text(encoding='utf-8'))['projects']
    articles = json.loads((ROOT / 'content/articles.json').read_text(encoding='utf-8'))['articles']
    published = [a for a in articles if a.get('published') and a.get('body', '').strip()]
    server = PreviewServer(('127.0.0.1', 0), QuietHandler)
    threading.Thread(target=server.serve_forever, daemon=True).start()
    base = f'http://127.0.0.1:{server.server_port}'
    browser = None
    checks = 0
    with tempfile.TemporaryDirectory(prefix='aor-check-', ignore_cleanup_errors=True) as profile:
        process = subprocess.Popen([str(EDGE), '--headless=new', '--disable-gpu', '--no-first-run', '--no-default-browser-check', '--remote-debugging-port=0', '--remote-allow-origins=*', f'--user-data-dir={profile}', 'about:blank'], stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
        try:
            port_file = Path(profile) / 'DevToolsActivePort'
            for _ in range(100):
                if port_file.exists(): break
                time.sleep(.1)
            port = port_file.read_text().splitlines()[0]
            pages = json.load(urlopen(f'http://127.0.0.1:{port}/json/list'))
            browser = Browser(next(p['webSocketDebuggerUrl'] for p in pages if p['type'] == 'page'))
            browser.call('Runtime.enable')
            browser.call('Page.enable')
            browser.call('Emulation.setFocusEmulationEnabled', {'enabled':True})

            def visit(path):
                browser.call('Page.navigate', {'url':base + '/' + path})
                browser.evaluate("new Promise(resolve=>{const ready=()=>document.readyState==='complete'?setTimeout(resolve,150):setTimeout(ready,40);ready()})")

            for language in ('en', 'ar'):
                for path in sorted((ROOT / language).glob('*.html')):
                    visit(language + '/' + path.name)
                    assert browser.evaluate('document.documentElement.lang') == language
                    assert browser.evaluate('document.documentElement.dir') == ('rtl' if language == 'ar' else 'ltr')
                    assert browser.evaluate("document.querySelectorAll('main h1').length") == 1, path.name
                    for width in (320, 375, 768, 1024, 1440):
                        browser.call('Emulation.setDeviceMetricsOverride', {'width':width,'height':900,'deviceScaleFactor':1,'mobile':width<500})
                        for theme in ('light', 'dark'):
                            browser.evaluate(f"document.documentElement.dataset.theme='{theme}'")
                            assert not browser.evaluate('document.documentElement.scrollWidth > innerWidth'), (language,path.name,width,theme)
                            assert browser.evaluate("!Array.from(document.images).some(i=>i.getAttribute('src')&&i.complete&&!i.naturalWidth)"), (path.name,'broken loaded image')
                            checks += 1
                        assert browser.evaluate("getComputedStyle(document.querySelector('.header-cta')).display !== 'none'"), (path.name,'contact CTA hidden')
                    if path.name in ('index.html', 'privacy.html', 'terms.html'):
                        browser.call('Emulation.setEmulatedMedia', {'features':[{'name':'prefers-reduced-motion','value':'reduce'}]})
                        browser.evaluate("document.documentElement.style.scrollBehavior='auto';window.scrollTo(0,700)")
                        browser.evaluate('new Promise(r=>requestAnimationFrame(()=>requestAnimationFrame(r)))')
                        assert browser.evaluate("(() => {const b=document.querySelector('.back-to-top');return b&&b.classList.contains('is-visible')&&b.getAttribute('aria-hidden')==='false'&&b.tabIndex===0&&getComputedStyle(b).visibility==='visible'})()"), (language,path.name,'back-to-top not visible after scrolling')
                        browser.evaluate("document.querySelector('.back-to-top').click()")
                        browser.evaluate('new Promise(r=>requestAnimationFrame(()=>requestAnimationFrame(r)))')
                        assert browser.evaluate("window.scrollY===0&&!document.querySelector('.back-to-top').classList.contains('is-visible')"), (language,path.name,'back-to-top did not return to top')
                        browser.call('Emulation.setEmulatedMedia', {'features':[]})
                    if path.name == 'index.html':
                        assert browser.evaluate("document.querySelector('.hero-actions a').getAttribute('href')") == 'contact.html#contact-form'
                        assert browser.evaluate("document.querySelectorAll('.home-fan-card').length") == min(6,sum(bool(p.get('featured')) for p in projects))
                        focus = browser.evaluate("(() => {const a=document.querySelector('.home-fan-card');a.focus();return {focused:document.activeElement===a,active:a.closest('li').dataset.active,ready:a.closest('li').dataset.fanReady}})()")
                        assert focus['focused'] and focus['active'] == 'true', focus
                    if path.name == 'projects.html':
                        assert browser.evaluate("document.querySelectorAll('.project-card').length") == len(projects)
                    if path.name == 'articles.html':
                        assert browser.evaluate("document.querySelectorAll('.article-item').length") == len(articles)
                        assert browser.evaluate("document.querySelectorAll('.article-item [data-article-action=like],.article-item [data-article-action=comment]').length") == 2 * len(published)
                        assert browser.evaluate("document.querySelectorAll('.article-item [data-article-action=share]').length") == len(articles)
                        assert browser.evaluate("document.querySelectorAll('.article-body').length") == len(published)
                    if path.name in ('projects.html', 'articles.html'):
                        result = browser.evaluate("""(() => {const input=document.querySelector('.filter-search');input.value='no-match-audit-897';input.dispatchEvent(new Event('input'));return {visible:document.querySelectorAll('.filter-card:not([hidden])').length,empty:!document.querySelector('.filter-empty').hidden}})()""")
                        assert result == {'visible':0,'empty':True}, result
                    project = next((p for p in projects if path.name == f'project-{p["slug"]}.html'), None)
                    if project:
                        assert browser.evaluate("document.querySelectorAll('.collection-grid figure').length") == len(media_items(project))
                        assert browser.evaluate("(() => {const a=document.querySelector('.collection-grid figure > a');if(!a)return true;a.focus();a.click();const d=document.querySelector('dialog');const opened=d.open;d.querySelector('button').click();return opened&&!d.open&&document.activeElement===a})()"), (path.name,'gallery focus recovery')

                browser.call('Emulation.setDeviceMetricsOverride', {'width':375,'height':812,'deviceScaleFactor':1,'mobile':True})
                visit(language + '/index.html')
                assert browser.evaluate("(() => {const a=document.querySelector('.hero-actions a'),r=a.getBoundingClientRect();return r.top>=0&&r.bottom<=innerHeight})()"), (language,'hero inquiry below fold')
                assert browser.evaluate("(() => {const b=document.querySelector('.nav-toggle');b.click();const open=b.getAttribute('aria-expanded');document.dispatchEvent(new KeyboardEvent('keydown',{key:'Escape'}));return open==='true'&&b.getAttribute('aria-expanded')==='false'})()")
                assert browser.evaluate("document.querySelector('.theme-toggle').click();localStorage.getItem('aor-theme')===document.documentElement.dataset.theme")
                visit(language + '/contact.html')
                assert browser.evaluate("document.querySelector('#email').value='invalid';!document.querySelector('form').reportValidity()")
                assert browser.evaluate("document.querySelector('#email').getAttribute('aria-invalid')") == 'true'

            visit('en/projects.html?audit=1#projects')
            browser.evaluate("document.querySelector('[data-language=ar]').click()")
            time.sleep(.4)
            assert browser.evaluate('location.pathname+location.search+location.hash') == '/ar/projects.html?audit=1#projects'
            browser.call('Emulation.setScriptExecutionDisabled', {'value':True})
            browser.call('Page.navigate', {'url':base+'/ar/projects.html'})
            # Wait for this navigation, not a fixed delay that can re-enable
            # scripts before a slow page finishes loading.
            for _ in range(100):
                if browser.evaluate("location.pathname==='/ar/projects.html'&&document.readyState==='complete'"):
                    break
                time.sleep(.1)
            else:
                raise AssertionError('No-JavaScript navigation did not finish loading.')
            browser.call('Emulation.setScriptExecutionDisabled', {'value':False})
            assert browser.evaluate("document.querySelectorAll('.project-card').length") == len(projects)
            assert browser.evaluate("getComputedStyle(document.querySelector('.nav-labels')).display") != 'none'
            assert not browser.errors, browser.errors
            print(f'PASS: {checks} page/width/theme combinations, current content counts, mobile inquiry CTA, filters, Share controls, gallery focus recovery, menu, themes, language switching, validation and no-JavaScript projects.')
        finally:
            if browser: browser.socket.close()
            process.terminate()
            try:
                process.wait(timeout=15)
            except subprocess.TimeoutExpired:
                process.kill()
                process.wait(timeout=5)
            server.shutdown()


if __name__ == '__main__':
    main()
