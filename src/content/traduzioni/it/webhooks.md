---
title: Webhook
description: "Fai partire una chiamata HTTP quando un task viene completato o riaperto: collega TTM a qualsiasi cosa."
fonte: 18e8cdc31be4
---

I webhook permettono a un task di parlare con il mondo esterno. Collegane uno a un task: quando quel task viene **completato** o **riaperto**, TTM invia una richiesta HTTP. Può andare a un sistema di CI, a una chat, a un'automazione di fogli di calcolo o a qualsiasi altra cosa che accetti una chiamata.

Chi gestisce il server crea i webhook con [/config webhook](/docs/config-webhook/): l'indirizzo, il metodo, che cosa invia la chiamata. Poi li colleghi ai task con il pulsante **Webhook**.

I webhook sono una funzione [Premium](/docs/premium/).

<div class="howto" id="how-to-do-it"><div class="howto-t">Come si fa</div><div class="howto-grid"><a class="howto-go is-channel" href="/docs/channel-tasks/#webhook"><span class="howto-k"><img class="place-ic" src="/icons/posto-canale.svg" alt="" />Nel canale</span><span class="howto-d">Webhook, nella seconda riga sotto la lista: scegli il webhook, poi il task.</span></a><a class="howto-go is-activity" href="/docs/activity-list/#webhook"><span class="howto-k"><img class="place-ic" src="/icons/activity.png" alt="" />Nell'Activity</span><span class="howto-d">Webhook, nel pannello di un task: i webhook del server per nome.</span></a></div></div>

## Associare un webhook a un task

Un webhook nuovo non è ancora collegato a niente. Lo colleghi a un task con **Webhook** <img class="inline-ic" src="/icons/api.png" alt="" />: in blu per collegarlo, in rosso per rimuoverlo.

Da quel momento, completare o riaprire quel task fa partire la chiamata.

## Quando parte un webhook

Un webhook parte quando il suo task viene **completato o riaperto**, con una spunta o con **Riapri tutti**. Nel canale spunti con il menu di spunta, il menu a tendina sotto la lista. Nell'Activity spunti la casella del task.

- **Ogni task che cambia** fa partire il suo webhook: quello che hai scelto e quelli che cambiano con lui. Sono i subtask spuntati a cascata o un gruppo completato dal suo ultimo subtask. Un subtask già spuntato non cambia, quindi non parte.
- Le chiamate escono **una dopo l'altra**, nell'ordine della lista. L'intera spunta conta come **un solo click**, qualunque sia il numero di task che cambia.
- **Riapri tutti** fa partire i webhook di riapertura dei task che riapre.
- **Aggiornamento in blocco** e **Modifica la lista** cambiano molti task insieme e **non** fanno partire nessun webhook.
- **La lista deve essere in uso**, cioè occupare uno dei posti del tuo piano: vedi [Come funzionano i tre posti](/docs/premium/#how-the-three-places-work).

Una lista creata durante la beta fa eccezione: i suoi task si possono comunque spuntare senza un posto. I loro webhook restano muti finché la lista non ne prende uno e TTM te lo dice in privato.

## Quando un webhook fallisce

Se la chiamata non raggiunge la destinazione, TTM scrive un avviso nel canale della lista. Nomina il webhook e il task, poi spiega l'errore in una frase. Dice anche che cosa controllare: l'indirizzo, gli header, il metodo o il server che stai chiamando.

Quando lo stesso webhook è su più task che cambiano insieme, ricevi un solo avviso e non uno per task.

Se le notifiche sono spente sul server o TTM non può scrivere in quel canale, l'avviso raggiunge solo chi ha spuntato il task. Nell'Activity l'avviso raggiunge chi ha spuntato il task, in un fumetto sulla sua casella.

## Il webhook nel testo

Il collegamento sta nel task stesso, come token riservato `{{wb=…}}`. Lo vedi in **Aggiornamento in blocco** e in **Modifica la lista**: vedi [I webhook nel testo](/docs/writing-a-list/#webhooks-in-the-text).

La form **Contenuto** di un singolo task non mostra il token e ne rimuove uno che scrivi lì, avvisandoti.

Il testo di un task può portare anche delle **variabili libere**: scrivi `{{chiave=valore}}` in un punto qualsiasi e il webhook può usare `{{chiave}}`. Così un solo webhook può inviare valori diversi per ogni task. Vedi [Token](/docs/config-webhook/#tokens).
