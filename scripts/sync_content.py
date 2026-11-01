"""Refresh readable HTML fallbacks after editing the JSON content files.

Run from the project folder with: python scripts/sync_content.py
The browser still loads the latest JSON when served over HTTP.
"""

from datetime import date
from html import escape
from pathlib import Path
import json
import os
import re

from site_html import format_html
from project_collections import media_items, collection_url, generate_pages


ROOT = Path(__file__).resolve().parent.parent


def value(text):
    return escape(str(text), quote=True)


def paragraphs(text, indent):
    return '\n'.join(
        f'{indent}<p>{value(paragraph).replace(chr(10), "<br>")}</p>'
        for paragraph in re.split(r'\n\s*\n', str(text)) if paragraph.strip()
    )


def article_body(text, indent):
    lines = []

    for block in re.split(r'\n\s*\n', str(text)):
        block = block.strip()
        if not block:
            continue

        heading = re.fullmatch(r'(#{2,3})\s+(.+)', block)
        if heading:
            tag = 'h4' if len(heading.group(1)) == 2 else 'h5'
            lines.append(f'{indent}<{tag}>{value(heading.group(2))}</{tag}>')
            continue

        items = block.splitlines()
        bullet_list = all(re.match(r'-\s+', item) for item in items)
        numbered_list = all(re.match(r'\d+\.\s+', item) for item in items)

        if bullet_list or numbered_list:
            tag = 'ul' if bullet_list else 'ol'
            start = f' start="{int(items[0].split(".")[0])}"' if numbered_list else ''
            lines.append(f'{indent}<{tag}{start}>')

            for item in items:
                item_text = re.sub(r'^(?:-|\d+\.)\s+', '', item)
                lines.append(f'{indent}  <li>{value(item_text)}</li>')

            lines.append(f'{indent}</{tag}>')
            continue

        lines.append(paragraphs(block, indent))

    return '\n\n'.join(lines)


def project_card(project):
    items = media_items(project)
    categories = project.get('categories') or [project.get('category', 'other')]
    lines = [f'        <article class="project-card filter-card" id="project-{value(project["slug"])}" data-category="{value(" ".join(categories))}">']

    if project.get('image'):
        fit = 'media-cover' if project.get('image_fit') == 'cover' else 'media-contain'
        lines.append(f'          <img loading="lazy" decoding="async" class="{fit}" src="{value(project["image"])}" alt="{value(project.get("image_alt", project["title"]))}">')

    if project.get('video') and not project.get('image'):
        poster = f' poster="{value(project["poster"])}"' if project.get('poster') else ''
        lines.extend([
            f'          <video src="{value(project["video"])}" controls playsinline preload="none"{poster} aria-label="{value(project["title"])}">',
            '            Your browser does not support the video tag.',
            '          </video>'
        ])

    lines.extend(['', f'          <h3>{value(project["title"])}</h3>', f'          <p>{value(project["description"])}</p>'])

    for label in (project.get('category'), project.get('status'), project.get('tool')):
        if label:
            lines.append(f'          <span class="content-tag">{value(label.replace("-", " "))}</span>')

    if project.get('external_url'):
        lines.extend(['', f'          <a class="project-link" href="{value(project["external_url"])}">View project</a>'])

    case_study_fields = [
        ('Brief', 'brief'),
        ('My role', 'role'),
        ('Process', 'process'),
        ('Outcome and lessons', 'outcome'),
        ('Tools used', 'tools'),
        ('Project information', 'details')
    ]

    fields = [(label, project.get(field)) for label, field in case_study_fields]
    fields = [(label, text) for label, text in fields if text and str(text).strip()]

    if fields:
        lines.extend(['', '          <details class="project-details">', '            <summary>Project details</summary>'])
        for label, text in fields:
            lines.extend(['', f'            <h4>{label}</h4>', paragraphs(text, '            ')])
        lines.append('          </details>')

    if len(items) > 2:
        lines.append(f'          <a class="collection-link" href="{value(collection_url(project))}">View collection ({len(items)} items)</a>')
    elif len(items) == 2:
        lines.append(project_gallery(items[1:]))

    lines.append('        </article>')
    return '\n'.join(lines)


def project_gallery(items, standalone=False):
    lines = ['<div class="collection-grid">'] if standalone else [
        '',
        '          <details class="project-gallery">',
        f'            <summary>Explore collection ({len(items)} items)</summary>',
        '            <div class="project-gallery-grid">'
    ]

    for item in items:
        lines.append('              <figure>')
        if item.get('image'):
            lines.extend([
                f'                <a href="{value(item["image"])}">',
                f'                  <img src="{value(item["image"])}" alt="{value(item.get("image_alt", item.get("caption", "Design sample")))}" loading="lazy" decoding="async">',
                '                </a>'
            ])
        if item.get('video'):
            poster = f' poster="{value(item["poster"])}"' if item.get('poster') else ''
            lines.extend([
                f'                <video src="{value(item["video"])}" controls playsinline preload="none"{poster} aria-label="{value(item.get("caption", "Collection video"))}">',
                '                  Your browser does not support the video tag.',
                '                </video>'
            ])
        if item.get('caption'):
            lines.append(f'                <figcaption>{value(item["caption"])}</figcaption>')
        lines.append('              </figure>')

    lines.extend(['</div>'] if standalone else [
        '            </div>',
        '          </details>'
    ])
    return '\n'.join(lines)


