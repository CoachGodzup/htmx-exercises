# Miglioramenti Progetto htmx-exercises

## Difetti segnalati

id,categoria,difetto,impatto,priorita
U01,UI/UX,La soluzione e' pre-compilata nel textarea in tutti gli esercizi (02-10) e visibile subito,Lo studente non puo' esercitarsi davvero,alta
U02,Architettura,Il CSS e' duplicato inline in ogni file HTML,Modificare lo stile richiede aggiornare 10+ file,alta
U03,Architettura,Struttura esercizi non standard: 01 ha 3 file (index/exercise/solution) gli altri solo index,Confusione manutentiva,alta

## Altri miglioramenti proposti

id,categoria,difetto,impatto,priorita
M01,Architettura,Coesistono due architetture: SPA (app.js+exercise.html) e pagine standalone (index.html),Doppia manutenzione e incoerenza,alta
M02,Bug,Esercizio 06 (targets) ha test copia-incollati da WebSocket (ws-connect/ws-send) invece di test su hx-target,Test errati per l'esercizio,alta
M03,Infrastruttura,Esercizio 08 (ws) punta a ws://localhost:3000/api/ws ma server.js non implementa WebSocket,Esercizio non funzionante,alta
M04,UI/UX,La homepage elenca 9 esercizi ma la numerazione non corrisponde alle directory (06-targets non elencato, 08-ws elencato come 6),Navigazione confusa,media
M05,Architettura,public/css/style.css e public/js/app.js esistono ma non sono mai referenziati dagli index.html,Risorse inutilizzate,media
M06,Infrastruttura,`npm test` restituisce un placeholder, nessun test automatizzato reale,Impossibile fare CI/CD,media
M07,Architettura,Assenza di linting/formatting (ESLint, Prettier),Codice non uniforme,media
M08,Infrastruttura,La versione di htmx (1.9.10) e' hardcoded in ogni file,Aggiornare richiede modifiche multiple,media
M09,UI/UX,Il progresso e' salvato in localStorage ma non e' sincronizzato tra homepage ed esercizi,Esperienza utente frammentata,media
M10,Affidabilita,Dipendenze CDN senza fallback,Se CDN e' giu' gli esercizi non funzionano,media
M11,UI/UX,textarea vs contenteditable: esercizio 01 SPA usa contenteditable, gli altri usano textarea,Inconsistenza UX,media
M12,UI/UX,Anteprima aggiornata ad ogni keystroke senza debounce,Performance percepita,media
M13,Accessibilita,Nessun ARIA label o supporto tastiera,Esclusione utenti con disabilita',bassa
M14,UI/UX,Nessun link "esercizio successivo" al completamento,Navigazione scomoda,bassa
M15,Affidabilita,Preview inserisce HTML utente direttamente nel DOM senza sanitizzazione,Rischio XSS e rottura layout,bassa
M16,Architettura,Test basati su regex su HTML grezzo sono fragili,Falsi positivi/negativi,bassa
M17,Infrastruttura,Assenza di header CSP (Content-Security-Policy),Rischio sicurezza,bassa
M18,UI/UX,Il feedback del test e' binario (pass/fail) senza spiegazione dell'errore,Apprendimento limitato,media
M19,Architettura,Metadati esercizi duplicati in index.html, app.js, server.js,Mantenimento difficile,alta
M20,Infrastruttura,Nessun supporto i18n, tutto in italiano,Non riutilizzabile per altre lingue,bassa
M21,UI/UX,La soluzione mostra solo il codice senza spiegazione,Opportunita' di apprendimento persa,bassa
M22,Architettura,Nessuna configurazione centralizzata (es. JSON esterno con metadati esercizi),Scarsa manutenibilita',alta
M23,UI/UX,Esercizio 05 si intitola "hx-vals & JSON" ma in homepage e' "Form Handling",Inconsistenza titoli,media
M24,UI/UX,Nessuna scorciatoia da tastiera per azioni frequenti (test, reset),Efficienza ridotta,bassa
M25,Bug,Il CSS di 03-swapping:index.html riga 13 contiene `border: white;` ripetuto prima di `border: none;`,Errore CSS innocuo,bassa
