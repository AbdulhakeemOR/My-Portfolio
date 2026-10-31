"""Check document structure, local links, CMS data, and fallback content."""

from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import unquote, urlsplit
import json
import re
import tomllib


ROOT = Path(__file__).resolve().parent.parent


class Page(HTMLParser):
    VOID = {'area', 'base', 'br', 'col', 'embed', 'hr', 'img', 'input', 'link', 'meta', 'param', 'source', 'track', 'wbr'}

    def __init__(self):
        super().__init__()
        self.stack = []
        self.ids = set()
        self.links = []
        self.headings = 0

    def handle_starttag(self, tag, attrs):
        attrs = dict(attrs)
        if tag not in self.VOID:
            self.stack.append(tag)
        if 'id' in attrs:
            assert attrs['id'] not in self.ids, f'Duplicate id: {attrs["id"]}'
            self.ids.add(attrs['id'])
        if tag == 'h1':
            self.headings += 1
        if tag == 'img':
            assert 'alt' in attrs, 'Image is missing alt text.'
        for name in ('href', 'src', 'poster'):
            if attrs.get(name):
                self.links.append(attrs[name])

    def handle_endtag(self, tag):
        assert self.stack and self.stack[-1] == tag, f'Unexpected closing tag: {tag}; stack: {self.stack}'
        self.stack.pop()


def main():
    pages = {}
    for path in ROOT.glob('*.html'):
        page = Page()
        page.feed(path.read_text(encoding='utf-8'))
        assert not page.stack, (path.name, page.stack)
        assert page.headings == 1, (path.name, 'Expected one main heading.')
        pages[path.name] = page

    count = 0
    for name, page in pages.items():
        for link in page.links:
            parsed = urlsplit(link)
            if parsed.scheme or parsed.netloc:
                continue
            target = ROOT / unquote(parsed.path.lstrip('/')) if parsed.path else ROOT / name
            assert target.exists(), (name, 'Missing local file', link)
            if parsed.fragment and target.name in pages:
                assert unquote(parsed.fragment) in pages[target.name].ids, (name, 'Missing anchor', link)
            count += 1

    for collection in ('projects', 'articles'):
        data = json.loads((ROOT / f'content/{collection}.json').read_text(encoding='utf-8'))[collection]
        slugs = [item['slug'] for item in data]
        assert len(slugs) == len(set(slugs)), f'Duplicate {collection} slug.'
        assert all(re.fullmatch(r'[a-z0-9]+(?:-[a-z0-9]+)*', slug) for slug in slugs)
        for item in data:
            for media in item.get('gallery', []):
                for field in ('image', 'video', 'poster'):
                    if media.get(field) and not urlsplit(media[field]).scheme:
                        assert (ROOT / media[field].lstrip('/')).exists(), media[field]
            for field in ('image', 'video', 'poster'):
                if item.get(field) and not urlsplit(item[field]).scheme:
                    assert (ROOT / item[field].lstrip('/')).exists(), item[field]

    with (ROOT / 'netlify.toml').open('rb') as file:
        tomllib.load(file)

    css = (ROOT / 'assets' / 'css' / 'style.css').read_text(encoding='utf-8')
    assert css.count('{') == css.count('}'), 'Unbalanced CSS braces.'
    assert 'data-language="ar"' in (ROOT / 'index.html').read_text(encoding='utf-8')
    print(f'PASS: {len(pages)} pages, {count} local references, HTML nesting, unique IDs, content slugs, media paths, TOML, and CSS braces.')


if __name__ == '__main__':
    main()
