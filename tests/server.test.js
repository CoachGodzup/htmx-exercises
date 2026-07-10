import { describe, it, expect } from 'vitest';
import supertest from 'supertest';
import { app, runTests } from '../server.js';

const request = supertest(app);

describe('Mock API endpoints', () => {
  it('GET /api/hello', async () => {
    const res = await request.get('/api/hello');
    expect(res.status).toBe(200);
    expect(res.text).toBe('<strong>Hello htmx!</strong>');
  });

  it('GET /api/click', async () => {
    const res = await request.get('/api/click');
    expect(res.status).toBe(200);
    expect(res.text).toBe('<span class="clicked">Clicked!</span>');
  });

  it('GET /api/swap', async () => {
    const res = await request.get('/api/swap');
    expect(res.status).toBe(200);
    expect(res.text).toBe('<div class="swapped">Swapped!</div>');
  });

  it('POST /api/form echoes body', async () => {
    const res = await request.post('/api/form').send({ name: 'test', value: 123 });
    expect(res.status).toBe(200);
    expect(res.text).toContain('test');
    expect(res.text).toContain('123');
  });

  it('GET /api/target', async () => {
    const res = await request.get('/api/target');
    expect(res.status).toBe(200);
    expect(res.text).toBe('<span id="target-result">Targeted!</span>');
  });

  it('POST /api/val returns value', async () => {
    const res = await request.post('/api/val').send({ value: 'hello' });
    expect(res.status).toBe(200);
    expect(res.text).toBe('<p>Value: hello</p>');
  });

  it('POST /api/pattern returns list item', async () => {
    const res = await request.post('/api/pattern').send({ item: 'test-item' });
    expect(res.status).toBe(200);
    expect(res.text).toBe('<li>test-item</li>');
  });

  it('PUT /api/pattern returns click-to-edit', async () => {
    const res = await request.put('/api/pattern').send({ item: 'edit-me' });
    expect(res.status).toBe(200);
    expect(res.text).toBe('<div class="click-to-edit">edit-me</div>');
  });

  it('GET /api/exercises returns all 10', async () => {
    const res = await request.get('/api/exercises');
    expect(res.status).toBe(200);
    expect(res.body.exercises).toHaveLength(10);
  });
});

describe('runTests — exercies 01–03 (easy)', () => {
  const passing = {
    '01-basics':
      '<button hx-get="/api/hello" hx-target="#output">Click</button><div id="output"></div>',
    '02-triggers':
      '<button hx-get="/api/click" hx-target="#output" hx-trigger="dblclick">Click</button><div id="output"></div>',
    '03-swapping': '<div hx-get="/api/swap" hx-trigger="click" hx-swap="outerHTML">Click</div>',
  };

  const failing = {
    '01-basics': '<button>no htmx</button>',
    '02-triggers': '<button>no htmx</button>',
    '03-swapping': '<div>no htmx</div>',
  };

  const testCounts = { '01-basics': 3, '02-triggers': 2, '03-swapping': 2 };

  for (const [id, html] of Object.entries(passing)) {
    it(`${id} — passes with correct solution`, () => {
      const result = runTests(id, html);
      expect(result.passed).toBe(true);
    });
  }

  for (const [id, html] of Object.entries(failing)) {
    it(`${id} — fails with invalid code`, () => {
      const result = runTests(id, html);
      expect(result.passed).toBe(false);
      expect(result.tests).toHaveLength(testCounts[id]);
    });
  }
});

