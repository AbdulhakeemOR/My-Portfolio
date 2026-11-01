// Explicit language URLs always win; remember choices only on this device.
(() => {
  const language = document.documentElement.lang;
  const page = location.pathname.split('/').pop() || 'index.html';
  const localized = /\/(en|ar)\/[^/]*$/.test(location.pathname);
  if (!localized && location.protocol !== 'file:') {
    try {
      if (localStorage.getItem('aor-language') === 'ar') {
        location.replace(`ar/${page}${location.search}${location.hash}`);
        return;
      }
    } catch { /* Language links still work when storage is unavailable. */ }
  }
  document.querySelectorAll('[data-language]').forEach(link => {
    const target = new URL(link.getAttribute('href'), location.href);
    target.search = location.search;
    target.hash = location.hash;
    link.href = target.href;
    if (link.dataset.language === language) link.setAttribute('aria-current', 'true');
    link.addEventListener('click', () => {
      try { localStorage.setItem('aor-language', link.dataset.language); } catch { /* Optional. */ }
    });
  });
  if (language !== 'ar') return;
  const messages = window.AOR_AR || {};
  const translationKey = text => text.trim().replace(/[\u2018\u2019]/g, "'").replace(/[\u201c\u201d]/g, '"').replace(/\u00a0/g, ' ');
  const normalizedMessages = Object.fromEntries(Object.entries(messages).map(([key, value]) => [translationKey(key), value]));
  const patterns = [
    [/^Carousel (\d+)$/, 'منشور متعدد الشرائح $1'],
    [/^Learning Carousel (\d+)$/, 'منشور تعليمي متعدد الشرائح $1'],
    [/^Graphic (\d+)$/, 'تصميم $1'],
    [/^Static Ad (\d+)$/, 'إعلان ثابت $1'],
    [/^Video Ad (\d+)$/, 'إعلان فيديو $1'],
    [/^Story Frame (\d+)$/, 'شريحة قصة $1'],
    [/^Explore collection \((\d+) items\)$/, 'استعرض المجموعة ($1 عنصرًا)'],
    [/^View collection \((\d+) items\)$/, 'عرض المجموعة ($1 عنصرًا)'],
    [/^(\d+) items$/, '$1 عنصرًا'],
    [/^(\d+) min read$/, 'مدة القراءة: $1 دقائق'],
    [/^(\d+) items? shown\.$/, 'عدد العناصر المعروضة: $1'],
    [/^(\d+) \/ (\d+) characters$/, '$1 / $2 حرف'],
    [/^Switch to (light|dark) theme$/, 'تبديل مظهر الموقع'],
    [/^(?:Dark|Light) theme enabled\.$/, 'تم تغيير مظهر الموقع.'],
  ];
  function translate(text) {
    const key = text.trim();
    let result = messages[key] || normalizedMessages[translationKey(key)];
    if (!result) {
      for (const [pattern, replacement] of patterns) {
        if (pattern.test(key)) { result = key.replace(pattern, replacement); break; }
      }
    }
    return result ? text.replace(key, result) : text;
  }
  function localize(node) {
    if (node.nodeType === Node.TEXT_NODE) {
      if (node.parentElement?.closest('script, style, [data-language], textarea, [contenteditable]')) return;
      const text = translate(node.data);
      if (text !== node.data) node.data = text;
    } else if (node.nodeType === Node.ELEMENT_NODE) {
      if (node.matches('script, style, [data-language], textarea, [contenteditable]')) return;
      for (const name of ['aria-label', 'alt', 'title', 'placeholder']) {
        if (!node.hasAttribute(name)) continue;
        const before = node.getAttribute(name), after = translate(before);
        if (before !== after) node.setAttribute(name, after);
      }
      [...node.childNodes].forEach(localize);
    }
  }
  localize(document.documentElement);
  new MutationObserver(records => {
    for (const record of records) {
      if (record.type === 'childList') record.addedNodes.forEach(localize);
      else localize(record.target);
    }
  }).observe(document.documentElement, {subtree: true, childList: true, characterData: true, attributes: true, attributeFilter: ['aria-label', 'alt', 'title', 'placeholder']});
})();
