# AGENTS - Improvement Plan

## Development Rules

- **No inline CSS**: all CSS must be in shared external `.css` files. `<style>` tags in HTML files and `style=""` attributes on elements are forbidden.

## Git Workflow

- Only commit, amend, push, or create PRs when explicitly requested.
- Before committing, inspect `git status`, `git diff`, and `git log --oneline -10`; stage only intended files.
- Write a concise commit message that matches the repo style.
- Do not update git config, skip hooks, use interactive `-i`, force-push, or create empty commits unless explicitly requested.

## Code Style

- DO NOT add comments unless asked.
- Follow existing conventions: mimic code style, use existing libraries and utilities.
- Never assume a library is available without checking the codebase (e.g., package.json).
- When editing code, first check surrounding context (imports, patterns) before making changes.
- Always follow security best practices.
