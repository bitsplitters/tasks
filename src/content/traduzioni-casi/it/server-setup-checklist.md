---
title: Configura un server Discord senza saltare un passaggio
seoTitle: Checklist per configurare un server Discord, passo dopo passo
name: Checklist di configurazione del server
description: "Due persone aprono un server community in una settimana: una sola lista per ruoli, regole, sicurezza e benvenuto, un promemoria prima dell'apertura e un annuncio che si pubblica da solo."
highlights: "Proprietari che prendi o assegni, tag dei canali, un promemoria in messaggio diretto, un webhook che pubblica l'annuncio di apertura, l'Activity la sera dell'apertura."
intro: |
  Ava sta aprendo **Pixel Harbor**, un server community per pixel artist, sabato sera. Leo, un amico che modera un altro server, la aiuta. Hanno una settimana (da lunedì 7 a domenica 13 dicembre 2026) e una lista in un canale privato che vedono solo loro due.
order: 1
team:
  guild: Pixel Harbor
  zone: Europe/Berlin
  people:
    - { id: "11819044175621001", name: Ava, username: ava.pixels, color: "#eb459e", about: "Proprietaria del server. Crea la lista." }
    - { id: "11819044175621002", name: Leo, username: leo.mod, color: "#3ba55c", about: "Moderatore. Nuovo in TTM." }
  roles:
    - { id: "11819044175622001", name: Admin, about: "Ava e Leo: i lavori che può fare uno qualsiasi dei due.", members: ["11819044175621001", "11819044175621002"] }
  channels:
    - { id: "11819044175623001", name: setup, about: "Privato: lo vedono solo Ava e Leo. La lista vive qui." }
    - { id: "11819044175623002", name: regole, about: "Le regole del server." }
    - { id: "11819044175623003", name: benvenuto, about: "Dove arrivano i nuovi membri." }
    - { id: "11819044175623004", name: annunci, about: "Dove viene annunciata l'apertura." }
