---
title: Azioni sulla lista
description: Pulisci, Riapri tutti, Clona, Download, Sigilla ed Elimina — cosa fa ognuna all'intera lista e dove la trovi.
fonte: f9d44b6a771e
---

Queste azioni lavorano sull'**intera lista**, mai su un singolo task. Due esistono in entrambi i posti; le altre solo nel canale.

| Azione | Nel canale | Nell'Activity |
| :--- | :---: | :---: |
| [Pulisci](#clean) | sì | sì |
| [Riapri tutti](#reopen-all) | sì | sì |
| [Clona](#clone) | sì | — |
| [Download](#download) | sì | — |
| [Sigilla](#seal) | sì e in `/config lists` | solo da `/config lists` |
| [Elimina](#delete) | sì e in `/config lists` | solo da `/config lists` |

Dove premerle: [Come si fa](#how-to-do-it), in fondo.

## Pulisci

**Pulisci lista** toglie ogni task completato, subtask compresi e rinumera i task che restano. Un gruppo non completato resta, anche quando alcuni dei suoi subtask se ne vanno.

Prima, una conferma ti dice quanti task se ne andranno e cosa se ne va con loro. Se ne vanno **per sempre**, con i loro promemoria e tag, se ne hanno. Nel canale, se la configurazione del tuo server lo prevede, la notifica nel canale della lista o nel suo thread mostra i task tolti: vedi [Modalità notifica](/docs/configuration/#notification-mode). Nell'Activity finiscono nel riepilogo alla fine della sessione.

- **Nessun task completato**: non c'è niente da togliere e il bot lo dice subito.
- **Ogni task completato**: Pulisci rifiuta, perché una lista non può essere vuota. Togli la spunta ad almeno un task, oppure elimina l'intera lista con [Elimina](#delete), nel canale.

## Riapri tutti

**Riapri tutti** riporta da fare ogni task completato. Testo, proprietari, tag e promemoria restano come sono. Se nessun task è completato, il bot dice che non c'è niente da riaprire.

Prima, il bot ti chiede di scegliere:

- **Riapri** — riapre subito ogni task.
- **Nuova data** — riapre e sposta i promemoria dei task che riapri. Il primo di quei promemoria in calendario si sposta alla data che scegli, almeno 5 minuti da adesso. Gli altri mantengono la stessa distanza da lui. I promemoria dei task ancora da fare restano come sono. Questa scelta compare solo quando un task che riapri ha un promemoria.
- **Annulla** — lascia la lista com'è.

Riaprire fa partire i **webhook di riapertura** dei task che riapre e ignora i proprietari: chiunque può modificare la lista può riaprirla.

## Clona

**Clona lista** copia la lista in un altro canale, come lista nuova. Scegli:

- il canale: canali di testo e canali vocali. Una copia in un canale vocale non ha la cronologia delle attività: vedi [Canali vocali](/docs/known-limits/#voice-channels);
- se la copia mantiene le spunte;
- se mantiene i promemoria.

Una copia riceve promemoria nuovi, quindi un promemoria ricorrente può essere rifiutato: vedi [Promemoria ripetuti](/docs/reminders/#repeating-reminders).

La copia pubblica la propria notifica nel canale nuovo e può menzionare i proprietari dei suoi task: vedi [Quando una lista viene creata](/docs/configuration/#when-a-list-is-created). Il canale della lista originale riceve la solita notifica della copia, senza menzioni.

Una copia è una lista nuova: le serve un posto libero e non può avere più task di quanti ne consente il tuo piano. Vedi [Cosa sblocca Premium](/docs/premium/).

Solo nel canale, anche quando la lista è bloccata.

## Download

**Download** ti dà un file `.txt` della lista, scritto come spiegato in [Modificare una lista a mano](/docs/writing-a-list/) e inviato **solo a te**. Il file mantiene i codici di Discord al posto dei nomi: vedi [I codici dietro i nomi](/docs/writing-a-list/#the-codes-behind-the-names). Tienilo come backup, oppure ricostruisci la lista da lì con `/crea-lista`, anche su un altro server: vedi [Riusare una lista ovunque](/docs/tips/#reuse-a-list-anywhere).

Un messaggio di Discord è limitato a 2000 caratteri, quindi Download non pubblica mai la lista come testo: è sempre un file.

Solo nel canale.

## Sigilla

**Sigilla lista** conserva nel canale una lista finita come resoconto, con la scritta *Lista sigillata*, senza pulsanti né menu. I suoi promemoria si fermano e libera un [posto del tuo piano](/docs/premium/#how-the-three-places-work). Cosa resta e cosa se ne va: [Sigillare](/docs/config-lists/#seal).

Sigillare non si può annullare e il bot ti chiede prima di confermare. Se pensi di riusare la lista, scaricala prima di sigillarla.

Nel canale, da **Altro**, sigillare richiede *Gestisci messaggi* sul canale e una lista che qualcuno sta modificando non si può sigillare. Da [`/config lists`](/docs/config-lists/) valgono i permessi di `/config` e un admin può sigillare anche una lista nell'Activity: prima torna nel canale.

## Elimina

**Elimina lista** toglie la lista **definitivamente**, con i suoi task, proprietari, tag e promemoria. Il messaggio viene tolto e al suo posto compare nel canale una breve ricevuta.

Eliminare non si può annullare e il bot ti chiede prima di confermare. I permessi sono gli stessi di [Sigilla](#seal). Da `/config lists`, eliminare una lista nell'Activity la toglie anche a chi ci sta dentro.

<div class="callout"><div class="callout-t">Perché eliminare invece di togliere il messaggio?</div>Se elimini il messaggio a mano, i dati della lista restano e i suoi promemoria continuano ad arrivare. <strong>Elimina lista</strong> si porta via anche i promemoria. Se un messaggio non c'è già più, <a href="/docs/config-lists/"><code>/config lists</code></a> ti permette di fare pulizia, o di riportare la lista.</div>

<div class="howto" id="how-to-do-it"><div class="howto-t">Come si fa</div><div class="howto-grid"><a class="howto-go is-channel" href="/docs/the-task-list/#row-1--acts-on-the-whole-list"><span class="howto-k"><img class="place-ic" src="/icons/posto-canale.svg" alt="" />Nel canale</span><span class="howto-d">La prima riga sotto la lista e Altro per Clona, Download, Sigilla ed Elimina.</span></a><a class="howto-go is-activity" href="/docs/activity-list/#the-first-row"><span class="howto-k"><img class="place-ic" src="/icons/activity.png" alt="" />Nell'Activity</span><span class="howto-d">Pulisci la lista e Riapri tutti, in alto nella lista.</span></a></div></div>
