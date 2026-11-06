"""Package demos, the Projects page, and their complete public dependencies."""
from pathlib import Path
from html.parser import HTMLParser
from urllib.parse import urlsplit, unquote
import hashlib
import json
import posixpath
import re
import zipfile

ROOT = Path(__file__).resolve().parent.parent
PUBLIC = ROOT / 'dist'


class Links(HTMLParser):
    def __init__(self): super().__init__(); self.urls=[]
    def handle_starttag(self, tag, attrs):
        attrs=dict(attrs)
        if attrs.get('src'): self.urls.append(attrs['src'])
        if attrs.get('poster'): self.urls.append(attrs['poster'])
        if tag=='link' and attrs.get('rel') in ('stylesheet','icon'): self.urls.append(attrs['href'])
        if tag=='a' and attrs.get('href','').startswith('project-'): self.urls.append(attrs['href'])


def main():
    manifest=json.loads((ROOT/'releases/latest.json').read_text(encoding='utf-8'))
    names={p.relative_to(PUBLIC).as_posix() for p in (PUBLIC/'demos').rglob('*') if p.is_file()}
    if not names: raise ValueError('Build the full site with demos first.')
    for prefix in ('','en/','ar/'):
        names.update((prefix+'projects.html',prefix+'content/projects.json'))
    pending=list(names)
    def add(source,url):
        parsed=urlsplit(url)
        if parsed.scheme or parsed.netloc or not parsed.path:return
        target=posixpath.normpath(unquote(parsed.path).lstrip('/')) if parsed.path.startswith('/') else posixpath.normpath(posixpath.join(posixpath.dirname(source),unquote(parsed.path)))
        if target.endswith('/') or (PUBLIC/target).is_dir():target=target.rstrip('/')+'/index.html'
        if target not in manifest['files']:raise ValueError(f'Missing dependency: {source} -> {target}')
        if target not in names:names.add(target);pending.append(target)
    while pending:
        name=pending.pop();path=PUBLIC/name
        if name.endswith('.html'):
            page=Links();page.feed(path.read_text(encoding='utf-8'))
            for url in page.urls:add(name,url)
        elif name.endswith('.css'):
            for url in re.findall(r'url\([\s\'"]*([^\)\'"\s]+)',path.read_text(encoding='utf-8')):add(name,url)
        elif name.endswith('content/projects.json'):
            base=name.replace('content/projects.json','projects.html')
            def visit(value):
                if isinstance(value,dict):
                    for field,item in value.items():
                        if field in ('image','video','poster','external_url') and isinstance(item,str) and item:add(base,item)
                        else:visit(item)
                elif isinstance(value,list):
                    for item in value:visit(item)
            visit(json.loads(path.read_text(encoding='utf-8')))
    for name in names:
        if any(part in ('.git','node_modules','aor-projects','sessions','admin','feedback-admin') for part in Path(name).parts) or Path(name).name in ('.htaccess','.htpasswd'):
            raise ValueError(f'Private or unrelated path selected: {name}')
        actual=hashlib.sha256((PUBLIC/name).read_bytes()).hexdigest()
        if actual!=manifest['files'][name]['sha256']:raise ValueError(f'Stale build: {name}')
    archive=ROOT.parent/'website-demos-update.zip'
    with zipfile.ZipFile(archive,'w',zipfile.ZIP_DEFLATED) as zipped:
        for name in sorted(names):zipped.write(PUBLIC/name,name)
    with zipfile.ZipFile(archive) as zipped:
        assert zipped.testzip() is None
        assert set(zipped.namelist())==names
        for name in names:
            assert hashlib.sha256(zipped.read(name)).hexdigest()==manifest['files'][name]['sha256']
    print(f'Ready: {archive.name}, {archive.stat().st_size/1048576:.1f} MiB, {len(names)} public files. No password files, admin code, or customer records.')


if __name__=='__main__':main()
