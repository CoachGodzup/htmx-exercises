const EXERCISES_DATA = [
  {
    id: '01-basics',
    title: 'Hello htmx',
    description:
      'Learn the basics: hx-get, hx-target, making GET requests and displaying responses.',
    difficulty: 'easy',
    tags: ['hx-get', 'hx-target'],
    html: `<div class="exercise">
  <div class="exercise-header">
    <h2>1. Hello htmx</h2>
    <span class="difficulty easy">easy</span>
  </div>
  <div class="instructions">
    <h3>Objective</h3>
    <p>Learn the basics of htmx: make a GET request and replace an element's content.</p>
    <ol>
      <li>Add a button that makes a GET request to <code>/api/hello</code> on click</li>
      <li>The response must replace the content of <code>&lt;div id="output"&gt;</code></li>
      <li>Use <code>hx-get</code> and <code>hx-target</code></li>
      <li>Suggerimento: <code>hx-get="/api/hello"</code> dice a htmx quale URL fetchare al click</li>
      <li>Suggerimento: <code>hx-target="#output"</code> dice a htmx dove inserire la risposta</li>
    </ol>
  </div>
  <div class="editor-preview-split">
    <div id="editor-container" class="editor-pane"></div>
    <div class="preview-pane">
      <div class="preview-header">Live Preview</div>
      <iframe id="preview-frame" class="preview-frame" sandbox="allow-scripts"></iframe>
    </div>
  </div>
  <script type="text/plain" id="initial-code" hidden>
    <div id="output">Click the button below...</div>
    <br />
    <!-- Your code here -->
  </script>
  <div class="controls">
    <button class="btn btn-primary" id="run-tests">Run Tests</button>
    <button class="btn btn-secondary" id="reset-exercise">Reset</button>
    <button class="btn btn-secondary" id="show-solution">Show Solution</button>
  </div>
  <div class="results" id="test-results"></div>
  <div class="solution" id="solution"></div>
</div>`,
    solution: `<div id="output">Click the button below...</div>
<br />
<button hx-get="/api/hello" hx-target="#output">Say Hello</button>`,
  },
  {
    id: '02-triggers',
    title: 'Trigger Events',
    description:
      'Change the event that triggers the request: click, dblclick, mouseenter, keyup, etc.',
    difficulty: 'easy',
    tags: ['hx-trigger'],
    html: `<div class="exercise">
  <div class="exercise-header">
    <h2>2. Trigger Events</h2>
    <span class="difficulty easy">easy</span>
  </div>
  <div class="instructions">
    <h3>Objective</h3>
    <p>Change the event that triggers the request from click to a different event.</p>
    <ol>
      <li>Modify the button so the request fires on <strong>double click</strong> (<code>dblclick</code>)</li>
      <li>Keep <code>hx-get="/api/click"</code> and <code>hx-target="#output"</code></li>
      <li>Use <code>hx-trigger</code> to change the event</li>
      <li>Suggerimento: <code>hx-trigger</code> sostituisce l'evento predefinito (click) con qualsiasi evento DOM</li>
      <li>Suggerimento: Il valore <code>dblclick</code> farà scattare la richiesta al doppio click</li>
    </ol>
  </div>
  <div class="editor-preview-split">
    <div id="editor-container" class="editor-pane"></div>
    <div class="preview-pane">
      <div class="preview-header">Live Preview</div>
      <iframe id="preview-frame" class="preview-frame" sandbox="allow-scripts"></iframe>
    </div>
  </div>
  <script type="text/plain" id="initial-code" hidden>
    <button hx-get="/api/click" hx-target="#output">Double-click me</button>
    <div id="output"></div>
  </script>
  <div class="controls">
    <button class="btn btn-primary" id="run-tests">Run Tests</button>
    <button class="btn btn-secondary" id="reset-exercise">Reset</button>
    <button class="btn btn-secondary" id="show-solution">Show Solution</button>
  </div>
  <div class="results" id="test-results"></div>
  <div class="solution" id="solution"></div>
</div>`,
    solution: `<button hx-get="/api/click" hx-target="#output" hx-trigger="dblclick">Double-click me</button>
<div id="output"></div>`,
  },
  {
    id: '03-swapping',
    title: 'Swap Strategies',
    description:
      'Control how the response is inserted: innerHTML, outerHTML, beforeend, afterbegin, etc.',
    difficulty: 'easy',
    tags: ['hx-swap'],
    html: `<div class="exercise">
  <div class="exercise-header">
    <h2>3. Swap Strategies</h2>
    <span class="difficulty easy">easy</span>
  </div>
  <div class="instructions">
    <h3>Objective</h3>
    <p>Change the swap strategy to replace the entire element instead of just its inner content.</p>
    <ol>
      <li>Make the div below replace itself entirely when clicked</li>
      <li>Use <code>hx-get="/api/swap"</code> and <code>hx-swap="outerHTML"</code></li>
      <li>Add <code>hx-trigger="click"</code> so clicking triggers the request</li>
      <li>Suggerimento: Il valore predefinito di <code>hx-swap</code> è <code>innerHTML</code> (sostituisce il contenuto). Prova <code>outerHTML</code> per sostituire l'elemento stesso.</li>
      <li>Suggerimento: Con <code>outerHTML</code> l'intero div viene rimpiazzato con la risposta del server</li>
    </ol>
  </div>
  <div class="editor-preview-split">
    <div id="editor-container" class="editor-pane"></div>
    <div class="preview-pane">
      <div class="preview-header">Live Preview</div>
      <iframe id="preview-frame" class="preview-frame" sandbox="allow-scripts"></iframe>
    </div>
  </div>
  <script type="text/plain" id="initial-code" hidden>
    <div id="target" hx-get="/api/swap" hx-trigger="click">Click to replace this div</div>
  </script>
  <div class="controls">
    <button class="btn btn-primary" id="run-tests">Run Tests</button>
    <button class="btn btn-secondary" id="reset-exercise">Reset</button>
    <button class="btn btn-secondary" id="show-solution">Show Solution</button>
  </div>
  <div class="results" id="test-results"></div>
  <div class="solution" id="solution"></div>
</div>`,
    solution: `<div id="target" hx-get="/api/swap" hx-trigger="click" hx-swap="outerHTML">
  Click to replace this div
</div>`,
  },
  {
    id: '04-targets',
    title: 'Target Selection',
    description:
      'Use CSS selectors to target specific elements: closest, next, previous, ID, classes.',
    difficulty: 'medium',
    tags: ['hx-target', 'CSS selectors'],
    html: `<div class="exercise">
  <div class="exercise-header">
    <h2>4. Target Selection</h2>
    <span class="difficulty medium">medium</span>
  </div>
  <div class="instructions">
    <h3>Objective</h3>
    <p>Use CSS selectors with hx-target to put the response in a different element than the one making the request.</p>
    <ol>
      <li>Create a button that makes a GET request to <code>/api/target</code></li>
      <li>Make the response go to <code>#target-output</code> using <code>hx-target</code></li>
      <li>Suggerimento: <code>hx-target="#target-output"</code> fa andare la risposta in un elemento specifico, non nel bottone</li>
      <li>Suggerimento: Il target ha già <code>id="target-output"</code> — usalo nel selettore CSS</li>
    </ol>
  </div>
  <div class="editor-preview-split">
    <div id="editor-container" class="editor-pane"></div>
    <div class="preview-pane">
      <div class="preview-header">Live Preview</div>
      <iframe id="preview-frame" class="preview-frame" sandbox="allow-scripts"></iframe>
    </div>
  </div>
  <script type="text/plain" id="initial-code" hidden>
    <button hx-get="/api/target">Load into target</button>
    <div id="target-output"></div>
  </script>
  <div class="controls">
    <button class="btn btn-primary" id="run-tests">Run Tests</button>
    <button class="btn btn-secondary" id="reset-exercise">Reset</button>
    <button class="btn btn-secondary" id="show-solution">Show Solution</button>
  </div>
  <div class="results" id="test-results"></div>
  <div class="solution" id="solution"></div>
</div>`,
    solution: `<button hx-get="/api/target" hx-target="#target-output">Load into target</button>
<div id="target-output"></div>`,
  },
  {
    id: '05-forms',
    title: 'hx-vals & JSON',
    description:
      'Send additional parameters with hx-vals and use json-enc extension for JSON encoding.',
    difficulty: 'medium',
    tags: ['hx-vals', 'hx-post', 'json-enc'],
    html: `<div class="exercise">
  <div class="exercise-header">
    <h2>5. hx-vals &amp; JSON</h2>
    <span class="difficulty medium">medium</span>
  </div>
  <div class="instructions">
    <h3>Objective</h3>
    <p>Use <code>hx-vals</code> to send additional parameters and the <code>json-enc</code> extension to send as JSON.</p>
    <ol>
      <li>Create a button with <code>hx-ext="json-enc"</code> to enable JSON encoding</li>
      <li>Use <code>hx-post="/api/val"</code> to send a POST request</li>
      <li>Add <code>hx-vals='{"value": "test"}'</code> to send extra parameters</li>
      <li>Set <code>hx-target="#output"</code> to display the response</li>
      <li>Suggerimento: <code>hx-ext="json-enc"</code> abilita la codifica JSON per la richiesta POST</li>
      <li>Suggerimento: Usa <code>hx-vals='{"value": "test"}'</code> per inviare parametri extra come JSON</li>
    </ol>
  </div>
  <div class="editor-preview-split">
    <div id="editor-container" class="editor-pane"></div>
    <div class="preview-pane">
      <div class="preview-header">Live Preview</div>
      <iframe id="preview-frame" class="preview-frame" sandbox="allow-scripts"></iframe>
    </div>
  </div>
  <script type="text/plain" id="initial-code" hidden>
    <button hx-post="/api/val" hx-target="#output">Send JSON</button>
    <div id="output"></div>
  </script>
  <div class="controls">
    <button class="btn btn-primary" id="run-tests">Run Tests</button>
    <button class="btn btn-secondary" id="reset-exercise">Reset</button>
    <button class="btn btn-secondary" id="show-solution">Show Solution</button>
  </div>
  <div class="results" id="test-results"></div>
  <div class="solution" id="solution"></div>
</div>`,
    solution: `<button hx-ext="json-enc" hx-post="/api/val" hx-vals='{"value": "test"}' hx-target="#output">
  Send JSON
</button>
<div id="output"></div>`,
  },
  {
    id: '06-targets',
    title: 'Advanced Targets',
    description: 'Use advanced CSS selectors with hx-target: closest, next, previous, find.',
    difficulty: 'medium',
    tags: ['hx-target', 'CSS selectors', 'advanced'],
    html: `<div class="exercise">
  <div class="exercise-header">
    <h2>6. Advanced Targets</h2>
    <span class="difficulty medium">medium</span>
  </div>
  <div class="instructions">
    <h3>Objective</h3>
    <p>Use advanced CSS selectors with hx-target: <code>closest</code>, <code>next</code>, <code>previous</code>, <code>find</code>.</p>
    <ol>
      <li>Create a button that makes a GET request to <code>/api/target</code></li>
      <li>Use <code>hx-target</code> with an advanced selector like <code>closest .container</code>, <code>next</code>, or <code>#target-result</code></li>
      <li>The target element <code>#target-result</code> is inside the container</li>
      <li>Suggerimento: <code>hx-target="#target-result"</code> indirizza la risposta al div fratello dentro il container</li>
      <li>Suggerimento: La risposta da <code>/api/target</code> verrà inserita nell'elemento matching il selettore</li>
    </ol>
  </div>
  <div class="editor-preview-split">
    <div id="editor-container" class="editor-pane"></div>
    <div class="preview-pane">
      <div class="preview-header">Live Preview</div>
      <iframe id="preview-frame" class="preview-frame" sandbox="allow-scripts"></iframe>
    </div>
  </div>
  <script type="text/plain" id="initial-code" hidden>
    <div class="container">
      <button hx-get="/api/target">Load into target</button>
      <div id="target-result"></div>
    </div>
  </script>
  <div class="controls">
    <button class="btn btn-primary" id="run-tests">Run Tests</button>
    <button class="btn btn-secondary" id="reset-exercise">Reset</button>
    <button class="btn btn-secondary" id="show-solution">Show Solution</button>
  </div>
  <div class="results" id="test-results"></div>
  <div class="solution" id="solution"></div>
</div>`,
    solution: `<div class="container">
  <button hx-get="/api/target" hx-target="#target-result">Load into target</button>
  <div id="target-result"></div>
</div>`,
  },
  {
    id: '07-sse',
    title: 'Server-Sent Events',
    description: 'Real-time one-way updates from the server using the SSE extension.',
    difficulty: 'hard',
    tags: ['sse-connect', 'sse-swap', 'extensions'],
    html: `<div class="exercise">
  <div class="exercise-header">
    <h2>7. Server-Sent Events</h2>
    <span class="difficulty hard">hard</span>
  </div>
  <div class="instructions">
    <h3>Objective</h3>
    <p>Use the SSE extension to receive real-time updates from the server.</p>
    <ol>
      <li>Create a div with <code>hx-ext="sse"</code> to enable the SSE extension</li>
      <li>Add <code>sse-connect="/api/sse"</code> to connect to the server</li>
      <li>Use <code>sse-swap="message"</code> to listen for message events</li>
      <li>Suggerimento: <code>hx-ext="sse"</code> attiva l'estensione SSE, poi <code>sse-connect="/api/sse"</code> apre la connessione</li>
      <li>Suggerimento: <code>sse-swap="message"</code> dice a htmx a quale nome di evento ascoltare nello stream</li>
    </ol>
  </div>
  <div class="editor-preview-split">
    <div id="editor-container" class="editor-pane"></div>
    <div class="preview-pane">
      <div class="preview-header">Live Preview</div>
      <iframe id="preview-frame" class="preview-frame" sandbox="allow-scripts"></iframe>
    </div>
  </div>
  <script type="text/plain" id="initial-code" hidden>
    <div id="output">Waiting for messages...</div>
  </script>
  <div class="controls">
    <button class="btn btn-primary" id="run-tests">Run Tests</button>
    <button class="btn btn-secondary" id="reset-exercise">Reset</button>
    <button class="btn btn-secondary" id="show-solution">Show Solution</button>
  </div>
  <div class="results" id="test-results"></div>
  <div class="solution" id="solution"></div>
</div>`,
    solution: `<div hx-ext="sse" sse-connect="/api/sse" sse-swap="message" id="output">
  Waiting for messages...
</div>`,
  },
  {
    id: '08-ws',
    title: 'WebSockets',
    description: 'Bidirectional real-time communication with the WebSocket extension.',
    difficulty: 'hard',
    tags: ['ws-connect', 'ws-send', 'extensions'],
    html: `<div class="exercise">
  <div class="exercise-header">
    <h2>8. WebSockets</h2>
    <span class="difficulty hard">hard</span>
  </div>
  <div class="instructions">
    <h3>Objective</h3>
    <p>Use the WebSocket extension for bidirectional real-time communication.</p>
    <ol>
      <li>Create a div with <code>ws-connect="ws://localhost:3000/api/ws"</code></li>
      <li>Add a form with <code>ws-send</code> to send messages</li>
      <li>Use <code>hx-target="#chat"</code> and <code>hx-swap="beforeend"</code> on the form</li>
      <li>Suggerimento: Aggiungi <code>ws-connect="ws://localhost:3000/api/ws"</code> al div chat per aprire una connessione WebSocket</li>
      <li>Suggerimento: Aggiungi <code>ws-send</code> al form per inviare messaggi via WebSocket quando viene sottomesso</li>
    </ol>
  </div>
  <div class="editor-preview-split">
    <div id="editor-container" class="editor-pane"></div>
    <div class="preview-pane">
      <div class="preview-header">Live Preview</div>
      <iframe id="preview-frame" class="preview-frame" sandbox="allow-scripts"></iframe>
    </div>
  </div>
  <script type="text/plain" id="initial-code" hidden>
    <div id="chat">
      <div>Messages:</div>
    </div>
    <form hx-target="#chat" hx-swap="beforeend">
      <input name="msg" placeholder="Message..." required />
      <button type="submit">Send</button>
    </form>
  </script>
  <div class="controls">
    <button class="btn btn-primary" id="run-tests">Run Tests</button>
    <button class="btn btn-secondary" id="reset-exercise">Reset</button>
    <button class="btn btn-secondary" id="show-solution">Show Solution</button>
  </div>
  <div class="results" id="test-results"></div>
  <div class="solution" id="solution"></div>
</div>`,
    solution: `<div ws-connect="ws://localhost:3000/api/ws" id="chat">
  <div>Messages:</div>
</div>
<form ws-send hx-target="#chat" hx-swap="beforeend">
  <input name="msg" placeholder="Message..." required />
  <button type="submit">Send</button>
</form>`,
  },
  {
    id: '09-extensions',
    title: 'JSON Encoding',
    description: 'Send data as JSON instead of form-urlencoded using the json-enc extension.',
    difficulty: 'medium',
    tags: ['json-enc', 'hx-vals', 'extensions'],
    html: `<div class="exercise">
  <div class="exercise-header">
    <h2>9. JSON Encoding</h2>
    <span class="difficulty medium">medium</span>
  </div>
  <div class="instructions">
    <h3>Objective</h3>
    <p>Use the <code>json-enc</code> extension to send data as JSON instead of form-urlencoded.</p>
    <ol>
      <li>Create a button with <code>hx-ext="json-enc"</code> to enable JSON encoding</li>
      <li>Use <code>hx-post="/api/val"</code> to send data</li>
      <li>Add <code>hx-vals='{"value": "test"}'</code> with a JSON object</li>
      <li>Suggerimento: <code>hx-ext="json-enc"</code> abilita l'estensione per la codifica JSON</li>
      <li>Suggerimento: Usa <code>hx-vals='{"value": "test"}'</code> per inviare un oggetto JSON con la richiesta</li>
    </ol>
  </div>
  <div class="editor-preview-split">
    <div id="editor-container" class="editor-pane"></div>
    <div class="preview-pane">
      <div class="preview-header">Live Preview</div>
      <iframe id="preview-frame" class="preview-frame" sandbox="allow-scripts"></iframe>
    </div>
  </div>
  <script type="text/plain" id="initial-code" hidden>
    <button hx-post="/api/val" hx-target="#output">Send JSON</button>
    <div id="output"></div>
  </script>
  <div class="controls">
    <button class="btn btn-primary" id="run-tests">Run Tests</button>
    <button class="btn btn-secondary" id="reset-exercise">Reset</button>
    <button class="btn btn-secondary" id="show-solution">Show Solution</button>
  </div>
  <div class="results" id="test-results"></div>
  <div class="solution" id="solution"></div>
</div>`,
    solution: `<button hx-ext="json-enc" hx-post="/api/val" hx-vals='{"value": "test"}' hx-target="#output">
  Send JSON
</button>
<div id="output"></div>`,
  },
  {
    id: '10-patterns',
    title: 'Common Patterns',
    description: 'Click-to-Edit, Infinite Scroll, Active Search and other real-world patterns.',
    difficulty: 'hard',
    tags: ['patterns', 'click-to-edit'],
    html: `<div class="exercise">
  <div class="exercise-header">
    <h2>10. Common Patterns</h2>
    <span class="difficulty hard">hard</span>
  </div>
  <div class="instructions">
    <h3>Objective: Click-to-Edit</h3>
    <p>Create an element that turns into an input on click, and saves on Enter or blur.</p>
    <ol>
      <li>Use <code>hx-put="/api/pattern"</code> to send the update</li>
      <li>Use multiple triggers: <code>hx-trigger="click, keyup[key=='Enter'], blur"</code></li>
      <li>Use <code>hx-swap="outerHTML"</code> to replace the element</li>
      <li>Add <code>hx-vals='{"item": "Click to edit"}'</code></li>
      <li>Suggerimento: Usa <code>hx-put="/api/pattern"</code> con trigger multipli: <code>click, keyup[key=='Enter'], blur</code></li>
      <li>Suggerimento: Aggiungi <code>hx-swap="outerHTML"</code> e <code>hx-vals='{"item": "Click to edit"}'</code> per completare il pattern</li>
    </ol>
  </div>
  <div class="editor-preview-split">
    <div id="editor-container" class="editor-pane"></div>
    <div class="preview-pane">
      <div class="preview-header">Live Preview</div>
      <iframe id="preview-frame" class="preview-frame" sandbox="allow-scripts"></iframe>
    </div>
  </div>
  <script type="text/plain" id="initial-code" hidden>
    <div class="click-to-edit">Click to edit</div>
  </script>
  <div class="controls">
    <button class="btn btn-primary" id="run-tests">Run Tests</button>
    <button class="btn btn-secondary" id="reset-exercise">Reset</button>
    <button class="btn btn-secondary" id="show-solution">Show Solution</button>
  </div>
  <div class="results" id="test-results"></div>
  <div class="solution" id="solution"></div>
</div>`,
    solution: `<div
  hx-put="/api/pattern"
  hx-trigger="click, keyup[key=='Enter'], blur"
  hx-swap="outerHTML"
  hx-vals='{"item": "Click to edit"}'
  class="click-to-edit"
>
  Click to edit
</div>`,
  },
];

