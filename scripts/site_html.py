"""Keep the HTML indentation consistent with the site's two-space style."""

from html.parser import HTMLParser
import re


class Indentation(HTMLParser):
    VOID = {'area', 'base', 'br', 'col', 'embed', 'hr', 'img', 'input', 'link', 'meta', 'param', 'source', 'track', 'wbr'}

    def __init__(self):
        super().__init__(convert_charrefs=False)
        self.depth = 0

    def handle_starttag(self, tag, attrs):
        if tag not in self.VOID:
            self.depth += 1

    def handle_endtag(self, tag):
        self.depth -= 1


def format_html(text):
    parser = Indentation()
    lines = []

    for original in text.splitlines():
        line = original.strip()
        if not line:
            lines.append('')
            continue

        depth = parser.depth - int(line.startswith('</'))
        lines.append('  ' * max(0, depth) + line)
        parser.feed(line)

    if parser.depth != 0:
        raise ValueError('The document has unbalanced HTML tags.')

    return re.sub(r'\n{3,}', '\n\n', '\n'.join(lines)).rstrip() + '\n'
