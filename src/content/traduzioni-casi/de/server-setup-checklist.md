---
title: Richte einen Discord-Server ein, ohne einen Schritt zu verpassen
seoTitle: Checkliste zur Einrichtung eines Discord-Servers, Schritt für Schritt
name: Checkliste zur Server-Einrichtung
description: "Zwei Leute eröffnen in einer Woche einen Community-Server: eine Liste für Rollen, Regeln, Sicherheit und Begrüßung, eine Erinnerung vor der Eröffnung und eine Ankündigung, die sich von selbst postet."
highlights: "Besitzer, die du übernimmst oder vergibst, Kanal-Tags, eine Erinnerung per Direktnachricht, ein Webhook, der die Eröffnungsankündigung postet, die Activity am Eröffnungsabend."
intro: |
  Ava eröffnet am Samstagabend **Pixel Harbor**, einen Community-Server für Pixel-Künstler. Leo, ein Freund, der einen anderen Server moderiert, hilft ihr. Sie haben eine Woche, von Montag, 7., bis Sonntag, 13. Dezember 2026, und eine Liste in einem privaten Kanal, den nur die beiden sehen.
order: 1
team:
  guild: Pixel Harbor
  zone: Europe/Berlin
  people:
    - { id: "11819044175621001", name: Ava, username: ava.pixels, color: "#eb459e", about: "Besitzerin des Servers. Sie erstellt die Liste." }
    - { id: "11819044175621002", name: Leo, username: leo.mod, color: "#3ba55c", about: "Moderator. Neu bei TTM." }
  roles:
    - { id: "11819044175622001", name: Admins, about: "Ava und Leo: die Aufgaben, die jeder von beiden erledigen kann.", members: ["11819044175621001", "11819044175621002"] }
  channels:
    - { id: "11819044175623001", name: setup, about: "Privat: Nur Ava und Leo sehen ihn. Die Liste lebt hier." }
    - { id: "11819044175623002", name: regeln, about: "Die Regeln des Servers." }
    - { id: "11819044175623003", name: willkommen, about: "Wo neue Mitglieder ankommen." }
    - { id: "11819044175623004", name: ankündigungen, about: "Wo die Eröffnung angekündigt wird." }
