"""Prepare seven public static demos from the downloaded repository snapshots."""
from pathlib import Path
from html import escape
import re
import shutil

ROOT = Path(__file__).resolve().parent.parent
SAMPLES = ROOT.parent / 'samples'
OUTPUT = ROOT / 'demos'
NAMES = ('bridgearabic', 'calculator', 'evergreencatalog', 'framehouse', 'gatherforum', 'scopecraft', 'signalstudio', 'webcraft', 'shiftcove')
SCRIPT_BAR = ('shiftcove',)


def copy(source, target):
    target.parent.mkdir(parents=True, exist_ok=True)
    shutil.copy2(source, target)


def prepare():
    OUTPUT.mkdir(exist_ok=True)
    for name in NAMES:
        source = SAMPLES / name
        target = OUTPUT / name
        target.mkdir(exist_ok=True)
        if name == 'bridgearabic':
            shutil.copytree(source / 'dist', target, dirs_exist_ok=True)
            copy(source / 'marhaban.mp3', target / 'assets/marhaban.mp3')
        elif name == 'framehouse':
            if not (source / 'dist/index.html').exists():
                raise RuntimeError('Build Framehouse with npm ci and npm run build first.')
            shutil.copytree(source / 'dist', target, dirs_exist_ok=True)
            # Source generator and duplicate fallback images aren't needed publicly.
            for path in target.rglob('*.py'):
                path.unlink()
        elif name == 'webcraft':
            if not (source / 'dist/index.html').exists():
                raise RuntimeError('Build Webcraft with npm ci and npm run build first.')
            shutil.copytree(source / 'dist', target, dirs_exist_ok=True)
        elif name == 'shiftcove':
            if not (source / 'out/index.html').exists():
                raise RuntimeError('Export Shiftcove with next.config.portfolio-export.mjs first.')
            # Keep the index.txt files: Next.js fetches them for in-app navigation.
            shutil.copytree(source / 'out', target, dirs_exist_ok=True)
        elif name == 'scopecraft':
            copy(source / 'index.html', target / 'index.html')
            copy(source / 'styles.css', target / 'css/styles.css')
            for file in ('app.js', 'rates.js'):
                copy(source / file, target / 'js' / file)
            for file in ('react.production.min.js', 'react-dom.production.min.js'):
                copy(source / file, target / 'js/vendor' / file)
            for path in source.glob('*.woff2'):
                copy(path, target / 'assets/fonts' / path.name)
            for path in source.glob('*.svg'):
                copy(path, target / 'assets/icons' / path.name)
            copy(source / 'LICENSE.txt', target / 'LICENSE.txt')
        else:
            for path in source.iterdir():
                if path.is_file() and path.suffix in ('.html', '.css', '.js'):
                    copy(path, target / path.name)
                elif path.is_dir() and path.name in ('assets', 'css', 'js', 'Calligraphy'):
                    shutil.copytree(path, target / path.name, dirs_exist_ok=True)
        if name == 'evergreencatalog':
            cache = SAMPLES / '_asset-cache/evergreencatalog'
            photos = sorted(cache.glob('photo-*.jpg'))
            if len(photos) != 7:
                raise RuntimeError('Download the seven original Evergreen photo URLs first.')
            for photo in photos:
                if not photo.read_bytes().startswith(b'\xff\xd8'):
                    raise ValueError(f'Invalid downloaded photo: {photo.name}')
                copy(photo, target / 'assets/images' / photo.name)
            script = target / 'catalog.js'
            content = script.read_text(encoding='utf-8')
            content = re.sub(r'const imageUrl = .*?;', 'const imageUrl = (id) => `assets/images/${id}.jpg`;', content, count=1)
            script.write_text(content, encoding='utf-8')
            (target / 'IMAGE_SOURCES.txt').write_text('Existing photo sources from the original repository; local copies for demo reliability.\n' + '\n'.join(f'https://images.unsplash.com/{photo.stem}' for photo in photos) + '\n', encoding='utf-8')
        for page in target.rglob('*.html'):
            text = page.read_text(encoding='utf-8')
            text = text.replace('https://example.com/', 'https://abdulhakeemor.com/en/projects.html')
            text = text.replace('Portfolio placeholder - replace with your portfolio URL', 'Visit Abdulhakeem Raji’s portfolio')
            if name == 'signalstudio':
                text = text.replace('Thanks for reaching out. We’ll get back to you soon with next steps.', 'Demo complete. Nothing was sent; no enquiry has been submitted.')
            if name == 'evergreencatalog':
                text = text.replace('catalog.html', 'index.html')
            # A demo must not send entered details through a fallback GET request.
            # Controls remain disabled without JS; the shared guard enables them
            # after installing a submit listener that prevents network submissions.
            def safe_form(match):
                if re.search(r'method=["\']dialog["\']', match[0], re.I): return match[0]
                def disable(control):
                    tag = re.sub(r'\s*/>$', '>', control[0])
                    if re.search(r'\bdisabled(?:\s|=|>)', tag): return tag
                    return tag[:-1] + ' disabled data-demo-disabled>'
                return re.sub(r'<(?:input|select|textarea|button)\b[^>]*>', disable, match[0], flags=re.I)
            text = re.sub(r'<form\b.*?</form>', safe_form, text, flags=re.S | re.I)
            if name in SCRIPT_BAR:
                # Next.js pages sit at several folder depths and hydrate the whole <body>,
                # so they load the bar by absolute path and demo-nav.js inserts it after load.
                if 'demo-nav.js' not in text:
                    text = text.replace('</head>', '<link rel="stylesheet" href="/demos/demo-nav.css"><script src="/demos/demo-nav.js" defer data-aor-bar></script></head>', 1)
            elif 'data-aor-demo' not in text:
                # Pages are all served one directory below demos/.
                text = text.replace('</head>', '<link rel="stylesheet" href="../demo-nav.css">\n<script src="../demo-nav.js" defer></script>\n</head>')
                text = re.sub(r'(<body\b[^>]*>)', r'\1\n<aside class="aor-demo-nav" data-aor-demo aria-label="Portfolio demo"><a href="/en/projects.html">AOR · Back to projects</a><span>Portfolio sample · Forms do not send messages</span></aside>', text, count=1)
            page.write_text(text, encoding='utf-8')
    (OUTPUT / 'demo-nav.css').write_text('''
.aor-demo-nav{position:relative;z-index:100;display:flex;align-items:center;justify-content:space-between;gap:12px;padding:10px 20px;background:#18211f;color:#edf4ef;font:12px/1.5 system-ui,sans-serif;border-bottom:1px solid #3b4b42}
.aor-demo-nav a{color:#fff!important;text-decoration:underline!important;text-underline-offset:3px;white-space:nowrap}
.aor-demo-nav span{color:#bdc9c1;text-align:end}
@media(max-width:420px){.aor-demo-nav{font-size:11px;padding:8px 12px;align-items:start}}
.aor-demo-nav--float{position:fixed;inset:auto 16px 16px auto;z-index:2147483000;padding:8px 14px;border:1px solid #3b4b42;border-radius:999px;box-shadow:0 8px 24px rgb(0 0 0/.25)}
''', encoding='utf-8')
    (OUTPUT / 'demo-nav.js').write_text('''
// Demos never submit personal details to a server, even if their app fails.
document.addEventListener('submit', event => {
  if (event.target.method !== 'dialog') event.preventDefault();
}, true);
document.querySelectorAll('[data-demo-disabled]').forEach(control => {
  control.disabled = false;
  control.removeAttribute('data-demo-disabled');
});
// Framework-rendered demos (see SCRIPT_BAR) get the portfolio bar once the app has started.
if (document.querySelector('script[data-aor-bar]') && !document.querySelector('[data-aor-demo]')) {
  window.addEventListener('load', () => {
    const bar = document.createElement('aside');
    // A floating pill: app layouts with fixed sidebars would sit underneath a top bar.
    bar.className = 'aor-demo-nav aor-demo-nav--float';
    bar.dataset.aorDemo = '';
    bar.setAttribute('aria-label', 'Portfolio demo');
    bar.innerHTML = '<a href="/en/projects.html">AOR · Back to projects</a><span>Portfolio sample</span>';
    document.body.prepend(bar);
  });
}
''', encoding='utf-8')
    print(f'Prepared {len(NAMES)} static demos in demos/. Original repository snapshots preserved.')


if __name__ == '__main__': prepare()
