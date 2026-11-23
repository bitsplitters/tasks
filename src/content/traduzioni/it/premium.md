---
title: Cosa sblocca Premium
description: "Cosa aggiunge il piano a pagamento al Free e cosa cambia ogni limite, giorno per giorno."
fonte: a30e7ff6132c
---

TTM è **completamente sbloccato durante la beta**, quindi per ora niente di questa pagina si applica. Descrive il piano Free e cosa toglierà Premium quando la beta finirà. Cosa succede al tuo server quando la beta finisce è in [Come funziona la beta](/docs/beta/).

<div class="callout"><div class="callout-t">Piani e prezzi</div>I due piani a confronto, i prezzi e il self-hosting sono nella <a href="/premium/">pagina Premium</a>. I prezzi sono al netto dell'IVA: <a href="/premium/#vat">perché</a>.</div>

## Cosa cambia ognuno, in pratica

Oltre un limite del Free non puoi aggiungere altro, ma niente di ciò che c'è già viene eliminato o nascosto: vedi [Come funziona la beta](/docs/beta/#when-the-beta-ends).

\* **Un limite imposto da Discord, non da noi.** È lo stesso su ogni piano: Premium ti permette di *raggiungerlo*, mai di superarlo. Vedi [Limiti noti](/docs/known-limits/).

**Liste in uso — 3 → illimitate.** Tre liste bastano a un piccolo team: una lista di cose da fare, una dei bug, una checklist per il prossimo evento. Raggiungi il limite quando ogni progetto, squadra o riunione vuole la sua lista.

**Task per lista — 20 → 50 \*.** Venti task fanno una checklist di lavoro e cinquanta un backlog. Nessun piano va oltre 50, perché un messaggio di Discord può contenere solo pochi menu: vedi [Limiti noti](/docs/known-limits/).

**Promemoria attivi — 10 → illimitati.** Il limite conta i promemoria *in attesa nello stesso momento*, non i promemoria al giorno. Un promemoria smette di contare dopo il suo ultimo avviso o quando lo togli e uno ripetuto conta una volta sola.

**Ripetizioni per promemoria — solo singolo → fino a 50.** Sul piano Free ogni promemoria scatta una volta. Su Premium un promemoria può arrivare fino a 50 volte in tutto, la prima compresa, se un admin attiva **Promemoria ricorrenti** in [Configurazione](/docs/configuration/#recurring-reminders). I promemoria ricorrenti che hai già continuano a scattare sul piano Free: vedi [Promemoria](/docs/reminders/#repeating-reminders).

**Persone per proprietario — 1 → fino a 25 \*.** Sul piano Free il proprietario di un task è una persona o un ruolo. Su Premium può essere fino a 25 persone, che condividono un ruolo creato da TTM: vedi [I ruoli che crea TTM](/docs/owners-and-tags/#the-roles-ttm-creates). È Premium perché ogni persona costa una richiesta a Discord. Discord limita le richieste che un bot può inviare e tutti i suoi server condividono quel limite.

**Webhook — nessuno nuovo → fino a 25 \*.** Un webhook permette a un task completato di inviare una chiamata HTTP a qualsiasi cosa gestisci tu: un deploy, un foglio di calcolo, un sistema di ticket. È la cosa principale che Premium aggiunge. Vedi [Webhook](/docs/webhooks/). Sul piano Free non puoi creare webhook nuovi, ma quelli creati durante la beta restano: vedi [Cosa conserva una lista della beta](/docs/beta/#what-a-beta-list-keeps).

## Come funzionano i tre posti

Sul piano Free un server ha tre posti per le liste. Una lista che ne occupa uno è **in uso** e `/config lists` la segna così.

- **Una lista occupa un posto la prima volta che qualcuno ci lavora** e lo tiene. Lavorare su una lista vuol dire una qualsiasi di queste cose:
  - spuntare o togliere la spunta a un task;
  - un aggiornamento in blocco, oppure modificare o togliere un singolo task;
  - **Pulisci lista** o **Riapri tutti**;
  - impostare un proprietario, un tag o un promemoria;
  - collegare un webhook.
- **Una lista nuova occupa un posto** quando la crei, la cloni o la importi. Rigenerare una lista conta come lavorarci.
- **Un posto non scade.** Solo sigillare o eliminare la lista lo libera.
- **Una lista che non è in uso resta nel canale com'è.** Puoi ancora scaricarla, sigillarla o eliminarla.

Le liste create durante la beta fanno eccezione: i loro task si possono ancora spuntare senza un posto. Vedi [Cosa conserva una lista della beta](/docs/beta/#what-a-beta-list-keeps).

<div class="callout"><div class="callout-t">Nessun limite conta quanto spesso usi qualcosa</div>Ogni limite conta quante cose hai, mai quanto spesso le usi. Un webhook che scatta mille volte a settimana conta comunque come un webhook.</div>

### Cosa succede a una quarta lista

Quando tutti e tre i posti sono occupati, TTM rifiuta di creare, clonare o importare un'altra lista. Rifiuta anche di lavorare su una lista che non è in uso. Il bot ti dice come liberare un posto:

- **Sigilla lista**, nel pannello **Altro** <img class="inline-ic" src="/icons/other.png" alt="" /> di una lista con cui hai finito. La lista resta nel canale come resoconto, senza pulsanti.
- **Elimina lista**, nello stesso pannello. Toglie la lista definitivamente.
- [`/config lists`](/docs/config-lists/), che segna le liste in uso e può sigillarne o eliminarne diverse insieme.

## Domande?

Entra nel [Discord](/docs/community/) e chiedici qualsiasi cosa su prezzi, limiti o self-hosting.
