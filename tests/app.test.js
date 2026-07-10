import { describe, it, expect } from 'vitest';

function escapeHtml(text) {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}

describe('escapeHtml', () => {
  it('escapes < and >', () => {
    expect(escapeHtml('<script>alert("xss")</script>')).toBe(
      '&lt;script&gt;alert("xss")&lt;/script&gt;'
    );
  });

  it('escapes &', () => {
    expect(escapeHtml('a & b')).toBe('a &amp; b');
  });

  it('passes through double quotes unchanged', () => {
    expect(escapeHtml('say "hello"')).toBe('say "hello"');
  });

  it('returns empty string for empty input', () => {
    expect(escapeHtml('')).toBe('');
  });

  it('passes through plain text unchanged', () => {
    expect(escapeHtml('hello world')).toBe('hello world');
  });

  it('escapes multiple special characters but not quotes', () => {
    expect(escapeHtml('<a href="test">click</a>')).toBe('&lt;a href="test"&gt;click&lt;/a&gt;');
  });

  it('handles template literal from EXERCISES_DATA', () => {
    const solution = `<div id="output">Click the button below...</div>
<br />
<button hx-get="/api/hello" hx-target="#output">Say Hello</button>`;
    const escaped = escapeHtml(solution);
    expect(escaped).toContain('&lt;div id="output"&gt;');
    expect(escaped).toContain('&lt;button hx-get="/api/hello"');
  });
});

describe('EXERCISES_DATA shape', () => {
  it('all exercises have required fields', () => {
    const data = [
      { id: '01-basics', title: 'Hello htmx', difficulty: 'easy' },
      { id: '02-triggers', title: 'Trigger Events', difficulty: 'easy' },
      { id: '03-swapping', title: 'Swap Strategies', difficulty: 'easy' },
      { id: '04-targets', title: 'Target Selection', difficulty: 'medium' },
      { id: '05-forms', title: 'hx-vals & JSON', difficulty: 'medium' },
      { id: '06-targets', title: 'Advanced Targets', difficulty: 'medium' },
      { id: '07-sse', title: 'Server-Sent Events', difficulty: 'hard' },
      { id: '08-ws', title: 'WebSockets', difficulty: 'hard' },
      { id: '09-extensions', title: 'JSON Encoding', difficulty: 'medium' },
      { id: '10-patterns', title: 'Common Patterns', difficulty: 'hard' },
    ];

    expect(data).toHaveLength(10);
    for (const ex of data) {
      expect(ex.id).toBeTruthy();
      expect(ex.title).toBeTruthy();
      expect(['easy', 'medium', 'hard']).toContain(ex.difficulty);
    }
  });
});
