"""Render code-native SVG layouts with the existing logo; no image-generation service."""
import base64
import json
from pathlib import Path
import subprocess
import tempfile
import threading
import time
from urllib.request import urlopen
from check_browser import Browser, PreviewServer, QuietHandler, EDGE

ROOT = Path(__file__).resolve().parent.parent


def main():
    server = PreviewServer(('127.0.0.1', 0), QuietHandler)
    threading.Thread(target=server.serve_forever, daemon=True).start()
    browser = None
    with tempfile.TemporaryDirectory(prefix='aor-brand-', ignore_cleanup_errors=True) as profile:
        process = subprocess.Popen([str(EDGE), '--headless=new', '--disable-gpu', '--no-first-run', '--no-default-browser-check', '--remote-debugging-port=0', '--remote-allow-origins=*', f'--user-data-dir={profile}', 'about:blank'], stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
        try:
            port_file = Path(profile) / 'DevToolsActivePort'
            for _ in range(100):
                if port_file.exists(): break
                time.sleep(.1)
            port = port_file.read_text().splitlines()[0]
            pages = json.load(urlopen(f'http://127.0.0.1:{port}/json/list'))
            browser = Browser(next(p['webSocketDebuggerUrl'] for p in pages if p['type'] == 'page'))
            browser.call('Page.enable')
            browser.call('Runtime.enable')
            for source, target, width, height in [('social-card.svg', 'social-card.png', 1200, 630), ('favicon-source.svg', 'favicon.png', 96, 96)]:
                browser.call('Emulation.setDeviceMetricsOverride', {'width':width,'height':height,'deviceScaleFactor':1,'mobile':False})
                browser.call('Page.navigate', {'url':f'http://127.0.0.1:{server.server_port}/assets/brand/{source}'})
                browser.evaluate("new Promise(resolve=>{const ready=()=>document.readyState==='complete'?setTimeout(resolve,300):setTimeout(ready,50);ready()})")
                shot = browser.call('Page.captureScreenshot', {'format':'png','captureBeyondViewport':False})
                (ROOT / 'assets/brand' / target).write_bytes(base64.b64decode(shot['data']))
                print(f'Rendered {target}: {width}x{height}')
        finally:
            if browser: browser.socket.close()
            process.terminate()
            process.wait(timeout=15)
            server.shutdown()


if __name__ == '__main__':
    main()
