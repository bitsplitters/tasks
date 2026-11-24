---
title: "Grundbegriffe"
description: "Eine Liste an zwei Orten, das Vokabular von TTM (Aufgaben, Gruppen, Besitzer, Tags, Erinnerungen) und die Berechtigungen, die es anfragt."
fonte: 193335652dfb
---

Ein paar Begriffe tauchen in der ganzen App auf. Lerne sie einmal, und alles andere fügt sich zusammen.

## Eine Liste, zwei Orte

Eine Liste lebt in einer Nachricht in einem Discord-Kanal, wo alle sie finden. Die **Activity** öffnet dieselbe Liste in einem Fenster innerhalb von Discord, wo mehrere Personen gemeinsam daran arbeiten und jede Änderung live sehen. Es ist dieselbe Liste, keine Kopie.

Eine Liste ist immer nur an einem Ort. Solange sie in der Activity ist, behält ihre Nachricht im Kanal nur **Activity beitreten**. Wenn alle gehen, kommt die Liste mit einer Zusammenfassung der Änderungen in den Kanal zurück.

Was eine Liste kann, ist an beiden Orten gleich: Besitzer, Tags, Erinnerungen, Webhooks, die Einstellungen deines Servers und die Grenzen deines Tarifs. Anders ist, wie du es machst.

Im Kanal nutzt du die Menüs und Buttons unter der Nachricht. In der Activity tippst du auf das Kästchen einer Aufgabe oder auf ihren Text. Diese Seiten sind genauso aufgeteilt:

- **Funktionen**: was jede Funktion macht und ihre Regeln, an beiden Orten gleich.
- **Im Kanal**: die Nachricht der Liste, ihre Menüs und ihre Buttons.
- **In der Activity**: das Fenster, die Kästchen und das Panel jeder Aufgabe.

