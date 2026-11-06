document.querySelector('#copy-link')?.addEventListener('click', async () => {
  const input = document.querySelector('#customer-link');
  const status = document.querySelector('#copy-status');
  try {
    await navigator.clipboard.writeText(input.value);
    status.textContent = 'Link copied.';
  } catch {
    input.focus();
    input.select();
    status.textContent = 'Select and copy the link above.';
  }
});
