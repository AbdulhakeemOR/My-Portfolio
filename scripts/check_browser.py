"""Check the local pages in the installed Edge browser without dependencies."""

from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path
from urllib.request import urlopen, Request
from urllib.parse import urlparse
import base64
import json
import os
import socket
import struct
import subprocess
import tempfile
import threading
import time
import sys


ROOT = Path(os.environ.get('AOR_PREVIEW_DIRECTORY', Path(__file__).resolve().parent.parent)).resolve()
EDGE = Path('C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe')


class QuietHandler(SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=str(ROOT), **kwargs)

    def log_message(self, *args):
        pass


class PreviewServer(ThreadingHTTPServer):
    def handle_error(self, request, client_address):
        if isinstance(sys.exception(), (ConnectionResetError, ConnectionAbortedError, BrokenPipeError)):
            return
        super().handle_error(request, client_address)


class Browser:
    def __init__(self, url):
        parsed = urlparse(url)
        self.socket = socket.create_connection((parsed.hostname, parsed.port), timeout=15)
        self.socket.settimeout(15)
        key = base64.b64encode(os.urandom(16)).decode()
        request = f'GET {parsed.path} HTTP/1.1\r\nHost: {parsed.netloc}\r\nUpgrade: websocket\r\nConnection: Upgrade\r\nSec-WebSocket-Key: {key}\r\nSec-WebSocket-Version: 13\r\n\r\n'
        self.socket.sendall(request.encode())
        header = b''
        while b'\r\n\r\n' not in header:
            header += self.socket.recv(1)
        if b' 101 ' not in header:
            raise RuntimeError(header.decode())
        self.sequence = 0
        self.errors = []

    def read(self, length):
        result = b''
        while len(result) < length:
            data = self.socket.recv(length - len(result))
            if not data:
                raise RuntimeError('Browser connection closed.')
            result += data
        return result

    def call(self, method, params=None):
        self.sequence += 1
        payload = json.dumps({'id': self.sequence, 'method': method, 'params': params or {}}).encode()
        mask = os.urandom(4)
        length = len(payload)
        header = bytes([129, 128 | length]) if length < 126 else bytes([129, 254]) + struct.pack('!H', length)
        self.socket.sendall(header + mask + bytes(byte ^ mask[index % 4] for index, byte in enumerate(payload)))

        while True:
            first, second = self.read(2)
            length = second & 127
            if length == 126:
                length = struct.unpack('!H', self.read(2))[0]
            elif length == 127:
                length = struct.unpack('!Q', self.read(8))[0]
            data = self.read(length)
            if first & 15 == 8:
                raise RuntimeError('Browser closed the socket.')
            if first & 15 != 1:
                continue
            result = json.loads(data)
            if result.get('method') == 'Runtime.exceptionThrown':
                self.errors.append(result['params']['exceptionDetails'])
            if result.get('id') == self.sequence:
                if 'error' in result:
                    raise RuntimeError(result['error'])
                return result.get('result', {})

    def evaluate(self, expression):
        result = self.call('Runtime.evaluate', {'expression': expression, 'returnByValue': True, 'awaitPromise': True})
        if result.get('exceptionDetails'):
            raise RuntimeError(result['exceptionDetails'])
        return result.get('result', {}).get('value')


