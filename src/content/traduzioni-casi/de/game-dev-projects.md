---
title: Bring dein Spiel ans Ziel, mit dem Team, mit dem du schon redest
seoTitle: Discord-Bot fürs Projektmanagement von Game-Dev-Teams
name: Game-Dev-Projekte
description: "Drei Entwickler und ihre Tester, ein Meilenstein nach dem anderen: eine Übergabe, wenn jemand krank wird, der Playtest-Build, der per Haken auf GitHub Actions startet, und der Ping an die Tester am Playtest-Tag."
highlights: "Ein Meilenstein pro Gruppe, eine von jemand anderem übernommene Aufgabe, eine Erinnerung, die ihrem neuen Besitzer folgt, ein Webhook, der einen GitHub-Actions-Build startet, das wöchentliche Meeting in der Activity."
intro: |
  Ava, Leo und Sam machen **Lantern Keep**, ein kleines Roguelike, in ihren Abenden. Ava schreibt den Code, Leo zeichnet, Sam macht die Musik. Fünf Spieler aus ihrer Community testen jeden Build. Die Liste lebt in #dev, seit das Projekt begonnen hat; das ist die Woche von Montag, 7., bis Sonntag, 13. Dezember 2026, mit einem Playtest am Freitag.
order: 4
team:
  guild: Lantern Keep
  zone: Europe/Stockholm
  people:
    - { id: "11849044175621001", name: Ava, username: ava.codes, color: "#eb459e", about: "Code. Sie leitet das Projekt." }
    - { id: "11849044175621002", name: Leo, username: leo.draws, color: "#3ba55c", about: "Grafik." }
    - { id: "11849044175621003", name: Sam, username: sam.sound, color: "#5865f2", about: "Musik und Sound. Diese Woche krank." }
  roles:
    - { id: "11849044175622001", name: Tester, about: "Fünf Spieler aus der Community." }
  channels:
    - { id: "11849044175623001", name: dev, about: "Der Kanal des Teams; die Tester können ihn lesen. Die Liste lebt hier." }
    - { id: "11849044175623002", name: devlog, about: "Wo die Spieler die Neuigkeiten zum Spiel lesen." }
    - { id: "11849044175623003", name: playtest, about: "Wo die Tester Bugs melden." }
