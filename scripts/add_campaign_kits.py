"""Add the five fictional-client communication kits from AOR/My-Projects to the Projects page.

Images become web-sized WebP files under assets/images/<slug>/, videos are copied to
assets/videos/<slug>/ (with a poster frame), and each brand gets one project record with
an ordered collection, plus Arabic text in content/i18n/launch-ar.json. Re-running the
script refreshes everything it created; other projects are left untouched.
"""
from pathlib import Path
import json
import re
import shutil

from PIL import Image

ROOT = Path(__file__).resolve().parent.parent
SOURCE = ROOT.parent / 'My-Projects'
COPY_PAGE = '/demos/copywriting-samples/'
MAX_WIDTH = 1600

# Common piece types: (English caption, Arabic caption). "{topic}" is filled per brand.
COMMON = {
    'poster': ('Poster', 'الملصق'),
    'brand': ('Brand board — logo, palette, type and tone of voice', 'لوحة الهوية — الشعار والألوان والخطوط ونبرة الصوت'),
    'messaging': ('Messaging — {topic}', 'إطار الرسائل — {topic}'),
    'slide': ('{deck} — slide {n} of {total}', '{deck} — الشريحة {n} من {total}'),
    'release': ('Press release — {topic} (page {n} of 2)', 'بيان صحفي — {topic} (الصفحة {n} من ٢)'),
    'statement': ('Media statement — {topic}', 'بيان إعلامي — {topic}'),
    'calendar': ('Campaign calendar — {topic}', 'تقويم الحملة — {topic}'),
    'crisis': ('Crisis plan — {topic}', 'خطة الأزمات — {topic}'),
    'audit': ('Communication audit — {topic}', 'تدقيق الاتصال — {topic}'),
    'proofreading': ('Arabic proofreading — {topic}', 'التدقيق اللغوي العربي — {topic}'),
}

