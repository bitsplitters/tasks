---
title: Halte dein Mod-Team auf demselben Stand
seoTitle: "Discord-Bot fürs Staff-Management: Aufgaben für dein Mod-Team"
name: Staff und Mod-Team
description: "Die Woche eines Moderationsteams in einer Liste: im Besitz einer Rolle, eine Meeting-Erinnerung, die sich wiederholt, zwei neue Helfer, die sich eine Aufgabe teilen, und eine Ankündigung, wenn sich die Regeln ändern."
highlights: "Eine Rolle als Besitzer, die Ablehnung für alle, die sie nicht haben, eine Rolle, die TTM für zwei Personen erstellt, eine wiederkehrende Erinnerung, ein Webhook mit einer freien Variable, der Verlaufs-Thread."
intro: |
  Ava leitet die Moderatoren von **Lumen Lounge**, einem Server mit etwa 4.000 Mitgliedern. Die Aufgaben des Staffs wiederholen sich jede Woche, und zwei neue Helfer, Kai und Zoe, fangen am Montag an. Das ist die erste Woche des Teams mit TTM, von Montag, 7., bis Sonntag, 13. Dezember 2026.
order: 2
team:
  guild: Lumen Lounge
  zone: America/New_York
  people:
    - { id: "11829044175621001", name: Ava, username: ava.lumen, color: "#eb459e", about: "Leiterin der Moderatoren und selbst Moderatorin." }
    - { id: "11829044175621002", name: Leo, username: leo.lumen, color: "#3ba55c", about: "Moderator." }
    - { id: "11829044175621003", name: Noa, username: noa.lumen, color: "#e67e22", about: "Helferin." }
    - { id: "11829044175621004", name: Kai, username: kai.lumen, color: "#1abc9c", about: "Neuer Helfer, ab Montag." }
    - { id: "11829044175621005", name: Zoe, username: zoe.lumen, color: "#9b59b6", about: "Neue Helferin, ab Montag." }
  roles:
    - { id: "11829044175622001", name: Moderatoren, about: "Ava, Leo und drei weitere." }
    - { id: "11829044175622002", name: Helfer, about: "Noa und ab Montag Kai und Zoe." }
    - { id: "11829044175622003", name: Admins, about: "Die Besitzer des Servers." }
    - { id: "11829044175622004", name: TTM1, about: "Von TTM für eine Aufgabe erstellt, die zwei Personen gehört.", members: ["11829044175621004", "11829044175621005"], ttm: true }
  channels:
    - { id: "11829044175623001", name: staff, about: "Privat für den Staff. Die Liste lebt hier." }
    - { id: "11829044175623002", name: regeln, about: "Die Regeln des Servers." }
    - { id: "11829044175623003", name: ankündigungen, about: "Wo jedes Mitglied die Neuigkeiten liest." }
list:
  title: "Mod-Team: Woche 50"
  channel: "11829044175623001"
  at: 2026-12-09T21:00
  look: |
    Fast jede Aufgabe gehört @Moderatoren: Jeder Moderator kann sie abhaken. „Einen Tag lang einen Moderator begleiten“ gehört @TTM1, der Rolle, die TTM für Kai und Zoe erstellt hat. Die Erinnerung zum Meeting zeigt `↻7d ×4`: alle 7 Tage, insgesamt 4 Mal.
  text: |
    - [X] <@&11829044175622001>: Die offenen Meldungen prüfen
    - [] <@&11829044175622001>: Die Mod-Warteschlange leeren
    - [X] <@&11829044175622001>: Das AutoMod-Log prüfen
    - [] <t:1796688000> [0m,7d,3] <@&11829044175622001>: Staff-Meeting, Montag um 19 Uhr im Sprachkanal Staff
    - [X] {{wb=Regeln geändert}} <@&11829044175622001>: Die Regeln in <#11829044175623002> aktualisieren {{change=Spoiler bleiben nach einem Release zwei Wochen lang in den Spoiler-Kanälen}} <@&11829044175622003>
    - [X] <@&11829044175622004>: Einen Tag lang einen Moderator begleiten
    - [] <@11829044175621001>: Die neuen Helfer willkommen heißen
     - [X] Kai und Zoe die Rolle Helfer geben
     - [] Ihnen die Mod-Werkzeuge zeigen
    - [] <@&11829044175622001>: Die Notizen zum Meeting für alle posten, die es verpasst haben
    - [] <@&11829044175622001>: Das Community-Event der nächsten Woche planen
    - [] <@&11829044175622001>: Den Mitgliedern danken, die diese Woche geholfen haben
