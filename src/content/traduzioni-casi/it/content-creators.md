---
title: Pianifica i tuoi video con chi li realizza
seoTitle: "Bot Discord per content creator: la pipeline dei tuoi video"
name: Content creator
description: "Un video a settimana con un montatore e un'artista delle miniature: un promemoria della scadenza che segue il lavoro quando qualcuno è assente, il ping ai moderatori prima della première e il nuovo video annunciato da un webhook."
highlights: "Task assegnati a un altro, un promemoria che segue il nuovo proprietario, una revisione di due persone, un link mailto, un webhook che annuncia il video, Download e importazione."
intro: |
  Mia fa un video a settimana per il suo canale. Leo monta, Sam disegna le miniature e i moderatori del server gestiscono la chat durante la première. Il video di questa settimana parla di una minuscola scrivania costruita in un weekend. La lista vive in #produzione, da lunedì 7 a domenica 13 dicembre 2026, con la première sabato alle 18.
order: 6
team:
  guild: Mia Makes
  zone: America/Toronto
  people:
    - { id: "11869044175621001", name: Mia, username: mia.makes, color: "#f0b232", about: "Creator. Scrive la lista." }
    - { id: "11869044175621002", name: Leo, username: leo.edits, color: "#3ba55c", about: "Montatore. Assente da martedì a giovedì." }
    - { id: "11869044175621003", name: Sam, username: sam.thumbs, color: "#5865f2", about: "Miniature. Monta anche lui." }
  roles:
    - { id: "11869044175622001", name: Moderatori, about: "Quattro moderatori del server." }
    - { id: "11869044175622002", name: TTM1, about: "Creato da TTM per la revisione finale, di proprietà di Leo e Sam.", members: ["11869044175621002", "11869044175621003"], ttm: true }
  channels:
    - { id: "11869044175623001", name: produzione, about: "Il team e i moderatori. La lista vive qui." }
    - { id: "11869044175623002", name: annunci, about: "Dove i membri scoprono i nuovi video." }