def article_card(article, include_body):
    lines = [f'        <article class="article-item filter-card" id="article-{value(article["slug"])}" data-category="{value(article["category"])}">']

    if article.get('image'):
        lines.append(f'          <img loading="lazy" decoding="async" src="{value(article["image"])}" alt="{value(article.get("image_alt", article["title"]))}">')

    lines.extend(['', '          <div class="article-content">', f'            <h3>{value(article["title"])}</h3>', f'            <p>{value(article["summary"])}</p>'])
    published = article.get('published', True) and bool(article.get('body', '').strip())

    if published:
        published_date = date.fromisoformat(article['date'])
        formatted_date = f'{published_date:%B} {published_date.day}, {published_date.year}'
        lines.append(f'            <time datetime="{value(article["date"])}">{formatted_date}</time>')

    lines.append(f'            <span class="content-tag">{value(article["category"].replace("-", " "))}</span>')

    if published and include_body:
        minutes = max(1, (len(article['body'].split()) + 199) // 200)
        lines.extend([
            '',
            '            <details class="article-details">',
            '              <summary>Read article</summary>',
            f'              <p class="article-reading-time">{minutes} min read</p>',
            '              <div class="article-body">',
            article_body(article['body'], '                '),
            '              </div>',
            feedback_form(article),
            '            </details>'
        ])
    elif published:
        lines.extend(['', f'            <a class="article-link" href="articles.html#article-{value(article["slug"])}">Read article</a>'])
    else:
        lines.extend(['', '            <p class="article-status">Coming soon</p>'])

    lines.extend(['          </div>', '        </article>'])
    return '\n'.join(lines)


def feedback_form(article):
    template = (ROOT / 'templates/article-feedback.html').read_text(encoding='utf-8')
    return template.replace('__SLUG__', value(article['slug'])).replace('__TITLE__', value(article['title']))


def replace_collection(text, attribute, items, render):
    pattern = rf'<div\b[^>]*\b{attribute}="(featured|all)"[^>]*>'
    match = re.search(pattern, text)
    if not match:
        return text

    depth = 1
    end = None
    for tag in re.finditer(r'</?div\b[^>]*>', text[match.end():]):
        depth += -1 if tag.group().startswith('</') else 1
        if depth == 0:
            end = match.end() + tag.start()
            break

    if end is None:
        raise ValueError(f'Unclosed collection: {attribute}')

    featured = match.group(1) == 'featured'
    selected = [item for item in items if not featured or item.get('featured')]
    if featured and attribute == 'data-projects-source':
        selected = selected[:6]
    body = '\n\n'.join(render(item, not featured) for item in selected)
    return text[:match.end()] + '\n' + body + '\n      ' + text[end:]


def main():
    projects = json.loads((ROOT / 'content/projects.json').read_text(encoding='utf-8'))['projects']
    articles = json.loads((ROOT / 'content/articles.json').read_text(encoding='utf-8'))['articles']

    for path in ROOT.glob('*.html'):
        text = path.read_text(encoding='utf-8')

        if path.name == 'about.html':
            from course_content import render as render_courses
            text = re.sub(r'<section class="courses"[^>]*>.*?</section>', lambda _: render_courses(), text, count=1, flags=re.S)

        for tag in ('header', 'footer'):
            template_path = ROOT / f'templates/{tag}.html'
            if template_path.exists():
                template = template_path.read_text(encoding='utf-8').strip()
                if tag == 'header':
                    template = template.replace(f'href="{path.name}#', f'aria-current="page" href="{path.name}#')
                text = re.sub(rf'<{tag}\b.*?</{tag}>', lambda _: template, text, count=1, flags=re.S)

        text = replace_collection(text, 'data-projects-source', projects, lambda item, _: project_card(item))
        text = replace_collection(text, 'data-articles-source', articles, article_card)

        if path.name == 'articles.html':
            template = (ROOT / 'templates/article-feedback.html').read_text(encoding='utf-8').strip()
            template_block = f'<template id="article-feedback-template">\n{template}\n</template>'
            text = re.sub(
                r'<template id="article-feedback-template">.*?</template>',
                lambda _: template_block,
                text,
                flags=re.S
            ) if 'id="article-feedback-template"' in text else text.replace('</main>', '</main>\n\n' + template_block)

            # Remove the retired private feedback registration from generated pages.
            text = re.sub(r'<form\b[^>]*\bname="article-feedback"[^>]*>.*?</form>', '', text, flags=re.S)

        social_template = ROOT / 'templates/social-links.html'
        if social_template.exists():
            social_links = social_template.read_text(encoding='utf-8').strip()
            text = re.sub(
                r'<nav class="social-links"[^>]*>.*?</nav>',
                lambda _: social_links,
                text,
                flags=re.S
            )

        path.write_text(format_html(text), encoding='utf-8', newline='\r\n')

    generate_pages(projects, project_gallery)

    from hero_wheels import integrate
    integrate(ROOT, projects)

    from localize_site import build_languages
    build_languages()

    production_url = os.environ.get('URL') if os.environ.get('NETLIFY') == 'true' else None
    if production_url:
        from configure_site import configure
        configure(production_url)

    print('Project and article HTML fallbacks are synchronized.')


if __name__ == '__main__':
    main()
