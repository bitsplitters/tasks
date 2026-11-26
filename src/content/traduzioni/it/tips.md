---
title: Trucchi e consigli
description: Piccole abitudini che rendono TTM più veloce e più silenzioso, nel canale e nell'Activity.
fonte: 901e2ac519ca
---

La maggior parte funziona ovunque sia la lista. Quelli che esistono in un solo posto lo dicono sotto il titolo.

## Riusa una lista ovunque

<p class="place-pill"><img class="place-ic" src="/icons/posto-canale.svg" alt="" />Nel canale</p>

Apri **Altro** <img class="inline-ic" src="/icons/other.png" alt="" /> e scegli **Download** <img class="inline-ic" src="/icons/download.png" alt="" />: la lista arriva come file `.txt` che solo tu puoi vedere. Poi esegui `/crea-lista` su qualsiasi server e allega quel file all'opzione `file`.

Task, stati di completamento, proprietari, tag, promemoria e webhook tornano com'erano. Funziona bene per le checklist che ripeti, come rilasci, onboarding o eventi.

Se qualcosa nel file non va bene per il nuovo server, TTM non crea niente ed elenca tutti i problemi in una volta. Che cosa controlla: vedi [`/crea-lista`](/docs/commands/#create-list).

## Nascondi i suggerimenti

Se il tuo team sa già dove premere, nascondi i **Suggerimenti** in [/config app](/docs/configuration/#tips): niente Tutorial in `/crea-lista`, niente riga di aiuto sotto le liste.

## Clona invece di ricostruire

<p class="place-pill"><img class="place-ic" src="/icons/posto-canale.svg" alt="" />Nel canale</p>

Gestisci la stessa lista in più canali? **Clona lista** <img class="inline-ic" src="/icons/clone.png" alt="" />, nel pannello **Altro** della lista, la copia in un solo passaggio e ti lascia decidere se portare con te le spunte e i promemoria.

## Applica un'azione a più task

<p class="place-pill"><img class="place-ic" src="/icons/posto-canale.svg" alt="" />Nel canale</p>

Spunta **Mantieni lo stato dopo la selezione** nel menu **Comportamento** di [/config app](/docs/configuration/#keep-the-state-after-a-selection). Il pulsante attivo (proprietario, tag o promemoria) resta acceso dopo ogni task, così puoi mettere un tag a cinque task in cinque click invece di quindici.

## Chiedi chi c'è

Scrivi la domanda come un task, per esempio *Chi c'è per un 1v1 stasera?*, poi aggiungi il tuo tag: nel canale [**Tag**](/docs/channel-tasks/#tag) blu e il task, col menu vuoto; nell'Activity [**Tag**](/docs/activity-list/#tag) e **Salva**. Chi c'è spunta il task: la notifica della spunta ti menziona. Funziona per uno scrim, un posto nel raid, un passaggio in macchina. Il task si chiude alla prima risposta: chi risponde per secondo lo riapre. Anche la riapertura ti menziona.

## Tieni tranquillo il canale

Se le notifiche dei task ti sembrano rumorose, imposta **Modalità notifica** in [/config app](/docs/configuration/#notification-mode) per tenere solo l'ultima, oppure spegnile: la lista resta aggiornata in ogni caso.

## Promemoria che sopravvivono al cambio dell'ora

Su un promemoria ricorrente scegli **Giorni** nel menu **Unità** per la stessa ora del giorno, **Ore** per un intervallo esatto: intorno al cambio dell'ora i due differiscono di un'ora. Vedi [I campi della ripetizione](/docs/reminders/#the-repetition-fields).

## Un promemoria in due click

Il promemoria parte da dieci minuti da adesso, quindi per «ricordamelo fra poco» salvalo così com'è, con la finestra della data nel canale o **Salva** nell'Activity.

## Personalizza i webhook con variabili libere

Inserisci `{{owner=alex}}` (o qualsiasi `{{chiave=valore}}`) nel testo di un task e richiama `{{owner}}` nel corpo del tuo webhook. È un modo leggero per passare dati specifici del task senza scriverli nel codice. Vedi [Webhook nel testo](/docs/writing-a-list/#webhooks-in-the-text).

## Rendi le liste di sola lettura per gli ospiti

Sincronizza i permessi in [/config app](/docs/configuration/#sync-permissions) così solo il tuo team può modificare una lista, mentre tutti gli altri possono comunque leggerla. Il pulsante **Activity** <img class="inline-ic" src="/icons/activity.png" alt="" /> segue le stesse regole.
