---
title: "/config lists"
description: "Sieh jede Liste des Servers, versiegle oder lösche die, mit denen du fertig bist, oder hole eine zurück, deren Nachricht versehentlich gelöscht wurde."
fonte: 0da09921c70a
---

Führe den Befehl aus:

```
/config lists
```

Er öffnet ein privates Panel, das nur du siehst, mit **jeder Liste, die dieser Server noch hat**. Jede Liste hat eine Zeile: den Namen der Liste und den Kanal, in dem sie lebt, als anklickbaren Link.

Eine Liste, die einen der Plätze deines Tarifs belegt, ist neben ihrem Kanal als **in Gebrauch** markiert. Wenn du einen Platz freimachen musst, sind das die Listen, die du versiegeln oder löschen kannst. Während der Beta gibt es keine Grenze, deshalb ist keine Liste markiert. Wie eine Liste einen Platz belegt: siehe [So funktionieren die drei Plätze](/docs/premium/#how-the-three-places-work).

Eine Liste, an der jemand in der [Activity](/docs/activity/) arbeitet, ist als **in der Activity** markiert. Du kannst sie trotzdem regenerieren, versiegeln oder löschen, und die Bestätigung warnt dich vorher: siehe [Was im Kanal bleibt](/docs/activity/#what-stays-in-the-channel).

Standardmäßig können nur Mitglieder mit der Berechtigung *Server verwalten* `/config lists` nutzen, wie den Rest von `/config`. Siehe [Wer /config öffnen kann](/docs/config/#who-can-open-config).

## Ein Button, vier Zustände

Jede Zeile hat einen einzigen Button, der bei jedem Druck weiterschaltet:

| Zustand | Bedeutung |
| :--- | :--- |
| <span class="c-grey">Grau</span> <img class="inline-ic" src="/icons/noaction.png" alt="" /> | keine Aktion |
| <span class="c-blue">Blau</span> <img class="inline-ic" src="/icons/refresh.png" alt="" /> | **regenerieren** |
| <span class="c-green">Grün</span> <img class="inline-ic" src="/icons/seal.png" alt="" /> | **versiegeln** |
| <span class="c-red">Rot</span> <img class="inline-ic" src="/icons/delete.png" alt="" /> | **löschen** |

Markiere so viele Listen, wie du brauchst, etwa zwei zum Löschen, eine zum Versiegeln und drei zum Regenerieren, und drücke dann **Anwenden**. Bevor etwas passiert, listet ein Bestätigungsfenster sie nach Namen auf, nach Aktion gruppiert: Sende es ab, um fortzufahren, schließe es, um abzubrechen.

Der Block läuft dann **der Reihe nach**: zuerst das Löschen, dann das Versiegeln, dann das Regenerieren. So kann ein Block einen Platz freimachen und nutzen: Eine Liste, die du löschst oder versiegelst, gibt ihren Platz an eine Liste ab, die du regenerierst.

Am Ende bekommst du eine Zusammenfassung nach Namen: die gelöschten, versiegelten und regenerierten Listen und die, die nicht bearbeitet werden konnten. Zu jeder davon gehört ihr Grund, zum Beispiel eine Liste, die es nicht mehr gibt, oder ein Regenerieren ohne freien Platz in deinem Tarif. Danach zeichnet sich das Panel mit den Listen neu, wie sie jetzt sind.

**Abbrechen** schließt das Panel und tut nichts. Deine Auswahl überlebt einen Seitenwechsel: Die Kopfzeile sagt dir, wie viele du auf anderen Seiten markiert hast, und die Bestätigung bezieht sie mit ein. Die Auswahl auf der Seite vor dir steckt im Panel selbst, sie läuft also nie ab, während du nachdenkst. Die auf anderen Seiten werden eine Stunde lang gemerkt, nachdem du das Panel zuletzt angefasst hast.

## Regenerieren

Veröffentlicht die Liste erneut, in ihrem ursprünglichen Kanal, mit demselben Inhalt: Aufgaben, Besitzer, Tags und Erinnerungen. Nutze es, wenn die Nachricht der Liste versehentlich gelöscht wurde: Die Daten waren noch da, nur die Nachricht fehlte.

Drei Dinge, die du wissen solltest:

- **Der Aktivitätsverlauf folgt der Liste.** Die neue Nachricht nutzt denselben Thread weiter, sodass der Verlauf bleibt, wo er war, und nichts verwaist;
- **die alte Nachricht wird entfernt**, falls es sie noch gibt. Das ist Absicht: Eine übrig gebliebene Nachricht hat noch funktionierende Buttons. Sie zu drücken würde den Bot die Liste ein zweites Mal aufbauen lassen, und es gäbe zwei Listen, die auseinanderdriften;
- **Regenerieren zählt als Arbeit an der Liste.** Eine Liste, die schon einen Platz deines Tarifs belegt, behält ihn. Eine Liste ohne Platz braucht einen freien, sonst landet sie in der Zusammenfassung bei denen, die nicht bearbeitet wurden.

## Versiegeln

Für eine Liste, mit der du fertig bist, die du aber als Protokoll behalten willst. Die Liste **bleibt im Kanal** mit demselben Inhalt, aber ohne Buttons oder Menüs und mit einer Zeile *Versiegelte Liste* ganz unten. Alles andere entfällt:

- Die Liste lässt sich nicht mehr bearbeiten, wieder öffnen oder herunterladen;
- ihre Erinnerungen hören auf;
- sie gibt ihren Platz in deinem Tarif frei;
- sie erscheint nicht mehr in diesem Panel, weil ihre Daten TTM verlassen.

Der Aktivitätsverlauf bleibt, wo er ist. Das Versiegeln lässt sich nicht rückgängig machen: Wenn du die Liste vielleicht wiederverwenden willst, lade sie vor dem Versiegeln herunter.

Die Benachrichtigung im Kanal und die Zeile im Verlauf folgen den Optionen deines Servers: Sind beide aus, hält nichts fest, wer die Liste versiegelt hat.

Eine Liste, deren Nachricht nicht mehr existiert, **lässt sich nicht versiegeln**: Es gibt kein Protokoll mehr, das man behalten könnte. Sie taucht in der Zusammenfassung bei denen auf, die nicht bearbeitet wurden, mit dem Grund, und der Rest des Blocks läuft trotzdem. Um sie zu entfernen, markiere sie rot, um sie zu **löschen**.

Es ist dasselbe Versiegeln wie über **Liste versiegeln** im Panel **Mehr** <img class="inline-ic" src="/icons/other.png" alt="" /> einer Liste.

## Löschen

Entfernt die Liste dauerhaft: Aufgaben, Besitzer, Tags, Erinnerungen und den Aktivitätsverlauf. Im Kanal der Liste wird eine Quittung gepostet, und die letzte Zeile des Verlaufs hält das Löschen fest, bevor der Thread sich selbst überlassen wird.

Es ist dasselbe Löschen wie über **Liste löschen** im Panel **Mehr** <img class="inline-ic" src="/icons/other.png" alt="" /> einer Liste. Nutze diesen Befehl, wenn die Nachricht der Liste nicht mehr da ist und du nichts mehr anklicken kannst.

<div class="callout"><div class="callout-t">Warum weiß der Bot nicht, welche Listen tot sind?</div>Eine lebende von einer gelöschten Liste zu unterscheiden hieße, Discord bei jedem Öffnen des Panels nach jeder Liste zu fragen. TTM tut das nicht: Es zeigt dir, was existiert, und verlinkt jeden Kanal, damit du selbst nachsehen kannst. Aus Schweigen zu raten ist genau die Art, wie Daten versehentlich zerstört werden.</div>

## Wenn die Datenbank nicht erreichbar ist

Ist die Datenbank nicht erreichbar, öffnet sich der Befehl nicht und sagt es dir. Jede Zeile dieses Panels kommt aus der Datenbank. Ein Löschen, das die Daten nicht entfernen kann, ließe Erinnerungen für eine Liste weiterlaufen, die nirgends mehr auftaucht.
