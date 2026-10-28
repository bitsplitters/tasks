---
layout: ../../layouts/Legal.astro
title: "Informativa sulla privacy"
description: "Quali dati raccoglie il bot Discord Team Tasks Manager, perché e come vengono trattati."
updated: "Ultimo aggiornamento: 28 ottobre 2026"
lang: it
alt: /privacy/
---

Questa Informativa sulla privacy spiega quali dati raccoglie il bot **Team Tasks Manager** («TTM») e come li trattiamo. Si applica all'uso del bot su Discord, al nostro server community su Discord (vedi [Il nostro server community](#il-nostro-server-community)) e ai nostri siti web (vedi [I nostri siti web](#i-nostri-siti-web)). Per i tuoi diritti ai sensi della normativa UE sulla protezione dei dati, consulta anche la nostra [pagina GDPR](/it/gdpr/).

## Chi siamo

Il titolare del trattamento è **bitsplitters** — Alessandro Vurro, Via di Dragone 478/B, 00126 Roma (RM), Italia. P. IVA 18349651002, posta elettronica certificata (PEC): alessandro.vurro@pec.it. Contatto: **info@bitsplitters.app**.

## Cosa raccogliamo

TTM conserva solo ciò che serve per far funzionare le liste di task nel tuo server:

- **Identificativi Discord** — ID di server (guild), canali e messaggi; ID di utenti e ruoli quando assegni un owner, aggiungi un tag o configuri i permessi.
- **Contenuto dei task che crei** — titoli delle liste e testo dei task, compreso tutto ciò che vi scrivi (menzioni, link, note).
- **Promemoria** — date, intervalli, ripetizioni e il fuso orario impostato per il server.
- **Il tuo fuso orario personale** — il fuso orario che scrivi al posto di quello proposto quando scegli una data: in un promemoria, in **Clona lista** con i promemoria, o nella nuova data di **Riapri tutti**. È associato al tuo ID utente Discord e riutilizzato da un server all'altro. Se lasci quello proposto, non viene salvato nulla.
- **Il tuo canale di messaggi diretti** — quando sei l'owner di un task, i suoi promemoria ti arrivano per messaggio diretto, quindi il bot conserva l'ID del suo canale di messaggi diretti con te, per recapitarli con una sola richiesta a Discord. Se non accetti messaggi diretti, conserva anche il momento fino al quale non riprovare (sei ore dopo il tentativo non riuscito). Entrambi sono associati al tuo ID utente Discord, come il fuso orario; i messaggi in sé non vengono conservati.
- **Ruoli creati da TTM** — quando un task viene assegnato a più persone, TTM crea un ruolo e ne conserva l'ID, il nome che gli ha dato, gli ID utente delle persone a cui l'ha assegnato, chi l'ha richiesto e quando: per mostrare quelle persone quando il task viene modificato, e per eliminare il ruolo quando nessuna lista lo usa più.
- **Configurazione** — impostazioni di ciascun server come la modalità di notifica, la registrazione della cronologia, l'opzione push e il fuso orario.
- **Webhook** — il metodo HTTP, l'URL, gli header e il body che definisci, e la loro associazione ai task.
- **Log delle attività** — registrazioni delle azioni eseguite sulle liste (chi ha fatto cosa, e quando), quando la registrazione della cronologia è attiva.
- **Statistiche d'uso aggregate** — contatori per server: quante volte si usa ogni funzione e quando è stata usata l'ultima volta. Inoltre, ogni giorno, i totali di liste, task, promemoria e webhook e il numero di membri del server. Non contano mai i singoli utenti.

## Cosa NON raccogliamo

- **Non** leggiamo né conserviamo i tuoi normali messaggi Discord, né i tuoi messaggi diretti. Il bot non usa nessuno degli accessi privilegiati di Discord: né il contenuto dei messaggi, né l'elenco dei membri, né la presenza.
- **Non** raccogliamo indirizzi email, password o dati di pagamento tramite il bot. Se ci scrivi per email, usiamo il tuo indirizzo solo per risponderti.

## Perché li usiamo

Trattiamo questi dati esclusivamente per **fornire il servizio**: mostrare e aggiornare le tue liste, inviare promemoria e notifiche, eseguire i webhook che configuri, e mantenere e migliorare il bot (tramite statistiche aggregate).

## Condivisione

