---
layout: ../../layouts/Legal.astro
title: "Informativa sulla privacy"
description: "Quali dati raccoglie il bot Discord Team Tasks Manager, perché e come vengono trattati."
updated: "Ultimo aggiornamento: 26 settembre 2026"
lang: it
alt: /privacy/
---

Questa Informativa sulla privacy spiega quali dati raccoglie il bot **Team Tasks Manager** («TTM») e come li trattiamo. Si applica all'uso del bot su Discord e al nostro server community su Discord (vedi [Il nostro server community](#il-nostro-server-community)). Per i tuoi diritti ai sensi della normativa UE sulla protezione dei dati, consulta anche la nostra [pagina GDPR](/it/gdpr/).

## Chi siamo

Il titolare del trattamento è **bitsplitters** — Alessandro Vurro, Via di Dragone 478/B, 00126 Roma (RM), Italia. P. IVA 18349651002, posta elettronica certificata (PEC): alessandro.vurro@pec.it. Contatto: **info@bitsplitters.app**.

## Cosa raccogliamo

TTM conserva solo ciò che serve per far funzionare le liste di task nel tuo server:

- **Identificativi Discord** — ID di server (guild), canali e messaggi; ID di utenti e ruoli quando assegni un owner, aggiungi un tag o configuri i permessi.
- **Contenuto dei task che crei** — titoli delle liste e testo dei task, compreso tutto ciò che vi scrivi (menzioni, link, note).
- **Promemoria** — date, intervalli, ripetizioni e il fuso orario impostato per il server.
- **Il tuo fuso orario personale** — il fuso orario che scegli mentre crei un promemoria, associato al tuo ID utente Discord e riutilizzato da un server all'altro.
- **Il tuo canale di messaggi diretti** — quando sei l'owner di un task, i suoi promemoria ti arrivano per messaggio diretto, quindi il bot conserva l'ID del suo canale di messaggi diretti con te, per recapitarli con una sola richiesta a Discord. Se non accetti messaggi diretti, conserva anche il momento fino al quale non riprovare (sei ore dopo il tentativo non riuscito). Entrambi sono associati al tuo ID utente Discord, come il fuso orario; i messaggi in sé non vengono conservati.
- **Ruoli creati da TTM** — quando un task viene assegnato a più persone, TTM crea un ruolo e ne conserva l'ID, il nome che gli ha dato, gli ID utente delle persone a cui l'ha assegnato, chi l'ha richiesto e quando: per mostrare quelle persone quando il task viene modificato, e per eliminare il ruolo quando nessuna lista lo usa più.
- **Configurazione** — impostazioni di ciascun server come la modalità di notifica, la registrazione della cronologia, l'opzione push e il fuso orario.
- **Webhook** — il metodo HTTP, l'URL, gli header e il body che definisci, e la loro associazione ai task.
- **Log delle attività** — registrazioni delle azioni eseguite sulle liste (chi ha fatto cosa, e quando), quando la registrazione della cronologia è attiva.
- **Statistiche d'uso aggregate** — contatori non identificativi usati per capire l'uso complessivo del bot.

## Cosa NON raccogliamo

