// Interactive process presentation, compatible with the static Live Server site.
(() => {
  const list = document.querySelector('.process-list');
  if (!list) return;
  const section = list.closest('.process');
  const steps = [...list.children];
  const arabic = document.documentElement.lang === 'ar';
  const rtl = document.documentElement.dir === 'rtl';
  const mobile = matchMedia('(max-width: 640px)');
  const panels = document.createElement('div');
  panels.className = 'process-panels';
  const tabs = [];
  let selected = 0;
  const number = value => new Intl.NumberFormat(document.documentElement.lang).format(value);
  list.setAttribute('role', 'tablist');
  list.setAttribute('aria-labelledby', 'process-title');
  steps.forEach((step, index) => {
    const heading = step.querySelector('h3');
    const panel = document.createElement('div');
    panel.className = 'process-panel';
    panel.id = `process-panel-${index}`;
    panel.setAttribute('role', 'tabpanel');
    panel.setAttribute('aria-labelledby', `process-tab-${index}`);
    panel.tabIndex = 0;
    const button = document.createElement('button');
    button.type = 'button';
    button.id = `process-tab-${index}`;
    button.setAttribute('role', 'tab');
    button.setAttribute('aria-controls', panel.id);
    const circle = document.createElement('span');
    circle.className = 'process-step-number';
    circle.setAttribute('aria-hidden', 'true');
    circle.textContent = number(index + 1);
    const title = document.createElement('span');
    title.textContent = heading.textContent;
    button.append(circle, title);
    [...step.childNodes].forEach(node => panel.append(node));
    step.setAttribute('role', 'presentation');
    step.append(button);
    panels.append(panel);
    tabs.push(button);
    button.addEventListener('click', () => select(index));
  });
  const navigation = document.createElement('div');
  navigation.className = 'process-navigation';
  const previous = document.createElement('button');
  previous.type = 'button';
  previous.textContent = arabic ? 'الخطوة السابقة' : 'Previous step';
  const next = document.createElement('button');
  next.type = 'button';
  next.textContent = arabic ? 'الخطوة التالية' : 'Next step';
  const status = document.createElement('span');
  status.className = 'process-step-status';
  status.setAttribute('role', 'status');
  status.setAttribute('aria-live', 'polite');
  navigation.append(previous, status, next);
  list.after(panels);
  panels.after(navigation);
  function select(index, focus = false) {
    selected = Math.max(0, Math.min(steps.length - 1, index));
    tabs.forEach((tab, i) => {
      const active = i === selected;
      tab.setAttribute('aria-selected', String(active));
      tab.tabIndex = active ? 0 : -1;
      panels.children[i].hidden = !active;
    });
    list.style.setProperty('--process-progress', `${selected / Math.max(1, steps.length - 1) * 100}%`);
    previous.disabled = selected === 0;
    next.disabled = selected === steps.length - 1;
    status.textContent = `${number(selected + 1)} / ${number(steps.length)}`;
    if (focus) tabs[selected].focus();
  }
  previous.addEventListener('click', () => select(selected - 1));
  next.addEventListener('click', () => select(selected + 1));
  list.addEventListener('keydown', event => {
    const movement = { ArrowRight: rtl ? -1 : 1, ArrowLeft: rtl ? 1 : -1, ArrowDown: 1, ArrowUp: -1 }[event.key];
    if (movement) { event.preventDefault(); select((selected + movement + steps.length) % steps.length, true); }
    else if (event.key === 'Home' || event.key === 'End') {
      event.preventDefault(); select(event.key === 'Home' ? 0 : steps.length - 1, true);
    }
  });
  const orientation = () => list.setAttribute('aria-orientation', mobile.matches ? 'vertical' : 'horizontal');
  orientation();
  mobile.addEventListener('change', orientation);
  section.classList.add('process-stepper');
  select(0);
})();
