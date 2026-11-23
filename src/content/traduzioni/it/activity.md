---
title: L'Activity
description: Apri una lista in una finestra dentro Discord, dove il tuo team ci lavora insieme e vede ogni modifica mentre accade.
fonte: 3944b7fd591c
---

Prova la modalità Activity: più fluida e libera dai limiti dei canali testuali, ideale per sessioni di lavoro più lunghe o collaborative.

L'**Activity** apre una lista in una finestra dentro Discord, su desktop e su mobile. Più persone ci lavorano insieme e vedono ogni modifica in tempo reale. Quando l'ultima esce, la lista torna nel suo canale con un riepilogo di ciò che è cambiato. Parla la lingua del tuo Discord se TTM la supporta, altrimenti l'inglese.

Questa pagina parla di come entrare e uscire. Come lavori sulla lista una volta dentro: [Lavorare su una lista nell'Activity](/docs/activity-list/).

## Quattro modi per entrare

- **Da una lista in un canale** — premi **Activity** <img class="inline-ic" src="/icons/activity.png" alt="" />, il primo pulsante sotto la lista. Si apre quella lista. Vedi [Apri una lista nell'Activity](#open-a-list-in-the-activity).
- **Dalla barra dei messaggi** — in un canale di testo apri l'**Avvio app** di Discord, scegli Team Tasks Manager, poi **Avvia**. Vedi [La home del canale](#the-home-of-the-channel).
- **Da una chiamata vocale** — premi il pulsante Attività della chiamata e scegli Team Tasks Manager. Vedi [La home del canale](#the-home-of-the-channel).
- **Da qualcuno già dentro** — premi **Entra nell'Activity** sotto la lista, **Unisciti** di Discord sul suo profilo oppure l'invito che ti manda. Vedi [Unirti agli altri](#join-the-others).

L'Avvio app e la chiamata vocale aprono la home del canale, con tutte le sue liste: lì ne scegli una oppure ne crei una nuova.

## Apri una lista nell'Activity

Premi **Activity** <img class="inline-ic" src="/icons/activity.png" alt="" />, il primo pulsante della [prima riga](/docs/the-task-list/#row-1--acts-on-the-whole-list), in un canale di testo o nella chat di un canale vocale. Una lista più vecchia riceve il pulsante la prima volta che cambia.

Se la finestra non si connette entro 30 secondi, TTM ti avvisa e la lista resta nel canale.

### Quando la lista non si apre

Il pulsante segue le regole del resto della lista, come i [permessi sincronizzati](/docs/configuration/#sync-permissions) in `/config app`. TTM rifiuta anche, con un messaggio che vedi solo tu:

- senza il permesso di Discord *Usare le attività* sul canale, che un amministratore concede in *Permessi* del canale;
- mentre il database non risponde;
- mentre qualcuno sta modificando la lista nel canale: vedi [Quando la lista è bloccata](/docs/the-task-list/#when-the-list-is-locked);
- quando il tuo piano non ha posti liberi: vedi [Come funzionano i tre posti](/docs/premium/#how-the-three-places-work).

## Unirti agli altri

Finché una lista è nell'Activity, il suo messaggio tiene un solo pulsante, **Entra nell'Activity** <img class="inline-ic" src="/icons/activity.png" alt="" /> e l'ultima riga dice <img class="inline-ic" src="/icons/activity_blue.png" alt="" /> *La lista è in lavorazione nell'Activity*. Funziona anche **Unisciti** di Discord, sul profilo di chi è dentro. Nel frattempo niente cambia la lista dal canale.

Per portare dentro qualcuno, premi **Invita**, in alto a destra nella home e in ogni lista, accanto a chi c'è. Discord apre la sua finestra, dove scegli gli amici o un canale a cui mandare l'invito. Serve il permesso di Discord *Creare invito* sul canale: senza, TTM te lo dice sul pulsante e spiega come lo concede un amministratore.

## Il tuo stato su Discord

Mentre sei nell'Activity, il tuo profilo Discord mostra Team Tasks Manager con *Pianifica i task con il team*, nella tua lingua. Non dice nulla sulla lista, sul server o sul canale. Discord te lo chiede prima, nella finestra in cui fai sapere a TTM chi sei. Se rifiuti, l'Activity si apre lo stesso, senza quella riga.

## La home del canale

Quando parti dall'**Avvio app** o da una **chiamata vocale** (vedi [Quattro modi per entrare](#four-ways-in)), TTM apre la home del canale, con il nome del canale come titolo. Thread, post dei forum, canali annunci e stage restano fuori. La home ha tre parti:

- **Nuova lista**, sotto il titolo — un titolo e i task, scritti come in [Crea la tua prima lista](/docs/getting-started/#2-create-your-first-list), creati qui e già nell'Activity. Il riepilogo che la riporta nel canale comincia con la sua creazione e può menzionare i proprietari dei suoi task: vedi [Quando una lista viene creata](/docs/configuration/#when-a-list-is-created). I file si importano con `/crea-lista`, nel canale.
- **Ora nell'Activity** — chi c'è su ogni lista e chi la sta modificando. Tocca una lista per unirti.
- **Nel canale** — le altre liste, dalla più recente. Tocca una lista per leggerla, poi **Porta nell'Activity**, che resta in attesa finché qualcuno la modifica nel canale.

Il pulsante **Home** <img class="inline-ic" src="/icons/home.png" alt="" />, in alto a sinistra in ogni lista, ti riporta lì.

## Tornare nel canale

**Esci** riporta la lista quando sei solo. Con altre persone scegli tu:

- **Esci solo tu** — gli altri continuano;
- **Riporta nel canale per tutti** — l'Activity si chiude per tutti.

La lista torna anche 30 secondi dopo che l'ultima persona se n'è andata, compresi la chiusura della finestra o il blocco del telefono. **Esci** e **Home** lo fanno subito.

Poi segue un **riepilogo**, una riga per modifica con chi l'ha fatta: nel canale come dice la tua [Modalità notifica](/docs/configuration/#notification-mode) e per intero nel thread della [cronologia delle attività](/docs/configuration/#history-tracking). Usa la lingua di chi ha portato la lista nell'Activity.

## Cosa resta nel canale

**Clona**, **Download**, **Sigilla**, **Elimina**, **Sblocca** e l'importazione da file: vedi [Azioni sulla lista](/docs/list-actions/). Nell'Activity una lista si sblocca da sola.

Un amministratore può comunque **Eliminare**, **Sigillare** o **Rigenerare** una lista nell'Activity da [`/config lists`](/docs/config-lists/). Elimina la rimuove anche per chi è dentro; Sigilla la riporta prima nel canale.

## Quando il database non risponde

Nessuna lista entra nell'Activity e la home nasconde **Nuova lista**. Una lista già dentro diventa di sola lettura finché il database non torna e una striscia offre di riportarla nel canale.

## Le tue impostazioni

L'ingranaggio in alto a destra ha due gruppi. Sotto **Per te, ovunque**, **Fuso orario** è il tuo fuso orario, lo stesso di [/my timezone](/docs/my-timezone/): TTM te lo propone nel canale e in ogni server e **Torna automatico** lo dimentica. Sotto **Su questo dispositivo**, **Dimensione del testo**, **Tema** e **Righe distanziate**, più spazio per toccare su un telefono, valgono solo per te, su quel dispositivo.

## Dove andare dopo

- [Lavorare su una lista nell'Activity](/docs/activity-list/) — le caselle, il pannello di un task e chi sta modificando che cosa.
- [La lista nel canale](/docs/the-task-list/) — ogni pulsante sotto la lista, nel canale.
- [Cosa sblocca Premium](/docs/premium/) — i posti del tuo piano e che cosa aggiunge il piano a pagamento.
- [FAQ](/docs/troubleshooting/#in-the-activity) — risposte rapide ai problemi più comuni.
