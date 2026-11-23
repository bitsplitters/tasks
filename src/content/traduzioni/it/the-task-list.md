---
title: La lista nel canale
description: "Il messaggio della lista in un canale Discord: il menu di spunta, la prima riga di pulsanti, Altro e che cosa succede mentre qualcuno la modifica."
fonte: 6656d50714c3
---

Quando una lista esiste, TTM mostra un **menu di spunta** e **due righe di pulsanti** sotto di essa. Quasi niente qui richiede un comando: basta un click. La prima riga agisce sull'intera lista ed è spiegata qui. La seconda agisce su un singolo task: vedi [Modificare un task nel canale](/docs/channel-tasks/).

## Sotto la lista

La lista termina con una sottile **barra di avanzamento**: la quota di caselle spuntate, task e subtask insieme, a passi del 5%. Si muove appena spunti una casella ed è piena solo quando lo sono tutte. Una lista sigillata la conserva e mostra dove la lista si è fermata.

Sopra la barra, una piccola riga aiuta chi è nuovo: *Non sai cosa fanno i pulsanti? Altro → Guida*. **Guida**, in [Altro](#whats-inside-more), spiega ogni pulsante senza uscire da Discord. Se il tuo team non ne ha bisogno, nascondi i **Suggerimenti** in [/config app](/docs/configuration/#tips): la riga sparisce e la barra resta. Mentre la lista è bloccata, la stessa riga dice chi la sta modificando e come sbloccarla, anche con i Suggerimenti nascosti: vedi [Quando la lista è bloccata](#when-the-list-is-locked).

Mentre la lista è nell'[Activity](/docs/activity/), la riga lo dice e **Entra nell'Activity** è l'unico pulsante sotto la lista.

## Il menu di spunta

Sopra i pulsanti c'è il **menu di spunta**: il menu a tendina che mostra il titolo della lista. Una lista con più di 25 task ha due menu, ciascuno con l'etichetta della posizione del suo ultimo task. Serve a:

1. **Segnare i task come fatti o aperti**: spunta un task per completarlo, toglici la spunta per riaprirlo. La sua casella mostra <img class="inline-ic" src="/icons/checkbox_empty.png" alt="" /> oppure <img class="inline-ic" src="/icons/checkbox_marked.png" alt="" />.
2. **Scegliere il task su cui agisce un pulsante attivo** (vedi [la seconda riga](/docs/channel-tasks/#the-second-row)).

Spuntare o togliere la spunta a un gruppo fa lo stesso ai suoi subtask. Completare tutti i suoi subtask completa il gruppo. Un task con un proprietario può essere spuntato solo dal suo proprietario e da chi ha *Gestisci messaggi* sul canale: vedi [Chi può spuntare un task](/docs/core-concepts/#who-can-tick-a-task). Un rifiuto arriva solo a chi ha scelto il task.

<div class="callout"><div class="callout-t">Tieni spenti i pulsanti dei task</div>Per spuntare o togliere la spunta ai task, <strong>ogni pulsante della seconda riga deve essere spento</strong>. Se un pulsante dei task è attivo (blu o rosso), scegliere un task applica quell'azione invece di spuntarlo.</div>

## Riga 1: agisce sull'intera lista

Questi pulsanti non toccano mai un singolo task: agiscono sull'**intera lista**. Che cosa fa ogni azione, nei due posti: [Azioni sulla lista](/docs/list-actions/).

| Pulsante | Che cosa fa |
| :--- | :--- |
| **Activity** <img class="inline-ic" src="/icons/activity.png" alt="" /> | Apre la lista nell'Activity, una finestra dentro Discord dove ci lavorate insieme. Vedi [L'Activity](/docs/activity/). |
| **Aggiornamento in blocco** <img class="inline-ic" src="/icons/edit.png" alt="" /> | Modifica il titolo e l'intera lista come testo, in un unico modulo. Per un solo task usa la [seconda riga](#row-2--acts-on-a-single-task). Vedi [Aggiornamento in blocco](#bulk-update). |
| **Pulisci lista** <img class="inline-ic" src="/icons/clean.png" alt="" /> | Rimuove ogni task completato, dopo una conferma. |
| **Riapri tutti** <img class="inline-ic" src="/icons/reopen.png" alt="" /> | Riporta da fare ogni task completato. Puoi anche spostare i loro promemoria a una nuova data. |
| **Altro** <img class="inline-ic" src="/icons/other.png" alt="" /> | Apre un pannello con le azioni che ti servono meno spesso: la guida dentro Discord e clonare, scaricare, sigillare o eliminare la lista. Quando la lista è bloccata, la sblocchi da qui. |

### Aggiornamento in blocco

**Aggiornamento in blocco** apre un modulo con il titolo e l'intera lista come testo: una riga per task, nel formato spiegato in [Modificare una lista a mano](/docs/writing-a-list/). Cambia ciò che ti serve e invia.

- Persone, ruoli e canali compaiono per nome e le date dei promemoria nel tuo fuso orario.
- Una riga sotto il testo spiega come aggiungere qualcuno di nuovo: vedi [Persone, ruoli e canali per nome](/docs/writing-a-list/#people-roles-and-channels-by-name).
- Mentre il modulo è aperto, la lista è bloccata per tutti gli altri: vedi [Quando la lista è bloccata](#when-the-list-is-locked).

Se la lista è cambiata mentre la modificavi, TTM ti chiede che cosa fare prima di salvare: vedi [Quando la lista cambia mentre la modifichi](#when-the-list-changes-while-you-edit-it). Se il testo non si può salvare, TTM te lo mostra di nuovo con tutti i problemi: vedi [Quando il testo non si può salvare](/docs/writing-a-list/#when-the-text-cant-be-saved).

### Pulisci lista

Una finestra di conferma ti dice quanti task se ne vanno e che cosa se ne va con loro. Inviala per confermare, oppure chiudi la finestra per annullare. Che cosa rimuove Pulisci e che cosa conserva: [Pulisci](/docs/list-actions/#clean).

### Riapri tutti

Il bot ti chiede in un messaggio che solo tu puoi vedere: **Riapri**, **Nuova data** oppure **Annulla**. **Nuova data** apre la finestra della data, la stessa di un [promemoria](/docs/channel-tasks/#reminder): scegli la data a cui si sposta il primo promemoria. Che cosa cambia Riapri tutti: [Riapri tutti](/docs/list-actions/#reopen-all).

Se qualcuno blocca o sigilla la lista prima che tu confermi, non cambia niente: vedi [Quando la lista è bloccata](#when-the-list-is-locked).

### Che cosa c'è in Altro

Discord permette cinque pulsanti per riga, quindi le azioni che ti servono meno spesso stanno in un pannello che solo tu puoi vedere:

- **Sblocca lista** <img class="inline-ic" src="/icons/unlock.png" alt="" />: solo mentre la lista è bloccata. Mostra chi la sta modificando e riaccende i pulsanti della lista per tutti. Vedi [Quando la lista è bloccata](#when-the-list-is-locked).
- **Guida** <img class="inline-ic" src="/icons/doc.png" alt="" />: la guida rapida dentro Discord, con un link che torna a questa documentazione.
- **Clona lista** <img class="inline-ic" src="/icons/clone.png" alt="" />: clona la lista in un altro canale, anche mentre la lista è bloccata. Vedi [Opzioni di clonazione](#clone-options).
- **Download** <img class="inline-ic" src="/icons/download.png" alt="" />: un file `.txt` della lista, inviato **solo a te**. Vedi [Download](/docs/list-actions/#download).
- **Sigilla lista** <img class="inline-ic" src="/icons/seal.png" alt="" />: conserva nel canale una lista finita come resoconto, senza pulsanti né menu. Vedi [Sigilla](/docs/list-actions/#seal).
- **Elimina lista** <img class="inline-ic" src="/icons/delete.png" alt="" />: elimina la lista **in modo definitivo**. Vedi [Elimina](/docs/list-actions/#delete).

Sigillare ed eliminare non si possono annullare e il bot ti chiede prima di confermare. Entrambe richiedono *Gestisci messaggi* sul canale: lo stesso permesso che ti permette di eliminare a mano il messaggio della lista. Senza, queste due voci non ci sono. Guida, Clona lista e Download ci sono per tutti e così Sblocca lista quando la lista è bloccata.

Mentre la lista è bloccata, Sigilla lista ed Elimina lista non ci sono. Chi la sta modificando salverebbe su una lista che non esiste più.

### Opzioni di clonazione

Quando premi **Clona lista** in **Altro**, i controlli della clonazione prendono il posto della prima riga sotto la lista e il pannello ti rimanda alla lista:

- **Crea lista**: avvia la clonazione nel canale scelto nel menu a tendina.
- **Opzione selezione**: mantieni le spunte nella copia, oppure no.
- **Opzione promemoria**: mantieni i promemoria nella copia, oppure no.
- **Esci**: torna al pannello della lista com'era. Se qualcuno stava modificando la lista, resta bloccata.

Il menu a tendina offre i canali di testo e i canali vocali. Che cosa conserva una copia e i limiti del tuo piano: [Clona](/docs/list-actions/#clone).

## Riga 2: agisce su un singolo task

La seconda riga ha cinque pulsanti (Contenuto, Proprietario, Tag, Promemoria e Webhook) e ognuno è un interruttore a tre stati: spento, modifica o elimina. Accendine uno e poi scegli il task. Ogni pulsante, i suoi moduli e i suoi menu: [Modificare un task nel canale](/docs/channel-tasks/).

## Quando la lista è bloccata

TTM blocca la lista mentre qualcuno la modifica:

- in **Aggiornamento in blocco**;
- nel modulo del testo di un task;
- in un modulo di promemoria.

Per tutti gli altri si spengono: il menu di spunta, il pulsante Activity, **Aggiornamento in blocco**, **Pulisci lista**, **Riapri tutti** e i pulsanti dei task. **Altro** resta acceso, con **Clona lista** dentro. **Altro** mostra chi sta modificando e una lista bloccata non si può sigillare né eliminare da lì.

Lo dice anche l'ultima riga della lista: *🔒 @nome sta modificando la lista. Se è rimasta bloccata: Altro → Sblocca lista*. Prende il posto della riga dei Suggerimenti e compare anche quando il tuo server nasconde i Suggerimenti. La menzione mostra il nome e non avvisa nessuno. Quando la lista viene sbloccata, la riga dei Suggerimenti torna, se il tuo server la mostra.

Bloccare la lista spegne anche **Proprietario**, **Tag** e **Webhook** se uno di loro era acceso: riaprilo dal suo pulsante quando ti serve.

Salvare il modulo sblocca la lista. Chiuderlo con **Annulla** o con la ✕ no, perché Discord non lo comunica al bot: **Aggiornamento in blocco** e il modulo del testo di un task lo dicono nell'ultima riga. Allora chiunque può sbloccare la lista: apri **Altro** e premi **Sblocca lista** <img class="inline-ic" src="/icons/unlock.png" alt="" />.

Un amministratore può comunque sigillare, eliminare o rigenerare una lista bloccata da [`/config lists`](/docs/config-lists/). Se succede mentre la stai modificando, la tua modifica non viene salvata. Il bot te lo dice e ti restituisce il testo che avevi scritto.

### Quando la lista cambia mentre la modifichi

Qualcuno può aver iniziato un'azione prima che tu bloccassi la lista: un promemoria o il testo di un task. Quando finisce, la sua modifica si applica ma la lista resta bloccata per te. **Altro** allora dice chi l'ha aggiornata nel frattempo.

Quando salvi **Aggiornamento in blocco**, TTM controlla se la lista è ancora quella che hai aperto. Se è cambiata, non viene salvato ancora niente. Un messaggio che solo tu puoi vedere lo dice, mostra il testo che hai scritto e offre tre scelte:

- **Sovrascrivi**: salva il tuo testo. Gli aggiornamenti fatti nel frattempo si perdono.
- **Ricarica**: riapre **Aggiornamento in blocco** con la lista aggiornata. Il tuo testo resta nel messaggio, per copiarlo.
- **Annulla**: lascia la lista com'è, con gli aggiornamenti e la sblocca.

Se la lista viene bloccata o sigillata prima che tu confermi Pulisci o Riapri, non cambia niente. Il bot te lo dice: *Adesso questa lista non si può toccare: qualcuno la sta modificando, oppure è stata sigillata.*

## Dove andare dopo

- [Modificare un task nel canale](/docs/channel-tasks/): la seconda riga, cioè contenuto, proprietario, tag, promemoria e webhook.
- [L'Activity](/docs/activity/): lavorate insieme su una lista, in una finestra dentro Discord.
- [Modificare una lista a mano](/docs/writing-a-list/): menzioni, proprietari, link e promemoria nel testo di Aggiornamento in blocco.
- [/config app](/docs/configuration/): controlla notifiche, cronologia e permessi.
- [FAQ](/docs/troubleshooting/#in-the-channel): risposte rapide ai problemi più comuni.
