---
title: Riferimento dei comandi
description: Tutti gli slash command in un posto solo, con la pagina che li spiega. Gran parte di TTM vive nei pulsanti, non nei comandi.
fonte: 103a298bf4e4
---

TTM tiene i comandi al minimo: una volta creata una lista, fai tutto con pulsanti e menu. Per eseguire un comando, scrivi `/` nella casella dei messaggi e sceglilo. Puoi anche aprire l'**Avvio app** nella barra dei messaggi e scegliere **Team Tasks Manager** sotto *App su questo server*.

Se il tuo Discord è in un'altra lingua, alcuni nomi sono tradotti: vedi [Nomi dei comandi nella tua lingua](#command-names-in-your-language) in fondo.

| Comando | A cosa serve | Dove è spiegato |
| :--- | :--- | :--- |
| `/crea-lista` | Crea una lista o ne ricostruisce una da un file | [Crea la tua prima lista](/docs/getting-started/#2-create-your-first-list); il file [qui sotto](#create-list) |
| `/config` | I tre comandi per chi si occupa di TTM nel server | [/config](/docs/config/) |
| `/config app` | Le impostazioni del server: notifiche, cronologia, suggerimenti, promemoria, fuso orario, permessi | [/config app](/docs/configuration/) |
| `/config lists` | Tutte le liste del server: rigenerarne, sigillarne o eliminarne più d'una insieme | [/config lists](/docs/config-lists/) |
| `/config webhook` | Crea, visualizza, modifica o elimina un webhook | [/config webhook](/docs/config-webhook/) |
| `/my timezone` | Il tuo fuso orario, uguale in ogni server | [/my timezone](/docs/my-timezone/) |
| `/beta` | Che cosa significa la beta per il tuo server | [Come funziona la beta](/docs/beta/) |
| `/help` | Il tuo punto di partenza dentro Discord | [Qui sotto](#help) |
| `/invite` | Una scheda per aggiungere TTM a un altro server | [Qui sotto](#invite) |
| `/news` | Le ultime novità su TTM | [Qui sotto](#news) |

## `/crea-lista`

Per creare una lista da zero, vedi [Crea la tua prima lista](/docs/getting-started/#2-create-your-first-list). Questa sezione parla dell'unica opzione del comando, **`file`**, che puoi omettere.

Allega il file `.txt` che ti dà il **Download** di una lista. Ha il nome della lista e può arrivare da un altro server. TTM ricostruisce allora la lista dal file invece di aprire la form di creazione.

La lista torna con i suoi task e il loro stato, i proprietari, i tag, i promemoria e i webhook. Come ogni lista nuova, richiede un posto libero nel tuo piano (vedi [Come funzionano i tre posti](/docs/premium/#how-the-three-places-work)).

TTM rifiuta subito un file che non sia un `.txt` o che pesi più di **64 KB**. Negli altri casi TTM legge il file. Se qualcosa non torna, TTM non crea niente ed elenca tutti i problemi in un solo messaggio, ognuno con la sua riga o il suo task:

- **Il formato** — il file non è testo UTF-8 o non inizia con `#!ttm/1`. Il titolo manca.

  Una riga non è un task, oppure un promemoria è scritto in mesi (`M`) o scritto male. Un webhook è collegato a un task senza testo, la lista inizia con un subtask o non ci sono task.
- **La dimensione** — la lista è troppo lunga per un messaggio o ha più task di quanti ne possa contenere una lista o ne consenta il tuo piano.
- **I promemoria** — un promemoria non ha un proprietario, non ha una data e ha una distanza pari a zero, oppure si ripete più volte di quanto consenta il tuo piano. Un promemoria ricorrente viene rifiutato dove non se ne possono creare di nuovi (vedi [Promemoria](/docs/reminders/#repeating-reminders)). Ci sarebbero troppi promemoria in attesa nello stesso momento.
- **Questo server** — un ruolo, un canale o un webhook del file non esiste qui oppure un utente del file non è un membro.

I promemoria i cui avvisi sono tutti nel passato non sono un problema: tornano sui loro task e non inviano più nulla.

→ Vedi [Riusa una lista ovunque](/docs/tips/#reuse-a-list-anywhere).

## `/help`

Questo comando è il tuo punto di partenza dentro Discord. Apre un pannello con cinque pulsanti:

- **Home** <img class="inline-ic" src="/icons/home.png" alt="" /> — una panoramica dell'app.
- **Per iniziare** <img class="inline-ic" src="/icons/start.png" alt="" /> — una guida rapida, con un link a questa documentazione.
- **Configurazione** <img class="inline-ic" src="/icons/config.png" alt="" /> — a che cosa servono `/config app`, `/config lists` e `/config webhook`.
- **Premium** <img class="inline-ic" src="/icons/premium.png" alt="" /> — come sarà il piano a pagamento quando la beta finirà, compresi i limiti del piano Free.
- **Chi siamo** <img class="inline-ic" src="/icons/aboutus.png" alt="" /> — chi costruisce TTM.

## `/invite`

Mostra una scheda per aggiungere Team Tasks Manager a un altro server: la stessa presentazione della sua pagina nella App Directory (che cosa fa, come iniziare), il pulsante **Aggiungi a Discord**, la guida e il server di supporto.

**Aggiungi a Discord** apre la pagina di autorizzazione di Discord per il bot, con gli stessi permessi di https://tasks.bitsplitters.app/invite.

La scheda è visibile a tutti nel canale, così puoi eseguire il comando dove possono vederla le persone che configureranno l'altro server. Non legge nulla dal server e non richiede permessi.

## `/news`

Le ultime novità su Team Tasks Manager, nella tua lingua: che cosa c'è di nuovo nel bot e come usarlo. Le novità si aprono in un messaggio che vedi solo tu, con la data sotto il titolo.

Sotto il testo, **Server Discord** apre il nostro server di supporto e **Note di rilascio** apre quella versione nella pagina [Note di rilascio](/docs/release-notes/). Quando ci sono novità più vecchie o più recenti, i pulsanti **Precedente** e **Successiva** ti ci portano.

Tornando indietro trovi ogni versione dalla prima, la 1.0.0, ciascuna con il giorno in cui è uscita. Funziona solo nei server e non richiede permessi.

Quando ci sono novità che nessuno nel tuo server ha ancora letto, l'ultima riga dei pannelli del bot lo dice, al posto del solito piè di pagina: in `/help`, nella Guida, in **Altro**, in `/config app` e nella spiegazione che mostra `/crea-lista`.

Appena qualcuno nel server apre `/news`, la riga sparisce per tutti. Un server che aggiunge TTM dopo una novità non ottiene la riga: la novità è in `/news`.

## Nomi dei comandi nella tua lingua

Discord mostra ogni comando nella lingua della tua app Discord e in inglese per una lingua in cui TTM non è tradotto. `/config app`, `/config lists`, `/config webhook` (con la sua opzione `webhook`), `/my timezone`, `/beta`, `/help`, `/invite` e `/news` hanno lo stesso nome ovunque.

| Lingua | `/create-list` | la sua opzione `file` | opzioni di `/config webhook` |
| :--- | :--- | :--- | :--- |
| Inglese e qualsiasi altra lingua | `/create-list` | `file` | `action` · `trigger` |
| Italiano | `/crea-lista` | `file` | `azione` · `evento` |
| Español | `/crear-lista` | `archivo` | `acción` · `evento` |
| Português (Brasil) | `/criar-lista` | `arquivo` | `ação` · `evento` |
| Français | `/creer-liste` | `fichier` | `action` · `événement` |
| Deutsch | `/liste-erstellen` | `datei` | `aktion` · `ereignis` |

Anche le scelte dentro le opzioni (visualizza, crea, modifica, elimina; completamento, riapertura) compaiono nella tua lingua.
