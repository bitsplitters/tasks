---
title: "Webhooks"
description: "Löse einen HTTP-Aufruf aus, wenn eine Aufgabe erledigt oder wieder geöffnet wird — verbinde TTM mit allem."
fonte: 1b865a3d554e
---

Mit Webhooks kann eine Aufgabe mit der Außenwelt sprechen. Verknüpfe einen mit einer Aufgabe: Wenn diese Aufgabe **erledigt** oder **wieder geöffnet** wird, sendet TTM eine HTTP-Anfrage. Sie kann an ein CI-System gehen, an einen Chat, an eine Tabellenautomatisierung oder an alles andere, was einen Aufruf annimmt.

Wer den Server verwaltet, erstellt die Webhooks mit [/config webhook](/docs/config-webhook/): die Adresse, die Methode, was der Aufruf sendet. Dann verknüpfst du sie über den Button **Webhook** mit Aufgaben.

Webhooks sind eine [Premium](/docs/premium/)-Funktion.

<div class="howto" id="how-to-do-it"><div class="howto-t">So geht's</div><div class="howto-grid"><a class="howto-go is-channel" href="/docs/channel-tasks/#webhook"><span class="howto-k"><img class="place-ic" src="/icons/posto-canale.svg" alt="" />Im Kanal</span><span class="howto-d">Webhook, in der zweiten Reihe unter der Liste: Wähle den Webhook, dann die Aufgabe.</span></a><a class="howto-go is-activity" href="/docs/activity-list/#webhook"><span class="howto-k"><img class="place-ic" src="/icons/activity.png" alt="" />In der Activity</span><span class="howto-d">Webhook, im Panel einer Aufgabe: die Webhooks des Servers nach Namen.</span></a></div></div>

## Einen Webhook mit einer Aufgabe verknüpfen

Ein neuer Webhook ist noch mit nichts verknüpft. Du verknüpfst ihn mit einer Aufgabe über **Webhook** <img class="inline-ic" src="/icons/api.png" alt="" />: in Blau zum Verknüpfen, in Rot zum Entfernen.

Ab dann löst das Erledigen oder Wiedereröffnen dieser Aufgabe den Aufruf aus.

## Wann ein Webhook auslöst

Ein Webhook löst aus, wenn seine Aufgabe **erledigt oder wieder geöffnet** wird, durch einen Haken oder durch **Alle wieder öffnen**. Im Kanal hakst du mit dem Abhak-Menü ab, dem Dropdown-Menü unter der Liste. In der Activity setzt du den Haken im Kästchen der Aufgabe.

- **Jede Aufgabe, die sich ändert**, löst ihren Webhook aus: die, die du gewählt hast, und die, die sich mit ihr ändern. Das sind Unteraufgaben, die in der Kaskade abgehakt werden, oder eine Gruppe, die durch ihre letzte Unteraufgabe erledigt wird. Eine Unteraufgabe, die schon abgehakt war, ändert sich nicht und löst deshalb nicht aus.
- Die Aufrufe gehen **nacheinander** raus, in der Reihenfolge der Liste. Das ganze Abhaken zählt als **ein Klick**, egal wie viele Aufgaben sich ändern.
- **Alle wieder öffnen** löst die Wiedereröffnungs-Webhooks der Aufgaben aus, die es wieder öffnet.
- **Sammelbearbeitung** und **Liste bearbeiten** ändern viele Aufgaben auf einmal und lösen **keinen** Webhook aus.
- **Die Liste muss in Gebrauch sein**, also einen der Plätze deines Tarifs belegen: siehe [So funktionieren die drei Plätze](/docs/premium/#how-the-three-places-work).

Eine Liste, die während der Beta erstellt wurde, ist eine Ausnahme: Ihre Aufgaben lassen sich weiter abhaken, ohne für die Grenze von drei Listen zu zählen. Solange die Liste nicht eine der drei genutzten wird, bleiben ihre Webhooks stumm, und TTM sagt es dir in einer privaten Nachricht.

## Wenn ein Webhook fehlschlägt

Wenn der Aufruf sein Ziel nicht erreicht, schreibt TTM eine Warnung in den Kanal der Liste. Sie nennt den Webhook und die Aufgabe und erklärt dann den Fehler in einem Satz. Sie sagt auch, was du prüfen sollst: die Adresse, die Header, die Methode oder den Server, den du aufrufst.

Wenn derselbe Webhook an mehreren Aufgaben hängt, die sich zusammen ändern, bekommst du eine Warnung, nicht eine pro Aufgabe.

Wenn Benachrichtigungen auf dem Server aus sind oder TTM in diesem Kanal nicht schreiben kann, erreicht die Warnung nur die Person, die die Aufgabe abgehakt hat. In der Activity erreicht die Warnung die Person, die die Aufgabe abgehakt hat, in einer Sprechblase an ihrem Kästchen.

## Der Webhook im Text

Die Verknüpfung steckt in der Aufgabe selbst, als reserviertes Token `{{wb=…}}`. Du siehst es in **Sammelbearbeitung** und in **Liste bearbeiten**: siehe [Webhooks im Text](/docs/writing-a-list/#webhooks-in-the-text).

Das Formular **Inhalt** einer einzelnen Aufgabe zeigt das Token nicht an und entfernt eines, das du dort eingibst, und sagt es dir.

Der Text einer Aufgabe kann auch **freie Variablen** enthalten: Schreib `{{schluessel=wert}}` an eine beliebige Stelle, und der Webhook kann `{{schluessel}}` verwenden. So kann ein einziger Webhook für jede Aufgabe andere Werte senden. Siehe [Tokens](/docs/config-webhook/#tokens).
