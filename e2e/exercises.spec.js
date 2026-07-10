/* global EXERCISES_DATA */
import { test, expect } from '@playwright/test';

const EXERCISES = [
  { id: '01-basics', title: 'Hello htmx' },
  { id: '02-triggers', title: 'Trigger Events' },
  { id: '03-swapping', title: 'Swap Strategies' },
  { id: '04-targets', title: 'Target Selection' },
  { id: '05-forms', title: 'hx-vals & JSON' },
  { id: '06-targets', title: 'Advanced Targets' },
  { id: '07-sse', title: 'Server-Sent Events' },
  { id: '08-ws', title: 'WebSockets' },
  { id: '09-extensions', title: 'JSON Encoding' },
  { id: '10-patterns', title: 'Common Patterns' },
];

test.describe('htmx Exercises', () => {
  test('homepage loads with all exercises in sidebar', async ({ page }) => {
    await page.goto('/');

    await expect(page.locator('nav h1')).toHaveText('htmx Exercises');
    await expect(page.locator('.hero')).toBeVisible();

    const links = page.locator('#exercise-list a');
    await expect(links).toHaveCount(10);

    const titles = await links.allTextContents();
    for (const ex of EXERCISES) {
      expect(titles.some((t) => t.includes(ex.title))).toBe(true);
    }
  });
});

test.describe('Exercise loading', () => {
  for (const ex of EXERCISES) {
    test(`${ex.id} — loads exercise with instructions and editor`, async ({ page }) => {
      await page.goto(`/#${ex.id}`);
      await page.waitForSelector('.exercise-header h2');

      await expect(page.locator('.exercise-header h2')).toContainText(ex.title);
      await expect(page.locator('.exercise-header .difficulty')).toBeVisible();
      await expect(page.locator('.instructions')).toBeVisible();
      await expect(page.locator('#editor-container .CodeMirror')).toBeVisible();

      await expect(page.locator('#run-tests')).toBeVisible();
      await expect(page.locator('#reset-exercise')).toBeVisible();
      await expect(page.locator('#show-solution')).toBeVisible();
    });
  }
});

test.describe('Test runner — wrong code shows red (fail)', () => {
  for (const ex of EXERCISES) {
    test(`${ex.id} — fails with invalid code`, async ({ page }) => {
      await page.goto(`/#${ex.id}`);
      await page.waitForSelector('#editor-container .CodeMirror');

      await page.evaluate(() => {
        document
          .getElementById('editor-container')
          ._editor.setValue('<div>no htmx attributes</div>');
      });

      await page.click('#run-tests');
      await page.waitForSelector('#test-results.fail', { timeout: 10000 });

      await expect(page.locator('#test-results')).toHaveClass(/fail/);
    });
  }
});

test.describe('Test runner — correct solution shows green (pass)', () => {
  for (const ex of EXERCISES) {
    test(`${ex.id} — passes with correct solution`, async ({ page }) => {
      await page.goto(`/#${ex.id}`);
      await page.waitForSelector('#editor-container .CodeMirror');

      const solution = await page.evaluate((id) => {
        const ex = EXERCISES_DATA.find((e) => e.id === id);
        return ex ? ex.solution : null;
      }, ex.id);
      expect(solution).toBeTruthy();

      await page.evaluate((code) => {
        document.getElementById('editor-container')._editor.setValue(code);
      }, solution);

      await page.click('#run-tests');
      await page.waitForSelector('#test-results.pass', { timeout: 10000 });

      await expect(page.locator('#test-results')).toHaveClass(/pass/);
    });
  }
});

test.describe('Show solution', () => {
  for (const ex of EXERCISES) {
    test(`${ex.id} — shows solution when clicking "Show Solution"`, async ({ page }) => {
      await page.goto(`/#${ex.id}`);
      await page.waitForSelector('.exercise-header h2');

      await page.click('#show-solution');
      await expect(page.locator('#solution')).toBeVisible();
      await expect(page.locator('#solution h3')).toHaveText('Solution');
      await expect(page.locator('#solution .code-hint')).toBeVisible();
    });
  }
});

test.describe('Reset exercise', () => {
  for (const ex of EXERCISES) {
    test(`${ex.id} — resets to initial code`, async ({ page }) => {
      await page.goto(`/#${ex.id}`);
      await page.waitForSelector('#editor-container .CodeMirror');

      const initialCode = await page.evaluate(() => {
        const el = document.getElementById('initial-code');
        return el ? el.textContent.trim() : '';
      });
      expect(initialCode).toBeTruthy();

      await page.evaluate(() => {
        document.getElementById('editor-container')._editor.setValue('<div>modified</div>');
      });

      await page.click('#reset-exercise');
      await page.waitForSelector('#editor-container .CodeMirror');

      const codeAfterReset = await page.evaluate(() => {
        const container = document.getElementById('editor-container');
        return container && container._editor ? container._editor.getValue() : '';
      });
      expect(codeAfterReset).toBe(initialCode);
    });
  }
});
