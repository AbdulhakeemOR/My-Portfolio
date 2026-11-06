
// Demos never submit personal details to a server, even if their app fails.
document.addEventListener('submit', event => {
  if (event.target.method !== 'dialog') event.preventDefault();
}, true);
document.querySelectorAll('[data-demo-disabled]').forEach(control => {
  control.disabled = false;
  control.removeAttribute('data-demo-disabled');
});
