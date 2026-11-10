document.querySelectorAll('form[data-confirm]').forEach((form) => form.addEventListener('submit', (event) => {
  if (!confirm(form.dataset.confirm)) event.preventDefault();
}));
document.querySelectorAll('form.remove-file').forEach((form) => form.addEventListener('submit', (event) => {
  if (!confirm(`Remove "${form.dataset.name}"? The customer will no longer see it, and the stored file is deleted.`)) event.preventDefault();
}));
(() => {
  const list = document.querySelector('#line-items');
  const add = document.querySelector('#add-item');
  if (!list || !add) return;
  const wire = (row) => row.querySelector('.remove-item')?.addEventListener('click', () => {
    if (list.children.length > 1) row.remove();
  });
  [...list.children].forEach(wire);
  add.addEventListener('click', () => {
    const row = document.createElement('div');
    row.innerHTML = '<input name="item_description[]" aria-label="Description" placeholder="Description"><input name="item_quantity[]" type="number" min="1" aria-label="Quantity" value="1"><input name="item_unit_price[]" inputmode="decimal" aria-label="Unit price" value="0.00"><button type="button" class="remove-item" aria-label="Remove line item">Remove</button>';
    list.append(row); wire(row); row.querySelector('input')?.focus();
  });
})();
