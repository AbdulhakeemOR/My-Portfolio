// Homepage-only fan: keyboard focus takes priority over pointer hover.
(() => {
  const container = document.querySelector('.home-project-fan');
  if (!container) return;
  let hovered = null;
  const update = () => {
    const items = [...container.querySelectorAll('.home-fan-item')];
    const focused = items.findIndex(item => item.contains(document.activeElement));
    const active = focused >= 0 ? focused : hovered;
    items.forEach((item, index) => {
      item.dataset.active = String(index === active);
    });
  };
  const layout = () => {
    const items = [...container.querySelectorAll('.home-fan-item')];
    const middle = (items.length - 1) / 2;
    const spread = Math.min(126, Math.max(36, (container.clientWidth - 480) / Math.max(1, items.length - 1)));
    container.style.setProperty('--fan-spread', `${spread}px`);
    items.forEach((item, index) => {
      const offset = index - middle;
      item.style.setProperty('--fan-offset', offset);
      item.style.setProperty('--fan-y', `${Math.abs(offset) * 20}px`);
      item.style.setProperty('--fan-rotation', `${offset * 9}deg`);
      item.style.setProperty('--fan-stack', 100 - Math.round(Math.abs(offset) * 10));
      if (item.dataset.fanReady) return;
      item.dataset.fanReady = 'true';
      item.addEventListener('pointerenter', event => {
        if (event.pointerType === 'touch') return;
        hovered = index; update();
      });
      item.addEventListener('pointerleave', () => { hovered = null; update(); });
      const link = item.querySelector('a');
      link.addEventListener('focus', update);
      link.addEventListener('blur', () => queueMicrotask(update));
    });
    container.classList.add('fan-ready');
    update();
  };
  layout();
  new MutationObserver(records => {
    if (records.some(record => record.target === container && record.type === 'childList')) {
      hovered = null; layout();
    }
  }).observe(container, { childList: true });
  if ('ResizeObserver' in window) new ResizeObserver(layout).observe(container);
  else window.addEventListener('resize', layout);
})();
