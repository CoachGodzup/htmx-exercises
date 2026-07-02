const express = require('express');
const path = require('path');
const fs = require('fs');
const http = require('http');
const { WebSocketServer, WebSocket } = require('ws');

const app = express();
const server = http.createServer(app);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

// ========== MOCK API ENDPOINTS ==========

app.get('/api/hello', (req, res) => res.send('<strong>Hello htmx!</strong>'));

app.get('/api/click', (req, res) => res.send('<span class="clicked">Clicked!</span>'));

app.get('/api/swap', (req, res) => res.send('<div class="swapped">Swapped!</div>'));

app.post('/api/form', (req, res) => res.send(`<p>Received: ${JSON.stringify(req.body)}</p>`));

app.get('/api/target', (req, res) => res.send('<span id="target-result">Targeted!</span>'));

app.post('/api/val', (req, res) => res.send(`<p>Value: ${req.body.value}</p>`));

app.get('/api/sse', (req, res) => {
  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('Connection', 'keep-alive');
  res.flushHeaders();
  let count = 0;
  const interval = setInterval(() => {
    res.write(`data: ${count++}\n\n`);
    if (count > 5) {
      clearInterval(interval);
      res.end();
    }
  }, 100);
  req.on('close', () => clearInterval(interval));
});

app.post('/api/pattern', (req, res) => res.send(`<li>${req.body.item}</li>`));
app.put('/api/pattern', (req, res) =>
  res.send(`<div class="click-to-edit">${req.body.item}</div>`)
);

// ========== EXERCISE CONFIG ==========

app.get('/api/exercises', (req, res) => {
  const configPath = path.join(__dirname, 'exercises', 'exercises.json');
  if (fs.existsSync(configPath)) {
    res.sendFile(configPath);
  } else {
    res.status(404).json({ error: 'Config not found' });
  }
});

// ========== EXERCISE FILES ==========

app.get('/exercises/:exercise/:file', (req, res) => {
  const filePath = path.join(__dirname, 'exercises', req.params.exercise, req.params.file);
  if (fs.existsSync(filePath)) {
    res.sendFile(filePath);
  } else {
    res.status(404).send('Not found');
  }
});

// ========== TEST ENDPOINTS ==========

// Legacy: standalone format { exercise, html }
app.post('/api/test', (req, res) => {
  const { exercise, html } = req.body;
  const results = runTests(exercise, html);
  res.json(results);
});

// SPA format: /api/test/:id with { html }
app.post('/api/test/:id', (req, res) => {
  const { html } = req.body;
  const results = runTests(req.params.id, html);
  res.json(results);
});

