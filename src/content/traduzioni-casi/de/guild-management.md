---
title: Mach deine Gilde bereit für die Raid-Nacht
seoTitle: "Discord-Bot zur Gildenverwaltung: Raid-Nächte und Clan-Aufgaben"
name: Gilden und Clans
description: "Die Woche einer Gilde rund um die Raid-Nacht: eine Erinnerung, die sich monatelang jeden Mittwoch wiederholt, die Probe-Raids der Rekruten nacheinander und eine Aufstellungstabelle, die sich mit Make und Google Sheets von selbst füllt."
highlights: "Eine wiederkehrende Erinnerung in Tagen, nacheinander absolvierte Proben, ein Webhook zu Make und Google Sheets, freie Variablen, Alle wieder öffnen mit neuem Datum."
intro: |
  Ava führt **Ember Vanguard**, eine Raid-Gilde mit etwa sechzig Spielern. Leo leitet die Raids, jeden Mittwoch um 20 Uhr. Die Offiziere rekrutieren, und jeder Rekrut spielt einen Probe-Raid, bevor er aufgenommen wird. Die Mitglieder spielen von beiden Seiten des Atlantiks aus. Das ist die Woche der Gilde von Montag, 7., bis Sonntag, 13. Dezember 2026.
order: 5
team:
  guild: Ember Vanguard
  zone: America/Chicago
  people:
    - { id: "11859044175621001", name: Ava, username: ava.ember, color: "#eb459e", about: "Gildenleiterin. Sie schreibt die Liste." }
    - { id: "11859044175621002", name: Leo, username: leo.raids, color: "#3ba55c", about: "Raid-Leiter und Offizier." }
    - { id: "11859044175621003", name: Kai, username: kai.ember, color: "#1abc9c", about: "Offizier." }
  roles:
    - { id: "11859044175622001", name: Offiziere, about: "Ava, Leo, Kai und zwei weitere." }
    - { id: "11859044175622002", name: Raider, about: "Das Raid-Team, etwa dreißig Spieler." }
  channels:
    - { id: "11859044175623001", name: raids, about: "Wo die Raider reden. Die Liste lebt hier." }
    - { id: "11859044175623002", name: offiziere, about: "Privat für die Offiziere." }
list:
  title: "Ember Vanguard: die Woche"
  channel: "11859044175623001"
  at: 2026-12-10T22:00
  look: |
    Die Erinnerung zum Raid zeigt `↻7d ×16`: jeden Mittwoch bis Ende März. Die drei Proben tragen Namen und Klasse des Rekruten als freie Variablen; ihr Webhook ist nicht zu sehen. „Die Gildenbank auffüllen“ hat eine einzelne Erinnerung, die jede Woche weiterwandert.
  text: |
    - [] <t:1796866200> [0m,7d,15] <@&11859044175622002>: Raid-Nacht um 20 Uhr: bis 19:45 im Voice, mit Essen und Tränken
    - [X] <t:1796857200> [0m,0m,0] <@&11859044175622001>: Die Gildenbank vor dem Raid auffüllen
    - [X] <@11859044175621002>: Die Raid-Aufstellung posten
    - [X] <@&11859044175622001>: Die Bewerbungen dieser Woche prüfen
    - [X] {{wb=Aufstellungstabelle}} <@11859044175621002>: Probe-Raid: Mirel, {{class=Heiler}} {{recruit=Mirel}}
    - [X] {{wb=Aufstellungstabelle}} <@11859044175621002>: Probe-Raid: Thorn, {{class=Tank}} {{recruit=Thorn}}
    - [] {{wb=Aufstellungstabelle}} <@11859044175621002>: Probe-Raid: Vesk, {{class=Magier}} {{recruit=Vesk}}
    - [] <@&11859044175622001>: Jedem Bewerber antworten, angenommen oder nicht
    - [] <@11859044175621001>: Das Weihnachtsevent der Gilde planen
webhooks:
  - name: Aufstellungstabelle
    service: make
    trigger: both
    method: POST
    url: https://hook.us1.make.com/<id>
    headers: "Content-Type: application/json"
    body: |
      {"recruit": "{{recruit}}", "class": "{{class}}", "officer": "{{user}}", "state": "{{state}}", "when": "{{when}}", "list": "{{list}}"}
    setup: |
      In Make erstellt Ava ein Szenario mit zwei Modulen. Das erste ist *Webhooks → Custom webhook*: Make erzeugt seine URL, die oben, und sie fügt sie in `/config webhook` ein. Das zweite ist *Google Sheets → Add a row*, auf der Aufstellungstabelle der Gilde.

      Make lernt die Form der Daten aus einer ersten Anfrage. Ava drückt im Szenario **Run once**, verknüpft den Webhook mit einer Test-Aufgabe und hakt sie ab. Jetzt lassen sich die Felder `recruit`, `class`, `officer`, `state` und `when` den Spalten der Tabelle zuordnen. Make deaktiviert einen Webhook, der fünf Tage ohne Szenario bleibt, das Szenario kommt also zuerst.

      Ohne Ereignis löst der Webhook in beide Richtungen aus. Eine Probe, die versehentlich abgehakt und wieder geöffnet wird, fügt eine zweite Zeile hinzu, mit `reopened` in der Spalte für den Status: Die Tabelle behält beide.
