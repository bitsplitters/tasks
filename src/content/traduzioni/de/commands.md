---
title: "Befehlsreferenz"
description: "Jeder Slash-Befehl an einem Ort, mit der Seite, die ihn erklärt: Das meiste von TTM steckt in Buttons, nicht in Befehlen."
fonte: f50d9f1a0b4b
---

TTM hält Befehle auf ein Minimum: Sobald eine Liste existiert, machst du alles mit Buttons und Menüs. Um einen Befehl auszuführen, tippe `/` in das Nachrichtenfeld und wähle ihn. Du kannst auch den **App-Launcher** in der Nachrichtenleiste öffnen und unter *Apps auf diesem Server* **Team Tasks Manager** wählen.

Ist dein Discord in einer anderen Sprache, sind einige Namen übersetzt: siehe [Befehlsnamen in deiner Sprache](#command-names-in-your-language) ganz unten.

| Befehl | Wofür er da ist | Wo er erklärt wird |
| :--- | :--- | :--- |
| `/liste-erstellen` | Eine Liste erstellen oder eine aus einer Datei neu aufbauen | [Erstelle deine erste Liste](/docs/getting-started/#2-create-your-first-list); die Datei [unten](#create-list) |
| `/config` | Die drei Befehle für alle, die sich auf dem Server um TTM kümmern | [/config](/docs/config/) |
| `/config app` | Die Einstellungen des Servers: Benachrichtigungen, Verlauf, Tipps, Erinnerungen, Zeitzone, Berechtigungen | [/config app](/docs/configuration/) |
| `/config lists` | Jede Liste des Servers: mehrere auf einmal regenerieren, versiegeln oder löschen | [/config lists](/docs/config-lists/) |
| `/config webhook` | Einen Webhook erstellen, ansehen, bearbeiten oder löschen | [/config webhook](/docs/config-webhook/) |
| `/my timezone` | Deine Zeitzone, gleich auf allen Servern | [/my timezone](/docs/my-timezone/) |
| `/beta` | Was die Beta für deinen Server bedeutet | [So funktioniert die Beta](/docs/beta/) |
| `/help` | Dein Ausgangspunkt in Discord | [Unten](#help) |
| `/invite` | Eine Karte, um TTM auf einem anderen Server hinzuzufügen | [Unten](#invite) |
| `/news` | Das Neueste zu TTM | [Unten](#news) |

## `/liste-erstellen`

Um eine Liste von Grund auf zu erstellen, siehe [Erstelle deine erste Liste](/docs/getting-started/#2-create-your-first-list). Dieser Abschnitt handelt von der einzigen Option des Befehls, **`datei`**, die du weglassen kannst.

Hänge die `.txt`-Datei an, die dir **Herunterladen** einer Liste gibt. Sie ist nach der Liste benannt und kann von einem anderen Server stammen. TTM baut die Liste dann aus der Datei neu auf, statt das Formular zum Erstellen zu öffnen.

Die Liste kommt mit ihren Aufgaben und deren Zustand, Besitzern, Tags, Erinnerungen und Webhooks zurück. Wie jede neue Liste braucht sie einen freien Platz in deinem Tarif (siehe [So funktionieren die drei Plätze](/docs/premium/#how-the-three-places-work)).

TTM lehnt eine Datei sofort ab, wenn sie keine `.txt` ist oder größer als **64 KB**. Sonst liest TTM die Datei. Passt etwas nicht, erstellt TTM nichts und listet alle Probleme in einer Nachricht auf, jedes mit seiner Zeile oder seiner Aufgabe:

- **Das Format**: Die Datei ist kein UTF-8-Text oder beginnt nicht mit `#!ttm/1`. Der Titel fehlt oder ist länger als 90 Zeichen.

  Eine Zeile ist keine Aufgabe, oder eine Erinnerung ist in Monaten (`M`) oder fehlerhaft geschrieben. Ein Webhook ist mit einer Aufgabe ohne Text verknüpft, die Liste beginnt mit einer Unteraufgabe oder es gibt keine Aufgaben.
- **Die Größe**: Die Liste ist zu lang für eine Nachricht oder hat mehr Aufgaben, als eine Liste fassen kann oder dein Tarif erlaubt.
- **Die Erinnerungen**: Eine Erinnerung hat keinen Besitzer, hat kein Datum und einen Abstand von null oder wiederholt sich öfter, als dein Tarif erlaubt. Eine wiederkehrende Erinnerung wird abgelehnt, wo keine neuen erstellt werden können (siehe [Erinnerungen](/docs/reminders/#repeating-reminders)). Es würden zu viele Erinnerungen gleichzeitig warten.
- **Dieser Server**: Eine Rolle, ein Kanal oder ein Webhook in der Datei existiert hier nicht, oder ein Benutzer in der Datei ist kein Mitglied.

Erinnerungen, deren Termine alle in der Vergangenheit liegen, sind kein Problem: Sie kommen an ihren Aufgaben zurück und senden nichts mehr.

→ Siehe [Eine Liste überall wiederverwenden](/docs/tips/#reuse-a-list-anywhere).

## `/help`

Dieser Befehl ist dein Ausgangspunkt in Discord. Er öffnet ein Panel mit fünf Buttons:

- **Startseite** <img class="inline-ic" src="/icons/home.png" alt="" />: ein Überblick über die App.
- **Loslegen** <img class="inline-ic" src="/icons/start.png" alt="" />: eine Kurzanleitung mit einem Link zu dieser Dokumentation.
- **Konfiguration** <img class="inline-ic" src="/icons/config.png" alt="" />: wofür `/config app`, `/config lists` und `/config webhook` da sind.
- **Premium** <img class="inline-ic" src="/icons/premium.png" alt="" />: wie der bezahlte Tarif nach dem Ende der Beta aussehen wird, mit den Free-Grenzen.
- **Über uns** <img class="inline-ic" src="/icons/aboutus.png" alt="" />: wer TTM baut.

## `/invite`

Zeigt eine Karte, um Team Tasks Manager auf einem anderen Server hinzuzufügen: dieselbe Präsentation wie seine Seite im App-Verzeichnis (was es macht, wie man startet), den Button **Zu Discord hinzufügen**, die Anleitung und den Support-Server.

**Zu Discord hinzufügen** öffnet die Autorisierungsseite von Discord für den Bot, mit denselben Berechtigungen wie https://tasks.bitsplitters.app/invite.

Die Karte ist für alle im Kanal sichtbar, du kannst sie also dort ausführen, wo die Personen sie sehen, die den anderen Server einrichten. Sie liest nichts vom Server und braucht keine Berechtigung.

## `/news`

Das Neueste zu Team Tasks Manager, in deiner Sprache: was es im Bot Neues gibt und wie du es nutzt. Die Meldung öffnet sich in einer Nachricht, die nur du siehst, mit ihrem Datum unter dem Titel.

Unter dem Text öffnet **Discord-Server** unseren Support-Server und **Versionshinweise** öffnet diese Version auf der Seite [Versionshinweise](/docs/release-notes/). Gibt es ältere oder neuere Neuigkeiten, führen dich die Buttons **Zurück** und **Weiter** dorthin.

Gehst du zurück, findest du jede Version seit der ersten, 1.0.0, jeweils mit ihrem Erscheinungsdatum. Es funktioniert nur auf Servern und braucht keine Berechtigung.

Gibt es Neuigkeiten, die noch niemand auf deinem Server gelesen hat, sagt das die letzte Zeile der Panels des Bots, anstelle der üblichen Fußzeile: in `/help`, der Anleitung, **Mehr**, `/config app` und der Erklärung, die `/liste-erstellen` zeigt.

Sobald jemand auf dem Server `/news` öffnet, verschwindet die Zeile für alle. Ein Server, der TTM nach einer Neuigkeit hinzufügt, bekommt die Zeile nicht: Die Neuigkeit steht in `/news`.

## Befehlsnamen in deiner Sprache

Discord zeigt jeden Befehl in der Sprache deiner Discord-App und auf Englisch für eine Sprache, in die TTM nicht übersetzt ist. `/config app`, `/config lists`, `/config webhook` (mit seiner Option `webhook`), `/my timezone`, `/beta`, `/help`, `/invite` und `/news` behalten überall denselben Namen.

| Sprache | `/create-list` | seine Option `file` | Optionen von `/config webhook` |
| :--- | :--- | :--- | :--- |
| Englisch und jede andere Sprache | `/create-list` | `file` | `action` · `trigger` |
| Italiano | `/crea-lista` | `file` | `azione` · `evento` |
| Español | `/crear-lista` | `archivo` | `acción` · `evento` |
| Português (Brasil) | `/criar-lista` | `arquivo` | `ação` · `evento` |
| Français | `/creer-liste` | `fichier` | `action` · `événement` |
| Deutsch | `/liste-erstellen` | `datei` | `aktion` · `ereignis` |

Auch die Auswahlmöglichkeiten innerhalb der Optionen (ansehen, erstellen, bearbeiten, löschen; Abschluss, Wiedereröffnung) erscheinen in deiner Sprache.
