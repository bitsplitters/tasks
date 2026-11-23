---
title: "Die Liste im Kanal"
description: "Die Nachricht der Liste in einem Discord-Kanal: das Abhak-Menü, die erste Button-Reihe, Mehr und was passiert, während jemand sie bearbeitet."
fonte: 6656d50714c3
---

Sobald eine Liste existiert, zeigt TTM darunter ein **Abhak-Menü** und **zwei Reihen Buttons**. Fast nichts hier braucht einen Befehl: Du klickst einfach. Die erste Reihe wirkt auf die ganze Liste und wird hier erklärt. Die zweite wirkt auf eine einzelne Aufgabe: Siehe [Eine Aufgabe im Kanal bearbeiten](/docs/channel-tasks/).

## Unter der Liste

Die Liste endet mit einem dünnen **Fortschrittsbalken**: dem Anteil der abgehakten Kästchen, Aufgaben und Unteraufgaben zusammen, in Schritten von 5 %. Er bewegt sich, sobald ein Kästchen abgehakt wird, und ist nur voll, wenn alle es sind. Eine versiegelte Liste behält ihn und zeigt, wo die Liste aufgehört hat.

Über dem Balken hilft eine kleine Zeile allen, die neu sind: *Du weißt nicht, was die Buttons machen? Mehr → Anleitung*. Die **Anleitung** in [Mehr](#whats-inside-more) erklärt jeden Button, ohne Discord zu verlassen. Braucht dein Team sie nicht, blende die **Tipps** in [/config app](/docs/configuration/#tips) aus: Die Zeile verschwindet, der Balken bleibt. Solange die Liste gesperrt ist, sagt dieselbe Zeile, wer sie bearbeitet und wie man sie entsperrt, auch bei ausgeblendeten Tipps: Siehe [Wenn die Liste gesperrt ist](#when-the-list-is-locked).

Solange die Liste in der [Activity](/docs/activity/) ist, sagt die Zeile es, und **Activity beitreten** ist der einzige Button unter der Liste.

## Das Abhak-Menü

Über den Buttons sitzt das **Abhak-Menü**: das Dropdown-Menü, das den Titel der Liste zeigt. Eine Liste mit mehr als 25 Aufgaben hat zwei Menüs, jedes beschriftet mit der Position seiner letzten Aufgabe. Damit kannst du:

1. **Aufgaben als erledigt oder offen markieren**: Hake eine Aufgabe ab, um sie abzuschließen, nimm den Haken weg, um sie wieder zu öffnen. Ihr Kästchen zeigt <img class="inline-ic" src="/icons/checkbox_empty.png" alt="" /> oder <img class="inline-ic" src="/icons/checkbox_marked.png" alt="" />.
2. **Die Aufgabe wählen, auf die ein aktiver Button wirkt** (siehe [die zweite Reihe](/docs/channel-tasks/#the-second-row)).

Eine Gruppe abzuhaken oder den Haken wegzunehmen, macht dasselbe mit ihren Unteraufgaben. Alle ihre Unteraufgaben abzuschließen schließt die Gruppe ab. Eine Aufgabe mit Besitzer können nur ihr Besitzer und alle mit *Nachrichten verwalten* im Kanal abhaken: Siehe [Wer eine Aufgabe abhaken darf](/docs/core-concepts/#who-can-tick-a-task). Eine Ablehnung erreicht nur die Person, die die Aufgabe gewählt hat.

<div class="callout"><div class="callout-t">Lass die Aufgaben-Buttons aus</div>Um Aufgaben abzuhaken oder den Haken wegzunehmen, muss <strong>jeder Button der zweiten Reihe aus sein</strong>. Ist ein Aufgaben-Button aktiv (blau oder rot), wendet die Auswahl einer Aufgabe diese Aktion an, statt sie abzuhaken.</div>

## Reihe 1: wirkt auf die ganze Liste

Diese Buttons berühren nie eine einzelne Aufgabe: Sie wirken auf die **ganze Liste**. Was jede Aktion tut, an beiden Orten: [Aktionen auf der Liste](/docs/list-actions/).

| Button | Was er tut |
| :--- | :--- |
| **Activity** <img class="inline-ic" src="/icons/activity.png" alt="" /> | Öffnet die Liste in der Activity, einem Fenster in Discord, in dem du gemeinsam mit anderen daran arbeitest. Siehe [Die Activity](/docs/activity/). |
| **Sammelbearbeitung** <img class="inline-ic" src="/icons/edit.png" alt="" /> | Bearbeitet den Titel und die ganze Liste als Text, in einem Formular. Für eine einzelne Aufgabe nutze die [zweite Reihe](#row-2--acts-on-a-single-task). Siehe [Sammelbearbeitung](#bulk-update). |
| **Liste bereinigen** <img class="inline-ic" src="/icons/clean.png" alt="" /> | Entfernt nach einer Bestätigung jede erledigte Aufgabe. |
| **Alle wieder öffnen** <img class="inline-ic" src="/icons/reopen.png" alt="" /> | Setzt jede erledigte Aufgabe wieder auf offen. Du kannst auch ihre Erinnerungen auf ein neues Datum verschieben. |
| **Mehr** <img class="inline-ic" src="/icons/other.png" alt="" /> | Öffnet ein Panel mit den Aktionen, die du seltener brauchst: die Anleitung in Discord und Klonen, Herunterladen, Versiegeln oder Löschen der Liste. Wenn die Liste gesperrt ist, entsperrst du sie hier. |

### Sammelbearbeitung

**Sammelbearbeitung** öffnet ein Formular mit dem Titel und der ganzen Liste als Text: eine Zeile pro Aufgabe, im Format, das unter [Eine Liste von Hand bearbeiten](/docs/writing-a-list/) erklärt wird. Ändere, was du brauchst, und sende ab.

- Personen, Rollen und Kanäle erscheinen mit Namen und Erinnerungsdaten in deiner Zeitzone.
- Eine Zeile unter dem Text sagt, wie man jemand Neuen hinzufügt: Siehe [Personen, Rollen und Kanäle mit Namen](/docs/writing-a-list/#people-roles-and-channels-by-name).
- Solange das Formular offen ist, ist die Liste für alle anderen gesperrt: Siehe [Wenn die Liste gesperrt ist](#when-the-list-is-locked).

Hat sich die Liste geändert, während du sie bearbeitet hast, fragt TTM dich, was zu tun ist, bevor es speichert: Siehe [Wenn sich die Liste ändert, während du sie bearbeitest](#when-the-list-changes-while-you-edit-it). Lässt sich der Text nicht speichern, zeigt TTM ihn dir mit allen Problemen wieder an: Siehe [Wenn der Text sich nicht speichern lässt](/docs/writing-a-list/#when-the-text-cant-be-saved).

### Liste bereinigen

Ein Bestätigungsfenster sagt dir, wie viele Aufgaben gehen und was mit ihnen geht. Sende es ab, um zu bestätigen, oder schließe das Fenster, um abzubrechen. Was Bereinigen entfernt und was es behält: [Bereinigen](/docs/list-actions/#clean).

### Alle wieder öffnen

Der Bot fragt dich in einer Nachricht, die nur du sehen kannst: **Wieder öffnen**, **Neues Datum** oder **Abbrechen**. **Neues Datum** öffnet das Fenster **Wann**, dasselbe wie bei einer [Erinnerung](/docs/channel-tasks/#reminder): Wähle das Datum, auf das die erste Erinnerung verschoben wird. Was Alle wieder öffnen ändert: [Alle wieder öffnen](/docs/list-actions/#reopen-all).

Sperrt oder versiegelt jemand die Liste, bevor du bestätigst, ändert sich nichts: Siehe [Wenn die Liste gesperrt ist](#when-the-list-is-locked).

### Was in Mehr steckt

Discord erlaubt fünf Buttons pro Reihe, deshalb stehen die Aktionen, die du seltener brauchst, in einem Panel, das nur du sehen kannst:

- **Liste entsperren** <img class="inline-ic" src="/icons/unlock.png" alt="" />: nur solange die Liste gesperrt ist. Es zeigt, wer sie bearbeitet, und schaltet die Buttons der Liste für alle wieder ein. Siehe [Wenn die Liste gesperrt ist](#when-the-list-is-locked).
- **Anleitung** <img class="inline-ic" src="/icons/doc.png" alt="" />: die kurze Anleitung in Discord, mit einem Link zurück zu dieser Dokumentation.
- **Liste klonen** <img class="inline-ic" src="/icons/clone.png" alt="" />: klont die Liste in einen anderen Kanal, auch wenn die Liste gesperrt ist. Siehe [Klon-Optionen](#clone-options).
- **Herunterladen** <img class="inline-ic" src="/icons/download.png" alt="" />: eine `.txt`-Datei der Liste, **nur an dich** gesendet. Siehe [Herunterladen](/docs/list-actions/#download).
- **Liste versiegeln** <img class="inline-ic" src="/icons/seal.png" alt="" />: behält eine fertige Liste als Protokoll im Kanal, ohne Buttons oder Menüs. Siehe [Versiegeln](/docs/list-actions/#seal).
- **Liste löschen** <img class="inline-ic" src="/icons/delete.png" alt="" />: löscht die Liste **endgültig**. Siehe [Löschen](/docs/list-actions/#delete).

Versiegeln und Löschen lassen sich nicht rückgängig machen und der Bot bittet dich vorher um Bestätigung. Beide brauchen *Nachrichten verwalten* im Kanal: dieselbe Berechtigung, mit der du die Nachricht der Liste von Hand löschen könntest. Ohne sie fehlen diese zwei Einträge. Anleitung, Liste klonen und Herunterladen gibt es für alle, ebenso Liste entsperren, wenn die Liste gesperrt ist.

Solange die Liste gesperrt ist, fehlen Liste versiegeln und Liste löschen. Wer gerade bearbeitet, würde auf eine Liste speichern, die es nicht mehr gibt.

### Klon-Optionen

Wenn du in **Mehr** **Liste klonen** drückst, ersetzen die Klon-Steuerelemente die erste Reihe unter der Liste und das Panel verlinkt dich auf die Liste:

- **Liste erstellen**: startet das Klonen in den Kanal, den du im Dropdown gewählt hast.
- **Auswahloption**: behält die Haken im Klon oder nicht.
- **Erinnerungsoption**: behält die Erinnerungen im Klon oder nicht.
- **Verlassen**: geht zum Listen-Panel zurück, wie es war. Hat jemand die Liste bearbeitet, bleibt sie gesperrt.

Das Dropdown bietet Textkanäle und Sprachkanäle an. Was ein Klon behält und die Grenzen deines Tarifs: [Klonen](/docs/list-actions/#clone).

## Reihe 2: wirkt auf eine einzelne Aufgabe

Die zweite Reihe hat fünf Buttons (Inhalt, Besitzer, Tag, Erinnerung und Webhook) und jeder ist ein Schalter mit drei Zuständen: aus, bearbeiten oder löschen. Schalte einen ein und wähle dann die Aufgabe. Jeder Button, seine Formulare und seine Menüs: [Eine Aufgabe im Kanal bearbeiten](/docs/channel-tasks/).

## Wenn die Liste gesperrt ist

TTM sperrt die Liste, solange jemand sie bearbeitet:

- in der **Sammelbearbeitung**;
- im Formular für den Text einer Aufgabe;
- in einem Erinnerungsformular.

Für alle anderen gehen dann aus: das Abhak-Menü, der Activity-Button, **Sammelbearbeitung**, **Liste bereinigen**, **Alle wieder öffnen** und die Aufgaben-Buttons. **Mehr** bleibt an, mit **Liste klonen** darin. **Mehr** zeigt, wer bearbeitet, und eine gesperrte Liste lässt sich von dort nicht versiegeln oder löschen.

Auch die letzte Zeile der Liste sagt es: *🔒 @name bearbeitet gerade die Liste. Bleibt sie gesperrt? Mehr → Liste entsperren*. Sie tritt an die Stelle der Tipps-Zeile und erscheint auch, wenn dein Server die Tipps ausblendet. Die Erwähnung zeigt den Namen und benachrichtigt niemanden. Wenn die Liste entsperrt wird, kommt die Tipps-Zeile zurück, falls dein Server sie zeigt.

Die Liste zu sperren schaltet auch **Besitzer**, **Tag** und **Webhook** aus, wenn einer davon an war: Öffne ihn über seinen Button neu, wenn du ihn brauchst.

Das Formular zu speichern entsperrt die Liste. Es mit **Abbrechen** oder mit dem ✕ zu schließen entsperrt sie nicht, weil Discord es dem Bot nicht mitteilt: **Sammelbearbeitung** und das Formular für den Text einer Aufgabe sagen es in ihrer letzten Zeile. Dann kann jeder die Liste entsperren: Öffne **Mehr** und drücke **Liste entsperren** <img class="inline-ic" src="/icons/unlock.png" alt="" />.

Ein Admin kann eine gesperrte Liste trotzdem über [`/config lists`](/docs/config-lists/) versiegeln, löschen oder regenerieren. Passiert das, während du bearbeitest, wird deine Änderung nicht gespeichert. Der Bot sagt es dir und gibt dir den Text zurück, den du geschrieben hast.

### Wenn sich die Liste ändert, während du sie bearbeitest

Jemand hat vielleicht eine Aktion begonnen, bevor du die Liste gesperrt hast: eine Erinnerung oder den Text einer Aufgabe. Wenn die Person fertig ist, wird ihre Änderung übernommen, aber die Liste bleibt für dich gesperrt. **Mehr** sagt dann, wer sie in der Zwischenzeit aktualisiert hat.

Wenn du die **Sammelbearbeitung** speicherst, prüft TTM, ob die Liste noch die ist, die du geöffnet hast. Hat sie sich geändert, wird noch nichts gespeichert. Eine Nachricht, die nur du sehen kannst, sagt es, zeigt den Text, den du geschrieben hast, und bietet drei Möglichkeiten an:

- **Überschreiben**: speichert deinen Text. Die Aktualisierungen, die in der Zwischenzeit gemacht wurden, gehen verloren.
- **Neu laden**: öffnet die **Sammelbearbeitung** mit der aktualisierten Liste wieder. Dein Text bleibt in der Nachricht, zum Kopieren.
- **Abbrechen**: lässt die Liste, wie sie ist, mit den Aktualisierungen, und entsperrt sie.

Wird die Liste gesperrt oder versiegelt, bevor du Bereinigen oder Wieder öffnen bestätigst, ändert sich nichts. Der Bot sagt es dir: *Diese Liste lässt sich gerade nicht ändern: Jemand bearbeitet sie, oder sie wurde versiegelt.*

## Wie es weitergeht

- [Eine Aufgabe im Kanal bearbeiten](/docs/channel-tasks/): die zweite Reihe, also Inhalt, Besitzer, Tags, Erinnerung und Webhook.
- [Die Activity](/docs/activity/): gemeinsam an einer Liste arbeiten, in einem Fenster in Discord.
- [Eine Liste von Hand bearbeiten](/docs/writing-a-list/): Erwähnungen, Besitzer, Links und Erinnerungen im Text der Sammelbearbeitung.
- [/config app](/docs/configuration/): Benachrichtigungen, Verlauf und Berechtigungen steuern.
- [FAQ](/docs/troubleshooting/#in-the-channel): schnelle Antworten auf die häufigsten Probleme.
