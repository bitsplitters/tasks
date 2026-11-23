---
title: Lavorare su una lista nell'Activity
description: Le caselle, la prima riga, il pannello di un task (Contenuto, Proprietario, Tag, Promemoria e Webhook) e chi sta modificando che cosa.
fonte: ab103b5adfda
---

Dentro l'Activity la lista è una pagina a sé: una casella davanti a ogni task, una riga di pulsanti in alto e un pannello per ogni task. Le regole sono quelle del canale: proprietari, impostazioni del server, limiti del piano. Che cosa fa ogni funzione: [Proprietari e tag](/docs/owners-and-tags/), [Promemoria](/docs/reminders/), [Webhook](/docs/webhooks/), [Azioni sulla lista](/docs/list-actions/).

Sotto la lista una riga aiuta chi è nuovo: *Non sai da dove partire? Tocca una casella per spuntare un task, il suo testo per il resto.* Segue i [Suggerimenti](/docs/configuration/#tips) del server, come nel canale.

## La prima riga

Questi pulsanti agiscono sull'intera lista.

| Pulsante | Che cosa fa |
| :--- | :--- |
| **Guida** <img class="inline-ic" src="/icons/doc.png" alt="" /> | Una breve guida all'Activity, in cinque pagine. |
| **Modifica la lista** <img class="inline-ic" src="/icons/edit.png" alt="" /> | Il titolo e l'intera lista come testo: vedi [Modifica la lista](#edit-the-list). |
| **Pulisci la lista** <img class="inline-ic" src="/icons/clean.png" alt="" /> | Rimuove i task completati: vedi [Pulisci la lista e Riapri tutti](#clean-the-list-and-reopen-all). |
| **Riapri tutti** <img class="inline-ic" src="/icons/reopen.png" alt="" /> | Riporta da fare i task completati; **Nuova data** sposta i loro promemoria. |
| **Esci** <img class="inline-ic" src="/icons/back.png" alt="" /> | Riporta la lista nel canale: vedi [Tornare al canale](/docs/activity/#back-to-the-channel). |

Sopra la riga, **Home** ti porta alla [home del canale](/docs/activity/#the-home-of-the-channel) e l'ingranaggio apre [le tue impostazioni](/docs/activity/#your-settings). Clona, Download, Sigilla, Elimina e Sblocca non sono qui: [restano nel canale](/docs/activity/#what-stays-in-the-channel).

## Spuntare un task

**Tocca la casella** davanti a un task per spuntarlo e toccala di nuovo per riaprirlo. Un gruppo si porta dietro i suoi subtask e risulta spuntato quando lo sono tutti, come nel canale. Ogni task che cambia fa scattare il suo [webhook](#webhook), subtask e gruppo compresi, come nel canale.

Quando una spunta viene rifiutata, un fumetto sulla casella ti dice perché: un task con un proprietario può essere spuntato solo dal suo proprietario e da chi ha *Gestisci messaggi* sul canale (vedi [Chi può spuntare un task](/docs/core-concepts/#who-can-tick-a-task)). Su un task che qualcun altro sta modificando, il fumetto dice chi.

## Il pannello di un task

**Tocca il testo di un task** per aprire il suo pannello, intitolato *Scegli che cosa cambiare nel task …*. Ha i cinque pulsanti della seconda riga del canale: **Contenuto**, **Proprietario**, **Tag**, **Promemoria** e **Webhook**. Ognuno passa per tre colori:

- <span class="c-grey">Grigio</span>: spento.
- <span class="c-blue">Blu</span>: modifica e il pannello mostra i campi e **Salva**.
- <span class="c-red">Rosso</span>: elimina e il pannello mostra **Elimina**. Su un task che non ha niente da eliminare, la frase in alto lo dice, per esempio *Questo task non ha un proprietario* e **Elimina** resta spento.

Un terzo tocco rende di nuovo grigio il pulsante. Non succede niente finché non tocchi **Salva** o **Elimina**. Dopo un'azione il pannello resta sullo stesso task, con i pulsanti grigi, pronto per la modifica successiva. Si chiude con **Chiudi**, con un tocco fuori dal pannello o da solo dopo 30 secondi senza attività.

Mentre il pannello è aperto, il task è bloccato per gli altri: vedi [Chi sta modificando che cosa](#who-is-editing-what).

## Contenuto

**Blu** mostra il testo del task, per cambiarlo, con i canali per nome, come `#general`. Proprietari, tag, promemoria e webhook scritti lì vengono rimossi: hanno i loro pulsanti. Un proprietario che TTM non conosce non viene salvato: il messaggio ti rimanda a **Proprietario**.

**Rosso** elimina il task. Eliminare un gruppo con dei subtask ti chiede prima conferma, come nel canale. L'ultimo task di una lista non si può eliminare: una lista non può restare vuota. Per eliminare l'intera lista usa il canale.

## Proprietario

**Blu** mostra una ricerca tra le persone e i ruoli del server, con chi è nell'Activity per primo. Tocca un nome per aggiungerlo, toccalo di nuovo per toglierlo, poi **Salva**. Togli ogni nome e **Salva** rimuove il proprietario, come fa **Rosso**.

**Per prendere un task** senza proprietario, premi **Proprietario** finché diventa blu: il tuo nome è già scelto, quindi **Salva** rende tuo il task. Per darlo invece a qualcun altro, tocca il suo nome: prende il posto del tuo. Un task che ha già un proprietario lo mostra e cambia solo se scegli qualcuno.

- Una persona o un ruolo bastano con ogni piano.
- Più persone diventano un ruolo che TTM crea: vedi [I ruoli che crea TTM](/docs/owners-and-tags/#the-roles-ttm-creates). Serve Premium e il permesso *Gestisci ruoli* per TTM; senza, **Salva** resta spento e il pannello ne spiega il motivo. Discord permette a TTM di assegnare un ruolo a dieci persone ogni dieci secondi, quindi con più di dieci un avviso dice quanto ci vuole.

**Rosso** rimuove il proprietario e anche il suo promemoria: non resta nessuno a riceverlo. Se il promemoria non è ancora scattato, il pannello ti chiede prima di confermare.

## Tag

**Blu** mostra i tag che il task ha adesso, già scelti. Aggiungi e togli persone o ruoli dalla ricerca, fino a 25, poi **Salva**: il task riceve esattamente l'insieme che vedi. Non c'è una modalità di sovrascrittura né la modifica in tempo reale: parti sempre dai tag attuali.

Toglili tutti e **Salva** rimuove ogni tag, come fa **Rosso**.

**Rosso** rimuove ogni tag. In entrambi i casi un task composto solo da tag li mantiene, perché senza di loro non avrebbe testo.

## Promemoria

**Blu** mostra insieme **Data**, **Ora** e **Fuso orario** e le ripetizioni quando valgono.

- Un promemoria **nuovo** parte da dieci minuti da adesso, con **Salva** già acceso.
- Un promemoria **esistente** mostra i suoi valori. **Salva** resta spento finché non cambi qualcosa.
- **Salva** resta spento per una data passata o a meno di 5 minuti da adesso: *La data è già passata* ti dice di sceglierne una nuova.

Tocca **Fuso orario** per sceglierlo: cerca per città, paese, un nome come `Europe/Rome` o uno scarto come `+5:30`. *I tuoi fusi* elenca quelli che contano per te: quello di questo dispositivo, il tuo o l'ultimo che hai usato, quello del server. Sotto il campo una riga ti dice se il fuso è il tuo: finché non ne scegli uno in **Impostazioni**, il fuso che lasci qui diventa il tuo. Vedi [Il tuo fuso orario](/docs/reminders/#your-time-zone). Sotto i campi, *Su questo dispositivo* mostra lo stesso momento nell'ora del tuo dispositivo, quando il fuso è diverso.

I tre menu della ripetizione compaiono con Premium, con l'interruttore dei [promemoria ricorrenti](/docs/reminders/#repeating-reminders) acceso, oppure quando il promemoria si ripete già: vedi [I campi della ripetizione](/docs/reminders/#the-repetition-fields).

Un task spuntato non può avere un promemoria. Su un task senza proprietario, il pannello dice che salvando ne diventi il proprietario.

**Rosso** rimuove il promemoria.

## Webhook

I webhook sono una funzione **Premium**, sbloccata per ogni server durante la beta: vedi [Cosa sblocca Premium](/docs/premium/).

**Blu** elenca i webhook del server per nome, ciascuno con il momento in cui scatta: *al completamento*, *alla riapertura* o *sempre*. L'indirizzo non compare mai. Scegline uno, poi **Salva**. Un webhook che non esiste più compare in cima, segnato come *non esiste più*, così puoi sceglierne un altro. Se il server non ne ha, il pannello dice che si creano con `/config webhook`: vedi [Webhook](/docs/webhooks/).

**Rosso** toglie il webhook dal task.

## Modifica la lista

**Modifica la lista** mostra il titolo e ogni task come testo, nel formato di [Scrivere una lista](/docs/writing-a-list/): lo stesso testo dell'**Aggiornamento in blocco** del canale, letto con le stesse regole: persone, ruoli e canali per nome, date dei promemoria nel tuo fuso orario. Una riga sotto il testo spiega come aggiungere qualcuno di nuovo e rimanda a [Scrivere una lista](/docs/writing-a-list/#people-roles-and-channels-by-name). Cambia ciò che ti serve e salva.

La lista è bloccata per gli altri dal momento in cui si apre finché non salvi o annulli: **Annulla**, la ✕ e un tocco fuori la sbloccano. Si chiude da sola dopo 30 secondi senza attività. Se il testo non si può salvare, i problemi compaiono sotto: vedi [Quando il testo non si può salvare](/docs/writing-a-list/#when-the-text-cant-be-saved).

## Pulisci la lista e Riapri tutti

**Pulisci la lista** ti chiede prima di confermare. Il riepilogo di fine sessione registra quanti task hai tolto. Se nessun task è completato, o se lo sono tutti, lo dice e non cambia niente.

**Riapri tutti** ti chiede conferma ogni volta. **Nuova data**, nella stessa finestra, sposta i promemoria dei task che riapri. Riaprire fa scattare i webhook di riapertura dei task che riapri. Che cosa cambiano entrambe le azioni: [Azioni sulla lista](/docs/list-actions/).

## Chi sta modificando che cosa

Due persone non cambiano mai la stessa cosa nello stesso momento:

- La tua prima modifica a un task lo blocca per gli altri. Un tocco sulla sua casella dice loro chi lo sta modificando; gli altri task restano liberi.
- Mentre qualcuno cambia un task, **Modifica la lista**, **Pulisci la lista** e **Riapri tutti** aspettano e dicono chi stanno aspettando.
- **Modifica la lista** blocca l'intera lista: le caselle tornano quando ha finito.

Una modifica lasciata ferma per 20 secondi chiede *Sei ancora lì? Fra 10 secondi la modifica si chiude*; a 30 si chiude e ciò che non è stato salvato va perso. La lettura non ha limiti di tempo.

Se qualcuno cambia la stessa cosa subito prima che tu salvi, scegli tu: **Sovrascrivi**, che salva la tua modifica e perde la sua; **Ricarica**, con il tuo testo conservato sotto per copiarlo; oppure **Annulla**.

## Dove andare dopo

- [L'Activity](/docs/activity/): come entrare, la home del canale e come tornare al canale.
- [Modificare un task nel canale](/docs/channel-tasks/): gli stessi cinque pulsanti, sotto la lista nel canale.
- [FAQ](/docs/troubleshooting/#in-the-activity): risposte rapide ai problemi più comuni.
