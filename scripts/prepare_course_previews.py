"""Create small carousel covers from the already-reviewed public certificates."""

from pathlib import Path
import pymupdf
from PIL import Image
from course_content import load, previews, ROOT


def main():
    output = ROOT / 'assets/images/course-previews'
    output.mkdir(parents=True, exist_ok=True)
    paths = {url for group in load()['groups'] for item in group['items'] for _, url in previews(item)}
    for url in sorted(paths):
        source = ROOT / url
        destination = output / (Path(url).stem + '.webp')
        with pymupdf.open(source) as document:
            page = document[0]
            pixmap = page.get_pixmap(matrix=pymupdf.Matrix(560 / page.rect.width, 560 / page.rect.width), alpha=False)
            image = Image.frombytes('RGB', (pixmap.width, pixmap.height), pixmap.samples)
            image.save(destination, 'WEBP', quality=78)
    print(f'Created {len(paths)} course covers from public certificate copies.')


if __name__ == '__main__':
    main()