Ein paar Aktionen gibt es nur im Kanal: Klonen, Herunterladen, Versiegeln, Löschen, Entsperren und den Import aus einer Datei. Siehe [Was im Kanal bleibt](/docs/activity/#what-stays-in-the-channel).

## Aufgaben, Unteraufgaben und Gruppen

| Begriff | Was es ist |
| :--- | :--- |
| **Aufgabe** | Eine einzelne Tätigkeit, weder Unteraufgabe noch Gruppe. |
| **Unteraufgabe** | Eine Tätigkeit, die zu einer größeren gehört. |
| **Aufgabengruppe** | Eine Aufgabe, die aus Unteraufgaben besteht. |

Diese Typen wählst du nie in einem Menü: TTM erkennt sie daran, wie du die Liste schreibst. Eine Zeile, die mit `-` beginnt, ist eine Aufgabe. Leerzeichen vor dem Strich machen sie zur Unteraufgabe der Zeile darüber. Eine Aufgabe mit Unteraufgaben wird automatisch zu einer **Gruppe**. Wie du sie schreibst: [Erstelle deine erste Liste](/docs/getting-started/#2-create-your-first-list).

Gruppen verhalten sich als Einheit: Wer eine Gruppe abhakt, hakt auch ihre Unteraufgaben ab, und wenn alle Unteraufgaben abgehakt sind, gilt die Gruppe als erledigt.

## Zustand einer Aufgabe

Jede Aufgabe ist entweder **offen** oder **erledigt**, erkennbar an ihrem Kästchen:

- **Offen** <img class="inline-ic" src="/icons/checkbox_empty.png" alt="" />: noch zu tun.
- **Erledigt** <img class="inline-ic" src="/icons/checkbox_marked.png" alt="" />: fertig.

Im Kanal hakst du eine Aufgabe im [Abhak-Menü](/docs/the-task-list/#the-check-selector) unter der Liste ab oder wieder ab. In der Activity tippst du auf ihr [Kästchen](/docs/activity-list/#tick-a-task). Eine Aufgabe zu erledigen oder wieder zu öffnen kann Benachrichtigungen und Webhooks auslösen.

### Wer eine Aufgabe abhaken darf

**Eine Aufgabe mit Besitzer dürfen nur diese Personen abhaken oder wieder öffnen:**

- der Besitzer oder die Mitglieder der Besitzer-Rolle;
- alle mit *Nachrichten verwalten* im Kanal.

Alle anderen bekommen eine Ablehnung, die nur sie sehen, und nichts ändert sich. Die Regel gilt auch für Unteraufgaben: Du kannst eine Gruppe nicht abhaken oder wieder öffnen, wenn sich dabei eine Unteraufgabe ändert, die jemand anderem gehört. Eine Aufgabe ohne Besitzer kann jede Person abhaken, die die Liste benutzen darf.

## Besitzer oder Tag

Sie sehen ähnlich aus, haben aber unterschiedliche Aufgaben:

- **Besitzer** <img class="inline-ic" src="/icons/owner.png" alt="" />: die Person oder Rolle, die für die Aufgabe *verantwortlich* ist. Eine Aufgabe hat einen Besitzer, und mit Premium können es mehrere Personen sein: TTM erstellt dafür eine Rolle (siehe [Die Rollen, die TTM erstellt](/docs/owners-and-tags/#the-roles-ttm-creates)).
- **Tag** <img class="inline-ic" src="/icons/tag.png" alt="" />: ein oder mehrere Benutzer oder Rollen, die an der Aufgabe *erwähnt* werden, zum Beispiel die Personen, die bei ihrem Abschluss benachrichtigt werden sollen.

Die Regeln für beide: [Besitzer und Tags](/docs/owners-and-tags/).

## Erinnerungen

Eine **Erinnerung** <img class="inline-ic" src="/icons/alertW.png" alt="" /> hängt einer Aufgabe einen Zeitplan an: ein Datum, eine Uhrzeit und eine Zeitzone. Wenn sie fällig wird, erinnert TTM den **Besitzer** der Aufgabe, sodass niemand ständig nachsehen muss. Eine Person bekommt eine Direktnachricht, eine Rolle eine Erwähnung im Kanal der Liste.

Ein einzelner Ping ist der Standard, und im Free-Tarif ist er die einzige Art. Wiederkehrende Erinnerungen fügen ein Intervall und eine Anzahl an Wiederholungen hinzu. Sie sind eine Premium-Funktion, die ein Server in [/config app](/docs/configuration/#recurring-reminders) einschaltet. Alle Details in [Erinnerungen](/docs/reminders/).

## Benachrichtigungen und Verlauf

Wenn eine Liste erstellt oder eine Aufgabe abgehakt oder wieder geöffnet wird, kann TTM eine Benachrichtigung posten und, wenn du es einschaltest, jede Aktion in einem eigenen **Verlaufs-Thread** festhalten. Die Benachrichtigung zu einer neuen Liste kann die Besitzer ihrer Aufgaben erwähnen, damit sie davon erfahren.

Änderungen in der Activity kommen als eine einzige Zusammenfassung, wenn die Liste in den Kanal zurückkehrt. Wie viele Benachrichtigungen du willst, entscheidest allein du: siehe [/config app](/docs/configuration/).

## Wer Listen und Befehle nutzen darf

Standardmäßig folgen die Befehle der App den Sichtbarkeitsregeln von Discord (Servereinstellungen → Integrationen). Buttons und Listen dagegen bleiben für alle nutzbar, außer du **synchronisierst die Berechtigungen**. Danach ist die Liste für Benutzer ohne Erlaubnis schreibgeschützt, im Kanal und in der Activity. Auch das findest du in [/config app](/docs/configuration/#sync-permissions).

`/config` hat eine eigene Regel: Standardmäßig sehen es nur Mitglieder mit *Server verwalten*. Ein Admin kann das in *Servereinstellungen → Integrationen* ändern. Siehe [Wer /config öffnen kann](/docs/config/#who-can-open-config).

Ein paar Aktionen haben eine eigene Regel:

- Eine Aufgabe mit Besitzer kann nur ihr Besitzer abhaken oder wer *Nachrichten verwalten* hat: siehe [Wer eine Aufgabe abhaken darf](#who-can-tick-a-task);
- eine Liste aus ihrem Panel *Mehr* im Kanal zu versiegeln oder zu löschen, braucht *Nachrichten verwalten* im Kanal. Aus `/config lists` gelten die Berechtigungen von `/config`;
- eine Liste in der Activity zu öffnen, braucht die Discord-Berechtigung *Aktivitäten verwenden* im Kanal: siehe [Wenn sich die Liste nicht öffnet](/docs/activity/#when-the-list-doesnt-open).

## Die Berechtigungen, die TTM verlangt

Wenn du den Bot einlädst, zeigt Discord die Berechtigungen, die er anfragt. Wofür jede gebraucht wird:

| Berechtigung | Wofür sie gebraucht wird |
| :--- | :--- |
| Kanal ansehen | Den Kanal sehen, in dem die Liste lebt |
| Nachrichten senden | Die Liste posten und aktualisieren |
| Links einbetten | Die Liste als Embed darstellen |
| Nachrichten verwalten | Ältere Benachrichtigungen des Bots entfernen, damit der Kanal lesbar bleibt |
| Öffentliche Threads erstellen | Den optionalen Verlaufs-Thread in Textkanälen erstellen |
| Webhooks verwalten | In den Verlaufs-Thread schreiben, in Textkanälen |
| Verbinden | Die Liste im Chat eines Sprachkanals posten |
| Dateien anhängen | Den Download der Liste bereitstellen |
| Nachrichtenverlauf lesen | Die Liste synchron halten |
| @everyone, @here und alle Rollen erwähnen | Die Personen benachrichtigen, die du an einer Aufgabe taggst, und die Rolle, der eine Aufgabe gehört, wenn ihre Erinnerung fällig wird |
| Rollen verwalten | Die Rolle erstellen, die mehrere Personen zum Besitzer einer Aufgabe macht (Premium) |
| Externe Emojis verwenden | Die eigenen Icons des Bots auf Buttons und in Listen zeigen |

**In einem Sprachkanal** lebt eine Liste im Chat des Kanals, der keinen Verlauf hat, und TTM braucht *Verbinden*, um dort zu posten: siehe [Sprachkanäle](/docs/known-limits/#voice-channels).

<div class="callout"><div class="callout-t">Gut zu wissen</div>Du kannst sie später unter <em>Servereinstellungen → Rollen → Team Tasks Manager</em> gewähren oder pro Kanal in den Berechtigungseinstellungen des Kanals. <em>Rollen verwalten</em> ist die Ausnahme: Sie gilt nur für die Rolle des Bots, nicht pro Kanal.</div>