BRANDS = [
    {
        'slug': 'brightfold', 'folder': 'Brightfold', 'copy': 'utme',
        'title': 'Brightfold Learning Hub — Tutoring Centre Communication Kit',
        'title_ar': 'مركز برايتفولد التعليمي — حزمة اتصال لمركز دروس تقوية',
        'description': 'A sample communication kit for a fictional tutoring centre in Lagos that prepares SS3 students for the UTME: brand board, poster, parent deck, press release, campaign and crisis plans, Arabic proofreading and two short videos.',
        'description_ar': 'حزمة اتصال نموذجية لمركز دروس تقوية خيالي في لاغوس يُعدّ طلاب الصف الثالث الثانوي لاختبار القبول الجامعي (UTME): لوحة الهوية والملصق وعرض تقديمي لأولياء الأمور وبيان صحفي وخطتا الحملة والأزمات وتدقيق لغوي عربي ومقطعا فيديو قصيران.',
        'deck': ('Term welcome deck for parents', 'عرض الترحيب بالفصل الدراسي لأولياء الأمور'),
        'topics': {
            'messaging': ('message house', 'بيت الرسائل'),
            'release': ('45 full scholarships for public school students', '٤٥ منحة كاملة لطلاب المدارس الحكومية'),
            'calendar': ('“Last Intake” enrolment campaign', 'حملة التسجيل «الدفعة الأخيرة»'),
            'crisis': ('student injury on site: decision tree', 'إصابة طالب في المركز: شجرة القرار'),
            'audit': ('student safety readiness scorecard', 'بطاقة جاهزية سلامة الطلاب'),
            'proofreading': ('Arabic course flyer, before and after', 'منشور دورة اللغة العربية قبل التدقيق وبعده'),
        },
        'videos': {
            'Brightfold Countdown.mp4': ('Countdown animation — 58 days to the UTME', 'رسوم متحركة للعدّ التنازلي — ٥٨ يومًا على الاختبار', 'Brightfold Countdown Cover.png'),
            'brightfold-saturday_1080x1920_sound.mp4': ('Vertical video — a Saturday at Brightfold (with sound)', 'فيديو عمودي — يوم سبت في برايتفولد (مع الصوت)', None),
        },
    },
    {
        'slug': 'northpine', 'folder': 'Northpine', 'copy': 'northpine',
        'title': 'Northpine Mobility Clinic — Physiotherapy Communication Kit',
        'title_ar': 'عيادة نورث باين للحركة — حزمة اتصال لعيادة علاج طبيعي',
        'description': 'A sample communication kit for a fictional physiotherapy clinic in Toronto: brand board, poster, a workplace-talk deck, a media statement, campaign and crisis plans, a privacy audit, Arabic proofreading and two short videos.',
        'description_ar': 'حزمة اتصال نموذجية لعيادة علاج طبيعي خيالية في تورونتو: لوحة الهوية والملصق وعرض لمحاضرة في بيئة العمل وبيان إعلامي وخطتا الحملة والأزمات وتدقيق للخصوصية وتدقيق لغوي عربي ومقطعا فيديو قصيران.',
        'deck': ('“Desk to Done” workplace talk', 'محاضرة «من المكتب إلى الإنجاز» في بيئة العمل'),
        'topics': {
            'messaging': ('claims guardrail: what we say, and what we never say', 'ضوابط الادعاءات: ما نقوله وما لا نقوله أبدًا'),
            'statement': ('temporary clinic closure', 'الإغلاق المؤقت للعيادة'),
            'calendar': ('“Desk to Done” workplace campaign', 'حملة «من المكتب إلى الإنجاز» في بيئة العمل'),
            'crisis': ('viral treatment complaint: decision tree', 'شكوى علاج منتشرة على الإنترنت: شجرة القرار'),
            'audit': ('patient privacy and complaints (RAG rating)', 'خصوصية المرضى والشكاوى (تقييم بالألوان)'),
            'proofreading': ('patient leaflet, before and after', 'نشرة المرضى قبل التدقيق وبعده'),
        },
        'videos': {
            'northpine-infographic.mp4': ('Infographic animation — move every 30 minutes', 'رسوم معلوماتية متحركة — تحرّك كل ٣٠ دقيقة', 'northpine-infographic_cover.png'),
            'northpine-myths_1080x1920_sound.mp4': ('Vertical video — running injury myths (with sound)', 'فيديو عمودي — خرافات حول إصابات الجري (مع الصوت)', None),
        },
    },
    {
        'slug': 'qanater', 'folder': 'Qanater', 'copy': 'qanater',
        'title': 'Qanater Foundation — Non-Profit Communication Kit',
        'title_ar': 'مؤسسة قناطر — حزمة اتصال لمؤسسة غير ربحية',
        'description': 'A sample bilingual communication kit for a fictional non-profit in Amman that trains young people in digital skills: brand board, poster, impact-report deck, press release, donor campaign and crisis plans, Arabic proofreading and two short videos.',
        'description_ar': 'حزمة اتصال نموذجية ثنائية اللغة لمؤسسة غير ربحية خيالية في عمّان تدرّب الشباب على المهارات الرقمية: لوحة الهوية والملصق وعرض تقرير الأثر وبيان صحفي وخطتا حملة المانحين والأزمات وتدقيق لغوي عربي ومقطعا فيديو قصيران.',
        'deck': ('2026 bilingual impact report', 'تقرير الأثر ثنائي اللغة لعام ٢٠٢٦'),
        'topics': {
            'messaging': ('two audiences, one organisation', 'جمهوران ومؤسسة واحدة'),
            'release': ('three-year training partnership', 'شراكة تدريبية لثلاث سنوات'),
            'calendar': ('year-end donor appeal', 'نداء المانحين في نهاية العام'),
            'crisis': ('misuse-of-funds allegation: decision tree', 'ادعاء بإساءة استخدام الأموال: شجرة القرار'),
            'audit': ('donor scrutiny stress test', 'اختبار الجاهزية لتدقيق المانحين'),
            'proofreading': ('donor report summary, before and after', 'ملخص تقرير المانحين قبل التدقيق وبعده'),
        },
        'videos': {
            'qanater-41.mp4': ('Animated statistic — 41% found work or an internship', 'إحصائية متحركة — ٤١٪ حصلوا على عمل أو تدريب', 'qanater-41_cover.png'),
            'qanater-six-months_1080x1350.mp4': ('Portrait video — six months from classroom to first payslip', 'فيديو طولي — ستة أشهر من قاعة التدريب إلى أول راتب', None),
        },
    },
    {
        'slug': 'shiftcove', 'folder': 'Shiftcove', 'copy': 'shiftcove',
        'title': 'Shiftcove — Software Launch Communication Kit',
        'title_ar': 'شيفت كوف — حزمة اتصال لإطلاق برنامج',
        'description': 'A sample communication kit for a fictional Dublin rota app for cafés and salons: brand board, social ad, sales deck template, press release, launch campaign and crisis plans, a data-breach readiness audit, Arabic proofreading and two short videos.',
        'description_ar': 'حزمة اتصال نموذجية لتطبيق خيالي لجدولة المناوبات من دبلن مخصّص للمقاهي والصالونات: لوحة الهوية وإعلان للتواصل الاجتماعي وقالب عرض مبيعات وبيان صحفي وخطتا حملة الإطلاق والأزمات وتدقيق الجاهزية لاختراق البيانات وتدقيق لغوي عربي ومقطعا فيديو قصيران.',
        'deck': ('Sales deck template', 'قالب عرض المبيعات'),
        'poster': ('Social media ad', 'إعلان للتواصل الاجتماعي'),
        'topics': {
            'messaging': ('persona matrix: three people, three reasons to say yes', 'مصفوفة الشخصيات: ثلاثة أشخاص وثلاثة أسباب للموافقة'),
            'release': ('Arabic version launch for Gulf cafés and salons', 'إطلاق النسخة العربية للمقاهي والصالونات في الخليج'),
            'calendar': ('Gulf launch campaign', 'حملة الإطلاق في الخليج'),
            'crisis': ('customer data exposure: decision tree', 'كشف بيانات العملاء: شجرة القرار'),
            'audit': ('data-breach communication maturity', 'نضج الاتصال عند اختراق البيانات'),
            'proofreading': ('help article, before and after', 'مقالة المساعدة قبل التدقيق وبعده'),
        },
        'videos': {
            'shiftcove-loop.mp4': ('Product loop — a shift swap approved', 'حلقة المنتج — الموافقة على تبديل مناوبة', 'shiftcove-loop_cover.png'),
            'shiftcove-rota_1080x1080.mp4': ('Square video — building the rota', 'فيديو مربع — إعداد جدول المناوبات', None),
        },
    },
    {
        'slug': 'wahat-qamar', 'folder': 'Wahat Qamar', 'copy': 'wahat',
        'title': 'Wahat Qamar — Coffee and Dates Communication Kit',
        'title_ar': 'واحة قمر — حزمة اتصال لمتجر قهوة وتمور',
        'description': 'A sample Arabic-first communication kit for a fictional coffee and dates brand in Riyadh: brand board, Ramadan poster, corporate gifts deck, Arabic press release, gifting campaign and crisis plans, a recall drill audit, Arabic proofreading and two short videos.',
        'description_ar': 'حزمة اتصال نموذجية تبدأ بالعربية لعلامة قهوة وتمور خيالية في الرياض: لوحة الهوية وملصق رمضان وعرض هدايا الشركات وبيان صحفي عربي وخطتا حملة الهدايا والأزمات وتدقيق لتمرين سحب المنتج وتدقيق لغوي عربي ومقطعا فيديو قصيران.',
        'deck': ('Corporate gifts deck (Arabic)', 'عرض هدايا الشركات (بالعربية)'),
        'poster': ('Ramadan corporate gifts poster', 'ملصق هدايا رمضان للشركات'),
        'topics': {
            'messaging': ('one idea, two audiences', 'فكرة واحدة لجمهورين'),
            'release': ('first store opening in Jeddah (Arabic)', 'افتتاح أول متجر في جدة (بالعربية)'),
            'calendar': ('Ramadan corporate gifting campaign', 'حملة هدايا رمضان للشركات'),
            'crisis': ('allergen recall: decision tree', 'سحب منتج بسبب مسبّبات الحساسية: شجرة القرار'),
            'audit': ('product recall drill: four-hour test', 'تمرين سحب المنتج: اختبار الساعات الأربع'),
            'proofreading': ('“About us” web page, before and after', 'صفحة «من نحن» قبل التدقيق وبعده'),
        },
        'videos': {
            'wahat-sting.mp4': ('Logo sting animation', 'رسوم متحركة قصيرة للشعار', 'wahat-sting_cover.png'),
            'wahat-dawn_1080x1920_sound.mp4': ('Vertical video — Ramadan dawn (with sound)', 'فيديو عمودي — فجر رمضان (مع الصوت)', None),
        },
    },
]


