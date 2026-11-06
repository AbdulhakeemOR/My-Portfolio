const token = new URLSearchParams(location.hash.slice(1)).get('key');
const status = document.querySelector('#status');
const project = document.querySelector('#project');
const refresh = document.querySelector('#refresh');
let busy = false;

async function loadProject() {
  if (busy || !token) return;
  busy = true;
  refresh.disabled = true;
  status.textContent = 'Loading project progress…';
  try {
    const response = await fetch('status.php', {
      method: 'POST', credentials: 'omit', cache: 'no-store',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ token })
    });
    if (response.status === 404) throw new Error('This project link is unavailable or has expired. Please contact AOR for a new link.');
    if (!response.ok) throw new Error('Project updates are temporarily unavailable. Please try again later.');
    const data = await response.json();
    const names = ['Brief', 'Proposal', 'Creation', 'Review', 'Delivery'];
    const current = names.indexOf(data.stage);
    if (current < 0) throw new Error('Project updates are temporarily unavailable.');
    document.querySelector('#project-title').textContent = data.title;
    const stages = document.querySelector('#stages');
    stages.replaceChildren();
    names.forEach((name, index) => {
      const item = document.createElement('li');
      const completed = index < current || (data.completed && index === current);
      item.className = completed ? 'complete' : index === current ? 'current' : '';
      if (index === current) item.setAttribute('aria-current', 'step');
      const label = document.createElement('strong');
      label.textContent = name;
      const state = document.createElement('span');
      state.textContent = completed ? 'Completed' : index === current ? 'In progress' : 'Upcoming';
      item.append(label, state);
      stages.append(item);
    });
    for (const field of ['update', 'next_step', 'milestone_date', 'updated_at']) {
      document.getElementById(field).textContent = data[field] || 'To be confirmed';
    }
    project.hidden = false;
    status.textContent = data.completed ? 'Your project is complete.' : `Current stage: ${data.stage}`;
  } catch (error) {
    project.hidden = true;
    status.textContent = error instanceof SyntaxError ? 'Project updates are temporarily unavailable.' : error.message;
  } finally {
    busy = false;
    refresh.disabled = false;
  }
}
refresh.addEventListener('click', loadProject);
loadProject();