- **Non** leggiamo né conserviamo i tuoi normali messaggi Discord, né i tuoi messaggi diretti (il bot non usa l'accesso privilegiato al «contenuto dei messaggi»).
- **Non** raccogliamo indirizzi email, password o dati di pagamento.

## Perché li usiamo

Trattiamo questi dati esclusivamente per **fornire il servizio**: mostrare e aggiornare le tue liste, inviare promemoria e notifiche, eseguire i webhook che configuri, e mantenere e migliorare il bot (tramite statistiche aggregate).

## Condivisione

**Non** vendiamo i tuoi dati. I dati sono trattati dal nostro fornitore di infrastruttura **OVHcloud**, che ospita il bot e il suo database in **Francia (UE)**, in qualità di responsabile del trattamento per nostro conto. Il bot funziona inoltre sulla piattaforma **Discord**, quindi il tuo utilizzo è soggetto all'[Informativa sulla privacy di Discord](https://discord.com/privacy). Quando usi i webhook, TTM invia i dati che hai configurato agli **endpoint di terze parti che scegli tu** — quei servizi sono al di fuori del nostro controllo.

## Conservazione

I dati sono conservati finché il bot è presente e in uso nel tuo server.

**Quando il bot viene rimosso da un server** eliminiamo i suoi contenuti e dati operativi: le liste di task e i loro task, i tag, i promemoria e gli eventi di promemoria programmati, i webhook e le loro azioni, la cronologia delle attività, e i record dei ruoli creati da TTM — i ruoli stessi restano nel server, che da quel momento li gestisce.

**Ciò che conserviamo** è il minimo necessario per far funzionare il servizio e misurarne l'adozione: l'ID del server insieme alle impostazioni configurate per esso, le date in cui il bot è entrato e uscito, le impostazioni dei permessi dei comandi, i record degli abbonamenti ove applicabile, e contatori d'uso non identificativi. **Non viene conservato alcun contenuto dei task.**

**Log operativi** — per diagnosticare i guasti, il bot scrive log tecnici sul server su cui è in esecuzione. Al livello di log usato in produzione questi **non** contengono il testo dei tuoi task né i titoli delle tue liste; possono contenere identificativi Discord, per esempio l'ID dell'utente coinvolto in un errore. I log vengono eliminati automaticamente dopo **30 giorni**.

**Il tuo fuso orario personale e il tuo canale di messaggi diretti** — il fuso orario che imposti mentre crei un promemoria, e l'ID del tuo canale di messaggi diretti con il bot (insieme, se non accetti messaggi diretti, al momento fino al quale non riprovare), sono associati al tuo ID utente Discord e non sono legati a un singolo server, quindi rimuovere il bot da un server non li elimina. Scrivi a **info@bitsplitters.app** indicando il tuo ID utente Discord e li elimineremo.

**Puoi eliminare da solo una singola lista**, senza chiederlo a noi: il pulsante **Elimina lista** nel pannello *Altro* della lista (**Delete list** e *More* con Discord in inglese), oppure `/config lists` quando il messaggio della lista non c'è più. L'eliminazione è immediata e definitiva, e porta con sé i task, gli owner, i tag, i promemoria e la cronologia delle attività della lista.

Anche **Sigilla lista** (**Seal list**), nello stesso pannello, rimuove i dati della lista da TTM, ma lascia il suo messaggio — e il suo thread della timeline — nel canale come normali messaggi Discord, sotto il controllo del tuo server. Restano anche i ruoli che TTM ha creato per quella lista, e TTM li dimentica.

**Un ruolo creato da TTM** viene dimenticato — il suo record e le persone a cui era stato assegnato — una volta che nessuna lista lo usa più, come owner o come tag: se il ruolo è ancora come TTM lo ha lasciato (lo stesso nome, nessun permesso, lo stesso numero di membri), TTM lo elimina anche dal server; altrimenti lo lascia al tuo server. TTM dimentica inoltre i ruoli di una lista quando la sigilli, e tutti quanti quando il bot viene rimosso dal server.

Puoi richiedere la cancellazione in qualsiasi momento (vedi [GDPR](/it/gdpr/)); possiamo anche eliminare i dati prima.

## Il nostro server community

Gestiamo un server Discord per gli utenti di TTM ([come entrare](/docs/community/)). Entrarci è facoltativo, ed è distinto dall'uso del bot: il bot non ne ha bisogno.

- **Cosa vediamo.** Come in qualsiasi server Discord, i suoi amministratori e moderatori possono vedere il tuo nome utente Discord, l'avatar e il profilo come appaiono nel server, i ruoli che vi hai e i messaggi che pubblichi nei suoi canali. Non li copiamo da nessun'altra parte.
- **Moderazione e ruoli.** Il server usa **MEE6**, un bot Discord di terze parti, per assegnare ruoli (per esempio il ruolo di membro dopo che hai accettato le regole) e per aiutare nella moderazione. MEE6 tratta i dati che gli servono a tale scopo in base alla propria informativa sulla privacy.
- **Ticket di supporto.** Una richiesta di supporto può essere aperta come ticket: un canale privato visibile solo a te e allo staff, gestito da **Ticket Tool**, un altro bot Discord di terze parti. Quando un ticket viene chiuso, se ne conserva una **trascrizione** — una copia dei messaggi di quel ticket — così da poter dare seguito allo stesso problema. Le trascrizioni sono conservate per non più di **12 mesi**, e puoi chiederci di eliminare prima la tua.
- **Base giuridica.** Il nostro legittimo interesse a gestire uno spazio di supporto e di discussione per il bot, e a mantenerlo sicuro (articolo 6, paragrafo 1, lettera f, del GDPR).

Discord resta il fornitore della piattaforma, e ciò che raccoglie è disciplinato dall'[Informativa sulla privacy di Discord](https://discord.com/privacy).

## Sicurezza

Adottiamo misure tecniche e organizzative ragionevoli per proteggere i dati. Nessun metodo di trasmissione o di conservazione è completamente sicuro, quindi non possiamo garantire una sicurezza assoluta.

## Minori

TTM non è destinato a chi non ha raggiunto l'età minima richiesta da Discord.

## Modifiche

Possiamo aggiornare questa informativa; la data di «Ultimo aggiornamento» corrisponde alla versione più recente.

## Contatti

**info@bitsplitters.app**
