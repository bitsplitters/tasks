---
title: /config app
description: Personalizza notifiche, cronologia, promemoria, fuso orario e permessi con /config app.
fonte: cc3b2bd36302
---

Esegui il comando:

```
/config app
```

TTM apre un pannello privato con un riepilogo delle tue impostazioni attuali: prima il pulsante **Suggerimenti**, poi cinque menu a tendina e altri due pulsanti. Niente qui è definitivo — cambialo ogni volta che le esigenze del tuo team cambiano.

Di default, solo i membri con il permesso *Gestisci server* possono usare `/config app`, come il resto di `/config`. Vedi [Chi può aprire /config](/docs/config/#who-can-open-config).

Le impostazioni valgono per le liste nel canale e nell'[Activity](/docs/activity/) allo stesso modo. Dove una conta in un solo posto, o funziona in modo diverso nei due, la sua sezione lo dice.

## Suggerimenti

Il primo gruppo del pannello è un pulsante che mostra se i suggerimenti sono attivi: verde con **Attivi** quando lo sono, grigio con **Disattivati** quando non lo sono. Cliccalo per cambiare. I suggerimenti valgono nel canale e nell'Activity.

I suggerimenti aiutano chi è nuovo in TTM, in quattro posti:

- quando qualcuno esegue `/crea-lista`, una breve spiegazione su come scrivere una lista e un invito a provare la modalità Activity, con i pulsanti **Crea la tua lista** e **Tutorial**: la lista nuova prende il posto della spiegazione;
- sotto ogni lista nel canale, una piccola riga che rimanda alla guida in Discord: *Non sai cosa fanno i pulsanti? Altro → Guida*, con un link a [La lista nel canale](/docs/the-task-list/);
- sotto la lista nell'Activity, una riga che dice dove toccare: *Non sai da dove partire? Tocca una casella per spuntare un task, il suo testo per il resto.* Vedi [Lavorare su una lista nell'Activity](/docs/activity-list/);
- in una lista nuova, la prima notifica nel canale finisce con una breve spiegazione: perché TTM pubblica le notifiche, cos'è il thread della cronologia e dove si impostano. Compare una volta per lista: vedi [Quando una lista viene creata](#when-a-list-is-created).

Attivi di default: comodi mentre il team impara i pulsanti, facili da spegnere quando tutti li conoscono. Con i suggerimenti nascosti:

