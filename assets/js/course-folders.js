// Live Server adaptation of the supplied Glass Folder Cards component.
(() => {
  const cards = document.querySelectorAll('.courses .courses-card');
  if (!cards.length) return;
  const arabic = document.documentElement.lang === 'ar';
  const backPath = 'M0 56A22 22 0 0 1 22 34L146 34C170 34 172 0 198 0L318 0A22 22 0 0 1 340 22L340 250A22 22 0 0 1 318 272L22 272A22 22 0 0 1 0 250Z';
  const frontPath = 'M0 22A22 22 0 0 1 22 0L118 0C144 0 146 32 172 32L318 32A22 22 0 0 1 340 54L340 176A22 22 0 0 1 318 198L22 198A22 22 0 0 1 0 176Z';
  const palettes = [
    ['#22395e', '#e9c2b8', '#c2433f', '#e5edf4'],
    ['#173024', '#4f7a5a', '#a7843a', '#fbf3d6'],
    ['#3e2850', '#8f6c9c', '#b3502f', '#fbe7d2'],
    ['#16252c', '#3d5f68', '#ef4a2b', '#ff8a5c'],
    ['#435a70', '#9fb4c7', '#e8edf2', '#ffffff'],
    ['#57432b', '#9b422b', '#eab08a', '#f4efe9'],
  ];

  const element = (tag, className, text) => {
    const node = document.createElement(tag);
    node.className = className;
    if (text) node.textContent = text;
    return node;
  };

  cards.forEach((card, index) => {
    const heading = card.querySelector('h3');
    const list = card.querySelector('.course-list');
    if (!heading || !list) return;
    const courses = [...list.children];
    const label = heading.textContent.trim();
    const carousel = window.AORCourseCarousel?.(list, { label, id: index });
    const root = element('div', 'gf-root');
    root.dataset.entered = '';
    root.dataset.place = 'bottom-left';
    const stage = element('div', 'gf-stage');
    const tilt = element('div', 'gf-tilt');
    const shadow = element('div', 'gf-shadow');
    shadow.setAttribute('aria-hidden', 'true');
    const back = element('div', 'gf-back');
    back.style.clipPath = `path('${backPath}')`;
    back.setAttribute('aria-hidden', 'true');
    const art = element('div', 'gf-art course-folder-art');
    const colors = palettes[index % palettes.length];
    colors.forEach((color, n) => art.style.setProperty(`--art-${n}`, color));
    art.append(element('div', 'gf-back-sheen'));
    back.append(art);
    const files = element('div', 'gf-files');
    files.setAttribute('role', 'list');
    files.setAttribute('aria-label', label);
    const previewLinks = [];
    const previews = courses.slice(0, 3);
    previews.forEach((course, n) => {
      const certificate = course.querySelector('.certificate-links a');
      if (!certificate) return;
      const slot = element('div', 'gf-sheet-slot');
      slot.setAttribute('role', 'listitem');
      const sheet = element('a', 'gf-sheet');
      sheet.href = certificate.href;
      sheet.target = '_blank';
      sheet.rel = 'noopener noreferrer';
      sheet.tabIndex = -1;
      sheet.style.setProperty('--gf-slot', n - (previews.length - 1) / 2);
      sheet.style.setProperty('--gf-depth', previews.length - 1 - n);
      sheet.style.setProperty('--gf-jx', `${(n - 1) * 3}px`);
      sheet.style.setProperty('--gf-jr', `${(n - 1) * 1.2}deg`);
      sheet.style.zIndex = n + 1;
      const name = course.querySelector('h4').textContent;
      const head = element('span', 'gf-sheet-head');
      head.append(element('span', 'gf-sheet-name', name));
      sheet.title = `${name} — ${certificate.textContent.trim()}`;
      const lines = element('span', 'gf-lines');
      lines.setAttribute('aria-hidden', 'true');
      [86, 92, 64, 88, 42].forEach(width => {
        const line = document.createElement('i');
        line.style.width = `${width}%`;
        lines.append(line);
      });
      const stamp = element('span', 'course-folder-stamp', 'AOR');
      stamp.setAttribute('aria-hidden', 'true');
      sheet.append(head, lines, stamp);
      slot.append(sheet);
      files.append(slot);
      previewLinks.push(sheet);
    });
    const front = element('div', 'gf-front');
    front.style.clipPath = `path('${frontPath}')`;
    const button = element('button', 'gf-hit');
    button.type = 'button';
    list.id = `course-folder-list-${index}`;
    heading.id = `course-folder-title-${index}`;
    button.setAttribute('aria-controls', list.id);
    button.setAttribute('aria-labelledby', heading.id);
    button.setAttribute('aria-expanded', 'false');
    const labelBox = element('div', 'gf-label');
    heading.classList.add('gf-title');
    labelBox.append(heading);
    const count = new Intl.NumberFormat(document.documentElement.lang).format(courses.length);
    const countLabel = courses.length === 1
      ? (arabic ? 'دورة أو نشاط واحد' : '1 course or activity')
      : (arabic ? `${count} دورات وأنشطة` : `${count} courses & activities`);
    labelBox.append(element('span', 'gf-meta', countLabel));
    front.append(element('div', 'gf-tint'), element('div', 'gf-spec'), button, labelBox);
    tilt.append(shadow, back, files, front);
    stage.append(tilt);
    root.append(stage);
    const hint = element('p', 'course-folder-hint', arabic ? 'افتح المجلد لاستعراض الشهادات والتفاصيل' : 'Open folder to explore certificates & details');
    const setOpen = open => {
      root.toggleAttribute('data-open', open);
      button.setAttribute('aria-expanded', String(open));
      list.hidden = !open;
      carousel?.setVisible(open);
      files.inert = !open;
      previewLinks.forEach(link => { link.tabIndex = open ? 0 : -1; });
      card.classList.toggle('is-open', open);
      hint.textContent = open
        ? (arabic ? 'اسحب بطاقات الدورات أدناه لاستعراض التفاصيل' : 'Browse the stacked course cards below')
        : (arabic ? 'افتح المجلد لاستعراض الشهادات والتفاصيل' : 'Open folder to explore certificates & details');
    };
    button.addEventListener('click', () => setOpen(!root.hasAttribute('data-open')));
    button.addEventListener('keydown', event => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        if (!event.repeat) setOpen(!root.hasAttribute('data-open'));
      }
    });
    card.addEventListener('keydown', event => {
      if (event.key === 'Escape' && root.hasAttribute('data-open')) {
        setOpen(false);
        button.focus();
      }
    });
    card.prepend(root);
    root.after(hint);
    card.classList.add('course-folder-enhanced');
    setOpen(false);
    const revealLinkedCourse = () => {
      let id;
      try { id = decodeURIComponent(location.hash.slice(1)); } catch { return; }
      const target = id && document.getElementById(id);
      if (target && list.contains(target)) {
        setOpen(true);
        carousel?.goTo(courses.indexOf(target.closest('.course-stack-card')));
        requestAnimationFrame(() => target.scrollIntoView({ block: 'start' }));
      }
    };
    revealLinkedCourse();
    window.addEventListener('hashchange', revealLinkedCourse);
    const resize = () => {
      const width = Math.min(340, card.clientWidth - 16);
      const scale = width / 340;
      root.style.width = `${width}px`;
      root.style.height = `${360 * scale}px`;
      stage.style.transform = `translateY(${88 * scale}px) scale(${scale})`;
    };
    resize();
    if ('ResizeObserver' in window) new ResizeObserver(resize).observe(card);
    else window.addEventListener('resize', resize);
  });
  const updateTone = () => {
    cards.forEach(card => {
      const folder = card.querySelector('.gf-root');
      if (folder) folder.dataset.tone = document.documentElement.dataset.theme === 'dark' ? 'dark' : 'light';
    });
  };
  updateTone();
  new MutationObserver(updateTone).observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });
})();
