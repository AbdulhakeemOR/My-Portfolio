"""Verify deployment-specific URLs and forms in an isolated HTML-only fixture.

This does not bypass the media gate or create a deployment package.
"""
from pathlib import Path
import shutil
import tempfile
import xml.etree.ElementTree as ET
from prepare_namecheap import ROOT, prepare_output, archive_release


def check_mode(review=False):
    with tempfile.TemporaryDirectory(prefix='aor-hosting-check-') as temporary:
        output = Path(temporary)
        for language in ('', 'en', 'ar'):
            (output / language).mkdir(exist_ok=True)
            for source in (ROOT / language).glob('*.html'):
                shutil.copy2(source, output / language / source.name)
        prepare_output(output, review=review)
        pages = list(output.rglob('*.html'))
        for path in pages:
            text = path.read_text(encoding='utf-8')
            assert 'property="og:image" content="https://abdulhakeemor.com/assets/brand/social-card.png"' in text, path
            assert 'name="twitter:image" content="https://abdulhakeemor.com/assets/brand/social-card.png"' in text, path
        for language in ('', 'en', 'ar'):
            text = (output / language / 'contact.html').read_text(encoding='utf-8')
            expected = 'ar' if language == 'ar' else 'en'
            base = '/review' if review else ''
            assert f'action="{base}/contact.php"' in text
            assert 'data-contact-backend="php"' in text
            assert f'name="language" value="{expected}"' in text
            assert 'data-netlify' not in text and 'netlify-honeypot' not in text
        locations = [element.text for element in ET.parse(output / 'sitemap.xml').iter() if element.tag.endswith('}loc')]
        assert locations and all(url.startswith('https://abdulhakeemor.com/') for url in locations)
        assert not any('/404.html' in url or '/contact-success.html' in url for url in locations)
        for language in ('en', 'ar'):
            for policy in ('privacy', 'terms'):
                assert f'https://abdulhakeemor.com/{language}/{policy}.html' in locations
        assert (output / 'contact.php').is_file()
        assert (output / 'article-feedback.php').is_file()
        assert (output / 'feedback-admin/index.php').is_file()
        assert not (output / 'feedback-admin/.htaccess').exists()
        expected_base = '/review' if review else ''
        assert f"const FEEDBACK_BASE_PATH = '{expected_base}';" in (output / 'feedback-core.php').read_text(encoding='utf-8')
        assert (output / '.htaccess').is_file() is not review
        if review:
            for page in pages:
                assert 'content="noindex, nofollow"' in page.read_text(encoding='utf-8')
            assert "const SITE_BASE_PATH = '/review';" in (output / 'contact.php').read_text(encoding='utf-8')
            # Test extraction into an already-protected folder: authentication
            # must survive because the review ZIP has no .htaccess entry.
            with tempfile.TemporaryDirectory(prefix='aor-review-archive-') as test_root:
                folder = Path(test_root)
                archive = archive_release(output, folder / 'releases', review=True)
                protected = folder / 'protected'
                protected.mkdir()
                protection = protected / '.htaccess'
                protection.write_text('AuthType Basic\nRequire valid-user\n', encoding='utf-8')
                import zipfile
                with zipfile.ZipFile(archive) as package:
                    assert '.htaccess' not in package.namelist()
                    package.extractall(protected)
                assert protection.read_text(encoding='utf-8') == 'AuthType Basic\nRequire valid-user\n'
    mode = 'protected review' if review else 'production'
    print(f'PASS: {mode} metadata on {len(pages)} HTML pages, localized PHP form routing, policy sitemap URLs and server files. Checks used temporary fixtures, not a deployable release.')


def main():
    check_mode()
    check_mode(review=True)


if __name__ == '__main__':
    main()
