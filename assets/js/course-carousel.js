// Stacked carousel adapted from carousel-07 for the static Live Server site.
window.AORCourseCarousel = (list, { label, id }) => {
  const slides = [...list.children];
  const total = slides.length;
  const rtl = document.documentElement.dir === 'rtl';
  const arabic = document.documentElement.lang === 'ar';
  const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');
  const region = document.createElement('div');
  region.className = 'course-carousel';
  region.setAttribute('role', 'region');
  region.setAttribute('aria-roledescription', arabic ? 'عارض شرائح' : 'carousel');
  region.setAttribute('aria-label', label);
  list.before(region);
  region.append(list);
  list.classList.add('course-stack');
  list.tabIndex = 0;
  list.setAttribute('aria-label', arabic ? 'استخدم الأسهم للتنقل بين الدورات' : 'Use arrow keys to browse courses');
  const controls = document.createElement('div');
  controls.className = 'course-carousel-controls';
  const previous = document.createElement('button');
  const next = document.createElement('button');
  previous.type = next.type = 'button';
  previous.textContent = rtl ? '→' : '←';
  next.textContent = rtl ? '←' : '→';
  previous.setAttribute('aria-label', arabic ? 'الدورة السابقة' : 'Previous course');
  next.setAttribute('aria-label', arabic ? 'الدورة التالية' : 'Next course');
  previous.disabled = next.disabled = total < 2;
  const status = document.createElement('span');
  status.className = 'course-carousel-status';
  status.setAttribute('role', 'status');
  status.setAttribute('aria-live', 'polite');
  controls.append(previous, status, next);
  const hint = document.createElement('p');
  hint.className = 'course-carousel-hint';
  hint.textContent = arabic ? 'اسحب البطاقات أو استخدم الأسهم لاستعراض الدورات' : 'Drag the cards or use the arrows to explore courses';
  region.append(controls, hint);
  let progress = 0;
  let target = 0;
  let frame = 0;
  let drag = null;
  let suppressClickUntil = 0;
  const wrap = number => ((number % total) + total) % total;
  slides.forEach((slide, index) => {
    slide.classList.add('course-stack-card');
    slide.setAttribute('aria-roledescription', arabic ? 'شريحة' : 'slide');
    slide.setAttribute('aria-label', `${index + 1} / ${total}`);
    const title = slide.querySelector('h4');
    title.id ||= `course-slide-title-${id}-${index}`;
    slide.setAttribute('aria-labelledby', title.id);
    const certificate = slide.querySelector('.certificate-links a');
    if (certificate) {
      const path = new URL(certificate.href).pathname;
      const stem = decodeURIComponent(path.split('/').pop()).replace(/\.[^.]+$/, '');
      const image = document.createElement('img');
      image.className = 'course-stack-image';
      image.src = new URL(`../images/course-previews/${stem}.webp`, document.querySelector('script[src*="course-carousel.js"]').src).href;
      image.alt = '';
      image.loading = 'lazy';
      image.decoding = 'async';
      image.draggable = false;
      // The readable title and original certificate link are always available.
      image.addEventListener('error', () => image.remove());
      slide.prepend(image);
    }
  });
  const draw = () => {
    const selected = wrap(Math.round(progress));
    const spread = Math.min(70, list.clientWidth * .2);
    slides.forEach((slide, index) => {
      let offset = (index - progress) % total;
      if (offset > total / 2) offset -= total;
      if (offset < -total / 2) offset += total;
      const depth = Math.abs(offset);
      const active = selected === index;
      slide.style.transform = `translateX(calc(-50% + ${offset * spread * (rtl ? -1 : 1)}px)) translateY(${depth * 20}px) rotate(${offset * 7 * (rtl ? -1 : 1)}deg) scale(${Math.max(.65, 1 - depth * .085)})`;
      slide.style.zIndex = Math.round(100 - depth * 10);
      slide.style.opacity = depth > 2.1 ? '0' : String(Math.max(.3, 1 - depth * .2));
      slide.classList.toggle('is-active', active);
      slide.inert = !active;
      slide.setAttribute('aria-hidden', String(!active));
    });
    const number = new Intl.NumberFormat(document.documentElement.lang);
    const text = arabic ? `${number.format(selected + 1)} من ${number.format(total)}` : `${selected + 1} of ${total}`;
    if (status.textContent !== text) status.textContent = text;
  };
  const animate = () => {
    frame = 0;
    progress += (target - progress) * (reducedMotion.matches ? 1 : .2);
    if (Math.abs(target - progress) < .002) progress = target;
    draw();
    if (progress !== target) frame = requestAnimationFrame(animate);
  };
  const goTo = index => {
    target = index;
    if (!frame) frame = requestAnimationFrame(animate);
  };
  previous.addEventListener('click', () => goTo(Math.round(target) - 1));
  next.addEventListener('click', () => goTo(Math.round(target) + 1));
  region.addEventListener('keydown', event => {
    if (event.target.closest('summary,details,a,input,textarea,select')) return;
    const movement = { ArrowLeft: rtl ? 1 : -1, ArrowRight: rtl ? -1 : 1 }[event.key];
    if (movement) { event.preventDefault(); goTo(Math.round(target) + movement); }
    else if (event.key === 'Home' || event.key === 'End') {
      event.preventDefault(); goTo(event.key === 'Home' ? 0 : total - 1);
    }
  });
  list.addEventListener('pointerdown', event => {
    if (total < 2 || !event.isPrimary || event.button !== 0 || event.target.closest('a,button,summary,input,textarea,select')) return;
    cancelAnimationFrame(frame); frame = 0;
    drag = { id: event.pointerId, x: event.clientX, y: event.clientY, start: progress, moved: false };
  });
  list.addEventListener('pointermove', event => {
    if (!drag || event.pointerId !== drag.id) return;
    const dx = event.clientX - drag.x;
    const dy = event.clientY - drag.y;
    if (!drag.moved && Math.abs(dy) > Math.abs(dx) && Math.abs(dy) > 8) { drag = null; return; }
    if (!drag.moved && Math.abs(dx) > 8) { drag.moved = true; list.setPointerCapture(event.pointerId); }
    if (!drag.moved) return;
    progress = drag.start - dx / Math.max(90, list.clientWidth * .4) * (rtl ? -1 : 1);
    target = progress;
    draw();
  });
  const finishDrag = event => {
    if (!drag || drag.id !== event.pointerId) return;
    const moved = drag.moved;
    const start = drag.start;
    drag = null;
    if (list.hasPointerCapture(event.pointerId)) list.releasePointerCapture(event.pointerId);
    if (moved) suppressClickUntil = Date.now() + 300;
    goTo(Math.round(Math.max(start - 3, Math.min(start + 3, progress))));
  };
  list.addEventListener('pointerup', finishDrag);
  list.addEventListener('pointercancel', finishDrag);
  list.addEventListener('lostpointercapture', finishDrag);
  list.addEventListener('click', event => {
    if (Date.now() < suppressClickUntil) { event.preventDefault(); event.stopPropagation(); }
  }, true);
  if ('ResizeObserver' in window) new ResizeObserver(draw).observe(list);
  draw();
  return {
    goTo,
    setVisible(open) {
      region.hidden = !open;
      list.hidden = !open;
      if (open) requestAnimationFrame(draw);
    },
  };
};
