"""Capture local video samples for visual privacy review, without uploading media."""

import base64
import json
from pathlib import Path
import subprocess
import tempfile
import threading
import time
from urllib.request import urlopen

from capture_video_posters import VideoHandler
from check_browser import Browser, EDGE, PreviewServer

ROOT = Path(__file__).resolve().parent.parent


def main():
    content = json.loads((ROOT / 'content/projects.json').read_text(encoding='utf-8'))
    videos = []

    def collect(value):
        if isinstance(value, dict):
            if value.get('video') and value['video'] not in videos:
                videos.append(value['video'])
            for child in value.values():
                collect(child)
        elif isinstance(value, list):
            for child in value:
                collect(child)

    collect(content)
    output = ROOT / '.tmp-privacy/video-frames'
    output.mkdir(parents=True, exist_ok=True)
    server = PreviewServer(('127.0.0.1', 0), VideoHandler)
    threading.Thread(target=server.serve_forever, daemon=True).start()
    address = f'http://127.0.0.1:{server.server_port}'
    profile = tempfile.mkdtemp(prefix='aor-privacy-video-')
    process = subprocess.Popen([str(EDGE), '--headless=new', '--disable-gpu', '--no-first-run', '--no-default-browser-check', '--remote-debugging-port=0', '--remote-allow-origins=*', f'--user-data-dir={profile}', 'about:blank'], stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
    browser = None
    records = []
    try:
        port_file = Path(profile) / 'DevToolsActivePort'
        for _ in range(100):
            if port_file.exists():
                break
            time.sleep(0.1)
        port = port_file.read_text().splitlines()[0]
        pages = json.load(urlopen(f'http://127.0.0.1:{port}/json/list'))
        browser = Browser(next(p['webSocketDebuggerUrl'] for p in pages if p['type'] == 'page'))
        browser.socket.settimeout(60)
        browser.call('Page.enable')
        browser.call('Page.navigate', {'url': address + '/projects.html'})
        time.sleep(0.5)
        for index, source in enumerate(videos):
            result = browser.evaluate("""(async () => {
              const video = document.createElement('video');
              video.muted = true; video.preload = 'auto'; document.body.append(video);
              try {
                await new Promise((resolve, reject) => { video.onloadeddata = resolve; video.onerror = reject; video.src = SOURCE; });
                const duration = video.duration, width = video.videoWidth, height = video.videoHeight;
                const canvas = document.createElement('canvas');
                canvas.width = Math.min(1280, width); canvas.height = Math.round(canvas.width * height / width);
                const frames = [];
                for (const fraction of [0.02, 0.12, 0.3, 0.5, 0.7, 0.88, 0.98]) {
                  const time = Math.min(duration - 0.05, duration * fraction);
                  await new Promise(resolve => { video.onseeked = resolve; video.currentTime = time; });
                  canvas.getContext('2d').drawImage(video, 0, 0, canvas.width, canvas.height);
                  frames.push({time, image: canvas.toDataURL('image/jpeg', 0.86)});
                }
                return {duration, width, height, frames};
              } finally { video.removeAttribute('src'); video.load(); video.remove(); }
            })()""".replace('SOURCE', json.dumps('/' + source)))
            for frame_index, frame in enumerate(result.pop('frames')):
                filename = f'{index:02}-{frame_index:02}.jpg'
                (output / filename).write_bytes(base64.b64decode(frame['image'].split(',', 1)[1]))
                records.append({'image': filename, 'source': source, 'time': frame['time'], **result})
            print(f'Captured video {index + 1}/{len(videos)}: {source}', flush=True)
        (ROOT / '.tmp-privacy/video-map.json').write_text(json.dumps(records, indent=2), encoding='utf-8')
    finally:
        if browser:
            browser.socket.close()
        process.terminate()
        server.shutdown()


if __name__ == '__main__':
    main()
