"""Import the supplied concept and sample artwork as web-sized collections."""

import json
from pathlib import Path

from PIL import Image, ImageOps


ROOT = Path(__file__).resolve().parent.parent

CONCEPT_CAPTIONS = [
    'TruHaq business card front', 'TruHaq business card reverse',
    'TruHaq stationery front', 'TruHaq stationery reverse',
    'TruHaq design service logo', 'TruHaq events service logo',
    'The Power of Six service hub cover', 'TruHaq Strategies cover variation',
    'The Power of Six services cover', 'TruHaq discovery cover',
    'TruHaq media service logo', 'Discover the Power of Six services poster',
    'Discover the Power of Six poster', 'The Power of Six services poster',
    'TruHaq Resolve service logo', 'TruHaq Stories service logo',
    'TruHaq translation service logo', 'TruHaq Strategies consultancy logo',
    'TruHaq six-service visual overview',
]

SAMPLE_CAPTIONS = [
    'You Can motivational banner with mountain imagery',
    'You Can motivational poster with a portrait',
    'AOR letter A identity study', 'Al-Haqq Umrah Services logo',
    'Al-Haqq purple frame template', 'AOR sketching illustration',
    'Ar-Rahman Umrah Services promotional flyer', 'Purple social media frame template',
    'Green Eid Mubarak flyer', 'Eid Mubarak lantern greeting',
    'You Can motivational banner with an illustration', 'AOR letter O identity study',
    'AOR idea illustration', 'AOR letter R identity study',
    'The Power of Communication poster in purple',
    'The Power of Communication poster in green',
    'Believe, work hard, and inspire others education poster',
    'Education for everyone means everyone poster',
    'Education is available to everyone poster', 'Al-Haqq Arabic logo',
    'Inclusive education, stronger community poster',
    'You Can education banner with classroom imagery', 'Arabic Eid greeting flyer',
    'Your ability is your strength education poster',
    'Every step in learning is a victory banner',
]


def collection(folder, prefix, captions, cover_index, title, description, status):
    files = sorted((ROOT / 'admin' / folder).iterdir(), key=lambda p: p.name.casefold())
    assert len(files) == len(captions), 'Review captions when the source collection changes.'
    media = []
    for number, (source, caption) in enumerate(zip(files, captions), 1):
        target = f'assets/images/{prefix}-{number:02}.webp'
        with Image.open(source) as original:
            image = ImageOps.exif_transpose(original)
            image.thumbnail((1600, 1600), Image.Resampling.LANCZOS)
            image.save(ROOT / target, 'WEBP', quality=88, method=6)
        media.append({'image': target, 'image_alt': caption, 'caption': caption})
    cover = media.pop(cover_index)
    return {
        'title': title, 'description': description, 'category': 'ad-design-video',
        'categories': ['ad-design-video', 'pr-media-campaign'], 'status': status,
        'slug': prefix, 'image': cover['image'], 'image_alt': cover['image_alt'],
        'image_fit': 'contain', 'featured': False, 'gallery': media,
    }


def main():
    path = ROOT / 'content/projects.json'
    data = json.loads(path.read_text(encoding='utf-8'))
    additions = [
        collection('Concept', 'truhaq-concept', CONCEPT_CAPTIONS, 6,
                   'TruHaq Brand Concept Collection',
                   'A 19-piece concept identity collection for TruHaq Strategies Consultancy, including service logos, business cards, social covers, posters, and a six-service overview.',
                   'concept'),
        collection('Design Samples', 'design-samples', SAMPLE_CAPTIONS, 14,
                   'Design Samples Collection',
                   '25 design samples exploring Arabic education and motivational messages, Eid greetings, Umrah promotions, logos, social templates, and communication posters.',
                   'practice'),
    ]
    for project in additions:
        existing = next((i for i, p in enumerate(data['projects']) if p['slug'] == project['slug']), None)
        if existing is None:
            data['projects'].append(project)
        else:
            data['projects'][existing] = project
    path.write_text(json.dumps(data, ensure_ascii=False, indent=2) + '\n', encoding='utf-8')
    from redact_images import main as apply_privacy_masks
    apply_privacy_masks()
    print('Imported 44 images into two project collections.')


if __name__ == '__main__':
    main()
