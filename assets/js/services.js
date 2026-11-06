/* Progressive enhancement: static services and quote links work without JS. */
(() => {
  const page = document.querySelector('.services-page');
  if (!page) return;
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  const hero = page.querySelector('.services-hero');
  const logo = page.querySelector('.services-logo-stage');
  const tilt = page.querySelector('.services-logo-tilt');
  const sequence = page.querySelector('.services-sequence');
  const panels = [...page.querySelectorAll('.sequence-panel')];
  page.querySelectorAll('[data-animate-words]').forEach(element => {
    element.textContent.trim().split(/\s+/).forEach((word, index) => {
      if (index === 0) element.replaceChildren();
      const span = document.createElement('span'); span.className = 'services-word';
      span.style.setProperty('--word-index', index); span.textContent = word;
      element.append(span, document.createTextNode(' '));
    });
  });
  logo?.addEventListener('pointermove', event => {
    if (reduced.matches || event.pointerType === 'touch') return;
    const box = logo.getBoundingClientRect();
    tilt.style.setProperty('--logo-x', `${-((event.clientY-box.top)/box.height-.5)*18}deg`);
    tilt.style.setProperty('--logo-y', `${((event.clientX-box.left)/box.width-.5)*24}deg`);
  });
  logo?.addEventListener('pointerleave', () => { tilt.style.setProperty('--logo-x','0deg'); tilt.style.setProperty('--logo-y','0deg'); });
  let pending = false;
  function update() {
    pending = false;
    const pinned = !reduced.matches && innerHeight >= 600;
    sequence.classList.toggle('is-pinned', pinned);
    const top = parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--header-height')) || 100;
    const box = sequence.getBoundingClientRect();
    const progress = Math.max(0,Math.min(1,(top-box.top)/Math.max(1,box.height-(innerHeight-top))));
    sequence.style.setProperty('--sequence-progress',progress);
    const active = Math.min(panels.length-1,Math.floor(progress*panels.length));
    panels.forEach((panel,index) => {
      panel.classList.toggle('is-active',index === active);
      if (pinned) panel.setAttribute('aria-hidden',String(index !== active));
      else panel.removeAttribute('aria-hidden');
    });
    if (logo) logo.style.transform = reduced.matches ? '' : `translateY(${Math.max(-20,Math.min(50,-hero.getBoundingClientRect().top*.08))}px)`;
  }
  const queue = () => { if (!pending) { pending=true; requestAnimationFrame(update); } };
  addEventListener('scroll',queue,{passive:true}); addEventListener('resize',queue);
  reduced.addEventListener('change',queue); update();
})();
