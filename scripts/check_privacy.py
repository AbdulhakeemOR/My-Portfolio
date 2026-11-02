"""Verify reviewed public media and ensure deployment excludes private originals."""

import argparse
import hashlib
import json
from pathlib import Path
import re
from urllib.parse import unquote, urlsplit

from check_site import Page
from course_content import load, previews

ROOT = Path(__file__).resolve().parent.parent
REVIEW = ROOT / 'content/media-review.json'


def hashes(root=ROOT):
    result = {}
    for folder in ('assets/images', 'assets/certificates', 'assets/videos'):
        for path in sorted((root / folder).rglob('*')):
            if path.is_file():
                with path.open('rb') as file:
                    digest = hashlib.file_digest(file, 'sha256').hexdigest()
                result[path.relative_to(root).as_posix()] = digest
    return result


def verify_review(root=ROOT):
    expected = json.loads(REVIEW.read_text(encoding='utf-8'))['sha256']
    actual = hashes(root)
    assert actual == expected, 'Public media changed or was added. Review it for private data before recording a new media review.'


def check_package():
    public = ROOT / 'dist'
    verify_review(public)
    assert not (public / 'admin').exists(), 'The editor and private originals must not be deployed.'
    assert not list(public.rglob('.tmp*'))
    assert not (public / 'scripts').exists()
    assert not (public / 'content/courses.json').exists()
    assert not (public / 'content/privacy.json').exists()
    assert not (public / 'A-intro.mp4').exists()
    assert not list((public / 'admin').rglob('*.pdf'))
    assert not list((public / 'admin').rglob('*.mp4'))
    references = 0
    for path in list(public.glob('*.html')) + list((public / 'en').glob('*.html')) + list((public / 'ar').glob('*.html')):
        page = Page()
        page.feed(path.read_text(encoding='utf-8'))
        assert not page.stack
        for link in page.links:
            parsed = urlsplit(link)
            if parsed.scheme or parsed.netloc:
                continue
            target = public / unquote(parsed.path.lstrip('/')) if parsed.path.startswith('/') else path.parent / unquote(parsed.path)
            if not parsed.path:
                target = path
            assert target.exists(), (path, link)
            references += 1
    for name in ('content/projects.json', 'en/content/projects.json', 'ar/content/projects.json'):
        data = json.loads((public / name).read_text(encoding='utf-8'))

        def check(value):
            if isinstance(value, dict):
                if value.get('video'):
                    video = value['video'].lstrip('../')
                    assert video.startswith(('assets/videos/', 'assets/uploads/')), value['video']
                    assert (public / video).is_file(), value['video']
                for child in value.values():
                    check(child)
            elif isinstance(value, list):
                for child in value:
                    check(child)

        check(data)
    print(f'PASS: reviewed media hashes, {references} packaged page references, public video paths, and exclusion of private originals/audit files.')


def check_documents():
    import pymupdf

    sources, outputs = [], []
    for group in load()['groups']:
        for item in group['items']:
            for source, output in previews(item):
                sources.append((ROOT / source.get('directory', 'admin/Certificates') / source['file']).resolve())
                outputs.append(ROOT / output)
    originals = set((ROOT / 'admin/Certificates').iterdir()) | set((ROOT / 'admin').glob('*.pdf'))
    assert set(sources) == {p.resolve() for p in originals if p.is_file()}
    assert len(sources) == len(set(sources)) == 30
    for path in outputs:
        assert path.exists()
        if path.suffix != '.pdf':
            continue
        with pymupdf.open(path) as document:
            assert not document.embfile_names()
            assert not document.get_xml_metadata()
            for page in document:
                assert not re.search(r'(?<!\d)\d{10}(?!\d)', page.get_text()), path
                assert not page.get_links(), path
    print('PASS: all 30 certificate sources accounted for exactly once; public PDFs have no searchable personal IDs, external links, XML metadata, or attachments.')


if __name__ == '__main__':
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--record-review', action='store_true', help='Record media checksums only after completing visual and OCR review.')
    parser.add_argument('--documents', action='store_true', help='Check public PDFs with PyMuPDF.')
    args = parser.parse_args()
    if args.record_review:
        REVIEW.write_text(json.dumps({'sha256': hashes()}, indent=2) + '\n', encoding='utf-8')
        print('Recorded reviewed public media checksums.')
    elif args.documents:
        check_documents()
    else:
        check_package()
