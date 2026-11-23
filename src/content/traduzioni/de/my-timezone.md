---
title: "/my timezone"
description: "Deine Zeitzone, einmal gewählt — TTM schlägt sie dir bei jeder Datumswahl vor, auf jedem Server, im Kanal und in der Activity."
fonte: ec7d9b989675
---

Jedes Mal, wenn du ein Datum für eine Erinnerung wählst, schlägt TTM eine Zeitzone vor. Mit `/my timezone` wählst du **deine** einmal, und TTM schlägt sie dir auf jedem Server vor, im Kanal und in der Activity.

So denkt jede Person im Team in ihrer eigenen Ortszeit. Der Befehl funktioniert nur auf Servern, braucht keine Berechtigung, und sein Panel siehst nur du.

## Das Panel

`/my timezone` zeigt deine aktuelle Zone und woher sie kommt:

- **von dir gewählt**, mit **Wählen**;
- **die letzte, die du bei einer Erinnerung gelassen hast**;
- **deine Discord-Sprache**, etwa `Europe/Rome` für Italienisch;
- **der Server**, wenn deine Sprache in mehreren Zonen gesprochen wird, etwa Englisch (US).

## Deine Zone wählen

**Wählen** öffnet ein Formular. Füge den offiziellen Namen deiner Zone ein, etwa `Europe/Rome`.

Um ihn zu finden, öffne die **[Zeitzonenkarte](https://timezones.bitsplitters.app)**, wähle deine Gegend aus und kopiere den Wert.

Ab dann schlägt TTM dir deine Zone bei jeder Datumswahl vor. Eine andere Zone bei einer Erinnerung gilt nur für dieses Datum: Deine bleibt.

**Zurück zu automatisch** vergisst deine Wahl, und TTM lernt deine Zone wieder aus deinen Erinnerungen.

## Bis du wählst

TTM lernt deine Zone von selbst. Die Zone, die du bei einer Erinnerung lässt, wird deine, und die Zeile unter dem Feld sagt es dir.

Vor deiner ersten Erinnerung schlägt der Kanal die Zone deiner Discord-Sprache vor und die Activity die Zone deines Geräts. Eine Sprache, die in mehreren Zonen gesprochen wird, bekommt die Zone des Servers: siehe [Zeitzone](/docs/configuration/#time-zone) in `/config app`.

## In der Activity

Das Zahnrad oben rechts bietet dieselbe Wahl: **Zeitzone**, unter **Für dich, überall**. Dort findest du deine Zone auch über die Suche nach Stadt oder Land. Siehe [Deine Einstellungen](/docs/activity/#your-settings).
