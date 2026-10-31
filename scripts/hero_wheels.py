"""Add a progressively enhanced work wheel to the homepage only."""
from html import escape
import re
from site_html import format_html


def integrate(root, projects):
    items = [p for p in projects if p.get('image')][:9]
    cards = []
    for item in items:
        title = escape(item['title'])
        cards.append(
            f'<a class="works-wheel-card" href="projects.html#project-{escape(item["slug"], quote=True)}">'
            f'<span><img src="{escape(item["image"], quote=True)}" alt="{title}" loading="lazy" decoding="async" draggable="false"></span>'
            f'<span class="works-wheel-card-title">{title}</span></a>'
        )
    markup = ('<!-- works-wheel:start -->\n'
              '<div class="works-wheel" aria-label="Selected work">'
              '<div class="works-wheel-stage" tabindex="0" aria-label="Selected work" aria-describedby="works-wheel-help">'
              '<div class="works-wheel-rotor">' + ''.join(cards) + '</div>'
              '<span class="works-wheel-label">Selected work</span></div>'
              '<div class="works-wheel-controls"><button type="button" data-wheel-prev aria-label="Previous project">↑</button>'
              '<p id="works-wheel-help">Scroll, drag or use arrow keys to explore</p>'
              '<button type="button" data-wheel-next aria-label="Next project">↓</button></div></div>\n'
              '<!-- works-wheel:end -->')
    for path in root.glob('*.html'):
        text = path.read_text(encoding='utf-8')
        text = re.sub(r'\s*<!-- works-wheel:start -->.*?<!-- works-wheel:end -->', '', text, flags=re.S)
        # The homepage's single cover is replaced by the interactive collection.
        text = re.sub(r'\s*<figure class="hero-work">.*?</figure>', '', text, flags=re.S)
        if path.name == 'index.html':
            text = re.sub(r'(<section\b[^>]*class="[^"]*\bhero\b[^"]*"[^>]*>)(.*?)(</section>)',
                          lambda m: m[1] + m[2] + '\n' + markup + '\n' + m[3], text, flags=re.S)
        path.write_text(format_html(text), encoding='utf-8', newline='\r\n')
