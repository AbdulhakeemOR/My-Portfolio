"""Create public video copies and burn the reviewed privacy masks into pixels."""

import json
from pathlib import Path
import subprocess

import imageio_ffmpeg

ROOT = Path(__file__).resolve().parent.parent


def main():
    manifest = json.loads((ROOT / 'content/privacy.json').read_text(encoding='utf-8'))
    binary = imageio_ffmpeg.get_ffmpeg_exe()
    for source, settings in manifest['videos'].items():
        target = ROOT / settings['output']
        assert target.resolve().is_relative_to(ROOT / 'assets/videos')
        target.parent.mkdir(parents=True, exist_ok=True)
        command = [binary, '-hide_banner', '-loglevel', 'error', '-y', '-i', str(ROOT / source), '-map', '0:v:0', '-map', '0:a?', '-map_metadata', '-1', '-map_chapters', '-1']
        if settings['regions']:
            filters = ['scale=1920:-2']
            for region in settings['regions']:
                x, y, width, height = region['box']
                filters.append(f"drawbox=x=iw*{x}:y=ih*{y}:w=iw*{width}:h=ih*{height}:color=black@1:t=fill:enable='between(t,{region['start']},{region['end']})'")
            command += ['-vf', ','.join(filters), '-c:v', 'libx264', '-preset', 'veryfast', '-crf', '18', '-threads', '4', '-pix_fmt', 'yuv420p', '-c:a', 'copy']
        else:
            command += ['-c', 'copy']
        command += ['-movflags', '+faststart', str(target)]
        result = subprocess.run(command, capture_output=True, text=True)
        if result.returncode:
            raise RuntimeError(f'Video preparation failed for {source}: {result.stderr[-1000:]}')
        print(f'Prepared {settings["output"]}', flush=True)

    # Use only the reviewed public copies in both runtime JSON and generated pages.
    path = ROOT / 'content/projects.json'
    data = json.loads(path.read_text(encoding='utf-8'))

    def update(value):
        if isinstance(value, dict):
            if value.get('video') in manifest['videos']:
                value['video'] = manifest['videos'][value['video']]['output']
            for child in value.values():
                update(child)
        elif isinstance(value, list):
            for child in value:
                update(child)

    update(data)
    path.write_text(json.dumps(data, ensure_ascii=False, indent=2) + '\n', encoding='utf-8')


if __name__ == '__main__':
    main()
