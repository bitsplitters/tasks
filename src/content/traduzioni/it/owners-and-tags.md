---
title: Proprietari e tag
description: A chi appartiene un task, chi menziona e i ruoli che crea TTM quando un task ha più proprietari.
fonte: 9d78c40a198c
---

Un task può avere un **proprietario** e più **tag**. Il proprietario è la persona a cui il task appartiene: chi può spuntarlo e chi riceve il suo promemoria. I tag sono gli utenti e i ruoli menzionati sul task, per esempio le persone da avvisare quando viene completato.

Imposti entrambi con i pulsanti **Proprietario** <img class="inline-ic" src="/icons/owner.png" alt="" /> e **Tag** <img class="inline-ic" src="/icons/tag.png" alt="" />: nel canale, nella seconda riga sotto la lista; nell'Activity, nel pannello di un task. Dove premere: [Come si fa](#how-to-do-it), in fondo.

## Proprietario: una persona, un ruolo o più persone

Il proprietario è chi possiede un task: chi può spuntarlo e chi riceve il suo promemoria. Può essere:

- **Una persona** — possiede il task e il suo promemoria la raggiunge con un messaggio diretto.
- **Un ruolo** — tutti quelli che hanno quel ruolo possiedono il task e ognuno di loro può spuntarlo. Il suo promemoria è un messaggio nel canale della lista che menziona il ruolo.
- **Più persone** — TTM crea un ruolo per loro, lo assegna esattamente a quelle persone e lo rende il proprietario. Da lì in poi funziona come qualsiasi ruolo proprietario. È una funzione [Premium](/docs/premium/).

