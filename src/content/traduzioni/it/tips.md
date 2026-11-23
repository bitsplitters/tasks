---
title: Trucchi e consigli
description: Piccole abitudini che rendono TTM più veloce e più silenzioso, nel canale e nell'Activity.
fonte: ab9d146ac6cf
---

La maggior parte funziona ovunque sia la lista. Quelli che esistono in un solo posto lo dicono sotto il titolo.

## Riusa una lista ovunque

<p class="place-pill"><img class="place-ic" src="/icons/posto-canale.svg" alt="" />Nel canale</p>

Apri **Altro** <img class="inline-ic" src="/icons/other.png" alt="" /> e scegli **Download** <img class="inline-ic" src="/icons/download.png" alt="" />: la lista arriva come file `.txt` che solo tu puoi vedere. Poi esegui `/crea-lista` su qualsiasi server e allega quel file all'opzione `file`. Task, stati di completamento, proprietari, tag, promemoria e webhook tornano com'erano. Funziona bene per le checklist che ripeti, come rilasci, onboarding o eventi.

Se qualcosa nel file non va bene per il nuovo server, TTM non crea niente ed elenca tutti i problemi in una volta. Che cosa controlla: vedi [`/crea-lista`](/docs/commands/#create-list).

## Nascondi i suggerimenti

Se il tuo team sa già come scrivere una lista e dove premere, nascondi i **Suggerimenti** in [Configurazione](/docs/configuration/#tips). `/crea-lista` apre allora subito il modulo di creazione, senza il **Tutorial** e le liste finiscono senza la riga di aiuto, nel canale e nell'Activity.

## Clona invece di ricostruire

<p class="place-pill"><img class="place-ic" src="/icons/posto-canale.svg" alt="" />Nel canale</p>

Gestisci la stessa lista in più canali? **Clona lista** <img class="inline-ic" src="/icons/clone.png" alt="" />, nel pannello **Altro** della lista, la copia in un solo passaggio e ti lascia decidere se portare con te le spunte e i promemoria.

## Applica un'azione a più task

<p class="place-pill"><img class="place-ic" src="/icons/posto-canale.svg" alt="" />Nel canale</p>

Spunta **Mantieni lo stato dopo la selezione** nel menu **Comportamento** di [Configurazione](/docs/configuration/#keep-the-state-after-a-selection). Il pulsante attivo (proprietario, tag o promemoria) resta acceso dopo ogni task, così puoi mettere un tag a cinque task in cinque click invece di quindici.

## Tieni tranquillo il canale

Se le notifiche dei task ti sembrano rumorose, imposta **Modalità notifica** su *Elimina tutte le notifiche tranne l'ultima*, oppure disattivale del tutto (*Notifiche disabilitate*). La tua lista resta sempre aggiornata in ogni caso. Il riepilogo di una sessione nell'Activity segue la stessa impostazione.

## Promemoria che sopravvivono al cambio dell'ora

Su un promemoria *ricorrente* (una funzione Premium), scegli **giorni** quando intendi «domani alla stessa ora» e **ore** quando intendi «esattamente un giorno dopo»: nel testo di una lista, `1d` e `24h`. Intorno al passaggio all'ora legale i due differiscono di un'ora: vedi [Promemoria](/docs/reminders/#the-repetition-fields).

## Un promemoria in due click

Il promemoria parte da dieci minuti da adesso, nel tuo fuso orario. Per «ricordamelo fra poco», salvalo così com'è, senza scrivere niente: nel canale, invia la finestra della data; nell'Activity, tocca **Salva** nel pannello del promemoria. Ogni promemoria è un evento singolo a meno che il tuo server abbia acceso i promemoria ricorrenti, una funzione Premium spenta di base.

## Scrivi i nomi, non gli ID

Nel testo di una lista scrivi `@` e un nome, oppure `#` e un canale: `@Ava: Pubblica le regole in #general`. Quando salvi, TTM li trasforma in menzioni. Per nome scrivi le persone che la lista già menziona e ogni ruolo e canale; chi è nuovo arriva dal pulsante **Proprietario** o **Tag**. Vedi [Scrivere una lista](/docs/writing-a-list/#people-roles-and-channels-by-name).

## Personalizza i webhook con variabili libere

Inserisci `{{owner=alex}}` (o qualsiasi `{{chiave=valore}}`) nel testo di un task e richiama `{{owner}}` nel corpo del tuo webhook. È un modo leggero per passare dati specifici del task senza scriverli nel codice. Vedi [Webhook nel testo](/docs/writing-a-list/#webhooks-in-the-text).

## Rendi le liste di sola lettura per gli ospiti

Sincronizza i permessi in [Configurazione](/docs/configuration/#sync-permissions) così solo il tuo team può modificare una lista, mentre tutti gli altri possono comunque leggerla. Il pulsante **Activity** <img class="inline-ic" src="/icons/activity.png" alt="" /> segue le stesse regole.
