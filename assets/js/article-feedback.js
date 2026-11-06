// Public discussions are stored on the hosting server; pending comments stay private.
(() => {
  const states = new WeakMap();
  const arabic = document.documentElement.lang === 'ar';
  const text = (value) => arabic ? (window.AOR_AR?.[value] || value) : value;
  const endpoint = new URL(/\/(en|ar)\/[^/]*$/.test(location.pathname) ? '../article-feedback.php' : './article-feedback.php', location.href);
  const state = (section) => {
    if (!states.has(section)) states.set(section, {token:'', liked:false, page:0, busy:false});
    return states.get(section);
  };
  const article = (section) => section.closest('.article-item').id.replace(/^article-/, '');
  const notify = (section, value) => { section.querySelector('.article-action-status').textContent = text(value); };

  function errorMessage(error) {
    if (error.status === 429) return 'Too many attempts. Please try again in an hour.';
    if (error.status === 422 || error.status === 413) return 'Please check your display name and comment length.';
    if (error.status === 403) return 'Please reload and allow this site’s functional cookie before trying again.';
    return 'Comments and likes could not load. They require the hosted website. Please try again later.';
  }

  async function request(section, options = {}) {
    const serial = (state(section).serial || 0) + 1;
    state(section).serial = serial;
    const url = new URL(endpoint);
    url.searchParams.set('article', article(section));
    const headers = {'Accept':'application/json'};
    let init = {headers, credentials:'same-origin', cache:'no-store', signal:AbortSignal.timeout(12000)};
    if (options.participate) {
      url.searchParams.set('participate', '1');
      headers['X-AOR-Feedback'] = '1';
    }
    if (options.page) url.searchParams.set('page', String(options.page));
    if (options.action) {
      headers['Content-Type'] = 'application/json';
      init = {...init, method:'POST', body:JSON.stringify({...options, article:article(section), token:state(section).token})};
    }
    const response = await fetch(url, init);
    if (!response.ok) { const error = new Error('Discussion request failed'); error.status=response.status; throw error; }
    const data = await response.json();
    if (data.ok !== true || !Array.isArray(data.comments) || !Number.isInteger(data.likes)) throw new Error('Invalid discussion response');
    return {...data, serial};
  }

  function render(section, data, append = false) {
    if (data.serial !== state(section).serial) return;
    Object.assign(state(section), {token:data.token, liked:data.liked, page:data.page});
    const button = section.querySelector('[data-article-action="like"]');
    button.setAttribute('aria-pressed', String(data.liked));
    section.querySelector('[data-like-count]').textContent = `(${new Intl.NumberFormat(document.documentElement.lang).format(data.likes)})`;
    const list = section.querySelector('.article-comment-list');
    if (!append) list.replaceChildren();
    for (const comment of data.comments) {
      const item = document.createElement('li');
      const name = document.createElement('strong');
      name.dataset.userContent = '';
      name.textContent = comment.name;
      const body = document.createElement('p');
      body.dataset.userContent = '';
      body.textContent = comment.body;
      const date = document.createElement('time');
      date.dateTime = comment.date;
      date.textContent = new Intl.DateTimeFormat(document.documentElement.lang, {dateStyle:'medium'}).format(new Date(comment.date));
      item.append(name, date, body);
      if (comment.pending) {
        const note = document.createElement('p');
        note.textContent = text('Awaiting approval — visible only to you in this browser.');
        item.append(note);
      }
      if (comment.mine) {
        const remove = document.createElement('button');
        remove.type = 'button';
        remove.dataset.commentDelete = comment.id;
        remove.textContent = text('Delete my comment');
        item.append(remove);
      }
      list.append(item);
    }
    const more = section.querySelector('[data-comments-more]');
    more.hidden = !data.more;
  }

  async function load(section, participate = false, page = 0) {
    const data = await request(section, {participate, page});
    render(section, data, page > 0);
    return data;
  }

  document.addEventListener('click', async (event) => {
    const button = event.target.closest('[data-article-action="like"], [data-article-action="comment"], [data-comment-delete], [data-comments-more]');
    if (!button) return;
    const section = button.closest('.article-feedback');
    if (!section || state(section).busy) return;
    const panel = section.querySelector('.article-comment-panel');
    if (button.dataset.articleAction === 'comment' && !panel.hidden) {
      panel.hidden = true;
      button.setAttribute('aria-expanded', 'false');
      return;
    }
    state(section).busy = true;
    button.disabled = true;
    notify(section, 'Loading discussion…');
    try {
      if (button.dataset.articleAction === 'comment') {
        panel.hidden = false;
        button.setAttribute('aria-expanded', 'true');
        await load(section, true);
        section.querySelector('input[name="name"]').focus();
        notify(section, 'Comments are reviewed before publication.');
      } else if (button.hasAttribute('data-comments-more')) {
        await load(section, false, state(section).page + 1);
        notify(section, 'More comments loaded.');
      } else {
        if (!state(section).token) await load(section, true);
        const options = button.dataset.commentDelete ? {action:'delete', id:button.dataset.commentDelete} : {action:'like', liked:!state(section).liked};
        render(section, await request(section, options));
        notify(section, button.dataset.commentDelete ? 'Your comment was removed.' : 'Your reaction was saved.');
      }
    } catch (error) {
      notify(section, errorMessage(error));
    } finally {
      state(section).busy = false;
      button.disabled = false;
    }
  });

  document.addEventListener('submit', async (event) => {
    const form = event.target.closest('.article-comment-form');
    if (!form) return;
    event.preventDefault();
    const section = form.closest('.article-feedback');
    if (state(section).busy || !form.reportValidity()) return;
    const button = form.querySelector('button[type="submit"]');
    state(section).busy = true;
    button.disabled = true;
    notify(section, 'Submitting your comment…');
    try {
      if (!state(section).token) await load(section, true);
      const values = Object.fromEntries(new FormData(form));
      render(section, await request(section, {...values, action:'comment'}));
      form.reset();
      notify(section, 'Comment submitted for approval. It is not public yet.');
    } catch (error) {
      notify(section, errorMessage(error));
    } finally {
      button.disabled = false;
      state(section).busy = false;
    }
  });

  document.addEventListener('toggle', (event) => {
    if (!event.target.matches?.('.article-details') || !event.target.open) return;
    const section = event.target.querySelector('.article-feedback');
    if (section) load(section).catch(() => {});
  }, true);
})();
