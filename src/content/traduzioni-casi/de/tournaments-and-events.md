---
title: Organisiere ein Community-Turnier ohne Tabelle
seoTitle: Discord-Bot für Turniere und Community-Events
name: Turniere und Events
description: "Ein Samstags-Cup mit acht Teams: Schiedsrichter als Besitzer, eine Erinnerung, die die fehlenden Teams immer wieder ruft, der Ping an die Kommentatoren vor dem Stream und der Sieger, per Webhook angekündigt."
highlights: "Besitzer in einer Gruppe, die TTM-Rolle der Kommentatoren, eine Erinnerung alle 15 Minuten, Haken live in der Activity, der Sieger in einer freien Variable, Liste klonen für die nächste Woche."
intro: |
  Mia organisiert den **Saturday Cup #12** auf ihrem Gaming-Server: acht Teams, vier Schiedsrichter, zwei Kommentatoren im Stream. Die Teams spielen aus mehreren Ländern. Der Staff hat eine Liste in #turnier-staff für die Woche von Montag, 7., bis Sonntag, 13. Dezember 2026, und am Samstag haken sie sie live gemeinsam ab.
order: 3
team:
  guild: Fragline
  zone: Europe/London
  people:
    - { id: "11839044175621001", name: Mia, username: mia.fragline, color: "#f0b232", about: "Organisatorin. Sie hat Nachrichten verwalten im Staff-Kanal." }
    - { id: "11839044175621002", name: Leo, username: leo.casts, color: "#3ba55c", about: "Kommentator." }
    - { id: "11839044175621003", name: Sam, username: sam.casts, color: "#5865f2", about: "Kommentator." }
    - { id: "11839044175621004", name: Noa, username: noa.ref, color: "#e74c3c", about: "Schiedsrichterin." }
    - { id: "11839044175621005", name: Kai, username: kai.ref, color: "#1abc9c", about: "Schiedsrichter." }
    - { id: "11839044175621006", name: Zoe, username: zoe.ref, color: "#9b59b6", about: "Schiedsrichterin. Am Samstag spät dran." }
  roles:
    - { id: "11839044175622001", name: Schiedsrichter, about: "Noa, Kai, Zoe und noch einer." }
    - { id: "11839044175622002", name: TTM1, about: "Von TTM für den Stream erstellt, gehört beiden Kommentatoren.", members: ["11839044175621002", "11839044175621003"], ttm: true }
  channels:
    - { id: "11839044175623001", name: turnier-staff, about: "Der Kanal des Staffs. Die Liste lebt hier." }
    - { id: "11839044175623002", name: ankündigungen, about: "Wo die Spieler die Ergebnisse lesen." }
    - { id: "11839044175623003", name: Hauptbühne, about: "Der Sprachkanal des Streams.", voice: true }
