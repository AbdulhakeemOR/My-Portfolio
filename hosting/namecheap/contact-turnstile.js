(() => {
  const form = document.querySelector('#email-contact-form');
  if (!form) return;
  const endpoint = new URL('turnstile-config.php', form.action);
  fetch(endpoint, { credentials: 'same-origin', cache: 'no-store' })
    .then(response => response.ok ? response.json() : null)
    .then(config => {
      if (!config?.enabled || !config.siteKey) return;
      const mount = document.createElement('div');
      mount.className = 'turnstile-field';
      mount.setAttribute('aria-label', 'Spam verification');
      form.querySelector('button[type="submit"]')?.before(mount);
      const script = document.createElement('script');
      script.src = 'https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit';
      script.async = true;
      script.defer = true;
      script.addEventListener('load', () => window.turnstile?.render(mount, { sitekey: config.siteKey }));
      document.head.append(script);
    })
    .catch(() => {});
})();
