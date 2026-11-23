---
title: /config
description: "Il comando per chi gestisce TTM su un server: tre pannelli (impostazioni, liste e webhook) e chi può aprirli."
fonte: 2d6f9fe746d2
---

`/config` è il comando per chi si occupa di TTM sul tuo server. Ha tre sottocomandi, ognuno con il suo compito:

| Sottocomando | A cosa serve |
| :--- | :--- |
| [`/config app`](/docs/configuration/) | Come si comporta il bot qui: notifiche, cronologia, i suggerimenti per i nuovi arrivati, promemoria, fuso orario e permessi. |
| [`/config lists`](/docs/config-lists/) | Tutte le liste del server: rigenera una lista eliminata, sigilla o elimina quelle che hai finito. |
| [`/config webhook`](/docs/config-webhook/) <a class="premium-tag" href="/docs/premium/" title="Sbloccato per ogni server durante la beta">Premium</a> | Crea, visualizza, modifica o elimina i webhook che i tuoi task chiamano quando vengono completati o riaperti. |

I task in sé non si gestiscono mai da qui: tutto ciò che riguarda una singola lista sta nei suoi pulsanti, nel canale e nell'Activity. Vedi [La lista nel canale](/docs/the-task-list/) e [Lavorare su una lista nell'Activity](/docs/activity-list/).

## Chi può aprire /config

Per impostazione predefinita solo i membri con il permesso *Gestisci server* vedono `/config`. Questo vale per `/config app`, `/config lists` e `/config webhook` allo stesso modo.

Un amministratore può aprirlo ad altri ruoli o membri, oppure chiuderlo in alcuni canali. Si fa in *Impostazioni del server → Integrazioni → Team Tasks Manager*, sul comando `/config`. Discord imposta queste regole per l'intero comando, non per ogni sottocomando: chi può aprire `/config` può usare tutti i suoi pannelli.

I permessi che sincronizzi con **Carica permessi** in `/config app` valgono per le tue liste, non per `/config`. Vedi [Sincronizzare i permessi](/docs/configuration/#sync-permissions).
