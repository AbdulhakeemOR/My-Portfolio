// Expanding Cards adaptation, scoped to the full Projects-page catalog.
(() => {
  const list = document.querySelector('#project-list[data-projects-source="all"]');
  if (!list) return;
  const arabic = document.documentElement.lang === 'ar';
  const rtl = document.documentElement.dir === 'rtl';
  const desktop = matchMedia('(min-width: 768px)');
  const hover = matchMedia('(hover: hover)');
  let active = null;
  const visible = () => [...list.querySelectorAll(':scope > .project-card')].filter(card => !card.hidden);
  const select = card => {
    active = card;
    list.querySelectorAll(':scope > .project-card').forEach(item => {
      const selected = item === card;
      item.dataset.active = String(selected);
      const button = item.querySelector('.pe-toggle');
      const content = item.querySelector('.pe-content');
      if (button) button.setAttribute('aria-expanded', String(selected));
      if (content) {
        content.inert = !selected;
        content.setAttribute('aria-hidden', String(!selected));
      }
    });
    const sizes = visible().map(item => item === card ? '5fr' : '1fr').join(' ');
    list.style.gridTemplateColumns = desktop.matches ? sizes : 'minmax(0, 1fr)';
    list.style.gridTemplateRows = desktop.matches ? 'minmax(0, 1fr)' : sizes;
    list.style.setProperty('--pe-mobile-height', `${480 + Math.max(0, visible().length - 1) * 82}px`);
    list.classList.toggle('pe-empty', !card);
  };
  const enhance = () => {
    list.querySelectorAll(':scope > .project-card').forEach(card => {
      if (card.dataset.expandingReady) return;
      card.dataset.expandingReady = 'true';
      const title = card.querySelector('h3')?.textContent || '';
      const image = card.querySelector(':scope > img');
      if (image) image.classList.add('pe-image');
      const content = document.createElement('div');
      content.className = 'pe-content';
      content.id = `${card.id}-content`;
      [...card.childNodes].filter(node => node !== image).forEach(node => content.append(node));
      const button = document.createElement('button');
      button.className = 'pe-toggle';
      button.type = 'button';
      button.setAttribute('aria-controls', content.id);
      button.setAttribute('aria-label', arabic ? `عرض مشروع: ${title}` : `Expand project: ${title}`);
      const label = document.createElement('span');
      label.className = 'pe-collapsed-title';
      label.textContent = title;
      const icon = document.createElement('span');
      icon.className = 'pe-icon';
      icon.setAttribute('aria-hidden', 'true');
      icon.textContent = '↗';
      button.append(label, icon);
      card.append(content, button);
      button.addEventListener('click', () => select(card));
      button.addEventListener('focus', () => select(card));
      card.addEventListener('pointerenter', event => {
        if (hover.matches && event.pointerType !== 'touch') select(card);
      });
      card.addEventListener('focusin', () => { if (active !== card) select(card); });
    });
    list.classList.add('project-expanding');
    const cards = visible();
    select(cards.includes(active) ? active : cards[0] || null);
  };
  list.addEventListener('keydown', event => {
    if (!event.target.closest('.pe-toggle')) return;
    const cards = visible();
    const current = cards.indexOf(active);
    const movement = desktop.matches
      ? { ArrowLeft: rtl ? 1 : -1, ArrowRight: rtl ? -1 : 1 }[event.key]
      : { ArrowUp: -1, ArrowDown: 1 }[event.key];
    let index;
    if (movement) index = (current + movement + cards.length) % cards.length;
    else if (event.key === 'Home') index = 0;
    else if (event.key === 'End') index = cards.length - 1;
    else return;
    event.preventDefault();
    cards[index]?.querySelector('.pe-toggle').focus();
  });
  const revealHash = () => {
    let id;
    try { id = decodeURIComponent(location.hash.slice(1)); } catch { return; }
    const card = id && document.getElementById(id);
    if (card?.parentElement === list && !card.hidden) select(card);
  };
  enhance();
  revealHash();
  new MutationObserver(records => {
    if (records.some(record => record.target === list || record.attributeName === 'hidden')) {
      enhance();
      revealHash();
    }
  }).observe(list, { childList: true, subtree: true, attributes: true, attributeFilter: ['hidden'] });
  document.addEventListener('aor:projects-updated', () => { enhance(); revealHash(); });
  window.addEventListener('hashchange', revealHash);
  desktop.addEventListener('change', () => select(active));
})();