let exercises = [];

function loadConfig() {
  exercises = EXERCISES_DATA;
  renderNav();
  if (location.hash) {
    loadExercise(location.hash.slice(1));
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

function loadExercise(id) {
  document
    .querySelectorAll('#exercise-list a')
    .forEach((a) => a.classList.toggle('active', a.dataset.id === id));

  const ex = exercises.find((e) => e.id === id);
  if (!ex) {
    document.getElementById('content').innerHTML = `
      <div class="exercise">
        <div class="exercise-header">
          <h2>Exercise not found</h2>
        </div>
        <p>Exercise ${id} is not available yet.</p>
      </div>`;
    return;
  }

  document.getElementById('content').innerHTML = ex.html;
  initExercise(id);
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

    const updatePreview = () => {
      const frame = document.getElementById('preview-frame');
      if (frame) {
        frame.srcdoc = [
          '<!DOCTYPE html><html><head><meta charset="UTF-8" />',
          '<script src="https://unpkg.com/htmx.org@1.9.10"></scr',
          'ipt></head><body>',
          editor.getValue(),
          '</body></html>',
        ].join('');
      }
    };

    const previewHeader = document.querySelector('.preview-header');
    if (previewHeader) {
      const refreshBtn = document.createElement('button');
      refreshBtn.textContent = 'Refresh Preview';
      refreshBtn.className = 'btn btn-secondary';
      refreshBtn.style.marginLeft = 'auto';
      refreshBtn.addEventListener('click', updatePreview);
      previewHeader.appendChild(refreshBtn);
    }

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

function showSolution(id) {
  const ex = exercises.find((e) => e.id === id);
  if (!ex) {
    alert('Solution not available');
    return;
  }
  const solutionDiv = document.getElementById('solution');
  solutionDiv.style.display = 'block';
  solutionDiv.innerHTML = `<h3>Solution</h3><div class="code-hint">${escapeHtml(ex.solution)}</div>`;
}

function escapeHtml(text) {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}

document.addEventListener('DOMContentLoaded', loadConfig);

window.loadExercise = loadExercise;
