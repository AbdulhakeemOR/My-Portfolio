"""Save actual walkthrough frames as lightweight project preview images.

Requires Windows with Microsoft Edge installed. Run after adding videos to
content/projects.json. Existing poster images are left untouched.
"""

from pathlib import Path
from urllib.request import urlopen
from urllib.parse import unquote, urlsplit
import argparse
import base64
import json
import subprocess
import tempfile
import threading
import time

from check_browser import Browser, EDGE, PreviewServer, QuietHandler


ROOT = Path(__file__).resolve().parent.parent


class VideoHandler(QuietHandler):
    def do_GET(self):
        path = (ROOT / unquote(urlsplit(self.path).path).lstrip('/')).resolve()
        if not path.is_relative_to(ROOT) or path.suffix.lower() != '.mp4' or not path.is_file():
            return super().do_GET()

        size = path.stat().st_size
        start, end = 0, size - 1
        requested = self.headers.get('Range')
        if requested:
            first, last = requested.removeprefix('bytes=').split('-', 1)
            start = int(first) if first else max(0, size - int(last))
            end = min(int(last), size - 1) if first and last else size - 1

        self.send_response(206 if requested else 200)
        self.send_header('Content-Type', 'video/mp4')
        self.send_header('Accept-Ranges', 'bytes')
        self.send_header('Content-Length', str(end - start + 1))
        if requested:
            self.send_header('Content-Range', f'bytes {start}-{end}/{size}')
        self.end_headers()

        with path.open('rb') as file:
            file.seek(start)
            remaining = end - start + 1
            while remaining > 0:
                chunk = file.read(min(65536, remaining))
                if not chunk:
                    break
                self.wfile.write(chunk)
                remaining -= len(chunk)


def main(replace=False):
    projects = json.loads((ROOT / 'content/projects.json').read_text(encoding='utf-8'))['projects']
    gallery_videos = []
    for project in projects:
        for index, item in enumerate(project.get('gallery', []), start=1):
            if item.get('video'):
                gallery_videos.append({
                    **item,
                    'title': item.get('caption', project['title']),
                    'slug': f'{project["slug"]}-gallery-{index}'
                })
    projects = projects + gallery_videos
    pending = [
        project for project in projects
        if project.get('video') and project.get('poster')
        and (
            not (ROOT / project['poster']).exists()
            or replace and project['poster'].endswith('-walkthrough.webp')
        )
    ]

    if not pending:
        print('All walkthrough posters already exist.')
        return

    server = PreviewServer(('127.0.0.1', 0), VideoHandler)
    threading.Thread(target=server.serve_forever, daemon=True).start()
    address = f'http://127.0.0.1:{server.server_port}'
    profile = tempfile.mkdtemp(prefix='aor-video-posters-')
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
        target = next(page for page in pages if page['type'] == 'page')
        browser = Browser(target['webSocketDebuggerUrl'])
        browser.call('Page.enable')
        browser.call('Page.navigate', {'url': address + '/projects.html'})
        time.sleep(0.5)

        for project in pending:
            video_path = json.dumps('/' + project['video'])
            preview_time = 5 if project['slug'] == 'poster-type-studio' else 12
            result = browser.evaluate(f"""(async () => {{
              const video = document.createElement('video');
              video.muted = true;
              video.preload = 'auto';
              document.body.append(video);

              try {{
                const frame = (async () => {{
                  await new Promise((resolve, reject) => {{
                    video.onerror = () => reject(new Error('Could not decode the walkthrough.'));
                    video.onloadeddata = resolve;
                    video.src = {video_path};
                  }});

                  const target = Math.min(video.duration * 0.35, {preview_time});
                  await new Promise(resolve => {{
                    video.onseeked = resolve;
                    video.currentTime = target;
                  }});

                  if (Math.abs(video.currentTime - target) > 0.5) throw new Error('The video did not seek to the requested frame.');

                    const canvas = document.createElement('canvas');
                    canvas.width = Math.min(video.videoWidth, 960);
                    canvas.height = Math.round(canvas.width * video.videoHeight / video.videoWidth);
                    canvas.getContext('2d').drawImage(video, 0, 0, canvas.width, canvas.height);
                    return {{
                      image: canvas.toDataURL('image/webp', 0.88),
                      duration: video.duration,
                      time: video.currentTime,
                      width: video.videoWidth,
                      height: video.videoHeight
                    }};
                }})();

                return await Promise.race([
                  frame,
                  new Promise((_, reject) => setTimeout(() => reject(new Error('Video frame timed out.')), 12000))
                ]);
              }} finally {{
                video.removeAttribute('src');
                video.load();
                video.remove();
              }}
            }})()""")

            poster = ROOT / project['poster']
            poster.parent.mkdir(parents=True, exist_ok=True)
            poster.write_bytes(base64.b64decode(result.pop('image').split(',', 1)[1]))
            print(f'{project["title"]}: {result}; poster {poster.stat().st_size:,} bytes')
    finally:
        if browser:
            browser.socket.close()
        process.terminate()
        server.shutdown()


if __name__ == '__main__':
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--replace', action='store_true', help='Recapture existing walkthrough preview images.')
    main(parser.parse_args().replace)