list:
  title: Eröffnung von Pixel Harbor
  channel: "11819044175623001"
  at: 2026-12-11T12:00
  tips: true
  look: |
    Abgehakte Aufgaben sind kleiner und grau, deshalb sticht heraus, was übrig ist. Jede Aufgabe hat einen Besitzer: Leo für die Aufgaben, die er übernommen hat oder die ihm gegeben wurden, Ava für ihre, @Admins für die, die jeder von beiden erledigen kann. „Die Eröffnung ankündigen“ hat seine Erinnerung, und „Die Türen öffnen“ zeigt seinen Webhook, den nur TTM sieht.
  text: |
    - [X] <@11819044175621001>: Community in den Servereinstellungen aktivieren, mit [Discords Anleitung](https://support.discord.com/hc/en-us/articles/360047132851)
    - [X] <@&11819044175622001>: Die Regeln in <#11819044175623002> schreiben
    - [X] <@11819044175621002>: AutoMod einrichten: Spam, Links und Wortfilter
    - [] <@11819044175621002>: Die Begrüßungsnachricht für <#11819044175623003> schreiben
    - [X] <@&11819044175622001>: Die Rollen erstellen
     - [X] Mitglied, Künstler, Moderator
     - [X] Farben und Reihenfolge in der Rollenliste
    - [] <@&11819044175622001>: Die Berechtigungen jeder Kategorie festlegen
    - [] <@&11819044175622001>: Den Server mit einem Account testen, der nur Mitglied ist
    - [] <@11819044175621002>: Eine Anleitung für künftige Mods anheften: :owner: dann eine Aufgabe zum Übernehmen, :reminder: für einen Ping am richtigen Tag
    - [] <t:1797008400> [0m,0m,0] <@11819044175621001>: Die Eröffnung auf unseren Social-Media-Kanälen und Partner-Servern ankündigen
    - [] {{wb=Eröffnungspost}} <@11819044175621001>: Die Türen öffnen
webhooks:
  - name: Eröffnungspost
    service: discord
    trigger: completion
    method: POST
    url: https://discord.com/api/webhooks/<id>/<token>
    headers: "Content-Type: application/json"
    body: |
      {"content": "**{{guild}} ist offen!**\nFang bei <#11819044175623002> an, dann sag Hallo in <#11819044175623003>. Wir können es kaum erwarten, deine Kunst zu sehen.", "allowed_mentions": {"parse": []}}
    postsAs: { name: Pixel Harbor, channel: "11819044175623004", color: "#f0b232" }
    setup: |
      Öffne die Einstellungen von #ankündigungen, dann *Integrationen → Webhooks → Neuer Webhook*. Gib ihm einen Namen, das Icon des Servers und drücke **Webhook-URL kopieren**: Das ist die URL oben. Die URL ist wie ein Passwort für den Kanal: Wer sie hat, kann dort posten, füge sie also nur in `/config webhook` ein.

      Der Body ist die Nachricht, Tage vor der Eröffnung geschrieben und geprüft. `allowed_mentions` mit leerem `parse` bedeutet, dass die Nachricht niemanden anpingt, auch wenn später jemand eine Erwähnung hinzufügt.
settings:
  - setting: Tipps
    choice: An, dann Aus
    why: "Leo ist neu bei TTM: Das Tutorial und die Hilfezeile unter der Liste zeigen ihm, wo er drücken muss. Ava schaltet sie Samstagnacht aus, wenn der Server offen ist und er die Buttons kennt."
  - setting: Berechtigungen synchronisieren
    choice: Geladen
    why: "Unter *Servereinstellungen → Integrationen* kann nur @Admins TTM nutzen. Nach der Synchronisierung sieht ein später hinzugefügter Moderator die Liste nur lesend, bis Ava ihm die Rolle gibt."
week:
  - at: 2026-12-07T10:00
    text: "Ava führt `/liste-erstellen` in #setup aus und schreibt nur die Aufgaben. Dann vergibt sie die Besitzer mit **Besitzer**: @Admins für die Aufgaben, die jeder von beiden erledigen kann, Leo für die Anleitung, sich selbst für Community und „Die Türen öffnen“. Mit **Webhook** verknüpft sie „Die Türen öffnen“ mit Eröffnungspost."
  - at: 2026-12-07T10:20
    text: "Leo **übernimmt** „AutoMod einrichten“: Er drückt **Besitzer**, bis es blau wird, und wählt dann die Aufgabe, ohne jemanden zu wählen. Die Aufgabe wird seine, und der Kanal sagt, wer sie übernommen hat."
    card: { kind: notice, type: claimed, by: "11819044175621002", task: "3" }
  - at: 2026-12-07T19:40
    text: "Ava aktiviert Community und schreibt mit Leo die Regeln. Sie fügt den Link zu #regeln ein, kopiert mit *Link kopieren* am Kanal: TTM macht daraus ein Kanal-Tag."
  - at: 2026-12-08T09:00
    text: "Ava **gibt** „Die Begrüßungsnachricht schreiben“ an Leo: Sie wählt ihn im Menü unter **Besitzer** und dann die Aufgabe. Die Benachrichtigung erwähnt ihn, damit Discord ihn benachrichtigt."
    card: { kind: notice, type: assigned, by: "11819044175621001", task: "4" }
  - at: 2026-12-09T21:00
    text: "Ava hakt die Gruppe „Die Rollen erstellen“ ab. Ihre zwei Unteraufgaben werden mit abgehakt."
  - at: 2026-12-10T22:10
    text: "Ava setzt eine Erinnerung auf „Die Eröffnung ankündigen“, für Freitag um 18:00 Uhr. Die Aufgabe hatte keinen Besitzer, und eine Erinnerung geht an den Besitzer: Das Speichern macht Ava zur Besitzerin."
  - at: 2026-12-11T18:00
    text: "Die Erinnerung erreicht Ava per Direktnachricht. Der Button darunter öffnet die Liste."
    card: { kind: reminder, task: "9" }
  - at: 2026-12-12T17:30
    text: "Ava öffnet die Liste mit **Activity** <img class=\"inline-ic\" src=\"/icons/activity.png\" alt=\"\" />, dem ersten Button darunter. Leo kommt mit **Activity beitreten** dazu. Sie testen den Server zusammen und haken dabei die letzten Aufgaben ab."
  - at: 2026-12-12T18:00
    text: "Ava hakt „Die Türen öffnen“ ab. Der Webhook postet die Ankündigung in #ankündigungen, unter dem Namen und Icon des Webhooks."
    card: { kind: webhook, webhook: Eröffnungspost, task: "10", by: "11819044175621001" }
  - at: 2026-12-12T18:40
    text: "Ava und Leo verlassen die Activity. Die Liste geht mit einer Zusammenfassung dessen, was sie geändert haben, zurück nach #setup, und der Thread der Liste hält jede Änderung fest, mit wem sie gemacht hat. Ava schaltet die **Tipps** in `/config app` aus."
fonte: 46fb8aa39338
---

## Beim nächsten Mal

Ava behält die Liste für den nächsten Server, den sie eröffnet: Unter **Mehr** <img class="inline-ic" src="/icons/other.png" alt="" /> gibt ihr **Herunterladen** <img class="inline-ic" src="/icons/download.png" alt="" /> die Liste als `.txt`-Datei, geschrieben wie der Text oben. Auf dem neuen Server führt sie `/liste-erstellen` aus und hängt die Datei an.

Die Rollen und Kanäle von Pixel Harbor gibt es dort nicht. TTM prüft jede Erwähnung, bevor es etwas erstellt, und listet alle auf, die der neue Server nicht hat: Ava tauscht sie in der Datei gegen die neuen aus und importiert erneut. Die Datei behält auch die Haken, und eine Erinnerung, deren Datum vorbei ist, kommt zurück, ohne auszulösen. Also ändert sie `[X]` in `[]` und gibt der Erinnerung mit **Erinnerung** ein neues Datum. Siehe [Eine Liste überall wiederverwenden](/docs/tips/#reuse-a-list-anywhere).

## Was TTM hier nicht macht

TTM verfolgt die Arbeit, die Einrichtung machst du. Es erstellt deine Kanäle nicht, ändert keine Berechtigungen und konfiguriert AutoMod nicht: Das liegt in den *Servereinstellungen*. Es kopiert auch keinen Server. Für einen Server mit denselben Kanälen und Rollen hat Discord eigene Server-Vorlagen, in den *Servereinstellungen*.

## Fragen

### Muss ich die Codes schreiben?

Nein. Die Buttons schreiben sie: **Besitzer** für den Besitzer, **Tag** für die Tags, **Erinnerung** für die Erinnerung, **Webhook** für den Webhook. Du schreibst nur die Aufgaben. Die Codes zählen, wenn du eine Liste kopierst oder lieber tippst als klickst: siehe [Eine Liste von Hand bearbeiten](/docs/writing-a-list/).

### Warum hat Leo eine Erwähnung bekommen und Ava nicht?

Eine Benachrichtigung erwähnt, wer eine Aufgabe von jemand anderem *bekommt*, damit Discord es ihm sagt. Leo hat „Die Begrüßungsnachricht schreiben“ von Ava bekommen. Als er „AutoMod einrichten“ selbst übernommen hat, wurde niemand erwähnt: Er wusste es schon. Siehe [Besitzer und Tags](/docs/owners-and-tags/).

### Sehen die Mitglieder die Liste?

Jeder, der ihren Kanal lesen kann, sieht sie. In einem privaten Kanal nur die Leute mit Zugriff. Um Listen für einige schreibgeschützt zu halten, siehe [Berechtigungen synchronisieren](/docs/configuration/#sync-permissions).
