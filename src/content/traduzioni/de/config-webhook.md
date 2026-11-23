---
title: "/config webhook"
description: "Erstelle die Webhooks deines Servers — den HTTP-Aufruf, die Tokens, die er tragen kann, und die Adressen, die TTM akzeptiert."
fonte: d05440cda658
---

`/config webhook` erstellt die Webhooks deines Servers: den HTTP-Aufruf, den eine Aufgabe sendet, wenn sie erledigt oder wieder geöffnet wird. Was ein Webhook macht und wie du ihn mit einer Aufgabe verknüpfst: siehe [Webhooks](/docs/webhooks/).

Standardmäßig können nur Mitglieder mit der Berechtigung *Server verwalten* `/config webhook` nutzen, wie den Rest von `/config`. Siehe [Wer /config öffnen kann](/docs/config/#who-can-open-config).

Webhooks sind **Premium**, während der Beta für jeden Server freigeschaltet. Nach der Beta bleiben im Free-Tarif die Webhooks, die du schon hast, und du kannst sie weiterhin ändern oder löschen, aber keine neuen erstellen: siehe [Was eine Beta-Liste behält](/docs/beta/#what-a-beta-list-keeps).

## Einen Webhook erstellen

```
/config webhook
```

Der Befehl hat ein paar Optionen:

| Option | Pflicht? | Werte | Hinweise |
| :--- | :--- | :--- | :--- |
| **aktion** | Pflicht | ansehen · erstellen · bearbeiten · löschen | Was du tun willst. |
| **webhook** | Pflicht | ein Name | Der Webhook, auf den sich die Aktion bezieht, bis zu 96 Zeichen. |
| **ereignis** | Optional | abschluss · wiedereröffnung | Lass es weg, um **beide** Richtungen auf einmal zu bearbeiten. |

Wenn du **erstellen** oder **bearbeiten** wählst, öffnet sich ein Formular mit vier Feldern:

- **HTTP-Methode** — `GET`, `POST`, `PUT` oder `DELETE`.
- **URL** — eine öffentliche `https`-Adresse.
- **Headers** — eine Angabe `Key: value` pro Zeile.
- **Body** — JSON.

Ein Webhook ist in Wirklichkeit ein **Paar von Aktionen**, eine für den Abschluss und eine für die Wiedereröffnung, unter einem einzigen Namen. Das Ereignis wählt eine davon. Lässt du es weg, deckt ein einziger Befehl beide ab:

| Aktion | Ohne Ereignis |
| :--- | :--- |
| **erstellen** | Richtet Abschluss und Wiedereröffnung mit derselben Konfiguration ein. Die Tokens `{{state}}` und `{{when}}` unterscheiden die beiden Ereignisse. |
| **ansehen** | Gibt beide aus. |
| **bearbeiten** | Füllt das Formular mit der Abschluss-Aktion vor und überschreibt beide. |
| **löschen** | Entfernt den Webhook ganz, mit allen seinen Aktionen. |

Jeder Server kann bis zu **25** Webhooks behalten. Obergrenze erreicht? Lösche einen, den du nicht mehr brauchst: TTM listet sie alle in der Fehlermeldung auf.

Ein neuer Webhook ist noch mit keiner Aufgabe verknüpft: siehe [Einen Webhook mit einer Aufgabe verknüpfen](/docs/webhooks/#associating-a-webhook-with-a-task).

## Tokens

In der URL, in den Headers und im Body kannst du `{{ }}`-Tokens einsetzen, die TTM beim Senden ersetzt.

Im Body steht ein Token innerhalb eines JSON-Strings, zwischen Anführungszeichen. TTM maskiert den Wert, deshalb sendet eine Aufgabe mit Anführungszeichen oder Zeilenumbruch trotzdem gültiges JSON.

In der URL wird jeder Wert prozentkodiert: Ein Leerzeichen wird zu `%20`.

**Eingebaute Tokens**

| Token | Wert |
| :--- | :--- |
| `{{task}}` | Der Text der Aufgabe |
| `{{state}}` | Status — erledigt oder wieder geöffnet |
| `{{list}}` | Der Titel der Liste |
| `{{user}}` / `{{user_id}}` | Name / ID der Person, die die Aufgabe umgeschaltet hat |
| `{{when}}` | Datum und Uhrzeit (ISO-8601) |
| `{{guild}}` / `{{guild_id}}` | Name / ID des Servers |
| `{{channel}}` / `{{channel_id}}` | Name / ID des Kanals |

**Freie Variablen** — definiere `{{schluessel=wert}}` an einer beliebigen Stelle im Text einer Aufgabe und rufe `{{schluessel}}` im Webhook auf. Unbekannte Tokens werden einfach zu einem leeren String.

## Beispiel

Ein `POST`, der einen Abschluss ankündigt:

```
Methode: POST
URL:     https://example.com/hooks/ttm
Headers: Content-Type: application/json
Body:
{
  "text": "{{user}} {{state}} \"{{task}}\" in {{list}}",
  "at": "{{when}}"
}
```

## Sicherheit

Zur Sicherheit aller akzeptiert TTM nur **öffentliche `https`-URLs**. Interne oder nicht routbare Ziele — `localhost`, private IP-Bereiche, Link-Local-Adressen — werden blockiert.

Der Body muss gültiges JSON sein, und jede Header-Zeile muss das Format `Key: value` haben.
