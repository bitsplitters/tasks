---
title: Prepara la tua gilda per la serata di raid
seoTitle: "Bot Discord per gestire gilde e clan: serate di raid e task"
name: Gilde e clan
description: "La settimana di una gilda intorno alla serata di raid: un promemoria che si ripete ogni mercoledì per mesi, le prove delle reclute fatte una dopo l'altra e un foglio della formazione che si compila da solo con Make e Google Sheets."
highlights: "Un promemoria ricorrente in giorni, prove fatte una dopo l'altra, un webhook verso Make e Google Sheets, variabili libere, Riapri tutti con una nuova data."
intro: |
  Ava guida **Ember Vanguard**, una gilda di raid di una sessantina di giocatori. Leo guida i raid, ogni mercoledì alle 20. Gli ufficiali reclutano, e ogni recluta gioca un raid di prova prima di entrare. I membri giocano dalle due sponde dell'Atlantico. Questa è la settimana della gilda da lunedì 7 a domenica 13 dicembre 2026.
order: 5
team:
  guild: Ember Vanguard
  zone: America/Chicago
  people:
    - { id: "11859044175621001", name: Ava, username: ava.ember, color: "#eb459e", about: "Capogilda. Scrive la lista." }
    - { id: "11859044175621002", name: Leo, username: leo.raids, color: "#3ba55c", about: "Capo dei raid e ufficiale." }
    - { id: "11859044175621003", name: Kai, username: kai.ember, color: "#1abc9c", about: "Ufficiale." }
  roles:
    - { id: "11859044175622001", name: Ufficiali, about: "Ava, Leo, Kai e altri due." }
    - { id: "11859044175622002", name: Raider, about: "Il team dei raid, una trentina di giocatori." }
  channels:
    - { id: "11859044175623001", name: raid, about: "Dove parlano i raider. La lista vive qui." }
    - { id: "11859044175623002", name: ufficiali, about: "Privato per gli ufficiali." }
list:
  title: "Ember Vanguard: la settimana"
  channel: "11859044175623001"
  at: 2026-12-10T22:00
  look: |
    Il promemoria del raid mostra `↻7d ×16`: ogni mercoledì fino a fine marzo. Le tre prove portano il nome e la classe della recluta come variabili libere; il loro webhook non si vede. «Rifornire la banca della gilda» ha un solo promemoria, che si sposta ogni settimana.
  text: |
    - [] <t:1796866200> [0m,7d,15] <@&11859044175622002>: Serata di raid alle 20: in vocale entro le 19:45, con cibo e pozioni
    - [X] <t:1796857200> [0m,0m,0] <@&11859044175622001>: Rifornire la banca della gilda prima del raid
    - [X] <@11859044175621002>: Pubblicare la formazione del raid
    - [X] <@&11859044175622001>: Esaminare le candidature di questa settimana
    - [X] {{wb=Foglio roster}} <@11859044175621002>: Raid di prova: Mirel, {{class=healer}} {{recruit=Mirel}}
    - [X] {{wb=Foglio roster}} <@11859044175621002>: Raid di prova: Thorn, {{class=tank}} {{recruit=Thorn}}
    - [] {{wb=Foglio roster}} <@11859044175621002>: Raid di prova: Vesk, {{class=mago}} {{recruit=Vesk}}
    - [] <@&11859044175622001>: Rispondere a ogni candidato, accettato o no
    - [] <@11859044175621001>: Pianificare l'evento delle feste della gilda
webhooks:
  - name: Foglio roster
    service: make
    trigger: both
    method: POST
    url: https://hook.us1.make.com/<id>
    headers: "Content-Type: application/json"
    body: |
      {"recruit": "{{recruit}}", "class": "{{class}}", "officer": "{{user}}", "state": "{{state}}", "when": "{{when}}", "list": "{{list}}"}
    setup: |
      In Make, Ava crea uno scenario con due moduli. Il primo è *Webhooks → Custom webhook*: Make genera il suo URL, quello qui sopra, e lei lo incolla in `/config webhook`. Il secondo è *Google Sheets → Add a row*, sul foglio della formazione della gilda.

      Make impara la forma dei dati da una prima richiesta. Ava preme **Run once** nello scenario, collega il webhook a un task di prova e lo spunta. Ora i campi `recruit`, `class`, `officer`, `state` e `when` si possono associare alle colonne del foglio. Make disattiva un webhook che resta cinque giorni senza scenario, quindi lo scenario viene prima.

      Senza un evento, il webhook scatta in entrambe le direzioni. Una prova spuntata per errore e riaperta aggiunge una seconda riga, con `reopened` nella colonna dello stato: il foglio le tiene entrambe.
