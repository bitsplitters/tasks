---
layout: ../../layouts/Legal.astro
title: "Datenschutzerklärung"
description: "Welche Daten der Discord-Bot Team Tasks Manager erhebt, warum und wie sie behandelt werden."
updated: "Zuletzt aktualisiert: 24. November 2026"
fonte: 5d462855738d
---

Diese Datenschutzerklärung erklärt, welche Daten der Bot **Team Tasks Manager** („TTM“) erhebt und wie wir sie behandeln. Sie gilt für die Nutzung des Bots auf Discord, die Activity eingeschlossen (siehe [Die Activity](#die-activity)), für unseren Discord-Community-Server (siehe [Unser Community-Server](#unser-community-server)) und für unsere Websites (siehe [Unsere Websites](#unsere-websites)). Zu deinen Rechten nach dem Datenschutzrecht der EU siehe auch unsere [DSGVO-Seite](/de/gdpr/).

## Wer wir sind

Verantwortlich für die Datenverarbeitung ist **bitsplitters** — Alessandro Vurro, Via di Dragone 478/B, 00126 Rom (RM), Italien. Italienische USt-IdNr. 18349651002, zertifizierte E-Mail (PEC): alessandro.vurro@pec.it. Kontakt: **info@bitsplitters.app**.

## Was wir erheben

TTM speichert nur, was nötig ist, um Aufgabenlisten in deinem Server zu betreiben:

- **Discord-Kennungen** — IDs von Server (Guild), Kanal und Nachricht; IDs von Benutzern und Rollen, wenn du einen Besitzer vergibst, ein Tag hinzufügst oder Berechtigungen konfigurierst.
- **Aufgabeninhalte, die du erstellst** — Titel der Listen und Text der Aufgaben, einschließlich allem, was du darin eintippst (Erwähnungen, Links, Notizen).
- **Erinnerungen** — Daten, Intervalle, Wiederholungen und die für den Server eingestellte Zeitzone.
- **Deine persönliche Zeitzone** — die Zeitzone, die du mit `/my timezone` oder im Zahnrad der [Activity](#die-activity) wählst. Sie wird zu deiner Discord-Benutzer-ID gespeichert und auf allen Servern wiederverwendet. Eine andere Zone, die du für ein Datum wählst, wird nicht gespeichert, und **Meine Zeitzone entfernen** löscht sie.
- **Dein Kanal für Direktnachrichten** — wenn du eine Aufgabe besitzt, erreichen dich ihre Erinnerungen per Direktnachricht. Deshalb speichert der Bot die ID seines Direktnachrichten-Kanals mit dir, um sie mit einer einzigen Anfrage an Discord zuzustellen. Wenn du keine Direktnachrichten annimmst, speichert er außerdem, bis wann er es nicht noch einmal versuchen soll (sechs Stunden nach dem gescheiterten Versuch). Beides wird wie die Zeitzone zu deiner Discord-Benutzer-ID gespeichert; die Nachrichten selbst werden nicht gespeichert.
- **Ob du die zweite Reihe gelernt hast** — wenn du unter einer Liste **Inhalt** oder **Erinnerung** drückst, schickt dir der Bot einen kurzen Tipp mit dem nächsten Schritt, bis du zum ersten Mal im Menü der Liste eine Aufgabe auswählst, während einer von beiden aktiv ist. Danach kommt der Tipp auf keinem Server mehr zurück: Dafür speichert der Bot deine Discord-Benutzer-ID und wann du es getan hast, sonst nichts.
- **Rollen, die TTM erstellt** — wenn eine Aufgabe mehreren Personen gehört, erstellt TTM eine Rolle und speichert ihre ID, den Namen, den es ihr gegeben hat, die Benutzer-IDs der Personen, denen es sie gegeben hat, wer sie angefordert hat, wann und in welcher der Sprachen des Bots: um diese Personen zu zeigen, wenn die Aufgabe bearbeitet wird, um die Rolle zu löschen, wenn keine Liste sie mehr nutzt, und die Sprache, um den Hinweis zu schreiben, der zu einer Erinnerung gehört, die per Direktnachricht an diese Personen geht, wenn TTM nicht im Kanal der Liste posten kann.
- **Konfiguration** — Einstellungen pro Server wie Benachrichtigungsmodus, Verlaufsverfolgung, Push-Option und Zeitzone.
- **Webhooks** — die HTTP-Methode, URL, Header und den Body, die du festlegst, und ihre Zuordnung zu Aufgaben.
- **Aktivitätsverlauf** — Aufzeichnungen der Aktionen auf Listen (wer was wann getan hat), wenn die Verlaufsverfolgung aktiviert ist.
- **Die Activity** — wenn du eine Liste in der Activity öffnest, dem Fenster von TTM innerhalb von Discord: wer du bist, ein Schlüssel für das Fenster und eine Aufzeichnung der Änderungen, bis ihre Zusammenfassung gepostet wird. Siehe [Die Activity](#die-activity).
- **Aggregierte Nutzungsstatistiken** — Zähler pro Server: wie oft jede Funktion genutzt wird und wann zuletzt. Außerdem jeden Tag die Summen der Listen, Aufgaben, Erinnerungen und Webhooks und die Mitgliederzahl des Servers. Schließlich, für jede Sprache der Discord-App, wie viele Interaktionen, Personen und Server es an diesem Tag gab: Um jede Person und jeden Server nur einmal zu zählen, hält TTM ihre IDs nur für diesen Tag im Speicher und speichert nur die Summen. Keine dieser Statistiken erfasst, wer was getan hat.

## Was wir NICHT erheben

- Wir lesen oder speichern **nicht** deine allgemeinen Discord-Nachrichten oder Direktnachrichten. Der Bot nutzt keinen der privilegierten Zugänge von Discord: nicht den Nachrichteninhalt, nicht die Mitgliederliste, nicht die Präsenz.
- Wir erheben über den Bot **keine** E-Mail-Adressen, Passwörter oder Zahlungsinformationen. Wenn du uns per E-Mail schreibst, nutzen wir deine Adresse nur, um dir zu antworten.

## Warum wir sie nutzen

Wir verarbeiten diese Daten ausschließlich, um **den Dienst bereitzustellen**: deine Listen darzustellen und zu aktualisieren, Erinnerungen und Benachrichtigungen zu senden, die Webhooks auszuführen, die du konfigurierst, und den Bot zu pflegen und zu verbessern (über aggregierte Statistiken).

## Weitergabe

Wir verkaufen deine Daten **nicht**. Die Daten werden von unserem Infrastrukturanbieter **OVHcloud** verarbeitet, der den Bot und seine Datenbank in **Frankreich (EU)** hostet und in unserem Auftrag als Auftragsverarbeiter handelt. Der Bot läuft außerdem auf der Plattform **Discord**, daher unterliegt deine Nutzung der [Datenschutzerklärung von Discord](https://discord.com/privacy). Discord hat seinen Sitz in den Vereinigten Staaten: siehe [Internationale Datentransfers](/de/gdpr/#internationale-datentransfers). **Cloudflare**, ebenfalls mit Sitz in den Vereinigten Staaten, hostet die Seite der [Activity](#die-activity) und trägt ihre Verbindung zum Bot. Wenn du Webhooks nutzt, sendet TTM die Daten, die du konfiguriert hast, an die **Endpunkte Dritter, die du wählst** — diese Dienste liegen außerhalb unserer Kontrolle.

**Fehlerberichte.** Wenn etwas unerwartet fehlschlägt, sendet der Bot einen Bericht an einen privaten Kanal auf unserem Discord-Server, den nur wir sehen können. Ein Bericht enthält die IDs des beteiligten Servers und Benutzers und die technischen Einzelheiten des Fehlers. Er kann einen Ausschnitt dessen enthalten, was gerade verarbeitet wurde, etwa ein Stück einer Aufgabe. Wir löschen diese Berichte, sobald der Fehler behoben ist, spätestens innerhalb von 12 Monaten.

## Speicherdauer

Die Daten werden gespeichert, solange der Bot in deinem Server vorhanden ist und genutzt wird.

**Wenn der Bot von einem Server entfernt wird**, löschen wir seine Inhalts- und Betriebsdaten: Aufgabenlisten und ihre Aufgaben, Tags, Erinnerungen und geplante Erinnerungsereignisse, Webhooks und ihre Aktionen, den Aktivitätsverlauf, die Aufzeichnungen der Änderungen der Activity und die Aufzeichnungen der Rollen, die TTM erstellt hat — die Rollen selbst bleiben im Server, der sie von da an verwaltet.

**Was wir behalten**, ist das Minimum, das nötig ist, um den Dienst zu betreiben und seine Verbreitung zu messen: die Server-ID zusammen mit den dafür konfigurierten Einstellungen, die Daten, an denen der Bot beigetreten und gegangen ist, die Einstellungen der Befehlsberechtigungen, gegebenenfalls Abonnementdaten und nicht identifizierende Nutzungszähler. **Kein Aufgabeninhalt wird behalten.**

**Betriebsprotokolle** — um Fehler zu diagnostizieren, schreibt der Bot technische Logs auf dem Server, auf dem er läuft. Auf der in der Produktion verwendeten Protokollstufe enthalten sie **nicht** den Text deiner Aufgaben oder die Titel deiner Listen; sie können Discord-Kennungen enthalten, zum Beispiel die ID des Benutzers, der an einem Fehler beteiligt ist. Logs werden nach **30 Tagen** automatisch gelöscht.

**Backups** — wir sichern die Datenbank jeden Tag, um den Dienst nach einem Fehler wiederherzustellen. Backups werden **14 Tage** lang in der EU aufbewahrt. Daten, die du löschst oder die wir löschen, wenn der Bot einen Server verlässt, können also bis zu 14 Tage in einem Backup überleben; dann sind sie endgültig weg. Ein Backup wird nur verwendet, um den Dienst wiederherzustellen.

**Deine persönliche Zeitzone, dein Kanal für Direktnachrichten und die zweite Reihe** — die Zeitzone, die du gewählt hast (mit **Meine Zeitzone entfernen** löschst du sie selbst), die ID deines Direktnachrichten-Kanals mit dem Bot (mit der Angabe, bis wann er es nicht noch einmal versuchen soll, wenn du keine Direktnachrichten annimmst) und die Aufzeichnung, dass du die zweite Reihe gelernt hast, werden zu deiner Discord-Benutzer-ID gespeichert und sind an keinen einzelnen Server gebunden, daher löscht das Entfernen des Bots von einem Server sie nicht. Schreibe an **info@bitsplitters.app** mit deiner Discord-Benutzer-ID, und wir löschen sie. Die Aufzeichnung der zweiten Reihe zu löschen heißt nur, dass der Tipp wiederkommt.

**Die Activity** — der Schlüssel ihres Fensters gilt 24 Stunden, und sein Fingerabdruck wird innerhalb einer Stunde nach dem Ablauf gelöscht. Die Aufzeichnung der dort gemachten Änderungen wird gelöscht, wenn die Liste in den Kanal zurückgeht. Siehe [Die Activity](#die-activity).

**Eine einzelne Liste kannst du selbst löschen**, ohne uns zu fragen: mit dem Button **Liste löschen** im Panel *Mehr* der Liste oder mit `/config lists`, wenn die Nachricht der Liste nicht mehr da ist. Das Löschen ist sofort und endgültig und nimmt die Aufgaben, Besitzer, Tags, Erinnerungen und den Aktivitätsverlauf der Liste mit.

**Liste versiegeln**, im selben Panel, entfernt die Daten der Liste ebenfalls aus TTM, lässt aber ihre Nachricht — und ihren Verlaufs-Thread — als gewöhnliche Discord-Nachrichten im Kanal, unter der Kontrolle deines Servers. Auch die Rollen, die TTM für diese Liste erstellt hat, bleiben, und TTM vergisst sie.

**Eine Rolle, die TTM erstellt hat**, wird vergessen — ihre Aufzeichnung und die Personen, denen sie gegeben wurde —, sobald keine Liste sie mehr nutzt, weder als Besitzer noch als Tag: Wenn die Rolle noch so ist, wie TTM sie hinterlassen hat (derselbe Name, keine Berechtigungen, dieselbe Zahl von Mitgliedern), löscht TTM sie auch aus dem Server; sonst überlässt es sie deinem Server. TTM vergisst auch die Rollen einer Liste, wenn du sie versiegelst, und alle, wenn der Bot vom Server entfernt wird.

Du kannst jederzeit die Löschung verlangen (siehe [DSGVO](/de/gdpr/)); wir dürfen Daten auch früher löschen.

## Die Activity

Die [Activity](/docs/activity/) öffnet eine Liste in einem Fenster innerhalb von Discord. Zusätzlich zu dem, was der Bot ohnehin verarbeitet:

- **Die Anmeldung.** Wenn du sie öffnest, lässt du TTM über Discord wissen, wer du bist. Discord gibt TTM das Basisprofil deines Kontos — deine Benutzer-ID, deinen Namen und Avatar, die Sprache deiner Discord-App und einige Kontodetails, etwa deine Badges und deine Nitro-Art —, nie deine E-Mail-Adresse. TTM speichert nur deine Benutzer-ID und nutzt die Sprache für die Texte des Fensters und für die Tagessummen pro Sprache (siehe [Was wir erheben](#was-wir-erheben)); den Rest speichert es nicht, ebenso wenig den Zugriff, den Discord ihm gewährt.
- **Dein Status auf Discord.** Im selben Fenster fragt Discord, ob TTM auch auf deinem Profil anzeigen darf, dass du in der Activity bist. Wenn du zustimmst, sendet TTM Discord eine Zeile, *Plant Aufgaben mit dem Team* in deiner Sprache, die deine Freunde und die Mitglieder deiner Server sehen, solange du dort bist. Sie sagt nichts über die Liste, den Server oder den Kanal, und TTM speichert dafür nichts. Wenn du Nein sagst, öffnet sich die Activity trotzdem, ohne die Zeile.
- **Der Schlüssel des Fensters.** TTM gibt dem Fenster einen Schlüssel, der 24 Stunden gilt, damit es sich nach einem Neustart des Bots von selbst wieder verbindet. TTM speichert nur einen Fingerabdruck des Schlüssels, mit deiner Benutzer-ID, dem Server und dem Kanal, für die er gilt, dem Zeitpunkt der Erstellung und dem des Ablaufs. Abgelaufene Fingerabdrücke werden innerhalb einer Stunde gelöscht.
- **Die Änderungen.** Solange eine Liste in der Activity ist, zeichnet TTM jede Änderung auf, um die Zusammenfassung zu schreiben, die gepostet wird, wenn die Liste in den Kanal zurückgeht: wer sie gemacht hat und wann, die Nummer und den Text der Aufgabe und, je nach Änderung, die Besitzer, Tags oder erwähnten Personen (als Discord-IDs), das Datum einer Erinnerung oder von **Alle wieder öffnen**, den Namen eines Webhooks, den Text der Aufgaben, die **Liste bereinigen** entfernt hat. Diese Aufzeichnungen werden gelöscht, wenn die Liste in den Kanal zurückgeht: sobald die Zusammenfassung gepostet ist oder sofort, wenn das nicht geht, zum Beispiel weil der Kanal weg ist. Was bleibt, ist eine Zeile ohne personenbezogene Daten — welche Liste, die Sprache ihrer Zusammenfassung, wann sie geöffnet und geschlossen wurde und warum —, die mit der Liste geht.
- **Wer da ist.** Wer in der Activity ist und wer was bearbeitet, wird nur im Speicher gehalten, solange die Liste dort ist. Um Namen zu zeigen, hält TTM zehn Minuten lang die Namen im Speicher, die es von Discord erhält — der Personen in der Activity und, mit **Besitzer** und **Tag**, der Mitglieder, deren Name zu dem passt, was du tippst —, um nicht noch einmal zu fragen. Es speichert sie nicht.
- **Die Seite und ihre Verbindung.** Das Fenster ist eine Seite, gehostet von **Cloudflare, Inc.** (Vereinigte Staaten), als Auftragsverarbeiter in unserem Auftrag, die Discord über seinen eigenen Proxy lädt. Cloudflare trägt auch die Verbindung zwischen dem Fenster und dem Bot auf unserem Server. Was sie austauschen, etwa die Liste und ihre Änderungen, läuft über den Proxy von Discord und das Netz von Cloudflare, auf jeder Teilstrecke verschlüsselt: Jeder von ihnen entschlüsselt es, um es weiterzuleiten, wie solche Dienste es tun. Wie unsere Websites nutzt die Seite keine Cookies; anders als sie lädt sie keine Besuchsstatistiken. In deinem Browser speichert sie deine Einstellungen der Seite — Textgröße, Design und Zeilen mit Abstand —, die auf deinem Gerät bleiben und nie TTM erreichen. Sie speichert auch den Schlüssel des Fensters, im Session Storage, den der Browser leert, wenn du Discord schließt, um dich nicht erneut anmelden zu müssen, wenn Discord sie neu lädt: **Verlassen** löscht ihn sofort. Wie jeder Webserver erfasst Cloudflare technische Daten zu jeder Anfrage und Verbindung, für die Sicherheit und um den Dienst zu betreiben. Siehe die [Datenschutzerklärung von Cloudflare](https://www.cloudflare.com/privacypolicy/).
- **Rechtsgrundlage.** Erfüllung des Dienstes, den du verlangst, wenn du eine Liste in der Activity öffnest (Art. 6 Abs. 1 lit. b DSGVO).

## Unser Community-Server

Wir betreiben einen Discord-Server für Benutzer von TTM ([so trittst du bei](/docs/community/)). Der Beitritt ist freiwillig und getrennt von der Nutzung des Bots: Der Bot braucht ihn nicht.

- **Was wir sehen.** Wie auf jedem Discord-Server können seine Administratoren und Moderatoren deinen Discord-Benutzernamen, deinen Avatar und dein Profil sehen, wie es im Server angezeigt wird, die Rollen, die du dort hast, und die Nachrichten, die du in seinen Kanälen postest. Wir kopieren sie nirgendwohin sonst, abgesehen von den unten beschriebenen Ticket-Transkripten.
- **Moderation, Rollen und Tickets.** Der Server nutzt **MEE6**, einen Discord-Bot eines Dritten, um Rollen zu vergeben (zum Beispiel die Mitgliederrolle, sobald du die Regeln akzeptierst), um bei der Moderation zu helfen und um Tickets zu betreiben. MEE6 verarbeitet die dafür nötigen Daten nach [seiner eigenen Datenschutzerklärung](https://mee6.xyz/privacy.html).
- **Tickets.** Bewerbungen als Botschafter, Kooperationsvorschläge und Support-Anfragen, die Privatsphäre brauchen, laufen über Tickets: einen privaten Kanal, der nur für dich und das Team sichtbar ist. Wenn ein Ticket geschlossen wird, erstellt MEE6 ein **Transkript** — eine Kopie der Nachrichten in diesem Ticket, mit den Namen und Discord-IDs derer, die sie geschrieben haben —, damit wir dieselbe Anfrage weiterverfolgen können. MEE6 hält es auf seiner eigenen Website, wo es sich nur nach der Anmeldung mit Discord öffnet, und postet den Link dazu in einem Kanal, den nur das Team sieht. Wir löschen diesen Link und jede Kopie, die wir heruntergeladen haben, innerhalb von **12 Monaten** oder früher, wenn du es verlangst. Wie lange MEE6 seine Kopie aufbewahrt, liegt bei MEE6: Wenn du sie gelöscht haben willst, sag es uns, und wir bitten MEE6, sie zu löschen.
- **Rechtsgrundlage.** Unser berechtigtes Interesse, einen Support- und Diskussionsraum für den Bot zu betreiben, die Bewerbungen und Vorschläge zu prüfen, die uns dort geschickt werden, und ihn sicher zu halten (Art. 6 Abs. 1 lit. f DSGVO).

Discord bleibt der Anbieter der Plattform, und was es erhebt, richtet sich nach der [Datenschutzerklärung von Discord](https://discord.com/privacy).

## Unsere Websites

Unsere Websites — bitsplitters.app, tasks.bitsplitters.app und timezones.bitsplitters.app — nutzen keine Cookies und speichern nichts in deinem Browser.

- **Hosting.** Sie werden auf **GitHub Pages** gehostet, einem Dienst von GitHub, Inc. (Vereinigte Staaten). Wie jeder Webserver erfasst GitHub technische Daten zu jedem Besuch, einschließlich deiner IP-Adresse, für die Sicherheit und um den Dienst zu betreiben. Siehe die [Datenschutzerklärung von GitHub](https://docs.github.com/en/site-policy/privacy-policies/github-general-privacy-statement).
- **Besuchsstatistiken.** Um Besuche zu zählen und zu sehen, welche Websites uns Besucher schicken, laden unsere Seiten ein Skript von **Cloudflare Web Analytics**, einem Dienst von Cloudflare, Inc. (Vereinigte Staaten). Für jeden Seitenaufruf erfasst es die Seite, die Website, von der du kommst, dein Land, deinen Browser, dein Betriebssystem und die Art des Geräts sowie wie lange die Seite zum Laden brauchte. Es setzt keine Cookies, speichert nichts in deinem Browser und identifiziert dich nicht: Wir sehen nur Summen, nie einzelne Besucher. Cloudflare erhält mit der Anfrage deine IP-Adresse, wie jeder Webserver, und nutzt sie nicht, um dich wiederzuerkennen. Siehe die [Datenschutzerklärung von Cloudflare](https://www.cloudflare.com/privacypolicy/).
- **Die Zeitzonenkarte.** Die Karte auf timezones.bitsplitters.app lädt ihre Bilder von den Servern von **OpenStreetMap**, die dadurch deine IP-Adresse erhalten. Siehe die [Datenschutzerklärung der OpenStreetMap Foundation](https://osmfoundation.org/wiki/Privacy_Policy).
- **Rechtsgrundlage.** Unser berechtigtes Interesse, die Dokumentation und die Tools zum Bot zu veröffentlichen und in aggregierter Form zu wissen, wie viele Menschen sie lesen und woher sie kommen (Art. 6 Abs. 1 lit. f DSGVO).

## Sicherheit

Wir wenden angemessene technische und organisatorische Maßnahmen an, um die Daten zu schützen. Keine Übertragungs- oder Speichermethode ist völlig sicher, daher können wir keine absolute Sicherheit garantieren.

## Kinder

TTM richtet sich nicht an Personen unterhalb des von Discord geforderten Mindestalters.

## Änderungen

Wir dürfen diese Erklärung aktualisieren; das Datum „Zuletzt aktualisiert“ zeigt die jeweils neueste Fassung.

## Kontakt

**info@bitsplitters.app**
