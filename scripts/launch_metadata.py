"""Apply shared launch metadata before generating English and Arabic pages."""
from html import escape
import re

TITLES = {
    'index.html': 'Abdulhakeem Oladapo Raji | Communication, Design & Websites',
    'services.html': 'Communication, Design & Website Services | Abdulhakeem Raji',
    'projects.html': 'Selected Campaign & Design Projects | Abdulhakeem Raji',
    'about.html': 'About Abdulhakeem Raji | Communication & Digital Skills',
    'articles.html': 'Communication, Research & Learning Articles | Abdulhakeem Raji',
    'contact.html': 'Contact Abdulhakeem Raji | Discuss Your Project',
}
DESCRIPTION = 'Explore website development, ad design and video, and PR and media campaign services from Abdulhakeem Oladapo Raji.'


def apply_metadata(root):
    for path in root.glob('*.html'):
        text = path.read_text(encoding='utf-8')
        if path.name in TITLES:
            title = escape(TITLES[path.name], quote=True)
            text = re.sub(r'<title>.*?</title>', f'<title>{title}</title>', text, flags=re.S)
            text = re.sub(r'(<meta property="og:title" content=")[^"]*', lambda m: m[1] + title, text)
        if path.name == 'services.html':
            for attribute in ('name="description"', 'property="og:description"'):
                text = re.sub(r'(<meta ' + attribute + r' content=")[^"]*', lambda m: m[1] + DESCRIPTION, text)
        text = re.sub(r'\s*<link rel="(?:icon|apple-touch-icon)"[^>]*>', '', text)
        text = re.sub(r'\s*<meta (?:property="og:image(?::(?:width|height|type|alt))?"|name="twitter:(?:card|image)")[^>]*>', '', text)
        tags = '''
    <link rel="icon" href="assets/brand/favicon.png" type="image/png" sizes="96x96">
    <meta property="og:image" content="assets/brand/social-card.png">
    <meta property="og:image:width" content="1200">
    <meta property="og:image:height" content="630">
    <meta property="og:image:type" content="image/png">
    <meta property="og:image:alt" content="Abdulhakeem Oladapo Raji — communication, design and websites">
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:image" content="assets/brand/social-card.png">
'''
        text = text.replace('</head>', tags + '  </head>')
        path.write_text(text, encoding='utf-8')
