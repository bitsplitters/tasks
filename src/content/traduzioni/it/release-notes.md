---
title: Note di rilascio
description: Le novità di Team Tasks Manager, dalla più recente.
fonte: 96dbaef26d7b
---

Ogni cambiamento che vedi in Discord è elencato qui, dal più recente. Ogni voce rimanda alla pagina che lo spiega.

## 2.6.0 — Il tuo fuso orario, ovunque

Released 2026-11-24

- **Scegli il tuo fuso orario una volta sola** — **/my timezone**, in qualsiasi server, mostra il tuo fuso orario e da dove viene. **Scegli** imposta il tuo e TTM te lo propone in ogni server, nel canale e nell'Activity. **Togli il mio fuso** torna a quello proposto. Vedi [/my timezone](/docs/my-timezone/).
- **Un fuso diverso vale solo per quella data** — il fuso che lasci in un promemoria non diventa più il tuo e TTM dimentica quelli che aveva imparato così: ti propone il tuo solo quando lo scegli. Sotto il fuso orario di **Quando**, una riga ti dice da dove viene il fuso e come scegliere il tuo. Vedi [/my timezone](/docs/my-timezone/).
- **Anche nell'Activity** — l'ingranaggio ha il tuo fuso orario sotto **Per te, ovunque**, uguale a `/my timezone`. Sotto il fuso orario di un promemoria, la riga rimanda lì. Vedi [Le tue impostazioni](/docs/activity/#your-settings).

## 2.5.0 — Nomi al posto dei codici

Released 2026-11-23

- **Persone, ruoli e canali per nome** — **Aggiornamento in blocco** mostra `@Ava`, `@Moderatori` e `#generale` al posto dei codici di Discord; la form **Contenuto** mostra i canali per nome. Scrivi `@` e un nome per ogni ruolo, ogni canale e chiunque sia già nella lista. Aggiungi qualcuno di nuovo con **Proprietario** o **Tag**, oppure scrivi il suo codice. Un nome che TTM non conosce resta testo, tranne come proprietario: allora TTM te lo dice e non salva nulla. Vedi [Persone, ruoli e canali per nome](/docs/writing-a-list/#people-roles-and-channels-by-name).
- **Contenuto è solo il testo** — la form **Contenuto** non mostra più i tag del task, come nell'Activity: restano sul task e **Tag** li cambia. Un tag scritto nella form viene rimosso e TTM te lo dice. Vedi [Contenuto](/docs/channel-tasks/#content).
- **Date dei promemoria leggibili** — nel testo di una lista la data di un promemoria è `2026-12-08 18:00`, nel tuo fuso orario, al posto di un codice. Cambiala e salva: il promemoria si sposta. Per conservare un orario che qualcuno ti ha dato nel suo fuso, scrivi il fuso dopo la data: `2026-12-08 18:00 America/New_York`. Vedi [Promemoria nel testo](/docs/writing-a-list/#reminders-in-the-text).
- **La guida a un click** — sotto il testo di **Aggiornamento in blocco** e di `/crea-lista`, una riga dice come aggiungere qualcuno di nuovo e rimanda alla guida. Quando un nome o una data non si possono salvare, il messaggio rimanda alla parte della guida che lo spiega. Vedi [Persone, ruoli e canali per nome](/docs/writing-a-list/#people-roles-and-channels-by-name).
- **Anche nell'Activity** — **Modifica la lista** mostra i nomi e le date nel tuo fuso orario. Sotto il testo, **Modifica la lista** e **Nuova lista** hanno la stessa riga, con il link alla guida. I link ora si aprono, nel testo di un task e nei messaggi: Discord ti chiede conferma prima di portarti fuori. Vedi [Modifica la lista](/docs/activity-list/#edit-the-list).
- **I codici funzionano ancora** — un codice che scrivi o incolli viene salvato com'è e il file di Download conserva i codici, quindi i file di prima si importano come sono. Vedi [I codici dietro i nomi](/docs/writing-a-list/#the-codes-behind-the-names).

## 2.4.1 — Webhook e date, corretti

Released 2026-11-21

- **Webhook con virgolette nel testo** — un task, una variabile o un nome con virgolette, una barra rovesciata o un'andata a capo non rompe più il corpo della chiamata: TTM fa l'escape del valore, così il servizio riceve un JSON valido. Vedi [Token](/docs/config-webhook/#tokens).
- **Ogni formato di `@time` imposta il promemoria** — le date negli stili `s` e `S` di Discord, la data breve con l'ora, ora contano come data del promemoria. `S` è il primo formato del menu di `@time`: finora TTM non lo vedeva, quindi il promemoria si contava da quando salvavi e la data restava nel testo. Vedi [Promemoria nel testo](/docs/writing-a-list/#reminders-in-the-text).

## 2.4.0 — La seconda riga ti mostra la strada

Released 2026-11-20

- **Il rosso mostra solo ciò che puoi rimuovere** — con **Proprietario**, **Tag**, **Promemoria** o **Webhook** in rosso, il selettore dei task elenca solo i task che hanno un proprietario, dei tag, un promemoria o un webhook da rimuovere. Se nessuno li ha, il selettore è spento e lo dice, per esempio *Nessun proprietario da eliminare*. Ricevi anche una nota su cosa fare invece. Vedi [La seconda riga](/docs/channel-tasks/#the-second-row).
- **Lo dice anche l'Activity** — in modalità rossa, il pannello di un task senza nulla da rimuovere lo dice in alto ed **Elimina** resta spento. Vedi [Il pannello di un task](/docs/activity-list/#the-panel-of-a-task).
- **Contenuto e Promemoria dicono cosa fare dopo** — premi **Contenuto** o **Promemoria** e un messaggio visibile solo a te dice quale task scegliere nel selettore sopra i pulsanti, con un pulsante che ti riporta alla lista. Si ferma quando hai scelto un task in quel modo, su qualsiasi server. Vedi [La seconda riga](/docs/channel-tasks/#the-second-row).

## 2.3.0 — Le liste nuove si annunciano

Released 2026-11-19

- **Una lista nuova si annuncia** — quando crei, importi o cloni una lista, sotto di essa compare una notifica con un link alla lista. Menziona i proprietari dei task, così Discord li avvisa. Con il tracciamento della cronologia attivo, il thread parte con la lista. Vedi [Quando una lista viene creata](/docs/configuration/#when-a-list-is-created).
- **Una spiegazione per lista** — con i suggerimenti attivi, la prima notifica di una lista nuova spiega, una volta sola, perché TTM pubblica le notifiche e dove impostarle. Vedi [Suggerimenti](/docs/configuration/#tips).
- **`/config app` in un nuovo ordine** — i **Suggerimenti** vengono per primi, con un pulsante verde o grigio. **Comportamento** riunisce le notifiche push leggibili, il mantenimento dello stato dopo la selezione e la nuova opzione **Menziona i proprietari nelle liste nuove**, attiva di default. I promemoria ricorrenti mostrano l'emoji Premium. Vedi [/config app](/docs/configuration/).
- **Ogni task che cambia fa partire il suo webhook** — spunta l'ultimo subtask e anche il gruppo risulta completato: ora partono i webhook di entrambi. Spunta un gruppo e i suoi subtask fanno partire i loro. Le chiamate escono nell'ordine della lista e l'intera spunta conta come un solo click. Vedi [Quando parte un webhook](/docs/webhooks/#when-a-webhook-fires).
- **Riapri tutti fa partire i webhook di riapertura** — dei task che riapre, nel canale e nell'Activity. Vedi [Quando parte un webhook](/docs/webhooks/#when-a-webhook-fires).
- **Un avviso per webhook** — quando lo stesso webhook è su più task che cambiano insieme e la chiamata fallisce, ricevi un solo avviso. Vedi [Quando un webhook fallisce](/docs/webhooks/#when-a-webhook-fails).
- **I promemoria partono nel tuo fuso orario** — finché non scegli un fuso orario, la form **Quando** propone quello della tua lingua di Discord: `America/Sao_Paulo` in portoghese brasiliano, `Europe/Rome` in italiano. Lo usano anche i promemoria che scrivi nel testo di una lista, nel canale e nell'Activity. Una lingua parlata in più fusi, come l'inglese (US), mantiene il fuso del server. Vedi [Il tuo fuso orario](/docs/reminders/#your-time-zone).
- **Invita dall'Activity** — **Invita**, in alto a destra nella home e in ogni lista, apre la finestra di Discord per invitare amici o inviare l'invito a un canale. Vedi [Unisciti agli altri](/docs/activity/#join-the-others).
- **Il tuo stato su Discord mostra l'Activity** — mentre ci sei dentro, il tuo profilo dice *Pianifica i task con il team*, nella tua lingua, senza nulla sulla lista. Discord te lo chiede prima: se rifiuti, l'Activity si apre lo stesso. Vedi [Il tuo stato su Discord](/docs/activity/#your-status-on-discord).

## 2.2.0 — Prendi un task

Released 2026-11-18

- **Prendi un task da solo** — clicca **Proprietario** finché diventa blu, poi scegli un task senza scegliere nessuno: è tuo e il canale mostra chi lo ha preso. Un task che ha già un proprietario resta com'è: per sostituirlo, scegli prima te stesso nel menu. Con **Mantieni lo stato dopo la selezione** prendi un task dopo l'altro senza cliccare di nuovo **Proprietario**. Vedi [Proprietario](/docs/channel-tasks/#owner).
- **Prendi un task nell'Activity** — su un task senza proprietario, **Proprietario** si apre con il tuo nome già scelto: **Salva** lo rende tuo. Vedi [Proprietario](/docs/activity-list/#owner).
- **Chi riceve un task lo sa** — dai un task a qualcun altro o a un ruolo: la notifica nel canale lo menziona, così Discord lo avvisa. Quando prendi un task da solo, nessuno viene menzionato. Vedi [Proprietario](/docs/channel-tasks/#owner).

## 2.1.0 — Le novità nel bot

Released 2026-11-17

- **`/news`** — le ultime novità su Team Tasks Manager, nella tua lingua, in un messaggio visibile solo a te. Sotto ogni novità, **Server Discord** apre il nostro server di supporto e **Note di rilascio** apre quella versione in questa pagina. I pulsanti **Precedente** e **Successiva** vanno alle novità più vecchie e più recenti. Vedi [`/news`](/docs/commands/#news).
- **Ogni versione in `/news`** — dalla 1.0.0 in poi, ciascuna con il giorno in cui è uscita: torna indietro con **Precedente**. Vedi [`/news`](/docs/commands/#news).
- **Una riga per le novità che nessuno ha letto** — quando ci sono novità che nessuno del tuo server ha ancora aperto, l'ultima riga dei pannelli del bot lo dice finché qualcuno non apre `/news`: poi sparisce per tutti nel server. Vedi [`/news`](/docs/commands/#news).

## 2.0.1 — La modalità Activity nel Tutorial

Released 2026-11-16

- **Una lezione sulla modalità Activity** — la lista di prova del Tutorial ha sette lezioni: prima dell'ultima, spunta un task in modalità Activity, più fluida e libera dai limiti dei canali di testo. Vedi [Per iniziare](/docs/getting-started/#2-create-your-first-list).

## 2.0.0 — L'Activity

Released 2026-11-15

- **L'Activity** — una lista si apre in una finestra dentro Discord, su desktop e su dispositivi mobili. Più persone ci lavorano insieme e ognuno vede ogni modifica mentre accade. Quando l'ultima persona esce, la lista torna nel suo canale, con un riepilogo delle modifiche. Vedi [L'Activity](/docs/activity/).
- **Un nuovo primo pulsante** — **Activity** <img class="inline-ic" src="/icons/activity.png" alt="" /> porta la lista nell'Activity, nei canali di testo e nella chat dei canali vocali. Richiede il permesso di Discord *Usa Activity* sul canale. Una lista già nei tuoi canali lo riceve alla prossima modifica. Vedi [Aprire una lista nell'Activity](/docs/activity/#open-a-list-in-the-activity).
- **Clona lista è in Altro** — sopra **Download**. C'è anche quando la lista è bloccata. Lo dice anche la Guida. Vedi [Cosa c'è in Altro](/docs/the-task-list/#whats-inside-more).
- **Mentre una lista è nell'Activity** — il suo messaggio nel canale ha solo **Entra nell'Activity** e la lista non si può modificare lì. Vedi [Unisciti agli altri](/docs/activity/#join-the-others).
- **Launch** — l'**App Launcher** di Discord, o il pulsante delle Activity di una chiamata vocale, apre le liste del canale. Entra in una, porta un'altra nell'Activity, o creane una nuova. Vedi [La home del canale](/docs/activity/#the-home-of-the-channel).
- **`/config lists`** — una lista nell'Activity è segnata come *nell'Activity*. **Elimina** la rimuove per tutti; **Sigilla** prima la riporta nel canale. Vedi [Cosa resta nel canale](/docs/activity/#what-stays-in-the-channel).
- **L'offerta Founder** — per un periodo limitato prima della fine della beta, ogni server può sbloccare il badge Founder; i primi 5000 Founder che acquistano (1000 dal 22 novembre 2026) ottengono il piano annuale a 20 € invece di 36 €, IVA esclusa. Vedi [Founder](/premium/#founder).
- **Promemoria di ruolo in DM** — quando il bot non può scrivere nel canale della lista, l'avviso che accompagna il promemoria è nella lingua di chi ha scelto le persone del ruolo.

## 1.5.0 — Ricorrenza da menu

Released 2026-11-07

- **Scegli la ricorrenza dai menu** — **Modifica ricorrenza** apre una form con tre menu al posto di due campi da scrivere: **Quante volte, in tutto**, **Ogni** e **Unità** (minuti, ore o giorni). Non c'è nessun intervallo da scrivere e nessun formato da sbagliare: per quattro notifiche scegli 4. Vedi [I campi della ripetizione](/docs/reminders/#the-repetition-fields).
- **Il badge conta ogni notifica** — sulla riga del task, `↻1d ×4` ora significa quattro notifiche, una al giorno, la prima compresa. Prima `×` contava le ripetizioni dopo la prima. Una lista scritta prima di questa versione mostra il vecchio numero finché qualcuno non la cambia. Vedi [Leggere un promemoria sul task](/docs/reminders/#reading-a-reminder-on-the-task).
- **Fino a 50 volte in tutto** — con Premium un promemoria arriva al massimo 50 volte, la prima compresa. Un promemoria che ne aveva già di più le mantiene. In **Aggiornamento in blocco** la tripletta continua a contare le ripetizioni dopo la prima: al massimo 49. Vedi [Limiti noti](/docs/known-limits/#reminders).

## 1.4.0 — Tutorial, liste nei canali vocali

Released 2026-11-05

- **Un tutorial per la tua prima lista** — la spiegazione mostrata da `/crea-lista` ha un pulsante **Tutorial** accanto a **Crea la tua lista**. Trasforma la spiegazione in una lista di prova di sei lezioni nella tua lingua e ti manda la Guida, la stessa di **Altro** → **Guida**, in un messaggio visibile solo a te. La lista di prova è una lista normale: eliminala da **Altro** quando hai finito. Il pulsante compare con i Suggerimenti attivi; la card di benvenuto e `/help` rimandano a lui. Vedi [Per iniziare](/docs/getting-started/#2-create-your-first-list).
- **Le emoji dei pulsanti hanno nomi brevi** — in **Aggiornamento in blocco**, nella form del testo di un task e nel file di Download, l'emoji di un pulsante della lista, come quelle delle lezioni del Tutorial, compare come `:owner:`, `:reminder:`, `:content:` e `:more:` al posto di un codice lungo. Scrivi uno di questi nomi in un task e la lista mostra l'emoji. Vedi [Emoji dei pulsanti](/docs/writing-a-list/#button-emoji).
- **Liste nei canali vocali** — `/crea-lista` funziona nella chat di un canale vocale e **Clona lista** offre anche i canali vocali. Una lista lì fa tutto ciò che fa in un canale di testo tranne la cronologia delle attività, perché Discord non permette thread nei canali vocali: chi ne crea una riceve un breve messaggio che lo spiega. In un canale vocale TTM ha bisogno di *Connetti* al posto dei due permessi della cronologia. Vedi [Canali vocali](/docs/known-limits/#voice-channels).

## 1.3.0 — Spazio intorno ai gruppi

Released 2026-11-03

- **Spazio intorno ai gruppi** — una nuova opzione di `/config app`: disattivala e le tue liste perdono le righe vuote sopra e sotto i task che hanno dei subtask, per una lista più compatta. Attiva di default: vedi [Spazi tra i gruppi](/docs/configuration/#space-around-groups).
- **L'aspetto della lista è un unico menu a tendina** — **Suggerimenti**, **Task completati in secondo piano** e **Spazi tra i gruppi** sono ora opzioni dello stesso menu a tendina in `/config app`: spunta quelle che vuoi attive. Vedi [Suggerimenti e aspetto della lista](/docs/configuration/#list-appearance).
- **La Guida dice come spuntare un task** — la sua prima pagina e la pagina dei pulsanti dei task lo dicono in grassetto: per spuntare un task o togliere la spunta, ogni pulsante della seconda riga deve essere spento. Vedi [Il selettore della spunta](/docs/the-task-list/#the-check-selector).
- **Una lista bloccata dice chi la sta modificando** — mentre qualcuno modifica la lista, la sua ultima riga dice chi è e come sbloccarla se resta bloccata: **Altro → Sblocca lista**. Prende il posto della riga dei Suggerimenti e compare anche con i Suggerimenti nascosti. Vedi [Quando la lista è bloccata](/docs/the-task-list/#when-the-list-is-locked).

## 1.2.1 — Spunta un task

Released 2026-11-01

- **Il menu dei task dice *Spunta task*** — con ogni pulsante dei task grigio, il menu sopra i pulsanti dice a cosa serve, invece di mostrare il titolo della lista. Vedi [La seconda riga](/docs/channel-tasks/#the-second-row).
- **Le form che bloccano la lista dicono come sbloccarla** — **Aggiornamento in blocco** e la form del testo di un task finiscono con una riga: chiuderle con **Annulla** o con la ✕ lascia la lista bloccata: **Altro → Sblocca lista** la sblocca. Vedi [Ho premuto Annulla e la lista resta bloccata](/docs/troubleshooting/#i-pressed-cancel-and-the-list-stays-locked).

## 1.2.0 — Suggerimenti, barra di avanzamento, lista completata

Released 2026-11-01

- **Il menu dei task dice cosa viene dopo** — mentre un pulsante dei task è blu o rosso, il menu sopra i pulsanti mostra l'azione, come *Modifica task* o *Elimina task*: scegli lì il task. Con ogni pulsante grigio mostra di nuovo il titolo della lista. Vedi [La seconda riga](/docs/channel-tasks/#the-second-row).
- **Suggerimenti sotto ogni lista** — una piccola ultima riga rimanda a **Guida** (in **Altro**) e a questo sito. L'impostazione della legenda di `/config app` ora si chiama **Suggerimenti** e spegne sia la riga sia la spiegazione mostrata da `/crea-lista`: vedi [Suggerimenti](/docs/configuration/#tips).
- **Una barra di avanzamento** — una sottile barra verde in fondo a ogni lista, a passi del 5%. È piena solo quando ogni casella è spuntata e una lista sigillata la mantiene: vedi [Sotto la lista](/docs/the-task-list/#under-the-list).
- **Lista completata** — la spunta che completa una lista lo dice nella sua notifica e nel thread della cronologia: vedi [Modalità di notifica](/docs/configuration/#notification-mode).
- **La Guida** dice cosa fare dopo aver premuto un pulsante dei task: scegli il task dal menu.
- **Altro** inizia con **Guida** e **Download**, poi **Sigilla lista** ed **Elimina lista**. Su una lista bloccata, **Sblocca lista** resta in cima: vedi [Cosa c'è in Altro](/docs/the-task-list/#whats-inside-more).

## 1.1.0 — Card di invito, messaggio di benvenuto, suggerimenti nello stato

Released 2026-10-26

- **`/invite`** — una card pubblica con il logo, cosa fa il bot e come iniziare (la stessa presentazione della sua pagina nell'App Directory) e tre pulsanti: aggiungerlo a un altro server (la pagina di autorizzazione di Discord, direttamente dal bot), la guida, il server di supporto. Stesso nome in ogni lingua: vedi [Comandi](/docs/commands/).
- **Una card di benvenuto al primo ingresso** — una sola volta nella vita di un server, nel suo canale di sistema: cosa fa il bot, tre passi per iniziare con `/crea-lista` e `/config app`, quali permessi chiede e perché: vedi [Concetti di base](/docs/core-concepts/#the-permissions-ttm-asks-for). Mai un DM. Non viene inviato nulla quando il server non ha un canale di sistema, vi nasconde le notifiche di ingresso, o il bot non può scrivervi.
- **`/help` dice chi vede i comandi di configurazione** — la pagina Configurazione ora dice che Discord mostra i tre sottocomandi di `/config` solo a chi ha *Gestisci server* e dove un amministratore può cambiarlo.
- **`/config app` ti dice quando il fuso orario è ancora quello predefinito** — una riga sotto il fuso attuale, finché non scegli quello del tuo team.
- **Suggerimenti nello stato del bot** — la riga sotto il nome del bot cambia ogni dieci minuti.
- **Il pannello Altro** si chiude con il piè di pagina, come ogni altra pagina.

## 1.0.1 — Traduzioni riviste

Released 2026-10-24

- **Spagnolo, portoghese, francese e tedesco, rivisti per intero** — una parola per ogni funzione, un solo tono dall'inizio alla fine e i nomi dei permessi come li mostra Discord. Lo spagnolo latinoamericano ora dice *tú*, non *vos*.
- **Opzioni di `/config webhook` con gli accenti** nelle lingue che li usano, come *acción*, *événement* o *löschen*: vedi [/config webhook](/docs/config-webhook/).

## 1.0.0 — Primo rilascio pubblico

Released 2026-10-23

Il primo rilascio di Team Tasks Manager di **bitsplitters**. Cosa porta:

### Liste

- **Liste di task condivise** — scrivi una lista come testo semplice, con task, subtask e gruppi di task: vedi [Per iniziare](/docs/getting-started/#2-create-your-first-list).
- **Il pannello dei pulsanti** — una riga agisce sull'intera lista, una riga di pulsanti a tre stati su un singolo task. Vedi [La lista nel canale](/docs/the-task-list/).
- **Pulisci lista** rimuove i task completati, dopo una conferma che ti dice quanti sono e cosa se ne va con loro: vedi [Pulisci lista](/docs/the-task-list/#clean-list).
- **Riapri tutti** riporta ogni task completato da fare e può spostare i promemoria a una nuova data: vedi [Riapri tutti](/docs/the-task-list/#reopen-all).
- **Sigilla lista** conserva nel canale una lista finita come resoconto senza pulsanti; **Elimina lista** la rimuove per sempre: vedi [Cosa c'è in Altro](/docs/the-task-list/#whats-inside-more).
- **Sblocca lista** — una lista rimasta bloccata, perché qualcuno ha chiuso una form con la ✕, si sblocca da **Altro**: vedi [Quando la lista è bloccata](/docs/the-task-list/#when-the-list-is-locked).
- **Proprietari** — il proprietario di un task può essere una persona, un ruolo, o più persone che condividono un ruolo creato da TTM (Premium): vedi [Proprietari e tag](/docs/owners-and-tags/#owner-a-person-a-role-or-several-people).
- **Solo il proprietario spunta un task** — o un membro del ruolo proprietario, o chi ha *Gestisci messaggi* sul canale. Vedi [Chi può spuntare un task](/docs/core-concepts/#who-can-tick-a-task).
- **Tutti gli errori di un aggiornamento in blocco insieme** — quando un aggiornamento in blocco non si può salvare, un solo messaggio elenca tutti i problemi. Vedi [Quando il testo non si può salvare](/docs/writing-a-list/#when-the-text-cant-be-saved).
- **`/config lists`** mostra ogni lista del server e ne rigenera, sigilla o elimina più d'una alla volta: vedi [/config lists](/docs/config-lists/).

### Download e importazione

- **Download** ti invia la lista come file `.txt`, in un messaggio visibile solo a te: vedi [Cosa c'è in Altro](/docs/the-task-list/#whats-inside-more).
- **Importare una lista da un file** — l'opzione `file` di `/crea-lista` ricostruisce una lista da quel file, anche su un altro server: vedi [`/crea-lista`](/docs/commands/#create-list).

### Promemoria

- **I promemoria** raggiungono il proprietario del task nel minuto giusto. Una persona riceve un messaggio diretto, un ruolo una menzione nel canale della lista: vedi [Promemoria](/docs/reminders/).
- **I promemoria ricorrenti** (Premium) aggiungono un intervallo e delle ripetizioni; un server li attiva in `/config app`: vedi [Promemoria ripetuti](/docs/reminders/#repeating-reminders).
- **Salva solo ciò che è cambiato** — sulla card di riepilogo di un promemoria esistente, **Salva** si accende quando cambi qualcosa. Un promemoria salvato senza modifiche non invia nessuna notifica: vedi [Modificare o rimuovere](/docs/channel-tasks/#editing-or-removing).
- **I promemoria restano finché non li rimuovi** — TTM non rimuove mai un promemoria da solo. Uno le cui notifiche sono passate resta sul suo task. Uno senza proprietario o senza data, o che non si riesce a leggere, ferma il salvataggio e il messaggio indica il task da correggere: vedi [Leggere un promemoria sul task](/docs/reminders/#reading-a-reminder-on-the-task). Rimuovere il proprietario di un task il cui promemoria non è ancora partito chiede conferma, perché il promemoria se ne va con lui.

### Piani, configurazione e webhook

- **Il piano Free e Premium** — dopo la beta il piano Free ha dei limiti e Premium li toglie: vedi [Cosa sblocca Premium](/docs/premium/). Cosa costruisci durante la beta: vedi [Come funziona la beta](/docs/beta/).
- **Configurazione** — `/config app` imposta per il server notifiche, cronologia delle attività, promemoria, fuso orario e permessi: vedi [/config app](/docs/configuration/).
- **I webhook** (Premium) inviano una richiesta HTTP che definisci quando un task viene completato o riaperto. Accettano i token `{{ }}` e solo indirizzi `https` pubblici: vedi [/config webhook](/docs/config-webhook/).
- **Avvisato dove serve** — quando TTM non può scrivere nel canale di una lista, lo dice in privato a chi ha agito. Anche un webhook fallito riceve un avviso: vedi [Il bot dice che manca un permesso](/docs/troubleshooting/#the-bot-says-a-permission-is-missing) e [Quando un webhook fallisce](/docs/webhooks/#when-a-webhook-fails).
- **Interfaccia localizzata** — i testi del bot e alcuni nomi dei comandi compaiono nella tua lingua: vedi [I nomi dei comandi nella tua lingua](/docs/commands/#command-names-in-your-language). Questo sito funziona con la traduzione del tuo browser.

---

<div class="callout"><div class="callout-t">In arrivo</div>Una vista dei task solo del proprietario e una dashboard di avanzamento sono in arrivo. Questa pagina terrà traccia di ogni passo.</div>
