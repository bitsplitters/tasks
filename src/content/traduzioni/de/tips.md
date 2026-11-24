---
title: "Tipps & Tricks"
description: "Kleine Gewohnheiten, die TTM schneller und leiser machen, im Kanal und in der Activity."
fonte: 6e297084b41a
---

Das meiste funktioniert überall, wo die Liste ist. Was es nur an einem Ort gibt, sagt das unter seinem Titel.

## Eine Liste überall wiederverwenden

<p class="place-pill"><img class="place-ic" src="/icons/posto-canale.svg" alt="" />Im Kanal</p>

Öffne **Mehr** <img class="inline-ic" src="/icons/other.png" alt="" /> und wähle **Herunterladen** <img class="inline-ic" src="/icons/download.png" alt="" />: Die Liste kommt als `.txt`-Datei, die nur du sehen kannst. Führe dann `/liste-erstellen` auf einem beliebigen Server aus und hänge diese Datei an die Option `datei` an.

Aufgaben, Erledigt-Status, Besitzer, Tags, Erinnerungen und Webhooks kommen zurück, wie sie waren. Das eignet sich gut für Checklisten, die du wiederholst, etwa Releases, Onboarding oder Events.

Wenn etwas in der Datei nicht zum neuen Server passt, erstellt TTM nichts und listet alle Probleme auf einmal auf. Was es prüft: siehe [`/liste-erstellen`](/docs/commands/#create-list).

## Die Tipps ausblenden

Wenn dein Team schon weiß, wo man drückt, blende die **Tipps** in [/config app](/docs/configuration/#tips) aus: kein Tutorial in `/liste-erstellen`, keine Hilfezeile unter den Listen.

## Klonen statt neu aufbauen

<p class="place-pill"><img class="place-ic" src="/icons/posto-canale.svg" alt="" />Im Kanal</p>

Du führst dieselbe Liste in mehreren Kanälen? **Liste klonen** <img class="inline-ic" src="/icons/clone.png" alt="" />, im Panel **Mehr** der Liste, kopiert sie in einem Schritt — und du entscheidest, ob Haken und Erinnerungen mitkommen.

## Eine Aktion auf viele Aufgaben anwenden

<p class="place-pill"><img class="place-ic" src="/icons/posto-canale.svg" alt="" />Im Kanal</p>

Wähle **Zustand nach der Auswahl beibehalten** im Menü **Verhalten** von [/config app](/docs/configuration/#keep-the-state-after-a-selection). Der aktive Button (Besitzer, Tag oder Erinnerung) bleibt nach jeder Aufgabe an, so kannst du fünf Aufgaben mit fünf Klicks taggen statt mit fünfzehn.

## Den Kanal ruhig halten

Wenn dir die Benachrichtigungen zu Aufgaben zu laut sind, stell den **Benachrichtigungsmodus** in [/config app](/docs/configuration/#notification-mode) so ein, dass nur die letzte bleibt, oder schalte sie aus: Die Liste bleibt in beiden Fällen aktuell.

## Erinnerungen, die die Zeitumstellung überstehen

Wähle bei einer wiederholten Erinnerung im Menü **Einheit** **Tage** für dieselbe Tageszeit, **Stunden** für ein genaues Intervall: Rund um eine Zeitumstellung unterscheiden sich die beiden um eine Stunde. Siehe [Die Wiederholungsfelder](/docs/reminders/#the-repetition-fields).

## Eine Erinnerung in zwei Klicks

Die Erinnerung beginnt in zehn Minuten ab jetzt. Für „erinnere mich gleich“ speicherst du sie also einfach, wie sie ist, mit **Wann** im Kanal oder mit **Speichern** in der Activity.

## Webhooks mit freien Variablen anpassen

Schreib `{{owner=alex}}` (oder ein beliebiges `{{schluessel=wert}}`) in den Text einer Aufgabe und rufe `{{owner}}` im Body deines Webhooks auf. So gibst du aufgabenspezifische Daten leicht weiter, ohne sie fest einzutragen. Siehe [Webhooks im Text](/docs/writing-a-list/#webhooks-in-the-text).

## Listen für Gäste schreibgeschützt machen

Synchronisiere die Berechtigungen in [/config app](/docs/configuration/#sync-permissions), damit nur dein Team eine Liste bearbeiten kann, während alle anderen sie trotzdem lesen können. Der Button **Activity** <img class="inline-ic" src="/icons/activity.png" alt="" /> folgt denselben Regeln.
