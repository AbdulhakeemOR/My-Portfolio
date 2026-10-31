"""Add production URLs and a sitemap after a hosting address is available."""

from html import escape, unescape
from pathlib import Path
from urllib.parse import urlparse
import argparse
import re


ROOT = Path(__file__).resolve().parent.parent
PAGES = ('index.html', 'projects.html', 'services.html', 'articles.html', 'about.html', 'contact.html') + tuple(sorted(p.name for p in ROOT.glob('project-*.html')))


def configure(url):
    parsed = urlparse(url)
    if parsed.scheme != 'https' or not parsed.netloc or parsed.query or parsed.fragment or parsed.path not in ('', '/'):
        raise ValueError('Use an HTTPS website address without a path, query, or fragment.')

    base = url.rstrip('/')
    locations = []

    for name in PAGES:
        for folder in ('', 'en', 'ar'):
            path = ROOT / folder / name
            if not path.exists():
                continue
            language = folder or 'en'
            text = path.read_text(encoding='utf-8')
            location = f'{base}/{language}/{name}'
            if folder:
                locations.append(location)
            text = re.sub(r'\s*<link rel="(?:canonical|alternate)"[^>]*>', '', text)
            text = re.sub(r'\s*<meta property="og:url"[^>]*>', '', text)
            metadata = f'\n    <link rel="canonical" href="{escape(location, quote=True)}">\n    <meta property="og:url" content="{escape(location, quote=True)}">'
            for alternate in ('en', 'ar', 'x-default'):
                target_language = 'en' if alternate == 'x-default' else alternate
                href = escape(f'{base}/{target_language}/{name}', quote=True)
                metadata += f'\n    <link rel="alternate" hreflang="{alternate}" href="{href}">'
            text = text.replace('</head>', metadata + '\n  </head>')
            def social_image(match):
                image = unescape(match[2])
                if not urlparse(image).scheme:
                    image = base + '/' + image.removeprefix('../').lstrip('/')
                return match[1] + escape(image, quote=True) + match[3]

            text = re.sub(r'(<meta property="og:image" content=")([^"]+)("[^>]*>)', social_image, text)
            path.write_text(text, encoding='utf-8', newline='\r\n')

    entries = '\n'.join(f'  <url>\n    <loc>{escape(location)}</loc>\n  </url>' for location in locations)
    sitemap = '<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n' + entries + '\n</urlset>\n'
    (ROOT / 'sitemap.xml').write_text(sitemap, encoding='utf-8')
    (ROOT / 'robots.txt').write_text(f'User-agent: *\nAllow: /\nDisallow: /admin/\nDisallow: /scripts/\n\nSitemap: {base}/sitemap.xml\n', encoding='utf-8')
    print('Canonical URLs, social image URLs, robots.txt, and sitemap.xml are ready.')


if __name__ == '__main__':
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--url', required=True, help='Your final HTTPS hosting address')
    arguments = parser.parse_args()
    configure(arguments.url)