list:
  title: "Episodio 42: la scrivania minuscola"
  channel: "11869044175623001"
  at: 2026-12-11T20:00
  look: |
    Venerdì sera: il video è pronto. Il primo montaggio e la correzione colore ora sono di Sam, con il promemoria del montaggio. «Revisione finale» è di TTM1, il ruolo che TTM ha creato per Leo e Sam. Il link del video aspetta in `{{video=…}}`, perché il webhook lo legga sabato.
  text: |
    - [X] <@11869044175621001>: Scrivere lo [script](https://docs.google.com/document/d/1tiny-desk-script/edit)
    - [X] <@11869044175621001>: Girare la costruzione, con entrambe le camere
    - [X] <@11869044175621001>: [Chiedere allo sponsor di approvare la lettura della pubblicità](mailto:partners@example.com?subject=Episode%2042%20ad%20read)
    - [X] <t:1796922000> [0m,0m,0] <@11869044175621003>: Primo montaggio, circa 12 minuti
    - [X] <@11869044175621003>: Correzione colore e audio
    - [X] <@11869044175621003>: Miniatura, tre opzioni tra cui scegliere
    - [X] <@&11869044175622002>: Revisione finale
    - [] <t:1797112800> [0m,0m,0] <@&11869044175622001>: Première alle 18: fissare il link e guardare la chat
    - [] {{wb=Nuovo video}} <@11869044175621001>: Pubblicare il video {{video=https://youtu.be/tinydesk42}}
    - [] <@11869044175621001>: Rispondere ai primi commenti
webhooks:
  - name: Nuovo video
    service: discord
    trigger: completion
    method: POST
    url: https://discord.com/api/webhooks/<id>/<token>
    headers: "Content-Type: application/json"
    body: |
      {"content": "Nuovo video: **Ho costruito una scrivania minuscola in un weekend**\n{{video}}", "allowed_mentions": {"parse": []}}
    postsAs: { name: Mia Makes, channel: "11869044175623002", color: "#f0b232" }
    setup: |
      Apri le impostazioni di #annunci, poi *Integrazioni → Webhook → Nuovo webhook*. Chiamalo «Mia Makes», dagli l'immagine del canale e premi **Copia URL del webhook**: è l'URL qui sopra. Tienilo segreto, come una password.

      Il link arriva dal task: `{{video}}` legge la variabile libera `{{video=…}}`. Mia scrive il link con **Contenuto** appena YouTube glielo dà, prima della première. La settimana prossima cambia il titolo nel body con `/config webhook azione:modifica`, oppure lo sposta nel task, come `{{title=…}}`.
settings:
  - setting: Suggerimenti
    choice: Disattivati
    why: "Il team conosce i pulsanti. Senza il Tutorial e la riga di aiuto, la lista è più corta."
  - setting: Notifiche push leggibili
    choice: Attivo
    why: "Sam legge i promemoria sul telefono. La push mostra il task, non una card vuota."
  - setting: Task completati in secondo piano
    choice: Attivo
    why: "Venerdì la maggior parte della lista è fatta. I task spuntati sbiadiscono e la première risalta."
week:
  - at: 2026-12-07T10:00
    text: "Mia lancia `/crea-lista` in #produzione e scrive la settimana, proprietari compresi. La prima notifica menziona Leo, Sam e @Moderatori, così ognuno sa cosa è suo. Il link dello sponsor apre una nuova email, con l'oggetto già scritto."
  - at: 2026-12-07T10:30
    text: "Mia assegna «Revisione finale» a Leo e Sam insieme: sceglie entrambi nel menu sotto **Proprietario**. TTM crea per loro il ruolo **TTM1** e lo rende proprietario. Un proprietario di più persone è una funzione [Premium](/premium/), sbloccata per tutti i server durante la Beta."
  - at: 2026-12-08T09:00
    text: "Leo è assente fino a giovedì sera. Mia **assegna** i suoi due task a Sam: sceglie Sam nel menu sotto **Proprietario**, conferma, poi sceglie «Primo montaggio». Lo rifà per la correzione colore. La notifica nomina Leo e menziona Sam, così Discord lo avvisa."
    card: { kind: notice, type: updated, by: "11869044175621001", from: "11869044175621002", task: "4" }
  - at: 2026-12-10T12:00
    text: "La scadenza del primo montaggio arriva a Sam in messaggio diretto. Non va più a Leo: un promemoria segue il proprietario del suo task."
    card: { kind: reminder, task: "4" }
  - at: 2026-12-10T16:30
    text: "Sam finisce il montaggio e lo spunta."
  - at: 2026-12-11T17:00
    text: "Leo è tornato. Lui e Sam guardano il video insieme e Leo spunta «Revisione finale»: può farlo uno qualsiasi dei due, perché hanno entrambi TTM1."
  - at: 2026-12-12T17:00
    text: "Il promemoria della première menziona @Moderatori in #produzione, come risposta alla lista. Un'ora prima: il promemoria è alle 17."
    card: { kind: reminder, task: "8" }
  - at: 2026-12-12T18:00
    text: "La première inizia. Mia spunta «Pubblicare il video» e il webhook posta il link in #annunci."
    card: { kind: webhook, webhook: Nuovo video, task: "9", by: "11869044175621001" }
fonte: 2c58269841f3
---

## La prossima volta

Dopo questo video, Mia preme **Download** <img class="inline-ic" src="/icons/download.png" alt="" /> in **Altro** <img class="inline-ic" src="/icons/other.png" alt="" />: TTM le manda la lista come file `.txt`, con proprietari, tag, promemoria e webhook. Per ogni nuovo video cambia il file, i titoli, i link e rimette `[X]` a `[]`, poi lancia `/crea-lista` e lo allega. Un promemoria con la data passata torna senza scattare, quindi a ognuno dà la nuova data con **Promemoria**. Vedi [Riusare una lista ovunque](/docs/tips/#reuse-a-list-anywhere).

TTM1 resta finché una lista lo usa. Se Mia elimina prima la vecchia lista, TTM elimina il ruolo e l'importazione di un file che lo nomina si ferma ed elenca il ruolo mancante: lei tiene la vecchia lista finché la nuova non è dentro.

## Cosa TTM non fa qui

TTM non carica, non programma, non monta video e non legge le statistiche del tuo canale. Non conserva file: il montaggio e le miniature vivono nel tuo cloud e la lista rimanda a loro. TTM tiene il lavoro della settimana, le scadenze e le persone.

## Domande

### E se Mia avesse tolto Leo invece di assegnare i suoi task a Sam?

Il promemoria se ne sarebbe andato con lui: un promemoria senza proprietario non raggiunge nessuno. Se non è ancora scattato, TTM chiede prima: puoi chiudere la finestra per tenere tutto. Vedi [Proprietario](/docs/channel-tasks/#owner).

### Perché Sam ha ricevuto una menzione e Mia no?

Una notifica menziona chi riceve un task da qualcun altro. Sam ha ricevuto i task di Leo da Mia. Chi agisce non viene mai menzionato: lo sa già. Vedi [Proprietari e tag](/docs/owners-and-tags/).

### Il promemoria della première può arrivare prima, o due volte?

Il promemoria arriva alla data che dai, quindi un'ora prima significa le 17. Per avvisare i moderatori due volte, un'ora prima e dieci minuti prima, rendilo ripetuto: dalle 17, ogni 50 minuti, due volte in tutto. I promemoria ripetuti sono una funzione [Premium](/premium/), sbloccata per tutti i server durante la Beta. Vedi [Promemoria ripetuti](/docs/reminders/#repeating-reminders).
