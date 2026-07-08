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
  const editorContainer = document.getElementById('editor-container');
  let editor = null;
  if (editorContainer && typeof CodeMirror !== 'undefined') {
    const initialCodeEl = document.getElementById('initial-code');
    const initialValue = initialCodeEl
      ? initialCodeEl.textContent.trim()
      : '<!-- Your code here -->';
    editor = CodeMirror(editorContainer, {
      value: initialValue,
      mode: 'htmlmixed',
      theme: 'material-ocean',
      lineNumbers: true,
      indentUnit: 2,
      tabSize: 2,
      lineWrapping: true,
    });
    editorContainer._editor = editor;

    let previewTimer = null;
    const updatePreview = () => {
      clearTimeout(previewTimer);
      previewTimer = setTimeout(() => {
        const frame = document.getElementById('preview-frame');
        if (frame) {
          const doc = frame.contentDocument || frame.contentWindow.document;
          doc.open();
          doc.write(
            [
              '<!DOCTYPE html><html><head><meta charset="UTF-8" />',
              '<script src="https://unpkg.com/htmx.org@1.9.10"></scr',
              'ipt></head><body>',
              editor.getValue(),
              '</body></html>',
            ].join('')
          );
          doc.close();
        }
      }, 300);
    };
    editor.on('change', updatePreview);
    updatePreview();
  }

  const runBtn = document.getElementById('run-tests');
  const resetBtn = document.getElementById('reset-exercise');
  const showSolutionBtn = document.getElementById('show-solution');

  runBtn?.addEventListener('click', () => runTests(id));
  resetBtn?.addEventListener('click', () => loadExercise(id));
  showSolutionBtn?.addEventListener('click', () => showSolution(id));
}

function getWorkspaceContent() {
  const editorContainer = document.getElementById('editor-container');
  if (editorContainer && editorContainer._editor) {
    return editorContainer._editor.getValue();
  }
  const el = document.getElementById('workspace');
  if (el) {
    return el.innerHTML;
  }
  return '';
}

async function runTests(id) {
  const resultsDiv = document.getElementById('test-results');
  resultsDiv.style.display = 'block';
  resultsDiv.className = 'results';
  resultsDiv.innerHTML = '<h4>Running tests...</h4>';

  try {
    const userHTML = getWorkspaceContent();

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
