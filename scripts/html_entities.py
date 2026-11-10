"""Write typographic symbols as HTML character entity references.

Text and attribute values get named references where HTML defines one (an em dash
becomes &mdash;, a right single quote &rsquo;, a middle dot &middot;). Characters
without a name get a numeric reference (the naira sign becomes &#8358;). Arabic
letters, digits and punctuation stay as written: they have no named references,
and numeric ones would make the Arabic text unreadable in the source. The contents
of <script> and <style> elements are left untouched.
"""
import html.entities
import re

_HTML5 = {}
for _name, _value in html.entities.html5.items():
    if _name.endswith(';') and len(_value) == 1:
        _HTML5.setdefault(ord(_value), []).append(_name[:-1])

_RAW = re.compile(r'<(script|style)\b[^>]*>.*?</\1\s*>', re.S | re.I)


def _keep(code):
    return (code < 128
            or 0x0600 <= code <= 0x06FF or 0x0750 <= code <= 0x077F or 0x08A0 <= code <= 0x08FF
            or 0xFB50 <= code <= 0xFDFF or 0xFE70 <= code <= 0xFEFF)


def entity(character):
    code = ord(character)
    if code in html.entities.codepoint2name:  # the familiar HTML 4 names first
        return f'&{html.entities.codepoint2name[code]};'
    names = _HTML5.get(code)
    if names:
        return '&' + min(names, key=lambda name: (len(name), name)) + ';'
    return f'&#{code};'


def _convert(text):
    return ''.join(character if _keep(ord(character)) else entity(character) for character in text)


def to_entities(markup):
    """Return the markup with symbols outside <script>/<style> written as entities."""
    output, position = [], 0
    for match in _RAW.finditer(markup):
        output.append(_convert(markup[position:match.start()]))
        output.append(match.group(0))
        position = match.end()
    output.append(_convert(markup[position:]))
    return ''.join(output)
