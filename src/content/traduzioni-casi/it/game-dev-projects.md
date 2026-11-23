---
title: Porta il tuo gioco al traguardo con il team con cui già parli
seoTitle: Bot Discord per la gestione di progetti di game dev
name: Progetti di game dev
description: "Tre sviluppatori e i loro tester, una milestone alla volta: un passaggio di consegne quando qualcuno si ammala, la build di playtest avviata su GitHub Actions da una spunta e il ping ai tester nel giorno del playtest."
highlights: "Una milestone per gruppo, un task preso a un altro, un promemoria che segue il nuovo proprietario, un webhook che avvia una build su GitHub Actions, la riunione settimanale nell'Activity."
intro: |
  Ava, Leo e Sam fanno **Lantern Keep**, un piccolo roguelike, nelle loro serate. Ava scrive il codice, Leo disegna, Sam compone la musica. Cinque giocatori della loro community provano ogni build. La lista vive in #dev da quando è iniziato il progetto; questa è la settimana da lunedì 7 a domenica 13 dicembre 2026, con un playtest venerdì.
order: 4
team:
  guild: Lantern Keep
  zone: Europe/Stockholm
  people:
    - { id: "11849044175621001", name: Ava, username: ava.codes, color: "#eb459e", about: "Codice. Guida il progetto." }
    - { id: "11849044175621002", name: Leo, username: leo.draws, color: "#3ba55c", about: "Grafica." }
    - { id: "11849044175621003", name: Sam, username: sam.sound, color: "#5865f2", about: "Musica e suoni. Malato questa settimana." }
  roles:
    - { id: "11849044175622001", name: Tester, about: "Cinque giocatori della community." }
  channels:
    - { id: "11849044175623001", name: dev, about: "Il canale del team; i tester possono leggerlo. La lista vive qui." }
    - { id: "11849044175623002", name: devlog, about: "Dove i giocatori leggono le novità del gioco." }
    - { id: "11849044175623003", name: playtest, about: "Dove i tester segnalano i bug." }
