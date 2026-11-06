/* Shared date picker. Native date inputs remain the fallback without JavaScript. */
(() => {
  if (!window.HTMLDialogElement || !HTMLDialogElement.prototype.showModal) return;
  const arabic = document.documentElement.lang.startsWith('ar');
  const locale = arabic ? 'ar' : 'en-GB';
  const words = arabic ? {
    choose: 'اختر تاريخًا', calendar: 'اختيار التاريخ', previous: 'الشهر السابق', next: 'الشهر التالي',
    month: 'الشهر', year: 'السنة', today: 'اليوم', clear: 'مسح', close: 'إغلاق', help: 'استخدم مفاتيح الأسهم للتنقل بين الأيام، وEnter للاختيار، وEscape للإغلاق.'
  } : {
    choose: 'Choose a date', calendar: 'Choose date', previous: 'Previous month', next: 'Next month',
    month: 'Month', year: 'Year', today: 'Today', clear: 'Clear date', close: 'Close calendar', help: 'Use arrow keys to move between days, Enter to select, and Escape to close.'
  };
  const date = (year, month, day) => {
    const value = new Date(0);
    value.setFullYear(year, month, day);
    value.setHours(12, 0, 0, 0);
    return value;
  };
  const key = (value) => `${String(value.getFullYear()).padStart(4, '0')}-${String(value.getMonth() + 1).padStart(2, '0')}-${String(value.getDate()).padStart(2, '0')}`;
  const parse = (value) => {
    if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return null;
    const [year, month, day] = value.split('-').map(Number);
    const result = date(year, month - 1, day);
    return key(result) === value ? result : null;
  };
  let count = 0;
  document.querySelectorAll('input[type="date"]:not([data-native-date])').forEach((input) => {
    if (input.dataset.dateEnhanced || input.disabled || input.readOnly || input.step && input.step !== '1' && input.step !== 'any') return;
    input.dataset.dateEnhanced = 'true';
    const id = `aor-calendar-${++count}`;
    const label = input.labels?.[0];
    const trigger = document.createElement('button');
    trigger.type = 'button';
    trigger.id = `${id}-trigger`;
    trigger.className = 'aor-date-trigger';
    trigger.setAttribute('aria-haspopup', 'dialog');
    trigger.setAttribute('aria-controls', id);
    trigger.setAttribute('aria-expanded', 'false');
    if (input.getAttribute('aria-describedby')) trigger.setAttribute('aria-describedby', input.getAttribute('aria-describedby'));
    input.insertAdjacentElement('afterend', trigger);
    // Keep the real date input in the form, including its name and ISO date value.
    input.hidden = true;
    if (label) label.htmlFor = trigger.id;
    const dialog = document.createElement('dialog');
    dialog.id = id;
    dialog.className = 'aor-calendar';
    dialog.setAttribute('aria-labelledby', `${id}-heading`);
    dialog.setAttribute('aria-describedby', `${id}-help`);
    const button = (text, className, action) => {
      const element = document.createElement('button');
      element.type = 'button'; element.className = className; element.textContent = text;
      element.addEventListener('click', action);
      return element;
    };
    const title = document.createElement('h2');
    title.id = `${id}-heading`; title.className = 'aor-calendar-title';
    title.textContent = label?.textContent || words.calendar;
    const close = button('×', 'aor-calendar-icon', () => dialog.close());
    close.setAttribute('aria-label', words.close);
    const heading = document.createElement('div'); heading.className = 'aor-calendar-heading'; heading.append(title, close);
    const nav = document.createElement('div'); nav.className = 'aor-calendar-nav';
    let view = parse(input.value) || new Date();
    let focused = view;
    const month = document.createElement('select'); month.setAttribute('aria-label', words.month);
    for (let index = 0; index < 12; index++) {
      const option = document.createElement('option'); option.value = index;
      option.textContent = new Intl.DateTimeFormat(locale, { month: 'long', calendar: 'gregory' }).format(date(2024, index, 1));
      month.append(option);
    }
    const year = document.createElement('input'); year.type = 'number'; year.min = '1'; year.max = '9999'; year.setAttribute('aria-label', words.year);
    const shift = (amount) => { view = date(view.getFullYear(), view.getMonth() + amount, 1); render(); };
    const previous = button(arabic ? '›' : '‹', 'aor-calendar-icon', () => shift(-1)); previous.setAttribute('aria-label', words.previous);
    const next = button(arabic ? '‹' : '›', 'aor-calendar-icon', () => shift(1)); next.setAttribute('aria-label', words.next);
    nav.append(previous, month, year, next);
    const weekdays = document.createElement('div'); weekdays.className = 'aor-calendar-weekdays'; weekdays.setAttribute('aria-hidden', 'true');
    for (let day = 0; day < 7; day++) {
      const name = document.createElement('span');
      name.textContent = new Intl.DateTimeFormat(locale, { weekday: 'short' }).format(date(2024, 0, 7 + day));
      weekdays.append(name);
    }
    const grid = document.createElement('div'); grid.className = 'aor-calendar-grid'; grid.setAttribute('role', 'grid');
    const announcement = document.createElement('p'); announcement.className = 'aor-calendar-sr'; announcement.setAttribute('aria-live', 'polite');
    const help = document.createElement('p'); help.id = `${id}-help`; help.className = 'aor-calendar-sr'; help.textContent = words.help;
    const valid = (value) => {
      const iso = key(value);
      return value.getFullYear() >= 1 && value.getFullYear() <= 9999 && (!input.min || iso >= input.min) && (!input.max || iso <= input.max);
    };
    const updateTrigger = () => {
      const value = parse(input.value);
      trigger.textContent = value ? new Intl.DateTimeFormat(locale, { day: 'numeric', month: 'long', year: 'numeric', calendar: 'gregory' }).format(value) : words.choose;
      trigger.dataset.empty = String(!value);
      trigger.setAttribute('aria-label', `${label?.textContent || words.calendar}: ${trigger.textContent}`);
    };
    const choose = (value) => {
      input.value = value ? key(value) : '';
      input.dispatchEvent(new Event('input', { bubbles: true }));
      input.dispatchEvent(new Event('change', { bubbles: true }));
      updateTrigger(); dialog.close();
    };
    const footer = document.createElement('div'); footer.className = 'aor-calendar-footer';
    const clear = button(words.clear, 'aor-calendar-text', () => choose(null)); clear.disabled = input.required;
    const today = button(words.today, 'aor-calendar-today', () => choose(new Date()));
    footer.append(clear, today);
    const render = () => {
      month.value = view.getMonth(); year.value = view.getFullYear();
      const text = new Intl.DateTimeFormat(locale, { month: 'long', year: 'numeric', calendar: 'gregory' }).format(view);
      grid.setAttribute('aria-label', text); announcement.textContent = text;
      grid.replaceChildren();
      const start = date(view.getFullYear(), view.getMonth(), 1);
      start.setDate(1 - start.getDay());
      const cells = [];
      for (let offset = 0; offset < 42; offset++) {
        const value = date(start.getFullYear(), start.getMonth(), start.getDate() + offset);
        const cell = button(new Intl.NumberFormat(locale).format(value.getDate()), 'aor-calendar-day', () => choose(value));
        cell.dataset.date = key(value);
        cell.dataset.outside = String(value.getMonth() !== view.getMonth());
        cell.setAttribute('aria-label', new Intl.DateTimeFormat(locale, { dateStyle: 'full', calendar: 'gregory' }).format(value));
        cell.disabled = !valid(value);
        cell.setAttribute('aria-pressed', String(key(value) === input.value));
        if (key(value) === key(new Date())) cell.setAttribute('aria-current', 'date');
        cell.tabIndex = -1;
        const wrapper = document.createElement('div'); wrapper.setAttribute('role', 'gridcell'); wrapper.append(cell);
        cells.push({ cell, wrapper });
      }
      for (let row = 0; row < 6; row++) {
        const element = document.createElement('div'); element.className = 'aor-calendar-row'; element.setAttribute('role', 'row');
        cells.slice(row * 7, row * 7 + 7).forEach(({ wrapper }) => element.append(wrapper));
        grid.append(element);
      }
      const target = cells.find(({ cell }) => cell.dataset.date === key(focused) && !cell.disabled)
        || cells.find(({ cell }) => cell.dataset.outside === 'false' && !cell.disabled);
      if (target) target.cell.tabIndex = 0;
      today.disabled = !valid(new Date());
      previous.disabled = !valid(date(view.getFullYear(), view.getMonth(), 0)) && !!input.min || view.getFullYear() <= 1 && view.getMonth() === 0;
      next.disabled = !valid(date(view.getFullYear(), view.getMonth() + 1, 1)) && !!input.max || view.getFullYear() >= 9999 && view.getMonth() === 11;
    };
    month.addEventListener('change', () => { view = date(view.getFullYear(), Number(month.value), 1); render(); });
    year.addEventListener('change', () => { const value = Number(year.value); if (Number.isInteger(value) && value >= 1 && value <= 9999) view = date(value, view.getMonth(), 1); render(); });
    grid.addEventListener('keydown', (event) => {
      const current = parse(event.target.dataset.date || '');
      if (!current) return;
      const moves = { ArrowLeft: arabic ? 1 : -1, ArrowRight: arabic ? -1 : 1, ArrowUp: -7, ArrowDown: 7, Home: -current.getDay(), End: 6 - current.getDay() };
      let target;
      if (Object.hasOwn(moves, event.key)) target = date(current.getFullYear(), current.getMonth(), current.getDate() + moves[event.key]);
      if (event.key === 'PageUp' || event.key === 'PageDown') {
        const change = event.key === 'PageUp' ? -1 : 1;
        target = date(current.getFullYear(), current.getMonth() + change, 1);
        target.setDate(Math.min(current.getDate(), date(target.getFullYear(), target.getMonth() + 1, 0).getDate()));
      }
      if (!target) return;
      event.preventDefault();
      if (!valid(target)) return;
      focused = target; view = target; render();
      grid.querySelector('[tabindex="0"]')?.focus();
    });
    dialog.append(heading, nav, weekdays, grid, footer, announcement, help);
    document.body.append(dialog);
    trigger.addEventListener('click', () => {
      view = parse(input.value) || new Date();
      if (input.min && key(view) < input.min) view = parse(input.min) || view;
      if (input.max && key(view) > input.max) view = parse(input.max) || view;
      focused = view; render();
      dialog.showModal(); trigger.setAttribute('aria-expanded', 'true');
      grid.querySelector('[tabindex="0"]')?.focus();
    });
    dialog.addEventListener('close', () => { trigger.setAttribute('aria-expanded', 'false'); trigger.focus(); });
    dialog.addEventListener('click', (event) => { if (event.target === dialog) { const box = dialog.getBoundingClientRect(); if (event.clientX < box.left || event.clientX > box.right || event.clientY < box.top || event.clientY > box.bottom) dialog.close(); } });
    input.addEventListener('change', updateTrigger);
    input.addEventListener('invalid', (event) => { event.preventDefault(); trigger.setAttribute('aria-invalid', 'true'); trigger.focus(); });
    input.addEventListener('input', () => trigger.removeAttribute('aria-invalid'));
    input.form?.addEventListener('reset', () => setTimeout(updateTrigger, 0));
    updateTrigger();
  });
})();
