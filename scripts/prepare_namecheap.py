"""Build the reviewed public site and a ZIP for Namecheap cPanel."""
from pathlib import Path
from datetime import datetime, timezone
import argparse
import hashlib
import json
import os
import re
import shutil
import tempfile
import zipfile

from build_site import main as build
import configure_site
from check_privacy import check_package

ROOT = Path(__file__).resolve().parent.parent


def prepare_output(output, review=False):
    base_path = '/review' if review else ''
    # Configure the generated package, leaving other hosting targets unchanged.
    previous_root = configure_site.ROOT
    try:
        configure_site.ROOT = output
        configure_site.configure('https://abdulhakeemor.com')
    finally:
        configure_site.ROOT = previous_root
    # Sample sites have their own non-submitting contact previews.
    for path in (output / 'contact.html', output / 'en/contact.html', output / 'ar/contact.html'):
        text = path.read_text(encoding='utf-8')
        text = text.replace('action="contact-success.html"', f'action="{base_path}/contact.php"')
        text = text.replace('name="contact"', 'name="contact" data-contact-backend="php"')
        language = 'ar' if path.parent.name == 'ar' else 'en'
        text = text.replace('<input type="hidden" name="form-name" value="contact">',
                            f'<input type="hidden" name="language" value="{language}">')
        text = text.replace('data-netlify="true"', '').replace('netlify-honeypot="bot-field"', '')
        text = text.replace('</body>', f'    <script src="{base_path}/contact-turnstile.js" defer></script>\n  </body>')
        assert f'action="{base_path}/contact.php"' in text, path
        path.write_text(text, encoding='utf-8')
    for name in ('contact.php', 'mail-core.php', 'turnstile-config.php', 'contact-turnstile.js', '.htaccess'):
        shutil.copy2(ROOT / 'hosting/namecheap' / name, output / name)
    shutil.copytree(ROOT / 'hosting/namecheap/lib', output / 'lib', dirs_exist_ok=True)
    for name in ('article-feedback.php', 'feedback-core.php'):
        shutil.copy2(ROOT / 'hosting/namecheap' / name, output / name)
    shutil.copytree(ROOT / 'hosting/namecheap/feedback-admin', output / 'feedback-admin', dirs_exist_ok=True)
    # Code only: never package live records or cPanel-managed admin .htaccess.
    shutil.copytree(ROOT / 'hosting/namecheap/tracking', output / 'tracking', dirs_exist_ok=True)
    assert not list((output / 'tracking').rglob('.htaccess'))
    assert not list((output / 'tracking').rglob('*.json'))
    if review:
        core = output / 'feedback-core.php'
        core.write_text(core.read_text(encoding='utf-8').replace("const FEEDBACK_BASE_PATH = '';", "const FEEDBACK_BASE_PATH = '/review';"), encoding='utf-8')
    if review:
        php = output / 'contact.php'
        php.write_text(php.read_text(encoding='utf-8').replace("const SITE_BASE_PATH = '';", "const SITE_BASE_PATH = '/review';"), encoding='utf-8')
        for path in output.rglob('*.html'):
            text = path.read_text(encoding='utf-8')
            text = re.sub(r'\s*<meta name="robots"[^>]*>', '', text)
            text = text.replace('</head>', '    <meta name="robots" content="noindex, nofollow">\n  </head>')
            path.write_text(text, encoding='utf-8')
        # cPanel Directory Privacy owns this folder's Basic Auth directives.
        # Never replace its .htaccess when extracting the review archive.
        (output / '.htaccess').unlink()
        (output / 'robots.txt').write_text('User-agent: *\nDisallow: /\n', encoding='utf-8')
        (output / 'REVIEW-ONLY.txt').write_text('Protected review build. Extract only into public_html/review/. Configure cPanel Directory Privacy before upload. This archive intentionally excludes .htaccess to preserve authentication. Not a production release.\n', encoding='utf-8')
    # The editor depends on Netlify OAuth and does not publish changes to cPanel.
    # Omit its public entry points from this manual-upload package.
    if (output / 'admin').exists():
        for path in (output / 'admin').iterdir():
            path.unlink()
        (output / 'admin').rmdir()
    # Replace the retired CMS with the owner-only tool directory. Its cPanel
    # authentication configuration belongs to the server and is never shipped.
    shutil.copytree(ROOT / 'hosting/namecheap/admin-home', output / 'admin')
    assert {path.name for path in (output / 'admin').iterdir()} == {'index.php', 'index.html', 'hub.css'}