def main():
    server = PreviewServer(('127.0.0.1', 0), QuietHandler)
    threading.Thread(target=server.serve_forever, daemon=True).start()
    address = f'http://127.0.0.1:{server.server_port}'
    profile = tempfile.mkdtemp(prefix='aor-browser-')
    process = subprocess.Popen([
        str(EDGE), '--headless=new', '--disable-gpu', '--no-first-run',
        '--no-default-browser-check', '--remote-debugging-port=0',
        '--remote-allow-origins=*', f'--user-data-dir={profile}', 'about:blank'
    ], stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
    browser = None

    try:
        port_file = Path(profile) / 'DevToolsActivePort'
        for _ in range(100):
            if port_file.exists():
                break
            time.sleep(0.1)
        port = port_file.read_text().splitlines()[0]
        pages = json.load(urlopen(f'http://127.0.0.1:{port}/json/list'))
        browser = Browser(next(page['webSocketDebuggerUrl'] for page in pages if page['type'] == 'page'))
        browser.call('Runtime.enable')
        browser.call('Page.enable')
        checks = 0

        for name in ('index', 'projects', 'services', 'articles', 'about', 'contact', '404', 'contact-success'):
            browser.call('Page.navigate', {'url': f'{address}/{name}.html'})
            browser.evaluate("new Promise(resolve => { const ready = () => document.readyState === 'complete' ? setTimeout(resolve, 250) : setTimeout(ready, 50); ready(); })")

            if name == 'articles':
                result = browser.evaluate("""(() => {
                  const articles = Array.from(document.querySelectorAll('.article-item'));
                  document.querySelectorAll('.article-details').forEach(item => item.open = true);
                  return {
                    count: articles.length,
                    readable: articles.every(item => item.querySelector('.article-body')?.textContent.trim().length > 2000),
                    sections: articles.every(item => item.querySelector('.article-body h4')),
                    tips: document.querySelectorAll('#article-building-this-website .article-body h5').length,
                    researchQuestions: document.querySelectorAll('#article-writing-a-thesis-for-the-first-time .article-body ul li').length
                  };
                })()""")
                assert result == {
                    'count': 5,
                    'readable': True,
                    'sections': True,
                    'tips': 8,
                    'researchQuestions': 5
                }, result

                interactions = browser.evaluate("""(async () => {
                  const sections = Array.from(document.querySelectorAll('.article-item .article-feedback'));
                  if (sections.length !== 5) throw new Error('Expected five article conversations.');
                  if (document.querySelector('.article-feedback-form')) throw new Error('Private article form remains.');
                  for (const section of sections) {
                    const actions = Array.from(section.querySelectorAll('[data-article-action]')).map(button => button.dataset.articleAction);
                    if (actions.join(',') !== 'like,comment,share') throw new Error('Unexpected article actions.');
                  }
                  if (!disqusShortname) {
                    sections[0].querySelector('[data-article-action="comment"]').click();
                    await new Promise(resolve => setTimeout(resolve, 30));
                    if (!sections[0].querySelector('.article-action-status').textContent.includes('not connected')) throw new Error('Missing setup state.');
                    if (sections[0].querySelector('iframe')) throw new Error('Unconfigured service loaded.');
                  }
                  return true;
                })()""")
                assert interactions

            for width in (320, 375, 768, 1024, 1440):
                browser.call('Emulation.setDeviceMetricsOverride', {'width': width, 'height': 900, 'deviceScaleFactor': 1, 'mobile': False})
                browser.evaluate("document.documentElement.style.scrollBehavior = 'auto'; document.querySelectorAll('.reveal').forEach(item => item.classList.add('is-visible'))")
                for theme in ('light', 'dark'):
                    result = browser.evaluate(f"""(() => {{
                      document.documentElement.dataset.theme = '{theme}';
                      return {{
                        overflow: document.documentElement.scrollWidth > window.innerWidth,
                        brokenImages: Array.from(document.images).filter(image => image.complete && !image.naturalWidth).map(image => image.src),
                        mainHeadings: document.querySelectorAll('main h1').length
                      }};
                    }})()""")
                    assert not result['overflow'], (name, width, theme, 'horizontal overflow')
                    assert not result['brokenImages'], (name, result['brokenImages'])
                    assert result['mainHeadings'] == 1, (name, 'main heading count')
                    checks += 1

            if name in ('projects', 'articles'):
                result = browser.evaluate("""(() => {
                  const input = document.querySelector('.filter-search');
                  input.value = 'no-matching-item-12345';
                  input.dispatchEvent(new Event('input'));
                  return {
                    visible: document.querySelectorAll('.filter-card:not([hidden])').length,
                    empty: !document.querySelector('.filter-empty').hidden
                  };
                })()""")
                assert result == {'visible': 0, 'empty': True}, (name, result)
                browser.evaluate("document.querySelector('.filter-search').value = ''; document.querySelector('.filter-search').dispatchEvent(new Event('input'))")
                if name == 'projects':
                    count = browser.evaluate("document.querySelector('[data-filter=communication]').click(); document.querySelectorAll('.filter-card:not([hidden])').length")
                    assert count == 7, ('communication category', count)

                    for category, expected in (('websites', 6), ('ad-design-video', 12)):
                        count = browser.evaluate(f"document.querySelector('[data-filter=\"{category}\"]').click(); document.querySelectorAll('.filter-card:not([hidden])').length")
                        assert count == expected, (category, count)

                    browser.evaluate("document.querySelector('[data-filter=all]').click()")
                    previews = browser.evaluate("""(() => {
                      const slugs = ['signal-studio', 'clearcopy-lab', 'evergreen-catalog', 'poster-type-studio', 'launch-quality-pass'];
                      return slugs.every(slug => {
                        const card = document.getElementById('project-' + slug);
                        const video = card?.querySelector('video');
                        return video && video.poster && video.controls && video.preload === 'none';
                      });
                    })()""")
                    assert previews, 'A walkthrough is missing its player or poster.'

                    galleries = browser.evaluate("""(() => {
                      const cards = ['awareness-flyer', 'awareness-logo', 'identity-b', 'identity-c', 'student-services-posters', 'truhaq-concept', 'design-samples'];
                      return cards.map(slug => {
                        const card = document.getElementById('project-' + slug);
                        const link = card.querySelector('.collection-link');
                        return Boolean(link && link.getAttribute('href') === 'project-' + slug + '.html'
                          && !card.querySelector('.project-gallery') && !card.querySelector('video')
                          && card.querySelectorAll('img').length === 1);
                      });
                    })()""")
                    assert galleries == [True] * 7, galleries

                    for width in (320, 375, 768, 1440):
                        browser.call('Emulation.setDeviceMetricsOverride', {'width': width, 'height': 900, 'deviceScaleFactor': 1, 'mobile': False})
                        assert not browser.evaluate('document.documentElement.scrollWidth > window.innerWidth'), ('collection cards', width)

                if name == 'articles':
                    for category, expected in (('communication-research', 3), ('web-development', 1), ('learning-growth', 1)):
                        count = browser.evaluate(f"document.querySelector('[data-filter=\"{category}\"]').click(); document.querySelectorAll('.filter-card:not([hidden])').length")
                        assert count == expected, (category, count)

                    browser.evaluate("document.querySelector('[data-filter=all]').click()")

            if name == 'contact':
                result = browser.evaluate("document.querySelector('.contact-form button').textContent")
                assert result == 'Open email to send', result
                browser.evaluate("document.querySelector('#email').value = 'invalid-email'; document.querySelector('.contact-form').reportValidity()")
                assert browser.evaluate("document.querySelector('#email').getAttribute('aria-invalid')") == 'true'

            if name == 'index' and not (ROOT / 'assets/images/portfolio-preview.webp').exists():
                browser.call('Emulation.setDeviceMetricsOverride', {'width': 1440, 'height': 1000, 'deviceScaleFactor': 1, 'mobile': False})
                browser.evaluate("document.documentElement.dataset.theme = 'light'; window.scrollTo(0, 0)")
                screenshot = browser.call('Page.captureScreenshot', {'format': 'png', 'captureBeyondViewport': False})
                (ROOT / 'assets/images/portfolio-preview.png').write_bytes(base64.b64decode(screenshot['data']))

        # Verify the mobile navigation and theme preference as real interactions.
        browser.call('Page.navigate', {'url': f'{address}/index.html'})
        browser.evaluate("new Promise(resolve => setTimeout(resolve, 500))")
        browser.call('Emulation.setDeviceMetricsOverride', {'width': 375, 'height': 850, 'deviceScaleFactor': 1, 'mobile': False})
        assert browser.evaluate("getComputedStyle(document.querySelector('.nav-labels')).display") == 'none'
        browser.evaluate("document.querySelector('.nav-toggle').click()")
        assert browser.evaluate("document.querySelector('.nav-toggle').getAttribute('aria-expanded')") == 'true'
        browser.evaluate("document.dispatchEvent(new KeyboardEvent('keydown', {key: 'Escape'}))")
        assert browser.evaluate("document.querySelector('.nav-toggle').getAttribute('aria-expanded')") == 'false'
        browser.evaluate("document.querySelector('.theme-toggle').click()")
        assert browser.evaluate("localStorage.getItem('aor-theme') === document.documentElement.dataset.theme")

        browser.call('Emulation.setScriptExecutionDisabled', {'value': True})
        browser.call('Page.navigate', {'url': f'{address}/projects.html'})
        time.sleep(0.5)
        browser.call('Emulation.setScriptExecutionDisabled', {'value': False})
        assert browser.evaluate("getComputedStyle(document.querySelector('.nav-labels')).display") == 'grid'
        assert browser.evaluate("document.querySelectorAll('.project-card').length") == 13

        browser.call('Page.navigate', {'url': f'{address}/articles.html#article-writing-a-thesis-for-the-first-time'})
        browser.evaluate("new Promise(resolve => setTimeout(resolve, 500))")
        assert browser.evaluate("document.querySelector('#article-writing-a-thesis-for-the-first-time details').open")
        assert browser.evaluate("document.querySelector('#article-writing-a-thesis-for-the-first-time .article-body ul li').textContent") == 'What problem does the study address?'

        for language in ('en', 'ar'):
            for name in ('index', 'projects', 'services', 'articles', 'about', 'contact', '404', 'contact-success'):
                browser.call('Page.navigate', {'url': f'{address}/{language}/{name}.html'})
                browser.evaluate("new Promise(resolve => { const ready = () => document.readyState === 'complete' && document.documentElement ? setTimeout(resolve, 250) : setTimeout(ready, 50); ready(); })")
                assert browser.evaluate('document.documentElement.lang') == language
                assert browser.evaluate('document.documentElement.dir') == ('rtl' if language == 'ar' else 'ltr')
                assert browser.evaluate("document.querySelectorAll('.works-wheel').length") == (1 if name == 'index' else 0)
                if name == 'index':
                    assert browser.evaluate("document.querySelectorAll('.hero .works-wheel.is-enhanced').length") == 1
                    browser.call('Emulation.setEmulatedMedia', {'features': [{'name': 'prefers-reduced-motion', 'value': 'reduce'}]})
                    browser.evaluate("document.querySelector('[data-wheel-next]').click()")
                    browser.evaluate("new Promise(resolve => requestAnimationFrame(() => requestAnimationFrame(resolve)))")
                    assert browser.evaluate("document.querySelectorAll('.works-wheel .is-front').length") == 1, (language, name, browser.errors)
                    first = browser.evaluate("document.querySelector('.works-wheel .is-front').href")
                    browser.evaluate("document.querySelector('.works-wheel-stage').dispatchEvent(new KeyboardEvent('keydown', {key: 'ArrowDown', bubbles: true}))")
                    browser.evaluate("new Promise(resolve => requestAnimationFrame(() => requestAnimationFrame(resolve)))")
                    assert browser.evaluate("document.querySelector('.works-wheel .is-front').href") != first
                    assert browser.evaluate("[...document.querySelectorAll('.works-wheel-card')].filter(c => c.inert).length") > 0
                    browser.call('Emulation.setEmulatedMedia', {'features': []})
                for width in (320, 375, 768, 1440):
                    browser.call('Emulation.setDeviceMetricsOverride', {'width': width, 'height': 900, 'deviceScaleFactor': 1, 'mobile': False})
                    assert not browser.evaluate('document.documentElement.scrollWidth > window.innerWidth'), (language, name, width)
                assert browser.evaluate("[...document.querySelectorAll('[data-language]')].every(a => a.href.includes('/' + a.dataset.language + '/'))")
                if language == 'ar' and name == 'projects':
                    browser.evaluate("document.querySelector('.filter-search').value = 'TruHaq'; document.querySelector('.filter-search').dispatchEvent(new Event('input'))")
                    browser.evaluate("new Promise(resolve => setTimeout(resolve, 50))")
                    assert browser.evaluate("document.querySelectorAll('.filter-card:not([hidden])').length") == 1
                    assert '1' in browser.evaluate("document.querySelector('.filter-results').textContent")
                    assert 'shown' not in browser.evaluate("document.querySelector('.filter-results').textContent")
                if language == 'ar' and name == 'contact':
                    assert browser.evaluate("document.querySelector('button[type=submit]').textContent") == '\u0627\u0641\u062a\u062d \u0627\u0644\u0628\u0631\u064a\u062f \u0644\u0644\u0625\u0631\u0633\u0627\u0644'

        collection_counts = {'awareness-logo': 3, 'identity-b': 3, 'identity-c': 3, 'awareness-flyer': 6, 'student-services-posters': 9, 'truhaq-concept': 19, 'design-samples': 25}
        for language in ('en', 'ar'):
            for slug, expected in collection_counts.items():
                browser.call('Page.navigate', {'url': f'{address}/{language}/project-{slug}.html'})
                time.sleep(0.3)
                assert browser.evaluate("document.querySelectorAll('.collection-grid figure').length") == expected, (language, slug)
                assert browser.evaluate('document.documentElement.lang') == language
                assert browser.evaluate("[...document.querySelectorAll('.collection-grid video')].every(video => video.controls && video.preload === 'none')")
                assert browser.evaluate("document.querySelector('.collection-intro .secondary-cta').getAttribute('href')") == 'projects.html#project-' + slug
                for width in (320, 375, 768, 1440):
                    browser.call('Emulation.setDeviceMetricsOverride', {'width': width, 'height': 900, 'deviceScaleFactor': 1, 'mobile': False})
                    assert not browser.evaluate('document.documentElement.scrollWidth > window.innerWidth'), (language, slug, width)

        browser.call('Page.navigate', {'url': f'{address}/en/projects.html?example=1#project-truhaq-concept'})
        time.sleep(0.4)
        browser.evaluate("document.querySelector('[data-language=ar]').click()")
        time.sleep(0.5)
        assert browser.evaluate("location.pathname + location.search + location.hash") == '/ar/projects.html?example=1#project-truhaq-concept'
        assert browser.evaluate("localStorage.getItem('aor-language')") == 'ar'
        browser.call('Page.navigate', {'url': f'{address}/about.html'})
        time.sleep(0.5)
        assert browser.evaluate('location.pathname') == '/ar/about.html'
        browser.evaluate("document.querySelector('[data-language=en]').click()")
        time.sleep(0.4)
        assert browser.evaluate('location.pathname') == '/en/about.html'

        browser.call('Emulation.setScriptExecutionDisabled', {'value': True})
        browser.call('Page.navigate', {'url': f'{address}/ar/articles.html'})
        time.sleep(0.5)
        browser.call('Emulation.setScriptExecutionDisabled', {'value': False})
        assert browser.evaluate("document.querySelector('h1').textContent") == '\u0627\u0644\u0645\u0642\u0627\u0644\u0627\u062a'
        assert browser.evaluate("document.querySelectorAll('.article-item').length") == 5
        assert not browser.errors, browser.errors
        print(f'PASS: {checks} original page/width/theme combinations, 30 localized pages including collection grids at 4 widths, filters, forms, language switching and persistence, themes, and no-JavaScript fallback.')
    finally:
        if browser:
            browser.socket.close()
        process.terminate()
        server.shutdown()


if __name__ == '__main__':
    main()
