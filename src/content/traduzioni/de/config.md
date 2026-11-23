---
title: "/config"
description: "Der Befehl für alle, die TTM auf einem Server betreuen — drei Panels für Einstellungen, Listen und Webhooks und wer sie öffnen kann."
fonte: 2d6f9fe746d2
---

`/config` ist der Befehl für alle, die sich auf deinem Server um TTM kümmern. Er hat drei Unterbefehle, jeder mit seiner eigenen Aufgabe:

| Unterbefehl | Wofür er da ist |
| :--- | :--- |
| [`/config app`](/docs/configuration/) | Wie sich der Bot hier verhält: Benachrichtigungen, Verlauf, die Tipps für Neue, Erinnerungen, Zeitzone und Berechtigungen. |
| [`/config lists`](/docs/config-lists/) | Alle Listen des Servers: eine gelöschte neu erstellen, die fertigen versiegeln oder löschen. |
| [`/config webhook`](/docs/config-webhook/) <a class="premium-tag" href="/docs/premium/" title="Während der Beta für jeden Server freigeschaltet">Premium</a> | Die Webhooks erstellen, ansehen, bearbeiten oder löschen, die deine Aufgaben aufrufen, wenn sie erledigt oder wieder geöffnet werden. |

Die Aufgaben selbst werden nie hier verwaltet: Alles zu einer einzelnen Liste steckt in ihren Buttons, im Kanal und in der Activity. Siehe [Die Liste im Kanal](/docs/the-task-list/) und [An einer Liste in der Activity arbeiten](/docs/activity-list/).

## Wer /config öffnen kann

Standardmäßig sehen nur Mitglieder mit der Berechtigung *Server verwalten* `/config`. Das gilt für `/config app`, `/config lists` und `/config webhook` gleichermaßen.

Ein Admin kann ihn für andere Rollen oder Mitglieder öffnen oder in einigen Kanälen sperren. Das geht unter *Servereinstellungen → Integrationen → Team Tasks Manager*, beim Befehl `/config`. Discord legt diese Regeln für den ganzen Befehl fest, nicht für jeden Unterbefehl: Wer `/config` öffnen kann, kann alle seine Panels nutzen.

Die Berechtigungen, die du mit **Berechtigungen laden** in `/config app` synchronisierst, gelten für deine Listen, nicht für `/config`. Siehe [Berechtigungen synchronisieren](/docs/configuration/#sync-permissions).
