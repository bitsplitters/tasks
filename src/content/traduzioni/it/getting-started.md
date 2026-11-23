---
title: Per iniziare
description: Invita il bot, crea una lista, poi spunta un task e imposta un promemoria, nel canale o nell'Activity.
fonte: 65c887766b9d
---

Team Tasks Manager (TTM) permette al tuo team di condividere e gestire i task **senza uscire da Discord**. Questa pagina ti porta da zero a una lista funzionante: la crei, spunti un task, imposti un promemoria.

<div class="callout"><div class="callout-t">Durante la beta ogni funzione è sbloccata</div>Ogni funzione è sbloccata, per ogni server. Dove queste pagine parlano del piano Free o di Premium, vale solo dopo la beta: vedi <a href="/docs/beta/">Come funziona la beta</a>.</div>

## 1. Invita il bot

<p><a class="btn" href="/invite">Aggiungi a Discord</a></p>

Quel pulsante invita Team Tasks Manager nel tuo server. Mantieni i permessi che chiede: a TTM servono per pubblicare le liste, far partire i promemoria e scrivere la cronologia. Se ne salti uno, il bot ti dice con precisione quale permesso manca quando gli serve. A che cosa serve ogni permesso: [I permessi che chiede TTM](/docs/core-concepts/#the-permissions-ttm-asks-for).

## 2. Crea la tua prima lista

Scrivi `/` nella casella dei messaggi e scegli il comando, oppure inizia a scriverne il nome:

```
/crea-lista
```

Se il tuo Discord è in un'altra lingua, il comando ha un nome tradotto: in inglese è `/create-list`. Tutti i nomi sono in [Riferimento dei comandi](/docs/commands/#command-names-in-your-language).

TTM risponde con una breve spiegazione di come si scrive una lista e un pulsante **Crea la tua lista**. Cliccalo: si apre una form con due campi, il **titolo della lista** e la **lista delle attività**. Scrivi un'attività per riga, ognuna che inizia con un trattino `-`. Per esempio, con il titolo *Torneo del sabato*:

```
- Prenotare i canali vocali
- Preparare i tabelloni
  - Raccogliere le iscrizioni
  - Distribuire le squadre
- Pubblicare il regolamento
- Trasmettere la finale
```

Le regole:

- **Una riga che inizia con `-` è un task.**
- **Gli spazi prima del trattino la rendono un subtask** del task sopra. Un task con dei subtask diventa un **gruppo**.
- Il titolo può avere fino a **90 caratteri**, la lista circa **4000 caratteri** e **50 task**, subtask compresi: vedi [Limiti noti](/docs/known-limits/).

Invia la form e la lista compare nel canale. Ecco la stessa lista dopo alcuni passaggi. Il primo task è spuntato, *Preparare i tabelloni* ha un proprietario e *Trasmettere la finale* ha un promemoria.

<picture class="screen">
  <source media="(max-width: 640px)" srcset="/screens/it/list-mobile.png" width="795" height="1059" />
  <img src="/screens/it/list-desktop.png" width="460" height="418" loading="lazy" alt="La lista Torneo del sabato in Discord: sei task numerati con le caselle. Il primo è spuntato e in grigio; Preparare i tabelloni ha due subtask e un proprietario; Trasmettere la finale ha un proprietario e la data di un promemoria. Sotto i task, una piccola riga rimanda ad Altro, alla Guida e alla documentazione completa e una barra verde mostra quanto è stato fatto. Sotto la lista ci sono il menu a tendina, Spunta task e due righe di pulsanti." />
</picture>

Preferisci imparare facendo? Accanto a **Crea la tua lista** c'è un pulsante **Tutorial**: trasforma la spiegazione in una lista di prova con sette lezioni nella tua lingua e ti manda la Guida in un messaggio che vedi solo tu. Fai le lezioni in ordine: ognuna nomina un pulsante con la sua icona e ti chiede di fare qualcosa a se stessa, dalla spunta all'Activity.

La lista di prova è una lista normale: quando hai finito, eliminala da **Altro** → **Elimina lista**.

Ora scegli dove lavorarci. La lista è la stessa nei due posti e sta [in un posto alla volta](/docs/core-concepts/#one-list-two-places).

## <img class="place-ic" src="/icons/posto-canale.svg" alt="" />3. Nel canale

### Spunta un task

Sotto la lista c'è il **menu di spunta**, un menu a tendina che mostra il titolo della lista e due righe di pulsanti. Apri il menu e scegli un task: la sua casella passa da <img class="inline-ic" src="/icons/checkbox_empty.png" alt="" /> a <img class="inline-ic" src="/icons/checkbox_marked.png" alt="" /> e la lista si aggiorna per tutti. Sceglilo di nuovo per riaprirlo. Spuntare un gruppo spunta anche i suoi subtask. In base alle tue [impostazioni](/docs/configuration/), TTM può anche pubblicare una breve notifica sotto la lista e registrare la modifica in un thread della cronologia.

<div class="callout"><div class="callout-t">Non riesci a spuntare un task?</div>Ogni pulsante della seconda riga deve essere <strong>spento</strong>: se uno è blu o rosso, scegliere un task applica l'azione di quel pulsante. E un task con un proprietario può essere spuntato solo dal proprietario e da chi ha <em>Gestisci messaggi</em> sul canale.</div>

### Imposta un promemoria

Nella seconda riga:

1. Clicca una volta **Promemoria** <img class="inline-ic" src="/icons/alertW.png" alt="" />, il quarto pulsante: diventa **blu**.
2. Scegli un task **non ancora spuntato**. Si apre una form intitolata *Imposta il promemoria per il task …*, già compilata con dieci minuti da adesso.
3. Inviala così com'è. Se il tuo server ha attivato i promemoria ricorrenti, dopo la form arriva una scheda di riepilogo: premi **Salva**.

Il task mostra l'ora e il promemoria arriva una volta sola. Finché non lo cambi, il fuso orario nell'ultimo campo è quello del server: cambialo se il tuo è diverso.

**Hai chiuso la form con ✕?** La lista resta bloccata: apri **Altro** sotto la lista e premi **Sblocca lista**. Vedi [Quando la lista è bloccata](/docs/the-task-list/#when-the-list-is-locked).

Ogni pulsante sotto la lista: [La lista nel canale](/docs/the-task-list/) e [Modificare un task nel canale](/docs/channel-tasks/).

## <img class="place-ic is-activity" src="/icons/activity.png" alt="" />4. Nell'Activity

Nell'Activity lavori sulla lista in una finestra dentro Discord, con caselle e pannelli al posto dei menu. Premi **Activity** <img class="inline-ic" src="/icons/activity.png" alt="" />, il primo pulsante sotto la lista. Gli altri nel canale possono unirsi a te. Puoi partire anche dall'Avvio app di Discord o da una chiamata vocale: vedi [Quattro modi per entrare](/docs/activity/#four-ways-in).

### Spunta un task

Tocca la casella di un task. La lista si aggiorna per tutti nella finestra e un gruppo spunta anche i suoi subtask.

### Imposta un promemoria

Tocca il testo di un task non ancora spuntato: si apre il suo pannello. Tocca una volta **Promemoria** <img class="inline-ic" src="/icons/alertW.png" alt="" />: diventa **blu** e compaiono la data, l'ora e il fuso orario, impostati a dieci minuti da adesso nel fuso orario del tuo dispositivo. Tocca **Salva**.

Quando hai finito, premi **Esci**: la lista torna nel canale, con un riepilogo di ciò che è cambiato.

Tutto ciò che c'è nella finestra: [L'Activity](/docs/activity/) e [Lavorare su una lista nell'Activity](/docs/activity-list/).

## Da sapere prima del primo promemoria

- **Il promemoria va al proprietario del task**, con un messaggio diretto se il proprietario è una persona.
- **Se il task non ha ancora un proprietario, lo diventi tu**, così il promemoria arriva a te: vedi [Le regole](/docs/reminders/#the-rules).
- **Non è arrivato niente?** Consenti i messaggi diretti dai membri del server: vedi [Promemoria con messaggio diretto](/docs/known-limits/#reminders-by-direct-message).

## Prossimi passi

- [Concetti di base](/docs/core-concepts/) — una lista in due posti, proprietari, tag, gruppi e permessi.
- [Proprietari e tag](/docs/owners-and-tags/) — dai un task a una persona, a un ruolo o a più persone e tagga chi avvisare.
- [Promemoria](/docs/reminders/) — chi li riceve, fusi orari, promemoria ricorrenti.
- [Trucchi e consigli](/docs/tips/) — piccole abitudini che fanno risparmiare tempo, come riusare una lista su un altro server.
- [/config app](/docs/configuration/) — notifiche, suggerimenti, fuso orario e altro.
- [FAQ](/docs/troubleshooting/) — risposte rapide ai problemi più comuni.
