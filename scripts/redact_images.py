"""Apply the user's approved opaque masks to public artwork copies only."""

import json
from pathlib import Path
import shutil

from PIL import Image, ImageDraw

ROOT = Path(__file__).resolve().parent.parent


def redact_image(path, regions):
    with Image.open(path) as source:
        image = source.convert('RGBA' if 'A' in source.getbands() else 'RGB')
        draw = ImageDraw.Draw(image)
        for x, y, width, height in regions:
            left, top = int(x * image.width), int(y * image.height)
            right = min(image.width, int((x + width) * image.width + 1))
            bottom = min(image.height, int((y + height) * image.height + 1))
            draw.rectangle((left, top, right, bottom), fill=(24, 33, 31, 255) if image.mode == 'RGBA' else (24, 33, 31))
        if path.suffix.lower() == '.webp':
            image.save(path, 'WEBP', lossless=True, method=6)
        else:
            image.save(path)


def main():
    manifest = json.loads((ROOT / 'content/privacy.json').read_text(encoding='utf-8'))
    for name, regions in manifest['images'].items():
        path = ROOT / name
        assert path.resolve().is_relative_to(ROOT / 'assets/images')
        redact_image(path, regions)
        # A new URL avoids previously cached, unredacted gallery images.
        public_path = path.with_stem(path.stem + '-public')
        shutil.copyfile(path, public_path)
    projects_path = ROOT / 'content/projects.json'
    projects = json.loads(projects_path.read_text(encoding='utf-8'))
    replacements = {name: str(Path(name).with_stem(Path(name).stem + '-public')).replace('\\', '/') for name in manifest['images']}

    def update(value):
        if isinstance(value, dict):
            for key in ('image', 'poster'):
                if value.get(key) in replacements:
                    value[key] = replacements[value[key]]
            for child in value.values():
                update(child)
        elif isinstance(value, list):
            for child in value:
                update(child)

    update(projects)
    projects_path.write_text(json.dumps(projects, ensure_ascii=False, indent=2) + '\n', encoding='utf-8')
    print(f'Applied permanent opaque masks to {len(manifest["images"])} public artwork copies.')


if __name__ == '__main__':
    main()
