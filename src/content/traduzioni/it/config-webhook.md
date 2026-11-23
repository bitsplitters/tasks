---
title: /config webhook
description: "Crea i webhook del tuo server: la chiamata HTTP, i token che può portare e gli indirizzi che TTM accetta."
fonte: d05440cda658
---

`/config webhook` crea i webhook del tuo server: la chiamata HTTP che un task invia quando viene completato o riaperto. Che cosa fa un webhook e come collegarlo a un task: vedi [Webhook](/docs/webhooks/).

Di default solo i membri con il permesso *Gestisci server* possono usare `/config webhook`, come il resto di `/config`. Vedi [Chi può aprire /config](/docs/config/#who-can-open-config).

I webhook sono **Premium**, sbloccati per ogni server durante la beta. Dopo la beta, nel piano Free i webhook che hai già restano e puoi ancora modificarli o eliminarli, ma non puoi crearne di nuovi: vedi [Cosa conserva una lista della beta](/docs/beta/#what-a-beta-list-keeps).

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

Scegliendo **crea** o **modifica** si apre una form con quattro campi:

- **Metodo HTTP** — `GET`, `POST`, `PUT` o `DELETE`.
- **Url** — un indirizzo `https` pubblico.
- **Headers** — una riga `Key: value` per riga.
- **Body** — JSON.

Un webhook è in realtà una **coppia di azioni**, una per il completamento e una per la riapertura, sotto un unico nome. L'evento sceglie una delle due. Se lo ometti, un solo comando le copre entrambe:

| Azione | Senza evento |
| :--- | :--- |
| **crea** | Imposta completamento e riapertura con la stessa configurazione. I token `{{state}}` e `{{when}}` distinguono i due eventi. |
| **visualizza** | Le stampa entrambe. |
| **modifica** | Precompila dall'azione di completamento e le sovrascrive entrambe. |
| **elimina** | Rimuove del tutto il webhook, con tutte le sue azioni. |

Ogni server può tenere fino a **25** webhook. Hai raggiunto il tetto? Elimina uno che non usi più: TTM li elenca tutti nell'errore.

Un webhook nuovo non è ancora collegato a nessun task: vedi [Associare un webhook a un task](/docs/webhooks/#associating-a-webhook-with-a-task).

## Token

Dentro l'URL, gli header e il body puoi inserire dei token `{{ }}`, che TTM sostituisce al momento dell'invio.

Nel body un token va dentro una stringa JSON, fra virgolette. TTM esegue l'escape del valore, quindi un task con virgolette o un a capo invia comunque un JSON valido.

Nell'URL ogni valore è codificato in percentuale: uno spazio diventa `%20`.

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

Per la sicurezza di tutti, TTM accetta solo **URL `https` pubblici**. Le destinazioni interne o non instradabili (`localhost`, intervalli di IP privati, indirizzi link-local) sono bloccate.

Il body deve essere un JSON valido e ogni riga di header deve rispettare il formato `Key: value`.
