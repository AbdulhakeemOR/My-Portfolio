"""Check the one/two/three-item boundary and all generated collection pages."""

import json
from pathlib import Path

from project_collections import collection_url, media_items
from sync_content import project_card

ROOT = Path(__file__).resolve().parent.parent


def main():
    base = {'slug': 'boundary', 'title': 'Boundary', 'description': '', 'image': 'cover.webp'}
    single = project_card(base)
    assert 'collection-link' not in single and 'class="project-gallery"' not in single
    pair = project_card({**base, 'gallery': [{'image': 'second.webp'}]})
    assert 'collection-link' not in pair and 'class="project-gallery"' in pair
    three = project_card({**base, 'gallery': [{'image': 'second.webp'}, {'video': 'third.mp4'}]})
    assert 'class="collection-link"' in three and 'class="project-gallery"' not in three
    identity = project_card({**base, 'video': 'intro.mp4', 'gallery': [{'video': 'outro.mp4'}]})
    assert '<video' not in identity and 'class="collection-link"' in identity

    projects = json.loads((ROOT / 'content/projects.json').read_text(encoding='utf-8'))['projects']
    count = 0
    for project in projects:
        items = media_items(project)
        card = project_card(project)
        if len(items) <= 2:
            assert 'class="collection-link"' not in card
            continue
        assert card.count('<img ') + card.count('<video ') == 1, project['slug']
        assert f'href="{collection_url(project)}"' in card
        for language in ('', 'en', 'ar'):
            page = (ROOT / language / collection_url(project)).read_text(encoding='utf-8')
            assert page.count('<figure>') == len(items), (language, project['slug'])
            assert 'class="collection-grid"' in page
            for item in items:
                for field in ('image', 'video'):
                    if item.get(field):
                        assert item[field] in page, (project['slug'], item[field])
        count += 1
    print(f'PASS: one/two/three-item boundaries, single card covers, and {count} complete galleries in English and Arabic.')


if __name__ == '__main__':
    main()
