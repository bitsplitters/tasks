---
title: "Besitzer und Tags"
description: "Wem eine Aufgabe gehört, wen sie erwähnt und welche Rollen TTM erstellt, wenn mehrere Personen eine Aufgabe besitzen."
fonte: 32af5b22a9d3
---

Eine Aufgabe kann einen **Besitzer** und mehrere **Tags** haben. Der Besitzer ist, wem die Aufgabe gehört: wer sie abhaken darf und wer ihre Erinnerung bekommt. Tags sind die Benutzer und Rollen, die an der Aufgabe erwähnt werden, zum Beispiel die Personen, die bei ihrem Abschluss benachrichtigt werden sollen.

Beides stellst du mit den Buttons **Besitzer** <img class="inline-ic" src="/icons/owner.png" alt="" /> und **Tag** <img class="inline-ic" src="/icons/tag.png" alt="" /> ein: im Kanal in der zweiten Reihe unter der Liste, in der Activity im Panel einer Aufgabe.

<div class="howto" id="how-to-do-it"><div class="howto-t">So geht's</div><div class="howto-grid"><a class="howto-go is-channel" href="/docs/channel-tasks/#owner"><span class="howto-k"><img class="place-ic" src="/icons/posto-canale.svg" alt="" />Im Kanal</span><span class="howto-d">Besitzer und Tag, in der zweiten Reihe unter der Liste.</span></a><a class="howto-go is-activity" href="/docs/activity-list/#owner"><span class="howto-k"><img class="place-ic" src="/icons/activity.png" alt="" />In der Activity</span><span class="howto-d">Besitzer und Tag, im Panel einer Aufgabe.</span></a></div></div>

## Besitzer: eine Person, eine Rolle oder mehrere Personen

Der Besitzer ist, wem eine Aufgabe gehört: wer sie abhaken darf und wer ihre Erinnerung bekommt. Das kann sein:

- **Eine Person**: Sie besitzt die Aufgabe, und ihre Erinnerung erreicht sie per Direktnachricht.
- **Eine Rolle**: Alle mit dieser Rolle besitzen die Aufgabe, und jede dieser Personen kann sie abhaken. Die Erinnerung ist eine Nachricht im Kanal der Liste, die die Rolle erwähnt.
- **Mehrere Personen**: TTM erstellt eine Rolle für sie und macht sie zum Besitzer. Das ist eine [Premium](/docs/premium/)-Funktion.

Du kannst Personen und Rollen nicht mischen und höchstens eine Rolle wählen: Eine Aufgabe hat einen Besitzer.

