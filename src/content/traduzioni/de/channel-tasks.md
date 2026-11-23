---
title: "Eine Aufgabe im Kanal bearbeiten"
description: "Die zweite Reihe von Buttons unter der Liste — Inhalt, Besitzer, Tag, Erinnerung und Webhook — mit ihren Formularen und Menüs."
fonte: b7393a97a79d
---

Die zweite Reihe unter der Liste wirkt auf **eine Aufgabe auf einmal**: ihren Text, ihren Besitzer, ihre Tags, ihre Erinnerung und ihren Webhook. Diese Seite zeigt, wo du klickst. Was jede Funktion macht und welche Regeln gelten: [Besitzer und Tags](/docs/owners-and-tags/), [Erinnerungen](/docs/reminders/), [Webhooks](/docs/webhooks/).

## Die zweite Reihe

Jeder Button der zweiten Reihe ist ein **Schalter mit drei Zuständen**. Klicke ihn, um durch dieselben Farben zu wechseln, die Discord für seine Buttons nutzt:

- <span class="c-grey">Grau</span> — aus.
- <span class="c-blue">Blau</span> — aktiv im <span class="c-blue">Bearbeiten</span>-Modus.
- <span class="c-red">Rot</span> — aktiv im <span class="c-red">Löschen</span>-Modus.

