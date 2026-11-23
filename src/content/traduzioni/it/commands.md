---
title: Riferimento dei comandi
description: L'elenco completo degli slash command. Gran parte di TTM vive nei pulsanti, non nei comandi.
fonte: 22af0bf47a25
---

TTM tiene i comandi al minimo: una volta creata una lista, fai tutto con pulsanti e menu. Per eseguire un comando, scrivi `/` nella casella dei messaggi e sceglilo. Puoi anche aprire l'**Avvio app** nella barra dei messaggi e scegliere **Team Tasks Manager** sotto *App su questo server*.

Se il tuo Discord è in un'altra lingua, alcuni nomi sono tradotti: vedi [Nomi dei comandi nella tua lingua](#command-names-in-your-language) in fondo.

## `/crea-lista`

Crea una lista di task, in un canale di testo o nella chat di un canale vocale. TTM controlla di avere nel canale i permessi che gli servono, poi pubblica la lista con il suo pannello di pulsanti. In un canale vocale la lista non ha la cronologia delle attività: vedi [Canali vocali](/docs/known-limits/#voice-channels). È il comando che userai di più. Con i [Suggerimenti](/docs/configuration/#tips) attivi offre anche un **Tutorial**: una lista di prova che insegna i pulsanti (vedi [Per iniziare](/docs/getting-started/#2-create-your-first-list)).

Il comando ha un'unica opzione, **`file`**, che puoi omettere. Allega il file `.txt` che ti dà il **Download** di una lista: ha il nome della lista e può arrivare da un altro server. TTM ricostruisce allora la lista dal file invece di aprire la form di creazione. La lista torna con i suoi task e il loro stato, i proprietari, i tag, i promemoria e i webhook. Come ogni lista nuova, richiede un posto libero nel tuo piano (vedi [Come funzionano i tre posti](/docs/premium/#how-the-three-places-work)).

TTM rifiuta subito un file che non sia un `.txt` o che pesi più di **64 KB**. Negli altri casi TTM legge il file. Se qualcosa non torna, TTM non crea niente ed elenca tutti i problemi in un solo messaggio, ognuno con la sua riga o il suo task:

- **Il formato** — il file non è testo UTF-8 o non inizia con `#!ttm/1`. Il titolo manca o supera i 90 caratteri. Una riga non è un task, oppure un promemoria è scritto in mesi (`M`) o scritto male. Un webhook è collegato a un task senza testo, la lista inizia con un subtask o non ci sono task.
- **La dimensione** — la lista è troppo lunga per un messaggio o ha più task di quanti ne possa contenere una lista o ne consenta il tuo piano.
- **I promemoria** — un promemoria non ha un proprietario, non ha una data e ha una distanza pari a zero, oppure si ripete più volte di quanto consenta il tuo piano. Un promemoria ricorrente viene rifiutato dove non se ne possono creare di nuovi (vedi [Promemoria](/docs/reminders/#repeating-reminders)). Ci sarebbero troppi promemoria in attesa nello stesso momento.
- **Questo server** — un ruolo, un canale o un webhook del file non esiste qui oppure un utente del file non è un membro.

I promemoria i cui avvisi sono tutti nel passato non sono un problema: tornano sui loro task e non inviano più nulla.

→ Vedi [La lista nel canale](/docs/the-task-list/) e [Trucchi e consigli](/docs/tips/#reuse-a-list-anywhere) per riusare una lista su un altro server.

## `/config app`

Apre il pannello delle impostazioni del tuo server: notifiche, cronologia delle attività, suggerimenti per i nuovi arrivati, promemoria ricorrenti, fuso orario, permessi e altro.

→ Vedi [/config app](/docs/configuration/).

## `/config lists`

Mostra tutte le liste di questo server e permette di rigenerarne, sigillarne o eliminarne più d'una insieme. Rigenerare riporta una lista il cui messaggio è stato cancellato per errore.

→ Vedi [/config lists](/docs/config-lists/).

## `/config webhook`

Crea, visualizza, modifica o elimina un webhook, volendo limitato a un evento di **completamento** o di **riapertura**. È l'unico comando con opzioni da compilare obbligatoriamente: l'**azione** e il **nome del webhook**.

I webhook sono una funzione **Premium**, sbloccata per ogni server durante la beta: vedi [Cosa sblocca Premium](/docs/premium/).

→ Vedi [/config webhook](/docs/webhooks/#creating-a-webhook).

## `/my timezone`

Il tuo fuso orario, uguale in ogni server: TTM te lo propone ogni volta che scegli una data, nel canale e nell'Activity. Il pannello, visibile solo a te, mostra il tuo fuso attuale e da dove viene: scelto da te, l'ultimo che hai lasciato in un promemoria, la tua lingua di Discord o il server. **Scegli** apre una form: incolla il nome del tuo fuso, come `Europe/Rome`, che trovi sulla [mappa dei fusi orari](https://timezones.bitsplitters.app). **Torna automatico** dimentica la tua scelta e TTM impara di nuovo il tuo fuso dai tuoi promemoria. L'Activity ha la stessa scelta nell'ingranaggio. Funziona solo nei server e non richiede permessi.

→ Vedi [Il tuo fuso orario](/docs/reminders/#your-time-zone).

## `/beta`

Questo comando mostra che cosa significa la beta per il tuo server: ogni funzione è sbloccata e gratuita per tutta la beta. Spiega anche che cosa succede quando la beta finisce e perché esiste un piano a pagamento. Un pulsante mostra come sarà quel piano.

→ Vedi [Come funziona la beta](/docs/beta/).

## `/help`

Questo comando è il tuo punto di partenza dentro Discord. Apre un pannello con cinque pulsanti:

- **Home** <img class="inline-ic" src="/icons/home.png" alt="" /> — una panoramica dell'app.
- **Per iniziare** <img class="inline-ic" src="/icons/start.png" alt="" /> — una guida rapida, con un link a questa documentazione.
- **Configurazione** <img class="inline-ic" src="/icons/config.png" alt="" /> — a che cosa servono `/config app`, `/config lists` e `/config webhook`.
- **Premium** <img class="inline-ic" src="/icons/premium.png" alt="" /> — come sarà il piano a pagamento quando la beta finirà, compresi i limiti del piano Free.
- **Chi siamo** <img class="inline-ic" src="/icons/aboutus.png" alt="" /> — chi costruisce TTM.

## `/invite`

Mostra una scheda per aggiungere Team Tasks Manager a un altro server: la stessa presentazione della sua pagina nella App Directory (che cosa fa, come iniziare), il pulsante **Aggiungi a Discord** (la pagina di autorizzazione di Discord per il bot, con gli stessi permessi di https://tasks.bitsplitters.app/invite), la guida e il server di supporto. La scheda è visibile a tutti nel canale, così puoi eseguire il comando dove possono vederla le persone che configureranno l'altro server. Non legge nulla dal server e non richiede permessi.

## `/news`

Le ultime novità su Team Tasks Manager, nella tua lingua: che cosa c'è di nuovo nel bot e come usarlo. Le novità si aprono in un messaggio che vedi solo tu, con la data sotto il titolo. Sotto il testo, **Server Discord** apre il nostro server di supporto e **Note di rilascio** apre quella versione nella pagina [Note di rilascio](/docs/release-notes/). Quando ci sono novità più vecchie o più recenti, i pulsanti **Precedente** e **Successiva** ti ci portano. Tornando indietro trovi ogni versione dalla prima, la 1.0.0, ciascuna con il giorno in cui è uscita. Funziona solo nei server e non richiede permessi.

Quando ci sono novità che nessuno nel tuo server ha ancora letto, l'ultima riga dei pannelli del bot lo dice, al posto del solito piè di pagina: in `/help`, nella Guida, in **Altro**, in `/config app` e nella spiegazione che mostra `/crea-lista`. Appena qualcuno nel server apre `/news`, la riga sparisce per tutti. Un server che aggiunge TTM dopo una novità non ottiene la riga: la novità è in `/news`.

## Nomi dei comandi nella tua lingua

Discord mostra ogni comando nella lingua della tua app Discord e in inglese per una lingua in cui TTM non è tradotto. `/config app`, `/config lists`, `/config webhook` (con la sua opzione `webhook`), `/my timezone`, `/beta`, `/help`, `/invite` e `/news` hanno lo stesso nome ovunque.

| Lingua | `/create-list` | la sua opzione `file` | opzioni di `/config webhook` |
| :--- | :--- | :--- | :--- |
| Inglese e qualsiasi altra lingua | `/create-list` | `file` | `action` · `trigger` |
| Italiano | `/crea-lista` | `file` | `azione` · `evento` |
| Español | `/crear-lista` | `archivo` | `accion` · `evento` |
| Português (Brasil) | `/criar-lista` | `arquivo` | `acao` · `evento` |
| Français | `/creer-liste` | `fichier` | `action` · `evenement` |
| Deutsch | `/liste-erstellen` | `datei` | `aktion` · `ereignis` |

Anche le scelte dentro le opzioni (visualizza, crea, modifica, elimina; completamento, riapertura) compaiono nella tua lingua.
