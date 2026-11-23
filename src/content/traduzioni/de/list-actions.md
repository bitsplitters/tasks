---
title: "Listenaktionen"
description: "Bereinigen, Alle wieder öffnen, Klonen, Herunterladen, Versiegeln und Löschen — was jede Aktion mit der ganzen Liste macht und wo du sie findest."
fonte: c473903dad41
---

Diese Aktionen wirken auf die **ganze Liste**, nie auf eine einzelne Aufgabe. Zwei gibt es an beiden Orten, die anderen nur im Kanal.

| Aktion | Im Kanal | In der Activity |
| :--- | :---: | :---: |
| [Bereinigen](#clean) | ja | ja |
| [Alle wieder öffnen](#reopen-all) | ja | ja |
| [Klonen](#clone) | ja | — |
| [Herunterladen](#download) | ja | — |
| [Versiegeln](#seal) | ja, und in `/config lists` | nur über `/config lists` |
| [Löschen](#delete) | ja, und in `/config lists` | nur über `/config lists` |

<div class="howto" id="how-to-do-it"><div class="howto-t">So geht's</div><div class="howto-grid"><a class="howto-go is-channel" href="/docs/the-task-list/#row-1--acts-on-the-whole-list"><span class="howto-k"><img class="place-ic" src="/icons/posto-canale.svg" alt="" />Im Kanal</span><span class="howto-d">Die erste Reihe unter der Liste, und Mehr für Klonen, Herunterladen, Versiegeln und Löschen.</span></a><a class="howto-go is-activity" href="/docs/activity-list/#the-first-row"><span class="howto-k"><img class="place-ic" src="/icons/activity.png" alt="" />In der Activity</span><span class="howto-d">Liste bereinigen und Alle wieder öffnen, oben in der Liste.</span></a></div></div>

## Bereinigen

**Liste bereinigen** entfernt jede erledigte Aufgabe, Unteraufgaben eingeschlossen, und nummeriert die verbleibenden Aufgaben neu. Eine Gruppe, die nicht erledigt ist, bleibt bestehen, auch wenn einige ihrer Unteraufgaben verschwinden.

Zuerst sagt dir eine Bestätigung, wie viele Aufgaben verschwinden und was mit ihnen geht. Sie verschwinden **endgültig**, samt ihren Erinnerungen und Tags, falls sie welche haben. Im Kanal zeigt die Benachrichtigung im Kanal der Liste oder in ihrem Thread die entfernten Aufgaben, wenn die Konfiguration deines Servers das vorsieht: siehe [Benachrichtigungsmodus](/docs/configuration/#notification-mode). In der Activity landen sie in der Zusammenfassung am Ende der Sitzung.

- **Keine Aufgabe erledigt**: Es gibt nichts zu entfernen, und der Bot sagt es sofort.
- **Jede Aufgabe erledigt**: Bereinigen lehnt ab, denn eine Liste darf nicht leer sein. Nimm bei mindestens einer Aufgabe den Haken weg, oder entferne die ganze Liste mit [Löschen](#delete), im Kanal.

## Alle wieder öffnen

**Alle wieder öffnen** setzt jede erledigte Aufgabe zurück auf offen. Text, Besitzer, Tags und Erinnerungen bleiben, wie sie sind. Wenn keine Aufgabe erledigt ist, sagt der Bot, dass es nichts wieder zu öffnen gibt.

Zuerst bittet dich der Bot, zu wählen:

- **Wieder öffnen** — öffnet jetzt jede Aufgabe wieder.
- **Neues Datum** — öffnet wieder und verschiebt die Erinnerungen der Aufgaben, die du wieder öffnest. Die erste dieser Erinnerungen im Kalender wird auf das Datum verschoben, das du wählst, mindestens 5 Minuten ab jetzt. Die anderen behalten denselben Abstand zu ihr. Erinnerungen von Aufgaben, die noch offen sind, bleiben, wie sie sind. Diese Auswahl erscheint nur, wenn eine Aufgabe, die du wieder öffnest, eine Erinnerung hat.
- **Abbrechen** — lässt die Liste, wie sie ist.

Das Wiedereröffnen löst die **Webhooks für die Wiedereröffnung** der Aufgaben aus, die es wieder öffnet, und ignoriert die Besitzer: Wer die Liste bearbeiten darf, darf sie wieder öffnen.

## Klonen

**Liste klonen** kopiert die Liste als neue Liste in einen anderen Kanal. Du wählst:

- den Kanal: Textkanäle und Sprachkanäle. Ein Klon in einem Sprachkanal hat keinen Aktivitätsverlauf: siehe [Sprachkanäle](/docs/known-limits/#voice-channels);
- ob der Klon die Haken behält;
- ob er die Erinnerungen behält.

Ein Klon bekommt neue Erinnerungen, deshalb kann eine wiederkehrende Erinnerung abgelehnt werden: siehe [Wiederkehrende Erinnerungen](/docs/reminders/#repeating-reminders).

Der Klon veröffentlicht seine eigene Benachrichtigung im neuen Kanal und kann die Besitzer seiner Aufgaben erwähnen: siehe [Wenn eine Liste erstellt wird](/docs/configuration/#when-a-list-is-created). Der Kanal der ursprünglichen Liste bekommt die übliche Benachrichtigung über den Klon, ohne Erwähnungen.

Ein Klon ist eine neue Liste: Er braucht einen freien Platz und darf nicht mehr Aufgaben haben, als dein Tarif erlaubt. Siehe [Was Premium freischaltet](/docs/premium/).

Nur im Kanal, auch wenn die Liste gesperrt ist.

## Herunterladen

**Herunterladen** gibt dir eine `.txt`-Datei der Liste, geschrieben wie in [Eine Liste von Hand bearbeiten](/docs/writing-a-list/) erklärt, und **nur an dich** gesendet. Die Datei behält die Codes von Discord anstelle der Namen: siehe [Die Codes hinter den Namen](/docs/writing-a-list/#the-codes-behind-the-names). Heb sie als Backup auf oder baue die Liste daraus mit `/liste-erstellen` wieder auf, auch auf einem anderen Server: siehe [Eine Liste überall wiederverwenden](/docs/tips/#reuse-a-list-anywhere).

Eine Discord-Nachricht ist auf 2000 Zeichen begrenzt, deshalb veröffentlicht Herunterladen die Liste nie als Text: Es ist immer eine Datei.

Nur im Kanal.

## Versiegeln

**Liste versiegeln** bewahrt eine fertige Liste als Protokoll im Kanal auf, mit der Kennzeichnung *Versiegelte Liste*, ohne Buttons und Menüs. Ihre Erinnerungen hören auf, und sie gibt einen [Platz in deinem Tarif](/docs/premium/#how-the-three-places-work) frei. Was bleibt und was verschwindet: [Versiegeln](/docs/config-lists/#seal).

Das Versiegeln lässt sich nicht rückgängig machen, und der Bot bittet dich vorher um Bestätigung. Wenn du die Liste vielleicht wiederverwenden willst, lade sie vor dem Versiegeln herunter.

Im Kanal, über **Mehr**, braucht das Versiegeln die Berechtigung *Nachrichten verwalten* im Kanal, und eine Liste, die gerade jemand bearbeitet, lässt sich nicht versiegeln. Über [`/config lists`](/docs/config-lists/) gelten die Berechtigungen von `/config`, und ein Admin kann auch eine Liste in der Activity versiegeln: Sie geht vorher zurück in den Kanal.

## Löschen

**Liste löschen** entfernt die Liste **endgültig**, mit ihren Aufgaben, Besitzern, Tags und Erinnerungen. Die Nachricht wird entfernt, und an ihrer Stelle erscheint im Kanal eine kurze Quittung.

Das Löschen lässt sich nicht rückgängig machen, und der Bot bittet dich vorher um Bestätigung. Die Berechtigungen sind dieselben wie bei [Versiegeln](#seal). Wenn du über `/config lists` eine Liste in der Activity löschst, verschwindet sie auch für die Leute, die gerade darin sind.

<div class="callout"><div class="callout-t">Warum löschen, statt die Nachricht zu entfernen?</div>Wenn du die Nachricht von Hand löschst, bleiben die Daten der Liste erhalten, und ihre Erinnerungen kommen weiter an. <strong>Liste löschen</strong> nimmt die Erinnerungen mit. Wenn eine Nachricht schon weg ist, kannst du mit <a href="/docs/config-lists/"><code>/config lists</code></a> aufräumen oder die Liste zurückholen.</div>