list:
  title: "Lantern Keep: 0.4 e 0.5"
  channel: "11849044175623001"
  at: 2026-12-10T19:00
  spaced: true
  look: |
    Ogni milestone è un gruppo, con una riga vuota intorno. Quello che è fatto sbiadisce, quindi risalta quello che resta della 0.4: il playtest. «Mixare la musica del trailer» ora è di Ava, con il suo promemoria. Il webhook di «Creare la build di playtest» non si vede; `{{version=0.4.0}}` sì, e la build l'ha letta.
  text: |
    - [] Milestone 0.4: il playtest
     - [X] <@11849044175621001>: Pesca: lancio, attesa, recupero
     - [X] <@11849044175621002>: Sprite per i sei pesci
     - [X] <@11849044175621001>: Correggere i bug dell'ultimo playtest, nel [report dei tester](https://discord.com/channels/1184904417562000000/11849044175623003/1184904417562399001)
     - [X] {{wb=Build playtest}} <@11849044175621001>: Creare la build di playtest {{version=0.4.0}}
     - [] <t:1797008400> [0m,0m,0] <@&11849044175622001>: Playtest alle 18, poi segnalare in <#11849044175623003>
    - [] Milestone 0.5: il trailer
     - [] <t:1797073200> [0m,0m,0] <@11849044175621001>: Mixare la musica del trailer
     - [] <@11849044175621002>: Catturare le clip di gioco
     - [] <@11849044175621003>: Effetti sonori per la pesca
     - [] <@11849044175621002>: Montare il trailer, 45 secondi
    - [] <@11849044175621001>: Pianificare la milestone 0.6 nel [design doc](https://docs.google.com/document/d/1lantern-keep-design/edit)
    - [] <@11849044175621001>: Pubblicare il devlog in <#11849044175623002>
webhooks:
  - name: Build playtest
    service: github
    trigger: completion
    method: POST
    url: https://api.github.com/repos/lantern-keep/game/actions/workflows/playtest.yml/dispatches
    headers: |
      Accept: application/vnd.github+json
      Authorization: Bearer <your token>
      X-GitHub-Api-Version: 2026-03-10
      Content-Type: application/json
    body: |
      {"ref": "main", "inputs": {"version": "{{version}}", "requested_by": "{{user}}"}}
    setup: |
      Il workflow che compila il gioco parte con `workflow_dispatch` e dichiara i due input che il body invia. Deve stare sul ramo predefinito del repository:

      ```yaml
      on:
        workflow_dispatch:
          inputs:
            version:
              required: true
            requested_by:
              required: false
      ```

      I passaggi poi leggono `${{ inputs.version }}`. Il token va nell'header `Authorization`. Ava crea un personal access token *fine-grained* in *GitHub → Settings → Developer settings*, limitato a questo solo repository, con il solo permesso *Actions*, in lettura e scrittura. Un token trapelato può avviare una build e nient'altro.

      L'evento è solo il completamento: riaprire il task per errore non avvia una seconda build.
settings:
  - setting: Task completati in secondo piano
    choice: Attivo
    why: "Le parti già fatte di una milestone sbiadiscono e risalta quello che resta."
  - setting: Spazi tra i gruppi
    choice: Attivo
    why: "Ogni milestone è un gruppo: una riga vuota mostra dove finisce una e inizia la successiva."
week:
  - at: 2026-12-07T20:00
    text: "Ava aggiunge la milestone 0.5 con **Aggiornamento in blocco** <img class=\"inline-ic\" src=\"/icons/edit.png\" alt=\"\" />: il trailer, in quattro task, ciascuno con il suo proprietario."
  - at: 2026-12-08T09:15
    text: "Sam è malato per tutta la settimana e la musica del trailer è in scadenza sabato. Ava gli **prende** «Mixare la musica del trailer»: preme **Proprietario**, sceglie sé stessa nel menu, conferma, poi sceglie il task. Scegliere solo il task non basterebbe: sostituire un proprietario richiede una scelta esplicita. La notifica nomina Sam e non menziona nessuno, perché Ava lo sa. Il promemoria del task ora va a lei."
    card: { kind: notice, type: updated, by: "11849044175621001", from: "11849044175621003", task: "2.1" }
  - at: 2026-12-09T20:00
    text: "La riunione settimanale, in chiamata vocale. Ava apre la lista con **Activity** <img class=\"inline-ic\" src=\"/icons/activity.png\" alt=\"\" /> e Leo entra con **Entra nell'Activity**. Con **Modifica la lista** spostano le correzioni dei bug prima della build e aggiungono il link al report dei tester. Mentre lei modifica, tutta la lista è bloccata per Leo: le caselle tornano quando lei salva."
  - at: 2026-12-10T18:30
    text: "I bug sono corretti. Ava spunta «Creare la build di playtest» e il webhook avvia la build su GitHub Actions, con la versione scritta nel task."
    card: { kind: webhook, webhook: Build playtest, task: "1.4", by: "11849044175621001" }
  - at: 2026-12-11T18:00
    text: "Il promemoria dei tester arriva in #dev, come risposta alla lista, e menziona @Tester. Uno qualsiasi di loro può spuntare il playtest dopo aver giocato e segnalato."
    card: { kind: reminder, task: "1.5" }
  - at: 2026-12-12T12:00
    text: "Il promemoria della musica del trailer raggiunge Ava in messaggio diretto, non Sam: un promemoria segue il proprietario del suo task."
    card: { kind: reminder, task: "2.1" }
fonte: 5d4a644822b2
---

## La prossima volta

Quando la 0.4 è fatta, Ava preme **Pulisci lista**: la milestone finita se ne va, con i suoi subtask, e la 0.5 sale. Con **Aggiornamento in blocco** scrive sotto la 0.6, partendo dal design doc. Il webhook resta sul server: lo collega al prossimo task di build con **Webhook** <img class="inline-ic" src="/icons/api.png" alt="" />, oppure scrive `{{wb=Build playtest}}` e `{{version=0.5.0}}` nel testo. Vedi [Pulisci lista](/docs/list-actions/#clean).

## Cosa TTM non fa qui

TTM non è un issue tracker. Non legge il tuo repository, non chiude le issue e non mostra un burndown: lo fanno GitHub, GitLab e Jira. Avvia la build e non ne aspetta il risultato. Se il team vuole il risultato su Discord, il workflow può postarlo in un canale con un webhook Discord suo.

## Domande

### Perché Ava non ha semplicemente scelto il task per prenderlo?

Scegliere un task senza aver scelto nessuno lo prende solo se è libero. Un task di cui qualcun altro è proprietario resta suo, e TTM dice perché. Per sostituire un proprietario, prima scegli quello nuovo nel menu. Vedi [Proprietario](/docs/channel-tasks/#owner).

### Riaprire il task avvia un'altra build?

No. Il webhook è stato creato con `evento:completamento`, quindi lo fa scattare solo il completamento. Senza un evento, scatterebbe in entrambi i casi. Vedi [Quando scatta un webhook](/docs/webhooks/#when-a-webhook-fires).

### Un tester può spuntare il playtest?

Sì: il task appartiene a @Tester, quindi può spuntarlo qualsiasi membro del ruolo. Può farlo anche Ava, con *Gestire i messaggi* sul canale. Vedi [Chi può spuntare un task](/docs/core-concepts/#who-can-tick-a-task).
