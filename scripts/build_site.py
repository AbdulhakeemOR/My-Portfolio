"""Package only public site files; keep source artwork and audit files private."""

from pathlib import Path
import os
import shutil
import stat

from sync_content import main as sync_content

ROOT = Path(__file__).resolve().parent.parent


def remove_readonly(function, path, error):
    # OneDrive marks generated folders read-only on Windows.
    if os.name == 'nt' and isinstance(error, PermissionError):
        os.chmod(path, stat.S_IWRITE)
        function(path)
    else:
        raise error


def main():
    from check_privacy import verify_review
    # Do not regenerate or replace an existing package when review is incomplete.
    verify_review()
    sync_content()
    verify_review()
    output = ROOT / 'dist'
    # This directory is generated exclusively by this script.
    assert output.resolve().parent == ROOT and not output.is_symlink()
    if output.exists():
        shutil.rmtree(output, onexc=remove_readonly)
    output.mkdir()
    for path in ROOT.glob('*.html'):
        shutil.copy2(path, output / path.name)
    for name in ('AOR Logo.svg', 'favicon.svg', 'robots.txt', 'sitemap.xml'):
        source = ROOT / name
        if source.exists():
            shutil.copy2(source, output / name)
    shutil.copytree(ROOT / 'assets', output / 'assets', dirs_exist_ok=True)
    if (ROOT / 'demos').exists():
        shutil.copytree(ROOT / 'demos', output / 'demos', dirs_exist_ok=True)
    for name in ('en', 'ar'):
        shutil.copytree(ROOT / name, output / name, ignore=shutil.ignore_patterns('__pycache__', '*.pyc'))
    (output / 'content').mkdir()
    for name in ('projects.json', 'articles.json'):
        shutil.copy2(ROOT / 'content' / name, output / 'content' / name)
    print('Public site packaged in dist/. Original media, certificates, scripts, and audit files are excluded.')


if __name__ == '__main__':
    main()