def kind_of(name):
    """Classify a kit file by its name: (kind, number)."""
    lower = name.lower()
    slide = re.search(r'slide (\d+)', lower)
    if slide: return 'slide', int(slide[1])
    release = re.search(r'press release (\d+)', lower)
    if release: return 'release', int(release[1])
    for key, kind in (('brand board', 'brand'), ('poster', 'poster'), ('messaging', 'messaging'), ('statement', 'statement'),
                      ('campaign calendar', 'calendar'), ('crisis plan', 'crisis'), ('audit', 'audit'), ('proofreading', 'proofreading')):
        if key in lower: return kind, 0
    return None, 0


ORDER = ['poster', 'brand', 'messaging', 'slide', 'release', 'statement', 'calendar', 'crisis', 'audit', 'proofreading']


def webp(source, target):
    target.parent.mkdir(parents=True, exist_ok=True)
    image = Image.open(source).convert('RGB')
    if image.width > MAX_WIDTH:
        image = image.resize((MAX_WIDTH, round(image.height * MAX_WIDTH / image.width)), Image.LANCZOS)
    image.save(target, 'WEBP', quality=84, method=6)


def poster_frame(video, target):
    import cv2
    capture = cv2.VideoCapture(str(video))
    frames = capture.get(cv2.CAP_PROP_FRAME_COUNT) or 0
    capture.set(cv2.CAP_PROP_POS_FRAMES, min(int(frames * 0.35), max(int(frames) - 1, 0)))  # past the intro, into the content
    ok, frame = capture.read()
    capture.release()
    if not ok: raise RuntimeError(f'Could not read a frame from {video.name}')
    target.parent.mkdir(parents=True, exist_ok=True)
    Image.fromarray(cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)).save(target, 'WEBP', quality=82, method=6)


