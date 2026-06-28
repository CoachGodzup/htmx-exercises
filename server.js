const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

// ========== MOCK API ENDPOINTS ==========

// Exercise 1: basics
app.get('/api/hello', (req, res) => res.send('<strong>Hello htmx!</strong>'));

// Exercise 2: triggers
app.get('/api/click', (req, res) => res.send('<span class="clicked">Clicked!</span>'));

// Exercise 3: swapping
app.get('/api/swap', (req, res) => res.send('<div class="swapped">Swapped!</div>'));

// Exercise 4: forms
app.post('/api/form', (req, res) => res.send(`<p>Received: ${JSON.stringify(req.body)}</p>`));

// Exercise 5: targets
app.get('/api/target', (req, res) => res.send('<span id="target-result">Targeted!</span>'));

// Exercise 6: hx-vals / json
app.post('/api/val', express.json(), (req, res) => res.send(`<p>Value: ${req.body.value}</p>`));

// Exercise 7: SSE
app.get('/api/sse', (req, res) => {
    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Connection', 'keep-alive');
    res.flushHeaders();
    let count = 0;
    const interval = setInterval(() => {
        res.write(`data: ${count++}\n\n`);
        if (count > 5) { clearInterval(interval); res.end(); }
    }, 100);
    req.on('close', () => clearInterval(interval));
});

// Exercise 9: patterns
app.post('/api/pattern', (req, res) => res.send(`<li>${req.body.item}</li>`));
app.put('/api/pattern', express.json(), (req, res) => res.send(`<div class="click-to-edit">${req.body.item}</div>`));

// ========== EXERCISE FILES ==========
app.get('/exercises/:exercise/:file', (req, res) => {
    const filePath = path.join(__dirname, 'exercises', req.params.exercise, req.params.file);
    if (fs.existsSync(filePath)) {
        res.sendFile(filePath);
    } else {
        res.status(404).send('Not found');
    }
});

// ========== TEST ENDPOINT ==========
app.post('/api/test', (req, res) => {
    const { exercise, html } = req.body;
    const results = runTests(exercise, html);
    res.json(results);
});

