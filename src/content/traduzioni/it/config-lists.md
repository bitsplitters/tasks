---
title: /config lists
description: Guarda tutte le liste del server, sigilla o elimina quelle che hai finito, oppure recupera una lista il cui messaggio è stato eliminato per errore.
fonte: 089e6935e4f2
---

Esegui il comando:

```
/config lists
```

Apre un pannello privato, che solo tu puoi vedere, con **tutte le liste che questo server ha ancora**. Ogni lista ha una riga: il nome della lista e il canale in cui vive, come link cliccabile.

Una lista che occupa uno dei posti del tuo piano è segnata **in uso** accanto al suo canale. Quando devi liberare un posto, sono queste le liste da sigillare o eliminare.

Durante la beta non c'è nessun limite, quindi nessuna lista è segnata. Come una lista occupa un posto: vedi [Come funzionano i tre posti](/docs/premium/#how-the-three-places-work).

Una lista su cui qualcuno sta lavorando nell'[Activity](/docs/activity/) è segnata **nell'Activity**. Puoi comunque rigenerarla, sigillarla o eliminarla e la conferma ti avvisa prima: vedi [Che cosa resta nel canale](/docs/activity/#what-stays-in-the-channel).

Di base solo i membri con il permesso *Gestisci server* possono usare `/config lists`, come il resto di `/config`. Vedi [Chi può aprire /config](/docs/config/#who-can-open-config).

## Un pulsante, quattro stati

Ogni riga ha un solo pulsante che cambia stato a ogni pressione:

| Stato | Significato |
| :--- | :--- |
| <span class="c-grey">Grigio</span> <img class="inline-ic" src="/icons/noaction.png" alt="" /> | nessuna azione |
| <span class="c-blue">Blu</span> <img class="inline-ic" src="/icons/refresh.png" alt="" /> | **rigenerala** |
| <span class="c-green">Verde</span> <img class="inline-ic" src="/icons/seal.png" alt="" /> | **sigillala** |
| <span class="c-red">Rosso</span> <img class="inline-ic" src="/icons/delete.png" alt="" /> | **eliminala** |

Segna tutte le liste che ti servono (due da eliminare, una da sigillare e tre da rigenerare, se è il caso) e poi premi **Applica**. Prima che succeda qualcosa, una finestra di conferma le elenca per nome, raggruppate per azione: inviala per andare avanti, chiudila per annullare.

Il blocco viene poi eseguito **in ordine**: prima le eliminazioni, poi le sigillature, poi le rigenerazioni. Quindi un solo blocco può liberare un posto e usarlo: una lista che elimini o sigilli cede il suo posto a una lista che rigeneri.

Alla fine ricevi un riepilogo, per nome: le liste eliminate, quelle sigillate, quelle rigenerate e quelle che non si sono potute gestire.

Ognuna di queste ha il suo motivo, per esempio una lista che non esiste più, oppure una rigenerazione senza posto libero nel tuo piano. Il pannello poi si ridisegna con le liste come sono adesso.

**Annulla** chiude il pannello e non fa niente. Le tue scelte sopravvivono al cambio di pagina: l'intestazione ti dice quante ne hai segnate su altre pagine e la conferma le include.

Le scelte della pagina che hai davanti vivono nel pannello stesso, quindi non scadono mai mentre ci pensi. Quelle delle altre pagine vengono ricordate per un'ora dopo l'ultima volta che tocchi il pannello.

## Rigenera

Pubblica di nuovo la lista, nel suo canale originale, con gli stessi contenuti: task, proprietari, tag e promemoria. Usala quando il messaggio della lista è stato eliminato per errore: i dati c'erano ancora, mancava solo il messaggio.

Tre cose da sapere:

- **la cronologia delle attività segue la lista.** Il nuovo messaggio riusa lo stesso thread, quindi la cronologia resta dov'era e non rimane niente di orfano;
- **il vecchio messaggio viene rimosso** se esiste ancora. È voluto: un messaggio lasciato indietro ha ancora pulsanti funzionanti. Premerli farebbe ricostruire la lista al bot una seconda volta, lasciando due liste che si allontanano l'una dall'altra;
- **rigenerare conta come lavorare sulla lista.** Una lista che occupa già uno dei posti del tuo piano lo mantiene. Una lista senza posto ne richiede uno libero, altrimenti finisce nel riepilogo tra quelle non riuscite.

## Sigilla

Per una lista che hai finito ma vuoi conservare come resoconto. La lista **resta nel canale** con gli stessi contenuti, ma senza pulsanti né menu e con una riga *Lista sigillata* in fondo. Tutto il resto se ne va:

- la lista non si può più modificare, riaprire o scaricare;
- i suoi promemoria si fermano;
- libera il suo posto nel tuo piano;
- non compare più in questo pannello, perché i suoi dati lasciano TTM.

La cronologia delle attività resta dov'è. Sigillare non si può annullare: se pensi di riusare la lista, scaricala prima di sigillarla.

La notifica nel canale e la riga nella cronologia seguono le opzioni del tuo server: con entrambe spente, niente registra chi ha sigillato la lista.

Una lista il cui messaggio non esiste più **non si può sigillare**: non è rimasto nessun resoconto da conservare. Compare nel riepilogo tra quelle non riuscite, con il motivo e il resto del blocco viene eseguito comunque. Per rimuoverla, segnala in rosso per **eliminarla**.

È la stessa sigillatura che ottieni con **Sigilla lista** nel pannello **Altro** <img class="inline-ic" src="/icons/other.png" alt="" /> di una lista.

## Elimina

Rimuove la lista in modo definitivo: task, proprietari, tag, promemoria e cronologia delle attività. Nel canale della lista viene pubblicata una ricevuta e l'ultima riga della cronologia registra l'eliminazione prima che il thread venga lasciato stare.

È la stessa eliminazione che ottieni con **Elimina lista** nel pannello **Altro** <img class="inline-ic" src="/icons/other.png" alt="" /> di una lista. Usa questo comando quando il messaggio della lista non c'è più e non si può cliccare.

<div class="callout"><div class="callout-t">Perché il bot non sa quali liste sono morte?</div>Distinguere una lista viva da una eliminata vorrebbe dire chiedere a Discord di ogni lista, a ogni apertura del pannello. TTM non lo fa: ti mostra ciò che esiste e linka ogni canale, così puoi controllare tu. Indovinare dal silenzio è proprio il modo in cui i dati vengono distrutti per sbaglio.</div>

## Se il database non è raggiungibile

Se il database non è raggiungibile, il comando rifiuta di aprirsi e lo dice. Ogni riga di quel pannello viene dal database. Un'eliminazione che non riuscisse a rimuovere i dati lascerebbe promemoria che scattano per una lista che non compare più da nessuna parte.
