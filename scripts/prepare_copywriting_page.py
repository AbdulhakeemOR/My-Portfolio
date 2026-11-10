"""Publish the copywriting samples page (AOR/My-Projects) at /demos/copywriting-samples/.

The page keeps its own design. It gets the shared portfolio bar used by the demos and
has its symbols written as HTML character entity references. Each campaign kit on the
Projects page links to its tab here, e.g. /demos/copywriting-samples/#wahat.
"""
from pathlib import Path
import re

from html_entities import to_entities

ROOT = Path(__file__).resolve().parent.parent
SOURCE = ROOT.parent / 'My-Projects' / 'Copywriting Samples (7.1–7.5).html'
TARGET = ROOT / 'demos' / 'copywriting-samples' / 'index.html'
BAR = ('<aside class="aor-demo-nav" data-aor-demo aria-label="Portfolio sample">'
       '<a href="/en/projects.html">AOR · Back to projects</a>'
       '<span>Sample copy for fictional clients</span></aside>')


def main():
    text = SOURCE.read_text(encoding='utf-8')
    text = text.replace('</head>', '<link rel="stylesheet" href="../demo-nav.css">\n</head>', 1)
    text = re.sub(r'(<body\b[^>]*>)', lambda match: match[1] + '\n' + BAR, text, count=1)
    TARGET.parent.mkdir(parents=True, exist_ok=True)
    TARGET.write_text(to_entities(text), encoding='utf-8')
    print(f'Copywriting samples published to {TARGET.relative_to(ROOT).as_posix()}.')


if __name__ == '__main__':
    main()
