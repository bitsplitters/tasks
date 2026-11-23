---
title: Plane deine Videos mit den Leuten, die sie machen
seoTitle: "Discord-Bot für Content Creator: deine Video-Pipeline"
name: Content Creator
description: "Ein Video pro Woche mit einem Cutter und einer Thumbnail-Künstlerin: eine Fristerinnerung, die der Arbeit folgt, wenn jemand weg ist, der Ping an die Mods vor der Premiere und das neue Video, angekündigt per Webhook."
highlights: "An jemand anderen übergebene Aufgaben, eine Erinnerung, die ihrem neuen Besitzer folgt, eine Abnahme mit zwei Besitzern, ein mailto-Link, ein Webhook, der das Video ankündigt, Klonen für das nächste Video."
intro: |
  Mia macht jede Woche ein Video für ihren Kanal. Leo schneidet, Sam zeichnet die Thumbnails, und die Mods des Servers betreuen den Chat während der Premiere. Das Video dieser Woche handelt von einem winzigen Schreibtisch, den sie an einem Wochenende gebaut hat. Die Liste lebt in #produktion, von Montag, 7., bis Sonntag, 13. Dezember 2026, mit der Premiere am Samstag um 18 Uhr.
order: 6
team:
  guild: Mia Makes
  zone: America/Toronto
  people:
    - { id: "11869044175621001", name: Mia, username: mia.makes, color: "#f0b232", about: "Creatorin. Sie schreibt die Liste." }
    - { id: "11869044175621002", name: Leo, username: leo.edits, color: "#3ba55c", about: "Cutter. Von Dienstag bis Donnerstag weg." }
    - { id: "11869044175621003", name: Sam, username: sam.thumbs, color: "#5865f2", about: "Thumbnails. Er schneidet auch." }
  roles:
    - { id: "11869044175622001", name: Mods, about: "Vier Moderatoren des Servers." }
    - { id: "11869044175622002", name: TTM1, about: "Von TTM für die Abschlusskontrolle erstellt, gehört Leo und Sam.", members: ["11869044175621002", "11869044175621003"], ttm: true }
  channels:
    - { id: "11869044175623001", name: produktion, about: "Das Team und die Mods. Die Liste lebt hier." }
    - { id: "11869044175623002", name: ankündigungen, about: "Wo die Mitglieder von neuen Videos erfahren." }