list:
  title: Apertura di Pixel Harbor
  channel: "11819044175623001"
  at: 2026-12-11T12:00
  tips: true
  look: |
    I task spuntati sono più piccoli e grigi, quindi risalta quello che resta. Ogni task ha un proprietario: Leo per i lavori che ha preso o che gli sono stati assegnati, Ava per i suoi, @Admin per quelli che può fare uno qualsiasi dei due. «Annunciare l'apertura» ha il suo promemoria; «Aprire le porte» mostra il suo webhook, che vede solo TTM.
  text: |
    - [X] <@11819044175621001>: Attivare Community in Impostazioni del server, con la [guida di Discord](https://support.discord.com/hc/en-us/articles/360047132851)
    - [X] <@&11819044175622001>: Scrivere le regole in <#11819044175623002>
    - [X] <@11819044175621002>: Configurare AutoMod: spam, link e filtro parole
    - [] <@11819044175621002>: Scrivere il messaggio di benvenuto per <#11819044175623003>
    - [X] <@&11819044175622001>: Creare i ruoli
     - [X] Membro, Artista, Moderatore
     - [X] Colori e ordine nell'elenco dei ruoli
    - [] <@&11819044175622001>: Impostare i permessi di ogni categoria
    - [] <@&11819044175622001>: Provare il server con un account che ha solo Membro
    - [] <@11819044175621002>: Fissare una guida per i futuri moderatori: :owner: poi un task da prendere, :reminder: per un ping nel giorno giusto
    - [] <t:1797008400> [0m,0m,0] <@11819044175621001>: Annunciare l'apertura sui nostri social e sui server partner
    - [] {{wb=Post di apertura}} <@11819044175621001>: Aprire le porte
webhooks:
  - name: Post di apertura
    service: discord
    trigger: completion
    method: POST
    url: https://discord.com/api/webhooks/<id>/<token>
    headers: "Content-Type: application/json"
    body: |
      {"content": "**{{guild}} è aperto!**\nParti da <#11819044175623002>, poi saluta in <#11819044175623003>. Non vediamo l'ora di vedere la tua arte.", "allowed_mentions": {"parse": []}}
    postsAs: { name: Pixel Harbor, channel: "11819044175623004", color: "#f0b232" }
    setup: |
      Apri le impostazioni di #annunci, poi *Integrazioni → Webhook → Nuovo webhook*. Dagli un nome, l'icona del server e premi **Copia URL del webhook**: è l'URL qui sopra. L'URL è una password del canale: chiunque lo abbia può postarci, quindi incollalo solo in `/config webhook`.

      Il body è il messaggio, scritto e controllato giorni prima dell'apertura. `allowed_mentions` con un `parse` vuoto significa che il messaggio non avvisa nessuno, anche se qualcuno in seguito ci aggiunge una menzione.
settings:
  - setting: Suggerimenti
    choice: Attivi, poi disattivati
    why: "Leo è nuovo in TTM: il Tutorial e la riga di aiuto sotto la lista gli mostrano dove premere. Ava li disattiva sabato notte, a server aperto e con Leo che ormai conosce i pulsanti."
  - setting: Sincronizza permessi
    choice: Caricati
    why: "In *Impostazioni del server → Integrazioni*, solo @Admin può usare TTM. Dopo la sincronizzazione, un moderatore aggiunto più tardi vede la lista in sola lettura finché Ava non gli dà il ruolo."
week:
  - at: 2026-12-07T10:00
    text: "Ava lancia `/crea-lista` in #setup e scrive solo i task. Poi dà i proprietari con **Proprietario**: @Admin per i lavori che può fare uno dei due, Leo per la guida, sé stessa per la Community e «Aprire le porte». Con **Webhook** collega «Aprire le porte» a Post di apertura."
  - at: 2026-12-07T10:20
    text: "Leo **prende** «Configurare AutoMod»: preme **Proprietario** finché diventa blu, poi sceglie il task senza scegliere nessuno. Il task diventa suo e il canale dice chi l'ha preso."
    card: { kind: notice, type: claimed, by: "11819044175621002", task: "3" }
  - at: 2026-12-07T19:40
    text: "Ava attiva Community e scrive le regole con Leo. Incolla il link di #regole, copiato con *Copia link* sul canale: TTM lo trasforma in un tag del canale."
  - at: 2026-12-08T09:00
    text: "Ava **assegna** «Scrivere il messaggio di benvenuto» a Leo: lo sceglie nel menu sotto **Proprietario**, poi sceglie il task. La notifica lo menziona, così Discord lo avvisa."
    card: { kind: notice, type: assigned, by: "11819044175621001", task: "4" }
  - at: 2026-12-09T21:00
    text: "Ava spunta il gruppo «Creare i ruoli». I suoi due subtask vengono spuntati con lui."
  - at: 2026-12-10T22:10
    text: "Ava mette un promemoria su «Annunciare l'apertura», per venerdì alle 18:00. Il task non aveva un proprietario e un promemoria va al proprietario: salvarlo rende Ava la proprietaria."
  - at: 2026-12-11T18:00
    text: "Il promemoria raggiunge Ava in messaggio diretto. Il pulsante sotto apre la lista."
    card: { kind: reminder, task: "9" }
  - at: 2026-12-12T17:30
    text: "Ava apre la lista con **Activity** <img class=\"inline-ic\" src=\"/icons/activity.png\" alt=\"\" />, il primo pulsante sotto di essa. Leo entra con **Entra nell'Activity**. Provano il server insieme, spuntando gli ultimi task man mano."
  - at: 2026-12-12T18:00
    text: "Ava spunta «Aprire le porte». Il webhook pubblica l'annuncio in #annunci, con il nome e l'icona del webhook."
    card: { kind: webhook, webhook: Post di apertura, task: "10", by: "11819044175621001" }
  - at: 2026-12-12T18:40
    text: "Ava e Leo escono dall'Activity. La lista torna in #setup con un riepilogo di ciò che hanno cambiato; il thread della lista registra ogni modifica con chi l'ha fatta. Ava disattiva i **Suggerimenti** in `/config app`."
fonte: 46fb8aa39338
---

## La prossima volta

Ava tiene la lista per il prossimo server che aprirà: in **Altro** <img class="inline-ic" src="/icons/other.png" alt="" />, **Download** <img class="inline-ic" src="/icons/download.png" alt="" /> le dà la lista come file `.txt`, scritta come il testo qui sopra. Sul nuovo server lancia `/crea-lista` e allega il file.

I ruoli e i canali di Pixel Harbor lì non esistono. TTM controlla ogni menzione prima di creare qualsiasi cosa ed elenca tutte quelle che il nuovo server non ha: Ava le sostituisce nel file con quelle nuove e importa di nuovo. Il file conserva anche le spunte e un promemoria con la data passata torna senza scattare. Quindi cambia `[X]` in `[]` e dà al promemoria una nuova data con **Promemoria**. Vedi [Riusare una lista ovunque](/docs/tips/#reuse-a-list-anywhere).

## Cosa TTM non fa qui

TTM tiene traccia del lavoro; la configurazione la fai tu. Non crea i tuoi canali, non cambia i permessi e non configura AutoMod: stanno in *Impostazioni del server*. Non copia nemmeno un server. Per un server con gli stessi canali e ruoli, Discord ha i suoi template del server, in *Impostazioni del server*.

## Domande

### Devo scrivere i codici?

No. Li scrivono i pulsanti: **Proprietario** per il proprietario, **Tag** per i tag, **Promemoria** per il promemoria, **Webhook** per il webhook. Tu scrivi solo i task. I codici contano quando copi una lista, o quando preferisci digitare invece di cliccare: vedi [Modificare una lista a mano](/docs/writing-a-list/).

### Perché Leo ha ricevuto una menzione e Ava no?

Una notifica menziona chi *riceve* un task da qualcun altro, così Discord glielo dice. Leo ha ricevuto «Scrivere il messaggio di benvenuto» da Ava. Quando ha preso lui «Configurare AutoMod», nessuno è stato menzionato: lo sapeva già. Vedi [Proprietari e tag](/docs/owners-and-tags/).

### I membri vedranno la lista?

Chiunque possa leggere il suo canale la vede. In un canale privato, solo chi ha accesso. Per tenere le liste in sola lettura per alcuni, vedi [Sincronizza permessi](/docs/configuration/#sync-permissions).