def build(brand, arabic):
    folder = SOURCE / brand['folder']
    slug = brand['slug']
    images, videos = ROOT / 'assets/images' / slug, ROOT / 'assets/videos' / slug
    for path in (images, videos):
        if path.exists(): shutil.rmtree(path)
    pieces = []
    for path in folder.glob('*.png'):
        if path.name in {v[2] for v in brand['videos'].values() if v[2]}: continue  # video covers become posters
        kind, number = kind_of(path.name)
        if not kind: raise ValueError(f'Unrecognised kit file: {path}')
        pieces.append((ORDER.index(kind), number, kind, path))
    pieces.sort(key=lambda item: item[:2])
    total = sum(1 for piece in pieces if piece[2] == 'slide')
    gallery, card_image = [], None
    for _, number, kind, path in pieces:
        name = f'{kind}-{number}.webp' if number else f'{kind}.webp'
        webp(path, images / name)
        english, arabic_text = COMMON[kind]
        if kind == 'poster' and brand.get('poster'): english, arabic_text = brand['poster']
        values_en = {'topic': brand['topics'].get(kind, ('', ''))[0], 'deck': brand['deck'][0], 'n': number, 'total': total}
        values_ar = {'topic': brand['topics'].get(kind, ('', ''))[1], 'deck': brand['deck'][1], 'n': number, 'total': total}
        caption = english.format(**values_en)
        caption_ar = arabic_text.format(**values_ar)
        caption, caption_ar = f'{brand["folder"]} — {caption}', f'{brand["title_ar"].split(" — ")[0]} — {caption_ar}'
        arabic[caption] = caption_ar
        item = {'image': f'assets/images/{slug}/{name}', 'caption': caption}
        if kind == 'poster':
            card_image = item  # the card image already opens each collection; don't list it twice
            continue
        gallery.append(item)
    for file, (english, arabic_text, cover) in brand['videos'].items():
        source = folder / file
        target_name = re.sub(r'[^a-z0-9.]+', '-', file.lower()).strip('-')
        (videos).mkdir(parents=True, exist_ok=True)
        shutil.copy2(source, videos / target_name)
        poster = images / (Path(target_name).stem + '-poster.webp')
        if cover: webp(folder / cover, poster)
        else: poster_frame(source, poster)
        caption = f'{brand["folder"]} — {english}'
        arabic[caption] = f'{brand["title_ar"].split(" — ")[0]} — {arabic_text}'
        gallery.append({'video': f'assets/videos/{slug}/{target_name}', 'poster': f'assets/images/{slug}/{poster.name}', 'caption': caption})
    arabic[brand['title']] = brand['title_ar']
    arabic[brand['description']] = brand['description_ar']
    details = ('Project type: Sample communication kit for a fictional client.\n\n'
               'Pieces: brand board, poster, presentation deck, press materials, messaging, campaign calendar, crisis plan, communication audit, Arabic proofreading and two short videos.\n\n'
               'Copywriting: the matching web page copy is in the copywriting samples.')
    arabic[details.split('\n\n')[0]] = 'نوع المشروع: حزمة اتصال نموذجية لعميل خيالي.'
    arabic[details.split('\n\n')[1]] = 'المحتوى: لوحة الهوية والملصق والعرض التقديمي والمواد الصحفية وإطار الرسائل وتقويم الحملة وخطة الأزمات وتدقيق الاتصال والتدقيق اللغوي العربي ومقطعا فيديو قصيران.'
    arabic[details.split('\n\n')[2]] = 'كتابة المحتوى: نصوص صفحة الويب المرتبطة متاحة ضمن نماذج كتابة المحتوى.'
    return {
        'slug': slug, 'title': brand['title'], 'description': brand['description'], 'details': details,
        'category': 'pr-media-campaign', 'categories': ['pr-media-campaign'], 'status': 'concept', 'featured': False,
        'image': card_image['image'], 'image_alt': card_image['caption'], 'image_fit': 'contain',
        'external_url': f'{COPY_PAGE}#{brand["copy"]}', 'external_label': 'Read the copywriting sample',
        'gallery': gallery,
    }