**Non** vendiamo i tuoi dati. I dati sono trattati dal nostro fornitore di infrastruttura **OVHcloud**, che ospita il bot e il suo database in **Francia (UE)**, in qualità di responsabile del trattamento per nostro conto. Il bot funziona inoltre sulla piattaforma **Discord**, quindi il tuo utilizzo è soggetto all'[Informativa sulla privacy di Discord](https://discord.com/privacy). Discord ha sede negli Stati Uniti: vedi [Trasferimenti internazionali](/it/gdpr/#trasferimenti-internazionali). Quando usi i webhook, TTM invia i dati che hai configurato agli **endpoint di terze parti che scegli tu** — quei servizi sono al di fuori del nostro controllo.

**Segnalazioni di errore.** Quando qualcosa non va come previsto, il bot invia una segnalazione a un canale privato del nostro server Discord, visibile solo a noi. Una segnalazione contiene gli ID del server e degli utenti coinvolti e i dettagli tecnici del guasto. Può contenere un frammento di ciò che si stava elaborando, come un pezzo di un task. Eliminiamo queste segnalazioni una volta risolto il guasto, e comunque entro 12 mesi.

## Conservazione

I dati sono conservati finché il bot è presente e in uso nel tuo server.

**Quando il bot viene rimosso da un server** eliminiamo i suoi contenuti e dati operativi: le liste di task e i loro task, i tag, i promemoria e gli eventi di promemoria programmati, i webhook e le loro azioni, la cronologia delle attività, e i record dei ruoli creati da TTM — i ruoli stessi restano nel server, che da quel momento li gestisce.

**Ciò che conserviamo** è il minimo necessario per far funzionare il servizio e misurarne l'adozione: l'ID del server insieme alle impostazioni configurate per esso, le date in cui il bot è entrato e uscito, le impostazioni dei permessi dei comandi, i record degli abbonamenti ove applicabile, e contatori d'uso non identificativi. **Non viene conservato alcun contenuto dei task.**

**Log operativi** — per diagnosticare i guasti, il bot scrive log tecnici sul server su cui è in esecuzione. Al livello di log usato in produzione questi **non** contengono il testo dei tuoi task né i titoli delle tue liste; possono contenere identificativi Discord, per esempio l'ID dell'utente coinvolto in un errore. I log vengono eliminati automaticamente dopo **30 giorni**.

**Backup** — eseguiamo ogni giorno un backup del database, per ripristinare il servizio dopo un guasto. I backup sono conservati per **14 giorni**, nell'UE. I dati che elimini, o che eliminiamo quando il bot lascia un server, possono quindi sopravvivere in un backup fino a 14 giorni; poi spariscono per sempre. Un backup si usa solo per ripristinare il servizio.

**Il tuo fuso orario personale e il tuo canale di messaggi diretti** — il fuso orario che imposti al posto di quello proposto, e l'ID del tuo canale di messaggi diretti con il bot (insieme, se non accetti messaggi diretti, al momento fino al quale non riprovare), sono associati al tuo ID utente Discord e non sono legati a un singolo server, quindi rimuovere il bot da un server non li elimina. Scrivi a **info@bitsplitters.app** indicando il tuo ID utente Discord e li elimineremo.

**Puoi eliminare da solo una singola lista**, senza chiederlo a noi: il pulsante **Elimina lista** nel pannello *Altro* della lista (**Delete list** e *More* con Discord in inglese), oppure `/config lists` quando il messaggio della lista non c'è più. L'eliminazione è immediata e definitiva, e porta con sé i task, gli owner, i tag, i promemoria e la cronologia delle attività della lista.

Anche **Sigilla lista** (**Seal list**), nello stesso pannello, rimuove i dati della lista da TTM, ma lascia il suo messaggio — e il suo thread della timeline — nel canale come normali messaggi Discord, sotto il controllo del tuo server. Restano anche i ruoli che TTM ha creato per quella lista, e TTM li dimentica.

**Un ruolo creato da TTM** viene dimenticato — il suo record e le persone a cui era stato assegnato — una volta che nessuna lista lo usa più, come owner o come tag: se il ruolo è ancora come TTM lo ha lasciato (lo stesso nome, nessun permesso, lo stesso numero di membri), TTM lo elimina anche dal server; altrimenti lo lascia al tuo server. TTM dimentica inoltre i ruoli di una lista quando la sigilli, e tutti quanti quando il bot viene rimosso dal server.

Puoi richiedere la cancellazione in qualsiasi momento (vedi [GDPR](/it/gdpr/)); possiamo anche eliminare i dati prima.

## Il nostro server community

Gestiamo un server Discord per gli utenti di TTM ([come entrare](/docs/community/)). Entrarci è facoltativo, ed è distinto dall'uso del bot: il bot non ne ha bisogno.

