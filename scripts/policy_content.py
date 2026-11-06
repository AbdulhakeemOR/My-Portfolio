"""Generate policy pages and their translation pairs from the shared content."""
from datetime import date
from html import escape
import json

MARKER = '<!-- Generated policy page; edit content/policies.json. -->'


def load(root):
    return json.loads((root / 'content/policies.json').read_text(encoding='utf-8'))


def translation_pairs(root):
    content = load(root)
    result = {'Policy sections': 'أقسام السياسة', 'Read the Privacy Policy.': 'اقرأ سياسة الخصوصية.',
              'Read the Terms & Policies.': 'اقرأ الشروط والسياسات.',
              'Privacy Policy': 'سياسة الخصوصية', 'Terms & Policies': 'الشروط والسياسات',
              'Website policies': 'سياسات الموقع'}
    day = date.fromisoformat(content['updated'])
    months = ('يناير', 'فبراير', 'مارس', 'أبريل', 'مايو', 'يونيو', 'يوليو', 'أغسطس', 'سبتمبر', 'أكتوبر', 'نوفمبر', 'ديسمبر')
    result[updated_label(content)] = f'آخر تحديث: {day.day} {months[day.month - 1]} {day.year}'
    for page in content['pages']:
        result[page['title']] = page['title_ar']
        result[page['title'] + ' | Abdulhakeem Oladapo Raji'] = page['title_ar'] + ' | عبد الحكيم أولادابو راجي'
        result[page['description']] = page['description_ar']
        result[page['intro']] = page['intro_ar']
        for section in page['sections']:
            result[section['heading']] = section['heading_ar']
            result.update(section['paragraphs'])
    return result


def updated_label(content):
    day = date.fromisoformat(content['updated'])
    return f'Last updated: {day.day} {day.strftime("%B %Y")}'


def generate(root):
    content = load(root)
    header = (root / 'templates/header.html').read_text(encoding='utf-8').strip()
    footer = (root / 'templates/footer.html').read_text(encoding='utf-8').strip()
    for page in content['pages']:
        target = root / (page['slug'] + '.html')
        if target.exists() and MARKER not in target.read_text(encoding='utf-8'):
            raise ValueError(f'Refusing to overwrite an unrecognized policy page: {target.name}')
        title = escape(page['title'] + ' | Abdulhakeem Oladapo Raji', quote=True)
        description = escape(page['description'], quote=True)
        toc = '\n'.join(f'<li><a href="#{escape(s["id"], quote=True)}">{escape(s["heading"])}</a></li>' for s in page['sections'])
        sections = []
        for section in page['sections']:
            paragraphs = '\n'.join('<p>' + escape(en) + '</p>' for en, ar in section['paragraphs'])
            sections.append(f'<section aria-labelledby="{section["id"]}"><h2 id="{section["id"]}">{escape(section["heading"])}</h2>\n{paragraphs}</section>')
        body = '\n'.join(sections)
        text = f'''<!doctype html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="description" content="{description}">
  <meta name="color-scheme" content="light dark">
  <meta name="theme-color" content="#ffffff">
  <title>{title}</title>
  <meta property="og:title" content="{title}">
  <meta property="og:description" content="{description}">
  <meta property="og:type" content="website">
  <script src="assets/js/theme.js"></script>
  <script src="assets/js/language.js" defer></script>
  <link rel="stylesheet" href="assets/css/style.css">
</head>
<body id="top">
{MARKER}
<a class="skip-link" href="#main-content">Skip to main content</a>
{header}
<main id="main-content" class="policy-page">
  <section class="hero" aria-labelledby="policy-title">
    <h1 id="policy-title">{escape(page['title'])}</h1>
    <p>{escape(page['intro'])}</p>
    <p>{updated_label(content)}</p>
  </section>
  <div class="policy-content">
    <nav class="policy-toc" aria-label="Policy sections"><ul>{toc}</ul></nav>
    {body}
    <p><a href="contact.html#contact-form">Get in touch</a></p>
  </div>
</main>
<button class="back-to-top" type="button" tabindex="-1" aria-hidden="true" aria-label="Back to top" title="Back to top">
  <span aria-hidden="true">&uarr;</span>
</button>
{footer}
<script src="assets/js/script.js" defer></script>
</body>
</html>
'''
        target.write_text(text, encoding='utf-8')
