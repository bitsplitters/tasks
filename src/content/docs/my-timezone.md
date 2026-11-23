---
title: /my timezone
description: Your time zone, chosen once — TTM proposes it whenever you pick a date, in every server, in the channel and in the Activity.
group: For you
order: 1
---

Every time you pick a date for a reminder, TTM proposes a time zone. With `/my timezone` you choose **yours** once, and TTM proposes it in every server, in the channel and in the Activity.

So everyone on the team thinks in their own local time. The command works in servers only, needs no permission, and its panel is visible only to you.

## The panel

`/my timezone` shows your current zone and where it comes from:

- **chosen by you**, with **Choose**;
- **the last one you left in a reminder**;
- **your Discord language**, such as `Europe/Rome` for Italian;
- **the server**, when your language is spoken across several zones, such as English (US).

## Choosing your zone

**Choose** opens a form. Paste the official name of your zone, such as `Europe/Rome`.

To find it, open the **[time zone map](https://timezones.bitsplitters.app)**, select your area and copy the value.

From then on TTM proposes your zone whenever you pick a date. A different zone in a reminder applies to that date only: your zone stays.

**Back to automatic** forgets your choice, and TTM learns your zone from your reminders again.

## Until you choose

TTM learns your zone by itself. The zone you leave in a reminder becomes yours, and the line under the field tells you so.

Before your first reminder, the channel proposes the zone of your Discord language, and the Activity the zone of your device. A language spoken across several zones gets the server's zone: see [Time zone](/docs/configuration/#time-zone) in `/config app`.

## In the Activity

The gear at the top right has the same choice: **Time zone**, under **For you, everywhere**. There you can also search for your zone by city or country. See [Your settings](/docs/activity/#your-settings).
