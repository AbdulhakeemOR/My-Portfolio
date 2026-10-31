"""Create public PDF copies with permanent redaction of personal ID numbers.

Requires PyMuPDF. Originals are preserved. Review any new certificate format
before publishing, especially scans whose text cannot be searched.
"""

import re
import shutil

import pymupdf

from course_content import ROOT, load, previews


def public_pdf(source, destination):
    redactions = 0
    with pymupdf.open(source) as document:
        for page in document:
            # Links in the source can reopen the original, unredacted certificate.
            for link in page.get_links():
                page.delete_link(link)
            identifiers = re.findall(r'(?<!\d)\d{10}(?!\d)', page.get_text())
            for identifier in identifiers:
                boxes = page.search_for(identifier)
                assert boxes, 'Personal-ID text could not be located.'
                for box in boxes:
                    page.add_redact_annot(box, fill=(0.12, 0.12, 0.12))
                    redactions += 1
            if identifiers:
                page.apply_redactions()
                assert not any(identifier in page.get_text() for identifier in identifiers)
        document.del_xml_metadata()
        for name in document.embfile_names():
            document.embfile_del(name)
        document.set_metadata({'title': 'Certificate preview', 'subject': 'Public copy; personal ID numbers removed where present.'})
        document.save(destination, garbage=4, deflate=True, clean=True)
    with pymupdf.open(destination) as public:
        text = '\n'.join(page.get_text() for page in public)
        assert not re.search(r'(?<!\d)\d{10}(?!\d)', text), 'Personal ID remains in the public copy.'
    return redactions


def main():
    count = redactions = 0
    for group in load()['groups']:
        for item in group['items']:
            for source, target in previews(item):
                original = ROOT / source.get('directory', 'admin/Certificates') / source['file']
                destination = ROOT / target
                destination.parent.mkdir(parents=True, exist_ok=True)
                if original.suffix.lower() == '.pdf':
                    redactions += public_pdf(original, destination)
                else:
                    shutil.copyfile(original, destination)
                count += 1
    print(f'Prepared {count} public certificate files; removed {redactions} personal-ID text runs. Originals unchanged.')


if __name__ == '__main__':
    main()
