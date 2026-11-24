---
title: "Erinnerungen"
description: "Hänge einer Aufgabe einen Zeitplan an, damit TTM ihren Besitzer rechtzeitig erinnert: wer sie bekommt, Zeitzonen, Wiederholungen."
fonte: 6ce351a678ab
---

Eine Erinnerung macht aus einer Aufgabe etwas, das *dich* erinnert, statt umgekehrt. Du setzt sie einmal, und TTM kümmert sich um die Pings. Du fügst eine mit **Erinnerung** <img class="inline-ic" src="/icons/alertW.png" alt="" /> hinzu: im Kanal in der zweiten Reihe unter der Liste, in der Activity im Panel einer Aufgabe.

<div class="howto" id="how-to-do-it"><div class="howto-t">So geht's</div><div class="howto-grid"><a class="howto-go is-channel" href="/docs/channel-tasks/#reminder"><span class="howto-k"><img class="place-ic" src="/icons/posto-canale.svg" alt="" />Im Kanal</span><span class="howto-d">Erinnerung, in der zweiten Reihe unter der Liste: das Formular Wann und die Zusammenfassungskarte.</span></a><a class="howto-go is-activity" href="/docs/activity-list/#reminder"><span class="howto-k"><img class="place-ic" src="/icons/activity.png" alt="" />In der Activity</span><span class="howto-d">Erinnerung, im Panel einer Aufgabe: Datum, Uhrzeit, Zeitzone und Wiederholungen zusammen.</span></a></div></div>

## Die Regeln