function runTests(exercise, userHTML) {
    const tests = [];
    
    switch (exercise) {
        case '01-basics':
            tests.push({
                name: 'hx-get presente',
                passed: /hx-get\s*=\s*["']\/api\/hello['"]/.test(userHTML),
                message: 'Il pulsante deve avere hx-get="/api/hello"'
            });
            tests.push({
                name: 'hx-target presente',
                passed: /hx-target\s*=\s*["']#output['"]/.test(userHTML),
                message: 'Il pulsante deve avere hx-target="#output"'
            });
            tests.push({
                name: 'Output div presente',
                passed: /id\s*=\s*["']output['"]/.test(userHTML),
                message: 'Deve esserci un elemento con id="output"'
            });
            break;
            
        case '02-triggers':
            tests.push({
                name: 'hx-trigger presente',
                passed: /hx-trigger\s*=/.test(userHTML),
                message: 'Deve esserci un attributo hx-trigger'
            });
            tests.push({
                name: 'Trigger corretto (dblclick)',
                passed: /hx-trigger\s*=\s*["']dblclick['"]/.test(userHTML),
                message: 'Deve usare dblclick come trigger'
            });
            break;
            
        case '03-swapping':
            tests.push({
                name: 'hx-swap presente',
                passed: /hx-swap\s*=/.test(userHTML),
                message: 'Deve esserci un attributo hx-swap'
            });
            tests.push({
                name: 'Swap strategy corretta (outerHTML)',
                passed: /hx-swap\s*=\s*["']outerHTML['"]/.test(userHTML),
                message: 'Usa outerHTML come strategia di swap'
            });
            break;
            
        case '04-targets':
            tests.push({
                name: 'hx-target con ID corretto',
                passed: /hx-target\s*=\s*["']#target-result['"]/.test(userHTML),
                message: 'Deve mirare a #target-result'
            });
            break;
            
        case '05-forms':
            tests.push({
                name: 'hx-post presente',
                passed: /hx-post\s*=\s*["']\/api\/val['"]/.test(userHTML),
                message: 'Il pulsante deve avere hx-post="/api/val"'
            });
            tests.push({
                name: 'hx-vals con JSON',
                passed: /hx-vals\s*=\s*["']\{.*\}['"]/.test(userHTML),
                message: 'Deve avere hx-vals con JSON'
            });
            tests.push({
                name: 'hx-target su output',
                passed: /hx-target\s*=\s*["']#output['"]/.test(userHTML),
                message: 'Deve avere hx-target="#output"'
            });
            break;
            
        case '06-targets':
            tests.push({
                name: 'ws-connect presente',
                passed: /ws-connect\s*=/.test(userHTML),
                message: 'Deve esserci ws-connect per WebSocket'
            });
            tests.push({
                name: 'Form con ws-send',
                passed: /ws-send/.test(userHTML),
                message: 'Il form deve avere ws-send'
            });
            break;
            
        case '07-sse':
            tests.push({
                name: 'hx-ext="sse" presente',
                passed: /hx-ext\s*=\s*["']sse['"]/.test(userHTML),
                message: 'Deve avere hx-ext="sse"'
            });
            tests.push({
                name: 'sse-connect presente',
                passed: /sse-connect\s*=\s*["']\/api\/sse['"]/.test(userHTML),
                message: 'Deve connettersi a /api/sse'
            });
            break;
            
        case '08-ws':
            tests.push({
                name: 'ws-connect presente',
                passed: /ws-connect\s*=/.test(userHTML),
                message: 'Deve avere ws-connect'
            });
            tests.push({
                name: 'Form con ws-send',
                passed: /ws-send/.test(userHTML),
                message: 'Il form deve avere ws-send'
            });
            break;
            
        case '09-extensions':
            tests.push({
                name: 'hx-ext="json-enc" presente',
                passed: /hx-ext\s*=\s*["']json-enc['"]/.test(userHTML),
                message: 'Deve usare estensione json-enc'
            });
            tests.push({
                name: 'hx-vals con JSON',
                passed: /hx-vals\s*=\s*["']\{.*\}['"]/.test(userHTML),
                message: 'Deve avere hx-vals con JSON'
            });
            break;
            
case '10-patterns':
            tests.push({
                name: 'hx-put per pattern',
                passed: /hx-put\s*=\s*["']\/api\/pattern['"]/.test(userHTML),
                message: 'Deve usare hx-put per /api/pattern'
            });
            tests.push({
                name: 'hx-trigger click',
                passed: /hx-trigger\s*=\s*["'][^"']*click/.test(userHTML),
                message: 'Deve triggerare al click'
            });
            tests.push({
                name: 'hx-trigger keyup[Enter]',
                passed: userHTML.includes("keyup[key=='Enter']") || userHTML.includes('keyup[key=="Enter"]') || userHTML.includes("keyup[key==\\x27Enter\\x27]") || userHTML.includes("keyup[key=='Enter']"),
                message: 'Deve triggerare su Enter'
            });
            tests.push({
                name: 'hx-trigger blur',
                passed: /hx-trigger\s*=\s*["'][^"']*blur/.test(userHTML) || /hx-trigger\s*=\s*["'][^"']*,\s*blur/.test(userHTML),
                message: 'Deve triggerare al blur'
            });
            tests.push({
                name: 'hx-swap outerHTML',
                passed: /hx-swap\s*=\s*["']outerHTML['"]/.test(userHTML),
                message: 'Deve usare outerHTML swap'
            });
            tests.push({
                name: 'hx-vals presente',
                passed: /hx-vals\s*=\s*["']\{.*\}['"]/.test(userHTML),
                message: 'Deve avere hx-vals con JSON'
            });
            break;
    }
    
    const passed = tests.filter(t => t.passed).length;
    return { passed: passed === tests.length && tests.length > 0, tests };
}

// Serve index.html at root
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(3000, () => console.log('Server running on http://localhost:3000'));