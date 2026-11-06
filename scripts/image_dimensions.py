"""Read image headers without changing images or requiring a build dependency."""
from functools import lru_cache
from html import unescape
import json
import re
import struct
from itertools import chain
from urllib.parse import unquote, urlsplit


@lru_cache(maxsize=None)
def dimensions(path):
    data = path.read_bytes()
    if data.startswith(b'\x89PNG\r\n\x1a\n'):
        return struct.unpack('>II', data[16:24])
    if data[:3] == b'GIF':
        return struct.unpack('<HH', data[6:10])
    if data[:4] == b'RIFF' and data[8:12] == b'WEBP':
        if data[12:16] == b'VP8X':
            return 1 + int.from_bytes(data[24:27], 'little'), 1 + int.from_bytes(data[27:30], 'little')
        if data[12:16] == b'VP8L':
            bits = int.from_bytes(data[21:25], 'little')
            return (bits & 16383) + 1, ((bits >> 14) & 16383) + 1
        if data[23:26] == b'\x9d\x01\x2a':
            width, height = struct.unpack('<HH', data[26:30])
            return width & 16383, height & 16383
    if data[:2] == b'\xff\xd8':
        index = 2
        while index < len(data):
            if data[index] != 255:
                break
            while data[index] == 255:
                index += 1
            marker = data[index]
            index += 1
            if marker in (0xD8, 0xD9) or 0xD0 <= marker <= 0xD7:
                continue
            size = int.from_bytes(data[index:index + 2], 'big')
            if marker in (0xC0, 0xC1, 0xC2, 0xC3, 0xC5, 0xC6, 0xC7, 0xC9, 0xCA, 0xCB, 0xCD, 0xCE, 0xCF):
                height, width = struct.unpack('>HH', data[index + 3:index + 7])
                return width, height
            if size < 2:
                break
            index += size
    return None


def apply_dimensions(root):
    sizes = {}
    for path in chain((root / 'assets').rglob('*'), (root / 'demos/previews').rglob('*')):
        if path.suffix.lower() in ('.png', '.webp', '.jpg', '.jpeg', '.gif'):
            size = dimensions(path)
            if size:
                sizes['/' + path.relative_to(root).as_posix()] = size
    for page in root.glob('*.html'):
        text = page.read_text(encoding='utf-8')

        def enrich(match):
            tag = match[0]
            source = re.search(r'\bsrc="([^"]+)"', tag)
            if not source or (re.search(r'\bwidth=', tag) and re.search(r'\bheight=', tag)):
                return tag
            parsed = urlsplit(unescape(source[1]))
            size = sizes.get('/' + unquote(parsed.path).lstrip('/')) if not parsed.scheme else None
            if not size:
                return tag
            width, height = size
            old_width = re.search(r'\bwidth="(\d+)"', tag)
            old_height = re.search(r'\bheight="(\d+)"', tag)
            if old_width:
                height = round(height * int(old_width[1]) / width)
            elif old_height:
                width = round(width * int(old_height[1]) / height)
            attrs = ''
            if not old_width:
                attrs += f' width="{width}"'
            if not old_height:
                attrs += f' height="{height}"'
            return tag[:-1] + attrs + '>'

        text = re.sub(r'<img\b[^>]*>', enrich, text)
        text = re.sub(r'\s*<script src="assets/js/image-sizes.js" defer></script>', '', text)
        text = re.sub(r'(?=<script src="assets/js/(?:script|site-script-[a-f0-9]{12})\.js)', '<script src="assets/js/image-sizes.js" defer></script>\n    ', text)
        page.write_text(text, encoding='utf-8')
    (root / 'assets/js/image-sizes.js').write_text('window.AOR_IMAGE_SIZES = ' + json.dumps(sizes, separators=(',', ':')) + ';\n', encoding='utf-8')
