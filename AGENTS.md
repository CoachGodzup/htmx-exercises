# AGENTS - Piano di miglioramento

## Regole di sviluppo

- **Niente CSS inline**: tutto il CSS va in file `.css` esterni condivisi. I `<style>` nei file HTML e gli attributi `style=""` sugli elementi sono vietati.

## Miglioramenti

Questo file traccia i miglioramenti da apportare al progetto htmx-exercises,
elencati in ordine di priorità.

Id | Categoria | Descrizione | Stato
--- | --- | --- | ---
M02 | bug | Correggere i test copia-incollati in server.js per l'esercizio 06-targets | pending
M03 | bug | Implementare endpoint WebSocket in server.js per l'esercizio 08-ws | pending
U01 | ui/ux | Nascondere la soluzione: partire con textarea vuoto, aggiungere pulsante "Mostra soluzione" | completed
U02 | architettura | Estrarre CSS inline in un file esterno condiviso | completed
U03 | architettura | Uniformare la struttura degli esercizi (decidere tra SPA o standalone) | pending
M19 | architettura | Centralizzare metadati esercizi in un JSON esterno | pending
M22 | architettura | Introdurre file di configurazione centralizzato | pending
M01 | architettura | Eliminare la duplicazione SPA/standalone: tenere solo SPA (app.js + exercise.html), rimuovere index.html standalone | pending
M04 | ui/ux | Allineare homepage, filesystem e test: numerazione coerente | pending
M05 | architettura | Rimuovere o riutilizzare public/css/style.css e public/js/app.js | pending
M06 | infrastruttura | Implementare test automatizzati veri (es. vitest + happy-dom) | completed
M07 | infrastruttura | Aggiungere linting e formatting (ESLint + Prettier + Stylelint) + pre-commit hook | completed
M08 | infrastruttura | Centralizzare versione htmx in un punto solo (CDN) | pending
M09 | ui/ux | Sincronizzare progresso tra homepage e singoli esercizi | pending
M10 | affidabilità | Aggiungere fallback CDN locale per htmx | pending
M11 | ui/ux | Uniformare l'editor (decidere tra textarea o contenteditable) | pending
M12 | ui/ux | Aggiungere debounce all'anteprima live | pending
M13 | accessibilità | Aggiungere ARIA label e supporto tastiera | pending
M14 | ui/ux | Aggiungere navigazione tra esercizi successivi/precedenti | pending
M15 | affidabilità | Sanitizzare HTML utente prima di inserirlo nel DOM | pending
M16 | architettura | Sostituire test regex con validazione HTML strutturale | pending
M17 | sicurezza | Aggiungere header CSP | pending
M18 | ui/ux | Migliorare feedback test: spiegare cosa manca invece di "pass/fail" | pending
M20 | architettura | Aggiungere supporto i18n | pending
M21 | ui/ux | Aggiungere spiegazione testuale alla soluzione | pending
M23 | ui/ux | Allineare titoli esercizi tra homepage e pagina interna | pending
M24 | ui/ux | Aggiungere scorciatoie da tastiera | pending
M25 | bug | Correggere CSS typo in 03-swapping/index.html (border ripetuto) | completed