webhooks:
  - name: Regeln geändert
    service: discord
    trigger: completion
    method: POST
    url: https://discord.com/api/webhooks/<id>/<token>
    headers: "Content-Type: application/json"
    body: |
      {"content": "**Die Regeln haben sich geändert.** {{change}}.\nLies die neue Fassung in <#11829044175623002>.", "allowed_mentions": {"parse": []}}
    postsAs: { name: Lumen Staff, channel: "11829044175623003", color: "#5865f2" }
    setup: |
      Öffne die Einstellungen von #ankündigungen, dann *Integrationen → Webhooks → Neuer Webhook*. Nenne ihn „Lumen Staff“ und drücke **Webhook-URL kopieren**: Das ist die URL oben. Halte sie geheim, wie ein Passwort.

      Der Body sagt nicht, was sich geändert hat: Das sagt `{{change}}`, aus der freien Variable, die in der Aufgabe steht, `{{change=…}}`. Wenn sich die Regeln das nächste Mal ändern, schreibt der Moderator die neue Änderung mit **Inhalt** in die Aufgabe, und derselbe Webhook meldet sie. `allowed_mentions` mit leerem `parse` verhindert, dass die Nachricht jemanden anpingt.
settings:
  - setting: Benachrichtigungsmodus
    choice: Alle Benachrichtigungen außer der letzten löschen
    why: "In #staff redet das Team. Unter der Liste bleibt nur die letzte Benachrichtigung, damit das Gespräch lesbar bleibt."
  - setting: Verlaufsverfolgung
    choice: An
    why: "Der Thread der Liste hält eine Zeile pro Aktion fest, mit wem sie gemacht hat: Ava liest die Woche dort, nicht im Kanal."
  - setting: Zustand nach der Auswahl beibehalten
    choice: An
    why: "Ava wählt @Moderatoren einmal und gibt es mehreren Aufgaben hintereinander: **Besitzer** bleibt nach jeder blau."
  - setting: Wiederkehrende Erinnerungen
    choice: Wiederkehrend ein
    premium: true
    why: "Das Staff-Meeting ist jeden Montag: eine Erinnerung, die sich wiederholt, statt jede Woche eine neue."
  - setting: Berechtigungen synchronisieren
    choice: Geladen
    why: "Unter *Servereinstellungen → Integrationen* können nur die Staff-Rollen TTM nutzen. Ein Mitglied, das versehentlich in #staff landet, sieht die Liste nur lesend."