function runTests(exercise, userHTML) {
  const tests = [];

  switch (exercise) {
    case '01-basics':
      tests.push({
        name: 'hx-get attribute',
        passed: /hx-get\s*=\s*["']\/api\/hello['"]/.test(userHTML),
        message: 'Button must have hx-get="/api/hello"',
      });
      tests.push({
        name: 'hx-target attribute',
        passed: /hx-target\s*=\s*["']#output['"]/.test(userHTML),
        message: 'Button must have hx-target="#output"',
      });
      tests.push({
        name: 'Output div present',
        passed: /id\s*=\s*["']output['"]/.test(userHTML),
        message: 'An element with id="output" must exist',
      });
      break;

    case '02-triggers':
      tests.push({
        name: 'hx-trigger present',
        passed: /hx-trigger\s*=/.test(userHTML),
        message: 'Must have an hx-trigger attribute',
      });
      tests.push({
        name: 'Correct trigger (dblclick)',
        passed: /hx-trigger\s*=\s*["']dblclick['"]/.test(userHTML),
        message: 'Must use dblclick as the trigger',
      });
      break;

    case '03-swapping':
      tests.push({
        name: 'hx-swap present',
        passed: /hx-swap\s*=/.test(userHTML),
        message: 'Must have an hx-swap attribute',
      });
      tests.push({
        name: 'Correct swap strategy (outerHTML)',
        passed: /hx-swap\s*=\s*["']outerHTML['"]/.test(userHTML),
        message: 'Use outerHTML as swap strategy',
      });
      break;

    case '04-targets':
      tests.push({
        name: 'hx-target with correct ID',
        passed: /hx-target\s*=\s*["']#target-output['"]/.test(userHTML),
        message: 'Must target #target-output',
      });
      break;

    case '05-forms':
      tests.push({
        name: 'hx-post present',
        passed: /hx-post\s*=\s*["']\/api\/val['"]/.test(userHTML),
        message: 'Button must have hx-post="/api/val"',
      });
      tests.push({
        name: 'hx-vals with JSON',
        passed: /hx-vals\s*=\s*["']\{.*\}['"]/.test(userHTML),
        message: 'Must have hx-vals with JSON',
      });
      tests.push({
        name: 'hx-target on output',
        passed: /hx-target\s*=\s*["']#output['"]/.test(userHTML),
        message: 'Must have hx-target="#output"',
      });
      break;

    case '06-targets':
      tests.push({
        name: 'hx-get present',
        passed: /hx-get\s*=\s*["']\/api\/target['"]/.test(userHTML),
        message: 'Must have hx-get="/api/target"',
      });
      tests.push({
        name: 'hx-target with advanced selector',
        passed: /hx-target\s*=/.test(userHTML),
        message: 'Must have an hx-target attribute with a CSS selector',
      });
      break;

    case '07-sse':
      tests.push({
        name: 'hx-ext="sse" present',
        passed: /hx-ext\s*=\s*["']sse['"]/.test(userHTML),
        message: 'Must have hx-ext="sse"',
      });
      tests.push({
        name: 'sse-connect present',
        passed: /sse-connect\s*=\s*["']\/api\/sse['"]/.test(userHTML),
        message: 'Must connect to /api/sse',
      });
      break;

    case '08-ws':
      tests.push({
        name: 'ws-connect present',
        passed: /ws-connect\s*=/.test(userHTML),
        message: 'Must have ws-connect',
      });
      tests.push({
        name: 'Form with ws-send',
        passed: /ws-send/.test(userHTML),
        message: 'Form must have ws-send',
      });
      break;

    case '09-extensions':
      tests.push({
        name: 'hx-ext="json-enc" present',
        passed: /hx-ext\s*=\s*["']json-enc['"]/.test(userHTML),
        message: 'Must use json-enc extension',
      });
      tests.push({
        name: 'hx-vals with JSON',
        passed: /hx-vals\s*=\s*["']\{.*\}['"]/.test(userHTML),
        message: 'Must have hx-vals with JSON',
      });
      break;

    case '10-patterns':
      tests.push({
        name: 'hx-put for pattern',
        passed: /hx-put\s*=\s*["']\/api\/pattern['"]/.test(userHTML),
        message: 'Must use hx-put for /api/pattern',
      });
      tests.push({
        name: 'hx-trigger click',
        passed: /hx-trigger\s*=\s*["'][^"']*click/.test(userHTML),
        message: 'Must trigger on click',
      });
      tests.push({
        name: 'hx-trigger keyup[Enter]',
        passed:
          userHTML.includes("keyup[key=='Enter']") ||
          userHTML.includes('keyup[key=="Enter"]') ||
          userHTML.includes('keyup[key==\\x27Enter\\x27]') ||
          userHTML.includes("keyup[key=='Enter']"),
        message: 'Must trigger on Enter key',
      });
      tests.push({
        name: 'hx-trigger blur',
        passed:
          /hx-trigger\s*=\s*["'][^"']*blur/.test(userHTML) ||
          /hx-trigger\s*=\s*["'][^"']*,\s*blur/.test(userHTML),
        message: 'Must trigger on blur',
      });
      tests.push({
        name: 'hx-swap outerHTML',
        passed: /hx-swap\s*=\s*["']outerHTML['"]/.test(userHTML),
        message: 'Must use outerHTML swap',
      });
      tests.push({
        name: 'hx-vals present',
        passed: /hx-vals\s*=\s*["']\{.*\}['"]/.test(userHTML),
        message: 'Must have hx-vals with JSON',
      });
      break;
  }

  const passed = tests.filter((t) => t.passed).length;
  return { passed: passed === tests.length && tests.length > 0, tests };
}

// ========== WEBSOCKET ENDPOINT (Exercise 08-ws) ==========

const wss = new WebSocketServer({ server, path: '/api/ws' });

wss.on('connection', (ws) => {
  ws.on('message', (data) => {
    const msg = data.toString();
    wss.clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(`<div class="message">${msg}</div>`);
      }
    });
  });

  ws.send('<div class="message">Connected to WebSocket server</div>');
});

// ========== START SERVER ==========

server.listen(3000, () => console.log('Server running on http://localhost:3000'));