- **Cosa vediamo.** Come in qualsiasi server Discord, i suoi amministratori e moderatori possono vedere il tuo nome utente Discord, l'avatar e il profilo come appaiono nel server, i ruoli che vi hai e i messaggi che pubblichi nei suoi canali. Non li copiamo da nessun'altra parte, salvo le trascrizioni dei ticket descritte qui sotto.
- **Moderazione, ruoli e ticket.** Il server usa **MEE6**, un bot Discord di terze parti, per assegnare ruoli (per esempio il ruolo di membro dopo che hai accettato le regole), per aiutare nella moderazione e per gestire i ticket. MEE6 tratta i dati che gli servono a questi scopi in base alla [propria informativa sulla privacy](https://mee6.xyz/privacy.html).
- **Ticket.** Le candidature ad ambassador, le proposte di collaborazione e le richieste di supporto che hanno bisogno di riservatezza passano dai ticket: un canale privato visibile solo a te e allo staff. Quando un ticket viene chiuso, MEE6 ne fa una **trascrizione** — una copia dei messaggi di quel ticket, con i nomi e gli ID Discord di chi li ha scritti — così da poter dare seguito alla stessa richiesta. MEE6 la conserva sul proprio sito, dove si apre solo dopo l'accesso con Discord, e ne pubblica il link in un canale che vede solo lo staff. Quel link, e ogni copia che abbiamo scaricato, li eliminiamo entro **12 mesi**, o prima se ce lo chiedi. Per quanto tempo MEE6 conservi la sua copia lo decide MEE6: se vuoi che la elimini, scrivicelo e lo chiederemo a MEE6.
- **Base giuridica.** Il nostro legittimo interesse a gestire uno spazio di supporto e di discussione per il bot, a esaminare le candidature e le proposte che riceviamo lì, e a mantenerlo sicuro (articolo 6, paragrafo 1, lettera f, del GDPR).

Discord resta il fornitore della piattaforma, e ciò che raccoglie è disciplinato dall'[Informativa sulla privacy di Discord](https://discord.com/privacy).

## I nostri siti web

I nostri siti web — bitsplitters.app, tasks.bitsplitters.app e timezones.bitsplitters.app — non usano cookie e non salvano nulla nel tuo browser.

- **Hosting.** Sono ospitati su **GitHub Pages**, un servizio di GitHub, Inc. (Stati Uniti). Come qualsiasi server web, GitHub registra dati tecnici di ogni visita, compreso il tuo indirizzo IP, per la sicurezza e per far funzionare il servizio. Vedi l'[Informativa sulla privacy di GitHub](https://docs.github.com/en/site-policy/privacy-policies/github-general-privacy-statement).
- **Statistiche delle visite.** Per contare le visite e sapere quali siti ci mandano lettori, le nostre pagine caricano uno script di **Cloudflare Web Analytics**, un servizio di Cloudflare, Inc. (Stati Uniti). Per ogni pagina vista registra la pagina, il sito da cui arrivi, il paese, il browser, il sistema operativo e il tipo di dispositivo, e quanto ci ha messo la pagina a caricarsi. Non usa cookie, non salva nulla nel tuo browser e non ti identifica: noi vediamo solo totali, mai i singoli visitatori. Cloudflare riceve il tuo indirizzo IP con la richiesta, come qualsiasi server web, e non lo usa per riconoscerti. Vedi l'[informativa sulla privacy di Cloudflare](https://www.cloudflare.com/it-it/privacypolicy/).
- **La mappa dei fusi orari.** La mappa di timezones.bitsplitters.app carica le sue immagini dai server di **OpenStreetMap**, che ricevono quindi il tuo indirizzo IP. Vedi l'[informativa sulla privacy della OpenStreetMap Foundation](https://osmfoundation.org/wiki/Privacy_Policy).
- **Base giuridica.** Il nostro legittimo interesse a pubblicare la documentazione e gli strumenti che accompagnano il bot, e a sapere in forma aggregata quante persone li leggono e da dove arrivano (articolo 6, paragrafo 1, lettera f, del GDPR).

## Sicurezza

Adottiamo misure tecniche e organizzative ragionevoli per proteggere i dati. Nessun metodo di trasmissione o di conservazione è completamente sicuro, quindi non possiamo garantire una sicurezza assoluta.

## Minori

TTM non è destinato a chi non ha raggiunto l'età minima richiesta da Discord.

## Modifiche

Possiamo aggiornare questa informativa; la data di «Ultimo aggiornamento» corrisponde alla versione più recente.

## Contatti

**info@bitsplitters.app**