Der Ablauf ist immer derselbe: **Schalte einen Button auf blau oder rot, dann wähle die Aufgabe** im [Abhak-Menü](/docs/the-task-list/#the-check-selector). TTM wendet die Aktion auf diese Aufgabe an. Solange ein Button blau oder rot ist, sagt das Menü, was passieren wird, zum Beispiel *Aufgabe bearbeiten* oder *Aufgabe löschen*; sind alle Buttons aus, sagt es *Aufgabe abhaken*: Wähle dort eine Aufgabe, um sie abzuhaken oder den Haken zu entfernen.

Bis du auf diese Weise einmal eine Aufgabe gewählt hast, schickt dir **Inhalt** oder **Erinnerung** auf blau oder rot eine Nachricht, die nur du siehst. Sie sagt, welche Aufgabe du wählen sollst und was ein erneutes Drücken des Buttons bewirkt. Hast du einmal bei eingeschaltetem Button der zweiten Reihe eine Aufgabe gewählt, hört die Nachricht auf, auf jedem Server.

| Button | <span class="c-blue">Blau (bearbeiten)</span> | <span class="c-red">Rot (löschen)</span> |
| :--- | :--- | :--- |
| [**Inhalt**](#content) <img class="inline-ic" src="/icons/task.png" alt="" /> | Den Text der Aufgabe in einem Formular ändern. | Die Aufgabe löschen. |
| [**Besitzer**](#owner) <img class="inline-ic" src="/icons/owner.png" alt="" /> | Den Besitzer festlegen oder ändern: eine Person oder eine Rolle. Mit [Premium](/docs/premium/) auch mehrere Personen. | Den Besitzer entfernen, und seine Erinnerung auch. |
| [**Tag**](#tag) <img class="inline-ic" src="/icons/tag.png" alt="" /> | Die Benutzer und Rollen festlegen, die benachrichtigt werden, mehrere auf einmal. | Alle Tags der Aufgabe entfernen. |
| [**Erinnerung**](#reminder) <img class="inline-ic" src="/icons/alertW.png" alt="" /> | Eine Erinnerung hinzufügen oder bearbeiten. | Die Erinnerung entfernen. |
| [**Webhook**](#webhook) <img class="inline-ic" src="/icons/api.png" alt="" /> <a class="premium-tag" href="/docs/premium/" title="Während der Beta für jeden Server freigeschaltet">Premium</a> | Einen Webhook mit der Aufgabe verknüpfen. | Den Webhook von der Aufgabe lösen. |

Ist **Besitzer**, **Tag**, **Erinnerung** oder **Webhook** rot, listet das Menü nur die Aufgaben, die etwas zum Entfernen haben: einen Besitzer, Tags, eine Erinnerung oder einen Webhook. Eine Aufgabe, die nur aus Tags besteht, wird nicht gelistet, da sie ohne sie keinen Text hätte. Hat keine Aufgabe etwas zum Entfernen, ist das Menü aus und sagt es, zum Beispiel *Kein Besitzer zum Entfernen*, und du bekommst einen Hinweis, wie du einen hinzufügst.

Nachdem du **Besitzer**, **Tag** oder **Erinnerung** benutzt hast, wird der Button wieder grau oder bleibt für die nächste Aufgabe an: Das entscheidet dein Server mit **Zustand nach der Auswahl beibehalten** im Menü **Verhalten** von [/config app](/docs/configuration/#keep-the-state-after-a-selection). Das Beibehalten des Zustands ändert, was Besitzer und Tag können: Siehe [Besitzer](#owner) und [Tag](#tag).

## Inhalt

**Blau** öffnet ein Formular mit dem Text der Aufgabe. Ihre Tags sind nicht im Formular: Sie bleiben an der Aufgabe, am Ende des Textes, und der Button **Tag** ändert sie.

- Zeilenumbrüche werden zu Leerzeichen, und Kanäle erscheinen mit Namen, wie in **Sammelbearbeitung**.
- Dort getippte Besitzer, Tags, Erinnerungen und Webhooks werden entfernt, und TTM sagt dir, was es entfernt hat: Sie haben ihre eigenen Buttons.
- Ein leer gelassener Text oder einer, der die Liste zu lang machen würde, wird nicht gespeichert.

Kanäle, Links und Emoji im Text: Siehe [Eine Liste von Hand bearbeiten](/docs/writing-a-list/).

Solange das Formular offen ist, ist die Liste für die anderen gesperrt. Speichern entsperrt sie; das ✕ nicht: Siehe [Wenn die Liste gesperrt ist](/docs/the-task-list/#when-the-list-is-locked).

**Rot** löscht die Aufgabe. Eine Gruppe mit Unteraufgaben zu löschen fragt dich vorher. Ihre Unteraufgaben bleiben an ihrem Platz: Sie schließen sich der Gruppe darüber an oder werden zu Aufgaben, wenn es keine gibt. Die letzte Aufgabe kannst du nicht löschen: Nimm **Liste löschen** oder **Liste versiegeln** unter [Mehr](/docs/the-task-list/#whats-inside-more).

## Besitzer

**Blau** zeigt unter den Buttons ein Menü mit der Beschriftung *Wähle eine Aufgabe im Menü oben, um sie zu übernehmen, oder wähle, wer sie bekommt*.

**Um eine Aufgabe zu übernehmen**, klicke **Besitzer**, bis er blau wird, und wähle dann die Aufgabe im Abhak-Menü, ohne jemanden auszuwählen: Sie wird deine, und der Kanal zeigt, wer sie übernommen hat. Eine Aufgabe, die schon dir gehört oder die jemand anderem gehört, bleibt, wie sie ist, und TTM sagt dir, warum. Um jemand anderem eine Aufgabe abzunehmen, wähle im Menü dich selbst, bestätige die Auswahl und wähle dann die Aufgabe: Einen Besitzer zu ersetzen braucht eine ausdrückliche Wahl.

**Um jemandem eine Aufgabe zu geben**, wähle den Besitzer im Menü, bestätige die Auswahl und wähle dann die Aufgabe. So gibst du eine Aufgabe mehreren Personen, eine [Premium](/docs/premium/)-Funktion:

1. Klicke **Besitzer**, bis er blau wird.
2. Wähle die Personen.
3. Bestätige die Auswahl: Tippe auf dem Handy auf **Speichern** oder klicke am Desktop außerhalb des Menüs (siehe [Eine Auswahl bestätigen](#confirming-a-selection--desktop-vs-mobile)).
4. Wähle die Aufgabe im Abhak-Menü.
5. TTM erstellt die Rolle (TTM1, TTM2…) und gibt sie ihnen.

**Wer die Aufgabe bekommt, erfährt davon.** Die Benachrichtigung im Kanal erwähnt den neuen Besitzer, sodass Discord ihn benachrichtigt: die Person oder alle in der Rolle. Wenn du eine Aufgabe selbst übernimmst, wird niemand erwähnt, weil du es schon weißt. Steht der [Benachrichtigungsmodus](/docs/configuration/#notification-mode) auf *Deaktiviert*, wird keine Benachrichtigung gepostet, wie bei jeder anderen Aktion.

Was ein Besitzer sein kann und welche Rollen TTM erstellt: [Besitzer und Tags](/docs/owners-and-tags/#owner-a-person-a-role-or-several-people).

Ist **Zustand nach der Auswahl beibehalten** an, bleibt **Besitzer** nach dem Übernehmen einer Aufgabe blau, und das Menü bleibt leer: Wähle die nächste Aufgabe, um auch sie zu übernehmen.

- Eine Aufgabe, die jemand anderem gehört, lädt stattdessen ihren Besitzer ins Menü; bei einer Rolle, die TTM erstellt hat, zeigt das Menü die Personen, denen es die Rolle gegeben hat.
- Jede Änderung, die du bestätigst, gilt sofort für diese Aufgabe.
- Leerst du das Menü, wird der Besitzer entfernt, und seine Erinnerung auch, wie im roten Modus.

Um wieder Aufgaben zu übernehmen, klicke **Besitzer**, bis er wieder blau ist.

**Rot** entfernt den Besitzer, und seine Erinnerung auch: Niemand ist mehr da, um sie zu erhalten. Wurde die Erinnerung noch nicht ausgelöst, bittet TTM dich vorher um Bestätigung.

## Tag

**Blau** zeigt unter den Buttons ein Menü. Standardmäßig wählst du dort bis zu 25 Benutzer oder Rollen, bestätigst die Auswahl (siehe [Eine Auswahl bestätigen](#confirming-a-selection--desktop-vs-mobile)) und wählst dann die Aufgabe:

- wählst du *Anna* und *@Devs*, ist die Aufgabe mit Anna und @Devs getaggt, sonst nichts: Deine Wahl **ersetzt** die Tags der Aufgabe;
- wähle die Personen **vor** der Aufgabe: Ist das Menü leer, bittet TTM dich, zuerst mindestens eine Person oder Rolle als Tag zu wählen.

**Rot** entfernt alle Tags der Aufgabe.

### Bei beibehaltenem Zustand — zwei Modi

Ist **Zustand nach der Auswahl beibehalten** im Menü **Verhalten** von [/config app](/docs/configuration/#keep-the-state-after-a-selection) an, bleibt der Button nach jeder Aufgabe blau. Was Tag dann macht, hängt davon ab, was du zuerst wählst:

- **Zuerst Personen** bedeutet **zuweisen**.
- **Zuerst die Aufgabe**, bei noch leerem Menü, bedeutet **Live-Bearbeitung**.

**Zuweisen — Personen wählen, dann die Aufgabe.** Die Tags der Aufgabe werden genau deine Wahl, wie oben. Deine Auswahl bleibt im Menü, sodass du denselben Satz auf die nächste Aufgabe und die übernächste anwenden kannst, ohne neu zu wählen.

**Live-Bearbeitung — Aufgabe wählen, Menü leer.** Schalte Tag auf blau und wähle die Aufgabe, die du neu taggen willst, ohne jemanden auszuwählen. Das ist kein Fehler: Die aktuellen Tags der Aufgabe werden ins Menü geladen, schon angehakt. Jetzt bearbeitest du diese Aufgabe direkt:

- jedes Mal, wenn du das Menü schließt, aktualisiert sich die Aufgabe sofort;
- nimmst du bei jemandem den Haken weg, verlässt er die Aufgabe; hakst du jemanden an, kommt er dazu;
- es gibt keinen Bestätigungsschritt, und nichts wird überschrieben: Du passt den bestehenden Satz an;
- nimm bei allen den Haken weg, um alle Tags zu entfernen.

Wählst du eine andere Aufgabe, wandert die Bearbeitung dorthin. Schalte Tag aus (grau), um aufzuhören: Die nächste Aktivierung beginnt neu.

### Eine Auswahl bestätigen — Desktop und Handy

Die Menüs **Tag** und **Besitzer** lassen dich mehrere auf einmal wählen. Diese Mehrfachauswahl-Menüs **übernehmen eine Wahl nicht, sobald du sie anhakst**: Sie warten, dass du die ganze Auswahl **bestätigst**. Einzelauswahl-Menüs, etwa das Abhak-Menü, übernehmen sofort beim Wählen. Wie du bestätigst, hängt vom Gerät ab:

- **Auf dem Handy** erscheint unter dem offenen Menü ein Button **Speichern**. Tippe darauf, um deine Auswahl zu übernehmen.
- **Am Desktop** gibt es **keinen Button Speichern**. **Klicke irgendwo außerhalb des Menüs**, um es zu schließen: Das Schließen des Menüs übernimmt deine Auswahl. Wenn deine Tags nicht zu greifen scheinen, ist das fast immer der Grund.

Das zählt am meisten bei der Live-Bearbeitung von Tags oder Besitzer: Am Desktop speichert jeder Klick außerhalb des Menüs eine Änderung.

## Erinnerung

Klicke **Erinnerung** <img class="inline-ic" src="/icons/alertW.png" alt="" />, bis er **blau** wird. Wähle dann im Abhak-Menü die Aufgabe: eine, die noch nicht abgehakt ist. TTM öffnet das Formular **Wann**, mit dem Titel *Erinnerung für Aufgabe …*:

| Feld | Format | Hinweise |
| :--- | :--- | :--- |
| **Tag** | eine Zahl (1–31) | vorausgefüllt |
| **Monat** | ein Dropdown, in deiner Sprache | keine Unklarheit zwischen `dd/mm` zu befürchten |
| **Jahr** | eine Zahl | vorausgefüllt |
| **Uhrzeit** | `HH:mm`, 24 Stunden | z. B. `15:30` |
| **Zeitzone** | ein offizieller Zonenname | vorausgefüllt mit *deiner* Zone (bis du sie änderst, die deiner Discord-Sprache oder die des Servers) |

Alles kommt vorausgefüllt mit **zehn Minuten ab jetzt**. Sende es ab, und die Aufgabe zeigt die geplante Zeit. Solange das Formular offen ist, ist die Liste für die anderen gesperrt. Wer die Erinnerung bekommt und was zur Zeitzone gilt: Siehe [Erinnerungen](/docs/reminders/#the-rules).

### Die Übersichtskarte

Sind [wiederkehrende Erinnerungen](/docs/reminders/#repeating-reminders) an (eine Premium-Funktion), speichert das Absenden von **Wann** noch nicht. TTM zeigt dir eine private Übersichtskarte mit dem Datum, das es verstanden hat, einer Zeile **Wiederholung** und vier Buttons. Die Zeile sagt *keine* bei einer einzelnen Erinnerung oder zeigt das Wiederholungs-Abzeichen:

| Button | Was er tut |
| :--- | :--- |
| **Speichern** | Die Erinnerung genau so speichern, wie die Karte sie zeigt. Bearbeitest du eine bestehende Erinnerung, wird er aktiv, sobald du etwas änderst. |
| **Datum ändern** | **Wann** wieder öffnen, mit den aktuellen Werten vorausgefüllt. |
| **Wiederholung bearbeiten** | Das Wiederholungsformular mit seinen drei Menüs öffnen: Siehe [Die Wiederholungsfelder](/docs/reminders/#the-repetition-fields). Bei einer einzelnen Erinnerung öffnet es sich auf 2-mal, alle 1 Tage. Mit **1-mal** bleibt die Erinnerung einzeln. |
| **Abbrechen** | Das Ganze verwerfen — die Liste wird entsperrt. |

<div class="callout"><div class="callout-t">Nichts wird gespeichert, bis du Speichern drückst</div>Das Ändern von Datum oder Wiederholung aktualisiert nur die Karte. Du kannst sie so oft ändern, wie du willst, und <strong>Abbrechen</strong> bricht wirklich ab.</div>

Sind wiederkehrende Erinnerungen aus oder bist du im Free-Tarif, erscheint die Karte nur, wenn du eine Erinnerung bearbeitest, die **schon wiederkehrend** ist, damit sie ihre Wiederholungen behält: Siehe [Wiederkehrende Erinnerungen](/docs/reminders/#repeating-reminders). Eine neue Erinnerung geht direkt durch **Wann** und wird als einzelnes Ereignis gespeichert.

### Bearbeiten oder Entfernen

- **Bearbeiten** — klicke **Erinnerung** auf blau und wähle die Aufgabe:
  - hat die Aufgabe schon eine *wiederkehrende* Erinnerung oder sind wiederkehrende Erinnerungen an, landest du auf der Übersichtskarte, mit dem aktuellen Datum und Abzeichen: Ändere nur, was du brauchst;
  - sonst öffnet sich **Wann**, vorausgefüllt mit dem aktuellen Datum;
  - dasselbe Datum und dieselbe Wiederholung, die die Erinnerung schon hat, ändern nichts: TTM sagt es dir und sendet keine Benachrichtigung.
- **Entfernen** — klicke **Erinnerung**, bis er **rot** wird (Löschen-Modus), und wähle dann die Aufgabe. Die Erinnerung wird entfernt.

<div class="callout"><div class="callout-t">Ein Formular zu schließen heißt nicht abbrechen</div>Ein mit dem ✕ geschlossenes Formular lässt die Liste gesperrt. Nimm <strong>Abbrechen</strong> auf der <a href="#the-summary-card">Übersichtskarte</a>, wenn es sie gibt; sonst siehe <a href="/docs/the-task-list/#when-the-list-is-locked">Wenn die Liste gesperrt ist</a>.</div>

## Webhook

Webhooks sind eine [Premium](/docs/premium/)-Funktion.

Klicke **Webhook** <img class="inline-ic" src="/icons/api.png" alt="" />, bis er **blau** wird, wähle den Webhook in der erscheinenden Auswahl und dann die Aufgabe. Von da an löst das Erledigen oder Wieder-Öffnen dieser Aufgabe den Aufruf aus. Klicke **Webhook**, bis er **rot** wird, und wähle die Aufgabe, um die Verknüpfung zu entfernen.

Die Webhooks selbst werden mit [/config webhook](/docs/config-webhook/) von den Personen erstellt, die den Server verwalten. Das Formular **Inhalt** zeigt den Webhook einer Aufgabe nicht und entfernt einen, den du dort tippst, und sagt es dir. In **Sammelbearbeitung** erscheint er als Token: Siehe [Webhooks im Text](/docs/writing-a-list/#webhooks-in-the-text).

## Wie es weitergeht

- [Die Liste im Kanal](/docs/the-task-list/) — das Abhak-Menü, die erste Reihe und Mehr.
- [An einer Liste in der Activity arbeiten](/docs/activity-list/) — dieselben fünf Buttons, im Panel einer Aufgabe.
- [FAQ](/docs/troubleshooting/#in-the-channel) — kurze Antworten auf die häufigsten Probleme.
