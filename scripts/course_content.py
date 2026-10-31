"""Render certificate-backed About content from the bilingual training record."""

from html import escape
from pathlib import Path
import json

ROOT = Path(__file__).resolve().parent.parent
ISSUERS = {
    'hrdf': {'en': 'Human Resources Development Fund (HRDF / Hadaf)', 'ar': 'صندوق تنمية الموارد البشرية (هدف)'},
    'niepd': {'en': 'National Institute for Educational Professional Development', 'ar': 'المعهد الوطني للتطوير المهني التعليمي'},
}
LABELS = {
    'attendance': {'en': 'Certificate of attendance', 'ar': 'شهادة حضور'},
    'completion': {'en': 'Certificate of completion', 'ar': 'شهادة إتمام'},
    'professional-development': {'en': 'Accredited professional-development hours', 'ar': 'ساعات تطوير مهني معتمدة'},
    'appreciation': {'en': 'Certificate of appreciation', 'ar': 'شهادة شكر وتقدير'},
    'participation': {'en': 'Certificate of participation', 'ar': 'شهادة مشاركة'},
    'award': {'en': 'Competition award', 'ar': 'تكريم في مسابقة'},
    'remote': {'en': 'Remote workshop', 'ar': 'ورشة عن بُعد'},
    'kau': {'en': 'Held at King Abdulaziz University', 'ar': 'أقيمت بجامعة الملك عبد العزيز'},
    'self-paced': {'en': 'Self-paced training', 'ar': 'تدريب غير متزامن'},
}


def load():
    return json.loads((ROOT / 'content/courses.json').read_text(encoding='utf-8'))


def translation_pairs():
    pairs = {}

    def visit(value):
        if isinstance(value, dict):
            if 'en' in value and 'ar' in value:
                pairs[value['en']] = value['ar']
            else:
                for child in value.values():
                    visit(child)
        elif isinstance(value, list):
            for child in value:
                visit(child)

    visit(load())
    visit(ISSUERS)
    visit(LABELS)
    for hours in (1, 2, 3, 4, 5, 6, 12, 55):
        pairs[f'{hours} training hour' + ('' if hours == 1 else 's')] = f'{hours} ساعة تدريبية'
    return pairs


def previews(item):
    sources = item.get('sources') or [{'file': item['source'], 'directory': item.get('source_directory', 'admin/Certificates')}]
    for index, source in enumerate(sources, 1):
        extension = Path(source['file']).suffix.lower()
        suffix = f'-{index}' if len(sources) > 1 else ''
        filename = source.get('public_file') or f'{item["slug"]}{suffix}{extension}'
        assert Path(filename).name == filename
        yield source, f'assets/certificates/{filename}'


def render():
    data = load()
    lines = [
        '<section class="courses" id="courses" aria-labelledby="courses-title">',
        '  <h2 id="courses-title">Courses &amp; Training</h2>',
        '  <p>Selected training, with issuers, dates, and certificate previews. Attendance, completion, and recognition are identified separately.</p>',
        '  <p class="certificate-note">Certificate previews open in a new tab. Issuer verification is linked where available. Personal ID numbers are removed from public copies.</p>',
        '  <div class="course-groups">',
    ]
    for group in data['groups']:
        lines += ['    <article class="courses-card">', f'      <h3>{escape(group["title"]["en"])}</h3>', '      <ul class="course-list">']
        for item in group['items']:
            issuer = ISSUERS[item['issuer']] if isinstance(item['issuer'], str) else item['issuer']
            date = escape(item['date']['en'])
            if item.get('start') and not item.get('end'):
                date = f'<time datetime="{item["start"]}">{date}</time>'
            elif item.get('start') and item.get('end'):
                # Keep the exact range as readable text, with machine-readable endpoints.
                date = f'<span data-start="{item["start"]}" data-end="{item["end"]}">{date}</span>'
            lines += [f'        <li id="training-{item["slug"]}">', f'          <h4>{escape(item["title"]["en"])}</h4>', f'          <p class="course-issuer">{escape(issuer["en"])}</p>', f'          <p class="course-date">{date}</p>', '          <p class="course-facts">', f'            <span>{escape(LABELS[item["type"]]["en"])}</span>']
            if item.get('hours'):
                hours = item['hours']
                lines.append(f'            <span>{hours} training hour{"" if hours == 1 else "s"}</span>')
            if item.get('delivery'):
                lines.append(f'            <span>{escape(LABELS[item["delivery"]]["en"])}</span>')
            lines.append('          </p>')
            if item.get('note'):
                lines.append(f'          <p>{escape(item["note"]["en"])}</p>')
            if item.get('modules'):
                lines += ['          <details class="training-modules">', '            <summary>View 11 modules and training dates</summary>', '            <p>Each module: 5 training hours. All are part of the same 55-hour programme.</p>', '            <ul>']
                for module in item['modules']:
                    lines.append(f'              <li><span>{escape(module["title"]["en"])}</span> <time datetime="{module["date"]}">{module["date"]}</time></li>')
                lines += ['            </ul>', '          </details>']
            lines.append('          <div class="certificate-links">')
            for source, url in previews(item):
                kind = 'PDF' if url.endswith('.pdf') else 'image'
                label = source.get('label', {}).get('en') or f'Preview certificate ({kind})'
                lines.append(f'            <a href="{url}" target="_blank" rel="noopener noreferrer">{escape(label)}</a>')
            if item.get('verification_url'):
                # The original documents behind these links include personal IDs.
                lines.append('            <span class="certificate-note">Issuer verification available on request</span>')
            lines += ['          </div>', '        </li>']
        lines += ['      </ul>', '    </article>']
    lines += ['  </div>', '  <details class="additional-training">', '    <summary>Additional training previously listed</summary>', '    <p>Certificates and dates are not available for the following entries.</p>', '    <ul>']
    lines += [f'      <li>{escape(item["en"])}</li>' for item in data['additional_training']]
    lines += ['    </ul>', '  </details>', '</section>']
    return '\n'.join(lines)
