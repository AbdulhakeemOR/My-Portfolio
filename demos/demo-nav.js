
// Demos never submit personal details to a server, even if their app fails.
document.addEventListener('submit', event => {
  if (event.target.method !== 'dialog') event.preventDefault();
}, true);
document.querySelectorAll('[data-demo-disabled]').forEach(control => {
  control.disabled = false;
  control.removeAttribute('data-demo-disabled');
});
// Framework-rendered demos (see SCRIPT_BAR) get the portfolio bar once the app has started.
if (document.querySelector('script[data-aor-bar]') && !document.querySelector('[data-aor-demo]')) {
  window.addEventListener('load', () => {
    const bar = document.createElement('aside');
    // A floating pill: app layouts with fixed sidebars would sit underneath a top bar.
    bar.className = 'aor-demo-nav aor-demo-nav--float';
    bar.dataset.aorDemo = '';
    bar.setAttribute('aria-label', 'Portfolio demo');
    bar.innerHTML = '<a href="/en/projects.html">AOR · Back to projects</a><span>Portfolio sample</span>';
    document.body.prepend(bar);
  });
}
