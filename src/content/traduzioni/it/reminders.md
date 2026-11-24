---
title: Promemoria
description: "Associa un orario a un task e TTM avvisa il proprietario in tempo: chi lo riceve, i fusi orari, le ripetizioni."
fonte: 6ce351a678ab
---

Un promemoria trasforma un task in qualcosa che ricorda *a te* e non il contrario. Lo imposti una volta e TTM si occupa degli avvisi. Lo aggiungi con **Promemoria** <img class="inline-ic" src="/icons/alertW.png" alt="" />: nel canale, nella seconda riga sotto la lista; nell'Activity, nel pannello di un task.

<div class="howto" id="how-to-do-it"><div class="howto-t">Come si fa</div><div class="howto-grid"><a class="howto-go is-channel" href="/docs/channel-tasks/#reminder"><span class="howto-k"><img class="place-ic" src="/icons/posto-canale.svg" alt="" />Nel canale</span><span class="howto-d">Promemoria, nella seconda riga sotto la lista: la finestra della data e la scheda riepilogativa.</span></a><a class="howto-go is-activity" href="/docs/activity-list/#reminder"><span class="howto-k"><img class="place-ic" src="/icons/activity.png" alt="" />Nell'Activity</span><span class="howto-d">Promemoria, nel pannello di un task: data, ora, fuso orario e ripetizioni insieme.</span></a></div></div>

## Le regole

- **Un promemoria ha una data, un'ora e un fuso orario.** Scatta **una volta sola**, a meno che il tuo server usi i [promemoria ricorrenti](#repeating-reminders), una funzione Premium.
- **L'inizio deve essere almeno 5 minuti nel futuro.** Il modulo parte da dieci minuti da adesso: per un promemoria «fra poco» non devi scrivere niente.
- **Solo un task ancora da fare può averne uno.** Completare un task ferma il suo promemoria: non c'è niente da ripulire dopo.
- **Il promemoria va al proprietario del task**, con un messaggio diretto se il proprietario è una persona. Se il task non ha ancora un proprietario, **lo diventi tu** quando salvi il promemoria.

  Da quel momento solo tu e chi ha *Gestisci messaggi* sul canale potete spuntare quel task. Per darlo a qualcun altro, imposta il proprietario prima o dopo aver creato il promemoria: vedi [Proprietari e tag](/docs/owners-and-tags/).
- **Non cambia niente finché non salvi.** Quando modifichi un promemoria, Salva resta spento finché non cambi la data o la ricorrenza.
- **Togliere il proprietario toglie il promemoria**, perché non resta nessuno a riceverlo.

