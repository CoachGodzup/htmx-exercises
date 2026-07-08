# htmx Exercises

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

A series of progressive exercises to learn [htmx](https://htmx.org/) with automated tests. Each exercise is atomic and independent, with an editable code area, live preview, and tests that validate the result.

## Quick Start

```bash
git clone https://github.com/MATTEO-crx/htmx-exercises.git
cd htmx-exercises
npm install
npm run dev
```

Then open [http://localhost:3000](http://localhost:3000)

## Exercises

| # | Exercise | Concepts | Difficulty |
|---|----------|----------|------------|
| 1 | htmx Basics | `hx-get`, `hx-target` | 🟢 Easy |
| 2 | Trigger Events | `hx-trigger` | 🟢 Easy |
| 3 | Swap Strategies | `hx-swap` | 🟢 Easy |
| 4 | Target Selection | `hx-target` advanced | 🟡 Medium |
| 5 | hx-vals & JSON | `hx-vals`, `json-enc` | 🟡 Medium |
| 6 | Target CSS | CSS Selectors | 🟡 Medium |
| 7 | SSE | `sse-connect`, `sse-swap` | 🔴 Hard |
| 8 | WebSockets | `ws-connect`, `ws-send` | 🔴 Hard |
| 9 | Extensions | json-enc | 🟡 Medium |
| 10 | Common Patterns | Click-to-Edit | 🔴 Hard |

## Structure

```
htmx-exercises/
├── server.js              # Express server with mock API and test runner
├── package.json
├── public/
│   ├── index.html         # Homepage with exercise list and progress bar
│   ├── css/style.css
│   └── js/app.js
└── exercises/
    ├── 01-basics/         # hx-get, hx-target
    ├── 02-triggers/       # hx-trigger
    ├── 03-swapping/       # hx-swap
    ├── 04-targets/        # Advanced target selection
    ├── 05-forms/          # hx-vals + json-enc
    ├── 06-targets/        # Target with CSS selectors
    ├── 07-sse/            # Server-Sent Events
    ├── 08-ws/             # WebSockets
    ├── 09-extensions/     # htmx extensions
    └── 10-patterns/       # Click-to-Edit
```

## How tests work

Each exercise has:
1. An editable HTML code area
2. A live preview of the result
3. A **"Run Tests"** button that sends your HTML to the server
4. The server validates your code with regex and returns the results

### Mock API

The server exposes these endpoints for the exercises:

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/hello` | GET | Returns HTML "Hello htmx!" |
| `/api/click` | GET | Returns HTML "Clicked!" |
| `/api/swap` | GET | Returns HTML "Swapped!" |
| `/api/target` | GET | Returns HTML "Targeted!" |
| `/api/val` | POST | Accepts JSON, returns value |
| `/api/sse` | GET | SSE stream with 5 messages |
| `/api/pattern` | POST/PUT | For click-to-edit pattern |

## Recommended Progression

1. **Beginner** (1-3): Learn the 3 fundamental attributes
2. **Intermediate** (4-6): Advanced targets, parameters, and CSS
3. **Advanced** (7-8): Real-time with SSE and WebSocket
4. **Expert** (9-10): Extensions and real-world patterns

## Tech Stack

- [htmx](https://htmx.org/) - v1.9.10
- [Express](https://expressjs.com/) - Node.js Server
- htmx extensions loaded from CDN: `sse.js`, `ws.js`, `json-enc.js`

## License

MIT - see [LICENSE](LICENSE) for details.
