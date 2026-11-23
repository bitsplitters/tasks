---
title: Tieni il tuo team di moderatori sulla stessa pagina
seoTitle: "Bot Discord per gestire lo staff: task per il tuo team di moderatori"
name: Staff e moderatori
description: "La settimana di un team di moderazione in una sola lista: di proprietà di un ruolo, un promemoria di riunione che si ripete, due nuovi helper che condividono un task e un annuncio quando cambiano le regole."
highlights: "Un ruolo come proprietario, il rifiuto per chi non lo è, un ruolo che TTM crea per due persone, un promemoria ricorrente, un webhook con una variabile libera, il thread della cronologia."
intro: |
  Ava guida i moderatori di **Lumen Lounge**, un server di circa 4000 membri. I lavori dello staff si ripetono ogni settimana, e due nuovi helper, Kai e Zoe, iniziano lunedì. Questa è la prima settimana del team con TTM, da lunedì 7 a domenica 13 dicembre 2026.
order: 2
team:
  guild: Lumen Lounge
  zone: America/New_York
  people:
    - { id: "11829044175621001", name: Ava, username: ava.lumen, color: "#eb459e", about: "Responsabile dei moderatori, e moderatrice lei stessa." }
    - { id: "11829044175621002", name: Leo, username: leo.lumen, color: "#3ba55c", about: "Moderatore." }
    - { id: "11829044175621003", name: Noa, username: noa.lumen, color: "#e67e22", about: "Helper." }
    - { id: "11829044175621004", name: Kai, username: kai.lumen, color: "#1abc9c", about: "Nuovo helper, da lunedì." }
    - { id: "11829044175621005", name: Zoe, username: zoe.lumen, color: "#9b59b6", about: "Nuova helper, da lunedì." }
  roles:
    - { id: "11829044175622001", name: Moderatori, about: "Ava, Leo e altri tre." }
    - { id: "11829044175622002", name: Helper, about: "Noa, e da lunedì Kai e Zoe." }
    - { id: "11829044175622003", name: Admin, about: "I proprietari del server." }
    - { id: "11829044175622004", name: TTM1, about: "Creato da TTM per un task di proprietà di due persone.", members: ["11829044175621004", "11829044175621005"], ttm: true }
  channels:
    - { id: "11829044175623001", name: staff, about: "Privato per lo staff. La lista vive qui." }
    - { id: "11829044175623002", name: regole, about: "Le regole del server." }
    - { id: "11829044175623003", name: annunci, about: "Dove ogni membro legge le novità." }
list:
  title: "Team moderatori: settimana 50"
  channel: "11829044175623001"
  at: 2026-12-09T21:00
  look: |
    Quasi ogni task appartiene a @Moderatori: qualsiasi moderatore può spuntarlo. «Affiancare un moderatore per un giorno» appartiene a @TTM1, il ruolo che TTM ha creato per Kai e Zoe. Il promemoria della riunione mostra `↻7d ×4`: ogni 7 giorni, 4 volte in tutto.
  text: |
    - [X] <@&11829044175622001>: Esaminare le segnalazioni aperte
    - [] <@&11829044175622001>: Svuotare la coda dei moderatori
    - [X] <@&11829044175622001>: Controllare il log di AutoMod
    - [] <t:1796688000> [0m,7d,3] <@&11829044175622001>: Riunione dello staff, lunedì alle 19 nel canale vocale Staff
    - [X] {{wb=Regole cambiate}} <@&11829044175622001>: Aggiornare le regole in <#11829044175623002> {{change=Gli spoiler restano nei canali spoiler per due settimane dopo un'uscita}} <@&11829044175622003>
    - [X] <@&11829044175622004>: Affiancare un moderatore per un giorno
    - [] <@11829044175621001>: Dare il benvenuto ai nuovi helper
     - [X] Dare a Kai e Zoe il ruolo Helper
     - [] Spiegare loro gli strumenti di moderazione
    - [] <@&11829044175622001>: Pubblicare gli appunti della riunione per chi l'ha persa
    - [] <@&11829044175622001>: Pianificare l'evento della community della prossima settimana
    - [] <@&11829044175622001>: Ringraziare i membri che hanno aiutato questa settimana
webhooks:
  - name: Regole cambiate
    service: discord
    trigger: completion
    method: POST
    url: https://discord.com/api/webhooks/<id>/<token>
    headers: "Content-Type: application/json"
    body: |
      {"content": "**Le regole sono cambiate.** {{change}}.\nLeggi la nuova versione in <#11829044175623002>.", "allowed_mentions": {"parse": []}}
    postsAs: { name: Lumen Staff, channel: "11829044175623003", color: "#5865f2" }
    setup: |
      Apri le impostazioni di #annunci, poi *Integrazioni → Webhook → Nuovo webhook*. Chiamalo «Lumen Staff» e premi **Copia URL del webhook**: è l'URL qui sopra. Tienilo segreto, come una password.

      Il body non dice cosa è cambiato: lo dice `{{change}}`, dalla variabile libera scritta nel task, `{{change=…}}`. La prossima volta che le regole cambiano, il moderatore scrive la nuova modifica nel task con **Contenuto**, e lo stesso webhook la comunica. `allowed_mentions` con un `parse` vuoto impedisce al messaggio di avvisare qualcuno.
