"""Add the five fictional-brand advertising sets from AOR/My-Projects to the Projects page.

Each brand becomes one "AD Design & Video" project: its ads are converted to web-sized
WebP files under assets/images/<slug>/, its reel is copied to assets/videos/<slug>/ with a
poster frame, and the English and Arabic captions go to content/i18n/launch-ar.json.
Re-running the script refreshes everything it created; other projects are left untouched.
Files not listed below (for example a misplaced export) are reported and skipped.
"""
from pathlib import Path
import json
import shutil

from add_campaign_kits import SOURCE, webp, poster_frame

ROOT = Path(__file__).resolve().parent.parent
CATEGORY = 'ad-design-video'

# Pieces are listed in display order; the first one is the project card image.
BRANDS = [
    {
        'slug': 'chargeup-hub', 'folder': 'ChargeUp', 'name': 'ChargeUp Hub', 'name_ar': 'تشارج أب هب',
        'title': 'ChargeUp Hub — Phone Accessories Ad Set',
        'title_ar': 'تشارج أب هب — مجموعة إعلانات لملحقات الهواتف',
        'description': 'A sample ad set for a fictional phone-accessories shop in Lagos, Nigeria: three landscape display ads for power banks, charging cables and wall adapters, and a short vertical reel.',
        'description_ar': 'مجموعة إعلانات نموذجية لمتجر خيالي لملحقات الهواتف في لاغوس بنيجيريا: ثلاثة إعلانات عرضية أفقية لبنوك الطاقة وكابلات الشحن ومحولات الجدار، ومقطع فيديو عمودي قصير.',
        'pieces': [
            ('ChargeUp Hub Introduction.png', 'Introduction ad — “Power through your day.”', 'إعلان تعريفي — «طاقة تكفي يومك»'),
            ('ChargeUp Hub Essentials.png', 'Product ad — “Find your charge.” Power banks and cables', 'إعلان المنتجات — «اعثر على شحنك» بنوك الطاقة والكابلات'),
            ('ChargeUp Hub Call to Action.png', 'Call-to-action ad — “Stay charged, wherever today takes you.”', 'إعلان الدعوة إلى الإجراء — «ابقَ مشحونًا أينما أخذك يومك»'),
        ],
        'reel': ('ChargeUp Reel.mp4', 'Vertical reel — from low battery to fully charged', 'مقطع عمودي — من بطارية منخفضة إلى شحن كامل'),
        'pieces_line': ('three landscape display ads and a vertical reel.', 'ثلاثة إعلانات عرضية أفقية ومقطع فيديو عمودي.'),
    },
    {
        'slug': 'crunchlab', 'folder': 'CrunchLab', 'name': 'CrunchLab', 'name_ar': 'كرنش لاب',
        'title': 'CrunchLab — Student Snack Ad Campaign',
        'title_ar': 'كرنش لاب — حملة إعلانية لوجبة خفيفة للطلاب',
        'description': 'A sample ad campaign for a fictional coated-peanut snack sold to university students in two pack sizes: four social feed ads, a price poster, a story frame, a packaging label and a short vertical reel.',
        'description_ar': 'حملة إعلانية نموذجية لوجبة فول سوداني مغلف خيالية موجهة لطلاب الجامعات بحجمين: أربعة إعلانات لمنصات التواصل وملصق للأسعار وإطار قصة وملصق للعبوة ومقطع فيديو عمودي قصير.',
        'pieces': [
            ('Meet CrunchLab.png', 'Feed ad — “Meet CrunchLab. Study smarter. Snack smarter.”', 'إعلان للمنصات — «تعرّف على كرنش لاب: ذاكر بذكاء، وتناول وجبتك بذكاء»'),
            ('Study Break Crunch.png', 'Feed ad — “Crunch-tested for study breaks.”', 'إعلان للمنصات — «مجرّبة لاستراحات المذاكرة»'),
            ('Choose Your Pack.png', 'Feed ad — “Pick your study-session size.” 25 g and 150 g packs', 'إعلان للمنصات — «اختر حجم جلسة مذاكرتك» عبوتا ٢٥ و١٥٠ غرامًا'),
            ('Order CrunchLab.png', 'Feed ad — “Ready for a crunchy break?”', 'إعلان للمنصات — «مستعد لاستراحة مقرمشة؟»'),
            ('CrunchLab Price Poster.png', 'Price poster — 25 g for 1 riyal, 150 g for 5 riyals', 'ملصق الأسعار — ٢٥ غرامًا بريال واحد و١٥٠ غرامًا بخمسة ريالات'),
            ('CrunchLab Story Frame.png', 'Story frame — vertical price ad', 'إطار قصة — إعلان عمودي للأسعار'),
            ('CrunchLab Packaging Label.png', 'Packaging label — coated peanuts with allergen note', 'ملصق العبوة — فول سوداني مغلف مع تنبيه مسببات الحساسية'),
        ],
        'reel': ('CrunchLab Reel.mp4', 'Vertical reel — a study-break snack', 'مقطع عمودي — وجبة خفيفة لاستراحة المذاكرة'),
        'pieces_line': ('four social feed ads, a price poster, a story frame, a packaging label and a vertical reel.', 'أربعة إعلانات لمنصات التواصل وملصق للأسعار وإطار قصة وملصق للعبوة ومقطع فيديو عمودي.'),
    },
    {
        'slug': 'pagepal', 'folder': 'PagePal', 'name': 'PagePal', 'name_ar': 'بيج بال',
        'title': 'PagePal — Student Planner Ad Campaign',
        'title_ar': 'بيج بال — حملة إعلانية لمفكرة تخطيط للطلاب',
        'description': 'A sample ad campaign for a fictional weekly planner for students in Toronto, Canada: a print poster, three social feed ads, a story frame and a short vertical reel.',
        'description_ar': 'حملة إعلانية نموذجية لمفكرة أسبوعية خيالية للطلاب في تورونتو بكندا: ملصق مطبوع وثلاثة إعلانات لمنصات التواصل وإطار قصة ومقطع فيديو عمودي قصير.',
        'pieces': [
            ('PagePal Planner Poster.png', 'Poster — “Your week, sorted.” From $14.99 CAD', 'ملصق — «أسبوعك منظّم» ابتداءً من ١٤٫٩٩ دولارًا كنديًا'),
            ('Your Week, Sorted.png', 'Feed ad — “Your week, sorted. Plan it like you mean it.”', 'إعلان للمنصات — «أسبوعك منظّم: خطّط بجدية»'),
            ('Plan a Real Week.png', 'Feed ad — “One week, all of real life.”', 'إعلان للمنصات — «أسبوع واحد يتسع لحياتك كلها»'),
            ('Start This Week.png', 'Feed ad — “A plan doesn’t have to be perfect.”', 'إعلان للمنصات — «لا يلزم أن تكون الخطة مثالية»'),
            ('PagePal Story Frame.png', 'Story frame — vertical planner ad', 'إطار قصة — إعلان عمودي للمفكرة'),
        ],
        'reel': ('PagePal Reel.mp4', 'Vertical reel — planning the week', 'مقطع عمودي — التخطيط للأسبوع'),
        'pieces_line': ('a print poster, three social feed ads, a story frame and a vertical reel.', 'ملصق مطبوع وثلاثة إعلانات لمنصات التواصل وإطار قصة ومقطع فيديو عمودي.'),
    },
    {
        'slug': 'thriftthread', 'folder': 'ThriftThread', 'name': 'ThriftThread', 'name_ar': 'ثريفت ثريد',
        'title': 'ThriftThread — Pre-Loved Fashion Ad Set',
        'title_ar': 'ثريفت ثريد — مجموعة إعلانات لأزياء مستعملة',
        'description': 'A sample ad set for a fictional second-hand clothing shop in Nairobi, Kenya: three landscape display ads, a story frame and a short vertical reel.',
        'description_ar': 'مجموعة إعلانات نموذجية لمتجر ملابس مستعملة خيالي في نيروبي بكينيا: ثلاثة إعلانات عرضية أفقية وإطار قصة ومقطع فيديو عمودي قصير.',
        'pieces': [
            ('ThriftThread Introduction.png', 'Introduction ad — “Refresh your style, responsibly.”', 'إعلان تعريفي — «جدّد أسلوبك بمسؤولية»'),
            ('ThriftThread Finds.png', 'Product ad — “Good finds. New stories.”', 'إعلان المنتجات — «قطع جميلة وقصص جديدة»'),
            ('ThriftThread Call to Action.png', 'Call-to-action ad — “Give great clothes another go.”', 'إعلان الدعوة إلى الإجراء — «امنح الملابس الجيدة فرصة أخرى»'),
            ('ThriftThread Story Frame.png', 'Story frame — vertical shop ad, from KSh 500', 'إطار قصة — إعلان عمودي للمتجر ابتداءً من ٥٠٠ شلن كيني'),
        ],
        'reel': ('ThriftThread Reel.mp4', 'Vertical reel — a pre-loved find, styled', 'مقطع عمودي — قطعة مستعملة بإطلالة جديدة'),
        'pieces_line': ('three landscape display ads, a story frame and a vertical reel.', 'ثلاثة إعلانات عرضية أفقية وإطار قصة ومقطع فيديو عمودي.'),
    },
    {
        'slug': 'tutorloop', 'folder': 'TutorLoop', 'name': 'TutorLoop', 'name_ar': 'توتور لوب',
        'title': 'TutorLoop — Private Tutoring Ad Set',
        'title_ar': 'توتور لوب — مجموعة إعلانات للدروس الخصوصية',
        'description': 'A sample ad set for a fictional one-to-one tutoring service in Amman, Jordan, covering maths, science and English: three landscape display ads, a story frame and a short vertical reel.',
        'description_ar': 'مجموعة إعلانات نموذجية لخدمة دروس خصوصية فردية خيالية في عمّان بالأردن تشمل الرياضيات والعلوم واللغة الإنجليزية: ثلاثة إعلانات عرضية أفقية وإطار قصة ومقطع فيديو عمودي قصير.',
        'pieces': [
            ('TutorLoop Introduction.png', 'Introduction ad — “Learning, one step at a time.”', 'إعلان تعريفي — «التعلّم خطوة بخطوة»'),
            ('TutorLoop Subjects.png', 'Subjects ad — “Make the next lesson click.”', 'إعلان المواد — «اجعل الدرس القادم أوضح»'),
            ('TutorLoop Call to Action.png', 'Call-to-action ad — “Ready to learn with confidence?”', 'إعلان الدعوة إلى الإجراء — «مستعد للتعلّم بثقة؟»'),
            ('TutorLoop Story Frame.png', 'Story frame — vertical ad, from JOD 10 per session', 'إطار قصة — إعلان عمودي ابتداءً من ١٠ دنانير أردنية للحصة'),
        ],
        'reel': ('TutorLoop Reel.mp4', 'Vertical reel — a focused study session', 'مقطع عمودي — جلسة مذاكرة مركّزة'),
        'pieces_line': ('three landscape display ads, a story frame and a vertical reel.', 'ثلاثة إعلانات عرضية أفقية وإطار قصة ومقطع فيديو عمودي.'),
    },
]

