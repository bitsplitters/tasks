---
title: Limiti noti
description: "I tetti su liste, task, promemoria e altro: la maggior parte viene da Discord stesso e come lavorarci dentro."
fonte: fad07d75572a
---

Team Tasks Manager lavora interamente dentro Discord, quindi la maggior parte dei limiti qui sotto non è una scelta di TTM. Vengono da Discord stesso. Per esempio: quanto può essere lungo un messaggio, quanti menu stanno in un messaggio, fino a quanto indietro si possono eliminare i messaggi in blocco. Dove un limite è di Discord, lo diciamo.

## Liste e task

| Limite | Valore | Perché |
| :--- | :--- | :--- |
| Liste in uso per server | **3** con il piano Free | Vedi [Come funzionano i tre posti](/docs/premium/#how-the-three-places-work). |
| Caratteri per lista | **4000** | L'intera lista si modifica dentro un unico campo di Discord e Discord limita quel campo a 4000 caratteri. Il conteggio comprende *tutto ciò che si vede*: testo dei task, caselle, l'eventuale orario di un promemoria e un'interruzione di riga per ogni riga, non solo quello che scrivi. TTM tiene un piccolo margine di sicurezza sotto il limite massimo. |
| Elementi per lista | **50** (task + subtask) | Discord permette 5 righe di componenti per messaggio e fino a 25 opzioni per menu a tendina. TTM riserva righe ai pulsanti delle azioni e questo lascia spazio a 50 elementi selezionabili in tutto, subtask compresi. Il tuo piano può fermarti prima: vedi [Cosa sblocca Premium](/docs/premium/). |
| Titolo della lista | **90** caratteri | Le finestre di creazione, modifica e clonazione non ti lasciano scrivere di più. Il titolo dà anche il nome al menu della lista e al suo thread della cronologia, che Discord tiene corti. |
| File importato | `.txt`, fino a **64 KB** | `/crea-lista` importa solo il file prodotto da **Download**. Che cos'altro controlla: vedi [`/crea-lista`](/docs/commands/#create-list). |

<div class="callout"><div class="callout-t">Hai toccato un tetto?</div>Dividi il lavoro su più liste. Due liste mirate si leggono meglio di una al limite e ognuna ha i suoi promemoria, proprietari e tag.</div>

**Download ti dà sempre un file.** Un normale messaggio di Discord è limitato a 2000 caratteri. Perciò **Download**, nel pannello **Altro** <img class="inline-ic" src="/icons/other.png" alt="" /> sotto la lista nel canale, non pubblica mai la lista come testo. Ti invia un file `.txt`, solo a te, in un messaggio che solo tu puoi vedere. È lo stesso file che `/crea-lista` può reimportare.

**Eliminare il messaggio non equivale a eliminare la lista.** La lista tiene il suo posto e i suoi promemoria continuano ad arrivare: vedi [Cosa succede a una quarta lista](/docs/premium/#what-happens-to-a-fourth-list).

## Promemoria

| Limite | Valore | Perché |
| :--- | :--- | :--- |
| Promemoria in attesa alla volta | **10** con il piano Free | Vedi [Cosa sblocca Premium](/docs/premium/). |
| Ripetizioni per promemoria | **fino a 50** con Premium, nessuna con Free | I promemoria ricorrenti sono una funzione Premium: con il piano Free ogni promemoria è un evento singolo. Con Premium un promemoria può arrivare al massimo 50 volte in tutto, la prima compresa; scegli **1 volta** per un promemoria singolo. Nel testo di una lista, in **Aggiornamento in blocco** o in **Modifica la lista**, la tripletta conta le ripetizioni dopo la prima: al massimo 49. |
| Quanto presto può scattare un promemoria | **5 minuti** da adesso | La data di inizio deve essere almeno cinque minuti nel futuro, così lo scheduler ha il tempo di prenderlo in carico. |
| Quanto è puntuale un promemoria | entro circa **10 secondi** | I promemoria in scadenza insieme vengono distribuiti su un massimo di dieci secondi, per restare nei limiti di Discord. Il promemoria arriva comunque nel minuto giusto. |

Le ripetizioni sono offerte solo con un piano che include i promemoria ricorrenti e solo quando **Promemoria ricorrenti** è acceso in [/config app](/docs/configuration/#recurring-reminders). Di base ogni promemoria è un evento singolo. I promemoria ricorrenti che hai già continuano a scattare in ogni caso: vedi [Promemoria ricorrenti](/docs/reminders/#repeating-reminders).

### Promemoria con messaggio diretto

Il promemoria di una persona arriva con un messaggio diretto, quindi dipende dalle impostazioni dei messaggi diretti del proprietario. Se il proprietario non accetta messaggi diretti dai membri del server, Discord rifiuta il messaggio e quel promemoria non arriva. Lo stesso succede se il proprietario non condivide più un server con il bot.

Per accettare i messaggi diretti dai membri di un server, fai click sul nome del server, poi su *Impostazioni privacy*.

Dopo un messaggio rifiutato, TTM se lo ricorda e non riprova con quella persona per **6 ore**. Dopo, riprova e il primo messaggio diretto che passa cancella la pausa.

### Promemoria a un ruolo

Quando il proprietario di un task è un ruolo, il promemoria è un messaggio nel canale della lista che menziona il ruolo. Discord trasforma la menzione in una notifica solo in uno di questi casi:

- il ruolo permette a chiunque di menzionarlo: in *Impostazioni del server → Ruoli*, il ruolo può essere menzionato con @ da chiunque;
- il bot ha il permesso *Menzionare @everyone, @here e tutti i ruoli* nel canale della lista. Il link di invito lo concede.

Altrimenti il messaggio compare nel canale e nessuno riceve una notifica. TTM ti avvisa quando imposti un promemoria del genere. Ti avvisa anche quando rendi un ruolo del genere proprietario di un task con un promemoria.

- **@everyone come proprietario**: conta solo il permesso del bot.
- **Un ruolo creato da TTM** per più proprietari nasce menzionabile. I suoi promemoria lo avvisano anche senza il permesso, a meno che qualcuno spenga quell'impostazione.
- **Un ruolo eliminato** non riceve nessun promemoria. TTM te lo dice e la soluzione è scegliere un altro proprietario.

In ogni caso vengono avvisati solo i membri che possono vedere il canale della lista.

## Proprietari e tag

Ogni task ha **un proprietario**: una persona o un ruolo. Con Premium può avere anche fino a 25 persone, che condividono un ruolo creato da TTM per loro. 25 è il massimo del menu dei proprietari. Un task può avere **fino a 25 tag**, gli utenti o i ruoli da avvisare: 25 è il massimo di Discord per un menu.

**I ruoli creati da TTM contano nei 250 ruoli per server di Discord.** A 250 ruoli, TTM non può crearne di nuovi e lo dice. Quando TTM elimina i suoi ruoli: vedi [I ruoli che crea TTM](/docs/owners-and-tags/#the-roles-ttm-creates).

**TTM vede quanti membri ha un ruolo, non chi sono.** Se in un ruolo creato da TTM scambi un membro con un altro, TTM continua a mostrare le persone a cui l'ha dato: vedi [I ruoli che crea TTM](/docs/owners-and-tags/#the-roles-ttm-creates).

## Webhook

| Limite | Valore |
| :--- | :--- |
| Webhook per server | **25** con Premium, nessun webhook nuovo con il piano Free. Il selettore è un menu a tendina di Discord e 25 opzioni sono il suo massimo. |
| Nome del webhook | fino a **96** caratteri \* |
| URL del webhook | fino a **2000** caratteri |

\* Il limite di Discord è 100, ma il nome viaggia dentro l'identificatore del campo del modulo insieme a
un breve marcatore e anche quei caratteri contano: TTM controlla 96 e lo dice se li superi. Il messaggio
di errore cita lo stesso numero che leggi qui.

## La cronologia delle attività

Quando la cronologia è accesa, TTM pubblica ogni azione in un thread accanto alla lista, tramite un webhook di Discord. Discord permette **15 webhook per canale**, quindi TTM crea **un webhook per canale** e lo riusa per ogni lista di quel canale. Il nome e l'immagine che vedi su ogni messaggio sono impostati per messaggio, quindi visivamente non cambia niente.

Se un canale ha già raggiunto i 15 di Discord (a causa di altri bot o integrazioni), la cronologia di una nuova lista non può partire. Liberane uno in **Impostazioni del canale → Integrazioni → Webhook**.

## Canali vocali

Le liste funzionano anche nella chat di un canale vocale, con una differenza: lì non hanno la [cronologia delle attività](#the-activity-timeline). La cronologia è un thread accanto alla lista e Discord non permette i thread nei canali vocali. Tutto il resto funziona come in un canale di testo: i pulsanti, le notifiche, i promemoria, l'[Activity](/docs/activity/), **Clona lista**, **Download**, **Sigilla lista** ed **Elimina lista**.

Quando la cronologia è accesa in [`/config app`](/docs/configuration/#history-tracking), chi crea una lista in un canale vocale riceve un breve messaggio su questo, visibile solo a lui; la lista di prova del Tutorial lo salta. Se ti serve la cronologia, crea la lista in un canale di testo, oppure copiala lì con **Clona lista**.

In un canale vocale TTM non ha bisogno di *Creare thread pubblici* e *Gestisci webhook*, che servono solo alla cronologia. Gli serve invece *Connettersi*: senza, TTM non può scrivere nella chat del canale vocale. Discord dà *Connettersi* a tutti di default; se il tuo server lo toglie su un canale vocale, concedilo a TTM lì, altrimenti `/crea-lista` ti dice che manca.

## Notifiche

Quando TTM mette in ordine i propri messaggi di notifica, Discord permette di eliminare in blocco solo i messaggi degli **ultimi 14 giorni**. Le notifiche più vecchie possono restare nel canale: puoi rimuoverle a mano.

---

Questi numeri rispecchiano la versione attuale del bot. Ogni cambiamento sarà annotato nelle [Note di rilascio](/docs/release-notes/).