settings:
  - setting: Mantieni lo stato dopo la selezione
    choice: Attivo
    why: "Leo fa tre prove di fila: **Proprietario** resta blu dopo ognuna."
  - setting: Modalità notifica
    choice: Elimina tutte le notifiche tranne le ultime due
    why: "#raid è molto attivo. Le ultime due notifiche restano sotto la lista e quelle più vecchie se ne vanno."
  - setting: Fuso orario
    choice: America/Chicago
    why: "Il raid è alle 20, ora di Chicago. Discord mostra l'ora nel fuso di ogni lettore, quindi un raider a Lisbona legge le 2 di notte."
  - setting: Promemoria ricorrenti
    choice: Ricorrenti attivati
    premium: true
    why: "Un promemoria per ogni raid fino a fine marzo, invece di uno nuovo ogni settimana."
week:
  - at: 2026-12-07T20:00
    text: "Ava aggiunge tre prove con **Aggiornamento in blocco** <img class=\"inline-ic\" src=\"/icons/edit.png\" alt=\"\" />, un task per recluta. Scrive anche i codici: `{{wb=Foglio roster}}` collega il webhook, `{{recruit=…}}` e `{{class=…}}` portano il nome e la classe."
  - at: 2026-12-08T19:00
    text: "Leo **prende** le tre prove. Preme **Proprietario** finché diventa blu, poi sceglie la prima prova, la seconda e la terza, senza scegliere nessuno. Con *Mantieni lo stato dopo la selezione*, **Proprietario** resta blu tra l'una e l'altra, e ogni task diventa suo."
    card: { kind: notice, type: claimed, by: "11859044175621002", task: "7" }
  - at: 2026-12-09T17:00
    text: "Il promemoria degli ufficiali menziona @Ufficiali in #raid. Kai rifornisce la banca della gilda e spunta il task."
  - at: 2026-12-09T19:30
    text: "Il promemoria del raid menziona @Raider in #raid, come risposta alla lista. Arriverà ogni mercoledì alle 19:30 fino a fine marzo."
    card: { kind: reminder, task: "1" }
  - at: 2026-12-09T22:40
    text: "La prova di Mirel è andata bene. Leo spunta il suo task e il webhook manda a Make la riga per il foglio della formazione."
    card: { kind: webhook, webhook: Foglio roster, task: "5", by: "11859044175621002" }
  - at: 2026-12-10T21:30
    text: "Thorn gioca una seconda prova giovedì, con un gruppo più piccolo. Leo la spunta: un'altra riga sul foglio."
fonte: 4f4c151799fb
---

## La prossima volta

Ogni lunedì, Ava prima sostituisce le prove finite con le nuove reclute, con **Aggiornamento in blocco**: non fa scattare nessun webhook, quindi il foglio non cambia. Poi preme **Riapri tutti** <img class="inline-ic" src="/icons/reopen.png" alt="" /> e sceglie **Nuova data**, con il mercoledì successivo alle 17: il promemoria della banca si sposta lì. Riaprire fa scattare i webhook di riapertura dei task che riapre, quindi le prove vengono per prime.

Nessuno spunta il raid: spuntare un task ferma il suo promemoria. Il promemoria del raid torna ogni mercoledì da solo. Vedi [Riapri tutti](/docs/list-actions/#reopen-all).

## Cosa TTM non fa qui

TTM non legge il gioco. Non ha iscrizioni ai raid, presenze, né tracciamento del bottino, e nemmeno un calendario con RSVP: lo fa un bot per pianificare i raid. TTM tiene il lavoro della gilda, avvisa il team dei raid in orario e manda al foglio quello che gli ufficiali decidono.

## Domande

### Perché `7d` e non `168h`?

Il 14 marzo 2027 a Chicago l'orologio avanza di un'ora. Con i giorni, il promemoria resta alle 19:30 dopo il cambio. Con le ore, arriverebbe alle 20:30, a raid già iniziato. Vedi [I campi della ripetizione](/docs/reminders/#the-repetition-fields).

### Come mando al foglio il proprietario del task?

`{{user}}` è chi spunta il task, che qui è Leo. Per mandare il proprietario anche quando spunta un altro ufficiale, scrivilo nel task come variabile libera, `{{owner=Leo}}`, e usa `{{owner}}` nel body. `{{task}}` porta il proprietario solo come codice Discord, `<@id>`, che un foglio non sa leggere. Vedi [Personalizzare i webhook con le variabili libere](/docs/tips/#personalize-webhooks-with-free-variables).

### Un raider può spuntare una prova?

No: ogni prova appartiene a Leo. Un raider che ci prova riceve un rifiuto che vede solo lui. Gli ufficiali che gestiscono i messaggi del canale possono, con *Gestire i messaggi*. Vedi [Chi può spuntare un task](/docs/core-concepts/#who-can-tick-a-task).
