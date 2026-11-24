---
title: "Versionshinweise"
description: "Was es Neues in Team Tasks Manager gibt, das Neueste zuerst."
fonte: 96dbaef26d7b
---

Jede Änderung, die du in Discord siehst, steht hier, das Neueste zuerst. Jeder Eintrag verlinkt auf die Seite, die ihn erklärt.

## 2.6.0 — Deine Zeitzone, überall

Released 2026-11-24

- **Wähle deine Zeitzone einmal** — **/my timezone** zeigt dir auf jedem Server deine Zeitzone und woher sie kommt. Mit **Wählen** legst du deine fest, und TTM schlägt sie dir auf jedem Server vor, im Kanal und in der Activity. Mit **Meine Zeitzone entfernen** gehst du zur vorgeschlagenen zurück. Siehe [/my timezone](/docs/my-timezone/).
- **Eine andere Zone gilt nur für dieses Datum** — die Zone, die du in einer Erinnerung angibst, wird nicht mehr deine, und die Zonen, die TTM so gelernt hatte, sind vergessen: TTM schlägt dir deine erst vor, wenn du sie wählst. Unter der Zeitzone von **Wann** sagt dir eine Zeile, woher die Zone kommt und wie du deine wählst. Siehe [/my timezone](/docs/my-timezone/).
- **Auch in der Activity** — das Zahnrad zeigt deine Zeitzone unter **Für dich, überall**, genau wie `/my timezone`. Unter der Zeitzone einer Erinnerung verlinkt die Zeile darauf. Siehe [Deine Einstellungen](/docs/activity/#your-settings).

## 2.5.0 — Namen statt Codes

Released 2026-11-23

- **Personen, Rollen und Kanäle mit Namen** — **Sammelbearbeitung** zeigt `@Ava`, `@Moderatoren` und `#allgemein` statt der Codes von Discord, und das Formular **Inhalt** zeigt Kanäle mit Namen. Schreibe `@` und einen Namen für jede Rolle und jeden Kanal und für alle, die schon in der Liste stehen. Jemand Neuen fügst du mit **Besitzer** oder **Tag** hinzu oder schreibst seinen Code. Ein Name, den TTM nicht kennt, bleibt Text, außer als Besitzer: Dann sagt TTM es dir und speichert nichts. Siehe [Personen, Rollen und Kanäle mit Namen](/docs/writing-a-list/#people-roles-and-channels-by-name).
- **Inhalt ist nur der Text** — das Formular **Inhalt** zeigt die Tags der Aufgabe nicht mehr, wie in der Activity: Sie bleiben an der Aufgabe, und **Tag** ändert sie. Ein im Formular getippter Tag wird entfernt, und TTM sagt es dir. Siehe [Inhalt](/docs/channel-tasks/#content).
- **Lesbare Erinnerungsdaten** — im Text einer Liste steht das Datum einer Erinnerung als `2026-12-08 18:00`, in deiner Zeitzone, statt als Code. Ändere es und speichere, dann wandert die Erinnerung. Um eine Uhrzeit zu behalten, die dir jemand in seiner Zone genannt hat, schreibe die Zone dahinter: `2026-12-08 18:00 America/New_York`. Siehe [Erinnerungen im Text](/docs/writing-a-list/#reminders-in-the-text).
- **Die Anleitung einen Klick entfernt** — unter dem Text von **Sammelbearbeitung** und `/liste-erstellen` sagt eine Zeile, wie du jemand Neuen hinzufügst, und verlinkt auf die Anleitung. Wenn ein Name oder ein Datum nicht gespeichert werden kann, verlinkt die Meldung auf den Teil der Anleitung, der es erklärt. Siehe [Personen, Rollen und Kanäle mit Namen](/docs/writing-a-list/#people-roles-and-channels-by-name).
- **Auch in der Activity** — **Liste bearbeiten** zeigt die Namen und die Daten in deiner Zeitzone. Unter dem Text haben **Liste bearbeiten** und **Neue Liste** dieselbe Zeile mit dem Link zur Anleitung. Links öffnen sich jetzt, im Text einer Aufgabe und in Nachrichten: Discord fragt dich zuerst, bevor es dich hinausführt. Siehe [Liste bearbeiten](/docs/activity-list/#edit-the-list).
- **Codes funktionieren weiter** — ein Code, den du schreibst oder einfügst, wird so gespeichert, wie er ist, und die Datei von **Herunterladen** behält die Codes, sodass ältere Dateien unverändert importiert werden. Siehe [Die Codes hinter den Namen](/docs/writing-a-list/#the-codes-behind-the-names).

## 2.4.1 — Webhooks und Daten, behoben

Released 2026-11-21

- **Webhooks mit Anführungszeichen im Text** — eine Aufgabe, eine Variable oder ein Name mit Anführungszeichen, Backslash oder Zeilenumbruch bricht den Body des Aufrufs nicht mehr: TTM maskiert den Wert, sodass der Dienst gültiges JSON bekommt. Siehe [Tokens](/docs/config-webhook/#tokens).
- **Jedes `@time`-Format setzt die Erinnerung** — Daten in den Discord-Stilen `s` und `S`, dem kurzen Datum mit Uhrzeit, zählen jetzt als Datum der Erinnerung. `S` ist das erste Format im `@time`-Menü: Bisher erkannte TTM es nicht, die Erinnerung wurde ab dem Speichern gerechnet, und das Datum blieb im Text. Siehe [Erinnerungen im Text](/docs/writing-a-list/#reminders-in-the-text).

## 2.4.0 — Die zweite Reihe zeigt dir den Weg

Released 2026-11-20

- **Rot zeigt nur, was du entfernen kannst** — ist **Besitzer**, **Tag**, **Erinnerung** oder **Webhook** rot, listet die Aufgabenauswahl nur die Aufgaben, die einen Besitzer, Tags, eine Erinnerung oder einen Webhook zum Entfernen haben. Hat keine davon etwas zu entfernen, ist die Auswahl aus und sagt es, zum Beispiel *Kein Besitzer zum Entfernen*, und du bekommst einen Hinweis, was du stattdessen tun kannst. Siehe [Die zweite Reihe](/docs/channel-tasks/#the-second-row).
- **Auch die Activity sagt es** — im roten Modus sagt das Panel einer Aufgabe ohne etwas zum Entfernen das oben, und **Löschen** bleibt aus. Siehe [Das Panel einer Aufgabe](/docs/activity-list/#the-panel-of-a-task).
- **Inhalt und Erinnerung sagen dir, was als Nächstes kommt** — drückst du **Inhalt** oder **Erinnerung**, sagt dir eine Nachricht, die nur du siehst, welche Aufgabe du in der Auswahl über den Buttons wählen sollst, mit einem Button, der dich zur Liste zurückbringt. Sie hört auf, sobald du auf diese Weise eine Aufgabe gewählt hast, auf jedem Server. Siehe [Die zweite Reihe](/docs/channel-tasks/#the-second-row).

## 2.3.0 — Neue Listen kündigen sich an

Released 2026-11-19

- **Eine neue Liste kündigt sich an** — wer eine Liste erstellt, importiert oder klont, löst unter ihr eine Benachrichtigung mit einem Link zur Liste aus. Sie erwähnt die Besitzer der Aufgaben, sodass Discord sie benachrichtigt. Ist die Verlaufsverfolgung an, beginnt der Thread mit der Liste. Siehe [Wenn eine Liste erstellt wird](/docs/configuration/#when-a-list-is-created).
- **Eine Erklärung pro Liste** — sind die Tipps an, erklärt die erste Benachrichtigung einer neuen Liste einmal, warum TTM Benachrichtigungen sendet und wo du sie einrichtest. Siehe [Tipps](/docs/configuration/#tips).
- **`/config app` in neuer Reihenfolge** — **Tipps** kommen zuerst, mit einem grünen oder grauen Button. **Verhalten** fasst lesbare Push-Benachrichtigungen, das Beibehalten des Zustands nach der Auswahl und das neue **Besitzer in neuen Listen erwähnen** zusammen, standardmäßig an. Wiederkehrende Erinnerungen zeigen das Premium-Emoji. Siehe [/config app](/docs/configuration/).
- **Jede Aufgabe, die sich ändert, löst ihren Webhook aus** — hakst du die letzte Unteraufgabe ab, ist auch die Gruppe erledigt: Jetzt lösen beide ihre Webhooks aus. Hakst du eine Gruppe ab, lösen ihre Unteraufgaben ihre aus. Die Aufrufe gehen in der Reihenfolge der Liste raus, und das ganze Abhaken zählt als ein Klick. Siehe [Wann ein Webhook auslöst](/docs/webhooks/#when-a-webhook-fires).
- **Alle wieder öffnen löst die Webhooks der Wiedereröffnung aus** — die der Aufgaben, die es wieder öffnet, im Kanal und in der Activity. Siehe [Wann ein Webhook auslöst](/docs/webhooks/#when-a-webhook-fires).
- **Eine Warnung pro Webhook** — hängt derselbe Webhook an mehreren Aufgaben, die sich gemeinsam ändern, und der Aufruf schlägt fehl, bekommst du eine Warnung. Siehe [Wenn ein Webhook fehlschlägt](/docs/webhooks/#when-a-webhook-fails).
- **Erinnerungen beginnen in deiner Zeitzone** — solange du keine Zeitzone gewählt hast, schlägt das Formular **Wann** die deiner Discord-Sprache vor: `America/Sao_Paulo` auf brasilianischem Portugiesisch, `Europe/Rome` auf Italienisch. Auch Erinnerungen, die du im Text einer Liste schreibst, nutzen sie, im Kanal und in der Activity. Eine Sprache, die in mehreren Zonen gesprochen wird, etwa Englisch (US), behält die Zone des Servers. Siehe [Deine Zeitzone](/docs/reminders/#your-time-zone).
- **Aus der Activity einladen** — **Einladen**, oben rechts auf der Startseite und in jeder Liste, öffnet das Discord-Fenster, um Freunde einzuladen oder die Einladung an einen Kanal zu schicken. Siehe [Den anderen beitreten](/docs/activity/#join-the-others).
- **Dein Discord-Status zeigt die Activity** — solange du darin bist, steht in deinem Profil *Plant Aufgaben mit dem Team*, in deiner Sprache, und nichts über die Liste. Discord fragt dich vorher: Sagst du nein, öffnet sich die Activity trotzdem. Siehe [Dein Status auf Discord](/docs/activity/#your-status-on-discord).

## 2.2.0 — Eine Aufgabe übernehmen

Released 2026-11-18

- **Eine Aufgabe selbst übernehmen** — klicke **Besitzer**, bis er blau wird, und wähle dann eine Aufgabe, ohne jemanden auszuwählen: Sie gehört dir, und der Kanal zeigt, wer sie übernommen hat. Eine Aufgabe, die schon einen Besitzer hat, bleibt wie sie ist: Um ihn zu ersetzen, wähle zuerst dich selbst im Menü. Mit **Zustand nach der Auswahl beibehalten** übernimmst du eine Aufgabe nach der anderen, ohne erneut auf **Besitzer** zu klicken. Siehe [Besitzer](/docs/channel-tasks/#owner).
- **Eine Aufgabe in der Activity übernehmen** — bei einer Aufgabe ohne Besitzer öffnet sich **Besitzer** schon mit deinem Namen: **Speichern** macht sie zu deiner. Siehe [Besitzer](/docs/activity-list/#owner).
- **Wer eine Aufgabe bekommt, erfährt davon** — gibst du eine Aufgabe jemand anderem oder einer Rolle, erwähnt die Benachrichtigung im Kanal die Person, sodass Discord sie benachrichtigt. Übernimmst du eine Aufgabe selbst, wird niemand erwähnt. Siehe [Besitzer](/docs/channel-tasks/#owner).

## 2.1.0 — News im Bot

Released 2026-11-17

- **`/news`** — die neuesten Neuigkeiten über Team Tasks Manager, in deiner Sprache, in einer Nachricht, die nur du siehst. Unter jeder Neuigkeit öffnet **Discord-Server** unseren Support-Server und **Versionshinweise** öffnet diese Version auf dieser Seite. Die Buttons **Zurück** und **Weiter** gehen zu älteren und neueren News. Siehe [`/news`](/docs/commands/#news).
- **Jede Version in `/news`** — ab 1.0.0, jeweils mit dem Tag, an dem sie erschienen ist: Mit **Zurück** gehst du zurück. Siehe [`/news`](/docs/commands/#news).
- **Eine Zeile für News, die niemand gelesen hat** — gibt es News, die noch niemand auf deinem Server geöffnet hat, sagt die letzte Zeile der Panels des Bots das, bis jemand `/news` öffnet: Dann verschwindet sie für alle auf dem Server. Siehe [`/news`](/docs/commands/#news).

## 2.0.1 — Activity-Modus im Tutorial

Released 2026-11-16

- **Eine Lektion zum Activity-Modus** — die Übungsliste des Tutorials hat sieben Lektionen: Vor der letzten hakst du eine Aufgabe im Activity-Modus ab, flüssiger und frei von den Grenzen der Textkanäle. Siehe [Erste Schritte](/docs/getting-started/#2-create-your-first-list).

## 2.0.0 — Die Activity

Released 2026-11-15

- **Die Activity** — eine Liste öffnet sich in einem Fenster innerhalb von Discord, auf dem Desktop und auf dem Handy. Mehrere Personen arbeiten gleichzeitig daran, und alle sehen jede Änderung, wie sie passiert. Wenn die letzte Person geht, kehrt die Liste in ihren Kanal zurück, mit einer Zusammenfassung der Änderungen. Siehe [Die Activity](/docs/activity/).
- **Ein neuer erster Button** — **Activity** <img class="inline-ic" src="/icons/activity.png" alt="" /> bringt die Liste in die Activity, in Textkanälen und im Chat von Sprachkanälen. Dafür braucht es die Discord-Berechtigung *Aktivitäten verwenden* im Kanal. Eine Liste, die schon in deinen Kanälen steht, bekommt ihn bei ihrer nächsten Änderung. Siehe [Eine Liste in der Activity öffnen](/docs/activity/#open-a-list-in-the-activity).
- **Liste klonen ist in Mehr** — oberhalb von **Herunterladen**, und dort auch bei gesperrter Liste. Die Anleitung sagt es auch. Siehe [Was in Mehr steckt](/docs/the-task-list/#whats-inside-more).
- **Solange eine Liste in der Activity ist** — hat ihre Nachricht im Kanal nur **Activity beitreten**, und die Liste lässt sich dort nicht ändern. Siehe [Den anderen beitreten](/docs/activity/#join-the-others).
- **Launch** — der **App Launcher** von Discord oder der Activities-Button eines Sprachanrufs öffnet die Listen des Kanals. Tritt einer bei, bringe eine andere in die Activity oder erstelle eine neue. Siehe [Die Startseite des Kanals](/docs/activity/#the-home-of-the-channel).
- **`/config lists`** — eine Liste in der Activity ist mit *in der Activity* markiert. **Löschen** entfernt sie für alle, und **Versiegeln** bringt sie vorher in den Kanal zurück. Siehe [Was im Kanal bleibt](/docs/activity/#what-stays-in-the-channel).
- **Das Founder-Angebot** — für begrenzte Zeit vor dem Ende der Beta kann jeder Server das Founder-Abzeichen freischalten; die ersten 5.000 Founder, die kaufen (seit dem 22. November 2026 sind es 1.000), bekommen den Jahrestarif für 20 € statt 36 €, vor MwSt. Siehe [Founder](/premium/#founder).
- **Erinnerungen an Rollen per DM** — kann der Bot im Kanal der Liste nicht schreiben, steht die Benachrichtigung, die zur Erinnerung gehört, in der Sprache der Person, die die Leute der Rolle gewählt hat.

## 1.5.0 — Wiederholung per Menü

Released 2026-11-07

- **Die Wiederholung per Menü wählen** — **Wiederholung bearbeiten** öffnet ein Formular mit drei Menüs statt zwei Feldern zum Tippen: **Wie oft insgesamt**, **Alle** und **Einheit** (Minuten, Stunden oder Tage). Du schreibst kein Intervall und kein Format, das schiefgehen kann, und für vier Pings wählst du 4. Siehe [Die Wiederholungsfelder](/docs/reminders/#the-repetition-fields).
- **Das Abzeichen zählt jeden Ping** — in der Aufgabenzeile bedeutet `↻1d ×4` jetzt vier Pings, eine pro Tag, die erste mitgezählt. Vorher zählte `×` die Wiederholungen nach der ersten. Eine Liste, die vor dieser Version geschrieben wurde, zeigt die alte Zahl, bis jemand sie ändert. Siehe [Eine Erinnerung an der Aufgabe lesen](/docs/reminders/#reading-a-reminder-on-the-task).
- **Bis zu 50-mal insgesamt** — mit Premium kommt eine Erinnerung höchstens 50-mal an, die erste mitgezählt, und eine Erinnerung, die schon mehr hatte, behält sie. In **Sammelbearbeitung** zählt das Triplet weiter die Wiederholungen nach der ersten: höchstens 49. Siehe [Bekannte Grenzen](/docs/known-limits/#reminders).

## 1.4.0 — Tutorial, Listen in Sprachkanälen

Released 2026-11-05

- **Ein Tutorial für deine erste Liste** — die Erklärung, die `/liste-erstellen` zeigt, hat neben **Erstelle deine Liste** einen Button **Tutorial**. Er macht aus der Erklärung eine Übungsliste mit sechs Lektionen, in deiner Sprache, und schickt dir die Anleitung, dieselbe wie unter **Mehr** → **Anleitung**, in einer Nachricht, die nur du siehst. Die Übungsliste ist eine normale Liste: Lösche sie unter **Mehr**, wenn du fertig bist. Den Button gibt es mit eingeschalteten Tipps, und die Willkommenskarte und `/help` verweisen darauf. Siehe [Erste Schritte](/docs/getting-started/#2-create-your-first-list).
- **Button-Emoji haben kurze Namen** — in **Sammelbearbeitung**, im Formular für den Text einer Aufgabe und in der Datei von Herunterladen erscheinen die Emoji eines Listen-Buttons, wie die in den Lektionen des Tutorials, als `:owner:`, `:reminder:`, `:content:` und `:more:` statt als langer Code. Schreibe einen dieser Namen in eine Aufgabe, und die Liste zeigt das Emoji. Siehe [Button-Emoji](/docs/writing-a-list/#button-emoji).
- **Listen in Sprachkanälen** — `/liste-erstellen` funktioniert im Chat eines Sprachkanals, und **Liste klonen** bietet auch Sprachkanäle an. Eine Liste dort kann alles, was sie in einem Textkanal kann, außer dem Aktivitätsverlauf, weil Discord in Sprachkanälen keine Threads erlaubt: Wer eine erstellt, bekommt eine kurze Nachricht, die es erklärt. In einem Sprachkanal braucht TTM *Verbinden* statt der zwei Berechtigungen für den Verlauf. Siehe [Sprachkanäle](/docs/known-limits/#voice-channels).

## 1.3.0 — Abstand um Gruppen

Released 2026-11-03

- **Abstand um Gruppen** — eine neue Option von `/config app`: Schalte sie aus, und deine Listen verlieren die Leerzeilen über und unter den Aufgaben mit Unteraufgaben, für eine kompaktere Liste. Standardmäßig an: Siehe [Abstand um Gruppen](/docs/configuration/#space-around-groups).
- **Die Darstellung der Listen ist ein Dropdown** — **Tipps**, **Erledigte Aufgaben abgedunkelt** und **Abstand um Gruppen** sind jetzt Optionen desselben Dropdowns in `/config app`: Hake die an, die du willst. Siehe [Tipps und Darstellung der Listen](/docs/configuration/#list-appearance).
- **Die Anleitung sagt, wie man eine Aufgabe abhakt** — ihre erste Seite und die Seite der Aufgaben-Buttons sagen es jetzt fett: Um eine Aufgabe abzuhaken oder den Haken zu entfernen, muss jeder Button der zweiten Reihe aus sein. Siehe [Das Abhak-Menü](/docs/the-task-list/#the-check-selector).
- **Eine gesperrte Liste sagt, wer sie bearbeitet** — solange jemand die Liste bearbeitet, sagt ihre letzte Zeile, wer, und wie du sie entsperrst, wenn sie gesperrt bleibt: **Mehr → Liste entsperren**. Sie ersetzt die Tipps-Zeile und erscheint auch bei ausgeblendeten Tipps. Siehe [Wenn die Liste gesperrt ist](/docs/the-task-list/#when-the-list-is-locked).

## 1.2.1 — Eine Aufgabe abhaken

Released 2026-11-01

- **Das Aufgabenmenü sagt *Aufgabe abhaken*** — sind alle Aufgaben-Buttons grau, sagt das Menü über den Buttons, wofür es da ist, statt den Titel der Liste zu zeigen. Siehe [Die zweite Reihe](/docs/channel-tasks/#the-second-row).
- **Die Formulare, die die Liste sperren, sagen, wie man sie entsperrt** — **Sammelbearbeitung** und das Formular für den Text einer Aufgabe enden mit einer Zeile: Schließt du sie mit **Abbrechen** oder dem ✕, bleibt die Liste gesperrt, und **Mehr → Liste entsperren** entsperrt sie. Siehe [Ich habe Abbrechen gedrückt und die Liste bleibt gesperrt](/docs/troubleshooting/#i-pressed-cancel-and-the-list-stays-locked).

## 1.2.0 — Tipps, Fortschrittsbalken, Liste abgeschlossen

Released 2026-11-01

- **Das Aufgabenmenü sagt dir, was als Nächstes kommt** — solange ein Aufgaben-Button blau oder rot ist, zeigt das Menü über den Buttons die Aktion, etwa *Aufgabe bearbeiten* oder *Aufgabe löschen*: Wähle dort die Aufgabe. Sind alle Buttons grau, zeigt es wieder den Titel der Liste. Siehe [Die zweite Reihe](/docs/channel-tasks/#the-second-row).
- **Tipps unter jeder Liste** — eine kleine letzte Zeile verweist auf **Anleitung** unter **Mehr** und auf diese Seite. Die Einstellung Legende von `/config app` heißt jetzt **Tipps** und schaltet sowohl die Zeile als auch die von `/liste-erstellen` gezeigte Erklärung aus: Siehe [Tipps](/docs/configuration/#tips).
- **Ein Fortschrittsbalken** — ein dünner grüner Balken am unteren Rand jeder Liste, in 5-%-Schritten. Er ist nur voll, wenn jedes Kästchen abgehakt ist, und eine versiegelte Liste behält ihn: Siehe [Unter der Liste](/docs/the-task-list/#under-the-list).
- **Liste abgeschlossen** — der Haken, der eine Liste abschließt, sagt es in seiner Benachrichtigung und im Verlaufs-Thread: Siehe [Benachrichtigungsmodus](/docs/configuration/#notification-mode).
- **Die Anleitung** sagt, was nach dem Drücken eines Aufgaben-Buttons zu tun ist: die Aufgabe im Menü wählen.
- **Mehr** beginnt mit **Anleitung** und **Herunterladen**, dann **Liste versiegeln** und **Liste löschen**. Bei einer gesperrten Liste bleibt **Liste entsperren** oben: Siehe [Was in Mehr steckt](/docs/the-task-list/#whats-inside-more).

## 1.1.0 — Einladungskarte, Willkommensnachricht, Tipps im Status

Released 2026-10-26

- **`/invite`** — eine öffentliche Karte mit dem Logo, was der Bot kann und wie man anfängt (dieselbe Vorstellung wie auf seiner Seite im App-Verzeichnis) und drei Buttons: ihn zu einem anderen Server hinzufügen (die Autorisierungsseite von Discord, direkt vom Bot), die Anleitung, der Support-Server. In jeder Sprache derselbe Name: Siehe [Befehlsreferenz](/docs/commands/).
- **Eine Willkommenskarte beim ersten Beitritt** — einmal im Leben eines Servers, in seinem Systemkanal: was der Bot kann, drei Schritte für den Start mit `/liste-erstellen` und `/config app`, welche Berechtigungen er verlangt und warum: Siehe [Grundbegriffe](/docs/core-concepts/#the-permissions-ttm-asks-for). Nie als DM. Es wird nichts gesendet, wenn der Server keinen Systemkanal hat, dort Beitrittsnachrichten ausblendet oder der Bot dort nicht schreiben kann.
- **`/help` sagt, wer die Konfigurationsbefehle sieht** — die Seite Konfiguration sagt jetzt, dass Discord die drei Unterbefehle von `/config` nur denen zeigt, die *Server verwalten* haben, und wo ein Admin das ändern kann.
- **`/config app` sagt dir, wenn die Zeitzone noch die Standardzone ist** — eine Zeile unter der aktuellen Zone, bis du die deines Teams wählst.
- **Tipps im Status des Bots** — die Zeile unter dem Namen des Bots wechselt alle zehn Minuten.
- **Das Panel Mehr** endet mit der Fußzeile, wie jede andere Seite.

## 1.0.1 — Übersetzungen überarbeitet

Released 2026-10-24

- **Spanisch, Portugiesisch, Französisch und Deutsch, komplett überarbeitet** — ein Wort pro Funktion, ein durchgehender Ton und Berechtigungsnamen, wie Discord sie zeigt. Lateinamerikanisches Spanisch sagt jetzt *tú*, nicht *vos*.
- **Optionen von `/config webhook` mit Akzenten** in den Sprachen, die sie verwenden, etwa *acción*, *événement* oder *löschen*: Siehe [/config webhook](/docs/config-webhook/).

## 1.0.0 — Erste öffentliche Version

Released 2026-10-23

Die erste Version von Team Tasks Manager von **bitsplitters**. Was sie bringt:

### Listen

- **Gemeinsame Aufgabenlisten** — du schreibst eine Liste als einfachen Text, mit Aufgaben, Unteraufgaben und Aufgabengruppen: Siehe [Erste Schritte](/docs/getting-started/#2-create-your-first-list).
- **Das Button-Panel** — eine Reihe wirkt auf die ganze Liste, eine Reihe von Buttons mit drei Zuständen auf eine einzelne Aufgabe. Siehe [Die Liste im Kanal](/docs/the-task-list/).
- **Liste bereinigen** entfernt die erledigten Aufgaben, nach einer Bestätigung, die dir sagt, wie viele es sind und was mit ihnen geht: Siehe [Liste bereinigen](/docs/the-task-list/#clean-list).
- **Alle wieder öffnen** bringt jede erledigte Aufgabe zurück auf offen und kann die Erinnerungen auf ein neues Datum verschieben: Siehe [Alle wieder öffnen](/docs/the-task-list/#reopen-all).
- **Liste versiegeln** hält eine fertige Liste als Protokoll ohne Buttons im Kanal, und **Liste löschen** entfernt sie dauerhaft: Siehe [Was in Mehr steckt](/docs/the-task-list/#whats-inside-more).
- **Liste entsperren** — eine gesperrte Liste, weil jemand ein Formular mit dem ✕ geschlossen hat, entsperrst du unter **Mehr**: Siehe [Wenn die Liste gesperrt ist](/docs/the-task-list/#when-the-list-is-locked).
- **Besitzer** — der Besitzer einer Aufgabe kann eine Person sein, eine Rolle oder mehrere Personen, die sich eine Rolle teilen, die TTM erstellt (Premium): Siehe [Besitzer und Tags](/docs/owners-and-tags/#owner-a-person-a-role-or-several-people).
- **Nur der Besitzer hakt eine Aufgabe ab** — oder ein Mitglied der Besitzerrolle oder wer im Kanal *Nachrichten verwalten* hat. Siehe [Wer eine Aufgabe abhaken darf](/docs/core-concepts/#who-can-tick-a-task).
- **Alle Fehler einer Sammelbearbeitung auf einmal** — lässt sich eine Sammelbearbeitung nicht speichern, listet eine Nachricht alle Probleme auf. Siehe [Wenn der Text sich nicht speichern lässt](/docs/writing-a-list/#when-the-text-cant-be-saved).
- **`/config lists`** zeigt jede Liste des Servers und regeneriert, versiegelt oder löscht mehrere davon auf einmal: Siehe [/config lists](/docs/config-lists/).

### Herunterladen und Importieren

- **Herunterladen** schickt dir die Liste als `.txt`-Datei, in einer Nachricht, die nur du siehst: Siehe [Was in Mehr steckt](/docs/the-task-list/#whats-inside-more).
- **Eine Liste aus einer Datei importieren** — die Option `datei` von `/liste-erstellen` baut eine Liste aus dieser Datei neu auf, auch auf einem anderen Server: Siehe [`/liste-erstellen`](/docs/commands/#create-list).

### Erinnerungen

- **Erinnerungen** erreichen den Besitzer der Aufgabe in der richtigen Minute. Eine Person bekommt eine Direktnachricht, eine Rolle eine Erwähnung im Kanal der Liste: Siehe [Erinnerungen](/docs/reminders/).
- **Wiederkehrende Erinnerungen** (Premium) fügen ein Intervall und Wiederholungen hinzu, und ein Server schaltet sie in `/config app` ein: Siehe [Wiederkehrende Erinnerungen](/docs/reminders/#repeating-reminders).
- **Nur speichern, was sich geändert hat** — auf der Übersichtskarte einer bestehenden Erinnerung wird **Speichern** aktiv, sobald du etwas änderst. Eine unverändert gespeicherte Erinnerung sendet keine Benachrichtigung: Siehe [Bearbeiten oder Entfernen](/docs/channel-tasks/#editing-or-removing).
- **Erinnerungen bleiben, bis du sie entfernst** — TTM entfernt nie von sich aus eine Erinnerung. Eine, deren Termine vorbei sind, bleibt an ihrer Aufgabe. Eine ohne Besitzer oder Datum oder eine, die sich nicht lesen lässt, stoppt das Speichern, und die Nachricht nennt die Aufgabe, die du korrigieren musst: Siehe [Eine Erinnerung an der Aufgabe lesen](/docs/reminders/#reading-a-reminder-on-the-task). Entfernst du den Besitzer einer Aufgabe, deren Erinnerung noch nicht ausgelöst hat, musst du bestätigen, weil die Erinnerung mitgeht.

### Tarife, Konfiguration und Webhooks

- **Der Free-Tarif und Premium** — nach der Beta hat der Free-Tarif Grenzen, und Premium hebt sie auf: Siehe [Was Premium freischaltet](/docs/premium/). Was du während der Beta aufbaust: Siehe [So funktioniert die Beta](/docs/beta/).
- **Konfiguration** — `/config app` legt Benachrichtigungen, den Aktivitätsverlauf, Erinnerungen, Zeitzone und Berechtigungen für den Server fest: Siehe [/config app](/docs/configuration/).
- **Webhooks** (Premium) senden eine HTTP-Anfrage, die du definierst, wenn eine Aufgabe erledigt oder wieder geöffnet wird. Sie nehmen `{{ }}`-Tokens und nur öffentliche `https`-Adressen: Siehe [/config webhook](/docs/config-webhook/).
- **Dort Bescheid, wo es zählt** — kann TTM nicht im Kanal einer Liste schreiben, sagt es der Person, die gehandelt hat, privat. Auch ein fehlgeschlagener Webhook bekommt eine Warnung: Siehe [Der Bot sagt, dass eine Berechtigung fehlt](/docs/troubleshooting/#the-bot-says-a-permission-is-missing) und [Wenn ein Webhook fehlschlägt](/docs/webhooks/#when-a-webhook-fails).
- **Lokalisierte Oberfläche** — die Texte des Bots und einige Befehlsnamen erscheinen in deiner Sprache: Siehe [Befehlsnamen in deiner Sprache](/docs/commands/#command-names-in-your-language). Diese Seite arbeitet mit der Übersetzung deines Browsers.

---

<div class="callout"><div class="callout-t">Demnächst</div>Eine Aufgabenansicht nur für Besitzer und ein Fortschritts-Dashboard sind unterwegs. Diese Seite hält jeden Schritt fest.</div>
