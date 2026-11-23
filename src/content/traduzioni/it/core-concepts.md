---
title: Concetti di base
description: Una lista in due posti, il vocabolario di TTM (task, gruppi, proprietari, tag, promemoria) e i permessi che chiede.
fonte: c2c6dfc26190
---

Alcuni termini ricorrono in tutta l'app. Imparali una volta e il resto va a posto da solo.

## Una lista, due posti

Una lista vive in un messaggio in un canale di Discord, dove tutti la trovano. L'**Activity** apre la stessa lista in una finestra dentro Discord, dove più persone ci lavorano insieme e vedono ogni modifica in tempo reale. È la stessa lista, non una copia.

Una lista sta in un posto alla volta. Finché è nell'Activity, il suo messaggio nel canale tiene solo **Entra nell'Activity**. Quando tutti escono, la lista torna nel canale con un riepilogo di ciò che è cambiato.

Ciò che una lista può fare è uguale nei due posti: proprietari, tag, promemoria, webhook, le impostazioni del tuo server e i limiti del tuo piano. Cambia il modo di farlo. Nel canale usi i menu e i pulsanti sotto il messaggio. Nell'Activity tocchi la casella di un task o il suo testo. Queste pagine sono divise allo stesso modo:

- **Funzioni** — che cosa fa ogni funzione e le sue regole, uguali nei due posti.
- **Nel canale** — il messaggio della lista, i suoi menu e i suoi pulsanti.
- **Nell'Activity** — la finestra, le caselle e il pannello di ogni task.

Alcune azioni esistono solo nel canale: Clona, Download, Sigilla, Elimina, Sblocca e l'importazione da file. Vedi [Cosa resta nel canale](/docs/activity/#what-stays-in-the-channel).

## Task, subtask e gruppi

| Termine | Che cos'è |
| :--- | :--- |
| **Task** | Una singola attività, né un subtask né un gruppo. |
| **Subtask** | Un'attività che appartiene a una più grande. |
| **Gruppo di task** | Un task fatto di subtask. |

Non scegli mai questi tipi da un menu: TTM li ricava da come scrivi la lista. Una riga che inizia con `-` è un task. Gli spazi prima del trattino la trasformano in un subtask della riga sopra. Un task con dei subtask diventa automaticamente un **gruppo**. Il formato completo: [Scrivere una lista](/docs/writing-a-list/).

I gruppi si comportano come un'unità: spuntare un gruppo spunta anche i suoi subtask e spuntare tutti i subtask segna il gruppo come completato.

## Stato di un task

Ogni task è **aperto** oppure **completato**, come mostra la sua casella:

- **Aperto** <img class="inline-ic" src="/icons/checkbox_empty.png" alt="" /> — ancora da fare.
- **Completato** <img class="inline-ic" src="/icons/checkbox_marked.png" alt="" /> — fatto.