DETAILS_TYPE = ('Project type: Sample advertising set for a fictional brand.', 'نوع المشروع: مجموعة إعلانات نموذجية لعلامة تجارية خيالية.')


def build(brand, arabic):
    folder, slug = SOURCE / brand['folder'], brand['slug']
    images, videos = ROOT / 'assets/images' / slug, ROOT / 'assets/videos' / slug
    for path in (images, videos):
        if path.exists(): shutil.rmtree(path)
    listed = {piece[0] for piece in brand['pieces']} | {brand['reel'][0]}
    for extra in sorted(p.name for p in folder.iterdir() if p.is_file() and p.name not in listed):
        print(f'  Skipped (not listed for {brand["name"]}): {brand["folder"]}/{extra}')
    items = []
    for number, (file, english, arabic_text) in enumerate(brand['pieces'], 1):
        name = f'ad-{number}.webp'
        webp(folder / file, images / name)
        caption = f'{brand["name"]} — {english}'
        arabic[caption] = f'{brand["name_ar"]} — {arabic_text}'
        items.append({'image': f'assets/images/{slug}/{name}', 'caption': caption})
    file, english, arabic_text = brand['reel']
    videos.mkdir(parents=True, exist_ok=True)
    shutil.copy2(folder / file, videos / 'reel.mp4')
    poster_frame(folder / file, images / 'reel-poster.webp')
    caption = f'{brand["name"]} — {english}'
    arabic[caption] = f'{brand["name_ar"]} — {arabic_text}'
    items.append({'video': f'assets/videos/{slug}/reel.mp4', 'poster': f'assets/images/{slug}/reel-poster.webp', 'caption': caption})
    pieces = 'Pieces: ' + brand['pieces_line'][0]
    arabic[pieces] = 'المحتوى: ' + brand['pieces_line'][1]
    arabic[DETAILS_TYPE[0]] = DETAILS_TYPE[1]
    arabic[brand['title']] = brand['title_ar']
    arabic[brand['description']] = brand['description_ar']
    card, gallery = items[0], items[1:]  # the card image opens each collection; don't list it twice
    return {
        'slug': slug, 'title': brand['title'], 'description': brand['description'],
        'details': DETAILS_TYPE[0] + '\n\n' + pieces,
        'category': CATEGORY, 'categories': [CATEGORY], 'status': 'concept', 'featured': False,
        'image': card['image'], 'image_alt': card['caption'], 'image_fit': 'contain',
        'gallery': gallery,
    }


def main():
    project_path = ROOT / 'content/projects.json'
    catalog = json.loads(project_path.read_text(encoding='utf-8'))
    arabic_path = ROOT / 'content/i18n/launch-ar.json'
    arabic = json.loads(arabic_path.read_text(encoding='utf-8'))
    records = [build(brand, arabic) for brand in BRANDS]
    slugs = {record['slug'] for record in records}
    projects = [project for project in catalog['projects'] if project['slug'] not in slugs]
    # Ad sets sit after the PR and campaign work, before the website demos.
    position = next((i for i, project in enumerate(projects) if project.get('category') == 'websites'), len(projects))
    catalog['projects'] = projects[:position] + records + projects[position:]
    project_path.write_text(json.dumps(catalog, ensure_ascii=False, indent=2) + '\n', encoding='utf-8')
    arabic_path.write_text(json.dumps(arabic, ensure_ascii=False, indent=2) + '\n', encoding='utf-8')
    print(f'Added {len(records)} ad sets ({sum(len(r["gallery"]) + 1 for r in records)} pieces) and their Arabic text.')


if __name__ == '__main__':
    main()