- **Eine Erinnerung hat ein Datum, eine Uhrzeit und eine Zeitzone.** Sie löst **einmal** aus, außer dein Server nutzt [wiederkehrende Erinnerungen](#repeating-reminders), eine Premium-Funktion.
- **Der Start muss mindestens 5 Minuten in der Zukunft liegen.** Das Formular beginnt bei zehn Minuten ab jetzt: Für eine Erinnerung „gleich“ musst du also nichts tippen.
- **Nur eine Aufgabe, die noch zu erledigen ist, kann eine bekommen.** Eine Aufgabe abzuschließen stoppt ihre Erinnerung, du musst danach nichts aufräumen.
- **Die Erinnerung geht an den Besitzer der Aufgabe**, per Direktnachricht, wenn der Besitzer eine Person ist. Hat die Aufgabe noch keinen Besitzer, **wirst du es**, wenn du die Erinnerung speicherst.

  Von da an können nur du und alle mit *Nachrichten verwalten* im Kanal diese Aufgabe abhaken. Um sie jemand anderem zu geben, setze den Besitzer vor oder nach dem Erstellen der Erinnerung: Siehe [Besitzer und Tags](/docs/owners-and-tags/).
- **Nichts ändert sich, bis du speicherst.** Wenn du eine Erinnerung bearbeitest, bleibt Speichern aus, bis du das Datum oder die Wiederholung änderst.
- **Wer den Besitzer entfernt, entfernt die Erinnerung**, weil niemand sie mehr bekommen würde.

Ist nichts angekommen? Der Besitzer muss Direktnachrichten von Mitgliedern dieses Servers annehmen: Siehe [Erinnerungen per Direktnachricht](/docs/known-limits/#reminders-by-direct-message).

## Deine Zeitzone

TTM braucht den offiziellen Namen einer Zeitzone wie `Europe/Rome`. Den Namen deiner Zone findest du auf der **[Zeitzonenkarte](https://timezones.bitsplitters.app)**: Wähle dein Gebiet auf der Karte, kopiere den Wert und füge ihn ins Feld ein. In der Activity kannst du auch nach Stadt oder Land suchen.

<div class="callout"><div class="callout-t">Wähle deine Zeitzone</div>Nutze <a href="/docs/my-timezone/"><strong>/my timezone</strong></a> auf einem beliebigen Server oder das Zahnrad in der Activity, und TTM schlägt dir überall <strong>deine</strong> Zone vor, im Kanal und in der Activity. Bis du eine wählst, schlägt TTM die Zone deiner Discord-Sprache, deines Geräts oder des Servers vor, und die Zeile unter dem Feld sagt dir, welche. Eine andere Zone in einer Erinnerung gilt nur für dieses Datum. Erinnerungen, die du im Text einer Liste schreibst, nutzen dieselbe Zone.</div>

## Wie die Erinnerung ankommt

Wenn es so weit ist, erinnert TTM den Besitzer der Aufgabe. Die Erinnerung zeigt die Aufgabe, das Datum, für das sie fällig war, und einen Button, der direkt zur Liste springt.

- Ist der Besitzer eine **Person**, ist die Erinnerung eine **Direktnachricht**.
- Ist der Besitzer eine **Rolle**, ist sie eine **Nachricht im Kanal der Liste**, die die Rolle erwähnt, als Antwort auf die Liste. Discord benachrichtigt alle, die diese Rolle haben und den Kanal sehen können.

In beiden Fällen kommt sie **innerhalb von etwa zehn Sekunden** nach der geplanten Zeit an und immer in der richtigen Minute. TTM verteilt die Sendungen, um innerhalb der Grenzen von Discord zu bleiben. Sind die [Lesbaren Push-Benachrichtigungen](/docs/configuration/#readable-push-notifications) aus, kommt sie trotzdem an, aber ohne den Klartext, der die Vorschau auf dem Handy lesbar macht.

Eine Direktnachricht kann abgelehnt werden. Dann wartet TTM einige Stunden, bevor es diese Person noch einmal versucht: Siehe [Erinnerungen per Direktnachricht](/docs/known-limits/#reminders-by-direct-message).

### Du willst keine Erinnerungen per Direktnachricht?

Du entscheidest das in den Einstellungen von Discord:

- **Behalten, ohne Ping-Ton.** Klicke mit der rechten Maustaste auf deine Unterhaltung mit TTM und wähle *Stummschalten*. Die Erinnerungen kommen trotzdem an, lautlos.
- **Stoppen.** Klicke auf den Servernamen, dann auf *Datenschutzeinstellungen* und schalte *Direktnachrichten* aus. Das stoppt die Direktnachrichten von allen Mitgliedern dieses Servers, nicht nur von TTM.
- **Die Aufgabe abgeben.** Bitte jemanden, der die Liste verwaltet, die Aufgabe mit **Besitzer** <img class="inline-ic" src="/icons/owner.png" alt="" /> jemand anderem zu geben.

Den Server stummzuschalten reicht nicht: Das schaltet die Kanäle des Servers stumm, nicht deine Direktnachrichten.

Eine Rolle wird nur benachrichtigt, wenn sie erwähnt werden kann. Wann das der Fall ist und was bei @everyone oder einer gelöschten Rolle passiert: Siehe [Erinnerungen an eine Rolle](/docs/known-limits/#reminders-to-a-role).

## Wiederkehrende Erinnerungen

Standardmäßig ist jede Erinnerung ein **Einzelereignis**: ein Ping, nichts weiter zu entscheiden. Wiederholungen sind eine [Premium](/docs/premium/)-Funktion: Im Free-Tarif ist jede Erinnerung einmalig.

Bei einem Tarif, der sie enthält, sind sie trotzdem optional: Wer den Server verwaltet, schaltet **Wiederkehrende Erinnerungen** in [/config app](/docs/configuration/#recurring-reminders) ein. Bis dahin zeigt nur eine Erinnerung, die schon wiederkehrend ist, die Wiederholungsmenüs.

<div class="callout"><div class="callout-t">Wiederkehrende Erinnerungen, die du schon hast, funktionieren weiter</div>Eine Erinnerung, die schon wiederkehrend war, löst im Free-Tarif weiter aus und in Premium auch bei ausgeschaltetem Schalter: Du kannst ihr Datum ändern, sie auf eine andere Aufgabe verschieben oder die Zahl senken, wie oft sie ankommt, aber nicht erhöhen. Eine Liste zu klonen oder zu importieren erstellt neue Erinnerungen. Wo keine neuen wiederkehrenden Erinnerungen erstellt werden können, lehnen ein Klon oder ein Import eine wiederkehrende also ab: Klone ohne Erinnerungen oder setze ihre Wiederholungen auf <code>0</code>.</div>

### Die Wiederholungsfelder

Es gibt drei Menüs, im Kanal und in der Activity, also musst du nichts tippen und kannst kein Format falsch schreiben.

| Menü | Bedeutung | Auswahl |
| :--- | :--- | :--- |
| **Wie oft insgesamt** | Wie viele Pings die Erinnerung sendet, **den ersten eingeschlossen**. **1 Mal** ist eine einzelne Erinnerung. Das Maximum ist 50 mit Premium. Wo wiederkehrende Erinnerungen nicht wachsen können, im Free-Tarif oder bei ausgeschaltetem Schalter, hört das Menü bei der Zahl auf, die die Erinnerung schon hat, und das Formular sagt, warum. | 1 bis 10, dann 15 bis 50 in Schritten von 5 |
| **Alle** | Die Zeit zwischen zwei Pings, in der Einheit des nächsten Menüs. Bei **1 Mal** zählt sie nicht. | 1 bis 10, 12, 14, dann 15 bis 50 in Schritten von 5, 60 und 90 |
| **Einheit** | Minuten, Stunden oder Tage. Es gibt keine Wochen und keine Monate: Eine Woche sind 7 Tage. | Minuten, Stunden, Tage |

Beim Wechsel von einem Mal zu mehreren beginnt **Alle** bei 1 Tag. Die Menüs bieten immer die Werte an, die die Erinnerung schon hat, auch wenn sie nicht in der Liste stehen:

- Eine Erinnerung, die im Text einer Liste geschrieben wurde, kann 37 Mal auslösen oder alle 48 Stunden;
- eine, die schon öfter als 50 Mal auslöst, behält ihre Zahl;
- ein Intervall, das Einheiten mischt, wie `1d12h`, erscheint in seiner kleinsten Einheit, 36 Stunden: Lass **Alle** und **Einheit** so, wie sie sind, und es bleibt `1d12h`.

<div class="callout"><div class="callout-t">Sommerzeit: das Detail, auf das es ankommt</div>Im Menü <strong>Einheit</strong> behalten <strong>Tage</strong> dieselbe <strong>Uhrzeit</strong> auch bei der Zeitumstellung, zum Beispiel immer 09:00. <strong>Stunden</strong> sind <strong>exakt</strong>: Alle 24 Stunden kann nach der Zeitumstellung um eine Stunde verrutschen. Wähle die Einheit, die zu dem passt, was du meinst.</div>

## Eine Erinnerung an der Aufgabe lesen

In der Zeile der Aufgabe zeigt die Erinnerung immer das Datum des **ersten** Pings, von Discord in der Ortszeit jedes Lesenden dargestellt. Eine wiederkehrende Erinnerung fügt zwei kompakte Werte hinzu:

`↻` Intervall · `×` Anzahl insgesamt

`↻1h ×4` bedeutet also vier Pings, einen pro Stunde, den ersten eingeschlossen. Ein Einzelereignis zeigt **nur den Zeitstempel**: Es gibt kein Abzeichen, weil nichts zu wiederholen ist.

TTM entfernt nie von selbst eine Erinnerung. Eine Erinnerung, deren Pings alle **in der Vergangenheit** liegen, bleibt als Protokoll an ihrer Aufgabe. Sie sendet nichts mehr und zählt nicht zu den wartenden Erinnerungen. Um sie neu zu setzen, wähle ein neues Datum: Bis dahin bleibt Speichern aus.

Im Text einer Liste ist dieselbe Erinnerung ein Datum in deiner Zeitzone und ein Tripel, wie `2026-12-08 18:00 [0m,0m,0]`: Siehe [Erinnerungen im Text](/docs/writing-a-list/#reminders-in-the-text).

## Häufige Fehler

Mehrere davon kommen vom Formular **Wann** im Kanal, wo du Datum, Uhrzeit und Zone tippst. In der Activity wählst du sie aus Menüs, dort können sie also nicht falsch sein.

| Meldung | Was zu korrigieren ist |
| :--- | :--- |
| *Ungültige Erinnerung* | Der Start muss mindestens 5 Minuten in der Zukunft liegen. |
| *Eine abgeschlossene Aufgabe kann keine Erinnerung haben* | Entferne zuerst den Haken der Aufgabe, falls sie noch zu erledigen ist, oder wähle eine Aufgabe, die nicht abgehakt ist. |
| *Das Datum existiert nicht* | Prüfe Tag, Monat und Jahr zusammen (z. B. 31. Februar). |
| *Ungültige Uhrzeit* | Nutze das 24-Stunden-Format `HH:mm`, z. B. `15:30`. |
| *Über dem Tarif* oder *Über dem Erlaubten* | Wiederkehrende Erinnerungen sind hier nicht verfügbar: im Free-Tarif oder in `/config app` ausgeschaltet. Eine Erinnerung, die schon wiederkehrend war, kann die Zahl behalten, wie oft sie ankommt, oder sie senken. Das siehst du, wenn sich Tarif oder Einstellung geändert haben, während das Formular offen war: Öffne die Wiederholungen noch einmal. |
| *Falsche Zeitzone* | Der Name passt zu keiner offiziellen Zone: Kopiere ihn von der Zeitzonenkarte. |

Eine Erinnerung ist nicht angekommen oder etwas anderes ist schiefgegangen? Siehe die [FAQ](/docs/troubleshooting/#reminders).
