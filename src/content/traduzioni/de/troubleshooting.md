---
title: "FAQ"
description: "Häufige Fragen: schnelle Antworten auf die häufigsten Probleme, jeweils mit einem Link zur Seite, die sie ausführlich erklärt."
fonte: a72339b9982f
---

Such dir unten das Problem heraus, das du hast. Jede Antwort ist kurz und verweist auf die Seite, die sie ausführlich erklärt. Die Probleme sind nach Ort aufgeteilt: [im Kanal](#in-the-channel) und [in der Activity](#in-the-activity).

Die Suche funktioniert mit deutschen Wörtern: Probiere *abhaken*, *Besitzer*, *Erinnerung*.

## Im Kanal

### Ich finde den Befehl `/liste-erstellen` nicht

Discord zeigt jeden Befehl in der Sprache deiner Discord-App. Auf Deutsch heißt der Befehl `/liste-erstellen`, auf Englisch `/create-list`. Alle übersetzten Namen stehen unter [Befehlsnamen in deiner Sprache](/docs/commands/#command-names-in-your-language).

### Ich kann eine Aufgabe nicht abhaken

Prüfe diese Punkte, in dieser Reihenfolge:

- **Ein Button in der zweiten Reihe ist blau oder rot.** Klicke ihn so oft, bis er aus ist. Solange ein Button aktiv ist, wendet die Auswahl einer Aufgabe die Aktion dieses Buttons an. Siehe [Das Abhak-Menü](/docs/the-task-list/#the-check-selector).
- **Die Aufgabe hat einen Besitzer.** Nur der Besitzer, die Mitglieder der Besitzerrolle und alle mit *Nachrichten verwalten* im Kanal können sie abhaken. Siehe [Wer eine Aufgabe abhaken darf](/docs/core-concepts/#who-can-tick-a-task).
- **Das Menü ist deaktiviert.** Jemand bearbeitet die Liste, sie ist also gesperrt: Siehe unten [Ich habe Abbrechen gedrückt und die Liste bleibt gesperrt](#i-pressed-cancel-and-the-list-stays-locked).
- **Der Bot sagt *Du darfst diese Funktion auf diesem Server nicht verwenden*.** Dein Server hat seine Berechtigungen synchronisiert und die Liste ist für dich schreibgeschützt. Frag einen Admin und siehe [Berechtigungen synchronisieren](/docs/configuration/#sync-permissions).
- **Die Beta ist vorbei und dein Server hat den Free-Tarif.** Wenn alle Plätze deines Tarifs belegt sind, lehnt eine Liste außerhalb dieser Plätze das Abhaken ab.

  Eine Liste, die während der Beta erstellt wurde, ist die Ausnahme: Ihre Aufgaben lassen sich weiter abhaken. Siehe [So funktionieren die drei Plätze](/docs/premium/#how-the-three-places-work) und [Was eine Beta-Liste behält](/docs/beta/#what-a-beta-list-keeps).

### Ich habe Abbrechen gedrückt und die Liste bleibt gesperrt

TTM sperrt eine Liste, solange jemand sie bearbeitet. Das Schließen des Formulars mit **Abbrechen** oder mit dem ✕ entsperrt sie nicht, weil Discord es dem Bot nicht mitteilt. Jeder kann sie entsperren: Öffne **Mehr** unter der Liste und drücke **Liste entsperren** <img class="inline-ic" src="/icons/unlock.png" alt="" />. Siehe [Wenn die Liste gesperrt ist](/docs/the-task-list/#when-the-list-is-locked).

### Meine Tags oder mein Besitzer wurden nicht gespeichert

Die Menüs **Tag** und **Besitzer** warten darauf, dass du deine Auswahl bestätigst. Auf dem Handy tippst du unter dem geöffneten Menü auf **Speichern**. Am Desktop gibt es keinen Speichern-Button: Klicke irgendwo außerhalb des Menüs, das Schließen übernimmt deine Auswahl. Siehe [Eine Auswahl bestätigen](/docs/channel-tasks/#confirming-a-selection--desktop-vs-mobile).

Ist **Zustand nach der Auswahl beibehalten** aus (Standard), wähle zuerst die Personen und dann die Aufgabe. Siehe [Tag](/docs/channel-tasks/#tag).

Wenn eine Aufgabe dir gehört, statt an die gewählten Personen zu gehen, war das Menü noch leer, als du die Aufgabe gewählt hast: Bei leerem Menü gibt **Besitzer** die Aufgabe dir. So behebst du es:

1. Klicke **Besitzer**, bis er rot ist, und wähle die Aufgabe, um den Besitzer zu entfernen.
2. Klicke **Besitzer**, bis er blau ist, wähle die Personen und bestätige.
3. Wähle die Aufgabe noch einmal.

### Ich möchte eine Aufgabe mehreren Personen geben

Klicke **Besitzer**, bis er blau wird. Wähle die Personen im Menü unter den Buttons, das die Beschriftung *Wähle eine Aufgabe im Menü oben, um sie zu übernehmen, oder wähle, wer sie bekommt* trägt. Bestätige deine Auswahl und wähle dann die Aufgabe.

TTM erstellt für diese Personen eine Rolle und macht sie zum Besitzer. In der Activity wählst du sie im Panel der Aufgabe: Siehe [Besitzer](/docs/activity-list/#owner).

Das ist eine [Premium](/docs/premium/)-Funktion. Der Bot braucht die Berechtigung *Rollen verwalten*: Ein Admin gibt sie der Rolle des Bots unter *Servereinstellungen → Rollen*, nicht in einem Kanal. Siehe [Besitzer: eine Person, eine Rolle oder mehrere Personen](/docs/owners-and-tags/#owner-a-person-a-role-or-several-people).

### Ich habe die Nachricht der Liste versehentlich gelöscht

Die Daten der Liste sind noch in TTM und ihre Erinnerungen kommen weiter an. Führe `/config lists` aus und drücke den Button dieser Liste, bis er blau wird (**regenerieren**). Drücke dann **Anwenden** und bestätige. TTM veröffentlicht die Liste wieder in ihrem Kanal, mit demselben Inhalt und demselben Aktivitätsverlauf. Siehe [Regenerieren](/docs/config-lists/#regenerate).

## In der Activity

### Die Activity öffnet sich nicht

Prüfe diese Punkte, in dieser Reihenfolge:

- **Der erste Button unter der Liste ist noch Liste klonen.** Die Liste wurde gepostet, bevor die Activity kam: Sie bekommt den Activity-Button, sobald sie sich das nächste Mal ändert.
- **Der Activity-Button ist aus.** Jemand bearbeitet die Liste im Kanal. Der Button geht an, wenn die Liste entsperrt wird: Siehe [Wenn die Liste gesperrt ist](/docs/the-task-list/#when-the-list-is-locked).
- **Der Bot sagt, du brauchst *Aktivitäten verwenden*.** Das ist eine Discord-Berechtigung im Kanal, und ein Serveradministrator aktiviert sie dir unter *Berechtigungen* des Kanals.
- **Der Bot sagt *Ich sehe die Activity noch nicht*.** Deine Discord-App unterstützt die Activity vielleicht nicht. Aktualisiere sie oder probiere ein anderes Gerät.

Siehe [Wenn sich die Liste nicht öffnet](/docs/activity/#when-the-list-doesnt-open).

### Die Liste zeigt nur Activity beitreten

Die Liste ist in der [Activity](/docs/activity/), und solange sie dort ist, lässt sie sich im Kanal nicht ändern. Drücke **Activity beitreten**, um mit den anderen daran zu arbeiten. Wenn alle gegangen sind, kommt die Liste mit allen ihren Buttons in den Kanal zurück. Siehe [Den anderen beitreten](/docs/activity/#join-the-others).

### Ich kann in der Activity keine Aufgabe abhaken

TTM sagt dir, warum. Meistens:

- **Die Aufgabe hat einen Besitzer.** Eine Sprechblase am Kästchen sagt es. Die Regel ist dieselbe wie im Kanal: Siehe [Wer eine Aufgabe abhaken darf](/docs/core-concepts/#who-can-tick-a-task).
- **Jemand bearbeitet diese Aufgabe.** Ein Tippen auf ihr Kästchen zeigt, wer. Die anderen Aufgaben bleiben frei.
- **Jemand bearbeitet die ganze Liste** mit **Liste bearbeiten**. Die Zeile unter der Liste sagt, wer, und die Kästchen kommen zurück, wenn die Person fertig ist. Siehe [Wer bearbeitet was](/docs/activity-list/#who-is-editing-what).
- **Die Datenbank antwortet nicht.** Ein Streifen sagt es, und die Liste ist schreibgeschützt, bis sie zurück ist: Siehe [Wenn die Datenbank nicht antwortet](/docs/activity/#when-the-database-isnt-responding).

### Die Liste kommt erst nach einer Weile aus der Activity zurück

Die Activity wurde geschlossen, ohne dass jemand **Verlassen** gedrückt hat. Für TTM sieht ein geschlossenes Fenster aus wie eine Verbindung, die kurz abgebrochen ist: Es wartet 30 Sekunden darauf, dass du zurückkommst, und bringt die Liste dann in den Kanal zurück.

Bei einem Handy, das im Hintergrund liegt oder gesperrt ist, kann es bis zu einer Minute dauern, weil der Bot zuerst merken muss, dass die Seite nicht mehr antwortet.

**Verlassen** sagt dem Bot sofort, dass du fertig bist: Wenn niemand sonst mehr in der Liste ist, ist sie gleich wieder im Kanal. Siehe [Zurück in den Kanal](/docs/activity/#back-to-the-channel).

### Die Activity lädt neu, nachdem ich das Design von Discord geändert habe

Wenn du das Design von Discord änderst, lädt Discord die Activity von selbst neu, manchmal erst nach bis zu einer Minute: TTM kann das nicht verhindern. Die Liste kommt gleich von allein zurück, mit dem Design, das du hattest.

Wenn dein Design **Wie Discord** war, wird es zu dem Design, das du gesehen hast. Um wieder Discord zu folgen, wähle **Wie Discord** mit dem Zahnrad: Siehe [Deine Einstellungen](/docs/activity/#your-settings).

Nach einem Neuladen bringt dich **Verlassen** weiter aus der Liste, kann das Fenster wegen eines Discord-Bugs aber nicht schließen: Schließe es in Discord.

## Erinnerungen

### Meine Erinnerung ist nicht angekommen

- **Die Erinnerung geht an den Besitzer der Aufgabe.** Das bist nur du, wenn die Aufgabe keinen Besitzer hatte, als du sie gesetzt hast. Eine Person bekommt eine Direktnachricht, eine Rolle bekommt eine Erwähnung im Kanal der Liste. Siehe [Die Regeln](/docs/reminders/#the-rules).
- **Der Besitzer muss Direktnachrichten von Servermitgliedern erlauben**, in den *Datenschutzeinstellungen* des Servers. Siehe [Erinnerungen per Direktnachricht](/docs/known-limits/#reminders-by-direct-message).
- **Der Besitzer ist eine Rolle, die nicht erwähnt werden kann.** Die Erinnerung erscheint im Kanal, aber niemand bekommt eine Benachrichtigung. Siehe [Erinnerungen an eine Rolle](/docs/known-limits/#reminders-to-a-role).
- **Die Besitzerrolle wurde gelöscht.** Die Erinnerung wird an niemanden geschickt. Wähle einen anderen Besitzer für die Aufgabe. Siehe [Erinnerungen an eine Rolle](/docs/known-limits/#reminders-to-a-role).
- **TTM kann im Kanal der Liste nicht schreiben.** Siehe [Die Berechtigungen, die TTM verlangt](/docs/core-concepts/#the-permissions-ttm-asks-for).
  - Eine Rolle, die TTM für mehrere Personen erstellt hat: Jede dieser Personen bekommt die Erinnerung per Direktnachricht, mit dem Grund.
  - Jede andere Rolle: Die Erinnerung wird nicht zugestellt, bis ein Admin die Berechtigung erteilt.
- **Der Besitzer wurde entfernt oder die Liste wurde versiegelt.** In diesen Fällen ist die Erinnerung weg. Bevor du einen Besitzer entfernst, dessen Erinnerung noch nicht ausgelöst wurde, bittet TTM dich um Bestätigung. Siehe [Besitzer und Tags](/docs/owners-and-tags/) und [Versiegeln](/docs/config-lists/#seal).
- **Die Aufgabe ist abgehakt.** Eine Aufgabe abzuschließen stoppt ihre Erinnerung und eine abgehakte Aufgabe kann keine neue bekommen.

### Ich möchte eine wöchentliche Erinnerung

TTM hat keine Einheit für Wochen, eine Woche sind also 7 Tage. Zuerst schaltet ein Admin **Wiederkehrende Erinnerungen** in [`/config app`](/docs/configuration/#recurring-reminders) ein (eine [Premium](/docs/premium/)-Funktion).

Im Kanal:

1. Klicke **Erinnerung**, bis er blau wird, wähle die Aufgabe und sende das Formular **Wann** ab.
2. Drücke auf der Karte, die erscheint, **Wiederholung bearbeiten**.
3. Wähle **Alle** 7 und **Einheit** Tage und bei **Wie oft insgesamt** die Zahl der Wochen, z. B. 4 für vier Wochen. Sende dann das Formular ab.
4. Drücke auf der Karte **Speichern**.

In der Activity tippst du auf den Text der Aufgabe, dann auf **Erinnerung**: Dieselben drei Menüs stehen im Panel, unter dem Datum. Wähle sie und tippe dann auf **Speichern**.

Siehe [Die Wiederholungsfelder](/docs/reminders/#the-repetition-fields).

## Tarife und Berechtigungen

### Ich kann keine Liste erstellen oder der Bot sagt, ich soll einen Platz freigeben

Während der Beta gibt es keine Grenze für Listen. Danach lässt dich der Free-Tarif an drei Listen gleichzeitig arbeiten und TTM lehnt eine vierte ab, bis du eine versiegelst oder löschst: Siehe [Was mit einer vierten Liste passiert](/docs/premium/#what-happens-to-a-fourth-list).

### Wer darf eine Liste versiegeln oder löschen?

Im Panel **Mehr** einer Liste sehen nur Mitglieder mit *Nachrichten verwalten* im Kanal **Liste versiegeln** und **Liste löschen**. In `/config lists` gilt die Regel von `/config`: standardmäßig Mitglieder mit *Server verwalten*. Siehe [Was in Mehr steckt](/docs/the-task-list/#whats-inside-more) und [Wer /config öffnen kann](/docs/config/#who-can-open-config).

### Ich finde den Befehl `/config` nicht

Standardmäßig sehen nur Mitglieder mit der Berechtigung *Server verwalten* `/config`. Ein Admin kann ihn für deine Rolle öffnen, unter *Servereinstellungen → Integrationen → Team Tasks Manager*. Siehe [Wer /config öffnen kann](/docs/config/#who-can-open-config).

### Der Bot sagt, dass eine Berechtigung fehlt

Es gibt zwei verschiedene Fälle:

- **Dem Bot fehlt eine Berechtigung.** Seine Nachricht nennt die Berechtigung und die Schritte, um sie zu erteilen. Wenn der Bot im Kanal der Liste nicht schreiben kann, erreicht die Nachricht nur dich, höchstens einmal pro Stunde. Wofür jede Berechtigung gut ist: [Die Berechtigungen, die TTM verlangt](/docs/core-concepts/#the-permissions-ttm-asks-for).
- **Du darfst eine Funktion nicht verwenden.** Diese Regel legen die Admins des Servers fest, nicht der Bot. Siehe [Berechtigungen synchronisieren](/docs/configuration/#sync-permissions).

---

Kommst du immer noch nicht weiter? Frag uns auf dem [Discord-Server](/docs/community/). Klare Schritte und ein Screenshot helfen uns, schnell zu antworten.
