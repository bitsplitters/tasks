---
title: Organizza un torneo della community senza un foglio di calcolo
seoTitle: Bot Discord per tornei ed eventi della community
name: Tornei ed eventi
description: "Una coppa del sabato con otto squadre: gli arbitri come proprietari, un promemoria che continua a chiamare le squadre mancanti, il ping ai commentatori prima della diretta e il vincitore annunciato da un webhook."
highlights: "Proprietari in un gruppo, il ruolo TTM dei commentatori, un promemoria ogni 15 minuti, spunte in diretta nell'Activity, il vincitore in una variabile libera, Clona lista per la settimana dopo."
intro: |
  Mia organizza la **Saturday Cup #12** sul suo server di gaming: otto squadre, quattro arbitri, due commentatori in diretta. Le squadre giocano da vari paesi. Lo staff ha una lista in #staff-torneo per la settimana da lunedì 7 a domenica 13 dicembre 2026: sabato la spunta in diretta, tutti insieme.
order: 3
team:
  guild: Fragline
  zone: Europe/London
  people:
    - { id: "11839044175621001", name: Mia, username: mia.fragline, color: "#f0b232", about: "Organizzatrice. Ha Gestisci messaggi nel canale dello staff." }
    - { id: "11839044175621002", name: Leo, username: leo.casts, color: "#3ba55c", about: "Commentatore." }
    - { id: "11839044175621003", name: Sam, username: sam.casts, color: "#5865f2", about: "Commentatore." }
    - { id: "11839044175621004", name: Noa, username: noa.ref, color: "#e74c3c", about: "Arbitra." }
    - { id: "11839044175621005", name: Kai, username: kai.ref, color: "#1abc9c", about: "Arbitro." }
    - { id: "11839044175621006", name: Zoe, username: zoe.ref, color: "#9b59b6", about: "Arbitra. In ritardo sabato." }
  roles:
    - { id: "11839044175622001", name: Arbitri, about: "Noa, Kai, Zoe e un altro." }
    - { id: "11839044175622002", name: TTM1, about: "Creato da TTM per la diretta, di proprietà di entrambi i commentatori.", members: ["11839044175621002", "11839044175621003"], ttm: true }
  channels:
    - { id: "11839044175623001", name: staff-torneo, about: "Il canale dello staff. La lista vive qui." }
    - { id: "11839044175623002", name: annunci, about: "Dove i giocatori leggono i risultati." }
    - { id: "11839044175623003", name: Palco principale, about: "Il canale vocale della diretta.", voice: true }