settings:
  - setting: Modalità notifica
    choice: Elimina tutte le notifiche tranne l'ultima
    why: "#staff è dove parla il team. Sotto la lista resta solo l'ultima notifica, così la conversazione resta leggibile."
  - setting: Tracciamento cronologia
    choice: Attivo
    why: "Il thread della lista tiene una riga per azione, con chi l'ha fatta: Ava legge la settimana lì, non nel canale."
  - setting: Mantieni lo stato dopo la selezione
    choice: Attivo
    why: "Ava sceglie @Moderatori una volta e lo assegna a più task di fila: **Proprietario** resta blu dopo ognuno."
  - setting: Promemoria ricorrenti
    choice: Ricorrenti attivati
    premium: true
    why: "La riunione dello staff è ogni lunedì: un promemoria che si ripete, invece di uno nuovo ogni settimana."
  - setting: Sincronizza permessi
    choice: Caricati
    why: "In *Impostazioni del server → Integrazioni*, solo i ruoli dello staff possono usare TTM. Un membro che finisce in #staff per errore vede la lista in sola lettura."
week:
  - at: 2026-12-07T09:00
    text: "Ava scrive la lista della settimana in #staff con `/crea-lista`, senza proprietari."
  - at: 2026-12-07T09:10
    text: "Ava sceglie @Moderatori nel menu sotto **Proprietario**, poi i task uno dopo l'altro. Con *Mantieni lo stato dopo la selezione*, **Proprietario** resta blu tra l'uno e l'altro, quindi ogni task prende il ruolo con un clic. Ogni notifica menziona @Moderatori; con *Elimina tutte le notifiche tranne l'ultima*, resta solo l'ultima."
  - at: 2026-12-07T10:30
    text: "Ava assegna «Affiancare un moderatore per un giorno» a Kai e Zoe insieme: sceglie entrambi nel menu. TTM crea il ruolo **TTM1**, lo dà a tutti e due e lo rende proprietario. La notifica menziona il ruolo, così vengono avvisati entrambi. Un proprietario di più persone è una funzione [Premium](/premium/), sbloccata per tutti i server durante la Beta."
    card: { kind: notice, type: assigned, by: "11829044175621001", task: "6" }
  - at: 2026-12-07T19:00
    text: "Arriva il promemoria della riunione. Il proprietario è un ruolo, quindi il promemoria è un messaggio in #staff che menziona @Moderatori, come risposta alla lista."
    card: { kind: reminder, task: "4" }
  - at: 2026-12-08T11:00
    text: "Leo aggiorna le regole e spunta il task. Il webhook posta la modifica in #annunci, con il testo della variabile libera."
    card: { kind: webhook, webhook: Regole cambiate, task: "5", by: "11829044175621002" }
  - at: 2026-12-08T15:20
    text: "Noa, un'helper, prova a spuntare «Esaminare le segnalazioni aperte». Il task appartiene a @Moderatori, quindi riceve un rifiuto che vede solo lei: *Questo task può spuntarlo o riaprirlo solo @Moderatori, oppure chi gestisce i messaggi di questo canale.* La lista non cambia."
  - at: 2026-12-08T15:30
    text: "Leo esamina le segnalazioni e spunta il task: può farlo qualsiasi membro del ruolo."
  - at: 2026-12-09T18:00
    text: "Kai e Zoe passano la giornata con Leo. La sera Kai spunta il loro task: può farlo uno qualsiasi dei due, perché hanno entrambi TTM1."
  - at: 2026-12-11T17:00
    text: "Ava apre il thread della lista. Ha una riga per ogni proprietario, spunta e modifica della settimana, con chi l'ha fatta."
  - at: 2026-12-11T17:15
    text: "Ava vuole tenere TTM1 per le prossime prove. In *Impostazioni del server → Ruoli* lo rinomina «Helper in prova»: da quel momento è uno dei ruoli del server e TTM non lo elimina mai. Senza il nuovo nome, TTM eliminerebbe il ruolo quando nessuna lista lo usa più."
fonte: 00ff5b6fd601
---

## La prossima volta

Ogni lunedì, Ava preme **Riapri tutti** <img class="inline-ic" src="/icons/reopen.png" alt="" /> e sceglie **Riapri**: i task ricominciano con i loro proprietari. Nessuno spunta la riunione dello staff, perché spuntare un task ferma il suo promemoria: resta nella lista tutto il mese, e il suo promemoria torna ogni lunedì da solo. Una lista con promemoria singoli userebbe invece **Nuova data**, che li sposta subito alla nuova settimana. Vedi [Riapri tutti](/docs/list-actions/#reopen-all).

## Cosa TTM non fa qui

TTM non modera. Non ha ban, avvisi, registri dei casi o ticket: li gestiscono un bot di moderazione e un bot per i ticket. TTM tiene il lavoro intorno a loro, i compiti che il tuo team ripete ogni settimana. Non tiene traccia dei turni né misura quanto è attivo ogni moderatore.

## Domande

### Chi può spuntare un task di proprietà di un ruolo?

Qualsiasi membro del ruolo, e chi ha *Gestire i messaggi* sul canale. Tutti gli altri ricevono un rifiuto che vedono solo loro: vedi [Chi può spuntare un task](/docs/core-concepts/#who-can-tick-a-task).

### Un moderatore può ricevere il promemoria in messaggio diretto?

Sì: rendi proprietario quel moderatore invece del ruolo. Un promemoria raggiunge una persona in messaggio diretto, e un ruolo con una menzione nel canale. Vedi [Come arriva il promemoria](/docs/reminders/#how-the-reminder-arrives).

### Cosa succede a TTM1 se nessuno lo rinomina?

TTM elimina un ruolo che ha creato quando nessuna lista lo usa più, controllando ogni dieci minuti. Rinominarlo, dargli un permesso o cambiarne i membri lo rende uno dei ruoli del tuo server, e TTM lo lascia stare. Vedi [I ruoli che TTM crea](/docs/owners-and-tags/#the-roles-ttm-creates).
