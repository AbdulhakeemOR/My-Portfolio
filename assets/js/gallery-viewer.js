// Native, keyboard-accessible viewer for project gallery images.
(() => {
  const links = [...document.querySelectorAll('.collection-grid figure > a')].filter(link => link.querySelector('img'));
  if (!links.length || typeof HTMLDialogElement === 'undefined') return;
  const arabic = document.documentElement.lang === 'ar';
  const rtl = document.documentElement.dir === 'rtl';
  const dialog = document.createElement('dialog');
  dialog.className = 'gallery-lightbox';
  dialog.setAttribute('aria-label', arabic ? 'معرض الصور' : 'Image gallery');
  const header = document.createElement('div');
  header.className = 'gallery-lightbox-header';
  const makeButton = (text, label) => {
    const button = document.createElement('button');
    button.type = 'button'; button.textContent = text;
    button.setAttribute('aria-label', label);
    return button;
  };
  const close = makeButton(arabic ? 'إغلاق ×' : 'Close ×', arabic ? 'إغلاق المعرض' : 'Close gallery');
  header.append(close);
  const image = document.createElement('img');
  image.decoding = 'async';
  image.alt = ''; // replaced with the picture's description when one is opened
  const footer = document.createElement('div');
  footer.className = 'gallery-lightbox-footer';
  const previous = makeButton(rtl ? '→' : '←', arabic ? 'الصورة السابقة' : 'Previous image');
  const next = makeButton(rtl ? '←' : '→', arabic ? 'الصورة التالية' : 'Next image');
  const caption = document.createElement('p');
  caption.className = 'gallery-lightbox-caption';
  caption.setAttribute('aria-live', 'polite');
  caption.id = 'gallery-lightbox-caption';
  image.setAttribute('aria-describedby', caption.id);
  footer.append(previous, caption, next);
  dialog.append(header, image, footer);
  document.body.append(dialog);
  let selected = 0;
  const show = index => {
    selected = (index + links.length) % links.length;
    const link = links[selected];
    const text = link.closest('figure').querySelector('figcaption')?.textContent || link.querySelector('img').alt;
    image.src = link.href;
    image.alt = link.querySelector('img').alt || text;
    caption.textContent = text;
    const counter = document.createElement('span');
    counter.className = 'gallery-lightbox-counter';
    counter.textContent = new Intl.NumberFormat(document.documentElement.lang).format(selected + 1) + ' / ' + new Intl.NumberFormat(document.documentElement.lang).format(links.length);
    caption.append(counter);
    previous.disabled = next.disabled = links.length < 2;
  };
  links.forEach((link, index) => link.addEventListener('click', event => {
    if (event.ctrlKey || event.metaKey || event.shiftKey || event.altKey || event.button !== 0) return;
    event.preventDefault(); show(index); dialog.showModal();
    document.documentElement.classList.add('gallery-is-open');
  }));
  close.addEventListener('click', () => dialog.close());
  previous.addEventListener('click', () => show(selected - 1));
  next.addEventListener('click', () => show(selected + 1));
  dialog.addEventListener('click', event => { if (event.target === dialog) dialog.close(); });
  dialog.addEventListener('keydown', event => {
    if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
      event.preventDefault();
      show(selected + ((event.key === 'ArrowRight') !== rtl ? 1 : -1));
    }
  });
  dialog.addEventListener('close', () => {
    document.documentElement.classList.remove('gallery-is-open');
    links[selected].focus({ preventScroll: true });
  });
})();
