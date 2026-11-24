---
title: "/config app"
description: "Passe Benachrichtigungen, Verlauf, Erinnerungen, Zeitzone und Berechtigungen mit /config app an."
fonte: cc3b2bd36302
---

Führe den Befehl aus:

```
/config app
```

TTM öffnet ein privates Panel mit einer Übersicht deiner aktuellen Einstellungen: zuerst den Button **Tipps**, dann fünf Dropdowns und zwei weitere Buttons. Nichts hier ist endgültig: Ändere es, sooft sich die Bedürfnisse deines Teams ändern.

Standardmäßig können nur Mitglieder mit der Berechtigung *Server verwalten* `/config app` benutzen, wie den Rest von `/config`. Siehe [Wer /config öffnen kann](/docs/config/#who-can-open-config).

Die Einstellungen gelten für die Listen im Kanal und in der [Activity](/docs/activity/) gleichermaßen. Wo eine nur an einer Stelle zählt oder an beiden anders funktioniert, sagt es ihr Abschnitt.

## Tipps

Die erste Gruppe des Panels ist ein Button, der zeigt, ob die Tipps an sind: grün mit **An**, wenn sie es sind, grau mit **Aus**, wenn nicht. Klicke ihn, um sie umzuschalten. Tipps gelten im Kanal und in der Activity.

Tipps sind Hilfe für alle, die neu bei TTM sind, an vier Stellen:

- Wenn jemand `/liste-erstellen` ausführt, eine kurze Erklärung, wie man eine Liste schreibt, und eine Einladung, den Activity-Modus auszuprobieren, mit den Buttons **Erstelle deine Liste** und **Tutorial**: Die neue Liste tritt an die Stelle der Erklärung;
- unter jeder Liste im Kanal eine kleine Zeile, die auf die Anleitung in Discord verweist: *Du weißt nicht, was die Buttons machen? Mehr → Anleitung*, mit einem Link zu [Die Liste im Kanal](/docs/the-task-list/);
- unter der Liste in der Activity eine Zeile, die sagt, wo man tippt: *Du weißt nicht, wo du anfangen sollst? Tippe auf ein Kästchen, um eine Aufgabe abzuhaken, und auf ihren Text für alles andere.* Siehe [An einer Liste in der Activity arbeiten](/docs/activity-list/);
- in einer neuen Liste endet die erste Benachrichtigung im Kanal mit einer kurzen Erklärung: warum TTM Benachrichtigungen postet, was der Verlaufs-Thread ist und wo man sie einrichtet. Sie erscheint einmal pro Liste: Siehe [Wenn eine Liste erstellt wird](#when-a-list-is-created).

Standardmäßig an: praktisch, solange das Team die Buttons lernt, leicht auszuschalten, wenn alle sie kennen. Bei ausgeblendeten Tipps:

- öffnet `/liste-erstellen` gleich das Erstellungsformular, ohne den Button **Tutorial**: Siehe [Erste Schritte](/docs/getting-started/#2-create-your-first-list);
- enden Listen ohne die Hilfezeile;
- posten neue Listen ihre erste Benachrichtigung ohne die Erklärung.

Eine Liste übernimmt die Änderung bei ihrer nächsten Aktualisierung. In jedem Fall bleibt der [Fortschrittsbalken](/docs/the-task-list/#under-the-list) und eine gesperrte Liste endet weiter mit der Zeile, die sagt, wer sie bearbeitet: Siehe [Wenn die Liste gesperrt ist](/docs/the-task-list/#when-the-list-is-locked).

## Benachrichtigungsmodus

Steuert, wie viele Benachrichtigungen der Bot im Kanal hinterlässt, wenn Aufgaben ausgewählt werden:

| Option | Verhalten |
| :--- | :--- |
| Alle Benachrichtigungen außer der letzten löschen | Löscht alle Benachrichtigungen außer der neuesten. |
| Alle Benachrichtigungen außer den letzten zwei löschen | Löscht alle außer den letzten zwei. |
| Keine Benachrichtigung löschen | Löscht Benachrichtigungen nie. |
| Benachrichtigungen deaktiviert | Postet die Benachrichtigungen zur Aufgabenauswahl gar nicht. |

Wenn ein Haken die ganze Liste abschließt, sagt ihre Benachrichtigung **Liste abgeschlossen** unter der Person, die abgehakt hat, und der [Verlaufs-Thread](#history-tracking) ebenso.

In der Activity posten Haken keine Benachrichtigung einzeln: Wenn die Liste in den Kanal zurückkehrt, folgt die Zusammenfassung der Sitzung dieser Einstellung. Siehe [Zurück in den Kanal](/docs/activity/#back-to-the-channel).

### Wenn eine Liste erstellt wird

Eine neue Liste postet unter sich ihre eigene Benachrichtigung: *ich habe die Liste erstellt*, mit einem Link zur Liste. Sie kommt von `/liste-erstellen`, vom Tutorial, von einem Import aus einer Datei, von einem Klon und von **Neue Liste** in der Activity.

Ein Klon postet sie im neuen Kanal und der Kanal der Originalliste bekommt die übliche Benachrichtigung über den Klon. Im Modus **Benachrichtigungen deaktiviert** wird im Kanal nichts gepostet, aber der Verlaufs-Thread hält die Erstellung trotzdem fest.

Ist [Besitzer in neuen Listen erwähnen](#mention-owners-in-new-lists) an, erwähnt die Benachrichtigung die Besitzer der Aufgaben, sodass Discord sie benachrichtigt. Eine in der Activity erstellte Liste erwähnt sie in der Zusammenfassung, die mit ihr in den Kanal zurückkommt.

Sind die [Tipps](#tips) an, endet die erste Benachrichtigung einer neuen Liste mit einer Erklärung: warum TTM Benachrichtigungen postet und, bei eingeschalteter Verlaufsverfolgung, was der Thread ist.

Sie erscheint einmal pro Liste und nur, wenn Tipps und Benachrichtigungen beide an waren, als die Liste erstellt wurde: Ein Team, das eines davon ausgeschaltet hat, kennt sich schon aus. Listen, die erstellt wurden, bevor es diese Erklärung gab, zeigen sie nicht.

## Verlaufsverfolgung

Wenn aktiviert, wird **jede Aktion auf deinen Listen in einem eigenen Thread festgehalten** und du bekommst ein Protokoll darüber, wer was wann getan hat. Standardmäßig an. Der Thread beginnt mit der Liste: Seine erste Zeile sagt, wer sie erstellt hat.

Listen in Sprachkanälen haben keinen Verlaufs-Thread, weil Discord dort keine Threads erlaubt: Siehe [Sprachkanäle](/docs/known-limits/#voice-channels). Eine Sitzung in der Activity kommt vollständig in den Thread, eine Zeile pro Änderung, wenn die Liste in den Kanal zurückkehrt.

## Verhalten

Ein Dropdown mit drei Optionen: **Lesbare Push-Benachrichtigungen**, **Zustand nach der Auswahl beibehalten** und **Besitzer in neuen Listen erwähnen**. Sie bestimmen, was TTM tut, wenn jemand eine Liste benutzt. Hake an, was an sein soll: Du kannst alle drei, einige oder keine anhaken.

### Lesbare Push-Benachrichtigungen

Eingeschaltet fügt TTM neben den Embeds Klartext hinzu, damit deine **Push-Benachrichtigungen auf dem Handy** auf einen Blick lesbar sind. Embeds allein erscheinen auf dem Sperrbildschirm oft leer. Standardmäßig an.

Sie auszuschalten stoppt nie eine Erinnerung: Sie kommt nur mit ihrer Karte an, oder, bei einer Rolle, nur mit der Erwähnung. Die Erwähnungen der Besitzer gehen auch bei ausgeschalteter Option weiterhin allein raus.

### Zustand nach der Auswahl beibehalten

Nur im Kanal. Nachdem du **Besitzer**, **Tag** oder **Erinnerung** in der zweiten Reihe unter der Liste benutzt hast, entscheidet das, ob der Button wieder grau wird oder den aktiven Modus **behält**.

Standardmäßig aus: Der Button wird wieder grau. Schalte es ein, wenn du dieselbe Aktion auf mehrere Aufgaben nacheinander anwendest.

Es ändert auch, was **Tag** und **Besitzer** können. Ist es aus, überschreibt deine Auswahl immer. Ist es an, kannst du außerdem die vorhandenen Tags oder den Besitzer einer Aufgabe live bearbeiten. Siehe [Tag](/docs/channel-tasks/#tag) für die ganze Aufschlüsselung.

In der Activity funktioniert das Panel einer Aufgabe immer gleich: Nach einer Aktion bleibt es bei der Aufgabe, mit grauen Buttons. Siehe [Das Panel einer Aufgabe](/docs/activity-list/#the-panel-of-a-task).

### Besitzer in neuen Listen erwähnen

Wenn jemand eine Liste erstellt, importiert oder klont, erwähnt ihre erste Benachrichtigung die Besitzer ihrer Aufgaben: Personen und Rollen, jeweils einmal, in der Reihenfolge der Liste. Die Erwähnungen stehen im Klartext der Benachrichtigung, sodass Discord die Besitzer benachrichtigt.

Die Person, die die Liste erstellt hat, wird nicht erwähnt: Sie weiß es schon. @everyone ebenfalls nicht, auch wenn es eine Aufgabe besitzt: Eine neue Liste benachrichtigt nicht den ganzen Server.

Standardmäßig an, auch auf Servern, die TTM hinzugefügt haben, bevor es diese Option gab. Eine Liste, die innerhalb einer Activity-Sitzung erstellt wird, erwähnt ihre Besitzer in der Zusammenfassung, wenn sie in den Kanal zurückkehrt. Siehe [Wenn eine Liste erstellt wird](#when-a-list-is-created).

## Darstellung der Listen

Ein Dropdown mit zwei Optionen: **Erledigte Aufgaben abgedunkelt** und **Abstand um Gruppen**. Sie bestimmen, wie Aufgaben in Listen aussehen. Hake an, was an sein soll: beide, eine oder keine. Eine Liste, die schon in einem Kanal ist, übernimmt die Änderung bei ihrer nächsten Aktualisierung, zum Beispiel wenn jemand eine Aufgabe abhakt.

Beide ändern die Liste im Kanal. In der Activity stellt jede Person ihr eigenes Aussehen mit dem Zahnrad ein: Siehe [Deine Einstellungen](/docs/activity/#your-settings).

### Erledigte Aufgaben abgedunkelt

Zeigt jede erledigte Aufgabe in dem kleineren, grauen Text von Discord, damit hervorsticht, was noch zu tun ist. Standardmäßig an; schalte es aus, um erledigte Aufgaben wie alle anderen zu zeigen. Eine Liste übernimmt die Änderung bei ihrer nächsten Aktualisierung.

### Abstand um Gruppen

Setzt eine Leerzeile über und unter jede Aufgabe, die Unteraufgaben hat, damit sich jede Gruppe vom Rest der Liste abhebt.

Standardmäßig aus, für eine kompaktere Liste: Server, die TTM vor Version 2.0.0 hinzugefügt haben, haben es an, bis ein Admin es ausschaltet.

Es ändert nur die Liste selbst: Benachrichtigungen bleiben, wie sie sind. Discord hat keine dünnere Leerzeile für eine Liste, die Wahl liegt also zwischen einer ganzen Zeile und keiner.

## Wiederkehrende Erinnerungen

Standardmäßig aus. Wenn sie aus sind, ist jede Erinnerung ein **Einzelereignis**: Eine zu erstellen oder zu bearbeiten ist ein **Ablauf in einem Schritt**: Du wählst Datum und Uhrzeit, sonst nichts. Einfacher und schneller für Teams, die nur einen einmaligen Hinweis brauchen.

Schalte sie **ein**, um **Wiederholungen und Intervalle** freizuschalten. Im Kanal nutzt das Erstellen einer Erinnerung dann den Ablauf in zwei Schritten: eine [Zusammenfassungskarte](/docs/channel-tasks/#the-summary-card) plus ein Wiederholungsdialog. In der Activity kommen die Wiederholungsmenüs zum Datum im [Erinnerungs-Panel](/docs/activity-list/#reminder) hinzu. Siehe [Die Wiederholungsfelder](/docs/reminders/#the-repetition-fields).

Wiederkehrende Erinnerungen sind eine [Premium](/docs/premium/)-Funktion. Im Free-Tarif wird dieses Dropdown angezeigt, aber ausgeschaltet, und seine Notiz sagt es. Deine Wahl geht nicht verloren: In Premium kommt das Dropdown so zurück, wie du es verlassen hast.

Das Premium-Emoji im Titel der Gruppe erscheint auf jedem Server, Premium eingeschlossen: Es markiert eine Premium-Funktion, keine fehlende.

Eine Erinnerung, die *schon* wiederkehrend ist, löst weiter aus, auch bei ausgeschaltetem Schalter oder im Free-Tarif. Was du noch ändern kannst: Siehe [Wiederkehrende Erinnerungen](/docs/reminders/#repeating-reminders).

## Zeitzone

Legt die Zeitzone fest, in der dein Team arbeitet. Mitglieder können für Erinnerungen trotzdem ihre eigene nutzen: Bis sie eine wählen, schlägt TTM die Zone ihrer Discord-Sprache vor und diese nur, wenn ihre Sprache in mehreren Zonen gesprochen wird, wie Englisch (US). Siehe [Deine Zeitzone](/docs/reminders/#your-time-zone).

Klicke den Button und füge dann den offiziellen Namen einer Zone ein: Suche ihn auf der **[Zeitzonenkarte](https://timezones.bitsplitters.app)**.

## Berechtigungen synchronisieren

Standardmäßig verbergen die Integrationsberechtigungen von Discord nur die *Befehle*: Die erzeugten Buttons und Listen bleiben für alle nutzbar. Klicke **Berechtigungen laden**, um deine Berechtigungsregeln auch auf diese Komponenten auszudehnen. Nach der Synchronisierung **sehen Benutzer, die nicht berechtigt sind, die Liste schreibgeschützt**.

Lege die Regeln unter *Servereinstellungen → Integrationen → Team Tasks Manager* fest und synchronisiere dann. Auch Kanalbeschränkungen werden beachtet: Ist ein Kanal für einen Benutzer gesperrt, sind die Listen dort für ihn schreibgeschützt. Der Button **Activity** unter der Liste folgt denselben Regeln: Siehe [Wenn sich die Liste nicht öffnet](/docs/activity/#when-the-list-doesnt-open).

<div class="callout"><div class="callout-t">Webhooks haben einen eigenen Befehl</div>Webhooks werden nicht in diesem Panel konfiguriert: Nutze <a href="/docs/config-webhook/"><code>/config webhook</code></a>. Was sie tun: Siehe <a href="/docs/webhooks/">Webhooks</a>.</div>

<div class="callout"><div class="callout-t">Suchst du deine Listen?</div>Dieses Panel enthält <em>Einstellungen</em>: wie sich der Bot verhält. Um die Listen zu sehen, die dieser Server hat, und um eine zu löschen, zu versiegeln oder zu regenerieren, nutze <code>/config lists</code>: Siehe <a href="/docs/config-lists/">/config lists</a>.</div>