list:
  title: "Saturday Cup #12"
  channel: "11839044175623001"
  at: 2026-12-12T19:10
  look: |
    Samstagabend, nach dem Finale. „Runde 1“ hat keinen Besitzer: Jedes Match gehört seinem Schiedsrichter, deshalb wurde die Gruppe von selbst abgehakt, mit dem letzten Match. „Die fehlenden Teams rufen“ zeigt `↻15m ×3`: drei Pings, fünfzehn Minuten auseinander. Die freie Variable `{{winner=Team Nova}}` bleibt im Text, wo der Webhook sie gelesen hat.
  text: |
    - [X] <@11839044175621001>: Die Anmeldung öffnen, mit dem [Turnierbaum auf Challonge](https://challonge.com/saturday_cup_12)
    - [X] <@&11839044175622001>: Die Aufstellungen der acht Teams prüfen
    - [X] <t:1797080400> [0m,0m,0] <@&11839044175622001>: Das Check-in öffnen, von 13 bis 14 Uhr
    - [X] <t:1797082200> [0m,15m,2] <@&11839044175622001>: Die fehlenden Teams rufen
    - [X] <t:1797085800> [0m,0m,0] <@&11839044175622002>: Um 15 Uhr im Anruf Hauptbühne live gehen
    - [X] Runde 1, Best of Three
     - [X] <@11839044175621004>: Match A: Team Nova gegen Pixel Pirates
     - [X] <@11839044175621005>: Match B: Iron Owls gegen Blue Shift
     - [X] <@11839044175621006>: Match C: Night Foxes gegen Glitch Gang
     - [X] <@11839044175621005>: Match D: Red Comets gegen Lumen Five
    - [X] <@&11839044175622001>: Die Halbfinals und das Finale leiten
    - [X] {{wb=Ergebnisse}} <@11839044175621001>: Die Ergebnisse posten {{winner=Team Nova}}
    - [] <@&11839044175622002>: Das Replay des Finales hochladen
    - [] <@11839044175621001>: Den Teams danken und das Feedback-Formular schicken
    - [] <@11839044175621001>: Die Anmeldung für den Saturday Cup #13 öffnen
webhooks:
  - name: Ergebnisse
    service: discord
    trigger: completion
    method: POST
    url: https://discord.com/api/webhooks/<id>/<token>
    headers: "Content-Type: application/json"
    body: |
      {"content": "🏆 **{{winner}}** hat {{list}} gewonnen! GG an alle acht Teams. Der Turnierbaum bleibt auf Challonge.", "allowed_mentions": {"parse": []}}
    postsAs: { name: Fragline Cups, channel: "11839044175623002", color: "#e67e22" }
    setup: |
      Öffne die Einstellungen von #ankündigungen, dann *Integrationen → Webhooks → Neuer Webhook*. Nenne ihn „Fragline Cups“ und drücke **Webhook-URL kopieren**: Das ist die URL oben. Halte sie geheim, wie ein Passwort.

      Zwei Tokens schreiben die Nachricht. `{{winner}}` kommt aus der freien Variable in der Aufgabe, `{{winner=…}}`, die Mia schreibt, wenn das Finale vorbei ist. `{{list}}` ist der Titel der Liste: Die Liste der nächsten Woche heißt Saturday Cup #13, und derselbe Webhook nennt den neuen Cup.
settings:
  - setting: Zeitzone
    choice: Europe/London
    why: "Der Cup läuft nach Londoner Zeit. Discord zeigt jedes Datum der Liste in der Zone des Lesers, ein Schiedsrichter in Toronto liest also seine eigenen Uhrzeiten. Wenn ein Schiedsrichter eine Erinnerung speichert, schlägt TTM die Zone seiner Discord-Sprache vor, bis er eine wählt."
  - setting: Lesbare Push-Benachrichtigungen
    choice: An
    why: "Die Schiedsrichter lesen die Erinnerungen auf dem Handy. Der Push zeigt die Aufgabe, nicht eine leere Karte."
  - setting: Besitzer in neuen Listen erwähnen
    choice: An
    why: "Die Liste der nächsten Woche erwähnt @Schiedsrichter und die Kommentatoren, sobald sie gepostet wird: Sie wissen, dass der Cup stattfindet."
  - setting: Wiederkehrende Erinnerungen
    choice: Wiederkehrend ein
    premium: true
    why: "„Die fehlenden Teams rufen“ pingt alle 15 Minuten, bis zu dreimal."
week:
  - at: 2026-12-07T19:00
    text: "Mia führt `/liste-erstellen` in #turnier-staff aus und schreibt die Aufgaben für Samstag, mit @Schiedsrichter als Besitzer der Aufgaben, die jeder Schiedsrichter erledigen kann, geschrieben als `@Schiedsrichter:` ([Eine Liste von Hand bearbeiten](/docs/writing-a-list/#owners-the-mention-with-a-colon) zeigt, wie). Sie fügt den Link zum Turnierbaum von Challonge ein. Die erste Benachrichtigung erwähnt @Schiedsrichter, damit jeder Schiedsrichter benachrichtigt wird."
  - at: 2026-12-08T20:30
    text: "Mia gibt „Live gehen“ Leo und Sam zusammen: Sie wählt beide im Menü unter **Besitzer**. TTM erstellt die Rolle **TTM1** für die beiden und macht sie zum Besitzer. Ein Besitzer aus mehreren Personen ist eine [Premium](/premium/)-Funktion, während der Beta für jeden Server freigeschaltet."
  - at: 2026-12-09T21:00
    text: "Mia fügt die Erinnerungen mit **Erinnerung** hinzu: das Check-in um 13 Uhr an @Schiedsrichter, „Die fehlenden Teams rufen“ um 13:30 Uhr alle 15 Minuten, insgesamt 3 Mal, und den Stream um 14:30 Uhr an TTM1."
  - at: 2026-12-12T13:00
    text: "Die Erinnerung zum Check-in erwähnt @Schiedsrichter in #turnier-staff. Kai öffnet das Check-in und hakt die Aufgabe ab."
  - at: 2026-12-12T13:30
    text: "„Die fehlenden Teams rufen“ pingt @Schiedsrichter. Zwei Teams fehlen, und Noa schreibt ihren Kapitänen. Um 13:45 Uhr kommt der Ping wieder."
  - at: 2026-12-12T13:52
    text: "Das letzte Team checkt ein, und Noa hakt „Die fehlenden Teams rufen“ ab. Das Abhaken einer Aufgabe stoppt ihre Erinnerung: Der Ping um 14:00 Uhr kommt nie."
  - at: 2026-12-12T14:30
    text: "Die Erinnerung zum Stream erwähnt TTM1, sodass Leo und Sam sie beide bekommen."
    card: { kind: reminder, task: "5" }
  - at: 2026-12-12T14:40
    text: "Mia öffnet die Liste mit **Activity** <img class=\"inline-ic\" src=\"/icons/activity.png\" alt=\"\" />, dem ersten Button darunter. Die Schiedsrichter kommen mit **Activity beitreten** dazu, und jeder hakt sein Match ab, sobald es endet. Zoe ist spät dran: Im Panel von „Match C“ gibt Mia ihr das Match."
  - at: 2026-12-12T15:35
    text: "Noa beendet Match A und tippt auf das Kästchen der ganzen „Runde 1“. Eine Sprechblase sagt nein: Das Abhaken der Gruppe würde auch die Matches von Kai und Zoe abhaken. Mia könnte es, mit *Nachrichten verwalten* im Kanal. Sie wartet stattdessen: Wenn Kai Match D abhakt, das letzte, wird die Gruppe von selbst abgehakt."
  - at: 2026-12-12T18:45
    text: "Team Nova gewinnt das Finale. Mia schreibt mit **Inhalt** `{{winner=Team Nova}}` in „Die Ergebnisse posten“ und hakt dann die Aufgabe ab. Der Webhook postet den Sieger in #ankündigungen."
    card: { kind: webhook, webhook: Ergebnisse, task: "8", by: "11839044175621001" }
  - at: 2026-12-12T19:05
    text: "Der letzte Schiedsrichter verlässt die Activity. Die Liste geht mit einer Zusammenfassung zurück nach #turnier-staff, eine Zeile pro Änderung, mit wem sie gemacht hat. Die Zusammenfassung erwähnt Zoe, die Match C in der Activity bekommen hat: Die Erwähnungen einer Sitzung kommen mit ihr an."
fonte: b260b9b17faa
---

## Beim nächsten Mal

Am Sonntag öffnet Mia **Mehr** <img class="inline-ic" src="/icons/other.png" alt="" /> und drückt **Liste klonen**: derselbe Kanal, ohne die Haken und ohne die Erinnerungen. Mit der **Sammelbearbeitung** ändert sie den Titel in Saturday Cup #13, den Link zum Turnierbaum und die Matches und entfernt `{{winner=Team Nova}}`. Dann gibt sie die Daten des nächsten Samstags mit **Erinnerung** ein. Der Klon erwähnt @Schiedsrichter und TTM1 in seiner ersten Benachrichtigung. Siehe [Klonen](/docs/list-actions/#clone).

Der Cup der letzten Woche bleibt als Protokoll. Um seinen Platz freizugeben, kann Mia ihn **versiegeln**, ebenfalls unter **Mehr**: Die Nachricht bleibt, ohne Buttons.

## Was TTM hier nicht macht

TTM führt keine Turnierbäume, zählt keine Punkte und macht kein Check-in der Teams: Das übernehmen Challonge und start.gg. Es streamt auch nicht. TTM hält die Arbeit des Staffs an einem Ort fest, pingt die richtigen Leute zur richtigen Minute und kündigt das Ergebnis an, das du schreibst.

## Fragen

### Warum konnte Noa Runde 1 nicht abhaken?

Eine Gruppe zieht ihre Unteraufgaben mit. Das Abhaken hätte die Matches von Kai und Zoe mit abgehakt, und das können nur ihre Besitzer oder wer *Nachrichten verwalten* im Kanal hat. Siehe [Wer eine Aufgabe abhaken darf](/docs/core-concepts/#who-can-tick-a-task).

### Was, wenn niemand „Die fehlenden Teams rufen“ abhakt?

Es pingt insgesamt dreimal, um 13:30, 13:45 und 14:00 Uhr, und hört dann auf. Das Abzeichen `↻15m ×3` sagt es. Siehe [Wiederkehrende Erinnerungen](/docs/reminders/#repeating-reminders).

### Bekommen die Kommentatoren die Erinnerung zum Stream per Direktnachricht?

Nein. TTM1 ist eine Rolle, und eine Erinnerung für eine Rolle ist eine Nachricht im Kanal der Liste, die sie erwähnt, sodass Discord alle in der Rolle benachrichtigt. Gib die Aufgabe einem einzelnen Kommentator, um sie per Direktnachricht zu schicken. Siehe [Wie die Erinnerung ankommt](/docs/reminders/#how-the-reminder-arrives).
