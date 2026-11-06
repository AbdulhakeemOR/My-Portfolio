"""Add the prepared public demos to the bilingual project catalog."""
from pathlib import Path
import json

ROOT = Path(__file__).resolve().parent.parent


def main():
    demos = json.loads((ROOT / 'content/demo-projects.json').read_text(encoding='utf-8'))
    project_path = ROOT / 'content/projects.json'
    catalog = json.loads(project_path.read_text(encoding='utf-8'))
    translations_path = ROOT / 'content/i18n/ar.json'
    translations = json.loads(translations_path.read_text(encoding='utf-8'))
    translations.update({'Try live demo': 'جرّب الموقع', 'Website demo': 'نموذج موقع', 'Portfolio website sample': 'نموذج موقع لملف الأعمال'})
    translations.update({'HTML, CSS': 'HTML وCSS', 'HTML, CSS, JavaScript': 'HTML وCSS وJavaScript', 'React, Vite, Radix UI': 'React وVite وRadix UI', 'React, HTML, CSS': 'React وHTML وCSS'})
    for name, data in demos.items():
        image = f'demos/previews/{name}.png'
        if not (ROOT / image).exists():
            raise ValueError(f'Capture the real demo screenshot first: {image}')
        slug = f'website-{name}'
        record = {
            'slug': slug, 'title': data['title'], 'description': data['description'],
            'category': 'websites', 'categories': ['websites'], 'status': 'concept',
            'featured': False, 'tool': data['tool'],
            'image': image, 'image_alt': data['title'], 'image_fit': 'cover',
            'external_url': f'/demos/{name}/', 'external_label': 'Try live demo', 'thumbnail_link': False,
            'repository_url': f'https://github.com/AbdulhakeemOR/{name}'
        }
        existing = next((r for r in catalog['projects'] if r['slug'] == slug), None)
        if existing: existing.update(record)
        else: catalog['projects'].append(record)
        translations[data['title']] = data['title_ar']
        translations[data['description']] = data['description_ar']
    project_path.write_text(json.dumps(catalog, ensure_ascii=False, indent=2)+'\n', encoding='utf-8')
    translations_path.write_text(json.dumps(translations, ensure_ascii=False, indent=2)+'\n', encoding='utf-8')
    print('Added seven website demo records and Arabic descriptions; campaign records preserved.')


if __name__ == '__main__': main()