list:
  title: "Folge 42: der winzige Schreibtisch"
  channel: "11869044175623001"
  at: 2026-12-11T20:00
  look: |
    Freitagabend: Das Video ist fertig. Der erste Schnitt und die Farbkorrektur gehören jetzt Sam, mit der Erinnerung für den Schnitt. „Abschlusskontrolle“ gehört TTM1, der Rolle, die TTM für Leo und Sam erstellt hat. Der Link zum Video wartet in `{{video=…}}`, damit der Webhook ihn am Samstag lesen kann.
  text: |
    - [X] <@11869044175621001>: Das [Skript](https://docs.google.com/document/d/1tiny-desk-script/edit) schreiben
    - [X] <@11869044175621001>: Den Aufbau filmen, mit beiden Kameras
    - [X] <@11869044175621001>: [Den Sponsor bitten, die Werbeansage freizugeben](mailto:partners@example.com?subject=Episode%2042%20ad%20read)
    - [X] <t:1796922000> [0m,0m,0] <@11869044175621003>: Erster Schnitt, etwa 12 Minuten
    - [X] <@11869044175621003>: Farb- und Tonkorrektur
    - [X] <@11869044175621003>: Thumbnail, drei Varianten zur Auswahl
    - [X] <@&11869044175622002>: Abschlusskontrolle
    - [] <t:1797112800> [0m,0m,0] <@&11869044175622001>: Premiere um 18 Uhr: Link anheften und den Chat im Blick behalten
    - [] {{wb=Neues Video}} <@11869044175621001>: Das Video veröffentlichen {{video=https://youtu.be/tinydesk42}}
    - [] <@11869044175621001>: Auf die ersten Kommentare antworten
webhooks:
  - name: Neues Video
    service: discord
    trigger: completion
    method: POST
    url: https://discord.com/api/webhooks/<id>/<token>
    headers: "Content-Type: application/json"
    body: |
      {"content": "Neues Video: **Ich habe an einem Wochenende einen winzigen Schreibtisch gebaut**\n{{video}}", "allowed_mentions": {"parse": []}}
    postsAs: { name: Mia Makes, channel: "11869044175623002", color: "#f0b232" }
    setup: |
      Öffne die Einstellungen von #ankündigungen, dann *Integrationen → Webhooks → Neuer Webhook*. Nenne ihn „Mia Makes“, gib ihm das Bild des Kanals und drücke **Webhook-URL kopieren**: Das ist die URL oben. Halte sie geheim, wie ein Passwort.

      Der Link kommt aus der Aufgabe: `{{video}}` liest die freie Variable `{{video=…}}`. Mia schreibt den Link mit **Inhalt**, sobald YouTube ihn ihr gibt, vor der Premiere. Nächste Woche ändert sie den Titel im Body mit `/config webhook aktion:bearbeiten` oder verlegt ihn ebenfalls in die Aufgabe, als `{{title=…}}`.
settings:
  - setting: Tipps
    choice: Aus
    why: "Das Team kennt die Buttons. Ohne das Tutorial und die Hilfezeile ist die Liste kürzer."
  - setting: Lesbare Push-Benachrichtigungen
    choice: An
    why: "Sam liest die Erinnerungen auf dem Handy. Der Push zeigt die Aufgabe, nicht eine leere Karte."
  - setting: Erledigte Aufgaben abgedunkelt
    choice: An
    why: "Am Freitag ist der größte Teil der Liste erledigt. Die abgehakten Aufgaben verblassen, und die Premiere sticht heraus."
week:
  - at: 2026-12-07T10:00
    text: "Mia führt `/liste-erstellen` in #produktion aus und schreibt die Aufgaben der Woche. Dann gibt sie jeder ihren Besitzer mit **Besitzer**: Die Benachrichtigungen erwähnen Leo, Sam und @Mods, so weiß jeder, was seins ist. **Erinnerung** setzt die Frist für den Schnitt und den Ping zur Premiere, und **Webhook** verknüpft „Das Video veröffentlichen“ mit Neues Video. Der Sponsor-Link öffnet eine neue E-Mail, mit schon geschriebenem Betreff."
  - at: 2026-12-07T10:30
    text: "Mia gibt „Abschlusskontrolle“ Leo und Sam zusammen: Sie wählt beide im Menü unter **Besitzer**. TTM erstellt für sie die Rolle **TTM1** und macht sie zum Besitzer. Ein Besitzer aus mehreren Personen ist eine [Premium](/premium/)-Funktion, während der Beta für jeden Server freigeschaltet."
  - at: 2026-12-08T09:00
    text: "Leo ist bis Donnerstagabend weg. Mia **übergibt** seine zwei Aufgaben an Sam: Sie wählt Sam im Menü unter **Besitzer**, bestätigt und wählt dann „Erster Schnitt“. Für die Farbkorrektur macht sie es noch einmal. Die Benachrichtigung nennt Leo und erwähnt Sam, damit Discord ihn benachrichtigt."
    card: { kind: notice, type: updated, by: "11869044175621001", from: "11869044175621002", task: "4" }
  - at: 2026-12-10T12:00
    text: "Die Frist für den ersten Schnitt erreicht Sam per Direktnachricht. Sie geht nicht mehr an Leo: Eine Erinnerung folgt dem Besitzer ihrer Aufgabe."
    card: { kind: reminder, task: "4" }
  - at: 2026-12-10T16:30
    text: "Sam beendet den Schnitt und hakt ihn ab."
  - at: 2026-12-11T17:00
    text: "Leo ist zurück. Er und Sam sehen sich das Video zusammen an, und Leo hakt „Abschlusskontrolle“ ab: Beide können das, denn beide haben TTM1."
  - at: 2026-12-12T17:00
    text: "Die Erinnerung zur Premiere erwähnt @Mods in #produktion, als Antwort auf die Liste. Eine Stunde vorher: Das Datum der Erinnerung ist 17 Uhr."
    card: { kind: reminder, task: "8" }
  - at: 2026-12-12T18:00
    text: "Die Premiere beginnt. Mia hakt „Das Video veröffentlichen“ ab, und der Webhook postet den Link in #ankündigungen."
    card: { kind: webhook, webhook: Neues Video, task: "9", by: "11869044175621001" }
fonte: ef4a937f2aeb
---

## Beim nächsten Mal

Nach diesem Video öffnet Mia **Mehr** <img class="inline-ic" src="/icons/other.png" alt="" /> und drückt **Liste klonen**: derselbe Kanal, ohne die Haken und ohne die Erinnerungen. Mit der **Sammelbearbeitung** ändert sie den Titel, die Aufgaben und die Links und entfernt das `{{video=…}}` des alten Videos. Dann gibt sie die neuen Daten mit **Erinnerung** ein. Siehe [Klonen](/docs/list-actions/#clone).

Der Klon behält TTM1 als Besitzer von „Abschlusskontrolle“, die Rolle bleibt also auch dann bestehen, wenn Mia die alte Liste löscht: TTM löscht sie erst, wenn keine Liste sie mehr nutzt.

## Was TTM hier nicht macht

TTM lädt keine Videos hoch, plant sie nicht und schneidet sie nicht, und es liest nicht die Analytics deines Kanals. Es speichert keine Dateien: Der Schnitt und die Thumbnails liegen in deinem Cloud-Speicher, und die Liste verlinkt auf sie. TTM hält die Arbeit der Woche, die Fristen und die Leute fest.

## Fragen

### Was, wenn Mia Leo entfernt hätte, statt seine Aufgaben an Sam zu übergeben?

Die Erinnerung wäre mit ihm gegangen: Eine Erinnerung ohne Besitzer erreicht niemanden. Wenn sie noch nicht ausgelöst hat, fragt TTM vorher nach, und du kannst das Fenster schließen, um alles zu behalten. Siehe [Besitzer](/docs/channel-tasks/#owner).

### Warum hat Sam eine Erwähnung bekommen und Mia nicht?

Eine Benachrichtigung erwähnt, wer eine Aufgabe von jemand anderem bekommt. Sam hat Leos Aufgaben von Mia bekommen. Wer handelt, wird nie erwähnt: Er weiß es schon. Siehe [Besitzer und Tags](/docs/owners-and-tags/).

### Kann die Erinnerung zur Premiere früher kommen, oder zweimal?

Die Erinnerung kommt zu dem Datum, das du ihr gibst, eine Stunde vorher heißt also 17 Uhr. Um die Mods zweimal anzupingen, eine Stunde und zehn Minuten vorher, lass sie sich wiederholen: ab 17 Uhr, alle 50 Minuten, insgesamt zweimal. Wiederkehrende Erinnerungen sind eine [Premium](/premium/)-Funktion, während der Beta für jeden Server freigeschaltet. Siehe [Wiederkehrende Erinnerungen](/docs/reminders/#repeating-reminders).
