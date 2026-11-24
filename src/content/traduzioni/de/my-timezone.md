---
title: "/my timezone"
description: "Deine Zeitzone, einmal gewählt — TTM schlägt sie dir bei jeder Datumswahl vor, auf jedem Server, im Kanal und in der Activity."
fonte: 95eefd9352af
---

Jedes Mal, wenn du ein Datum für eine Erinnerung wählst, schlägt TTM eine Zeitzone vor. Mit `/my timezone` wählst du **deine** einmal, und TTM schlägt sie dir auf jedem Server vor, im Kanal und in der Activity.

So denkt jede Person im Team in ihrer eigenen Ortszeit. Der Befehl funktioniert nur auf Servern, braucht keine Berechtigung, und sein Panel siehst nur du.

## Das Panel

`/my timezone` zeigt deine aktuelle Zone und woher sie kommt:

- **von dir gewählt**, mit **Wählen**;
- **deine Discord-Sprache**, etwa `Europe/Rome` für Italienisch;
- **der Server**, wenn deine Sprache in mehreren Zonen gesprochen wird, etwa Englisch (US).

## Deine Zone wählen

**Wählen** öffnet ein Formular. Füge den offiziellen Namen deiner Zone ein, etwa `Europe/Rome`.

Um ihn zu finden, öffne die **[Zeitzonenkarte](https://timezones.bitsplitters.app)**, wähle deine Gegend aus und kopiere den Wert.

Ab dann schlägt TTM dir deine Zone bei jeder Datumswahl vor. Eine andere Zone bei einer Erinnerung gilt nur für dieses Datum: Deine bleibt.

**Meine Zeitzone entfernen** vergisst deine Wahl, und TTM schlägt wieder die Zone vor, die es nutzt, [bis du wählst](#until-you-choose).

## Bis du wählst

TTM ändert deine Zone nicht von selbst: Eine andere Zone bei einer Erinnerung gilt nur für dieses Datum.

Der Kanal schlägt die Zone deiner Discord-Sprache vor und die Activity die Zone deines Geräts. Eine Sprache, die in mehreren Zonen gesprochen wird, bekommt die Zone des Servers: siehe [Zeitzone](/docs/configuration/#time-zone) in `/config app`. Die Zeile unter dem Feld sagt dir, woher die Zone kommt und wie du deine festlegst.

## In der Activity

Das Zahnrad oben rechts bietet dieselbe Wahl: **Zeitzone**, unter **Für dich, überall**. Dort findest du deine Zone auch über die Suche nach Stadt oder Land. Siehe [Deine Einstellungen](/docs/activity/#your-settings).