list:
  title: "Lantern Keep: 0.4 und 0.5"
  channel: "11849044175623001"
  at: 2026-12-10T19:00
  spaced: true
  look: |
    Jeder Meilenstein ist eine Gruppe, mit einer Leerzeile drumherum. Was erledigt ist, verblasst, deshalb sticht heraus, was von 0.4 übrig ist: der Playtest. „Die Trailer-Musik mischen“ gehört jetzt Ava, mit ihrer Erinnerung. Der Webhook von „Die Playtest-Version bauen“ ist nicht zu sehen; `{{version=0.4.0}}` schon, und der Build hat es gelesen.
  text: |
    - [] Meilenstein 0.4: der Playtest
     - [X] <@11849044175621001>: Angeln: auswerfen, warten, einholen
     - [X] <@11849044175621002>: Sprites für die sechs Fische
     - [X] <@11849044175621001>: Die Bugs aus dem letzten Playtest beheben, im [Bericht der Tester](https://discord.com/channels/1184904417562000000/11849044175623003/1184904417562399001)
     - [X] {{wb=Playtest-Build}} <@11849044175621001>: Die Playtest-Version bauen {{version=0.4.0}}
     - [] <t:1797008400> [0m,0m,0] <@&11849044175622001>: Playtest um 18 Uhr, danach in <#11849044175623003> melden
    - [] Meilenstein 0.5: der Trailer
     - [] <t:1797073200> [0m,0m,0] <@11849044175621001>: Die Trailer-Musik mischen
     - [] <@11849044175621002>: Die Gameplay-Clips aufnehmen
     - [] <@11849044175621003>: Soundeffekte fürs Angeln
     - [] <@11849044175621002>: Den Trailer schneiden, 45 Sekunden
    - [] <@11849044175621001>: Meilenstein 0.6 im [Design-Dokument](https://docs.google.com/document/d/1lantern-keep-design/edit) planen
    - [] <@11849044175621001>: Den Devlog in <#11849044175623002> posten
webhooks:
  - name: Playtest-Build
    service: github
    trigger: completion
    method: POST
    url: https://api.github.com/repos/lantern-keep/game/actions/workflows/playtest.yml/dispatches
    headers: |
      Accept: application/vnd.github+json
      Authorization: Bearer <your token>
      X-GitHub-Api-Version: 2026-03-10
      Content-Type: application/json
    body: |
      {"ref": "main", "inputs": {"version": "{{version}}", "requested_by": "{{user}}"}}
    setup: |
      Der Workflow, der das Spiel baut, startet mit `workflow_dispatch` und deklariert die beiden Inputs, die der Body sendet. Er muss auf dem Standard-Branch des Repositorys liegen:

      ```yaml
      on:
        workflow_dispatch:
          inputs:
            version:
              required: true
            requested_by:
              required: false
      ```

      Die Schritte lesen dann `${{ inputs.version }}`. Der Token kommt in den Header `Authorization`. Ava erstellt ein *fine-grained* Personal Access Token unter *GitHub → Settings → Developer settings*, beschränkt auf dieses eine Repository, mit nur der Berechtigung *Actions*, lesend und schreibend. Ein geleaktes Token kann einen Build starten und sonst nichts.

      Das Ereignis ist nur der Abschluss: Wenn die Aufgabe versehentlich wieder geöffnet wird, startet das keinen zweiten Build.
settings:
  - setting: Erledigte Aufgaben abgedunkelt
    choice: An
    why: "Die erledigten Teile eines Meilensteins verblassen, und was übrig ist, sticht heraus."
  - setting: Abstand um Gruppen
    choice: An
    why: "Jeder Meilenstein ist eine Gruppe: Eine Leerzeile zeigt, wo einer endet und der nächste beginnt."
week:
  - at: 2026-12-07T20:00
    text: "Ava fügt Meilenstein 0.5 mit der **Sammelbearbeitung** <img class=\"inline-ic\" src=\"/icons/edit.png\" alt=\"\" /> hinzu: den Trailer, in vier Aufgaben. Dann gibt sie jeder ihren Besitzer mit **Besitzer** und der Musik ihre Frist mit **Erinnerung**."
  - at: 2026-12-08T09:15
    text: "Sam ist die ganze Woche krank, und die Trailer-Musik ist am Samstag fällig. Ava **übernimmt** „Die Trailer-Musik mischen“ von ihm: Sie drückt **Besitzer**, wählt sich selbst im Menü, bestätigt und wählt dann die Aufgabe. Nur die Aufgabe zu wählen würde nicht reichen: Einen Besitzer zu ersetzen verlangt eine ausdrückliche Wahl. Die Benachrichtigung nennt Sam und erwähnt niemanden, weil Ava es weiß. Die Erinnerung der Aufgabe geht jetzt an sie."
    card: { kind: notice, type: updated, by: "11849044175621001", from: "11849044175621003", task: "2.1" }
  - at: 2026-12-09T20:00
    text: "Das wöchentliche Meeting, im Sprachanruf. Ava öffnet die Liste mit **Activity** <img class=\"inline-ic\" src=\"/icons/activity.png\" alt=\"\" />, und Leo kommt mit **Activity beitreten** dazu. Mit **Liste bearbeiten** verschieben sie die Bugfixes vor den Build und fügen den Link zum Bericht der Tester hinzu. Während sie bearbeitet, ist die ganze Liste für Leo gesperrt: Die Kästchen kommen zurück, wenn sie speichert."
  - at: 2026-12-10T18:30
    text: "Die Bugs sind behoben. Ava hakt „Die Playtest-Version bauen“ ab, und der Webhook startet den Build auf GitHub Actions, mit der Version, die in der Aufgabe steht."
    card: { kind: webhook, webhook: Playtest-Build, task: "1.4", by: "11849044175621001" }
  - at: 2026-12-11T18:00
    text: "Die Erinnerung an die Tester kommt in #dev an, als Antwort auf die Liste, und erwähnt @Tester. Jeder von ihnen kann den Playtest abhaken, sobald er gespielt und gemeldet hat."
    card: { kind: reminder, task: "1.5" }
  - at: 2026-12-12T12:00
    text: "Die Erinnerung an die Trailer-Musik erreicht Ava per Direktnachricht, nicht Sam: Eine Erinnerung folgt dem Besitzer ihrer Aufgabe."
    card: { kind: reminder, task: "2.1" }
fonte: e78bad9b590a
---

## Beim nächsten Mal

Wenn 0.4 erledigt ist, drückt Ava **Liste bereinigen**: Der fertige Meilenstein verschwindet mit seinen Unteraufgaben, und 0.5 rückt nach oben. Mit der **Sammelbearbeitung** schreibt sie darunter 0.6, aus dem Design-Dokument. Der Webhook bleibt auf dem Server: Sie verknüpft ihn mit **Webhook** <img class="inline-ic" src="/icons/api.png" alt="" /> mit der nächsten Build-Aufgabe und schreibt mit **Inhalt** `{{version=0.5.0}}` in ihren Text. Siehe [Bereinigen](/docs/list-actions/#clean).

## Was TTM hier nicht macht

TTM ist kein Issue-Tracker. Es liest dein Repository nicht, schließt keine Issues und zeigt kein Burndown: Das machen GitHub, GitLab und Jira. Es startet den Build und wartet nicht auf sein Ergebnis. Wenn das Team das Ergebnis in Discord will, kann der Workflow es mit einem eigenen Discord-Webhook in einen Kanal posten.

## Fragen

### Warum hat Ava die Aufgabe nicht einfach gewählt, um sie zu übernehmen?

Eine Aufgabe zu wählen, ohne jemanden gewählt zu haben, übernimmt sie nur, wenn sie frei ist. Eine Aufgabe, die jemand anderem gehört, bleibt seine, und TTM sagt warum. Um einen Besitzer zu ersetzen, wählst du zuerst den neuen im Menü. Siehe [Besitzer](/docs/channel-tasks/#owner).

### Startet das Wiedereröffnen der Aufgabe einen weiteren Build?

Nein. Der Webhook wurde mit `ereignis:abschluss` erstellt, also löst ihn nur der Abschluss aus. Ohne ein Ereignis würde er bei beiden auslösen. Siehe [Wann ein Webhook auslöst](/docs/webhooks/#when-a-webhook-fires).

### Kann ein Tester den Playtest abhaken?

Ja: Die Aufgabe gehört @Tester, also kann jedes Mitglied der Rolle sie abhaken. Ava kann das auch, mit *Nachrichten verwalten* im Kanal. Siehe [Wer eine Aufgabe abhaken darf](/docs/core-concepts/#who-can-tick-a-task).