**Eine Aufgabe für mehrere Personen** funktioniert wie eine Aufgabe, die einer Rolle gehört. Die Rolle heißt TTM1, TTM2 und so weiter, und nur die Personen, die du gewählt hast, haben sie. TTM braucht die Berechtigung *Rollen verwalten*, um sie zu erstellen: siehe [Die Rollen, die TTM erstellt](#the-roles-ttm-creates).

**Um eine Aufgabe selbst zu übernehmen**, im Kanal: Klicke auf **Besitzer**, bis der Button blau wird, und wähle dann die Aufgabe, ohne jemanden auszuwählen. Das funktioniert bei einer Aufgabe ohne Besitzer. Eine Aufgabe, die schon einen hat, ändert sich nur, wenn du im Menü dich selbst auswählst: siehe [Besitzer](/docs/channel-tasks/#owner).

**Wer eine Aufgabe von jemand anderem bekommt, wird erwähnt**, und zwar in der Benachrichtigung im Kanal, sodass Discord ihn benachrichtigt: eine Person oder alle in der Rolle. In der Activity kommt die Erwähnung mit der Zusammenfassung am Ende der Sitzung.

**Wenn du den Besitzer entfernst, verschwindet auch seine Erinnerung**, weil niemand mehr da ist, der sie bekommt. Ist die Erinnerung noch nicht ausgelöst, bittet TTM dich vorher um Bestätigung.

Wie die Erinnerung eine Person oder eine Rolle erreicht: siehe [Wie die Erinnerung ankommt](/docs/reminders/#how-the-reminder-arrives). Wer eine Aufgabe mit Besitzer abhaken darf: siehe [Wer eine Aufgabe abhaken darf](/docs/core-concepts/#who-can-tick-a-task).

## Tags

Ein Tag ist ein Benutzer oder eine Rolle, die an der Aufgabe erwähnt wird. Eine Aufgabe kann **bis zu 25 Tags** tragen, Personen und Rollen zusammen. Tags ändern nicht, wer die Aufgabe abhaken darf: Sie sagen, wer davon wissen soll.

Eine neue Auswahl von Tags **ersetzt** die alte: Die Aufgabe trägt genau die Personen und Rollen, die du gewählt hast. Um jemanden hinzuzufügen, behalte die anderen in deiner Auswahl. Entfernst du die Tags, verschwinden alle auf einmal.

Wie du sie wählst, unterscheidet sich ein wenig zwischen den beiden Orten. Im Kanal entscheidet eine Einstellung des Servers, ob du die Tags überschreibst oder live bearbeitest: siehe [Tag](/docs/channel-tasks/#tag). In der Activity gehst du immer von den Tags aus, die die Aufgabe jetzt hat: siehe [Tag](/docs/activity-list/#tag).

**Dich selbst taggen** geht an beiden Orten mit einem Klick, die anderen Tags bleiben, wie sie sind. Im Kanal **Tag** blau und die Aufgabe, bei leerem Menü: Ein zweites Mal auf derselben Aufgabe entfernt dich wieder. In der Activity **Tag** und **Speichern**: Dein Name ist schon hinzugefügt.

Im Text einer Liste ist ein Tag `@` und der Name, etwa `@Ava`, und der Besitzer ist derselbe Name gefolgt von einem Doppelpunkt, `@Ava:`: siehe [Eine Liste von Hand bearbeiten](/docs/writing-a-list/#owners-the-mention-with-a-colon).

## Die Rollen, die TTM erstellt

Dieser Teil ist für alle, die den Server verwalten: was TTM mit den Rollen macht, die es für Aufgaben mehrerer Personen erstellt, was es dafür braucht und wann es sie löscht.

Wenn du eine Aufgabe mehreren Personen gibst, macht TTM Folgendes:

- Es erstellt eine Rolle namens **TTM** gefolgt von der ersten freien Nummer: TTM1, TTM2 und so weiter. Die Rolle ist **erwähnbar**, hat **keine Berechtigungen** und steht ganz unten in der Rollenliste;
- es gibt die Rolle den gewählten Personen, eine nach der anderen;
- es macht die Rolle zum Besitzer der Aufgabe.

### Was es braucht

Der Bot braucht die Berechtigung *Rollen verwalten*, und der Einladungslink enthält sie. Ohne sie erstellt und löscht TTM keine Rollen. Wurde der Bot einem Server früher hinzugefügt, muss ein Admin sie eventuell der Rolle des Bots geben. Mach das in *Servereinstellungen → Rollen*, nicht in einem Kanal.

In einem Kanal zeigt Discord dieselbe Berechtigung als *Berechtigungen verwalten*. Dort bewirkt sie etwas anderes: Sie erlaubt einer Rolle, die Berechtigungen dieses Kanals zu ändern.

Ein Server kann höchstens **250 Rollen** haben: Das ist eine Grenze von Discord. Erreicht der Server sie, kann TTM die Rolle nicht erstellen und sagt das.

Auch das Vergeben der Rolle braucht Zeit. Discord erlaubt einem Bot, das zehnmal alle zehn Sekunden zu tun, also brauchen 25 Personen etwa zwanzig Sekunden. Bei mehr als zehn Personen sagt dir TTM, wie lange es dauert.

### Wann TTM eine neue Rolle erstellt

**TTM ändert eine Rolle nie, nachdem es sie erstellt hat.**

- Wählst du andere Personen, auch nur eine mehr oder weniger, wird eine neue Rolle erstellt.
- Wählst du genau dieselben Personen wie beim aktuellen Besitzer, ändert sich nichts.
- Ist im Kanal **Zustand nach der Auswahl beibehalten** eingeschaltet, nutzt dieselbe Auswahl bei mehreren Aufgaben hintereinander die Rolle weiter, die für die erste Aufgabe erstellt wurde.

### Wann eine Rolle nicht mehr TTM gehört

TTM merkt sich die Rollen, die es erstellt, und die Personen, denen es sie gegeben hat. Eine Rolle bleibt nur so lange die von TTM, wie sie so aussieht, wie TTM sie hinterlassen hat:

- derselbe Name;
- keine Berechtigungen, weder auf dem Server noch in einem Kanal;
- dieselbe Anzahl an Mitgliedern.

Benenne sie um, gib ihr eine Berechtigung, nimm sie in die Berechtigungen eines Kanals auf oder füge ein Mitglied hinzu oder entferne eines: Dann wird sie eine Rolle deines Servers.

TTM prüft das, bevor es eine Rolle löscht, und wenn es den Besitzer einer Aufgabe zum Ändern anzeigt. Eine Rolle, die nicht mehr TTM gehört, wird nie gelöscht, und die Besitzerauswahl zeigt die Rolle statt der Personen.

Um eine Rolle für deinen Server zu behalten, **benenne sie also um**. Dann kannst du sie überall verwenden. Eine neue Farbe oder eine neue Position reicht nicht: TTM würde die Rolle trotzdem löschen, wenn keine Liste sie mehr nutzt.

TTM sieht, *wie viele* Mitglieder eine Rolle hat, aber nicht, *wer* sie sind. Tauschst du also ein Mitglied gegen ein anderes, merkt TTM das nicht: Es zeigt weiter die Personen an, denen es die Rolle gegeben hat.

### Wann TTM eine Rolle löscht

TTM löscht eine Rolle, die es erstellt hat, auch vom Server, wenn beides zutrifft:

- **keine Liste nutzt sie mehr**, weder als Besitzer noch als Tag, und keine Befehlsberechtigung nutzt sie;
- sie sieht noch aus wie die von TTM.

TTM prüft alle zehn Minuten und fasst nie eine Rolle an, die vor weniger als zehn Minuten erstellt wurde. Manche Rollen bleiben immer:

- die Rollen einer **versiegelten** Liste, weil die versiegelte Nachricht sie noch anzeigt;
- alle Rollen, die TTM erstellt hat, wenn der Bot von einem Server **entfernt** wird.