Nel canale spunti o despunti un task nel [menu di spunta](/docs/the-task-list/#the-check-selector), il menu sotto la lista. Nell'Activity tocchi la sua [casella](/docs/activity-list/#tick-a-task). Completare o riaprire un task può far partire notifiche e webhook.

### Chi può spuntare un task

**Solo il proprietario può spuntare o despuntare un task che ha un proprietario.** Possono farlo:

- il proprietario, o i membri del ruolo proprietario;
- chi ha *Gestisci messaggi* sul canale.

Chiunque altro riceve un rifiuto che vede solo lui e non cambia nulla. La regola vale anche per i subtask: non puoi spuntare o despuntare un gruppo se questo cambia un subtask che appartiene a qualcun altro. Chiunque possa usare la lista può spuntare un task senza proprietario.

## Proprietario o tag

Sembrano simili ma hanno compiti diversi:

- **Proprietario** <img class="inline-ic" src="/icons/owner.png" alt="" /> — la persona o il ruolo *responsabile* del task. Un task ha un solo proprietario e con Premium può essere composto da più persone: TTM crea un ruolo per loro (vedi [I ruoli che crea TTM](/docs/owners-and-tags/#the-roles-ttm-creates)).
- **Tag** <img class="inline-ic" src="/icons/tag.png" alt="" /> — uno o più utenti o ruoli *menzionati* sul task, per esempio le persone da avvisare quando viene completato.

Le regole di entrambi: [Proprietari e tag](/docs/owners-and-tags/).

## Promemoria

Un **promemoria** <img class="inline-ic" src="/icons/alertW.png" alt="" /> collega a un task una pianificazione: una data, un'ora e un fuso orario. Quando scade, TTM ricorda il **proprietario** del task, così nessuno deve controllare di continuo. Una persona riceve un messaggio diretto e un ruolo riceve una menzione nel canale della lista.

Di default il promemoria suona una volta sola e nel piano Free è l'unico tipo. I promemoria ricorrenti aggiungono un intervallo e un numero di ripetizioni. Sono una funzione Premium che un server attiva in [Configurazione](/docs/configuration/#recurring-reminders). Tutti i dettagli in [Promemoria](/docs/reminders/).

## Notifiche e cronologia

Quando una lista viene creata, o un task viene spuntato o despuntato, TTM può pubblicare una notifica e, se lo attivi, registrare ogni azione in un **thread della cronologia** dedicato. La notifica di una lista nuova può menzionare i proprietari dei suoi task, così lo vengono a sapere. Le modifiche fatte nell'Activity arrivano in un unico riepilogo, quando la lista torna nel canale. Quanto rumore vuoi è del tutto una tua scelta: vedi [Configurazione](/docs/configuration/).

## Chi può usare liste e comandi

Di default i comandi dell'app seguono le regole di visibilità di Discord (Impostazioni del server → Integrazioni). Pulsanti e liste restano invece usabili da chiunque, a meno che tu non **sincronizzi i permessi**: da quel momento la lista diventa di sola lettura per chi non è autorizzato, nel canale e nell'Activity. Anche questo sta in [Configurazione](/docs/configuration/#sync-permissions).

`/config` ha una regola tutta sua: di default lo vedono solo i membri con *Gestisci server*. Un amministratore può cambiarlo in *Impostazioni del server → Integrazioni*. Vedi [Chi può aprire /config](/docs/config/#who-can-open-config).

Alcune azioni hanno una regola propria:

- solo il proprietario può spuntare o despuntare un task che ha un proprietario: vedi [Chi può spuntare un task](#who-can-tick-a-task);
- sigillare o eliminare una lista dal suo pannello *Altro*, nel canale, richiede *Gestisci messaggi* sul canale. Da `/config lists` valgono i permessi di `/config`;
- aprire una lista nell'Activity richiede il permesso di Discord *Usare le attività* sul canale: vedi [Quando la lista non si apre](/docs/activity/#when-the-list-doesnt-open).

## I permessi che chiede TTM

Quando inviti il bot, Discord mostra i permessi che chiede. Ecco a che cosa serve ciascuno:

| Permesso | Perché serve |
| :--- | :--- |
| Visualizzare il canale | Vedere il canale dove vive la lista |
| Inviare messaggi | Pubblicare e aggiornare la lista |
| Incorporare link | Mostrare la lista come embed |
| Gestisci messaggi | Cancellare le vecchie notifiche del bot, così il canale resta leggibile |
| Creare thread pubblici | Creare il thread della cronologia facoltativo, nei canali di testo |
| Gestisci webhook | Scrivere nel thread della cronologia, nei canali di testo |
| Connettersi | Pubblicare la lista nella chat di un canale vocale |
| Allegare file | Fornire il download della lista |
| Leggere la cronologia dei messaggi | Tenere la lista sincronizzata |
| Menzionare tutti | Avvisare le persone che tagghi su un task e il ruolo proprietario di un task quando scade il suo promemoria |
| Gestisci ruoli | Creare il ruolo che rende proprietarie di un task più persone (Premium) |
| Usare emoji esterne | Mostrare le icone del bot su pulsanti e liste |

**In un canale vocale** una lista vive nella chat del canale, che non ha una cronologia: lì a TTM non servono *Creare thread pubblici* e *Gestisci webhook*. Gli serve *Connettersi*, il permesso di entrare nel canale vocale, perché senza non può pubblicare nella chat. TTM lo chiede quando lo inviti e Discord lo dà a tutti di default; se il tuo server lo toglie su un canale vocale, concedilo a TTM lì, altrimenti `/crea-lista` ti dirà che manca. Vedi [Canali vocali](/docs/known-limits/#voice-channels).

<div class="callout"><div class="callout-t">Da sapere</div>Puoi concederli anche dopo da <em>Impostazioni del server → Ruoli → Team Tasks Manager</em>, oppure per singolo canale dalle impostazioni dei permessi del canale. <em>Gestisci ruoli</em> fa eccezione: vale solo sul ruolo del bot, non per canale.</div>