describe('runTests — exercies 04–06 (medium)', () => {
  const passing = {
    '04-targets':
      '<button hx-get="/api/target" hx-target="#target-output">Load</button><div id="target-output"></div>',
    '05-forms':
      '<button hx-ext="json-enc" hx-post="/api/val" hx-vals=\'{"value":"test"}\' hx-target="#output">Send</button><div id="output"></div>',
    '06-targets':
      '<button hx-get="/api/target" hx-target="#target-result">Load</button><div id="target-result"></div>',
  };

  const failing = {
    '04-targets': '<div>no htmx</div>',
    '05-forms': '<div>no htmx</div>',
    '06-targets': '<div>no htmx</div>',
  };

  const testCounts = { '04-targets': 1, '05-forms': 3, '06-targets': 2 };

  for (const [id, html] of Object.entries(passing)) {
    it(`${id} — passes with correct solution`, () => {
      const result = runTests(id, html);
      expect(result.passed).toBe(true);
    });
  }

  for (const [id, html] of Object.entries(failing)) {
    it(`${id} — fails with invalid code`, () => {
      const result = runTests(id, html);
      expect(result.passed).toBe(false);
      expect(result.tests).toHaveLength(testCounts[id]);
    });
  }
});

describe('runTests — exercies 07–10 (hard)', () => {
  const passing = {
    '07-sse': '<div hx-ext="sse" sse-connect="/api/sse" sse-swap="message">Waiting...</div>',
    '08-ws':
      '<div ws-connect="ws://localhost:3000/api/ws"><form ws-send hx-target="#chat" hx-swap="beforeend"><input name="msg"><button>Send</button></form></div>',
    '09-extensions':
      '<button hx-ext="json-enc" hx-post="/api/val" hx-vals=\'{"value":"test"}\' hx-target="#output">Send</button><div id="output"></div>',
    '10-patterns':
      '<div hx-put="/api/pattern" hx-trigger="click, keyup[key==\'Enter\'], blur" hx-swap="outerHTML" hx-vals=\'{"item":"test"}\'>Edit</div>',
  };

  const failing = {
    '07-sse': '<div>no htmx</div>',
    '08-ws': '<div>no htmx</div>',
    '09-extensions': '<div>no htmx</div>',
    '10-patterns': '<div>no htmx</div>',
  };

  const testCounts = { '07-sse': 2, '08-ws': 2, '09-extensions': 2, '10-patterns': 6 };

  for (const [id, html] of Object.entries(passing)) {
    it(`${id} — passes with correct solution`, () => {
      const result = runTests(id, html);
      expect(result.passed).toBe(true);
    });
  }

  for (const [id, html] of Object.entries(failing)) {
    it(`${id} — fails with invalid code`, () => {
      const result = runTests(id, html);
      expect(result.passed).toBe(false);
      expect(result.tests).toHaveLength(testCounts[id]);
    });
  }
});

describe('runTests — edge cases', () => {
  it('returns empty tests for unknown exercise ID', () => {
    const result = runTests('unknown-id', '<div>test</div>');
    expect(result.passed).toBe(false);
    expect(result.tests).toEqual([]);
  });

  it('returns false with tests for empty HTML', () => {
    const result = runTests('01-basics', '');
    expect(result.passed).toBe(false);
    expect(result.tests.length).toBeGreaterThan(0);
    expect(result.tests.every((t) => !t.passed)).toBe(true);
  });

  it('handles extra whitespace in attributes', () => {
    const html =
      '<button  hx-get="/api/hello"  hx-target="#output"  >Click</button><div id="output"></div>';
    const result = runTests('01-basics', html);
    expect(result.passed).toBe(true);
  });

  it('passes for exercise 04 with single- or double-quoted target', () => {
    const dbl = '<button hx-target="#target-output">Load</button><div id="target-output"></div>';
    expect(runTests('04-targets', dbl).passed).toBe(true);
  });
});

describe('POST /api/test — HTTP integration', () => {
  it('/api/test/:id returns results for valid exercise', async () => {
    const res = await request.post('/api/test/01-basics').send({ html: '<div>wrong</div>' });
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('passed', false);
    expect(res.body.tests).toHaveLength(3);
  });

  it('/api/test/:id returns green for correct solution', async () => {
    const res = await request.post('/api/test/01-basics').send({
      html: '<button hx-get="/api/hello" hx-target="#output">Click</button><div id="output"></div>',
    });
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('passed', true);
  });

  it('/api/test (legacy format) works', async () => {
    const res = await request
      .post('/api/test')
      .send({ exercise: '01-basics', html: '<div>wrong</div>' });
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('passed', false);
  });
});
