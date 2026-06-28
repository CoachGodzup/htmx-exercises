# htmx Exercises

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

Una serie di esercizi progressivi per imparare [htmx](https://htmx.org/) con test automatici. Ogni esercizio è atomico e indipendente, con un'area di codice editabile, anteprima live e test che validano il risultato.

## Quick Start

```bash
git clone https://github.com/MATTEO-crx/htmx-exercises.git
cd htmx-exercises
npm install
npm run dev
```

Poi apri [http://localhost:3000](http://localhost:3000)

## Esercizi

| # | Esercizio | Concetti | Difficoltà |
|---|-----------|----------|------------|
| 1 | Basi di htmx | `hx-get`, `hx-target` | 🟢 Facile |
| 2 | Trigger Events | `hx-trigger` | 🟢 Facile |
| 3 | Swap Strategies | `hx-swap` | 🟢 Facile |
| 4 | Target Selection | `hx-target` avanzato | 🟡 Medio |
| 5 | hx-vals & JSON | `hx-vals`, `json-enc` | 🟡 Medio |
| 6 | Target CSS | Selettori CSS | 🟡 Medio |
| 7 | SSE | `sse-connect`, `sse-swap` | 🔴 Difficile |
| 8 | WebSockets | `ws-connect`, `ws-send` | 🔴 Difficile |
| 9 | Estensioni | json-enc | 🟡 Medio |
| 10 | Pattern Comuni | Click-to-Edit | 🔴 Difficile |

## Struttura

```
htmx-exercises/
├── server.js              # Server Express con API mock e test runner
├── package.json
├── public/
│   ├── index.html         # Homepage con elenco esercizi e progress bar
│   ├── css/style.css
│   └── js/app.js
└── exercises/
    ├── 01-basics/         # hx-get, hx-target
    ├── 02-triggers/       # hx-trigger
    ├── 03-swapping/       # hx-swap
    ├── 04-targets/        # Target selection avanzato
    ├── 05-forms/          # hx-vals + json-enc
    ├── 06-targets/        # Target con CSS selectors
    ├── 07-sse/            # Server-Sent Events
    ├── 08-ws/             # WebSockets
    ├── 09-extensions/     # Estensioni htmx
    └── 10-patterns/       # Click-to-Edit
```

## Come funzionano i test

Ogni esercizio ha:
1. Un'area di codice HTML editabile
2. Un'anteprima live del risultato
3. Un pulsante **"Esegui Test"** che invia il tuo HTML al server
4. Il server valida il tuo codice con regex e restituisce i risultati

### API Mock

Il server espone questi endpoint per gli esercizi:

| Endpoint | Metodo | Descrizione |
|----------|--------|-------------|
| `/api/hello` | GET | Restituisce HTML "Hello htmx!" |
| `/api/click` | GET | Restituisce HTML "Clicked!" |
| `/api/swap` | GET | Restituisce HTML "Swapped!" |
| `/api/target` | GET | Restituisce HTML "Targeted!" |
| `/api/val` | POST | Accetta JSON, restituisce valore |
| `/api/sse` | GET | Stream SSE con 5 messaggi |
| `/api/pattern` | POST/PUT | Per pattern click-to-edit |

## Progressione consigliata

1. **Base** (1-3): Impara i 3 attributi fondamentali
2. **Intermedio** (4-6): Target avanzati, parametri e CSS
3. **Avanzato** (7-8): Real-time con SSE e WebSocket
4. **Esperto** (9-10): Estensioni e pattern real-world

## Tech Stack

- [htmx](https://htmx.org/) - v1.9.10
- [Express](https://expressjs.com/) - Server Node.js
- Estensioni htmx caricate da CDN: `sse.js`, `ws.js`, `json-enc.js`

## License

MIT - vedi [LICENSE](LICENSE) per dettagli.