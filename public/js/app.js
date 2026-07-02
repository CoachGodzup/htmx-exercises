let exercises = [];

async function loadConfig() {
  try {
    const res = await fetch('/api/exercises');
    const data = await res.json();
    exercises = data.exercises;
    renderNav();
    if (location.hash) {
      loadExercise(location.hash.slice(1));
    }
  } catch {
    document.getElementById('content').innerHTML = `
            <div class="hero">
                <h2>Error loading exercises</h2>
                <p>Could not load exercise configuration. Make sure the server is running.</p>
            </div>
        `;
  }
}

function renderNav() {
  const list = document.getElementById('exercise-list');
  list.innerHTML = exercises
    .map(
      (ex) =>
        `<li><a href="#${ex.id}" data-id="${ex.id}">
            ${ex.title}
            <span class="difficulty ${ex.difficulty}">${ex.difficulty}</span>
         </a></li>`
    )
    .join('');

  list.querySelectorAll('a').forEach((a) => {
    a.addEventListener('click', (e) => {
      e.preventDefault();
      loadExercise(a.dataset.id);
    });
  });
}

async function loadExercise(id) {
  document
    .querySelectorAll('#exercise-list a')
    .forEach((a) => a.classList.toggle('active', a.dataset.id === id));

  try {
    const res = await fetch(`/exercises/${id}/exercise.html`);
    if (!res.ok) throw new Error('Not found');
    const html = await res.text();
    document.getElementById('content').innerHTML = html;
    initExercise(id);
  } catch {
    document.getElementById('content').innerHTML = `
            <div class="exercise">
                <div class="exercise-header">
                    <h2>Exercise not found</h2>
                </div>
                <p>Exercise ${id} is not available yet.</p>
            </div>
        `;
  }
}

function initExercise(id) {
  const runBtn = document.getElementById('run-tests');
  const resetBtn = document.getElementById('reset-exercise');
  const showSolutionBtn = document.getElementById('show-solution');

  runBtn?.addEventListener('click', () => runTests(id));
  resetBtn?.addEventListener('click', () => loadExercise(id));
  showSolutionBtn?.addEventListener('click', () => showSolution(id));
}

async function runTests(id) {
  const resultsDiv = document.getElementById('test-results');
  resultsDiv.style.display = 'block';
  resultsDiv.className = 'results';
  resultsDiv.innerHTML = '<h4>Running tests...</h4>';

  try {
    const workspace = document.getElementById('workspace');
    const userHTML = workspace.innerHTML;

    const res = await fetch(`/api/test/${id}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ html: userHTML }),
    });

    const result = await res.json();
    resultsDiv.className = `results ${result.passed ? 'pass' : 'fail'}`;
    resultsDiv.innerHTML = `
            <h4>${result.passed ? 'All tests passed!' : 'Some tests failed'}</h4>
            <ul>${result.tests.map((t) => `<li>${t.passed ? '&#10003;' : '&#10007;'} ${t.name}: ${t.message}</li>`).join('')}</ul>
        `;
  } catch (e) {
    resultsDiv.className = 'results fail';
    resultsDiv.innerHTML = `<h4>Error</h4><ul><li>${e.message}</li></ul>`;
  }
}

async function showSolution(id) {
  try {
    const res = await fetch(`/exercises/${id}/solution.html`);
    const html = await res.text();
    const solutionDiv = document.getElementById('solution');
    solutionDiv.style.display = 'block';
    solutionDiv.innerHTML = `<h3>Solution</h3><div class="code-hint">${escapeHtml(html)}</div>`;
  } catch {
    alert('Solution not available');
  }
}

function escapeHtml(text) {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}

document.addEventListener('DOMContentLoaded', loadConfig);

window.loadExercise = loadExercise;