week:
  - at: 2026-12-07T09:00
    text: "Ava schreibt die Liste der Woche mit `/liste-erstellen` in #staff, ohne Besitzer."
  - at: 2026-12-07T09:10
    text: "Ava wählt @Moderatoren im Menü unter **Besitzer** und dann die Aufgaben nacheinander. Mit *Zustand nach der Auswahl beibehalten* bleibt **Besitzer** dazwischen blau, sodass jede Aufgabe die Rolle mit einem Klick bekommt. Jede Benachrichtigung erwähnt @Moderatoren; mit *Alle Benachrichtigungen außer der letzten löschen* bleibt nur die letzte."
  - at: 2026-12-07T10:30
    text: "Ava gibt „Einen Tag lang einen Moderator begleiten“ Kai und Zoe zusammen: Sie wählt beide im Menü. TTM erstellt die Rolle **TTM1**, gibt sie den beiden und macht sie zum Besitzer. Die Benachrichtigung erwähnt die Rolle, damit beide benachrichtigt werden. Ein Besitzer aus mehreren Personen ist eine [Premium](/premium/)-Funktion, während der Beta für jeden Server freigeschaltet."
    card: { kind: notice, type: assigned, by: "11829044175621001", task: "6" }
  - at: 2026-12-07T19:00
    text: "Die Erinnerung zum Meeting kommt an. Der Besitzer ist eine Rolle, die Erinnerung ist also eine Nachricht in #staff, die @Moderatoren erwähnt, als Antwort auf die Liste."
    card: { kind: reminder, task: "4" }
  - at: 2026-12-08T11:00
    text: "Leo aktualisiert die Regeln und hakt die Aufgabe ab. Der Webhook postet die Änderung in #ankündigungen, mit dem Text der freien Variable."
    card: { kind: webhook, webhook: Regeln geändert, task: "5", by: "11829044175621002" }
  - at: 2026-12-08T15:20
    text: "Noa, eine Helferin, versucht, „Die offenen Meldungen prüfen“ abzuhaken. Die Aufgabe gehört @Moderatoren, deshalb bekommt sie eine Ablehnung, die nur sie sieht: *Diese Aufgabe kann nur @Moderatoren abhaken oder wieder öffnen – oder wer die Nachrichten dieses Kanals verwaltet.* Die Liste ändert sich nicht."
  - at: 2026-12-08T15:30
    text: "Leo prüft die Meldungen und hakt die Aufgabe ab: Das kann jedes Mitglied der Rolle."
  - at: 2026-12-09T18:00
    text: "Kai und Zoe verbringen den Tag mit Leo. Am Abend hakt Kai ihre Aufgabe ab: Beide können das, denn beide haben TTM1."
  - at: 2026-12-11T17:00
    text: "Ava öffnet den Thread der Liste. Er hat eine Zeile für jeden Besitzer, jedes Abhaken und jede Änderung der Woche, mit wem sie gemacht hat."
  - at: 2026-12-11T17:15
    text: "Ava will TTM1 für die nächsten Probezeiten behalten. In *Servereinstellungen → Rollen* benennt sie ihn in „Helfer in Probezeit“ um: Ab da ist er eine der Rollen des Servers, und TTM löscht ihn nie. Ohne den neuen Namen würde TTM die Rolle löschen, sobald keine Liste sie mehr nutzt."
fonte: 00ff5b6fd601
---

## Beim nächsten Mal

Jeden Montag drückt Ava **Alle wieder öffnen** <img class="inline-ic" src="/icons/reopen.png" alt="" /> und wählt **Wieder öffnen**: Die Aufgaben beginnen mit ihren Besitzern von vorn. Niemand hakt das Staff-Meeting ab, denn das Abhaken einer Aufgabe stoppt ihre Erinnerung: Es bleibt den ganzen Monat in der Liste, und seine Erinnerung kommt jeden Montag von selbst zurück. Eine Liste mit einmaligen Erinnerungen würde stattdessen **Neues Datum** nutzen, das sie sofort in die neue Woche verschiebt. Siehe [Alle wieder öffnen](/docs/list-actions/#reopen-all).

## Was TTM hier nicht macht

TTM moderiert nicht. Es hat keine Bans, Verwarnungen, Fallprotokolle oder Tickets: Das übernehmen ein Moderations-Bot und ein Ticket-Bot. TTM hält die Arbeit drumherum fest, die Aufgaben, die dein Team jede Woche wiederholt. Es verfolgt keine Schichten und misst nicht, wie aktiv jeder Moderator ist.

## Fragen

### Wer kann eine Aufgabe abhaken, die einer Rolle gehört?

Jedes Mitglied der Rolle und wer *Nachrichten verwalten* im Kanal hat. Alle anderen bekommen eine Ablehnung, die nur sie sehen: siehe [Wer eine Aufgabe abhaken darf](/docs/core-concepts/#who-can-tick-a-task).

### Kann ein Moderator die Erinnerung per Direktnachricht bekommen?

Ja: Mach diesen Moderator zum Besitzer statt der Rolle. Eine Erinnerung erreicht eine Person per Direktnachricht und eine Rolle per Erwähnung im Kanal. Siehe [Wie die Erinnerung ankommt](/docs/reminders/#how-the-reminder-arrives).

### Was passiert mit TTM1, wenn ihn niemand umbenennt?

TTM löscht eine Rolle, die es erstellt hat, sobald keine Liste sie mehr nutzt, und prüft das alle zehn Minuten. Sie umzubenennen, ihr eine Berechtigung zu geben oder ihre Mitglieder zu ändern macht sie zu einer Rolle deines Servers, und TTM lässt sie in Ruhe. Siehe [Die Rollen, die TTM erstellt](/docs/owners-and-tags/#the-roles-ttm-creates).
