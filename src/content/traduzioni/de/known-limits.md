---
title: "Bekannte Grenzen"
description: "Die Obergrenzen für Listen, Aufgaben, Erinnerungen und mehr: Die meisten kommen von Discord selbst, und so arbeitest du damit."
fonte: a9ff3dff4029
---

Team Tasks Manager arbeitet komplett innerhalb von Discord, deshalb sind die meisten Grenzen unten nicht die Entscheidung von TTM. Sie kommen von Discord selbst. Zum Beispiel: wie lang eine Nachricht sein darf, wie viele Menüs in eine Nachricht passen, wie weit zurück man Nachrichten gesammelt löschen kann. Wo eine Grenze von Discord kommt, sagen wir es dazu.

## Listen und Aufgaben

| Grenze | Wert | Warum |
| :--- | :--- | :--- |
| Genutzte Listen pro Server | **3** im Free-Tarif | Siehe [So funktionieren die drei Plätze](/docs/premium/#how-the-three-places-work). |
| Zeichen pro Liste | **4000** | Die ganze Liste wird in einem einzigen Discord-Feld bearbeitet, und Discord begrenzt dieses Feld auf 4000 Zeichen. Gezählt wird *alles, was angezeigt wird*: Aufgabentext, Kästchen, eine eventuelle Erinnerungszeit und ein Zeilenumbruch pro Zeile, nicht nur das, was du tippst. TTM lässt einen kleinen Sicherheitsabstand unter der harten Grenze. |
| Einträge pro Liste | **50** (Aufgaben + Unteraufgaben) | Discord erlaubt 5 Komponentenreihen pro Nachricht und bis zu 25 Optionen pro Dropdown. TTM reserviert Reihen für die Aktions-Buttons, sodass insgesamt 50 auswählbare Einträge übrig bleiben, Unteraufgaben eingeschlossen. Dein Tarif kann niedriger liegen: siehe [Was Premium freischaltet](/docs/premium/). |
| Titel der Liste | **90** Zeichen | Die Fenster zum Erstellen, Bearbeiten und Klonen lassen dich nicht mehr eingeben. Der Titel benennt auch das Menü der Liste und ihren Verlaufs-Thread, die Discord kurz hält. |
| Importierte Datei | `.txt`, bis zu **64 KB** | `/liste-erstellen` importiert nur die Datei, die **Herunterladen** erzeugt. Was sonst noch geprüft wird: siehe [`/liste-erstellen`](/docs/commands/#create-list). |

<div class="callout"><div class="callout-t">An eine Grenze gestoßen?</div>Verteile die Arbeit auf mehrere Listen. Zwei gezielte Listen lesen sich leichter als eine, die ausgereizt ist, und jede hat ihre eigenen Erinnerungen, Besitzer und Tags.</div>

**Herunterladen gibt dir immer eine Datei.** Eine normale Discord-Nachricht ist auf 2000 Zeichen begrenzt. Deshalb postet **Herunterladen**, im Panel **Mehr** <img class="inline-ic" src="/icons/other.png" alt="" /> unter der Liste im Kanal, die Liste nie als Text.

Es schickt dir eine `.txt`-Datei, nur dir, in einer Nachricht, die nur du sehen kannst. Es ist dieselbe Datei, die `/liste-erstellen` wieder importieren kann.

**Die Nachricht zu löschen ist nicht dasselbe, wie die Liste zu löschen.** Die Liste behält ihren Platz, und ihre Erinnerungen kommen weiter an: siehe [Was mit einer vierten Liste passiert](/docs/premium/#what-happens-to-a-fourth-list).

## Erinnerungen

| Grenze | Wert | Warum |
| :--- | :--- | :--- |
| Gleichzeitig wartende Erinnerungen | **10** im Free-Tarif | Siehe [Was Premium freischaltet](/docs/premium/). |
| Wiederholungen pro Erinnerung | **bis zu 50** mit Premium, keine mit Free | Wiederkehrende Erinnerungen sind eine Premium-Funktion: Im Free-Tarif ist jede Erinnerung ein Einzelereignis. Mit Premium kann eine Erinnerung insgesamt höchstens 50-mal ankommen, die erste eingeschlossen; wähle **1 Mal** für eine einmalige Erinnerung. Im Text einer Liste, in der **Sammelbearbeitung** oder in **Liste bearbeiten** zählt das Tripel die Wiederholungen nach der ersten: höchstens 49. |
| Wie bald eine Erinnerung ausgelöst werden kann | **5 Minuten** ab jetzt | Das Startdatum muss mindestens fünf Minuten in der Zukunft liegen, damit der Scheduler Zeit hat, sie aufzunehmen. |
| Wie pünktlich eine Erinnerung ist | innerhalb von etwa **10 Sekunden** | Gleichzeitig fällige Erinnerungen werden auf bis zu zehn Sekunden verteilt, um innerhalb der Rate-Limits von Discord zu bleiben. Die Erinnerung kommt trotzdem in der richtigen Minute an. |

Wiederholungen gibt es nur in einem Tarif, der wiederkehrende Erinnerungen enthält, und nur, wenn **Wiederkehrende Erinnerungen** in [/config app](/docs/configuration/#recurring-reminders) eingeschaltet ist. Standardmäßig ist jede Erinnerung ein Einzelereignis. Wiederkehrende Erinnerungen, die du schon hast, werden in jedem Fall weiter ausgelöst: siehe [Wiederkehrende Erinnerungen](/docs/reminders/#repeating-reminders).

### Erinnerungen per Direktnachricht

Die Erinnerung an eine Person kommt per Direktnachricht an und hängt deshalb von den DM-Einstellungen des Besitzers ab. Nimmt der Besitzer keine Direktnachrichten von Servermitgliedern an, lehnt Discord die Nachricht ab, und diese Erinnerung kommt nicht an. Dasselbe passiert, wenn der Besitzer keinen Server mehr mit dem Bot teilt.

Um Direktnachrichten von den Mitgliedern eines Servers anzunehmen, klicke auf den Servernamen und dann auf *Datenschutzeinstellungen*.

Nach einer abgelehnten Nachricht merkt sich TTM das und versucht es **6 Stunden** lang nicht erneut bei dieser Person. Danach versucht es TTM wieder, und die erste Direktnachricht, die durchkommt, hebt die Pause auf.

### Erinnerungen an eine Rolle

Wenn der Besitzer einer Aufgabe eine Rolle ist, ist die Erinnerung eine Nachricht im Kanal der Liste, die die Rolle erwähnt. Discord macht aus der Erwähnung nur in einem dieser Fälle eine Benachrichtigung:

- Die Rolle darf von jedem erwähnt werden: In *Servereinstellungen → Rollen* kann die Rolle von allen per @ erwähnt werden;
- der Bot hat die Berechtigung *@everyone, @here und alle Rollen erwähnen* im Kanal der Liste. Der Einladungslink gewährt sie.

Sonst erscheint die Nachricht im Kanal, und niemand bekommt eine Benachrichtigung. TTM warnt dich, wenn du so eine Erinnerung einrichtest. Es warnt dich auch, wenn du eine solche Rolle zum Besitzer einer Aufgabe mit Erinnerung machst.

- **@everyone als Besitzer**: Es zählt nur die Berechtigung des Bots.
- **Eine Rolle, die TTM erstellt** für mehrere Besitzer, ist von Anfang an erwähnbar. Ihre Erinnerungen benachrichtigen sie auch ohne die Berechtigung, es sei denn, jemand schaltet diese Einstellung aus.
- **Eine gelöschte Rolle** bekommt gar keine Erinnerung. TTM sagt es dir, und die Lösung ist, einen anderen Besitzer zu wählen.

In jedem Fall werden nur die Mitglieder benachrichtigt, die den Kanal der Liste sehen können.

## Besitzer und Tags

Jede Aufgabe hat **einen Besitzer**: eine Person oder eine Rolle. Mit Premium können es auch bis zu 25 Personen sein, die sich eine Rolle teilen, die TTM für sie erstellt. 25 ist das Maximum des Besitzer-Menüs.

Eine Aufgabe kann **bis zu 25 Tags** tragen, die Benutzer oder Rollen, die benachrichtigt werden sollen: 25 ist das Maximum von Discord für ein Menü.

**Rollen, die TTM erstellt, zählen zu den 250 Rollen pro Server von Discord.** Bei 250 Rollen kann TTM keine neue erstellen und sagt es dir. Wann TTM seine Rollen löscht: siehe [Die Rollen, die TTM erstellt](/docs/owners-and-tags/#the-roles-ttm-creates).

**TTM sieht, wie viele Mitglieder eine Rolle hat, nicht wer sie sind.** Tauschst du in einer von TTM erstellten Rolle ein Mitglied gegen ein anderes, zeigt TTM weiter die Personen an, denen es die Rolle gegeben hat: siehe [Die Rollen, die TTM erstellt](/docs/owners-and-tags/#the-roles-ttm-creates).

## Webhooks

| Grenze | Wert |
| :--- | :--- |
| Webhooks pro Server | **25** mit Premium, im Free-Tarif keine neuen. Die Auswahl ist ein Discord-Dropdown, und 25 Optionen sind sein Maximum. |
| Name des Webhooks | bis zu **96** Zeichen \* |
| URL des Webhooks | bis zu **2000** Zeichen |

\* Die Grenze von Discord selbst ist 100, aber der Name reist zusammen mit einer
kurzen Markierung in der Kennung des Formularfelds, und auch diese Zeichen zählen: TTM prüft 96 und sagt es dir, wenn du darüber liegst. Die Fehlermeldung
nennt dieselbe Zahl, die du hier liest.

## Der Aktivitätsverlauf

Wenn der Verlauf eingeschaltet ist, postet TTM jede Aktion über einen Discord-Webhook in einen Thread neben der Liste.

Discord erlaubt **15 Webhooks pro Kanal**, deshalb erstellt TTM **einen Webhook pro Kanal** und nutzt ihn für jede Liste in diesem Kanal weiter. Name und Bild, die du bei jeder Nachricht siehst, werden pro Nachricht gesetzt, optisch ändert sich also nichts.

Hat ein Kanal die 15 von Discord schon erreicht (wegen anderer Bots oder Integrationen), kann der Verlauf einer neuen Liste nicht starten. Gib einen frei unter **Kanal bearbeiten → Integrationen → Webhooks**.

## Sprachkanäle

Listen funktionieren auch im Chat eines Sprachkanals, mit einem Unterschied: Dort haben sie keinen [Aktivitätsverlauf](#the-activity-timeline). Der Verlauf ist ein Thread neben der Liste, und Discord erlaubt in Sprachkanälen keine Threads.

Alles andere funktioniert wie in einem Textkanal: die Buttons, Benachrichtigungen, Erinnerungen, die [Activity](/docs/activity/), **Liste klonen**, **Herunterladen**, **Liste versiegeln** und **Liste löschen**.

Ist der Verlauf in [`/config app`](/docs/configuration/#history-tracking) eingeschaltet, bekommt jede Person, die eine Liste in einem Sprachkanal erstellt, eine kurze Nachricht dazu, die nur sie sehen kann; die Übungsliste des Tutorials überspringt sie. Wenn du den Verlauf brauchst, erstelle die Liste in einem Textkanal oder kopiere sie mit **Liste klonen** dorthin.

In einem Sprachkanal braucht TTM weder *Öffentliche Threads erstellen* noch *Webhooks verwalten*, die nur dem Verlauf dienen. Stattdessen braucht es *Verbinden*: Ohne diese Berechtigung kann TTM nicht im Chat des Sprachkanals schreiben.

Discord gibt *Verbinden* standardmäßig allen; nimmt dein Server sie in einem Sprachkanal weg, gib sie dort TTM, sonst sagt dir `/liste-erstellen`, dass sie fehlt.

## Benachrichtigungen

Wenn TTM seine eigenen Benachrichtigungsnachrichten aufräumt, erlaubt Discord das gesammelte Löschen nur für Nachrichten der **letzten 14 Tage**. Ältere Benachrichtigungen können im Kanal bleiben: Du kannst sie von Hand entfernen.

---

Diese Zahlen entsprechen der aktuellen Version des Bots. Jede Änderung wird in den [Versionshinweisen](/docs/release-notes/) vermerkt.
