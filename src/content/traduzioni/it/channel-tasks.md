---
title: Modificare un task nel canale
description: La seconda riga di pulsanti sotto la lista — Contenuto, Proprietario, Tag, Promemoria e Webhook — con le loro finestre e i loro menu.
fonte: b7393a97a79d
---

La seconda riga sotto la lista agisce su **un task alla volta**: il suo testo, il suo proprietario, i suoi tag, il suo promemoria e il suo webhook. Questa pagina mostra dove cliccare. Cosa fa ogni funzione e le sue regole: [Proprietari e tag](/docs/owners-and-tags/), [Promemoria](/docs/reminders/), [Webhook](/docs/webhooks/).

## La seconda riga

Ogni pulsante della seconda riga è un **interruttore a tre stati**. Cliccalo per passare da un colore all'altro, gli stessi che Discord usa per i suoi pulsanti:

- <span class="c-grey">Grigio</span> — spento.
- <span class="c-blue">Blu</span> — attivo in modalità <span class="c-blue">modifica</span>.
- <span class="c-red">Rosso</span> — attivo in modalità <span class="c-red">eliminazione</span>.

Il procedimento è sempre lo stesso: **fai diventare un pulsante blu o rosso, poi scegli il task** nel [menu di spunta](/docs/the-task-list/#the-check-selector). TTM applica l'azione a quel task. Finché un pulsante è blu o rosso, il menu dice cosa succederà, per esempio *Modifica task* o *Elimina task*; con tutti i pulsanti spenti dice *Spunta task*: scegli un task lì per spuntarlo o toglierne la spunta.

Finché non hai scelto un task in questo modo almeno una volta, portare **Contenuto** o **Promemoria** su blu o su rosso ti manda un messaggio che vedi solo tu. Ti dice quale task scegliere e cosa fa premere di nuovo il pulsante. Dopo che hai scelto un task con un pulsante della seconda riga acceso, il messaggio non compare più, su qualsiasi server.

| Pulsante | <span class="c-blue">Blu (modifica)</span> | <span class="c-red">Rosso (eliminazione)</span> |
| :--- | :--- | :--- |
| [**Contenuto**](#content) <img class="inline-ic" src="/icons/task.png" alt="" /> | Cambia il testo del task, in una finestra. | Elimina il task. |
| [**Proprietario**](#owner) <img class="inline-ic" src="/icons/owner.png" alt="" /> | Imposta o cambia il proprietario: una persona o un ruolo. Con [Premium](/docs/premium/) anche più persone. | Toglie il proprietario e anche il suo promemoria. |
| [**Tag**](#tag) <img class="inline-ic" src="/icons/tag.png" alt="" /> | Imposta gli utenti e i ruoli da avvisare, anche più d'uno insieme. | Toglie tutti i tag dal task. |
| [**Promemoria**](#reminder) <img class="inline-ic" src="/icons/alertW.png" alt="" /> | Aggiunge o modifica un promemoria. | Toglie il promemoria. |
| [**Webhook**](#webhook) <img class="inline-ic" src="/icons/api.png" alt="" /> <a class="premium-tag" href="/docs/premium/" title="Sbloccato per ogni server durante la beta">Premium</a> | Collega un webhook al task. | Toglie il webhook dal task. |

Con **Proprietario**, **Tag**, **Promemoria** o **Webhook** su rosso, il menu elenca solo i task che hanno qualcosa da togliere: un proprietario, dei tag, un promemoria o un webhook. Un task fatto solo di tag non compare, perché senza tag non avrebbe più testo. Se nessun task ha qualcosa da togliere, il menu è spento e lo dice, per esempio *Nessun proprietario da eliminare* e ricevi una nota su come aggiungerne uno.

Dopo che usi **Proprietario**, **Tag** o **Promemoria**, il pulsante torna grigio oppure resta acceso per il task successivo: lo decide il tuo server con **Mantieni lo stato dopo la selezione** nel menu **Comportamento** di [/config app](/docs/configuration/#keep-the-state-after-a-selection). Mantenere lo stato cambia cosa possono fare Proprietario e Tag: vedi [Proprietario](#owner) e [Tag](#tag).

## Contenuto

Il **blu** apre una finestra con il testo del task. I suoi tag non sono nella finestra: restano sul task in fondo al testo e li cambia il pulsante **Tag**.

- Gli a capo diventano spazi e i canali compaiono con il nome, come in **Aggiornamento in blocco**.
- Proprietari, tag, promemoria e webhook scritti lì vengono tolti e TTM ti dice cosa ha tolto: hanno i loro pulsanti.
- Un testo lasciato vuoto, o uno che renderebbe la lista troppo lunga, non viene salvato.

Canali, link ed emoji nel testo: vedi [Modificare una lista a mano](/docs/writing-a-list/).

Finché la finestra è aperta, la lista è bloccata per gli altri. Salvando la sblocchi; la ✕ no: vedi [Quando la lista è bloccata](/docs/the-task-list/#when-the-list-is-locked).

Il **rosso** elimina il task. Eliminare un gruppo con dei subtask ti chiede prima una conferma. I suoi subtask restano al loro posto: passano al gruppo sopra oppure diventano task se non ce n'è uno. Non puoi eliminare l'ultimo task: usa **Elimina lista** o **Sigilla lista** in [Altro](/docs/the-task-list/#whats-inside-more).

## Proprietario

Il **blu** mostra un menu sotto i pulsanti, con la scritta *Scegli un task nel menu in alto per prenderlo, o scegli a chi darlo*.

**Per prendere un task**, clicca **Proprietario** finché diventa blu, poi scegli il task nel menu di spunta senza scegliere nessuno: il task diventa tuo e il canale mostra chi l'ha preso. Un task che è già tuo, o che ha un altro proprietario, resta com'è e TTM ti dice perché. Per prendere un task a qualcun altro, scegli te stesso nel menu, conferma la selezione, poi scegli il task: sostituire un proprietario richiede una scelta esplicita.

**Per dare un task a qualcuno**, scegli il proprietario nel menu, conferma la selezione, poi scegli il task. Per dare un task a più persone, una funzione [Premium](/docs/premium/):

1. Clicca **Proprietario** finché diventa blu.
2. Scegli le persone.
3. Conferma la selezione: tocca **Salva** da mobile, oppure clicca fuori dal menu da desktop (vedi [Confermare una selezione](#confirming-a-selection--desktop-vs-mobile)).
4. Scegli il task nel menu di spunta.
5. TTM crea il ruolo (TTM1, TTM2…) e lo assegna a quelle persone.

**Chi riceve il task lo viene a sapere.** La notifica nel canale menziona il nuovo proprietario, quindi Discord lo avvisa: la persona, oppure tutti quelli del ruolo. Quando prendi un task tu, nessuno viene menzionato, perché lo sai già. Con la [Modalità notifica](/docs/configuration/#notification-mode) su *Notifiche disabilitate* non viene pubblicata nessuna notifica, come per ogni altra azione.

Cosa può essere un proprietario e quali ruoli crea TTM: [Proprietari e tag](/docs/owners-and-tags/#owner-a-person-a-role-or-several-people).

Con **Mantieni lo stato dopo la selezione** attivo, **Proprietario** resta blu dopo che prendi un task e il menu resta vuoto: scegli il task successivo per prendere anche quello.

- Un task che ha un altro proprietario carica invece il suo proprietario nel menu; per un ruolo creato da TTM, il menu mostra le persone a cui TTM ha dato il ruolo.
- Ogni modifica che confermi si applica subito a quel task.
- Se svuoti il menu, il proprietario viene tolto e con lui il suo promemoria, come nella modalità rossa.

Per tornare a prendere i task, clicca **Proprietario** finché è di nuovo blu.

Il **rosso** toglie il proprietario e anche il suo promemoria: non resta nessuno a riceverlo. Se il promemoria non è ancora scattato, TTM ti chiede prima di confermare.

## Tag

Il **blu** mostra un menu sotto i pulsanti. Di default scegli lì fino a 25 utenti o ruoli, conferma la selezione (vedi [Confermare una selezione](#confirming-a-selection--desktop-vs-mobile)), poi scegli il task:

- scegli *Anna* e *@Devs* e il task è taggato Anna e @Devs, nient'altro: la tua scelta **sostituisce** i tag del task;
- scegli le persone **prima** del task: con il menu vuoto, TTM ti chiede di selezionare prima almeno un tag.

Il **rosso** toglie tutti i tag dal task.

### Con lo stato mantenuto — due modalità

Con **Mantieni lo stato dopo la selezione** attivo, nel menu **Comportamento** di [/config app](/docs/configuration/#keep-the-state-after-a-selection), il pulsante resta blu dopo ogni task. Cosa fa Tag dipende allora da cosa scegli per primo:

- **Prima le persone** vuol dire **assegnare**.
- **Prima il task**, con il menu ancora vuoto, vuol dire **modifica in diretta**.

**Assegnare — scegli le persone, poi il task.** I tag del task diventano esattamente la tua scelta, come sopra. Le tue scelte restano nel menu, quindi puoi applicare lo stesso insieme al task successivo e a quello dopo, senza sceglierlo di nuovo.

**Modifica in diretta — scegli il task, menu vuoto.** Porta Tag su blu e scegli il task di cui vuoi cambiare i tag, senza scegliere nessuno. Non è un errore: i tag attuali del task si caricano nel menu, già spuntati. Ora modifichi quel task direttamente:

- ogni volta che chiudi il menu, il task si aggiorna subito;
- togli la spunta a qualcuno e lascia il task; spunta qualcuno ed entra nel task;
- non c'è nessun passaggio di conferma e non viene sovrascritto niente: ritocchi l'insieme esistente;
- togli la spunta a tutti per eliminare tutti i tag.

Se scegli un altro task, la modifica si sposta lì. Porta Tag su spento (grigio) per finire: la prossima attivazione riparte da zero.

### Confermare una selezione — desktop o mobile

I menu **Tag** e **Proprietario** permettono di sceglierne più d'uno insieme. Questi menu a selezione multipla **non applicano una scelta appena la spunti**: aspettano che tu **confermi** l'intera selezione. I menu a scelta singola, come il menu di spunta, applicano appena scegli. Come confermi dipende dal dispositivo:

- **Da mobile** sotto il menu aperto compare un pulsante **Salva**. Toccalo per applicare le tue scelte.
- **Da desktop** **non c'è nessun pulsante Salva**. **Clicca in un punto qualsiasi fuori dal menu** per chiuderlo: chiuderlo applica la selezione. Se i tag non sembrano applicarsi, quasi sempre è per questo.

Conta soprattutto nella modifica in diretta di tag o proprietario: da desktop, ogni click fuori dal menu salva una modifica.

## Promemoria

Clicca **Promemoria** <img class="inline-ic" src="/icons/alertW.png" alt="" /> finché diventa **blu**. Poi scegli il task dal menu di spunta: uno non ancora spuntato. TTM apre la finestra **Quando**, intitolata *Imposta il promemoria per il task …*:

| Campo | Formato | Note |
| :--- | :--- | :--- |
| **Giorno** | un numero (1–31) | precompilato |
| **Mese** | un menu a tendina, nella tua lingua | nessuna ambiguità tra `gg/mm` e `mm/gg` |
| **Anno (yyyy)** | un numero | precompilato |
| **Ora (HH:mm)** | `HH:mm`, 24 ore | per es. `15:30` |
| **Fuso orario** | il nome ufficiale di un fuso | precompilato con *il tuo* fuso (finché non lo cambi, quello della lingua del tuo Discord, oppure quello del server) |

Tutto arriva precompilato con **dieci minuti da adesso**. Invialo e il task mostra l'orario programmato. Finché la finestra è aperta, la lista è bloccata per gli altri. Chi riceve il promemoria e il fuso orario: vedi [Promemoria](/docs/reminders/#the-rules).

### La scheda riepilogo

Con i [promemoria ricorrenti](/docs/reminders/#repeating-reminders) attivi (una funzione Premium), inviare **Quando** non salva ancora. TTM ti mostra una scheda riepilogo privata con la data che ha capito, una riga **Ricorrenze** e quattro pulsanti. La riga dice *nessuna, il promemoria arriva una volta sola* per un promemoria singolo, oppure mostra il badge della ricorrenza:

| Pulsante | Cosa fa |
| :--- | :--- |
| **Salva** | Memorizza il promemoria esattamente come lo mostra la scheda. Quando modifichi un promemoria esistente, si accende appena cambi qualcosa. |
| **Modifica data** | Riapre **Quando**, precompilata con i valori attuali. |
| **Modifica ricorrenza** | Apre la finestra della ripetizione, con i suoi tre menu: vedi [I campi della ripetizione](/docs/reminders/#the-repetition-fields). Per un promemoria singolo si apre su 2 volte, ogni 1 giorno. Con **1 volta** il promemoria resta singolo. |
| **Annulla** | Lascia perdere tutto — la lista viene sbloccata. |

<div class="callout"><div class="callout-t">Non viene salvato niente finché non premi Salva</div>Modificare la data o la ricorrenza aggiorna soltanto la scheda. Puoi cambiarle quante volte ti serve e <strong>Annulla</strong> annulla davvero.</div>

Con i promemoria ricorrenti spenti, o sul piano Free, la scheda compare solo quando modifichi un promemoria che è **già ricorrente**, così conserva le sue ripetizioni: vedi [Promemoria ricorrenti](/docs/reminders/#repeating-reminders). Un promemoria nuovo passa direttamente da **Quando** e viene salvato come evento singolo.

### Modificare o togliere

- **Modificare** — clicca **Promemoria** su blu e scegli il task:
  - se il task ha già un promemoria *ripetuto*, o se i promemoria ricorrenti sono attivi, arrivi alla scheda riepilogo, con la data attuale e il badge: cambia solo ciò che serve;
  - altrimenti si apre **Quando**, precompilata con la data attuale;
  - la stessa data e la stessa ricorrenza che il promemoria ha già non cambiano niente: TTM te lo dice e non invia nessuna notifica.
- **Togliere** — clicca **Promemoria** finché diventa **rosso** (modalità eliminazione), poi scegli il task. Il promemoria viene tolto.

<div class="callout"><div class="callout-t">Chiudere una finestra non è annullare</div>Una finestra chiusa con la ✕ lascia la lista bloccata. Usa <strong>Annulla</strong> sulla <a href="#the-summary-card">scheda riepilogo</a> quando c'è; altrimenti vedi <a href="/docs/the-task-list/#when-the-list-is-locked">Quando la lista è bloccata</a>.</div>

## Webhook

I webhook sono una funzione [Premium](/docs/premium/).

Clicca **Webhook** <img class="inline-ic" src="/icons/api.png" alt="" /> finché diventa **blu**, scegli il webhook dal menu che compare, poi scegli il task. Da quel momento, completare o riaprire quel task fa partire la chiamata. Clicca **Webhook** finché diventa **rosso** e scegli il task per togliere il collegamento.

I webhook si creano con [/config webhook](/docs/config-webhook/), da chi gestisce il server. La finestra **Contenuto** non mostra il webhook di un task e toglie quello che scrivi lì, avvisandoti. In **Aggiornamento in blocco** compare come un token: vedi [Webhook nel testo](/docs/writing-a-list/#webhooks-in-the-text).

## Dove andare dopo

- [La lista nel canale](/docs/the-task-list/) — il menu di spunta, la prima riga e Altro.
- [Lavorare su una lista nell'Activity](/docs/activity-list/) — gli stessi cinque pulsanti, nel pannello di un task.
- [FAQ](/docs/troubleshooting/#in-the-channel) — risposte rapide ai problemi più comuni.
