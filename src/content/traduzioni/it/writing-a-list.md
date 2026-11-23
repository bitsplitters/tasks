---
title: Scrivere una lista
description: Il testo di una lista — task e subtask, proprietari, menzioni, link, promemoria e webhook — ovunque lo scrivi.
fonte: 7e0c02380050
---

Una lista è testo: puoi scriverla tutta a mano. Il formato è lo stesso ovunque lo incontri:

- `/crea-lista`, quando crei una lista;
- **Aggiornamento in blocco**, che riscrive l'intera lista nel canale;
- **Modifica la lista** e **Nuova lista**, nell'Activity;
- il file che **Download** ti dà nel canale e che `/crea-lista` reimporta. Il file conserva i codici di Discord al posto dei nomi: vedi [I codici dietro i nomi](#the-codes-behind-the-names).

Il testo di un singolo task segue le stesse regole, con un'eccezione: proprietari, promemoria e webhook hanno i loro pulsanti, quindi la sua form li toglie e te lo dice.

## Task e subtask

```
- Prenotare i canali vocali
- Preparare i tabelloni
  - Raccogliere le iscrizioni
  - Sorteggiare le squadre
- Pubblicare il regolamento
```

- **Una riga che inizia con `-` è un task.**
- **Gli spazi prima del trattino ne fanno un subtask** del task sopra. Un task con dei subtask diventa un **gruppo**. La prima riga non può essere un subtask.
- **La casella va dopo il trattino** quando la lista esiste già: `[]` per un task da fare, `[X]` per uno completato. Cambiala per spuntare o togliere la spunta al task. Una riga nuova senza casella è un task da fare.
- Il titolo può avere fino a **90 caratteri**. La lista può arrivare a circa **4000 caratteri** e **50 task**, subtask compresi. Dopo la beta il piano Free ammette 20 task: vedi [Cosa sblocca Premium](/docs/premium/).

## Persone, ruoli e canali per nome

Nel testo persone, ruoli e canali si scrivono per nome, come li mostra Discord: `@Ava`, `@Moderatori`, `#generale`. Quando salvi, TTM trasforma ogni nome in una menzione, così la lista notifica e collega come sempre. Quando riapri la form, i nomi sono tornati.

Sotto il testo, una breve riga dice come aggiungere qualcuno di nuovo e rimanda qui: nel canale e nell'Activity.

## Menzionare persone e ruoli

Scrivi `@` e il nome:

```
- Chiedere ad @Ava di controllare il regolamento, poi avvisare @Moderatori
```

- **Una persona** si scrive con il nome che mostra il server: il suo soprannome nel server, altrimenti il nome visualizzato, altrimenti il nome utente. Maiuscole e minuscole non contano. Per nome scrivi le persone che la lista menziona già.
- **Due persone con lo stesso nome** compaiono con il nome utente tra parentesi: `@Mario (mario.rossi)` e `@Mario (mario_b)`. Scrivile così. Un nome che corrisponde a più di una persona non si può salvare: il messaggio elenca le forme da scrivere.
- **Un ruolo** è `@` e il suo nome: `@Moderatori`. Funziona ogni ruolo del server, anche uno che la lista non menziona ancora.
- **La form Contenuto di un task** ha solo il suo testo, canali compresi: proprietario e tag hanno i loro pulsanti, **Proprietario** e **Tag**. Vedi [Contenuto](/docs/channel-tasks/#content).
- **Qualcuno che la lista non menziona ancora** si aggiunge con il pulsante **Proprietario** o **Tag**, che scelgono dal menu di Discord. Nel testo scrivi invece il suo codice: vedi [Scrivere qualcuno di nuovo](#writing-someone-new).
- **Un nome che TTM non conosce**, come `@elonmusk`, resta testo semplice: TTM trasforma in menzioni solo i nomi che conosce e lascia ogni altra `@parola` come l'hai scritta. Al posto del proprietario invece è un errore: vedi [Proprietari: la menzione con i due punti](#owners-the-mention-with-a-colon).

Vince il nome più lungo: con Mario e Mario Rossi sul server, `@Mario Rossi` è Mario Rossi. Un nome conta solo come parola intera, quindi `@Leonardo` non è `@Leo` seguito da «nardo».

Alcune `@` non sono mai un nome: `@everyone`, `@here`, una `@` isolata, un indirizzo email come `ava@example.com` e tutto ciò che sta dentro un link o tra apici inversi.

Queste menzioni sono i **tag** del task. Il pulsante **Tag** le aggiunge per te. Nel testo compaiono come nomi: copiali, spostali o rimuovili come vuoi.

### Scrivere qualcuno di nuovo

Il codice di una persona è `<@`, il suo ID e `>`: `<@123456789012345678>`. Scrivilo dove andrebbe il nome, come tag oppure, seguito da due punti, come proprietario. Due modi per ottenerlo:

- in una qualsiasi chat di Discord scrivi `\@` e l'inizio del suo nome, scegli la persona dal menu e invia: il messaggio mostra il suo codice, pronto da copiare;
- con la **Modalità sviluppatore** attiva (Impostazioni utente → Avanzate), clicca con il tasto destro sulla persona → **Copia ID**, poi scrivi l'ID tra `<@` e `>`.

Salva: la prossima volta che la form si apre la persona compare per nome. I pulsanti **Proprietario** e **Tag** fanno lo stesso senza nessun codice.

### Scrivere @ senza una menzione

Metti una barra rovesciata davanti a un nome che TTM conosce: `\@Ava` resta la parola @Ava e nessuno viene menzionato. `\#generale` fa lo stesso per un canale. Ogni altra `@parola` resta testo da sola, senza barra rovesciata, tranne all'inizio di un task nel testo della lista, seguita da due punti, dove sarebbe un proprietario: `\@parola:`. TTM conserva la tua barra rovesciata: la lista mostra la parola senza barra, mentre la form la mostra di nuovo la volta dopo, così distingui la parola dalla menzione. TTM non aggiunge mai una barra rovesciata di sua iniziativa.

## Proprietari: la menzione con i due punti

Anche il proprietario di un task è una menzione, con una differenza: è seguita da **due punti**. Il pulsante **Proprietario** la scrive per te, all'inizio del task:

```
@Ava: Pubblicare le note di rilascio
```

Funzionano allo stesso modo un ruolo (`@Moderatori:`) e un codice (`<@123456789012345678>:`). Senza i due punti la stessa menzione è solo un tag, non un proprietario. Al posto del proprietario, un nome che TTM non conosce è un errore: TTM non salva nulla e il messaggio dice di scegliere il proprietario con il pulsante **Proprietario** o di scrivere il suo codice. Il nome del proprietario va dalla `@` ai due punti, quindi `@Ava Rossi:` è un errore anche quando TTM conosce Ava. Per iniziare un task con `@parola:` come testo semplice, metti una barra rovesciata davanti: `\@parola:`. La form Contenuto di un singolo task non ha un proprietario, quindi lì `@parola:` resta testo semplice senza barra rovesciata. Un promemoria va al proprietario del task, quindi TTM non salva un promemoria su un task senza proprietario e il messaggio indica il task da correggere. Proprietari, tag e cosa può fare ciascuno: [Proprietari e tag](/docs/owners-and-tags/).

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
[testo visibile](https://example.com)
```

Quindi `[la nostra roadmap](https://example.com/roadmap)` diventa **[la nostra roadmap](https://example.com/roadmap)**: un link pulito e cliccabile al posto di un URL nudo.

La destinazione non deve per forza essere una pagina web. I link `mailto:`, `tel:` e `sms:` funzionano allo stesso modo: aprono l'app di chi legge. `[il responsabile del rilascio](mailto:release@example.com)` trasforma un task in un «scrivi a questa persona» con un clic; `[il telefono di reperibilità](tel:+12025550100)` compone il numero direttamente da un telefono.

Un link può anche puntare a **un'altra lista**: clicca con il tasto destro sul suo messaggio → **Copia link del messaggio** e incollalo tra le parentesi. I link ai messaggi restano come sono: solo i link semplici a un canale vengono abbreviati in un tag `#canale`.

## Emoji dei pulsanti

Un task può mostrare l'emoji di un pulsante della lista, come fanno le lezioni del [Tutorial](/docs/getting-started/#2-create-your-first-list). Nel testo queste emoji non compaiono come un codice lungo ma come un nome breve:

| Nome | Nel testo | Pulsante |
| :--- | :---: | :--- |
| `:owner:` | <img class="inline-ic" src="/icons/owner_blue.png" alt="" /> | **Proprietario** <img class="inline-ic" src="/icons/owner.png" alt="" /> |
| `:reminder:` | <img class="inline-ic" src="/icons/alert_blue.png" alt="" /> | **Promemoria** <img class="inline-ic" src="/icons/alertW.png" alt="" /> |
| `:content:` | <img class="inline-ic" src="/icons/task_blue.png" alt="" /> | **Contenuto** <img class="inline-ic" src="/icons/task.png" alt="" /> |
| `:more:` | <img class="inline-ic" src="/icons/other_blue.png" alt="" /> | **Altro** <img class="inline-ic" src="/icons/other.png" alt="" /> |
| `:activity:` | <img class="inline-ic" src="/icons/activity_blue.png" alt="" /> | **Activity** <img class="inline-ic" src="/icons/activity.png" alt="" /> |

Lascia un nome dov'è e l'emoji resta. Scrivine uno tu in minuscolo e la lista mostra l'emoji del pulsante: comodo quando un task dice quale pulsante premere. Qualsiasi altra parola tra due punti resta come l'hai scritta.

## Promemoria nel testo

Un promemoria appare come una data seguita da una tripletta:

```
- [] 2026-12-08 18:00 [2d3h,1h,3] @Ava: Pubblicare le note di rilascio
```

La data si scrive `YYYY-MM-DD HH:mm`, uguale in ogni lingua, nel **tuo** fuso orario: quello che hai scelto per i tuoi promemoria, altrimenti il fuso della tua lingua di Discord, altrimenti quello del server (vedi [Il tuo fuso orario](/docs/reminders/#your-time-zone)). Cambia la data e salva: il promemoria si sposta.

- **Una data in un altro fuso** porta il fuso dopo l'ora: `2026-12-08 18:00 America/New_York`. Vale solo per quella data e prevale su ogni altro fuso: comodo per conservare un orario che qualcuno ti ha dato nel suo fuso. Scrivi il fuso con il suo nome, come `Europe/Rome`, in maiuscolo o minuscolo, oppure come `UTC` o `GMT` con lo scarto: `UTC+2`, `GMT-5:30`. Le sigle come `CET` o `EST` non sono accettate, perché la stessa sigla indica fusi diversi in paesi diversi: la riga riceve una freccia. Quando la form si riapre, la data torna nel tuo fuso, nello stesso istante.
- Una data con i secondi li mostra: `2026-12-08 18:00:30`.
- Quando finisce l'ora legale, gli orologi passano due volte per la stessa ora. Una data in quell'ora porta il suo scarto, come `2026-10-25 02:30 +02:00`, così le due 02:30 restano distinte. Senza scarto TTM prende la prima delle due.
- Quando inizia l'ora legale, gli orologi saltano un'ora. Una data in quell'ora non esiste: la riga riceve una freccia.

Solo la data subito prima di una tripletta è un promemoria. Una data in qualsiasi altro punto del testo resta come l'hai scritta.

La tripletta è `[distanza,intervallo,ripetizioni]`. Il primo valore ti permette di creare un promemoria **da testo**, senza una data assoluta: si conta dal momento in cui salvi la lista. Le ripetizioni sono i promemoria **dopo** il primo, quindi la riga del task ne mostra uno in più: `[2d3h,1h,3]` è `↻1h ×4`. Il massimo che un piano permette qui è 49, cioè 50 notifiche in tutto. Un evento singolo usa l'intervallo speciale `0m` e `0` ripetizioni: `[2d3h,0m,0]`. Distanza e intervallo usano solo `d`, `h` e `m`. Un valore in mesi, come `[1M,0m,0]`, viene rifiutato e la riga è segnata con una freccia.

`1d` e `24h` non sono la stessa cosa quando cambia l'ora legale: vedi [I campi della ripetizione](/docs/reminders/#the-repetition-fields).

Valgono le stesse regole della form del promemoria. Dove non si possono creare nuovi promemoria ricorrenti, una tripletta con ripetizioni sopra `0` è accettata solo per un promemoria che la lista aveva già. Anche allora valgono i limiti di [Promemoria ripetuti](/docs/reminders/#repeating-reminders). Se più promemoria infrangono una regola, un solo messaggio li elenca tutti, uno per paragrafo. Lo stesso messaggio elenca anche ogni altro problema nel testo, come una lista troppo lunga o con troppi task.

Questi promemoria non si possono salvare e il messaggio indica il task da correggere:

- un promemoria su un task **senza proprietario**. I promemoria vanno al proprietario e una menzione senza i due punti è solo un tag: vedi [Proprietari: la menzione con i due punti](#owners-the-mention-with-a-colon);
- un promemoria **senza data** e con distanza zero, come `[0m,0m,0]` da solo. La sua unica notifica sarebbe il momento in cui salvi, già passato;
- un promemoria **che non si riesce a leggere**: un numero troppo grande, come `[1h,1d,99999999999]`.

Un promemoria scritto male è segnato con una freccia, come una riga senza trattino: due date o due triplette sulla stessa riga, una data senza la sua tripletta, una data che non esiste, come `2026-02-30 10:00`, una data in un'altra forma, come `30/11/2026 18:00`, oppure un promemoria senza il testo del task. TTM non indovina quale volevi.

Questi controlli guardano solo le righe che cambi. Riscrivere l'intera lista controlla le righe che aggiungi o modifichi; il testo di un singolo task controlla quel task. Una lista nuova, un clone e un'importazione controllano ogni riga.

## Webhook nel testo

Un webhook collegato a un task è memorizzato nel task stesso, come un token riservato davanti al suo testo:

```
- [] {{wb=deploy}} Pubblicare le note di rilascio
```

Puoi spostarlo, copiarlo su un altro task o eliminarlo a mano, esattamente come una menzione. Il token non compare mai nella lista renderizzata. Un task con il token ha bisogno anche di un testo.

`wb` è l'unica chiave riservata. Ogni altro `{{chiave=valore}}` nel testo di un task è una **variabile libera**: il webhook può usarla come `{{chiave}}`. Vedi [Token](/docs/webhooks/#tokens).

## I codici dietro i nomi

Discord non memorizza i nomi: memorizza gli **ID**, numeri lunghi che non cambiano mai, nemmeno quando qualcuno si rinomina. Dietro ogni nome nel testo c'è un codice e la lista conserva i codici: nel suo messaggio, nelle sue notifiche e nel file di Download.

| Nel testo | Il codice dietro | 
| :--- | :--- |
| `@Ava` | `<@123456789012345678>` |
| `@Moderatori` | `<@&987654321098765432>` |
| `#generale` | `<#111222333444555666>` |
| `2026-12-08 18:00` in UTC, prima di una tripletta | `<t:1796752800>`, la data in secondi |

Puoi ancora scrivere o incollare i codici: TTM li salva così come sono: è il modo per scrivere qualcuno che la lista non menziona ancora. Un file di Download, o un testo scritto prima dei nomi, funziona così com'è. Quando qualcuno cambia nome su Discord, la form mostra il nuovo nome e nulla di salvato si rompe, perché la lista conserva l'ID.

Un codice resta nel testo in pochi casi:

- due ruoli con lo stesso nome, o due canali con lo stesso nome: i codici li distinguono;
- una persona il cui nome Discord non ha inviato in tempo quando la form si è aperta. Lascia il codice com'è: la menzione resta.

## Riepilogo rapido

| Vuoi | Scrivi | Appare |
| :--- | :--- | :--- |
| Un task | `- Rilascialo` | un task nuovo |
| Un subtask | `  - Scrivere le note` | un subtask della riga sopra |
| Un task completato | `- [X] Rilascialo` | una casella spuntata |
| Menzionare una persona | `@Nome` | @Nome |
| Menzionare una di due persone con lo stesso nome | `@Nome (nomeutente)` | @Nome |
| Menzionare qualcuno di nuovo | il pulsante **Tag**, oppure `<@ID>` | @Nome |
| Menzionare un ruolo | `@Ruolo` | @Ruolo |
| Impostare il proprietario | `@Nome:` | @Nome: |
| Impostare come proprietario qualcuno di nuovo | il pulsante **Proprietario**, oppure `<@ID>:` | @Nome: |
| Collegare un canale | `#canale` | #canale |
| Scrivere @ senza una menzione | `\@Nome` | @Nome, come testo |
| Aggiungere un link | `[testo](https://url)` | testo |
| Collegare un indirizzo email | `[testo](mailto:nome@example.com)` | testo |
| Collegare un numero di telefono | `[testo](tel:+12025550100)` | testo |
| Mostrare l'emoji di un pulsante | `:owner:`, `:reminder:`, `:content:`, `:more:` | l'emoji del pulsante |
| Un promemoria a una data | `2026-12-08 18:00 [0m,0m,0]`, su un task con un proprietario | la data |
| Un promemoria in un altro fuso orario | `2026-12-08 18:00 America/New_York [0m,0m,0]` | la data |
| Un promemoria due giorni dopo il salvataggio | `[2d,0m,0]`, su un task con un proprietario | la data |
| Collegare un webhook | `{{wb=nome}}` | niente |

## Mettere tutto insieme

Un singolo task può combinare tutto questo:

```
- @Ava: Rivedere le note di rilascio in #rilasci, avvisare @Moderatori a lavoro finito — domande a [il responsabile del rilascio](mailto:release@example.com)
```

<div class="callout"><div class="callout-t">Riscrivi con fiducia</div>Il testo mostra ogni task com'è memorizzato, con i nomi al posto dei codici. Riordina i task, dai un task a qualcuno che la lista nomina già scrivendo il suo nome, o cambia un canale, senza rompere nulla. Tieni solo i due punti dopo il nome del proprietario.</div>

## Quando il testo non si può salvare

Se TTM non riesce a leggere il tuo testo come una lista, te lo mostra di nuovo, con una freccia su ogni riga sbagliata. La freccia segna una riga senza trattino, una prima riga che è un subtask, o una riga con un promemoria in mesi (`M`). Segna anche un promemoria scritto male: due date o due triplette, una data senza la sua tripletta, una data che non esiste o in un'altra forma, o un promemoria senza il testo del task. Anche un token webhook (`{{wb=…}}`) senza il testo del task riceve la freccia. La ricevono anche un proprietario che TTM non conosce, un nome che corrisponde a più di una persona e una data in un fuso orario che TTM non conosce: il messaggio dice cosa scrivere e rimanda alla parte di questa pagina che lo spiega. Altrimenti **un solo messaggio elenca tutti i problemi insieme**, uno per paragrafo:

- la lista è troppo lunga;
- la lista ha più task di quanti ne possa contenere una lista, o di quanti ne ammetta il tuo piano;
- un promemoria supera un limite: ricorrente dove i promemoria ricorrenti non sono ammessi, ripetizioni oltre il tuo piano, o troppi promemoria in attesa nello stesso momento;
- un promemoria non ha un proprietario, oppure non ha una data e ha distanza zero.

Correggili tutti e salva di nuovo. Un promemoria le cui notifiche sono tutte nel passato non ferma il salvataggio: resta sul suo task. Vedi [Leggere un promemoria sul task](/docs/reminders/#reading-a-reminder-on-the-task).

Altri due casi non salvano nulla e TTM te lo dice. Se TTM non riesce a raggiungere il server su Discord quando salvi, riprova tra un momento. Una form lasciata aperta per più di sei ore non riesce a rileggere i suoi nomi: riaprila dalla lista.

<div class="howto"><div class="howto-t">Come si fa</div><div class="howto-grid"><a class="howto-go is-channel" href="/docs/the-task-list/#bulk-update"><span class="howto-k"><img class="place-ic" src="/icons/posto-canale.svg" alt="" />Nel canale</span><span class="howto-d">Aggiornamento in blocco, nella prima riga sotto la lista.</span></a><a class="howto-go is-activity" href="/docs/activity-list/#edit-the-list"><span class="howto-k"><img class="place-ic" src="/icons/activity.png" alt="" />Nell'Activity</span><span class="howto-d">Modifica la lista, in alto nella lista.</span></a></div></div>
