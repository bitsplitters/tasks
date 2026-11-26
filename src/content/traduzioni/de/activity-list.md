---
title: "An einer Liste in der Activity arbeiten"
description: "Die Kästchen, die erste Reihe, das Panel einer Aufgabe (Inhalt, Besitzer, Tag, Erinnerung und Webhook) und wer was bearbeitet."
fonte: 0f9b0e6b28e5
---

In der Activity ist die Liste eine eigene Seite: ein Kästchen vor jeder Aufgabe, eine Reihe Buttons oben und ein Panel für jede Aufgabe. Es gelten die Regeln des Kanals: Besitzer, Servereinstellungen, Tarifgrenzen. Was jede Funktion tut: [Besitzer und Tags](/docs/owners-and-tags/), [Erinnerungen](/docs/reminders/), [Webhooks](/docs/webhooks/), [Aktionen auf der Liste](/docs/list-actions/).

Unter der Liste hilft eine Zeile allen, die neu sind: *Du weißt nicht, wo du anfangen sollst? Tippe auf ein Kästchen, um eine Aufgabe abzuhaken, und auf ihren Text für alles andere.* Sie folgt den [Tipps](/docs/configuration/#tips) des Servers, wie im Kanal.

## Die erste Reihe

Diese Buttons wirken auf die ganze Liste.

| Button | Was er tut |
| :--- | :--- |
| **Anleitung** <img class="inline-ic" src="/icons/doc.png" alt="" /> | Eine kurze Anleitung zur Activity, auf fünf Seiten. |
| **Liste bearbeiten** <img class="inline-ic" src="/icons/edit.png" alt="" /> | Der Titel und die ganze Liste als Text: Siehe [Liste bearbeiten](#edit-the-list). |
| **Liste bereinigen** <img class="inline-ic" src="/icons/clean.png" alt="" /> | Entfernt die erledigten Aufgaben: Siehe [Liste bereinigen und Alle wieder öffnen](#clean-the-list-and-reopen-all). |
| **Alle wieder öffnen** <img class="inline-ic" src="/icons/reopen.png" alt="" /> | Setzt die erledigten Aufgaben wieder auf offen; **Neues Datum** verschiebt ihre Erinnerungen. |
| **Verlassen** <img class="inline-ic" src="/icons/back.png" alt="" /> | Bringt die Liste in den Kanal zurück: Siehe [Zurück in den Kanal](/docs/activity/#back-to-the-channel). |

Über der Reihe führt dich **Startseite** zur [Startseite des Kanals](/docs/activity/#the-home-of-the-channel) und das Zahnrad öffnet [deine Einstellungen](/docs/activity/#your-settings). Klonen, Herunterladen, Versiegeln, Löschen und Entsperren sind nicht hier: Sie [bleiben im Kanal](/docs/activity/#what-stays-in-the-channel).

## Eine Aufgabe abhaken

**Tippe auf das Kästchen** vor einer Aufgabe, um sie abzuhaken, und tippe noch einmal, um sie wieder zu öffnen. Eine Gruppe nimmt ihre Unteraufgaben mit und ist abgehakt, wenn alle es sind, wie im Kanal. Jede Aufgabe, die sich ändert, löst ihren [Webhook](#webhook) aus, Unteraufgaben und Gruppe eingeschlossen, wie im Kanal.

Wird ein Haken abgelehnt, sagt dir eine Sprechblase am Kästchen, warum: Eine Aufgabe mit Besitzer können nur ihr Besitzer und alle mit *Nachrichten verwalten* im Kanal abhaken (siehe [Wer eine Aufgabe abhaken darf](/docs/core-concepts/#who-can-tick-a-task)). Bei einer Aufgabe, die jemand anderes bearbeitet, sagt die Sprechblase, wer.

## Das Panel einer Aufgabe

**Tippe auf den Text einer Aufgabe**, um ihr Panel zu öffnen, mit dem Titel *Wähle, was du an Aufgabe … ändern möchtest*. Es hat die fünf Buttons der zweiten Reihe des Kanals: **Inhalt**, **Besitzer**, **Tag**, **Erinnerung** und **Webhook**. Jeder wechselt durch drei Farben:

- <span class="c-grey">Grau</span>: aus.
- <span class="c-blue">Blau</span>: ändern, das Panel zeigt die Felder und **Speichern**.
- <span class="c-red">Rot</span>: löschen, das Panel zeigt **Löschen**. Bei einer Aufgabe, in der es nichts zu löschen gibt, sagt der Satz oben es, zum Beispiel *Kein Besitzer zum Entfernen*, und **Löschen** bleibt aus.

Ein drittes Tippen macht den Button wieder grau. Nichts passiert, bis du auf **Speichern** oder **Löschen** tippst. Nach einer Aktion bleibt das Panel bei derselben Aufgabe, mit grauen Buttons, bereit für die nächste Änderung. Es schließt mit **Schließen**, mit einem Tippen außerhalb oder von selbst nach 30 Sekunden ohne Aktivität.

Solange das Panel offen ist, ist die Aufgabe für die anderen gesperrt: Siehe [Wer bearbeitet was](#who-is-editing-what).

## Inhalt

**Blau** zeigt den Text der Aufgabe, um ihn zu ändern, mit Kanälen als Namen, etwa `#general`. Dort getippte Besitzer, Tags, Erinnerungen und Webhooks werden entfernt: Sie haben ihre eigenen Buttons. Ein Besitzer, den TTM nicht kennt, wird nicht gespeichert: Die Meldung schickt dich zu **Besitzer**.

**Rot** löscht die Aufgabe. Eine Gruppe mit Unteraufgaben zu löschen, fragt dich vorher, wie im Kanal. Die letzte Aufgabe einer Liste lässt sich nicht löschen: Eine Liste kann nicht leer bleiben. Um die ganze Liste zu löschen, nutze den Kanal.

## Besitzer

**Blau** zeigt eine Suche über die Personen und Rollen des Servers, mit denen zuerst, die in der Activity sind. Tippe auf einen Namen, um ihn hinzuzufügen, tippe noch einmal, um ihn zu entfernen, dann **Speichern**. Entferne alle Namen, und **Speichern** entfernt den Besitzer, wie es **Rot** tut.

**Um eine Aufgabe zu übernehmen**, die keinen Besitzer hat, drücke **Besitzer**, bis er blau wird: Dein Name ist schon gewählt, **Speichern** macht die Aufgabe also zu deiner.

Um sie stattdessen jemand anderem zu geben, tippe auf dessen Namen: Er tritt an die Stelle deines. Eine Aufgabe, die schon einen Besitzer hat, zeigt ihn und ändert sich nur, wenn du jemanden wählst.

- Eine Person oder eine Rolle genügt in jedem Tarif.
- Mehrere Personen werden zu einer Rolle, die TTM erstellt, in Premium: Siehe [Die Rollen, die TTM erstellt](/docs/owners-and-tags/#the-roles-ttm-creates). Fehlt etwas, bleibt **Speichern** aus und das Panel sagt, warum.

**Rot** entfernt den Besitzer und auch seine Erinnerung: Niemand ist mehr übrig, der sie bekommt. Wurde die Erinnerung noch nicht ausgelöst, bittet dich das Panel vorher um Bestätigung.

## Tag

**Blau** zeigt die Tags, die die Aufgabe jetzt hat, schon ausgewählt. Füge Personen oder Rollen aus der Suche hinzu und entferne sie, bis zu 25, dann **Speichern**: Die Aufgabe bekommt genau die Menge, die du siehst. Es gibt keinen Überschreibmodus und keine Live-Bearbeitung: Du startest immer von den aktuellen Tags.

**Um dich zu den Tags hinzuzufügen**, drücke **Tag**, bis er blau wird: Bist du nicht unter den Tags, ist dein Name schon hinter ihnen hinzugefügt, **Speichern** fügt dich also hinzu. Um stattdessen jemand anderen zu taggen, tippe auf dessen Namen: Er tritt an die Stelle deines. Ändert jemand die Tags, während du schaust, fügt dich **Speichern** trotzdem zu den neuen hinzu.

Entferne sie alle, und **Speichern** entfernt alle Tags, wie es **Rot** tut.

**Rot** entfernt alle Tags. In beiden Fällen behält eine Aufgabe, die nur aus Tags besteht, sie, denn ohne sie hätte sie keinen Text.

## Erinnerung

**Blau** zeigt **Datum**, **Uhrzeit** und **Zeitzone** zusammen und die Wiederholungen, wenn sie zutreffen.

- Eine **neue** Erinnerung beginnt bei zehn Minuten ab jetzt, mit schon eingeschaltetem **Speichern**.
- Eine **bestehende** Erinnerung zeigt ihre Werte. **Speichern** bleibt aus, bis du etwas änderst.
- **Speichern** bleibt aus bei einem Datum, das vergangen ist oder weniger als 5 Minuten entfernt liegt: *Das Datum ist bereits vergangen* sagt dir, ein neues zu wählen.

Tippe auf **Zeitzone**, um sie zu wählen: Suche nach Stadt, Land, einem Namen wie `Europe/Rome` oder einem Versatz wie `+5:30`.

- *Deine Zeitzonen* listet die auf, die für dich zählen: die dieses Geräts, deine eigene, die des Servers.
- Eine Zeile unter dem Feld sagt dir, woher die Zone kommt: deine, die dieses Geräts oder die des Servers, mit **Einstellungen**, um deine zu wählen. Eine andere Zone gilt nur für dieses Datum: Siehe [Deine Zeitzone](/docs/reminders/#your-time-zone).
- *Auf diesem Gerät* zeigt denselben Moment in der Zeit deines Geräts, wenn die Zone eine andere ist.

Die drei Wiederholungsmenüs erscheinen in Premium, bei eingeschaltetem Schalter für [wiederkehrende Erinnerungen](/docs/reminders/#repeating-reminders), oder wenn sich die Erinnerung schon wiederholt: Siehe [Die Wiederholungsfelder](/docs/reminders/#the-repetition-fields).

Eine abgehakte Aufgabe kann keine Erinnerung bekommen. Bei einer Aufgabe ohne Besitzer sagt das Panel, dass du mit dem Speichern ihr Besitzer wirst.

**Rot** entfernt die Erinnerung.

## Webhook

Webhooks sind eine [Premium](/docs/premium/)-Funktion.

**Blau** listet die Webhooks des Servers mit Namen auf, jeden mit dem Zeitpunkt, an dem er auslöst: *beim Abschluss*, *bei Wiedereröffnung* oder *immer*. Die Adresse erscheint nie. Wähle einen, dann **Speichern**.

Ein Webhook, den es nicht mehr gibt, erscheint oben, markiert mit *gibt es nicht mehr*, damit du einen anderen wählen kannst. Hat der Server keinen, sagt das Panel, dass sie mit [/config webhook](/docs/config-webhook/) erstellt werden.

**Rot** entfernt den Webhook von der Aufgabe.

## Liste bearbeiten

**Liste bearbeiten** zeigt den Titel und jede Aufgabe als Text, im Format, das unter [Eine Liste von Hand bearbeiten](/docs/writing-a-list/) erklärt wird: derselbe Text wie bei der **Sammelbearbeitung** des Kanals, nach denselben Regeln gelesen: Personen, Rollen und Kanäle mit Namen, Erinnerungsdaten in deiner Zeitzone.

Eine Zeile unter dem Text sagt, wie man jemand Neuen hinzufügt, und verlinkt auf [Eine Liste von Hand bearbeiten](/docs/writing-a-list/#people-roles-and-channels-by-name). Ändere, was du brauchst, und speichere.

Die Liste ist für die anderen gesperrt, ab dem Moment, in dem sie sich öffnet, bis du speicherst oder abbrichst: **Abbrechen**, das ✕ und ein Tippen außerhalb entsperren sie. Das Fenster schließt sich von selbst nach 30 Sekunden ohne Aktivität. Lässt sich der Text nicht speichern, erscheinen die Probleme darunter: Siehe [Wenn der Text sich nicht speichern lässt](/docs/writing-a-list/#when-the-text-cant-be-saved).

## Liste bereinigen und Alle wieder öffnen

**Liste bereinigen** bittet dich vorher um Bestätigung. Die Zusammenfassung am Ende der Sitzung hält fest, wie viele Aufgaben du entfernt hast. Ist keine Aufgabe erledigt oder sind es alle, sagt sie es und ändert nichts.

**Alle wieder öffnen** bittet dich jedes Mal um Bestätigung. **Neues Datum** im selben Fenster verschiebt die Erinnerungen der Aufgaben, die du wieder öffnest. Das Wiedereröffnen löst die Webhooks zur Wiedereröffnung der Aufgaben aus, die du wieder öffnest. Was beide Aktionen ändern: [Aktionen auf der Liste](/docs/list-actions/).

## Wer bearbeitet was

Zwei Personen ändern nie dasselbe gleichzeitig:

- Deine erste Änderung an einer Aufgabe sperrt sie für die anderen. Ein Tippen auf ihr Kästchen sagt ihnen, wer sie bearbeitet; die anderen Aufgaben bleiben frei.
- Solange jemand eine Aufgabe ändert, warten **Liste bearbeiten**, **Liste bereinigen** und **Alle wieder öffnen** und sagen, auf wen sie warten.
- **Liste bearbeiten** sperrt die ganze Liste: Die Kästchen kommen zurück, wenn die Person fertig ist.

Eine Bearbeitung, die 20 Sekunden liegen bleibt, fragt *Noch da? In 10 Sekunden wird die Bearbeitung geschlossen*; bei 30 schließt sie und was nicht gespeichert wurde, geht verloren. Lesen hat keine Zeitgrenze.

Ändert jemand dasselbe kurz bevor du speicherst, entscheidest du: **Überschreiben**, was deine Änderung speichert und die der anderen Person verliert; **Neu laden**, mit deinem Text unten zum Kopieren; oder **Abbrechen**.

## Wie es weitergeht

- [Die Activity](/docs/activity/): wie du hineinkommst, die Startseite des Kanals und zurück in den Kanal.
- [Eine Aufgabe im Kanal bearbeiten](/docs/channel-tasks/): dieselben fünf Buttons, unter der Liste im Kanal.
- [FAQ](/docs/troubleshooting/#in-the-activity): schnelle Antworten auf die häufigsten Probleme.
