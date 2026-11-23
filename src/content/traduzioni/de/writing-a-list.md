---
title: "Eine Liste von Hand bearbeiten"
description: "Bearbeite eine Liste, indem du ihren Text schreibst, um viele Dinge auf einmal zu ändern oder eine Liste von anderswo einzufügen. Für alles andere nimm die Buttons: Sie sind einfacher und bewahren dich vor Fehlern."
fonte: 7218c363e178
---

Diese Seite ist für den Fall, dass du den Text einer Liste lieber selbst änderst, in **Sammelbearbeitung** im Kanal oder in **Liste bearbeiten** in der Activity.

Die Buttons machen dasselbe ohne Fehler: **Besitzer**, **Tag**, **Erinnerung** und **Webhook** schreiben die Codes für dich, und TTM prüft sie unterwegs. Nutze sie zuerst. Der Text ist für viele Änderungen auf einmal oder für eine Liste, die du von anderswo kopierst.

Der Strich und die Leerzeichen, die Aufgaben und Unteraufgaben machen, stehen unter [Erstelle deine erste Liste](/docs/getting-started/#2-create-your-first-list). Derselbe Text steht in `/liste-erstellen`, in **Neue Liste** in der Activity und in der Datei, die **Herunterladen** dir gibt.

Im Formular **Inhalt** einer einzelnen Aufgabe haben Besitzer, Tags, Erinnerung und Webhook ihre eigenen Buttons: Das Formular entfernt einen Besitzer, eine Erinnerung oder einen Webhook, den du tippst, und sagt es dir.

<div class="howto"><div class="howto-t">So geht's</div><div class="howto-grid"><a class="howto-go is-channel" href="/docs/the-task-list/#bulk-update"><span class="howto-k"><img class="place-ic" src="/icons/posto-canale.svg" alt="" />Im Kanal</span><span class="howto-d">Sammelbearbeitung, in der ersten Reihe unter der Liste.</span></a><a class="howto-go is-activity" href="/docs/activity-list/#edit-the-list"><span class="howto-k"><img class="place-ic" src="/icons/activity.png" alt="" />In der Activity</span><span class="howto-d">Liste bearbeiten, oben in der Liste.</span></a></div></div>

## Kurzübersicht

| Du willst | Du schreibst |
| :--- | :--- |
| [Eine Aufgabe](#tasks-and-subtasks) | `- Veröffentlichen` |
| [Eine Unteraufgabe](#tasks-and-subtasks) | `  - Die Notizen schreiben`, unter ihrer Aufgabe |
| [Eine erledigte Aufgabe](#tasks-and-subtasks) | `- [X] Veröffentlichen` |
| [Eine Person erwähnen](#mentioning-people-and-roles) | der Button **Tag** oder `@Name` |
| [Eine von zwei Personen mit demselben Namen](#mentioning-people-and-roles) | `@Name (Benutzername)` |
| [Jemand Neuen erwähnen](#writing-someone-new) | der Button **Tag** oder `<@ID>` |
| [Eine Rolle erwähnen](#mentioning-people-and-roles) | der Button **Tag** oder `@Rolle` |
| [@ ohne Erwähnung schreiben](#writing--without-a-mention) | `\@Name` |
| [Den Besitzer festlegen](#owners-the-mention-with-a-colon) | der Button **Besitzer** oder `@Name:` |
| [Jemand Neuen als Besitzer festlegen](#writing-someone-new) | der Button **Besitzer** oder `<@ID>:` |
| [Einen Kanal verlinken](#linking-channels) | `#kanal` |
| [Einen Link hinzufügen](#adding-a-hyperlink) | `[Text](https://url)` |
| [Eine E-Mail-Adresse oder eine Telefonnummer verlinken](#adding-a-hyperlink) | `[Text](mailto:name@example.com)`, `[Text](tel:+12025550100)` |
| [Das Emoji eines Buttons zeigen](#button-emoji) | `:owner:`, `:reminder:`, `:content:`, `:more:`, `:activity:` |
| [Eine Erinnerung an einem Datum](#reminders-in-the-text) | der Button **Erinnerung** oder `2026-12-08 18:00 [0m,0m,0]` |
| [Eine Erinnerung in einer anderen Zeitzone](#reminders-in-the-text) | `2026-12-08 18:00 America/New_York [0m,0m,0]` |
| [Eine Erinnerung zwei Tage nach dem Speichern](#reminders-in-the-text) | `[2d,0m,0]` |
| [Einen Webhook verknüpfen](#webhooks-in-the-text) | der Button **Webhook** oder `{{wb=name}}` |

## Aufgaben und Unteraufgaben

```
- [X] Die Sprachkanäle buchen
- [] Die Turnierbäume vorbereiten
  - [X] Die Anmeldungen sammeln
  - [] Die Teams auslosen
- [] Die Regeln veröffentlichen
```

- **Eine Zeile, die mit `-` beginnt, ist eine Aufgabe.**
- **Leerzeichen vor dem Strich machen sie zur Unteraufgabe** der Aufgabe darüber. Eine Aufgabe mit Unteraufgaben wird zu einer **Gruppe**.
- **Die erste Zeile kann keine Unteraufgabe sein.**
- **Das Kästchen steht nach dem Strich**: `[]` für eine offene Aufgabe, `[X]` für eine erledigte. Ändere es, um die Aufgabe abzuhaken oder den Haken zu entfernen. Eine neue Zeile ohne Kästchen ist eine offene Aufgabe.
- **Der Titel** darf bis zu 90 Zeichen lang sein.
- **Die Liste** darf bis zu etwa 4000 Zeichen und 50 Aufgaben haben, Unteraufgaben eingeschlossen. Nach der Beta erlaubt der Free-Tarif 20 Aufgaben: Siehe [Was Premium freischaltet](/docs/premium/).

## Personen, Rollen und Kanäle mit Namen

Im Text werden Personen, Rollen und Kanäle mit Namen geschrieben, wie Discord sie zeigt: `@Ava`, `@Moderatoren`, `#allgemein`.

Beim Speichern macht TTM aus jedem Namen eine Erwähnung, sodass die Liste wie gewohnt benachrichtigt und verlinkt. Öffnest du das Formular wieder, sind die Namen zurück.

Die Zeile unter dem Text, im Kanal und in der Activity, verlinkt hierher, um jemand Neuen hinzuzufügen: Siehe [Jemand Neuen schreiben](#writing-someone-new).

## Personen und Rollen erwähnen

Der Button **Tag** fügt Erwähnungen für dich hinzu: Siehe [Tags](/docs/owners-and-tags/#tags). Im Text schreibst du `@` und den Namen:

```
- Ava bitten, die Regeln zu prüfen, dann @Moderatoren Bescheid sagen
```

Diese Erwähnungen sind die **Tags** der Aufgabe: Kopiere, verschiebe oder entferne sie, wie du willst.

- **Eine Person** schreibst du mit dem Namen, den der Server zeigt: ihr Server-Nickname, sonst ihr Anzeigename, sonst ihr Benutzername. Groß- und Kleinschreibung spielt keine Rolle.
- **Mit Namen schreibst du nur die Personen, die die Liste schon erwähnt.** Jemand Neuen fügst du mit dem Button **Besitzer** oder **Tag** hinzu oder mit ihrem Code: Siehe [Jemand Neuen schreiben](#writing-someone-new).
- **Eine Rolle** ist `@` und ihr Name: `@Moderatoren`. Jede Rolle des Servers funktioniert, auch eine, die die Liste noch nicht erwähnt.
- **Zwei Personen mit demselben Namen** erscheinen mit ihrem Benutzernamen in Klammern: `@Mario (mario.rossi)` und `@Mario (mario_b)`. Schreibe sie genauso. Ein Name, der auf mehr als eine Person passt, lässt sich nicht speichern, und die Nachricht listet die Formen auf, die du schreiben kannst.
- **Ein Name, den TTM nicht kennt**, etwa `@elonmusk`, bleibt einfacher Text. An der Stelle des Besitzers ist er dagegen ein Fehler: Siehe [Besitzer: die Erwähnung mit einem Doppelpunkt](#owners-the-mention-with-a-colon).

Der längste Name gewinnt: Gibt es auf dem Server Mario und Mario Rossi, ist `@Mario Rossi` Mario Rossi. Ein Name zählt nur als ganzes Wort, also ist `@Leonardo` nicht `@Leo` gefolgt von „nardo“.

Manche `@` sind nie ein Name:

- `@everyone` und `@here`;
- ein einzelnes `@`;
- eine E-Mail-Adresse, etwa `ava@example.com`;
- alles innerhalb eines Links oder zwischen Backticks.

### Jemand Neuen schreiben

Die Buttons **Besitzer** und **Tag** wählen aus dem eigenen Menü von Discord, sodass sie jeden auf dem Server ohne Code erreichen.

Im Text schreibst du den Code der Person dorthin, wo der Name stünde: `<@`, ihre ID und `>`, etwa `<@123456789012345678>`. Allein ist er ein Tag; mit einem Doppelpunkt dahinter ist er der Besitzer. Zwei Wege, ihn zu bekommen:

- tippe in einem beliebigen Discord-Chat `\@` und den Anfang ihres Namens, wähle sie im Menü und sende: Die Nachricht zeigt ihren Code, bereit zum Kopieren;
- bei eingeschaltetem **Entwicklermodus** (Benutzereinstellungen → Erweitert) klickst du mit rechts auf die Person → **Benutzer-ID kopieren** und schreibst die ID zwischen `<@` und `>`.

Speichere, und beim nächsten Öffnen des Formulars erscheint die Person mit ihrem Namen.

### @ ohne Erwähnung schreiben

Setze einen Backslash vor einen Namen, den TTM kennt: `\@Ava` bleibt das Wort @Ava, und niemand wird erwähnt. `\#allgemein` tut dasselbe für einen Kanal.

Jedes andere `@Wort` bleibt von selbst Text, ohne Backslash. Die Ausnahme ist der Anfang einer Aufgabe, gefolgt von einem Doppelpunkt, wo es ein Besitzer wäre: Schreibe `\@Wort:`.

TTM behält deinen Backslash. Die Liste zeigt das Wort ohne ihn, und das Formular zeigt ihn beim nächsten Mal wieder, sodass du das Wort von der Erwähnung unterscheiden kannst. TTM fügt nie von sich aus einen Backslash hinzu.

## Besitzer: die Erwähnung mit einem Doppelpunkt

Der Button **Besitzer** legt den Besitzer einer Aufgabe für dich fest: Siehe [Besitzer](/docs/owners-and-tags/#owner-a-person-a-role-or-several-people). Im Text ist der Besitzer eine Erwähnung, gefolgt von einem **Doppelpunkt**, am Anfang der Aufgabe:

```
- @Ava: Die Versionshinweise veröffentlichen
```

- **Eine Rolle** funktioniert genauso: `@Moderatoren:`. Ein Code auch: `<@123456789012345678>:`.
- **Ohne den Doppelpunkt** ist dieselbe Erwähnung nur ein Tag, kein Besitzer.
- **Der Name des Besitzers** reicht vom `@` bis zum Doppelpunkt, also ist `@Ava Rossi:` ein Fehler, auch wenn TTM Ava kennt.
- **Ein Name, den TTM nicht kennt**, ist an der Stelle des Besitzers ein Fehler. TTM speichert nichts, und die Nachricht sagt, du sollst den Besitzer mit dem Button **Besitzer** wählen oder seinen Code schreiben.
- **Um eine Aufgabe mit `@Wort:` als einfachem Text zu beginnen**, siehe [@ ohne Erwähnung schreiben](#writing--without-a-mention). Das Formular **Inhalt** hat keinen Besitzer, also bleibt dort `@Wort:` einfacher Text.

## Kanäle verlinken

Schreibe `#` und den Namen des Kanals, wie ihn die Seitenleiste zeigt:

```
- Spezifikationen in #design, Deployment aus #releases
```

Jeder Kanal, den du erwähnen kannst, funktioniert: Text-, Ankündigungs-, Sprach-, Stage-, Forum- und Medienkanäle sowie aktive Threads. Kategorien nicht.

<div class="callout"><div class="callout-t">Auch ein Kanal-Link funktioniert</div>Klicke in der Seitenleiste mit rechts auf den Kanal → <strong>Link kopieren</strong> und füge ihn in die Aufgabe ein: TTM erkennt den Link und <strong>kürzt ihn zu einem Kanal-Tag</strong>, den das Formular dann als <code>#name</code> zeigt. Links, die auf eine bestimmte <em>Nachricht</em> zeigen, bleiben unverändert: Sie bleiben anklickbare Links.</div>

## Einen Link hinzufügen

Für Links auf alles außerhalb von Discord nimmst du Standard-Markdown:

```
[unsere Roadmap](https://example.com/roadmap)
```

Die Liste zeigt **[unsere Roadmap](https://example.com/roadmap)**: einen sauberen, anklickbaren Link statt einer nackten URL.

Das Ziel muss keine Webseite sein. Links mit `mailto:`, `tel:` und `sms:` funktionieren genauso und öffnen die eigene App der lesenden Person:

```
[der Verantwortliche für die Version](mailto:release@example.com)
[das Bereitschaftstelefon](tel:+12025550100)
```

Der erste macht aus einer Aufgabe ein „Schreib dieser Person“ mit einem Klick. Der zweite wählt direkt vom Handy aus.

Ein Link kann auch auf **eine andere Liste** zeigen: Klicke mit rechts auf ihre Nachricht → **Nachrichtenlink kopieren** und füge ihn in die Klammern ein. Nachrichtenlinks bleiben, wie sie sind: Nur einfache Kanal-Links werden zu einem `#kanal`-Tag.

## Button-Emoji

Eine Aufgabe kann das Emoji eines Listen-Buttons zeigen, wie es die Lektionen des [Tutorials](/docs/getting-started/#2-create-your-first-list) tun. Im Text erscheint jedes dieser Emoji als kurzer Name:

| Name | Im Text | Button |
| :--- | :---: | :--- |
| `:owner:` | <img class="inline-ic" src="/icons/owner_blue.png" alt="" /> | **Besitzer** <img class="inline-ic" src="/icons/owner.png" alt="" /> |
| `:reminder:` | <img class="inline-ic" src="/icons/alert_blue.png" alt="" /> | **Erinnerung** <img class="inline-ic" src="/icons/alertW.png" alt="" /> |
| `:content:` | <img class="inline-ic" src="/icons/task_blue.png" alt="" /> | **Inhalt** <img class="inline-ic" src="/icons/task.png" alt="" /> |
| `:more:` | <img class="inline-ic" src="/icons/other_blue.png" alt="" /> | **Mehr** <img class="inline-ic" src="/icons/other.png" alt="" /> |
| `:activity:` | <img class="inline-ic" src="/icons/activity_blue.png" alt="" /> | **Activity** <img class="inline-ic" src="/icons/activity.png" alt="" /> |

Lass einen Namen, wo er ist, und das Emoji bleibt. Schreibe selbst einen, in Kleinbuchstaben, und die Liste zeigt das Emoji des Buttons: praktisch, wenn eine Aufgabe sagt, welchen Button du drücken sollst. Jedes andere Wort zwischen Doppelpunkten bleibt, wie du es geschrieben hast.

## Erinnerungen im Text

Der Button **Erinnerung** legt eine Erinnerung für dich fest und prüft sie unterwegs: Siehe [Erinnerungen](/docs/reminders/). Im Text ist eine Erinnerung ein Datum gefolgt von einem Triplet, vor dem Besitzer:

```
- [] 2026-12-08 18:00 [2d3h,1h,3] @Ava: Die Versionshinweise veröffentlichen
```

**Das Datum** wird `YYYY-MM-DD HH:mm` geschrieben, in jeder Sprache gleich, in deiner Zeitzone: Siehe [/my timezone](/docs/my-timezone/). Ändere das Datum und speichere, dann wandert die Erinnerung. Nur das Datum direkt vor einem Triplet ist eine Erinnerung: Ein Datum an anderer Stelle bleibt, wie du es geschrieben hast.

- **Ein Datum in einer anderen Zone** trägt die Zone hinter der Uhrzeit: `2026-12-08 18:00 America/New_York`. Sie zählt nur für dieses Datum und hat Vorrang vor jeder anderen Zone: praktisch, um eine Uhrzeit zu behalten, die dir jemand in seiner Zone genannt hat.
- **Die Zone** wird mit ihrem Namen angegeben, etwa `Europe/Rome`, in Groß- oder Kleinschreibung, oder als UTC oder GMT mit einem Offset, etwa `GMT-5:30`.
- **Abkürzungen** wie CET oder EST werden nicht akzeptiert, weil dieselbe Abkürzung in verschiedenen Ländern verschiedene Zonen bedeutet. Die Zeile bekommt einen Pfeil.
- **Wenn sich das Formular wieder öffnet**, steht das Datum wieder in deiner Zone, im selben Moment.
- **Ein Datum mit Sekunden** zeigt sie: `2026-12-08 18:00:30`.
- **Wenn die Sommerzeit endet**, laufen die Uhren zweimal durch eine Stunde. Ein Datum in dieser Stunde trägt seinen Offset, etwa `2026-10-25 02:30 +02:00`, damit die beiden 02:30 getrennt bleiben. Ohne Offset nimmt TTM die erste der beiden.
- **Wenn die Sommerzeit beginnt**, überspringen die Uhren eine Stunde. Ein Datum in dieser Stunde gibt es nicht, und die Zeile bekommt einen Pfeil.

**Das Triplet** ist `[Abstand,Intervall,Wiederholungen]`:

- **Der Abstand** erzeugt eine Erinnerung ohne absolutes Datum: Sie wird ab dem Moment gezählt, in dem du die Liste speicherst.
- **Die Wiederholungen** sind die Pings nach dem ersten, also zeigt die Aufgabenzeile einen mehr: `[2d3h,1h,3]` ist `↻1h ×4`. Mehr als 49 erlaubt kein Tarif, das sind insgesamt 50 Pings.
- **Ein einzelnes Ereignis** nutzt das Intervall `0m` und `0` Wiederholungen: `[2d3h,0m,0]`.
- **Abstand und Intervall** nutzen nur `d`, `h` und `m`. Ein Wert in Monaten, etwa `[1M,0m,0]`, wird abgelehnt, und die Zeile bekommt einen Pfeil.

`1d` und `24h` sind bei einem Zeitwechsel nicht dasselbe: `1d` behält dieselbe Uhrzeit, `24h` ist exakt und kann um eine Stunde verrutschen. Siehe [Die Wiederholungsfelder](/docs/reminders/#the-repetition-fields).

Es gelten die Regeln des Erinnerungsformulars, auch dafür, wie viele Erinnerungen gleichzeitig warten dürfen: Siehe [Bekannte Grenzen](/docs/known-limits/). Wo keine neuen wiederkehrenden Erinnerungen erstellt werden können, wird ein Triplet mit Wiederholungen über `0` nur für eine Erinnerung akzeptiert, die die Liste schon hatte, innerhalb der Grenzen von [Wiederkehrende Erinnerungen](/docs/reminders/#repeating-reminders).

**Diese Erinnerungen lassen sich nicht speichern**, und die Nachricht nennt die Aufgabe, die du korrigieren musst:

- eine Erinnerung an einer Aufgabe **ohne Besitzer**: Erinnerungen gehen an den Besitzer, siehe [Besitzer: die Erwähnung mit einem Doppelpunkt](#owners-the-mention-with-a-colon);
- eine Erinnerung **ohne Datum** und mit Abstand null, etwa `[0m,0m,0]` allein: Ihr einziger Termin wäre der Moment des Speicherns, schon vorbei;
- eine Erinnerung, die **sich nicht lesen lässt**: eine zu große Zahl, etwa `[1h,1d,99999999999]`.

**Eine schlecht geschriebene Erinnerung bekommt einen Pfeil**, wie eine Zeile ohne Strich. TTM rät nicht, welche du gemeint hast:

- zwei Daten oder zwei Triplets in einer Zeile;
- ein Datum ohne sein Triplet oder eine Erinnerung ohne Aufgabentext;
- ein Datum, das es nicht gibt, etwa `2026-02-30 10:00`;
- ein Datum in anderer Form, etwa `30/11/2026 18:00`.

Diese Prüfungen betreffen nur die Zeilen, die du änderst. Schreibst du die ganze Liste neu, werden die Zeilen geprüft, die du hinzufügst oder änderst, und der Text einer einzelnen Aufgabe prüft diese Aufgabe. Eine neue Liste, ein Klon und ein Import prüfen jede Zeile.

## Webhooks im Text

Der Button **Webhook** verknüpft einen Webhook für dich mit einer Aufgabe: Siehe [Webhooks](/docs/webhooks/). Im Text ist die Verknüpfung ein reserviertes Token vor dem Text der Aufgabe:

```
- [] {{wb=deploy}} Die Versionshinweise veröffentlichen
```

Du kannst es verschieben, auf eine andere Aufgabe kopieren oder löschen, wie eine Erwähnung. Das Token erscheint nie in der Liste. Eine Aufgabe mit dem Token braucht auch etwas Text.

`wb` ist der einzige reservierte Schlüssel. Jedes andere `{{schluessel=wert}}` im Text einer Aufgabe ist eine **freie Variable**, die der Webhook nutzen kann: Siehe [Tokens](/docs/config-webhook/#tokens).

## Die Codes hinter den Namen

Discord speichert **IDs**, keine Namen: lange Zahlen, die sich nie ändern. Hinter jedem Namen im Text steht ein Code, und die Liste behält die Codes, in ihrer Nachricht, ihren Benachrichtigungen und der Datei von Herunterladen.

| Im Text | Der Code dahinter |
| :--- | :--- |
| `@Ava` | `<@123456789012345678>` |
| `@Moderatoren` | `<@&987654321098765432>` |
| `#allgemein` | `<#111222333444555666>` |
| `2026-12-08 18:00` in UTC, vor einem Triplet | `<t:1796752800>`, das Datum in Sekunden |

Du kannst die Codes weiterhin schreiben oder einfügen: TTM speichert sie, wie sie sind. Eine Datei von Herunterladen oder ein Text, der vor den Namen geschrieben wurde, funktioniert unverändert.

Ändert jemand seinen Namen auf Discord, zeigt das Formular den neuen. Nichts Gespeichertes geht kaputt, weil die Liste die ID behält.

In einigen Fällen bleibt ein Code im Text:

- zwei Rollen mit demselben Namen oder zwei Kanäle mit demselben Namen: Die Codes unterscheiden sie;
- eine Person, deren Namen Discord beim Öffnen des Formulars nicht rechtzeitig geschickt hat. Lass den Code, wie er ist: Die Erwähnung bleibt.

## Alles zusammen

Eine einzelne Aufgabe kann all das verbinden:

```
- @Ava: Die Versionshinweise in #releases prüfen, @Moderatoren anpingen, wenn fertig — Fragen an [den Verantwortlichen für die Version](mailto:release@example.com)
```

## Wenn der Text sich nicht speichern lässt

Kann TTM eine Zeile nicht lesen, zeigt es deinen Text zurück, mit einem **Pfeil** an jeder falschen Zeile, von einer Zeile ohne Strich bis zu einer schlecht geschriebenen Erinnerung. Die Nachricht sagt, was du schreiben sollst, und verlinkt auf den Teil dieser Seite, der es erklärt.

Sonst **listet eine Nachricht jedes Problem auf einmal auf**, eines pro Absatz: eine zu lange Liste, eine Erinnerung über einer Grenze oder ohne Besitzer. Behebe sie alle und speichere erneut.

Eine Erinnerung, deren Termine alle in der Vergangenheit liegen, stoppt das Speichern nicht: Sie bleibt an ihrer Aufgabe. Siehe [Eine Erinnerung an der Aufgabe lesen](/docs/reminders/#reading-a-reminder-on-the-task).

Zwei weitere Fälle speichern nichts, und TTM sagt es dir:

- TTM erreicht beim Speichern den Server auf Discord nicht: Versuche es gleich noch einmal;
- ein Formular, das mehr als sechs Stunden offen war, kann seine Namen nicht zurücklesen: Öffne es erneut aus der Liste.
