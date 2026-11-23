---
title: "Was Premium freischaltet"
description: "Was der kostenpflichtige Tarif zu Free hinzufügt und was jede Grenze im Alltag ändert."
fonte: 1ce2890c95d6
---

TTM ist **während der Beta komplett freigeschaltet**, deshalb gilt von dieser Seite noch nichts. Sie beschreibt den Free-Tarif und was Premium aufhebt, sobald die Beta endet. Was mit deinem Server passiert, wenn die Beta endet, steht in [So funktioniert die Beta](/docs/beta/).

<div class="callout"><div class="callout-t">Tarife und Preise</div>Die beiden Tarife im Vergleich, die Preise und das Selbst-Hosting findest du auf der <a href="/premium/">Premium-Seite</a>. Die Preise gelten ohne MwSt.: <a href="/premium/#vat">warum</a>.</div>

## Was jeder Punkt ändert, ganz praktisch

Über einer Free-Grenze kannst du nichts mehr hinzufügen, aber nichts, was schon da ist, wird gelöscht oder versteckt: siehe [So funktioniert die Beta](/docs/beta/#when-the-beta-ends).

\* **Eine Grenze von Discord, nicht von uns.** Sie ist in jedem Tarif gleich: Mit Premium *erreichst* du sie, überschreiten kannst du sie nie. Siehe [Bekannte Grenzen](/docs/known-limits/).

**Genutzte Listen — 3 → unbegrenzt.** Drei Listen reichen für ein kleines Team: eine To-do-Liste, eine Bug-Liste, eine Checkliste für das nächste Event. Die Grenze erreichst du, wenn jedes Projekt, jedes Squad und jedes Meeting eine eigene Liste will.

**Aufgaben pro Liste — 20 → 50 \*.** Zwanzig Aufgaben ergeben eine Arbeits-Checkliste, fünfzig ein Backlog. Kein Tarif geht über 50, weil eine Discord-Nachricht nur wenige Menüs fassen kann: siehe [Bekannte Grenzen](/docs/known-limits/).

**Aktive Erinnerungen — 10 → unbegrenzt.** Die Grenze zählt die Erinnerungen, die *gleichzeitig warten*, nicht die Erinnerungen pro Tag. Eine Erinnerung zählt nicht mehr, wenn sie zum letzten Mal ausgelöst hat oder du sie entfernst, und eine wiederkehrende zählt einmal.

**Wiederholungen pro Erinnerung — nur einmalig → bis zu 50.** Im Free-Tarif löst jede Erinnerung einmal aus. Mit Premium kann eine Erinnerung insgesamt bis zu 50 Mal ankommen, die erste mitgezählt, wenn ein Admin **Wiederkehrende Erinnerungen** in [/config app](/docs/configuration/#recurring-reminders) einschaltet. Wiederkehrende Erinnerungen, die du schon hast, lösen im Free-Tarif weiter aus: siehe [Erinnerungen](/docs/reminders/#repeating-reminders).

**Personen pro Besitzer — 1 → bis zu 25 \*.** Im Free-Tarif ist der Besitzer einer Aufgabe eine Person oder eine Rolle. Mit Premium können es bis zu 25 Personen sein, die sich eine Rolle teilen, die TTM erstellt: siehe [Die Rollen, die TTM erstellt](/docs/owners-and-tags/#the-roles-ttm-creates). Es ist Premium, weil jede Person eine Anfrage an Discord kostet. Discord begrenzt die Anfragen, die ein Bot senden darf, und alle seine Server teilen sich diese Grenze.

**Webhooks — keine neuen → bis zu 25 \*.** Ein Webhook lässt eine erledigte Aufgabe einen HTTP-Aufruf an alles senden, was du betreibst: ein Deployment, eine Tabelle, ein Ticketsystem. Es ist das Wichtigste, was Premium hinzufügt. Siehe [Webhooks](/docs/webhooks/). Im Free-Tarif kannst du keine neuen Webhooks erstellen, aber die während der Beta erstellten bleiben: siehe [Was eine Beta-Liste behält](/docs/beta/#what-a-beta-list-keeps).

## So funktionieren die drei Plätze

Im Free-Tarif hat ein Server drei Plätze für Listen. Eine Liste, die einen belegt, ist **in Gebrauch**, und `/config lists` markiert sie so.

- **Eine Liste belegt einen Platz, sobald zum ersten Mal jemand an ihr arbeitet**, und behält ihn. An einer Liste arbeiten heißt eines davon:
  - eine Aufgabe abhaken oder den Haken wegnehmen;
  - eine Sammelbearbeitung oder das Bearbeiten oder Entfernen einer einzelnen Aufgabe;
  - **Liste bereinigen** oder **Alle wieder öffnen**;
  - einen Besitzer, einen Tag oder eine Erinnerung setzen;
  - einen Webhook verknüpfen.
- **Eine neue Liste belegt einen Platz**, wenn du sie erstellst, klonst oder importierst. Eine Liste zu regenerieren zählt als Arbeit an ihr.
- **Ein Platz läuft nicht ab.** Nur das Versiegeln oder Löschen der Liste gibt ihn frei.
- **Eine Liste, die nicht in Gebrauch ist, bleibt im Kanal, wie sie ist.** Du kannst sie weiterhin herunterladen, versiegeln oder löschen.

Listen, die während der Beta erstellt wurden, sind eine Ausnahme: Ihre Aufgaben lassen sich weiter abhaken, ohne für die Grenze von drei Listen zu zählen. Siehe [Was eine Beta-Liste behält](/docs/beta/#what-a-beta-list-keeps).

<div class="callout"><div class="callout-t">Keine Grenze zählt, wie oft du etwas benutzt</div>Jede Grenze zählt, wie viele Dinge du hast, nie, wie oft du sie benutzt. Ein Webhook, der tausendmal pro Woche auslöst, zählt trotzdem als ein Webhook.</div>

### Was mit einer vierten Liste passiert

Wenn alle drei Plätze belegt sind, lehnt TTM es ab, eine weitere Liste zu erstellen, zu klonen oder zu importieren. Es lehnt auch ab, an einer Liste zu arbeiten, die nicht in Gebrauch ist. Der Bot sagt dir, wie du einen Platz freimachst:

- **Liste versiegeln**, im Panel **Mehr** <img class="inline-ic" src="/icons/other.png" alt="" /> einer Liste, mit der du fertig bist. Die Liste bleibt als Protokoll im Kanal, ohne Buttons.
- **Liste löschen**, im selben Panel. Es entfernt die Liste endgültig.
- [`/config lists`](/docs/config-lists/), das die genutzten Listen markiert und mehrere auf einmal versiegeln oder löschen kann.

Die Nachricht einer Liste von Hand zu löschen gibt nichts frei: Die Liste bleibt mit ihrem Platz in TTM, und ihre Erinnerungen kommen weiter an. Nutze stattdessen **Liste löschen**. Wenn die Nachricht schon weg ist, kann `/config lists` den Rest löschen oder die Liste neu erstellen.

## Fragen?

Komm auf unseren [Discord-Server](/docs/community/) und frag uns alles zu Preisen, Grenzen oder Selbst-Hosting.