- `/crea-lista` apre subito la finestra di creazione, senza il pulsante **Tutorial**: vedi [Per cominciare](/docs/getting-started/#2-create-your-first-list);
- le liste finiscono senza la riga di aiuto;
- le liste nuove pubblicano la prima notifica senza la spiegazione.

Una lista recepisce la modifica al suo prossimo aggiornamento. In ogni caso la [barra di avanzamento](/docs/the-task-list/#under-the-list) resta e una lista bloccata finisce comunque con la riga che dice chi la sta modificando: vedi [Quando la lista è bloccata](/docs/the-task-list/#when-the-list-is-locked).

## Modalità notifica

Controlla quanto rumore di notifiche lascia il bot nel canale quando si selezionano i task:

| Opzione | Comportamento |
| :--- | :--- |
| Elimina tutte le notifiche tranne l'ultima | Elimina tutte le notifiche tranne la più recente. |
| Elimina tutte le notifiche tranne le ultime due | Elimina tutte tranne le ultime due. |
| Nessuna notifica eliminata | Non elimina mai le notifiche. |
| Notifiche disabilitate | Non pubblica per niente le notifiche di selezione dei task. |

Quando una spunta completa l'intera lista, la sua notifica dice **Lista completata** sotto chi ha spuntato e così fa anche il [thread della cronologia](#history-tracking).

Nell'Activity le spunte non pubblicano una notifica una per una: quando la lista torna nel canale, il riepilogo della sessione segue questa impostazione. Vedi [Tornare nel canale](/docs/activity/#back-to-the-channel).

### Quando una lista viene creata

Una lista nuova pubblica sotto di sé la propria notifica: *ho creato la lista*, con un link alla lista. Arriva da `/crea-lista`, dal Tutorial, da un'importazione da file, da una clonazione e da **Nuova lista** nell'Activity.

Una clonazione la pubblica nel canale nuovo e il canale della lista originale riceve la solita notifica della clonazione. Con la modalità **Notifiche disabilitate** non viene pubblicato niente nel canale, ma il thread della cronologia registra comunque la creazione.

Con [Menziona i proprietari nelle liste nuove](#mention-owners-in-new-lists) attivo, la notifica menziona i proprietari dei task, quindi Discord li avvisa. Una lista creata nell'Activity li menziona nel riepilogo che la segue quando torna nel canale.

Con i [Suggerimenti](#tips) attivi, la prima notifica di una lista nuova finisce con una spiegazione: perché TTM pubblica le notifiche e, con il tracciamento della cronologia attivo, cos'è il thread.

Compare una volta per lista e solo se suggerimenti e notifiche erano entrambi attivi quando la lista è stata creata: un team che ne ha spento uno sa già come muoversi. Le liste create prima che arrivasse questa spiegazione non la mostrano.

## Tracciamento cronologia

Quando è attivo, **ogni azione sulle tue liste viene registrata in un thread dedicato** e ottieni una traccia di chi ha fatto cosa e quando. Attivo di default. Il thread parte con la lista: la sua prima riga dice chi l'ha creata.

Le liste nei canali vocali non hanno un thread della cronologia, perché Discord non permette i thread lì: vedi [Canali vocali](/docs/known-limits/#voice-channels). Una sessione nell'Activity va nel thread per intero, una riga per modifica, quando la lista torna nel canale.

## Comportamento

Un menu a tendina con tre opzioni: **Notifiche push leggibili**, **Mantieni lo stato dopo la selezione** e **Menziona i proprietari nelle liste nuove**. Decidono cosa fa TTM quando qualcuno agisce su una lista. Spunta quelle che vuoi attive: puoi spuntarle tutte e tre, alcune o nessuna.

### Notifiche push leggibili

Quando è attiva, TTM aggiunge testo semplice accanto agli embed, così le tue **notifiche push da mobile** si leggono a colpo d'occhio. Gli embed da soli spesso compaiono vuoti sulla schermata di blocco. Attiva di default.

Spegnerla non ferma mai un promemoria: arriva con la sola scheda — o, per un ruolo, la sola menzione. Le menzioni dei proprietari partono comunque anche con l'opzione spenta, da sole.

### Mantieni lo stato dopo la selezione

Solo nel canale. Dopo che usi **Proprietario**, **Tag** o **Promemoria** nella seconda riga sotto la lista, questa opzione decide se il pulsante torna grigio o **mantiene** la modalità attiva.

Spenta di default: il pulsante torna grigio. Attivala quando applichi la stessa azione a più task di fila.

Cambia anche cosa possono fare **Tag** e **Proprietario**. Con l'opzione spenta, la tua scelta sovrascrive sempre. Con l'opzione accesa hai anche la modifica in diretta dei tag o del proprietario esistenti di un task. Vedi [Tag](/docs/channel-tasks/#tag) per il quadro completo.

Nell'Activity il pannello di un task funziona sempre allo stesso modo: dopo un'azione resta sul task, con i pulsanti grigi. Vedi [Il pannello di un task](/docs/activity-list/#the-panel-of-a-task).

### Menziona i proprietari nelle liste nuove

Quando qualcuno crea, importa o clona una lista, la sua prima notifica menziona i proprietari dei suoi task: persone e ruoli, ciascuno una volta, nell'ordine della lista. Le menzioni stanno nel testo semplice della notifica, quindi Discord avvisa i proprietari.

Chi ha creato la lista non viene menzionato: lo sa già. Non viene menzionato nemmeno @everyone, anche quando è proprietario di un task: una lista nuova non avvisa tutto il server.

Attiva di default, anche sui server che hanno aggiunto TTM prima che arrivasse questa opzione. Una lista creata dentro una sessione dell'Activity menziona i suoi proprietari nel riepilogo, quando torna nel canale. Vedi [Quando una lista viene creata](#when-a-list-is-created).

## Aspetto delle liste

Un menu a tendina con due opzioni: **Task completati in secondo piano** e **Spazi tra i gruppi**. Decidono come si vedono i task nelle liste. Spunta quelle che vuoi attive: entrambe, una o nessuna. Una lista già in un canale recepisce la modifica al suo prossimo aggiornamento, per esempio quando qualcuno spunta un task.

Entrambe cambiano la lista nel canale. Nell'Activity ognuno imposta il proprio aspetto con l'ingranaggio: vedi [Le tue impostazioni](/docs/activity/#your-settings).

### Task completati in secondo piano

Mostra ogni task completato nel testo più piccolo e grigio di Discord, così quello che resta da fare risalta. Attiva di default; spegnila per mostrare i task completati come tutti gli altri. Una lista recepisce la modifica al suo prossimo aggiornamento.

### Spazi tra i gruppi

Mette una riga vuota sopra e sotto ogni task che ha dei subtask, così ogni gruppo si stacca dal resto della lista.

Spenta di default, per una lista più compatta: i server che hanno aggiunto TTM prima della versione 2.0.0 la hanno accesa finché un admin non la spegne.

Cambia solo la lista: le notifiche restano come sono. Discord non ha una riga vuota più sottile per una lista, quindi la scelta è tra una riga intera e nessuna.

## Promemoria ricorrenti

Spenti di default. Quando sono spenti, ogni promemoria è un **evento singolo**: crearne o modificarne uno è un **flusso in un solo passaggio** — scegli data e ora, nient'altro. Più semplice e veloce per i team che hanno bisogno solo di un avviso una tantum.

**Attivali** per sbloccare **ripetizioni e intervalli**. Nel canale, la creazione di un promemoria usa allora il flusso in due passaggi: una [scheda riepilogo](/docs/channel-tasks/#the-summary-card) più una finestra di ripetizione. Nell'Activity, i menu della ripetizione si aggiungono alla data nel [pannello del promemoria](/docs/activity-list/#reminder). Vedi [I campi della ripetizione](/docs/reminders/#the-repetition-fields).

I promemoria ricorrenti sono una funzione [Premium](/docs/premium/). Sul piano Free questo menu a tendina è mostrato ma spento e la sua nota lo dice. La tua scelta non va persa: su Premium il menu a tendina torna impostato come l'avevi lasciato.

L'emoji Premium nel titolo del gruppo compare su ogni server, Premium compreso: segnala una funzione Premium, non una funzione assente.

Un promemoria che è *già* ricorrente continua a scattare anche con l'interruttore spento, o sul piano Free. Cosa puoi ancora cambiare: vedi [Promemoria ripetuti](/docs/reminders/#repeating-reminders).

## Fuso orario

Imposta il fuso orario in cui lavora il tuo team. I membri possono comunque usare il proprio per i promemoria: finché non ne scelgono uno, TTM propone il fuso della loro lingua di Discord e questo solo quando la loro lingua è parlata in più fusi, come l'inglese (US). Vedi [Il tuo fuso orario](/docs/reminders/#your-time-zone).

Clicca il pulsante, poi incolla il nome ufficiale di un fuso — cercalo sulla **[mappa dei fusi orari](https://timezones.bitsplitters.app)**.

## Sincronizza permessi

Di default, i permessi di integrazione di Discord nascondono solo i *comandi* — i pulsanti e le liste generati restano utilizzabili da tutti. Clicca **Carica permessi** per estendere le tue regole sui permessi anche a quei componenti. Dopo la sincronizzazione, **gli utenti non abilitati vedono la lista in sola lettura**.

Definisci le regole in *Impostazioni del server → Integrazioni → Team Tasks Manager*, poi sincronizza. Vengono rispettate anche le restrizioni dei canali: se un canale è vietato a un utente, le liste che ci vivono sono in sola lettura per lui. Il pulsante **Activity** sotto la lista segue le stesse regole: vedi [Quando la lista non si apre](/docs/activity/#when-the-list-doesnt-open).

<div class="callout"><div class="callout-t">I webhook hanno un comando tutto loro</div>I webhook non si configurano da questo pannello: usa <a href="/docs/config-webhook/"><code>/config webhook</code></a>. Che cosa fanno: vedi <a href="/docs/webhooks/">Webhook</a>.</div>

<div class="callout"><div class="callout-t">Cerchi le tue liste?</div>Questo pannello contiene le <em>impostazioni</em> — come si comporta il bot. Per vedere le liste che ha questo server e per eliminarne, sigillarne o rigenerarne una, usa <code>/config lists</code>: vedi <a href="/docs/config-lists/">/config lists</a>.</div>