def archive_release(output, releases, review=False):
    releases.mkdir(exist_ok=True)
    latest = releases / ('latest-review.json' if review else 'latest.json')
    previous = json.loads(latest.read_text(encoding='utf-8'))['files'] if latest.exists() else {}
    files = {}
    for path in sorted(output.rglob('*')):
        if path.is_file():
            with path.open('rb') as stream:
                digest = hashlib.file_digest(stream, 'sha256').hexdigest()
            files[path.relative_to(output).as_posix()] = {'sha256': digest, 'bytes': path.stat().st_size}
    required = {'index.html', 'contact.php', 'mail-core.php', 'turnstile-config.php',
                'contact-turnstile.js', 'lib/phpmailer/src/PHPMailer.php', 'sitemap.xml'}
    required.add('REVIEW-ONLY.txt' if review else '.htaccess')
    if review and (output / '.htaccess').exists():
        raise ValueError('Review archives must preserve the server-managed authentication file.')
    if not required <= files.keys():
        raise ValueError('The release is missing required website files.')
    stamp = datetime.now(timezone.utc).strftime('%Y%m%dT%H%M%S%fZ')
    purpose = 'review' if review else 'namecheap'
    archive = releases / f'abdulhakeemor-{purpose}-{stamp}.zip'
    # Verify a temporary ZIP before publishing a new release artifact.
    with tempfile.NamedTemporaryFile(dir=releases, suffix='.partial', delete=False) as temporary:
        pending = Path(temporary.name)
    try:
        with zipfile.ZipFile(pending, 'w', zipfile.ZIP_DEFLATED) as package:
            for name in files:
                package.write(output / name, name)
        with zipfile.ZipFile(pending) as package:
            assert package.testzip() is None
            assert required <= set(package.namelist())
            for name, info in files.items():
                with package.open(name) as stream:
                    actual = hashlib.file_digest(stream, 'sha256').hexdigest()
                if actual != info['sha256']:
                    raise ValueError(f'File changed while packaging: {name}. Build again after saving your edits.')
        os.replace(pending, archive)
    finally:
        pending.unlink(missing_ok=True)
    with archive.open('rb') as stream:
        digest = hashlib.file_digest(stream, 'sha256').hexdigest()
    manifest = {'archive': archive.name, 'sha256': digest, 'purpose': purpose,
                'deployment_path': '/review/' if review else '/', 'files': files,
                'removed_since_previous_build': sorted(previous.keys() - files.keys())}
    text = json.dumps(manifest, indent=2) + '\n'
    archive.with_suffix('.json').write_text(text, encoding='utf-8')
    archive.with_suffix('.sha256').write_text(f'{digest}  {archive.name}\n', encoding='utf-8')
    pending_latest = latest.with_suffix('.tmp')
    pending_latest.write_text(text, encoding='utf-8')
    os.replace(pending_latest, latest)
    print(f'Ready: {archive.name} ({archive.stat().st_size / 1024 / 1024:.1f} MB)')
    if manifest['removed_since_previous_build']:
        print('Review obsolete server paths in the release manifest. ZIP extraction does not delete them.')
    return archive


def main(review=False):
    build()
    output = ROOT / 'dist'
    prepare_output(output, review=review)
    check_package()
    archive_release(output, ROOT / 'releases', review=review)


if __name__ == '__main__':
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--review', action='store_true', help='Package for a cPanel-password-protected /review/ folder; preserve its authentication .htaccess.')
    args = parser.parse_args()
    main(review=args.review)