list:
  title: "Saturday Cup #12"
  channel: "11839044175623001"
  at: 2026-12-12T19:10
  look: |
    Sabato sera, dopo la finale. «Turno 1» non ha un proprietario: ogni partita appartiene al suo arbitro, quindi il gruppo si è spuntato da solo, con l'ultima partita. «Chiamare le squadre mancanti» mostra `↻15m ×3`: tre ping, a quindici minuti l'uno dall'altro. La variabile libera `{{winner=Team Nova}}` resta nel testo, dove l'ha letta il webhook.
  text: |
    - [X] <@11839044175621001>: Aprire le iscrizioni, con il [tabellone su Challonge](https://challonge.com/saturday_cup_12)
    - [X] <@&11839044175622001>: Controllare le formazioni delle otto squadre
    - [X] <t:1797080400> [0m,0m,0] <@&11839044175622001>: Aprire il check-in, dalle 13 alle 14
    - [X] <t:1797082200> [0m,15m,2] <@&11839044175622001>: Chiamare le squadre mancanti
    - [X] <t:1797085800> [0m,0m,0] <@&11839044175622002>: Andare in diretta nella chiamata Palco principale alle 15
    - [X] Turno 1, al meglio delle tre
     - [X] <@11839044175621004>: Partita A: Team Nova contro Pixel Pirates
     - [X] <@11839044175621005>: Partita B: Iron Owls contro Blue Shift
     - [X] <@11839044175621006>: Partita C: Night Foxes contro Glitch Gang
     - [X] <@11839044175621005>: Partita D: Red Comets contro Lumen Five
    - [X] <@&11839044175622001>: Arbitrare le semifinali e la finale
    - [X] {{wb=Risultati}} <@11839044175621001>: Pubblicare i risultati {{winner=Team Nova}}
    - [] <@&11839044175622002>: Caricare il replay della finale
    - [] <@11839044175621001>: Ringraziare le squadre e inviare il modulo di feedback
    - [] <@11839044175621001>: Aprire le iscrizioni per la Saturday Cup #13
webhooks:
  - name: Risultati
    service: discord
    trigger: completion
    method: POST
    url: https://discord.com/api/webhooks/<id>/<token>
    headers: "Content-Type: application/json"
    body: |
      {"content": "🏆 **{{winner}}** ha vinto {{list}}! GG a tutte e otto le squadre. Il tabellone resta su Challonge.", "allowed_mentions": {"parse": []}}
    postsAs: { name: Fragline Cups, channel: "11839044175623002", color: "#e67e22" }
    setup: |
      Apri le impostazioni di #annunci, poi *Integrazioni → Webhook → Nuovo webhook*. Chiamalo «Fragline Cups» e premi **Copia URL del webhook**: è l'URL qui sopra. Tienilo segreto, come una password.

      Due token scrivono il messaggio. `{{winner}}` viene dalla variabile libera nel task, `{{winner=…}}`, che Mia scrive quando la finale è finita. `{{list}}` è il titolo della lista: la lista della settimana prossima si chiama Saturday Cup #13 e lo stesso webhook nomina la nuova coppa.
settings:
  - setting: Fuso orario
    choice: Europe/London
    why: "La coppa si gioca all'ora di Londra. Discord mostra ogni data della lista nel fuso del lettore, quindi un arbitro a Toronto legge le sue ore. Quando un arbitro salva un promemoria, TTM propone il fuso della sua lingua di Discord finché non ne sceglie uno."
  - setting: Notifiche push leggibili
    choice: Attivo
    why: "Gli arbitri leggono i promemoria sul telefono. La push mostra il task, non una card vuota."
  - setting: Menziona i proprietari nelle liste nuove
    choice: Attivo
    why: "La lista della settimana prossima menziona @Arbitri e i commentatori appena viene pubblicata: sanno che la coppa c'è."
  - setting: Promemoria ricorrenti
    choice: Ricorrenti attivati
    premium: true
    why: "«Chiamare le squadre mancanti» avvisa ogni 15 minuti, fino a tre volte."
week:
  - at: 2026-12-07T19:00
    text: "Mia lancia `/crea-lista` in #staff-torneo e scrive i task di sabato, con @Arbitri come proprietario dei lavori che può fare qualsiasi arbitro, scritto come `@Arbitri:` ([Modificare una lista a mano](/docs/writing-a-list/#owners-the-mention-with-a-colon) spiega come). Incolla il link del tabellone di Challonge. La prima notifica menziona @Arbitri, così ogni arbitro viene avvisato."
  - at: 2026-12-08T20:30
    text: "Mia assegna «Andare in diretta» a Leo e Sam insieme: sceglie entrambi nel menu sotto **Proprietario**. TTM crea il ruolo **TTM1** per i due e lo rende proprietario. Un proprietario di più persone è una funzione [Premium](/premium/), sbloccata per tutti i server durante la Beta."
  - at: 2026-12-09T21:00
    text: "Mia aggiunge i promemoria con **Promemoria**: il check-in alle 13 per @Arbitri, «Chiamare le squadre mancanti» alle 13:30 ogni 15 minuti (3 volte in tutto) e la diretta alle 14:30 per TTM1."
  - at: 2026-12-12T13:00
    text: "Il promemoria del check-in menziona @Arbitri in #staff-torneo. Kai apre il check-in e spunta il task."
  - at: 2026-12-12T13:30
    text: "«Chiamare le squadre mancanti» avvisa @Arbitri. Mancano due squadre: Noa scrive ai loro capitani. Alle 13:45 il ping torna."
  - at: 2026-12-12T13:52
    text: "L'ultima squadra fa il check-in e Noa spunta «Chiamare le squadre mancanti». Spuntare un task ferma il suo promemoria: il ping delle 14:00 non arriva mai."
  - at: 2026-12-12T14:30
    text: "Il promemoria della diretta menziona TTM1, così Leo e Sam lo ricevono entrambi."
    card: { kind: reminder, task: "5" }
  - at: 2026-12-12T14:40
    text: "Mia apre la lista con **Activity** <img class=\"inline-ic\" src=\"/icons/activity.png\" alt=\"\" />, il primo pulsante sotto di essa. Gli arbitri entrano con **Entra nell'Activity** e ognuno spunta la sua partita quando finisce. Zoe è in ritardo: dal pannello di «Partita C», Mia le assegna la partita."
  - at: 2026-12-12T15:35
    text: "Noa finisce la Partita A e tocca la casella dell'intero «Turno 1». Un fumetto dice di no: spuntare il gruppo spunterebbe anche le partite di Kai e Zoe. Mia potrebbe, con *Gestisci messaggi* sul canale. Aspetta invece: quando Kai spunta la Partita D, l'ultima, il gruppo si spunta da solo."
  - at: 2026-12-12T18:45
    text: "Il Team Nova vince la finale. Mia scrive `{{winner=Team Nova}}` in «Pubblicare i risultati» con **Contenuto**, poi spunta il task. Il webhook posta il vincitore in #annunci."
    card: { kind: webhook, webhook: Risultati, task: "8", by: "11839044175621001" }
  - at: 2026-12-12T19:05
    text: "L'ultimo arbitro esce dall'Activity. La lista torna in #staff-torneo con un riepilogo, una riga per ogni modifica con chi l'ha fatta. Il riepilogo menziona Zoe, che ha ricevuto la Partita C dentro l'Activity: le menzioni di una sessione arrivano con essa."
fonte: b260b9b17faa
---

## La prossima volta

Domenica, Mia apre **Altro** <img class="inline-ic" src="/icons/other.png" alt="" /> e preme **Clona lista**: stesso canale, senza le spunte e senza i promemoria. Con **Aggiornamento in blocco** cambia il titolo in Saturday Cup #13, il link del tabellone e le partite, poi toglie `{{winner=Team Nova}}`. Poi dà le date del prossimo sabato con **Promemoria**. Il clone menziona @Arbitri e TTM1 nella sua prima notifica. Vedi [Clona lista](/docs/list-actions/#clone).

La coppa della settimana scorsa resta come resoconto. Per liberarne il posto, Mia può **Sigilla lista**, sempre in **Altro**: il messaggio resta, senza pulsanti.

## Cosa TTM non fa qui

TTM non gestisce i tabelloni, non tiene i punteggi e non fa il check-in delle squadre: lo fanno Challonge e start.gg. Non fa nemmeno la diretta. TTM tiene il lavoro dello staff in un solo posto, avvisa le persone giuste al minuto giusto e annuncia il risultato che scrivi.

## Domande

### Perché Noa non ha potuto spuntare il Turno 1?

Un gruppo si porta dietro i suoi subtask. Spuntarlo avrebbe spuntato le partite di Kai e Zoe: possono farlo solo i loro proprietari, oppure chi ha *Gestisci messaggi* sul canale. Vedi [Chi può spuntare un task](/docs/core-concepts/#who-can-tick-a-task).

### E se nessuno spunta «Chiamare le squadre mancanti»?

Avvisa tre volte in tutto, alle 13:30, alle 13:45 e alle 14:00, poi si ferma. Lo dice il badge `↻15m ×3`. Vedi [Promemoria ripetuti](/docs/reminders/#repeating-reminders).

### I commentatori ricevono il promemoria della diretta in messaggio diretto?

No. TTM1 è un ruolo e un promemoria per un ruolo è un messaggio nel canale della lista che lo menziona, così Discord avvisa tutti quelli del ruolo. Assegna il task a un solo commentatore per mandarlo in messaggio diretto. Vedi [Come arriva il promemoria](/docs/reminders/#how-the-reminder-arrives).