Non puoi mischiare persone e ruoli e puoi scegliere al massimo un ruolo: un task ha un solo proprietario. Per più persone il bot ha bisogno del permesso *Gestisci ruoli*: vedi [Che cosa gli serve](#what-it-needs).

**Per prendere un task per te**, nel canale: clicca **Proprietario** finché diventa blu, poi scegli il task senza scegliere nessuno. Funziona su un task senza proprietario. Un task che ne ha già uno cambia solo se scegli te stesso nel menu: vedi [Proprietario](/docs/channel-tasks/#owner).

**Chi riceve un task da qualcun altro viene menzionato** nella notifica nel canale, così Discord lo avvisa: una persona o tutti quelli del ruolo. Nell'Activity la menzione arriva con il riepilogo alla fine della sessione.

**Togliere il proprietario toglie anche il suo promemoria**, perché non resta nessuno a riceverlo. Se il promemoria non è ancora scattato, TTM ti chiede prima di confermare.

Come il promemoria raggiunge una persona o un ruolo: vedi [Come arriva il promemoria](/docs/reminders/#how-the-reminder-arrives). Chi può spuntare un task con un proprietario: vedi [Chi può spuntare un task](/docs/core-concepts/#who-can-tick-a-task).

## Tag

Un tag è un utente o un ruolo menzionato sul task. Un task può avere **fino a 25 tag**, persone e ruoli insieme. I tag non cambiano chi può spuntare il task: dicono chi dovrebbe saperlo.

Una nuova scelta di tag **sostituisce** la vecchia: il task viene taggato esattamente con le persone e i ruoli che hai scelto. Per aggiungere qualcuno, mantieni gli altri nella tua scelta. Togliere i tag li toglie tutti insieme.

Come li scegli cambia un po' fra i due posti. Nel canale un'impostazione del server decide se sovrascrivi i tag o li modifichi dal vivo: vedi [Tag](/docs/channel-tasks/#tag). Nell'Activity parti sempre dai tag che il task ha adesso: vedi [Tag](/docs/activity-list/#tag).

Nel testo di una lista un tag è `@` e il nome, come `@Ava` e il proprietario è lo stesso nome seguito da due punti, `@Ava:`: vedi [Modificare una lista a mano](/docs/writing-a-list/#owners-the-mention-with-a-colon).

## I ruoli che crea TTM

Quando dai un task a più persone, TTM:

- crea un ruolo chiamato **TTM** seguito dal primo numero libero: TTM1, TTM2 e così via. Il ruolo è **menzionabile**, non ha **nessun permesso** e sta in fondo all'elenco dei ruoli;
- assegna il ruolo alle persone che hai scelto, una alla volta;
- rende il ruolo il proprietario del task.

### Che cosa gli serve

Al bot serve il permesso *Gestisci ruoli* e il link d'invito lo include. Senza, TTM non crea né elimina ruoli. In un server che ha aggiunto il bot prima, un amministratore potrebbe dover concederlo al ruolo del bot. Fallo in *Impostazioni del server → Ruoli*, non su un canale.

Su un canale Discord mostra lo stesso permesso come *Gestisci permessi*. Lì fa un'altra cosa: permette a un ruolo di cambiare i permessi di quel canale.

Un server può avere al massimo **250 ruoli**: è un limite di Discord. Quando il server lo raggiunge, TTM non può creare il ruolo e lo dice.

Assegnare il ruolo richiede anche tempo. Discord permette a un bot di farlo dieci volte ogni dieci secondi, quindi 25 persone richiedono circa venti secondi. Con più di dieci persone, TTM ti dice quanto ci vorrà.

### Quando TTM crea un nuovo ruolo

**TTM non cambia mai un ruolo dopo averlo creato.**

- Scegliere persone diverse, anche una in più o una in meno, crea un nuovo ruolo.
- Scegliere esattamente le stesse persone del proprietario attuale non cambia nulla.
- Nel canale, con **Mantieni lo stato dopo la selezione** attivo, la stessa selezione su più task di fila riusa il ruolo creato per il primo task.

### Quando un ruolo smette di essere di TTM

TTM ricorda i ruoli che crea e le persone a cui li ha assegnati. Un ruolo resta di TTM solo finché ha l'aspetto in cui TTM lo ha lasciato:

- lo stesso nome;
- nessun permesso, né sul server né su un canale;
- lo stesso numero di membri.

Se lo rinomini, gli dai un permesso, lo aggiungi ai permessi di un canale o aggiungi o togli un membro, diventa uno dei ruoli del tuo server. TTM lo controlla prima di eliminare un ruolo e quando mostra il proprietario di un task da cambiare. Un ruolo che non è più di TTM non viene mai eliminato e la scelta del proprietario mostra il ruolo al posto delle persone.

Quindi, per tenere un ruolo per il tuo server, **rinominalo**. Poi puoi usarlo dove vuoi. Un nuovo colore o una nuova posizione non bastano: TTM eliminerebbe comunque il ruolo quando nessuna lista lo usa più.

TTM vede *quanti* membri ha un ruolo, ma non *chi* sono. Quindi se scambi un membro con un altro, TTM non se ne accorge: continua a mostrare le persone a cui ha assegnato il ruolo.

### Quando TTM elimina un ruolo

TTM elimina un ruolo che ha creato, anche dal server, quando sono vere entrambe queste condizioni:

- **nessuna lista lo usa più**, come proprietario o come tag e nessun permesso di comando lo usa;
- ha ancora l'aspetto di un ruolo di TTM.

TTM controlla ogni dieci minuti e non tocca mai un ruolo creato da meno di dieci minuti. Alcuni ruoli restano sempre:

- i ruoli di una lista **sigillata**, perché il messaggio sigillato li mostra ancora;
- tutti i ruoli che TTM ha creato, quando il bot viene **rimosso** da un server.

<div class="howto" id="how-to-do-it"><div class="howto-t">Come si fa</div><div class="howto-grid"><a class="howto-go is-channel" href="/docs/channel-tasks/#owner"><span class="howto-k"><img class="place-ic" src="/icons/posto-canale.svg" alt="" />Nel canale</span><span class="howto-d">Proprietario e Tag, nella seconda riga sotto la lista.</span></a><a class="howto-go is-activity" href="/docs/activity-list/#owner"><span class="howto-k"><img class="place-ic" src="/icons/activity.png" alt="" />Nell'Activity</span><span class="howto-d">Proprietario e Tag, nel pannello di un task.</span></a></div></div>
