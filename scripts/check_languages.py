"""Check localized markup, local links, media, and translation coverage."""

from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import unquote, urlsplit
import json
import hashlib
import re
import shutil
import tempfile
import tomllib
import xml.etree.ElementTree as ET

from localize_site import ROOT, PAGES, catalog, translate, localize_json
from check_site import Page as HTMLPage
import configure_site


class Page(HTMLParser):
    def __init__(self):
        super().__init__()
        self.links = []
        self.texts = []
        self.raw = 0
        self.ids = set()

    def handle_starttag(self, tag, attrs):
        attrs = dict(attrs)
        if tag in ('script', 'style'):
            self.raw += 1
        if attrs.get('id'):
            assert attrs['id'] not in self.ids, attrs['id']
            self.ids.add(attrs['id'])
        for field in ('src', 'href', 'poster', 'action'):
            if attrs.get(field):
                self.links.append(attrs[field])
        for field in ('alt', 'placeholder', 'aria-label', 'title'):
            if attrs.get(field):
                self.texts.append(attrs[field])
        if tag == 'meta' and (attrs.get('name') == 'description' or attrs.get('property') in ('og:title', 'og:description', 'og:image:alt')):
            self.texts.append(attrs['content'])

    def handle_endtag(self, tag):
        if tag in ('script', 'style'):
            self.raw -= 1

    def handle_data(self, text):
        if not self.raw and text.strip():
            self.texts.append(text.strip())


def main():
    messages = catalog()
    for language in ('en', 'ar'):
        assert localize_json({'video': '', 'poster': '', 'external_url': ''}, language, messages) == {'video': '', 'poster': '', 'external_url': ''}, 'Empty media URLs must stay empty.'
    translation_script = (ROOT / 'assets/js/translations-ar.js').read_text(encoding='utf-8')
    translation_version = hashlib.sha256(translation_script.encode('utf-8')).hexdigest()[:12]
    language_version = hashlib.sha256((ROOT / 'assets/js/language.js').read_bytes()).hexdigest()[:12]
    assert not [key for key, value in messages.items() if '???' in value], 'Arabic catalog contains corrupted question-mark text.'
    missing = set()
    for name in PAGES:
        source = Page()
        source.feed((ROOT / name).read_text(encoding='utf-8'))
        for text in source.texts:
            if re.search(r'[A-Za-z]{3}', text) and translate(text, messages) == text:
                missing.add(text)
        for language in ('en', 'ar'):
            path = ROOT / language / name
            text = path.read_text(encoding='utf-8')
            markup = HTMLPage()
            markup.feed(text)
            assert not markup.stack, (path, markup.stack)
            assert markup.headings == 1, path
            assert f'lang="{language}"' in text
            assert f'dir="{"rtl" if language == "ar" else "ltr"}"' in text
            assert f'src="../assets/js/language.js?v={language_version}"' in text, (path, 'Stale language script URL')
            if language == 'ar':
                assert f'src="../assets/js/translations-ar.js?v={translation_version}"' in text, (path, 'Stale Arabic dictionary URL')
            page = Page()
            page.feed(text)
            assert not any('???' in value for value in page.texts), (path, 'Corrupted visible text')
            for link in page.links:
                parsed = urlsplit(link)
                if parsed.scheme or parsed.netloc:
                    continue
                target = (ROOT / parsed.path.lstrip('/') if parsed.path.startswith('/') else path.parent / unquote(parsed.path)) if parsed.path else path
                assert target.exists(), (path, link)
    # These intentionally retain their original spelling in both languages.
    allowed = {
        'AOR', 'CSS', 'CSS.', 'Canva', 'CapCut', 'Clearcopy Lab', 'English',
        'Evergreen Catalog', 'Excel.', 'Facebook', 'Google Workspace',
        'HTML', 'HTML.', 'HTML, CSS and JavaScript',
        'HTML, CSS, JavaScript, Canva', 'HTML, CSS, JavaScript, SVG, Canva',
        'HTML, CSS, JavaScript, localStorage, print CSS', 'Inkscape', 'Instagram',
        'JavaScript', 'JavaScript.', 'Launch Quality Pass', 'LinkedIn',
        'Microsoft Office', 'Poster Type Studio', 'Power BI.', 'Reddit',
        'Signal Studio', 'Snapchat', 'Threads', 'TikTok',
        'contact@abdulhakeemor.com',
    }
    assert not missing - allowed, f'Missing Arabic translations: {missing - allowed}'
    with (ROOT / 'netlify.toml').open('rb') as file:
        config = tomllib.load(file)
    headers = next(item['values'] for item in config['headers'] if item['for'] == '/*')
    assert headers['Content-Security-Policy'] == "frame-ancestors 'none';"
    assert headers['X-Frame-Options'] == 'DENY'
    # Exercise production metadata in an isolated copy without inventing a live URL.
    with tempfile.TemporaryDirectory(prefix='aor-metadata-') as temporary:
        folder = Path(temporary)
        for language in ('', 'en', 'ar'):
            (folder / language).mkdir(exist_ok=True)
            for name in configure_site.PAGES:
                shutil.copyfile(ROOT / language / name, folder / language / name)
        original_root = configure_site.ROOT
        try:
            configure_site.ROOT = folder
            configure_site.configure('https://example.test')
            sitemap = ET.parse(folder / 'sitemap.xml')
            assert len(sitemap.getroot()) == len(configure_site.PAGES) * 2
            for language in ('en', 'ar'):
                text = (folder / language / 'projects.html').read_text(encoding='utf-8')
                assert f'rel="canonical" href="https://example.test/{language}/projects.html"' in text
                for alternate in ('en', 'ar'):
                    assert f'hreflang="{alternate}" href="https://example.test/{alternate}/projects.html"' in text
        finally:
            configure_site.ROOT = original_root
    print(f'PASS: {len(PAGES) * 2} localized pages, HTML, links, Arabic coverage, production SEO metadata, sitemap, and embedding header configuration.')


if __name__ == '__main__':
    main()
