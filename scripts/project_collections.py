"""Shared collection rules and generated, bookmarkable gallery pages."""

from html import escape
from pathlib import Path
import re
from site_html import format_html

ROOT = Path(__file__).resolve().parent.parent
MARKER = '<!-- Generated project collection; edit content/projects.json. -->'


def media_items(project):
    items = []
    if project.get('image'):
        items.append({'image': project['image'], 'image_alt': project.get('image_alt', project['title']), 'caption': project.get('image_alt', project['title'])})
    if project.get('video'):
        items.append({'video': project['video'], 'poster': project.get('poster', ''), 'caption': project['title']})
    for item in project.get('gallery', []):
        if item.get('image'):
            items.append({key: value for key, value in item.items() if key not in ('video', 'poster')})
        if item.get('video'):
            items.append({key: value for key, value in item.items() if key not in ('image', 'image_alt')})
    return items


def collection_url(project):
    return f'project-{project["slug"]}.html'


def generate_pages(projects, render_gallery):
    template = (ROOT / 'projects.html').read_text(encoding='utf-8')
    selected = [project for project in projects if len(media_items(project)) > 2]
    generated = {collection_url(project) for project in selected}
    for path in ROOT.glob('project-*.html'):
        if path.name not in generated and MARKER in path.read_text(encoding='utf-8'):
            path.unlink()
            for language in ('en', 'ar'):
                localized = ROOT / language / path.name
                if localized.exists():
                    localized.unlink()
    for project in selected:
        title = escape(project['title'])
        description = escape(project['description'])
        items = media_items(project)
        body = '\n'.join([
            '<main id="main-content">', MARKER,
            '  <section class="hero collection-intro">',
            '    <p class="page-eyebrow">Selected work</p>',
            f'    <h1>{title}</h1>', f'    <p>{description}</p>',
            f'    <p class="collection-count">{len(items)} items</p>',
            f'    <a class="secondary-cta" href="projects.html#project-{escape(project["slug"], quote=True)}">Back to projects</a>',
            '  </section>',
            '  <section class="collection-page" aria-labelledby="collection-title">',
            '    <h2 id="collection-title">Project gallery</h2>',
            '    <p>Select an image to view a larger copy. Videos play on demand.</p>',
            render_gallery(items, standalone=True),
            '  </section>', '</main>'
        ])
        page = re.sub(r'<main\b.*?</main>', lambda _: body, template, count=1, flags=re.S)
        page = re.sub(r'<title>.*?</title>', lambda _: f'<title>{title}</title>', page, count=1, flags=re.S)
        page = re.sub(r'(<meta (?:name="description"|property="og:description") content=")[^"]*(")', lambda match: match[1] + escape(project['description'], quote=True) + match[2], page)
        page = re.sub(r'(<meta property="og:title" content=")[^"]*(")', lambda match: match[1] + escape(project['title'], quote=True) + match[2], page)
        cover = project.get('image') or project.get('poster')
        if cover:
            page = re.sub(r'(<meta property="og:image" content=")[^"]*(")', lambda match: match[1] + escape(cover, quote=True) + match[2], page)
            page = re.sub(r'(<meta property="og:image:alt" content=")[^"]*(")', lambda match: match[1] + escape(project.get('image_alt', project['title']), quote=True) + match[2], page)
        # Metadata is regenerated for the collection's own URL.
        page = re.sub(r'\s*<link rel="(?:canonical|alternate)"[^>]*>', '', page)
        page = re.sub(r'\s*<meta property="og:url"[^>]*>', '', page)
        page = page.replace('aria-current="page" ', '')
        (ROOT / collection_url(project)).write_text(format_html(page), encoding='utf-8', newline='\r\n')
