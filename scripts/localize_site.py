"""Generate English and Arabic pages from the shared sources and reviewed catalog."""

from html import escape
from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import urlsplit
import json
import hashlib
import re

ROOT = Path(__file__).resolve().parent.parent
PAGES = tuple(p.name for p in ROOT.glob('*.html'))


def catalog():
    messages = json.loads((ROOT / 'content/i18n/ar.json').read_text(encoding='utf-8'))
    from course_content import translation_pairs
    messages.update(translation_pairs())
    articles = json.loads((ROOT / 'content/articles.json').read_text(encoding='utf-8'))['articles']
    for article in articles:
        path = ROOT / 'content/i18n/articles' / (article['slug'] + '.ar.md')
        if not path.exists():
            continue
        source = article['body'].split('\n\n')
        target = path.read_text(encoding='utf-8').strip().split('\n\n')
        if len(source) != len(target):
            raise ValueError(f'{path.name}: expected {len(source)} blocks, got {len(target)}')
        for english, arabic in zip(source, target):
            messages[english] = arabic
            # Static article markup separates headings and individual list items.
            for en_line, ar_line in zip(english.splitlines(), arabic.splitlines()):
                messages[re.sub(r'^(?:#{2,3}|-)\s+', '', en_line)] = re.sub(r'^(?:#{2,3}|-)\s+', '', ar_line)
    for source, target in list(messages.items()):
        messages.setdefault(translation_key(source), target)
    return messages


def translation_key(text):
    return text.strip().translate(str.maketrans({
        '\u2018': "'", '\u2019': "'", '\u201c': '"', '\u201d': '"', '\u00a0': ' ',
    }))


def translate(text, messages):
    stripped = text.strip()
    if stripped in messages:
        return text.replace(stripped, messages[stripped])
    normalized = translation_key(stripped)
    # Content editors can change quotation marks without changing the message.
    if normalized in messages:
        return text.replace(stripped, messages[normalized])
    # Article bodies contain Markdown headings and occasionally grouped lines.
    if '\n' in stripped:
        return '\n'.join(translate(line, messages) for line in text.split('\n'))
    prefix = re.match(r'^(#{2,3}|-)\s+(.+)$', stripped)
    if prefix:
        return text.replace(stripped, prefix[1] + ' ' + translate(prefix[2], messages))
    patterns = [
        (r'Carousel (\d+)', r'منشور متعدد الشرائح \1'),
        (r'Learning Carousel (\d+)', r'منشور تعليمي متعدد الشرائح \1'),
        (r'Graphic (\d+)', r'تصميم \1'),
        (r'Static Ad (\d+)', r'إعلان ثابت \1'),
        (r'Video Ad (\d+)', r'إعلان فيديو \1'),
        (r'Story Frame (\d+)', r'شريحة قصة \1'),
        (r'Explore collection \((\d+) items\)', r'استعرض المجموعة (\1 عنصرًا)'),
        (r'View collection \((\d+) items\)', r'عرض المجموعة (\1 عنصرًا)'),
        (r'(\d+) items', r'\1 عنصرًا'),
        (r'(\d+) min read', r'مدة القراءة: \1 دقائق'),
        (r'(\d+) items? shown\.', r'عدد العناصر المعروضة: \1'),
        (r'(\d+) / (\d+) characters', r'\1 / \2 حرف'),
        (r'Flyer (\d+) \? student services and awareness materials', r'المنشور \1 — خدمات الطلاب والتوعية'),
        (r'Poster (\d+) \? student services and awareness materials', r'الملصق \1 — خدمات الطلاب والتوعية'),
        (r'Arabic student-services flyer design (\d+)', r'تصميم منشور عربي لخدمات الطلاب \1'),
        (r'Arabic student-services poster design (\d+)', r'تصميم ملصق عربي لخدمات الطلاب \1'),
    ]
    for pattern, replacement in patterns:
        if re.fullmatch(pattern, stripped):
            return text.replace(stripped, re.sub(pattern, replacement, stripped))
    return text


def asset_url(value):
    if not value:
        return value
    parsed = urlsplit(value)
    if parsed.scheme or parsed.netloc or value.startswith(('#', '/', '../')):
        return value
    if parsed.path in PAGES:
        return value
    return '../' + value


