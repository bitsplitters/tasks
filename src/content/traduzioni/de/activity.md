---
title: "Die Activity"
description: "Öffne eine Liste in einem Fenster innerhalb von Discord, in dem dein Team gemeinsam daran arbeitet und jede Änderung sofort sieht."
fonte: 430ed626ef5b
---

Probiere den Activity-Modus: flüssiger und frei von den Grenzen der Textkanäle, ideal für längere oder gemeinsame Arbeitssitzungen.

Die **Activity** öffnet eine Liste in einem Fenster innerhalb von Discord, am Desktop und auf dem Handy. Mehrere Personen arbeiten gleichzeitig daran und sehen jede Änderung live. Wenn die letzte Person geht, kommt die Liste mit einer Zusammenfassung der Änderungen in ihren Kanal zurück. Sie spricht deine Discord-Sprache, wenn TTM sie kann, sonst Englisch.

Diese Seite handelt vom Hinein- und Hinausgehen. Wie du in der Liste arbeitest, wenn du drin bist: [An einer Liste in der Activity arbeiten](/docs/activity-list/).

## Vier Wege hinein

- **Aus einer Liste in einem Kanal**: Drücke **Activity** <img class="inline-ic" src="/icons/activity.png" alt="" />, den ersten Button unter der Liste. Diese Liste öffnet sich. Siehe [Eine Liste in der Activity öffnen](#open-a-list-in-the-activity).
- **Aus der Nachrichtenleiste**: Öffne in einem Textkanal den **App-Launcher** von Discord, wähle Team Tasks Manager und dann **Launch**. Siehe [Die Startseite des Kanals](#the-home-of-the-channel).
- **Aus einem Sprachanruf**: Drücke den Aktivitäten-Button des Anrufs und wähle Team Tasks Manager. Siehe [Die Startseite des Kanals](#the-home-of-the-channel).
- **Von jemandem, der schon drin ist**: Drücke **Activity beitreten** unter der Liste, das **Beitreten** von Discord im Profil der Person oder die Einladung, die sie dir schickt. Siehe [Den anderen beitreten](#join-the-others).

Der App-Launcher und der Sprachanruf öffnen die Startseite des Kanals mit allen seinen Listen: Dort wählst du eine aus oder erstellst eine neue.

## Eine Liste in der Activity öffnen

Drücke **Activity** <img class="inline-ic" src="/icons/activity.png" alt="" />, den ersten Button der [ersten Reihe](/docs/the-task-list/#row-1--acts-on-the-whole-list), in einem Textkanal oder im Chat eines Sprachkanals. Eine ältere Liste bekommt den Button, sobald sie sich zum ersten Mal ändert.

Verbindet sich das Fenster nicht innerhalb von 30 Sekunden, warnt dich TTM, und die Liste bleibt im Kanal.

### Wenn sich die Liste nicht öffnet

Der Button folgt den Regeln der restlichen Liste, etwa den [synchronisierten Berechtigungen](/docs/configuration/#sync-permissions) in `/config app`. TTM lehnt auch ab, in einer Nachricht, die nur du siehst:

- ohne die Discord-Berechtigung *Aktivitäten verwenden* im Kanal, die ein Administrator in den *Berechtigungen* des Kanals gewährt;
- solange die Datenbank nicht antwortet;
- solange jemand die Liste im Kanal bearbeitet: siehe [Wenn die Liste gesperrt ist](/docs/the-task-list/#when-the-list-is-locked);
- wenn dein Tarif keinen freien Platz hat: siehe [So funktionieren die drei Plätze](/docs/premium/#how-the-three-places-work).

## Den anderen beitreten

Solange eine Liste in der Activity ist, behält ihre Nachricht einen einzigen Button, **Activity beitreten** <img class="inline-ic" src="/icons/activity.png" alt="" />, und die letzte Zeile sagt <img class="inline-ic" src="/icons/activity_blue.png" alt="" /> *An dieser Liste wird gerade in der Activity gearbeitet*. Auch das **Beitreten** von Discord im Profil einer Person, die drin ist, funktioniert. In der Zwischenzeit ändert nichts die Liste vom Kanal aus.

Um jemanden dazuzuholen, drücke **Einladen**, oben rechts auf der Startseite und in jeder Liste, neben den Anwesenden. Discord öffnet sein eigenes Fenster, in dem du Freunde oder einen Kanal wählst, an die die Einladung geht. Dafür braucht es die Discord-Berechtigung *Einladung erstellen* im Kanal: Fehlt sie, sagt dir TTM das am Button und wie ein Administrator sie gewährt.

## Dein Status auf Discord

Während du in der Activity bist, zeigt dein Discord-Profil Team Tasks Manager mit *Plant Aufgaben mit dem Team*, in deiner Sprache. Es sagt nichts über die Liste, den Server oder den Kanal. Discord fragt dich vorher, in dem Fenster, in dem du TTM mitteilst, wer du bist. Sagst du nein, öffnet sich die Activity trotzdem, ohne diese Zeile.

## Die Startseite des Kanals

Wenn du vom **App-Launcher** oder aus einem **Sprachanruf** startest (siehe [Vier Wege hinein](#four-ways-in)), öffnet TTM die Startseite des Kanals mit dem Namen des Kanals als Titel. Threads, Forenbeiträge, Ankündigungskanäle und Stages bleiben außen vor. Die Startseite hat drei Teile:

- **Neue Liste**, unter dem Titel: ein Titel und die Aufgaben, so geschrieben wie in [Erstelle deine erste Liste](/docs/getting-started/#2-create-your-first-list), hier erstellt und gleich in der Activity. Die Zusammenfassung, die mit ihr in den Kanal zurückkommt, beginnt mit ihrer Erstellung und kann die Besitzer ihrer Aufgaben erwähnen: siehe [Wenn eine Liste erstellt wird](/docs/configuration/#when-a-list-is-created). Dateien importierst du mit `/liste-erstellen` im Kanal.
- **Jetzt in der Activity**: wer in welcher Liste ist und wer bearbeitet. Tippe auf eine, um beizutreten.
- **Im Kanal**: die anderen Listen, die neueste zuerst. Tippe auf eine, um sie zu lesen, dann auf **In die Activity bringen**; der Button wartet, solange jemand sie im Kanal bearbeitet.

Der Button **Startseite** <img class="inline-ic" src="/icons/home.png" alt="" /> oben links in jeder Liste bringt dich dorthin zurück.

## Zurück in den Kanal

**Verlassen** bringt die Liste zurück, wenn du allein bist. Mit anderen entscheidest du:

- **Ohne die anderen gehen**: Die anderen machen weiter;
- **Für alle in den Kanal zurückbringen**: Die Activity schließt sich für alle.

Die Liste geht auch 30 Sekunden nach dem Weggang der letzten Person zurück, auch wenn jemand das Fenster schließt oder das Handy sperrt. **Verlassen** und **Startseite** tun es sofort.

Danach folgt eine **Zusammenfassung**, eine Zeile pro Änderung mit der Person, die sie gemacht hat: im Kanal so, wie es dein [Benachrichtigungsmodus](/docs/configuration/#notification-mode) sagt, und vollständig im Thread des [Aktivitätsverlaufs](/docs/configuration/#history-tracking). Sie nutzt die Sprache der Person, die die Liste in die Activity gebracht hat.

## Was im Kanal bleibt

**Klonen**, **Herunterladen**, **Versiegeln**, **Löschen**, **Entsperren** und der Import aus einer Datei: siehe [Listenaktionen](/docs/list-actions/). In der Activity entsperrt sich eine Liste von selbst.

Ein Admin kann eine Liste in der Activity trotzdem über [`/config lists`](/docs/config-lists/) **löschen**, **versiegeln** oder **regenerieren**. Löschen entfernt sie auch für die Personen, die drin sind; Versiegeln bringt sie vorher in den Kanal zurück.

## Wenn die Datenbank nicht antwortet

Keine Liste kommt in die Activity, und die Startseite blendet **Neue Liste** aus. Eine Liste, die schon drin ist, wird schreibgeschützt, bis die Datenbank wieder da ist, und ein Streifen bietet an, sie in den Kanal zurückzubringen.

## Deine Einstellungen

Das Zahnrad oben rechts hat zwei Gruppen. Unter **Für dich, überall** ist **Zeitzone** deine Zeitzone, dieselbe wie bei [/my timezone](/docs/my-timezone/): TTM schlägt sie dir im Kanal und auch auf jedem Server vor, und **Meine Zeitzone entfernen** vergisst sie. Unter **Auf diesem Gerät** gelten **Textgröße**, **Design** und **Zeilen mit Abstand**, mehr Platz zum Tippen auf dem Handy, nur für dich und auf diesem Gerät.

## Wie es weitergeht

- [An einer Liste in der Activity arbeiten](/docs/activity-list/): die Kästchen, das Panel einer Aufgabe und wer was bearbeitet.
- [Die Liste im Kanal](/docs/the-task-list/): jeder Button unter der Liste, im Kanal.
- [Was Premium freischaltet](/docs/premium/): die Plätze in deinem Tarif und was der bezahlte Tarif dazugibt.
- [FAQ](/docs/troubleshooting/#in-the-activity): schnelle Antworten auf die häufigsten Probleme.
