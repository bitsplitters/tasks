---
title: FAQ
description: Domande frequenti — risposte rapide ai problemi più comuni, ognuna con il link alla pagina che la spiega per intero.
fonte: a72339b9982f
---

Trova qui sotto il problema che hai. Ogni risposta è breve e rimanda alla pagina che la spiega per intero. I problemi della lista sono divisi per luogo: [nel canale](#in-the-channel) e [nell'Activity](#in-the-activity).

La ricerca funziona con le parole italiane: prova *spuntare*, *proprietario*, *promemoria*.

## Nel canale

### Non trovo il comando `/crea-lista`

Discord mostra ogni comando nella lingua della tua app Discord. In italiano il comando è `/crea-lista`, in inglese `/create-list`. Tutti i nomi tradotti sono in [Nomi dei comandi nella tua lingua](/docs/commands/#command-names-in-your-language).

### Non riesco a spuntare un task

Controlla questi punti, in quest'ordine:

- **Un pulsante della seconda riga è blu o rosso.** Cliccalo finché è spento. Finché un pulsante è attivo, scegliere un task applica l'azione di quel pulsante. Vedi [Il menu di spunta](/docs/the-task-list/#the-check-selector).
- **Il task ha un proprietario.** Possono spuntarlo solo il proprietario, i membri del ruolo proprietario e chi ha *Gestisci messaggi* sul canale. Vedi [Chi può spuntare un task](/docs/core-concepts/#who-can-tick-a-task).
- **Il menu è disattivato.** Qualcuno sta modificando la lista, quindi è bloccata: vedi [Ho premuto Annulla e la lista resta bloccata](#i-pressed-cancel-and-the-list-stays-locked) più sotto.
- **Il bot dice *Non sei abilitato a usare questa funzione su questo server*.** Il tuo server ha sincronizzato i permessi e per te la lista è in sola lettura. Chiedi a un admin e vedi [Sincronizza permessi](/docs/configuration/#sync-permissions).
- **La beta è finita e il tuo server è sul piano Free.** Quando tutti i posti del tuo piano sono occupati, una lista fuori da quei posti rifiuta la spunta.

  Una lista creata durante la beta fa eccezione: i suoi task si possono ancora spuntare. Vedi [Come funzionano i tre posti](/docs/premium/#how-the-three-places-work) e [Cosa conserva una lista della beta](/docs/beta/#what-a-beta-list-keeps).

### Ho premuto Annulla e la lista resta bloccata

TTM blocca una lista mentre qualcuno la modifica e chiudere la finestra con **Annulla** o con la ✕ non la sblocca, perché Discord non lo dice al bot. Chiunque può sbloccarla: apri **Altro** sotto la lista e premi **Sblocca lista** <img class="inline-ic" src="/icons/unlock.png" alt="" />. Vedi [Quando la lista è bloccata](/docs/the-task-list/#when-the-list-is-locked).

### I miei tag o il mio proprietario non si sono salvati

I menu **Tag** e **Proprietario** aspettano che tu confermi la scelta. Da mobile, tocca **Salva** sotto il menu aperto. Da desktop non c'è nessun pulsante Salva: clicca in un punto qualsiasi fuori dal menu e chiuderlo applica la scelta. Vedi [Confermare una selezione](/docs/channel-tasks/#confirming-a-selection--desktop-vs-mobile).

Con **Mantieni lo stato dopo la selezione** spento (come di default), scegli prima le persone e poi il task. Vedi [Tag](/docs/channel-tasks/#tag).

Se un task è diventato tuo invece di andare alle persone che avevi scelto, il menu era ancora vuoto quando hai scelto il task: con il menu vuoto, **Proprietario** dà il task a te. Per rimediare:

1. Clicca **Proprietario** finché è rosso e scegli il task, per togliere il proprietario.
2. Clicca **Proprietario** finché è blu, scegli le persone e conferma.
3. Scegli di nuovo il task.

### Voglio dare un task a più persone

Clicca **Proprietario** finché diventa blu. Nel menu sotto i pulsanti, con la scritta *Scegli un task nel menu in alto per prenderlo, o scegli a chi darlo*, scegli le persone. Conferma la scelta, poi scegli il task.

TTM crea un ruolo per quelle persone e lo imposta come proprietario. Nell'Activity, scegli le persone nel pannello del task: vedi [Proprietario](/docs/activity-list/#owner).

È una funzione [Premium](/docs/premium/). Al bot serve il permesso *Gestisci ruoli*: un admin lo concede al ruolo del bot in *Impostazioni del server → Ruoli*, non su un canale. Vedi [Proprietario: una persona, un ruolo o più persone](/docs/owners-and-tags/#owner-a-person-a-role-or-several-people).

### Ho eliminato per sbaglio il messaggio della lista

I dati della lista sono ancora in TTM e i suoi promemoria continuano ad arrivare. Esegui `/config lists` e premi il pulsante di quella lista finché diventa blu (**rigenera**). Poi premi **Applica** e conferma. TTM pubblica di nuovo la lista nel suo canale, con lo stesso contenuto e la stessa cronologia. Vedi [Rigenerare](/docs/config-lists/#regenerate).

## Nell'Activity

### L'Activity non si apre

Controlla questi punti, in quest'ordine:

- **Il primo pulsante sotto la lista è ancora Clona lista.** La lista è stata pubblicata prima che arrivasse l'Activity: avrà il pulsante dell'Activity alla sua prossima modifica.
- **Il pulsante dell'Activity è spento.** Qualcuno sta modificando la lista nel canale. Il pulsante si accende quando la lista viene sbloccata: vedi [Quando la lista è bloccata](/docs/the-task-list/#when-the-list-is-locked).
- **Il bot dice che ti serve *Usa Activity*.** È un permesso di Discord sul canale e un amministratore del server te lo abilita in *Permessi* del canale.
- **Il bot dice *Non vedo ancora l'Activity*.** La tua app Discord potrebbe non supportare l'Activity. Aggiornala oppure prova un altro dispositivo.

Vedi [Quando la lista non si apre](/docs/activity/#when-the-list-doesnt-open).

### La lista mostra solo Entra nell'Activity

La lista è nell'[Activity](/docs/activity/) e finché è lì non si può modificare nel canale. Premi **Entra nell'Activity** per lavorarci insieme agli altri. Quando escono tutti, la lista torna nel canale con tutti i suoi pulsanti. Vedi [Unirsi agli altri](/docs/activity/#join-the-others).

### Non riesco a spuntare un task nell'Activity

TTM ti dice perché. Di solito:

- **Il task ha un proprietario.** Lo dice un fumetto sulla casella. La regola è la stessa del canale: vedi [Chi può spuntare un task](/docs/core-concepts/#who-can-tick-a-task).
- **Qualcuno sta modificando quel task.** Toccando la sua casella vedi chi. Gli altri task restano liberi.
- **Qualcuno sta modificando l'intera lista** con **Modifica la lista**. La riga sotto la lista dice chi e le caselle tornano quando ha finito. Vedi [Chi sta modificando cosa](/docs/activity-list/#who-is-editing-what).
- **Il database non risponde.** Lo dice una striscia e la lista è in sola lettura finché non torna: vedi [Quando il database non risponde](/docs/activity/#when-the-database-isnt-responding).

### La lista impiega un po' a tornare dall'Activity

L'Activity è stata chiusa senza premere **Esci**. Per TTM, una finestra chiusa somiglia a una connessione caduta per un attimo: aspetta 30 secondi che tu torni, poi riporta la lista nel canale.

Con un telefono lasciato in background o bloccato può volerci fino a un minuto, perché il bot deve prima accorgersi che la pagina ha smesso di rispondere.

**Esci** dice subito al bot che hai finito: se sei l'ultimo nella lista, torna subito nel canale. Vedi [Tornare nel canale](/docs/activity/#back-to-the-channel).

### L'Activity si ricarica dopo che cambio il tema di Discord

Quando cambi il suo tema, Discord ricarica l'Activity da sé, a volte anche dopo un minuto: TTM non può impedirlo. La lista torna da sola in un attimo, con il tema che avevi.

Se il tuo tema era **Come Discord**, diventa il tema che stavi vedendo. Per seguire di nuovo Discord, scegli **Come Discord** con l'ingranaggio: vedi [Le tue impostazioni](/docs/activity/#your-settings).

Dopo un ricaricamento, **Esci** ti porta ancora fuori dalla lista, ma per un bug di Discord non può chiudere la finestra: chiudila da Discord.

## Promemoria

### Il mio promemoria non è arrivato

- **Il promemoria va al proprietario del task.** Sei tu solo se il task non aveva un proprietario quando l'hai impostato. Una persona riceve un messaggio diretto, un ruolo riceve una menzione nel canale della lista. Vedi [Le regole](/docs/reminders/#the-rules).
- **Il proprietario deve consentire i messaggi diretti dai membri del server**, nelle *Impostazioni privacy* del server. Vedi [Promemoria con messaggio diretto](/docs/known-limits/#reminders-by-direct-message).
- **Il proprietario è un ruolo che non può essere menzionato.** Il promemoria compare nel canale, ma nessuno riceve una notifica. Vedi [Promemoria a un ruolo](/docs/known-limits/#reminders-to-a-role).
- **Il ruolo proprietario è stato eliminato.** Il promemoria non viene inviato a nessuno. Scegli un altro proprietario per il task. Vedi [Promemoria a un ruolo](/docs/known-limits/#reminders-to-a-role).
- **TTM non può scrivere nel canale della lista.** Vedi [I permessi che chiede TTM](/docs/core-concepts/#the-permissions-ttm-asks-for).
  - Un ruolo che TTM ha creato per più persone: ognuna riceve il promemoria con un messaggio diretto, con il motivo.
  - Qualsiasi altro ruolo: il promemoria non viene consegnato finché un admin non concede il permesso.
- **Il proprietario è stato tolto, o la lista è stata sigillata.** In questi casi il promemoria sparisce. Prima di togliere un proprietario il cui promemoria non è ancora scattato, TTM ti chiede di confermare. Vedi [Proprietari e tag](/docs/owners-and-tags/) e [Sigillare](/docs/config-lists/#seal).
- **Il task è spuntato.** Completare un task ferma il suo promemoria e un task spuntato non ne può ricevere uno nuovo.

### Voglio un promemoria settimanale

TTM non ha un'unità per le settimane, quindi una settimana è 7 giorni. Per prima cosa un admin attiva **Promemoria ricorrenti** in [`/config app`](/docs/configuration/#recurring-reminders) (una funzione [Premium](/docs/premium/)).

Nel canale:

1. Clicca **Promemoria** finché diventa blu, scegli il task e invia la finestra **Quando**.
2. Sulla scheda che compare, premi **Modifica ricorrenza**.
3. Scegli **Ogni** 7 e **Unità** giorni e in **Quante volte, in tutto** il numero di settimane, per es. 4 per quattro settimane. Poi invia la finestra.
4. Premi **Salva** sulla scheda.

Nell'Activity, tocca il testo del task, poi **Promemoria**: gli stessi tre menu sono nel pannello, sotto la data. Sceglili, poi tocca **Salva**.

Vedi [I campi della ripetizione](/docs/reminders/#the-repetition-fields).

## Piani e permessi

### Non riesco a creare una lista, o il bot dice di liberare un posto

Durante la beta non c'è nessun limite alle liste. Dopo, il piano Free ti lascia lavorare su tre liste per volta e TTM rifiuta la quarta finché non ne sigilli o elimini una: vedi [Cosa succede a una quarta lista](/docs/premium/#what-happens-to-a-fourth-list).

### Chi può sigillare o eliminare una lista?

Nel pannello **Altro** di una lista, **Sigilla lista** ed **Elimina lista** li vedono solo i membri con *Gestisci messaggi* sul canale. In `/config lists` vale la regola di `/config`: di default, i membri con *Gestisci server*. Vedi [Cosa c'è dentro Altro](/docs/the-task-list/#whats-inside-more) e [Chi può aprire /config](/docs/config/#who-can-open-config).

### Non trovo il comando `/config`

Di default, solo i membri con il permesso *Gestisci server* vedono `/config`. Un admin può aprirlo al tuo ruolo in *Impostazioni del server → Integrazioni → Team Tasks Manager*. Vedi [Chi può aprire /config](/docs/config/#who-can-open-config).

### Il bot dice che manca un permesso

Ci sono due casi diversi:

- **Al bot manca un permesso.** Il suo messaggio nomina il permesso e i passaggi per concederlo. Quando il bot non può scrivere nel canale della lista, il messaggio arriva solo a te e al massimo una volta all'ora. A cosa serve ogni permesso: [I permessi che chiede TTM](/docs/core-concepts/#the-permissions-ttm-asks-for).
- **Tu non sei abilitato a usare una funzione.** Questa regola la imposta l'admin del server, non il bot. Vedi [Sincronizza permessi](/docs/configuration/#sync-permissions).

---

Sei ancora bloccato? Chiedi a noi sul [server Discord](/docs/community/). Passaggi chiari e uno screenshot ci aiutano a rispondere in fretta.