settings:
  - setting: Zustand nach der Auswahl beibehalten
    choice: An
    why: "Leo nimmt drei Proben hintereinander: **Besitzer** bleibt nach jeder blau."
  - setting: Benachrichtigungsmodus
    choice: Alle Benachrichtigungen außer den letzten zwei löschen
    why: "In #raids ist viel los. Die letzten zwei Benachrichtigungen bleiben unter der Liste, die älteren verschwinden."
  - setting: Zeitzone
    choice: America/Chicago
    why: "Der Raid ist um 20 Uhr, Chicagoer Zeit. Discord zeigt die Uhrzeit in der Zone jedes Lesers, ein Raider in Lissabon liest also 2 Uhr nachts."
  - setting: Wiederkehrende Erinnerungen
    choice: Wiederkehrend ein
    premium: true
    why: "Eine Erinnerung für jeden Raid bis Ende März, statt jede Woche eine neue."
week:
  - at: 2026-12-07T20:00
    text: "Ava fügt mit der **Sammelbearbeitung** <img class=\"inline-ic\" src=\"/icons/edit.png\" alt=\"\" /> drei Proben hinzu, eine Aufgabe pro Rekrut, mit Namen und Klasse als freien Variablen: `{{recruit=…}}` und `{{class=…}}`. Dann verknüpft sie jede Probe mit **Webhook** mit Aufstellungstabelle."
  - at: 2026-12-08T19:00
    text: "Leo **übernimmt** die drei Proben. Er drückt **Besitzer**, bis es blau wird, und wählt dann die erste Probe, die zweite und die dritte, ohne jemanden zu wählen. Mit *Zustand nach der Auswahl beibehalten* bleibt **Besitzer** dazwischen blau, und jede Aufgabe wird seine."
    card: { kind: notice, type: claimed, by: "11859044175621002", task: "7" }
  - at: 2026-12-09T17:00
    text: "Die Erinnerung der Offiziere erwähnt @Offiziere in #raids. Kai füllt die Gildenbank auf und hakt die Aufgabe ab."
  - at: 2026-12-09T19:30
    text: "Die Erinnerung zum Raid erwähnt @Raider in #raids, als Antwort auf die Liste. Sie kommt jeden Mittwoch um 19:30 Uhr bis Ende März."
    card: { kind: reminder, task: "1" }
  - at: 2026-12-09T22:40
    text: "Mirels Probe lief gut. Leo hakt ihre Aufgabe ab, und der Webhook schickt Make die Zeile für die Aufstellungstabelle."
    card: { kind: webhook, webhook: Aufstellungstabelle, task: "5", by: "11859044175621002" }
  - at: 2026-12-10T21:30
    text: "Thorn spielt am Donnerstag eine zweite Probe, mit einer kleineren Gruppe. Leo hakt sie ab: eine weitere Zeile in der Tabelle."
fonte: 0d0a1a51d2e4
---

## Beim nächsten Mal

Jeden Montag ersetzt Ava zuerst die fertigen Proben mit der **Sammelbearbeitung** durch die neuen Rekruten, die keine Webhooks auslöst. Dann drückt sie **Alle wieder öffnen** <img class="inline-ic" src="/icons/reopen.png" alt="" /> und wählt **Neues Datum**, mit dem nächsten Mittwoch um 17 Uhr: Die Erinnerung der Bank wandert dorthin. **Alle wieder öffnen** löst die Webhooks der Aufgaben aus, die es wieder öffnet: Wenn die fertigen Proben noch da wären, bekäme die Tabelle für jede eine Zeile „reopened“.

Niemand hakt den Raid ab: Das Abhaken einer Aufgabe stoppt ihre Erinnerung. Die Erinnerung zum Raid kommt jeden Mittwoch von selbst zurück. Siehe [Alle wieder öffnen](/docs/list-actions/#reopen-all).

## Was TTM hier nicht macht

TTM liest das Spiel nicht. Es hat keine Raid-Anmeldungen, keine Anwesenheit, keine Beute-Verfolgung und keinen Kalender mit Zu- und Absagen: Das übernimmt ein Raid-Planer-Bot. TTM hält die Arbeit der Gilde fest, pingt das Raid-Team rechtzeitig und schickt an die Tabelle, was die Offiziere entscheiden.

## Fragen

### Warum Tage und nicht Stunden?

Am 14. März 2027 werden die Uhren in Chicago um eine Stunde vorgestellt. Ava hat im Menü **Einheit** **Tage** gewählt, damit die Erinnerung nach der Umstellung bei 19:30 Uhr bleibt. Mit **Stunden** käme sie um 20:30 Uhr, wenn der Raid schon läuft. Siehe [Die Wiederholungsfelder](/docs/reminders/#the-repetition-fields).

### Wie schicke ich den Besitzer der Aufgabe an die Tabelle?

`{{user}}` ist, wer die Aufgabe abhakt, hier also Leo. Um den Besitzer auch dann zu schicken, wenn ein anderer Offizier abhakt, schreib ihn als freie Variable in die Aufgabe, `{{owner=Leo}}`, und nutze `{{owner}}` im Body. `{{task}}` trägt den Besitzer nur als Discord-Code, `<@id>`, den eine Tabelle nicht lesen kann. Siehe [Webhooks mit freien Variablen anpassen](/docs/tips/#personalize-webhooks-with-free-variables).

### Kann ein Raider eine Probe abhaken?

Nein: Jede Probe gehört Leo. Ein Raider, der es versucht, bekommt eine Ablehnung, die nur er sieht. Die Offiziere, die die Nachrichten des Kanals verwalten, können es, mit *Nachrichten verwalten*. Siehe [Wer eine Aufgabe abhaken darf](/docs/core-concepts/#who-can-tick-a-task).
