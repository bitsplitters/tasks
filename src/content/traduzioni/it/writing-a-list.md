---
title: Modificare una lista a mano
description: Modifica una lista scrivendo il suo testo, per cambiare molte cose insieme o incollare una lista da un'altra parte. Per tutto il resto usa i pulsanti, che sono più semplici e non fanno sbagliare.
fonte: 59a51484e014
---

Questa pagina è per quando preferisci cambiare tu il testo di una lista, in **Aggiornamento in blocco** nel canale o in **Modifica la lista** nell'Activity.

I pulsanti fanno le stesse cose senza errori: **Proprietario**, **Tag**, **Promemoria** e **Webhook** scrivono i codici per te e TTM li controlla mentre procedi. Usa prima quelli. Il testo serve per molte modifiche insieme o per una lista che copi da un'altra parte.

Il trattino e gli spazi che fanno task e subtask sono in [Crea la tua prima lista](/docs/getting-started/#2-create-your-first-list). Lo stesso testo è in `/crea-lista`, in **Nuova lista** nell'Activity e nel file che ti dà **Download**.

Nella form **Contenuto** di un singolo task, proprietario, tag, promemoria e webhook hanno i loro pulsanti: la form toglie un proprietario, un promemoria o un webhook che scrivi e te lo dice.

<div class="howto"><div class="howto-t">Come si fa</div><div class="howto-grid"><a class="howto-go is-channel" href="/docs/the-task-list/#bulk-update"><span class="howto-k"><img class="place-ic" src="/icons/posto-canale.svg" alt="" />Nel canale</span><span class="howto-d">Aggiornamento in blocco, nella prima riga sotto la lista.</span></a><a class="howto-go is-activity" href="/docs/activity-list/#edit-the-list"><span class="howto-k"><img class="place-ic" src="/icons/activity.png" alt="" />Nell'Activity</span><span class="howto-d">Modifica la lista, in alto nella lista.</span></a></div></div>

## Riepilogo rapido

| Vuoi | Scrivi |
| :--- | :--- |
| [Un task](#tasks-and-subtasks) | `- Rilascialo` |
| [Un subtask](#tasks-and-subtasks) | `  - Scrivere le note`, sotto il suo task |
| [Un task completato](#tasks-and-subtasks) | `- [X] Rilascialo` |
| [Menzionare una persona](#mentioning-people-and-roles) | il pulsante **Tag**, oppure `@Nome` |
| [Una di due persone con lo stesso nome](#mentioning-people-and-roles) | `@Nome (nomeutente)` |
| [Menzionare qualcuno di nuovo](#writing-someone-new) | il pulsante **Tag**, oppure `<@ID>` |
| [Menzionare un ruolo](#mentioning-people-and-roles) | il pulsante **Tag**, oppure `@Ruolo` |
| [Scrivere @ senza una menzione](#writing--without-a-mention) | `\@Nome` |
| [Impostare il proprietario](#owners-the-mention-with-a-colon) | il pulsante **Proprietario**, oppure `@Nome:` |
| [Impostare come proprietario qualcuno di nuovo](#writing-someone-new) | il pulsante **Proprietario**, oppure `<@ID>:` |
| [Collegare un canale](#linking-channels) | `#canale` |
| [Aggiungere un link](#adding-a-hyperlink) | `[testo](https://url)` |
| [Collegare un indirizzo email o un telefono](#adding-a-hyperlink) | `[testo](mailto:nome@example.com)`, `[testo](tel:+12025550100)` |
| [Mostrare l'emoji di un pulsante](#button-emoji) | `:owner:`, `:reminder:`, `:content:`, `:more:`, `:activity:` |
| [Un promemoria a una data](#reminders-in-the-text) | il pulsante **Promemoria**, oppure `2026-12-08 18:00 [0m,0m,0]` |
| [Un promemoria in un altro fuso orario](#reminders-in-the-text) | `2026-12-08 18:00 America/New_York [0m,0m,0]` |
| [Un promemoria due giorni dopo il salvataggio](#reminders-in-the-text) | `[2d,0m,0]` |
| [Collegare un webhook](#webhooks-in-the-text) | il pulsante **Webhook**, oppure `{{wb=nome}}` |

## Task e subtask

```
- [X] Prenotare i canali vocali
- [] Preparare i tabelloni
  - [X] Raccogliere le iscrizioni
  - [] Sorteggiare le squadre
- [] Pubblicare il regolamento
```

- **Una riga che inizia con `-` è un task.**
- **Gli spazi prima del trattino ne fanno un subtask** del task sopra. Un task con dei subtask diventa un **gruppo**.
- **La prima riga non può essere un subtask.**
- **La casella va dopo il trattino**: `[]` per un task da fare, `[X]` per uno completato. Cambiala per spuntare o togliere la spunta al task. Una riga nuova senza casella è un task da fare.
- **Il titolo** può avere fino a 90 caratteri.
- **La lista** può arrivare a circa 4000 caratteri e 50 task, subtask compresi. Dopo la beta il piano Free ammette 20 task: vedi [Cosa sblocca Premium](/docs/premium/).

## Persone, ruoli e canali per nome

Nel testo persone, ruoli e canali si scrivono per nome, come li mostra Discord: `@Ava`, `@Moderatori`, `#generale`.

Quando salvi, TTM trasforma ogni nome in una menzione, così la lista notifica e collega come sempre. Quando riapri la form, i nomi sono tornati.

La riga sotto il testo, nel canale e nell'Activity, rimanda qui per aggiungere qualcuno di nuovo: vedi [Scrivere qualcuno di nuovo](#writing-someone-new).

## Menzionare persone e ruoli

Il pulsante **Tag** aggiunge le menzioni per te: vedi [Tag](/docs/owners-and-tags/#tags). Nel testo scrivi `@` e il nome:

```
- Chiedere ad @Ava di controllare il regolamento, poi avvisare @Moderatori
```

Queste menzioni sono i **tag** del task: copiale, spostale o rimuovile come vuoi.

- **Una persona** si scrive con il nome che mostra il server: il suo soprannome nel server, altrimenti il nome visualizzato, altrimenti il nome utente. Maiuscole e minuscole non contano.
- **Per nome scrivi le persone che la lista menziona già.** Qualcuno di nuovo si aggiunge con il pulsante **Proprietario** o **Tag** oppure con il suo codice: vedi [Scrivere qualcuno di nuovo](#writing-someone-new).
- **Un ruolo** è `@` e il suo nome: `@Moderatori`. Funziona ogni ruolo del server, anche uno che la lista non menziona ancora.
- **Due persone con lo stesso nome** compaiono con il nome utente tra parentesi: `@Mario (mario.rossi)` e `@Mario (mario_b)`. Scrivile così. Un nome che corrisponde a più di una persona non si può salvare e il messaggio elenca le forme da scrivere.
- **Un nome che TTM non conosce**, come `@elonmusk`, resta testo semplice. Al posto del proprietario invece è un errore: vedi [Proprietari: la menzione con i due punti](#owners-the-mention-with-a-colon).

Vince il nome più lungo: con Mario e Mario Rossi sul server, `@Mario Rossi` è Mario Rossi. Un nome conta solo come parola intera, quindi `@Leonardo` non è `@Leo` seguito da «nardo».

Alcune `@` non sono mai un nome:

- `@everyone` e `@here`;
- una `@` isolata;
- un indirizzo email, come `ava@example.com`;
- tutto ciò che sta dentro un link o tra apici inversi.

### Scrivere qualcuno di nuovo

I pulsanti **Proprietario** e **Tag** scelgono dal menu di Discord, quindi raggiungono chiunque nel server senza nessun codice.

Nel testo scrivi il codice della persona dove andrebbe il nome: `<@`, il suo ID e `>`, come `<@123456789012345678>`. Da solo è un tag; seguito da due punti è il proprietario. Due modi per ottenerlo:

- in una qualsiasi chat di Discord scrivi `\@` e l'inizio del suo nome, scegli la persona dal menu e invia: il messaggio mostra il suo codice, pronto da copiare;
- con la **Modalità sviluppatore** attiva (Impostazioni utente → Avanzate), clicca con il tasto destro sulla persona → **Copia ID**, poi scrivi l'ID tra `<@` e `>`.

Salva: la prossima volta che la form si apre la persona compare per nome.

### Scrivere @ senza una menzione

Metti una barra rovesciata davanti a un nome che TTM conosce: `\@Ava` resta la parola @Ava e nessuno viene menzionato. `\#generale` fa lo stesso per un canale.

Ogni altra `@parola` resta testo da sola, senza barra rovesciata. L'eccezione è l'inizio di un task, seguita da due punti, dove sarebbe un proprietario: scrivi `\@parola:`.

TTM conserva la tua barra rovesciata. La lista mostra la parola senza barra e la form la mostra di nuovo la volta dopo, così distingui la parola dalla menzione. TTM non aggiunge mai una barra rovesciata di sua iniziativa.

## Proprietari: la menzione con i due punti

Il pulsante **Proprietario** imposta il proprietario di un task per te: vedi [Proprietario](/docs/owners-and-tags/#owner-a-person-a-role-or-several-people). Nel testo il proprietario è una menzione seguita da **due punti**, all'inizio del task:

```
- @Ava: Pubblicare le note di rilascio
```

- **Un ruolo** funziona allo stesso modo: `@Moderatori:`. Anche un codice: `<@123456789012345678>:`.
- **Senza i due punti** la stessa menzione è solo un tag, non un proprietario.
- **Nel resto del task** un nome seguito dai due punti resta testo semplice: in `chiedi a @Ava: le chiavi` nessuno viene menzionato. Per menzionare Ava lì, lascia uno spazio prima dei due punti: `@Ava :`.
- **Il nome del proprietario** va dalla `@` ai due punti, quindi `@Ava Rossi:` è un errore anche quando TTM conosce Ava.
- **Un nome che TTM non conosce** è un errore al posto del proprietario. TTM non salva nulla e il messaggio dice di scegliere il proprietario con il pulsante **Proprietario** o di scrivere il suo codice.
- **Per iniziare un task con `@parola:` come testo semplice**, vedi [Scrivere @ senza una menzione](#writing--without-a-mention). La form Contenuto non ha un proprietario, quindi lì `@parola:` resta testo semplice.

## Collegare i canali

Scrivi `#` e il nome del canale, come lo mostra la barra laterale:

```
- Specifiche in #design, rilascio da #rilasci
```

Funziona ogni canale che puoi menzionare: canali di testo, annunci, vocali, stage, forum, media e thread attivi. Le categorie no.

<div class="callout"><div class="callout-t">Funziona anche il link di un canale</div>Clicca con il tasto destro sul canale nella barra laterale → <strong>Copia link</strong> e incollalo nel task: TTM riconosce il link e lo <strong>abbrevia in un tag di canale</strong>, che la form poi mostra come <code>#nome</code>. I link che puntano a uno specifico <em>messaggio</em> restano come sono: rimangono link cliccabili.</div>

## Aggiungere un link

Per i link a qualsiasi cosa fuori da Discord usa il Markdown standard:

```
[la nostra roadmap](https://example.com/roadmap)
```

La lista mostra **[la nostra roadmap](https://example.com/roadmap)**: un link pulito e cliccabile al posto di un URL nudo.

La destinazione non deve per forza essere una pagina web. I link `mailto:`, `tel:` e `sms:` funzionano allo stesso modo e aprono l'app di chi legge:

```
[il responsabile del rilascio](mailto:release@example.com)
[il telefono di reperibilità](tel:+12025550100)
```

Il primo trasforma un task in un «scrivi a questa persona» con un click. Il secondo compone il numero direttamente da un telefono.

Un link può anche puntare a **un'altra lista**: clicca con il tasto destro sul suo messaggio → **Copia link del messaggio** e incollalo tra le parentesi. I link ai messaggi restano come sono: solo i link semplici a un canale diventano un tag `#canale`.

## Emoji dei pulsanti

Un task può mostrare l'emoji di un pulsante della lista, come fanno le lezioni del [Tutorial](/docs/getting-started/#2-create-your-first-list). Nel testo ognuna di queste emoji compare come un nome breve:

| Nome | Nel testo | Pulsante |
| :--- | :---: | :--- |
| `:owner:` | <img class="inline-ic" src="/icons/owner_blue.png" alt="" /> | **Proprietario** <img class="inline-ic" src="/icons/owner.png" alt="" /> |
| `:reminder:` | <img class="inline-ic" src="/icons/alert_blue.png" alt="" /> | **Promemoria** <img class="inline-ic" src="/icons/alertW.png" alt="" /> |
| `:content:` | <img class="inline-ic" src="/icons/task_blue.png" alt="" /> | **Contenuto** <img class="inline-ic" src="/icons/task.png" alt="" /> |
| `:more:` | <img class="inline-ic" src="/icons/other_blue.png" alt="" /> | **Altro** <img class="inline-ic" src="/icons/other.png" alt="" /> |
| `:activity:` | <img class="inline-ic" src="/icons/activity_blue.png" alt="" /> | **Activity** <img class="inline-ic" src="/icons/activity.png" alt="" /> |

Lascia un nome dov'è e l'emoji resta. Scrivine uno tu in minuscolo e la lista mostra l'emoji del pulsante: comodo quando un task dice quale pulsante premere. Qualsiasi altra parola tra due punti resta come l'hai scritta.

## Promemoria nel testo

Il pulsante **Promemoria** imposta un promemoria per te e lo controlla mentre procedi: vedi [Promemoria](/docs/reminders/). Nel testo un promemoria è una data seguita da una tripletta, prima del proprietario:

```
- [] 2026-12-08 18:00 [2d3h,1h,3] @Ava: Pubblicare le note di rilascio
```

**La data** si scrive `YYYY-MM-DD HH:mm`, uguale in ogni lingua, nel tuo fuso orario: vedi [/my timezone](/docs/my-timezone/). Cambia la data e salva: il promemoria si sposta. Solo la data subito prima di una tripletta è un promemoria: una data in qualsiasi altro punto resta come l'hai scritta.

- **Una data in un altro fuso** porta il fuso dopo l'ora: `2026-12-08 18:00 America/New_York`. Vale solo per quella data e prevale su ogni altro fuso: comodo per conservare un orario che qualcuno ti ha dato nel suo.
- **Il fuso** si scrive con il suo nome, come `Europe/Rome`, in maiuscolo o minuscolo, oppure come UTC o GMT con lo scarto, come `GMT-5:30`.
- **Le sigle** come CET o EST non sono accettate, perché la stessa sigla indica fusi diversi in paesi diversi. La riga riceve una freccia.
- **Quando la form si riapre**, la data torna nel tuo fuso, nello stesso istante.
- **Una data con i secondi** li mostra: `2026-12-08 18:00:30`.
- **Quando finisce l'ora legale**, gli orologi passano due volte per la stessa ora. Una data in quell'ora porta il suo scarto, come `2026-10-25 02:30 +02:00`, così le due 02:30 restano distinte. Senza scarto TTM prende la prima delle due.
- **Quando inizia l'ora legale**, gli orologi saltano un'ora. Una data in quell'ora non esiste e la riga riceve una freccia.

**La tripletta** è `[distanza,intervallo,ripetizioni]`:

- **La distanza** crea un promemoria senza una data assoluta: si conta dal momento in cui salvi la lista.
- **Le ripetizioni** sono le notifiche dopo la prima, quindi la riga del task ne mostra una in più: `[2d3h,1h,3]` è `↻1h ×4`. Il massimo che un piano permette qui è 49, cioè 50 notifiche in tutto.
- **Un evento singolo** usa l'intervallo `0m` e `0` ripetizioni: `[2d3h,0m,0]`.
- **Distanza e intervallo** usano solo `d`, `h` e `m`. Un valore in mesi, come `[1M,0m,0]`, viene rifiutato e la riga riceve una freccia.

`1d` e `24h` non sono la stessa cosa quando cambia l'ora legale: `1d` mantiene la stessa ora del giorno, `24h` è esatto e può slittare di un'ora. Vedi [I campi della ripetizione](/docs/reminders/#the-repetition-fields).

Valgono le regole della form del promemoria, compreso quanti promemoria possono essere in attesa insieme: vedi [Limiti noti](/docs/known-limits/). Dove non si possono creare nuovi promemoria ricorrenti, una tripletta con ripetizioni sopra `0` è accettata solo per un promemoria che la lista aveva già, nei limiti di [Promemoria ripetuti](/docs/reminders/#repeating-reminders).

**Questi promemoria non si possono salvare** e il messaggio indica il task da correggere:

- un promemoria su un task **senza proprietario**: i promemoria vanno al proprietario, vedi [Proprietari: la menzione con i due punti](#owners-the-mention-with-a-colon);
- un promemoria **senza data** e con distanza zero, come `[0m,0m,0]` da solo: la sua unica notifica sarebbe il momento in cui salvi, già passato;
- un promemoria **che non si riesce a leggere**: un numero troppo grande, come `[1h,1d,99999999999]`.

**Un promemoria scritto male riceve una freccia**, come una riga senza trattino. TTM non indovina quale volevi:

- due date o due triplette sulla stessa riga;
- una data senza la sua tripletta o un promemoria senza il testo del task;
- una data che non esiste, come `2026-02-30 10:00`;
- una data in un'altra forma, come `30/11/2026 18:00`.

Questi controlli guardano solo le righe che cambi. Riscrivere l'intera lista controlla le righe che aggiungi o modifichi e il testo di un singolo task controlla quel task. Una lista nuova, un clone e un'importazione controllano ogni riga.

## Webhook nel testo

Il pulsante **Webhook** collega un webhook a un task per te: vedi [Webhook](/docs/webhooks/). Nel testo il collegamento è un token riservato davanti al testo del task:

```
- [] {{wb=deploy}} Pubblicare le note di rilascio
```

Puoi spostarlo, copiarlo su un altro task o eliminarlo, come una menzione. Il token non compare mai nella lista. Un task con il token ha bisogno anche di un testo.

`wb` è l'unica chiave riservata. Ogni altro `{{chiave=valore}}` nel testo di un task è una **variabile libera**, che il webhook può usare: vedi [Token](/docs/config-webhook/#tokens).

## I codici dietro i nomi

Discord memorizza gli **ID**, non i nomi: numeri lunghi che non cambiano mai. Dietro ogni nome nel testo c'è un codice e la lista conserva i codici, nel suo messaggio, nelle sue notifiche e nel file di Download.

| Nel testo | Il codice dietro |
| :--- | :--- |
| `@Ava` | `<@123456789012345678>` |
| `@Moderatori` | `<@&987654321098765432>` |
| `#generale` | `<#111222333444555666>` |
| `2026-12-08 18:00` in UTC, prima di una tripletta | `<t:1796752800>`, la data in secondi |

Puoi ancora scrivere o incollare i codici: TTM li salva così come sono. Un file di Download, o un testo scritto prima dei nomi, funziona così com'è.

Quando qualcuno cambia nome su Discord, la form mostra il nuovo nome. Nulla di salvato si rompe, perché la lista conserva l'ID.

Un codice resta nel testo in pochi casi:

- due ruoli con lo stesso nome, o due canali con lo stesso nome: i codici li distinguono;
- una persona il cui nome Discord non ha inviato in tempo quando la form si è aperta. Lascia il codice com'è: la menzione resta.

## Mettere tutto insieme

Un singolo task può combinare tutto questo:

```
- @Ava: Rivedere le note di rilascio in #rilasci, avvisare @Moderatori a lavoro finito — domande a [il responsabile del rilascio](mailto:release@example.com)
```

## Quando il testo non si può salvare

Se TTM non riesce a leggere una riga, ti mostra di nuovo il testo con una **freccia** su ogni riga sbagliata, da una riga senza trattino a un promemoria scritto male. Il messaggio dice cosa scrivere e rimanda alla parte di questa pagina che lo spiega.

Altrimenti **un solo messaggio elenca tutti i problemi insieme**, uno per paragrafo: una lista troppo lunga, un promemoria oltre un limite o senza proprietario. Correggili tutti e salva di nuovo.

Un promemoria le cui notifiche sono tutte nel passato non ferma il salvataggio: resta sul suo task. Vedi [Leggere un promemoria sul task](/docs/reminders/#reading-a-reminder-on-the-task).

Altri due casi non salvano nulla e TTM te lo dice:

- TTM non riesce a raggiungere il server su Discord quando salvi: riprova tra un momento;
- una form lasciata aperta per più di sei ore non riesce a rileggere i suoi nomi: riaprila dalla lista.
