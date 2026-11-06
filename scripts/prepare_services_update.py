"""Package the services/tracking update from the last verified Namecheap build."""
from pathlib import Path
import hashlib
import json
import zipfile

ROOT = Path(__file__).resolve().parent.parent


def main():
    manifest = json.loads((ROOT / 'releases/latest.json').read_text(encoding='utf-8'))
    if manifest['purpose'] != 'namecheap':
        raise ValueError('Build the production Namecheap release first.')
    names = {'AOR Logo.svg'}
    for prefix in ('', 'en/', 'ar/'):
        names.update(prefix + name for name in ('services.html', 'contact.html'))
    names.update('assets/' + name for name in (
        'css/services.css', 'css/process-stepper.css', 'css/date-picker.css',
        'js/services.js', 'js/process-stepper.js', 'js/date-picker.js',
        'js/script.js', 'js/translations-ar.js'))
    # The live site may predate this checkout's shared header/footer design.
    # Ship their dependencies too, rather than assuming its base CSS/icons match.
    shared_prefixes = ('assets/js/', 'assets/icons/', 'assets/fonts/', 'assets/brand/')
    names.update(name for name in manifest['files'] if name.startswith(shared_prefixes))
    names.add('assets/images/aor-logo.svg')
    names.add('assets/css/style.css')
    names.update(path.relative_to(ROOT / 'dist').as_posix()
                 for path in (ROOT / 'dist/tracking').rglob('*') if path.is_file())
    # Resolve direct page assets and CSS URLs, including contact-page styles.
    import posixpath
    import re
    from html.parser import HTMLParser
    from urllib.parse import urlsplit, unquote
    class Dependencies(HTMLParser):
        def __init__(self):
            super().__init__()
            self.urls = []
        def handle_starttag(self, tag, attrs):
            attrs = dict(attrs)
            if tag in ('img', 'script') and attrs.get('src'):
                self.urls.append(attrs['src'])
            if tag == 'link' and attrs.get('rel') in ('stylesheet', 'icon'):
                self.urls.append(attrs['href'])
    pending = list(names)
    while pending:
        name = pending.pop()
        urls = []
        if name.endswith('.html'):
            parser = Dependencies()
            parser.feed((ROOT / 'dist' / name).read_text(encoding='utf-8'))
            urls = parser.urls
        elif name.endswith('.css'):
            urls = re.findall(r'url\([\s\'"]*([^\)\'"\s]+)', (ROOT / 'dist' / name).read_text(encoding='utf-8'))
        for url in urls:
            parsed = urlsplit(url)
            if parsed.scheme or parsed.netloc or not parsed.path:
                continue
            target = posixpath.normpath(posixpath.join(posixpath.dirname(name), unquote(parsed.path)))
            if target not in manifest['files']:
                raise ValueError(f'Missing release dependency: {name} -> {target}')
            if target not in names:
                names.add(target)
                pending.append(target)
    for name in names:
        if '.htaccess' in name or '.htpasswd' in name or name.endswith('.json'):
            raise ValueError('Password configuration and private records must not be packaged.')
        path = ROOT / 'dist' / name
        expected = manifest['files'].get(name, {}).get('sha256')
        if hashlib.sha256(path.read_bytes()).hexdigest() != expected:
            raise ValueError(f'Build is stale: {name}. Run prepare_namecheap.py first.')
    target = ROOT.parent / 'services-tracking-update.zip'
    with zipfile.ZipFile(target, 'w', zipfile.ZIP_DEFLATED) as archive:
        for name in sorted(names):
            archive.write(ROOT / 'dist' / name, name)
    with zipfile.ZipFile(target) as archive:
        assert archive.testzip() is None
        assert set(archive.namelist()) == names
        for name in names:
            assert hashlib.sha256(archive.read(name)).hexdigest() == manifest['files'][name]['sha256']
        verify_page_dependencies(archive)
    print(f'Ready: {target.name} ({target.stat().st_size / 1024:.0f} KB, {len(names)} files). No password files or project records.')


def verify_page_dependencies(archive):
    """Updated HTML and CSS must not rely on older shared files being installed."""
    from html.parser import HTMLParser
    import posixpath
    import re
    from urllib.parse import urlsplit, unquote

    class Assets(HTMLParser):
        def __init__(self):
            super().__init__()
            self.urls = []

        def handle_starttag(self, tag, attributes):
            fields = dict(attributes)
            if tag in ('img', 'script') and fields.get('src'):
                self.urls.append(fields['src'])
            if tag == 'link' and fields.get('rel') in ('stylesheet', 'icon'):
                self.urls.append(fields['href'])

    def required(source, url):
        parsed = urlsplit(url)
        if parsed.scheme or parsed.netloc or not parsed.path:
            return
        target = posixpath.normpath(posixpath.join(posixpath.dirname(source), unquote(parsed.path)))
        assert target in archive.namelist(), f'Missing dependency: {source} -> {target}'

    for name in archive.namelist():
        if name.endswith('.html') and not name.startswith('tracking/'):
            page = Assets()
            page.feed(archive.read(name).decode('utf-8'))
            for url in page.urls:
                required(name, url)
        elif name.endswith('.css'):
            for url in re.findall(r'url\([\s\'"]*([^\)\'"\s]+)', archive.read(name).decode('utf-8')):
                required(name, url)


if __name__ == '__main__': main()