Non è arrivato niente? Il proprietario deve accettare i messaggi diretti dai membri di quel server: vedi [Promemoria con messaggio diretto](/docs/known-limits/#reminders-by-direct-message).

## Il tuo fuso orario

TTM vuole il nome ufficiale di un fuso orario, come `Europe/Rome`. Cerca il tuo sulla **[mappa dei fusi orari](https://timezones.bitsplitters.app)**: seleziona la tua zona sulla mappa, copia il valore e incollalo nel campo. L'Activity permette anche di cercare per città o paese.

<div class="callout"><div class="callout-t">Scegli il tuo fuso orario</div>Usa <a href="/docs/my-timezone/"><strong>/my timezone</strong></a> in qualsiasi server, o l'ingranaggio nell'Activity e TTM ti propone il <strong>tuo</strong> fuso ovunque, nel canale e nell'Activity. Finché non ne scegli uno, TTM propone il fuso della lingua del tuo Discord, del tuo dispositivo o del server: la riga sotto il campo ti dice quale. Un fuso diverso in un promemoria vale solo per quella data. I promemoria che scrivi nel testo di una lista usano lo stesso fuso.</div>

## Come arriva il promemoria

Quando arriva l'ora, TTM avvisa il proprietario del task. Il promemoria mostra il task, la data per cui era previsto e un pulsante che porta dritto alla lista.

- Se il proprietario è una **persona**, il promemoria è un **messaggio diretto**.
- Se il proprietario è un **ruolo**, è un **messaggio nel canale della lista** che menziona il ruolo, in risposta alla lista. Discord avvisa tutti quelli che hanno quel ruolo e possono vedere il canale.

In entrambi i casi arriva **entro circa dieci secondi** dall'orario previsto e sempre nel minuto giusto. TTM distribuisce gli invii per restare nei limiti di Discord. Con le [Notifiche push leggibili](/docs/configuration/#readable-push-notifications) spente arriva comunque, ma senza il testo semplice che rende leggibili le anteprime sul telefono.

Un messaggio diretto può essere rifiutato: in quel caso TTM aspetta alcune ore prima di riprovare con quella persona. Vedi [Promemoria con messaggio diretto](/docs/known-limits/#reminders-by-direct-message).

### Non vuoi i promemoria con messaggio diretto?

Decidi tu, dalle impostazioni di Discord:

- **Tenerli senza avviso.** Fai click destro sulla tua conversazione con TTM e scegli *Silenzia*. I promemoria arrivano comunque, in silenzio.
- **Fermarli.** Fai click sul nome del server, poi su *Impostazioni privacy* e disattiva *Messaggi diretti*. Questo blocca i messaggi diretti di tutti i membri di quel server, non solo di TTM.
- **Passare il task a un altro.** Chiedi a chi gestisce la lista di dare il task a qualcun altro, con **Proprietario** <img class="inline-ic" src="/icons/owner.png" alt="" />.

Silenziare il server non basta: silenzia i canali del server, non i tuoi messaggi diretti.

Un ruolo viene avvisato solo se può essere menzionato. Quando succede e che cosa accade con @everyone o con un ruolo eliminato: vedi [Promemoria a un ruolo](/docs/known-limits/#reminders-to-a-role).

## Promemoria ricorrenti

Di base ogni promemoria è un **evento singolo**: un solo avviso, niente da decidere. Le ripetizioni sono una funzione [Premium](/docs/premium/): con il piano Free ogni promemoria è singolo.

Con un piano che li include sono comunque su richiesta: chi gestisce il server attiva **Promemoria ricorrenti** in [/config app](/docs/configuration/#recurring-reminders). Fino a quel momento i menu delle ripetizioni li mostra solo un promemoria che è già ricorrente.

<div class="callout"><div class="callout-t">I promemoria ricorrenti che hai già continuano a funzionare</div>Un promemoria che era già ricorrente continua a scattare con il piano Free e con Premium mentre l'interruttore è spento: puoi cambiargli la data, spostarlo su un altro task o diminuire il numero di volte in cui arriva, ma non aumentarlo. Clonare o importare una lista crea promemoria nuovi, quindi dove non se ne possono creare di ricorrenti un clone o un'importazione rifiuta un promemoria ricorrente: clona senza promemoria, oppure imposta le sue ripetizioni a <code>0</code>.</div>

### I campi della ripetizione

I menu sono tre, nel canale e nell'Activity, quindi non c'è niente da scrivere e nessun formato da sbagliare.

| Menu | Significato | Scelte |
| :--- | :--- | :--- |
| **Quante volte, in tutto** | Quanti avvisi invia il promemoria, **il primo compreso**. **1 volta** è un promemoria singolo. Il massimo è 50 con Premium. Dove i promemoria ricorrenti non possono crescere, con il piano Free o con l'interruttore spento, il menu si ferma al numero che il promemoria ha già e il modulo ne spiega il motivo. | da 1 a 10, poi da 15 a 50 a passi di 5 |
| **Ogni** | Il tempo tra due avvisi, nell'unità del menu successivo. Con **1 volta** non conta. | da 1 a 10, 12, 14, poi da 15 a 50 a passi di 5, 60 e 90 |
| **Unità** | Minuti, ore o giorni. Non ci sono settimane né mesi: una settimana è 7 giorni. | minuti, ore, giorni |

Passando da una volta a più volte, **Ogni** parte da 1 giorno. I menu offrono sempre i valori che il promemoria ha già, anche se non sono nell'elenco:

- un promemoria scritto nel testo di una lista può scattare 37 volte, oppure ogni 48 ore;
- uno che scatta già più di 50 volte mantiene il suo numero;
- un intervallo che mescola le unità, come `1d12h`, appare nella sua unità più piccola, 36 ore: lascia **Ogni** e **Unità** come sono e resta `1d12h`.

<div class="callout"><div class="callout-t">Ora legale: il dettaglio che conta</div>Nel menu <strong>Unità</strong> i <strong>giorni</strong> mantengono lo <strong>stesso orario sull'orologio</strong> anche con il cambio dell'ora, per esempio sempre alle 09:00. Le <strong>ore</strong> sono <strong>esatte</strong>: ogni 24 ore può slittare di un'ora dopo il cambio degli orologi. Scegli quello che corrisponde a ciò che intendi.</div>

## Leggere un promemoria sul task

Sulla riga del task il promemoria mostra sempre la data del **primo** avviso, resa da Discord nell'ora locale di chi legge. Un promemoria ricorrente aggiunge due valori compatti:

`↻` intervallo · `×` volte in tutto

Quindi `↻1h ×4` significa quattro avvisi, uno all'ora, il primo compreso. Un evento singolo mostra **solo la data**: non c'è nessun badge, perché non c'è niente da ripetere.

TTM non toglie mai un promemoria da solo. Un promemoria con tutti gli avvisi **nel passato** resta sul suo task, come traccia. Non invia più niente e non conta tra i promemoria in attesa. Per impostarlo di nuovo, scegli una nuova data: finché non lo fai, Salva resta spento.

Nel testo di una lista lo stesso promemoria è una data nel tuo fuso orario più una tripletta, come `2026-12-08 18:00 [0m,0m,0]`: vedi [Promemoria nel testo](/docs/writing-a-list/#reminders-in-the-text).

## Errori comuni

Molti vengono dalla finestra della data nel canale, dove scrivi la data, l'ora e il fuso. Nell'Activity li scegli da menu, quindi lì non si possono sbagliare.

| Messaggio | Che cosa correggere |
| :--- | :--- |
| *Promemoria non valido* | L'inizio deve essere almeno 5 minuti nel futuro. |
| *Un task completato non può avere un promemoria* | Togli prima la spunta al task, se è ancora da fare; oppure scegli un task che non è spuntato. |
| *La data non esiste* | Controlla insieme giorno, mese e anno (per esempio 31 febbraio). |
| *Ora non valida* | Usa il formato a 24 ore `HH:mm`, per esempio `15:30`. |
| *Oltre il piano* o *Oltre il consentito* | Qui i promemoria ricorrenti non sono disponibili: con il piano Free, o spenti in `/config app`. Un promemoria che era già ricorrente può mantenere il numero di volte in cui arriva o diminuirlo. Lo vedi se il piano o l'impostazione sono cambiati mentre il modulo era aperto: riapri le ripetizioni. |
| *Fuso orario errato* | Il nome non corrisponde a un fuso ufficiale: copialo dalla mappa dei fusi orari. |

Un promemoria non è arrivato, o è andato storto qualcos'altro? Vedi le [FAQ](/docs/troubleshooting/#reminders).