def main():
    project_path = ROOT / 'content/projects.json'
    catalog = json.loads(project_path.read_text(encoding='utf-8'))
    arabic_path = ROOT / 'content/i18n/launch-ar.json'
    arabic = json.loads(arabic_path.read_text(encoding='utf-8'))
    arabic['Read the copywriting sample'] = 'اقرأ نموذج كتابة المحتوى'
    arabic['Portrait of Abdulhakeem Oladapo Raji'] = 'صورة شخصية لعبد الحكيم أولادابو راجي'
    records = [build(brand, arabic) for brand in BRANDS]
    slugs = {record['slug'] for record in records}
    projects = [project for project in catalog['projects'] if project['slug'] not in slugs]
    # Campaign kits sit after the existing campaign case studies, before the website demos.
    position = next((i for i, project in enumerate(projects) if project.get('category') == 'websites'), len(projects))
    catalog['projects'] = projects[:position] + records + projects[position:]
    project_path.write_text(json.dumps(catalog, ensure_ascii=False, indent=2) + '\n', encoding='utf-8')
    arabic_path.write_text(json.dumps(arabic, ensure_ascii=False, indent=2) + '\n', encoding='utf-8')
    print(f'Added {len(records)} campaign kits ({sum(len(r["gallery"]) for r in records)} collection items) and their Arabic text.')


if __name__ == '__main__':
    main()
