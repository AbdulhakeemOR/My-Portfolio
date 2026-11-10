// Client testimonials published from the project workspace (tracking/testimonials.php).
// Each section stays hidden unless at least one published testimonial loads.
(() => {
  const sections = document.querySelectorAll('[data-testimonials]');
  if (!sections.length) return;
  const arabic = document.documentElement.lang === 'ar';
  const endpoint = new URL(/\/(en|ar)\/[^/]*$/.test(location.pathname) ? '../tracking/testimonials.php' : './tracking/testimonials.php', location.href);

  function card(item) {
    const figure = document.createElement('figure');
    figure.className = 'testimonial-card';
    if (item.rating > 0) {
      const stars = document.createElement('p');
      stars.className = 'testimonial-stars';
      stars.setAttribute('role', 'img');
      stars.setAttribute('aria-label', arabic ? `التقييم ${item.rating} من 5` : `Rated ${item.rating} out of 5`);
      stars.textContent = '★'.repeat(item.rating) + '☆'.repeat(5 - item.rating);
      figure.append(stars);
    }
    const quote = document.createElement('blockquote');
    quote.dir = 'auto'; // a testimonial keeps the language the client wrote it in
    quote.textContent = item.text;
    const caption = document.createElement('figcaption');
    caption.dir = 'auto';
    caption.textContent = item.name;
    figure.append(quote, caption);
    return figure;
  }

  fetch(endpoint, {credentials: 'omit', cache: 'no-cache', headers: {Accept: 'application/json'}})
    .then((response) => response.ok ? response.json() : {testimonials: []})
    .then(({testimonials = []}) => {
      if (!testimonials.length) return;
      sections.forEach((section) => {
        const limit = Number(section.dataset.limit) || 3;
        const skip = Number(section.dataset.skip) || 0;
        // Show different testimonials from the Homepage once there are enough of them.
        const items = testimonials.length > skip ? testimonials.slice(skip, skip + limit) : testimonials.slice(0, limit);
        section.querySelector('.testimonial-list').replaceChildren(...items.map(card));
        section.hidden = false;
        // The site's scroll-reveal starts sections transparent; it cannot see a section that
        // was hidden when it started watching, so show this one directly.
        section.classList.add('is-visible');
      });
    })
    .catch(() => {});
})();
