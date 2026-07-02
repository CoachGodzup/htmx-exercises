# htmx-exercises Changelog & Roadmap

All improvements, fixes, and changes tracked with a unique ID per item.

## Legend

| Status | Meaning |
| --- | --- |
| completed | Implemented and merged |
| pending | Planned but not yet started |

## Improvements

### Completed

| ID | Category | Description | Status |
| --- | --- | --- | --- |
| U01 | ui/ux | Hide solution: start with empty textarea, add "Show Solution" button | completed |
| U02 | architecture | Extract inline CSS to shared external file | completed |
| U03 | architecture | Standardize exercise structure (decide SPA vs standalone) | completed |
| M01 | architecture | Eliminate SPA/standalone duplication: keep only SPA (app.js + exercise.html), remove standalone index.html | completed |
| M02 | bug | Fix copied tests in server.js for exercise 06-targets (were ws-connect/ws-send instead of hx-target tests) | completed |
| M03 | bug | Implement WebSocket endpoint in server.js for exercise 08-ws | completed |
| M04 | ui/ux | Align homepage, filesystem and test numbering consistently | completed |
| M05 | architecture | Remove or reuse public/css/style.css and public/js/app.js | completed |
| M06 | infrastructure | Implement real automated tests (vitest + happy-dom) | completed |
| M07 | infrastructure | Add linting and formatting (ESLint + Prettier + Stylelint) + pre-commit hook | completed |
| M11 | ui/ux | Standardize editor (decide between textarea or contenteditable) | completed |
| M19 | architecture | Centralize exercise metadata in external JSON | completed |
| M22 | architecture | Introduce centralized configuration file | completed |
| M23 | ui/ux | Align exercise titles between homepage and inner page | completed |
| M25 | bug | Fix CSS typo in 03-swapping/index.html (duplicate `border: white` before `border: none`) | completed |
| M26 | architecture | Translate everything to English (code, UI, exercise texts, homepage) | completed |

### Pending

| ID | Category | Description | Status |
| --- | --- | --- | --- |
| M08 | infrastructure | Centralize htmx version in a single location (CDN) | pending |
| M09 | ui/ux | Sync progress between homepage and individual exercises | pending |
| M10 | reliability | Add local CDN fallback for htmx | pending |
| M12 | ui/ux | Add debounce to live preview | pending |
| M13 | accessibility | Add ARIA labels and keyboard support | pending |
| M14 | ui/ux | Add navigation between previous/next exercises | pending |
| M15 | reliability | Sanitize user HTML before inserting into DOM | pending |
| M16 | architecture | Replace regex tests with structural HTML validation | pending |
| M17 | security | Add CSP headers | pending |
| M18 | ui/ux | Improve test feedback: explain what is missing instead of pass/fail | pending |
| M20 | architecture | Add i18n support: extract strings into JSON (en.json, it.json), load based on `lang` attribute or `navigator.language`, replace dynamically in DOM | pending |
| M21 | ui/ux | Add textual explanation to the solution | pending |
| M24 | ui/ux | Add keyboard shortcuts | pending |
