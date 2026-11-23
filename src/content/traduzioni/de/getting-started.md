---
title: "Loslegen"
description: "Lade den Bot ein, erstelle eine Liste, hake dann eine Aufgabe ab und stelle eine Erinnerung ein, im Kanal oder in der Activity."
fonte: 65c887766b9d
---

Team Tasks Manager (TTM) lässt dein Team Aufgaben teilen und verwalten, **ohne Discord zu verlassen**. Diese Seite führt dich von null zu einer funktionierenden Liste: erstellen, eine Aufgabe abhaken, eine Erinnerung einstellen.

<div class="callout"><div class="callout-t">Während der Beta ist jede Funktion freigeschaltet</div>Jede Funktion ist freigeschaltet, für jeden Server. Wo diese Seiten den Free-Tarif oder Premium erwähnen, gilt das erst nach der Beta: siehe <a href="/docs/beta/">So funktioniert die Beta</a>.</div>

## 1. Den Bot einladen

<p><a class="btn" href="/invite">Zu Discord hinzufügen</a></p>

Dieser Button lädt Team Tasks Manager auf deinen Server ein. Behalte die Berechtigungen, die er anfragt: TTM braucht sie, um Listen zu posten, Erinnerungen auszuführen und den Verlauf zu schreiben. Lässt du eine weg, sagt dir der Bot genau, welche Berechtigung fehlt, wenn er sie braucht. Wofür jede Berechtigung da ist: [Die Berechtigungen, die TTM anfragt](/docs/core-concepts/#the-permissions-ttm-asks-for).

## 2. Erstelle deine erste Liste

Tippe `/` in das Nachrichtenfeld und wähle den Befehl, oder fang an, seinen Namen zu tippen:

```
/create-list
```

Ist dein Discord in einer anderen Sprache, hat der Befehl einen übersetzten Namen: Auf Deutsch heißt er `/liste-erstellen`. Alle Namen stehen in der [Befehlsreferenz](/docs/commands/#command-names-in-your-language).

TTM antwortet mit einer kurzen Erklärung, wie man eine Liste schreibt, und einem Button **Erstelle deine Liste**. Klicke darauf: Ein Formular mit zwei Feldern öffnet sich, dem **Titel der Liste** und der **Aufgabenliste**. Schreibe eine Aufgabe pro Zeile, jede beginnt mit einem Strich `-`. Zum Beispiel mit dem Titel *Samstagsturnier*:

```
- Die Sprachkanäle buchen
- Die Turnierbäume vorbereiten
  - Die Anmeldungen sammeln
  - Die Teams setzen
- Die Regeln posten
- Das Finale streamen
```

Die Regeln:

- **Eine Zeile, die mit `-` beginnt, ist eine Aufgabe.**
- **Leerzeichen vor dem Strich machen sie zur Unteraufgabe** der Aufgabe darüber. Eine Aufgabe mit Unteraufgaben wird zu einer **Gruppe**.
- Der Titel darf bis zu **90 Zeichen** haben, die Liste etwa **4000 Zeichen** und **50 Aufgaben**, Unteraufgaben eingeschlossen: siehe [Bekannte Grenzen](/docs/known-limits/).

Sende das Formular ab, und die Liste erscheint im Kanal. Hier ist dieselbe Liste nach ein paar Schritten. Die erste Aufgabe ist abgehakt, *Die Turnierbäume vorbereiten* hat einen Besitzer und *Das Finale streamen* hat eine Erinnerung.

<picture class="screen">
  <source media="(max-width: 640px)" srcset="/screens/de/list-mobile.png" width="795" height="1106" />
  <img src="/screens/de/list-desktop.png" width="540" height="418" loading="lazy" alt="Die Liste Samstagsturnier in Discord: sechs nummerierte Aufgaben mit Kästchen. Die erste ist abgehakt und ausgegraut; Die Turnierbäume vorbereiten hat zwei Unteraufgaben und einen Besitzer; Das Finale streamen hat einen Besitzer und ein Erinnerungsdatum. Unter den Aufgaben verweist eine kleine Zeile auf Mehr, Anleitung und die vollständige Dokumentation, und ein grüner Balken zeigt, wie viel erledigt ist. Unter der Liste stehen das Dropdown-Menü Aufgabe abhaken und zwei Reihen Buttons." />
</picture>

Lieber durch Ausprobieren lernen? Neben **Erstelle deine Liste** gibt es einen Button **Tutorial**: Er macht aus der Erklärung eine Übungsliste mit sieben Lektionen in deiner Sprache und schickt dir die Anleitung in einer Nachricht, die nur du siehst. Mach die Lektionen der Reihe nach: Jede nennt einen Button mit seinem Icon und bittet dich, etwas damit zu tun, vom Abhaken bis zum Öffnen in der Activity.

Die Übungsliste ist eine normale Liste: Wenn du fertig bist, lösche sie über **Mehr** → **Liste löschen**.

Jetzt wähle, wo du damit arbeitest. Die Liste ist an beiden Orten dieselbe, und sie ist [immer nur an einem Ort](/docs/core-concepts/#one-list-two-places).

## <img class="place-ic" src="/icons/posto-canale.svg" alt="" />3. Im Kanal

### Eine Aufgabe abhaken

Unter der Liste findest du das **Abhak-Menü**, ein Dropdown-Menü, das den Titel der Liste zeigt, und zwei Reihen Buttons. Öffne das Menü und wähle eine Aufgabe: Ihr Kästchen wechselt von <img class="inline-ic" src="/icons/checkbox_empty.png" alt="" /> zu <img class="inline-ic" src="/icons/checkbox_marked.png" alt="" />, und die Liste aktualisiert sich für alle. Wähle sie noch einmal, um sie wieder zu öffnen. Wer eine Gruppe abhakt, hakt auch ihre Unteraufgaben ab. Je nach deinen [Einstellungen](/docs/configuration/) postet TTM außerdem eine kurze Benachrichtigung unter der Liste und hält die Änderung in einem Verlaufs-Thread fest.

<div class="callout"><div class="callout-t">Du kannst eine Aufgabe nicht abhaken?</div>Jeder Button in der zweiten Reihe muss <strong>aus</strong> sein: Ist einer blau oder rot, führt die Wahl einer Aufgabe stattdessen die Aktion dieses Buttons aus. Und eine Aufgabe mit Besitzer können nur ihr Besitzer und alle mit <em>Nachrichten verwalten</em> im Kanal abhaken.</div>

### Eine Erinnerung einstellen

In der zweiten Reihe:

1. Klicke einmal auf **Erinnerung** <img class="inline-ic" src="/icons/alertW.png" alt="" />, den vierten Button: Er wird **blau**.
2. Wähle eine Aufgabe, die **noch nicht abgehakt** ist. Ein Formular mit dem Titel *Erinnerung für Aufgabe …* öffnet sich, ausgefüllt mit zehn Minuten ab jetzt.
3. Sende es so ab, wie es ist. Hat dein Server wiederkehrende Erinnerungen eingeschaltet, folgt eine Übersichtskarte: Drücke **Speichern**.

Die Aufgabe zeigt die Uhrzeit, und die Erinnerung kommt einmal an. Solange du sie nicht änderst, ist die Zeitzone im letzten Feld die des Servers: Ändere sie, wenn deine eine andere ist.

**Das Formular mit ✕ geschlossen?** Die Liste bleibt gesperrt: Öffne **Mehr** unter der Liste und drücke **Liste entsperren**. Siehe [Wenn die Liste gesperrt ist](/docs/the-task-list/#when-the-list-is-locked).

Jeder Button unter der Liste: [Die Liste im Kanal](/docs/the-task-list/) und [Eine Aufgabe im Kanal bearbeiten](/docs/channel-tasks/).

## <img class="place-ic is-activity" src="/icons/activity.png" alt="" />4. In der Activity

In der Activity arbeitest du an der Liste in einem Fenster innerhalb von Discord, mit Kästchen und Panels statt Menüs. Drücke **Activity** <img class="inline-ic" src="/icons/activity.png" alt="" />, den ersten Button unter der Liste. Die anderen im Kanal können dir dort beitreten. Du kannst auch über den App-Launcher von Discord oder aus einem Sprachanruf starten: siehe [Vier Wege hinein](/docs/activity/#four-ways-in).

### Eine Aufgabe abhaken

Tippe auf das Kästchen einer Aufgabe. Die Liste aktualisiert sich für alle im Fenster, und eine Gruppe hakt auch ihre Unteraufgaben ab.

### Eine Erinnerung einstellen

Tippe auf den Text einer Aufgabe, die noch nicht abgehakt ist: Ihr Panel öffnet sich. Tippe einmal auf **Erinnerung** <img class="inline-ic" src="/icons/alertW.png" alt="" />: Der Button wird **blau**, und Datum, Uhrzeit und Zeitzone erscheinen, eingestellt auf zehn Minuten ab jetzt in der Zeitzone deines Geräts. Tippe auf **Speichern**.

Wenn du fertig bist, drücke **Verlassen**: Die Liste kommt mit einer Zusammenfassung der Änderungen in den Kanal zurück.

Alles zum Fenster: [Die Activity](/docs/activity/) und [An einer Liste in der Activity arbeiten](/docs/activity-list/).

## Gut zu wissen vor der ersten Erinnerung

- **Die Erinnerung geht an den Besitzer der Aufgabe**, per Direktnachricht, wenn der Besitzer eine Person ist.
- **Hat die Aufgabe noch keinen Besitzer, wirst du ihr Besitzer**, damit die Erinnerung zu dir kommt: siehe [Die Regeln](/docs/reminders/#the-rules).
- **Nichts angekommen?** Erlaube Direktnachrichten von Servermitgliedern: siehe [Erinnerungen per Direktnachricht](/docs/known-limits/#reminders-by-direct-message).

## Nächste Schritte

- [Grundbegriffe](/docs/core-concepts/): eine Liste an zwei Orten, Besitzer, Tags, Gruppen und Berechtigungen.
- [Besitzer und Tags](/docs/owners-and-tags/): gib eine Aufgabe einer Person, einer Rolle oder mehreren Personen und tagge, wer benachrichtigt werden soll.
- [Erinnerungen](/docs/reminders/): wer sie bekommt, Zeitzonen, wiederkehrende Erinnerungen.
- [Tipps & Tricks](/docs/tips/): kleine Gewohnheiten, die Zeit sparen, etwa eine Liste auf einem anderen Server wiederzuverwenden.
- [/config app](/docs/configuration/): Benachrichtigungen, die Tipps, Zeitzone und mehr.
- [FAQ](/docs/troubleshooting/): schnelle Antworten auf die häufigsten Probleme.