class LocalizedHTML(HTMLParser):
    def __init__(self, language, page, messages):
        super().__init__(convert_charrefs=True)
        self.language, self.page, self.messages = language, page, messages
        self.output = []
        self.raw = 0

    def handle_decl(self, decl):
        self.output.append(f'<!{decl}>')

    def handle_comment(self, data):
        self.output.append(f'<!--{data}-->')

    def handle_starttag(self, tag, attrs):
        attrs = dict(attrs)
        if tag == 'html':
            attrs.update(lang=self.language, dir='rtl' if self.language == 'ar' else 'ltr')
        if attrs.get('data-language'):
            lang = attrs['data-language']
            attrs['href'] = f'../{lang}/{self.page}'
            if lang == self.language:
                attrs['aria-current'] = 'true'
            else:
                attrs.pop('aria-current', None)
        else:
            for field in ('href', 'src', 'poster', 'action'):
                if attrs.get(field):
                    attrs[field] = asset_url(attrs[field])
        # Keep submitted service values stable when translating option labels.
        if self.language == 'ar':
            for field in ('alt', 'title', 'placeholder', 'aria-label'):
                if attrs.get(field):
                    attrs[field] = translate(attrs[field], self.messages)
            if tag == 'meta' and (attrs.get('name') == 'description' or attrs.get('property') in ('og:title', 'og:description', 'og:image:alt')):
                attrs['content'] = translate(attrs['content'], self.messages)
        self.output.append('<' + tag + ''.join(' ' + k + (f'="{escape(v, quote=True)}"' if v is not None else '') for k, v in attrs.items()) + '>')
        if tag in ('script', 'style'):
            self.raw += 1

    def handle_endtag(self, tag):
        if tag in ('script', 'style'):
            self.raw -= 1
        self.output.append(f'</{tag}>')

    def handle_data(self, text):
        self.output.append(text if self.raw else escape(translate(text, self.messages) if self.language == 'ar' else text, quote=False))

    def handle_entityref(self, name):
        self.output.append(f'&{name};')

    def handle_charref(self, name):
        self.output.append(f'&#{name};')


def localize_json(value, language, messages, field=''):
    if isinstance(value, dict):
        return {k: localize_json(v, language, messages, k) for k, v in value.items()}
    if isinstance(value, list):
        return [localize_json(v, language, messages, field) for v in value]
    if not isinstance(value, str):
        return value
    if field in ('image', 'video', 'poster', 'external_url'):
        return asset_url(value)
    if language == 'ar' and field not in ('slug', 'category', 'categories', 'status', 'image_fit', 'date', 'tool'):
        if field == 'body':
            return '\n\n'.join(translate(block, messages) for block in value.split('\n\n'))
        return translate(value, messages)
    return value


def build_languages():
    messages = catalog()
    translations = 'window.AOR_AR = ' + json.dumps(messages, ensure_ascii=False) + ';\n'
    (ROOT / 'assets' / 'js' / 'translations-ar.js').write_text(translations, encoding='utf-8')
    translation_version = hashlib.sha256(translations.encode('utf-8')).hexdigest()[:12]
    language_version = hashlib.sha256((ROOT / 'assets/js/language.js').read_bytes()).hexdigest()[:12]
    for name in PAGES:
        path = ROOT / name
        text = path.read_text(encoding='utf-8')
        # Recalculate versions on each build rather than retaining an old URL.
        text = re.sub(r'(src="assets/js/language\.js)(?:\?[^" ]*)?"', r'\1"', text)
        text = re.sub(r'\s*<link rel="alternate"[^>]*hreflang[^>]*>', '', text)
        if 'src="assets/js/language.js"' not in text:
            text = text.replace('<script src="assets/js/theme.js"></script>', '<script src="assets/js/theme.js"></script>\n    <script src="assets/js/language.js" defer></script>')
        # Give translated select options an explicit English value for service links.
        text = re.sub(r'<option>([^<]+)</option>', lambda m: f'<option value="{escape(m[1], quote=True)}">{m[1]}</option>', text)
        for lang in ('en', 'ar'):
            text = re.sub(rf'(<a href=")[^"]+(" data-language="{lang}")', rf'\g<1>{lang}/{name}\2', text)
        alternates = ''.join(f'\n    <link rel="alternate" hreflang="{lang}" href="{lang}/{name}">' for lang in ('en', 'ar'))
        alternates += f'\n    <link rel="alternate" hreflang="x-default" href="en/{name}">'
        text = text.replace('</head>', alternates + '\n  </head>')
        path.write_text(text, encoding='utf-8', newline='\r\n')
        for language in ('en', 'ar'):
            folder = ROOT / language
            folder.mkdir(exist_ok=True)
            parser = LocalizedHTML(language, name, messages)
            parser.feed(text)
            localized = ''.join(parser.output)
            if language == 'ar':
                localized = localized.replace('<script src="../assets/js/language.js"', f'<script src="../assets/js/translations-ar.js?v={translation_version}"></script>\n    <script src="../assets/js/language.js"')
            localized = localized.replace('src="../assets/js/language.js"', f'src="../assets/js/language.js?v={language_version}"')
            (folder / name).write_text(localized, encoding='utf-8', newline='\r\n')
        text = text.replace('src="assets/js/language.js"', f'src="assets/js/language.js?v={language_version}"')
        path.write_text(text, encoding='utf-8', newline='\r\n')
    for language in ('en', 'ar'):
        folder = ROOT / language / 'content'
        folder.mkdir(exist_ok=True)
        for collection in ('projects', 'articles'):
            data = json.loads((ROOT / f'content/{collection}.json').read_text(encoding='utf-8'))
            translated = localize_json(data, language, messages)
            (folder / f'{collection}.json').write_text(json.dumps(translated, ensure_ascii=False, indent=2) + '\n', encoding='utf-8')
    print('English and Arabic pages and content are synchronized.')


if __name__ == '__main__':
    build_languages()
