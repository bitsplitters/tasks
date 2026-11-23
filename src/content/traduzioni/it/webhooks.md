---
title: /config webhook
description: "Fai partire una chiamata HTTP quando un task viene completato o riaperto: collega TTM a qualsiasi cosa."
fonte: 17d650dea981
---

I webhook permettono a un task di parlare con il mondo esterno. Associane uno a un task: quando quel task viene **completato** o **riaperto**, TTM invia una richiesta HTTP che hai definito tu. Può andare a un sistema di CI, a una chat, a un'automazione di fogli di calcolo o a qualsiasi altra cosa che accetti una chiamata.

I webhook sono una funzione **Premium**, sbloccata per ogni server durante la beta. Dopo la beta, nel piano Free i webhook che hai già restano e puoi ancora modificarli o eliminarli, ma non puoi crearne di nuovi: vedi [Cosa sblocca Premium](/docs/premium/).

Di default solo i membri con il permesso *Gestire il server* possono usare `/config webhook`, come il resto di `/config`. Vedi [Chi può aprire /config](/docs/config/#who-can-open-config).

## Creare un webhook

```
/config webhook
```

Il comando ha alcune opzioni:

| Opzione | Obbligatoria? | Valori | Note |
| :--- | :--- | :--- | :--- |
| **azione** | Obbligatoria | visualizza · crea · modifica · elimina | Che cosa vuoi fare. |
| **webhook** | Obbligatoria | un nome | Il webhook su cui agire, fino a 96 caratteri. |
| **evento** | Facoltativa | completamento · riapertura | Omettila per agire su **entrambe** le direzioni insieme. |

Scegliendo **crea** (o **modifica**) si apre una form con quattro campi:

- **Metodo HTTP** — `GET`, `POST`, `PUT` o `DELETE`.
- **Url** — un indirizzo `https` pubblico.
- **Headers** — una riga `Key: value` per riga.
- **Body** — JSON.

Un webhook è in realtà una **coppia di azioni**, una per il completamento e una per la riapertura, sotto un unico nome. È questo che sceglie l'evento.

<div class="callout"><div class="callout-t">L'evento è facoltativo di proposito</div>Omettilo e un solo comando copre entrambe le direzioni. <strong>Crea</strong> imposta completamento e riapertura con la stessa configurazione: i token <code>{{state}}</code> e <code>{{when}}</code> distinguono i due eventi. <strong>Visualizza</strong> stampa entrambe, ed <strong>elimina</strong> rimuove del tutto il webhook, con tutte le sue azioni. <strong>Modifica</strong> precompila dall'azione di completamento e sovrascrive entrambe.</div>

I webhook sono una funzione [Premium](/docs/premium/) e durante la beta sono sbloccati per tutti. Nel piano Free non puoi crearne di nuovi, ma restano quelli creati durante la beta: vedi [Cosa conserva una lista della beta](/docs/beta/#what-a-beta-list-keeps). Ogni server può tenere fino a **25** webhook. Hai raggiunto il tetto? Elimina uno che non usi più: TTM li elenca tutti nell'errore.

## Token

Dentro l'URL, gli header e il body puoi inserire dei token `{{ }}` che TTM sostituisce al momento dell'invio.

Nel body un token va dentro una stringa JSON, fra virgolette. TTM esegue l'escape del valore, quindi un task con virgolette o un a capo invia comunque un JSON valido. Nell'URL ogni valore è codificato in percentuale: uno spazio diventa `%20`.

**Token integrati**

| Token | Valore |
| :--- | :--- |
| `{{task}}` | Il testo del task |
| `{{state}}` | Lo stato: completato o riaperto |
| `{{list}}` | Il titolo della lista |
| `{{user}}` / `{{user_id}}` | Nome / id di chi ha cambiato lo stato del task |
| `{{when}}` | Data e ora (ISO-8601) |
| `{{guild}}` / `{{guild_id}}` | Nome / id del server |
| `{{channel}}` / `{{channel_id}}` | Nome / id del canale |

**Variabili libere** — definisci `{{chiave=valore}}` ovunque nel testo di un task e richiama `{{chiave}}` nel webhook. I token sconosciuti diventano semplicemente una stringa vuota.

## Associare un webhook a un task

Creare un webhook non lo collega ancora a niente: lo colleghi a un task con **Webhook** <img class="inline-ic" src="/icons/api.png" alt="" />, in blu per collegarlo e in rosso per rimuoverlo. Da quel momento, completare o riaprire quel task fa partire la chiamata. Dove premere: [Come si fa](#how-to-do-it), in fondo.

Il collegamento è salvato **nel task stesso**, come token riservato `{{wb=…}}`, che vedi in **Aggiornamento in blocco** e in **Modifica la lista**: vedi [I webhook nel testo](/docs/writing-a-list/#webhooks-in-the-text). La form **Contenuto** di un singolo task non mostra il token e ne rimuove uno che scrivi lì, avvisandoti.

## Quando parte un webhook

Un webhook parte quando il suo task viene **completato o riaperto**, con una spunta o con **Riapri tutti**. Spunti nel canale con il menu di spunta, il menu a tendina sotto la lista e nell'Activity con la casella del task. In dettaglio:

- **ogni task che cambia** fa partire il suo webhook: quello che hai scelto e quelli che cambiano con lui, subtask spuntati a cascata o un gruppo completato dal suo ultimo subtask. Un subtask già spuntato non cambia, quindi non parte;
- le chiamate escono **una dopo l'altra**, nell'ordine della lista e l'intera spunta conta come **un solo clic**, qualunque sia il numero di task che cambia;
- **Riapri tutti** fa partire i webhook di riapertura dei task che riapre. **Aggiornamento in blocco** e **Modifica la lista** cambiano molti task insieme e **non** fanno partire nessun webhook;
- **la lista deve essere in uso**, cioè occupare uno dei posti del tuo piano. Come una lista prende un posto: vedi [Come funzionano i tre posti](/docs/premium/#how-the-three-places-work). Una lista creata durante la beta fa eccezione: i suoi task si possono comunque spuntare senza un posto. I loro webhook restano muti finché la lista non ne prende uno. TTM te lo dice in privato.

## Quando un webhook fallisce

Se la chiamata non raggiunge la destinazione, TTM scrive un avviso nel canale della lista. Nomina il webhook e il task, poi spiega l'errore in una frase. Dice anche che cosa controllare: l'indirizzo, gli header, il metodo o il server che stai chiamando. Quando lo stesso webhook è su più task che cambiano insieme, ricevi un solo avviso e non uno per task.

Se le notifiche sono spente sul server o TTM non può scrivere in quel canale, l'avviso raggiunge solo chi ha spuntato il task.

Nell'Activity l'avviso raggiunge chi ha spuntato il task, in un fumetto sulla sua casella.

## Esempio

Una `POST` che annuncia un completamento:

```
Metodo:  POST
URL:     https://example.com/hooks/ttm
Headers: Content-Type: application/json
Body:
{
  "text": "{{user}} {{state}} \"{{task}}\" in {{list}}",
  "at": "{{when}}"
}
```

## Sicurezza

Per la sicurezza di tutti, TTM accetta solo **URL `https` pubblici**. Le destinazioni interne o non instradabili (`localhost`, intervalli di IP privati, indirizzi link-local) sono bloccate. Il body deve essere un JSON valido e ogni riga di header deve rispettare il formato `Key: value`.

<div class="howto" id="how-to-do-it"><div class="howto-t">Come si fa</div><div class="howto-grid"><a class="howto-go is-channel" href="/docs/channel-tasks/#webhook"><span class="howto-k"><img class="place-ic" src="/icons/posto-canale.svg" alt="" />Nel canale</span><span class="howto-d">Webhook, nella seconda riga sotto la lista: scegli il webhook, poi il task.</span></a><a class="howto-go is-activity" href="/docs/activity-list/#webhook"><span class="howto-k"><img class="place-ic" src="/icons/activity.png" alt="" />Nell'Activity</span><span class="howto-d">Webhook, nel pannello di un task: i webhook del server per nome.</span></a></div></div>
