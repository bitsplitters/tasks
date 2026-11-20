---
title: Get your guild ready for raid night
seoTitle: "Discord Guild Manager Bot: Raid Nights and Clan Tasks"
name: Guilds and clans
description: "A guild's week around raid night: a reminder that repeats every Wednesday for months, recruits' trials taken in a row, and a roster sheet that fills itself through Make and Google Sheets."
highlights: "A recurring reminder in days, trials taken one after another, a webhook to Make and Google Sheets, free variables, Reopen all with a new date."
intro: |
  Ava leads **Ember Vanguard**, a raiding guild of about sixty players. Leo leads the raids, every Wednesday at 8 PM. The officers recruit, and each recruit plays a trial raid before joining. The members play from both sides of the Atlantic. This is the guild's week from Monday 7 to Sunday 13 December 2026.
order: 5
team:
  guild: Ember Vanguard
  zone: America/Chicago
  people:
    - { id: "11859044175621001", name: Ava, username: ava.ember, color: "#eb459e", about: "Guild leader. She writes the list." }
    - { id: "11859044175621002", name: Leo, username: leo.raids, color: "#3ba55c", about: "Raid leader, and an officer." }
    - { id: "11859044175621003", name: Kai, username: kai.ember, color: "#1abc9c", about: "Officer." }
  roles:
    - { id: "11859044175622001", name: Officers, about: "Ava, Leo, Kai and two more." }
    - { id: "11859044175622002", name: Raiders, about: "The raid team, about thirty players." }
  channels:
    - { id: "11859044175623001", name: raids, about: "Where the raiders talk. The list lives here." }
    - { id: "11859044175623002", name: officers, about: "Private to the officers." }
list:
  title: "Ember Vanguard: the week"
  channel: "11859044175623001"
  at: 2026-12-10T22:00
  look: |
    The raid's reminder shows `↻7d ×16`: every Wednesday until late March. The three trials carry the recruit's name and class as free variables; their webhook doesn't show. «Restock the guild bank» has a single reminder, which moves every week.
  text: |
    - [] <t:1796866200> [0m,7d,15] <@&11859044175622002>: Raid night at 8 PM: in voice by 7:45, with food and potions
    - [X] <t:1796857200> [0m,0m,0] <@&11859044175622001>: Restock the guild bank before the raid
    - [X] <@11859044175621002>: Post the raid roster
    - [X] <@&11859044175622001>: Review this week's applications
    - [X] {{wb=Roster sheet}} <@11859044175621002>: Trial raid: Mirel, {{class=healer}} {{recruit=Mirel}}
    - [X] {{wb=Roster sheet}} <@11859044175621002>: Trial raid: Thorn, {{class=tank}} {{recruit=Thorn}}
    - [] {{wb=Roster sheet}} <@11859044175621002>: Trial raid: Vesk, {{class=mage}} {{recruit=Vesk}}
    - [] <@&11859044175622001>: Answer every applicant, accepted or not
    - [] <@11859044175621001>: Plan the guild's holiday event
webhooks:
  - name: Roster sheet
    service: make
    trigger: both
    method: POST
    url: https://hook.us1.make.com/<id>
    headers: "Content-Type: application/json"
    body: |
      {"recruit": "{{recruit}}", "class": "{{class}}", "officer": "{{user}}", "state": "{{state}}", "when": "{{when}}", "list": "{{list}}"}
    setup: |
      In Make, Ava creates a scenario with two modules. The first is *Webhooks → Custom webhook*: Make generates its URL, the one above, and she pastes it into `/config webhook`. The second is *Google Sheets → Add a row*, on the guild's roster sheet.

      Make learns the shape of the data from a first request. Ava presses **Run once** in the scenario, links the webhook to a test task and ticks it. Now the fields `recruit`, `class`, `officer`, `state` and `when` can be mapped to the columns of the sheet. Make deactivates a webhook that has no scenario for five days, so the scenario comes first.

      Without a trigger, the webhook fires both ways. A trial ticked by mistake and reopened adds a second row, with `reopened` in the state column: the sheet keeps both.
settings:
  - setting: Keep the state after a selection
    choice: On
    why: "Leo takes three trials in a row: **Owner** stays blue after each one."
  - setting: Notification mode
    choice: Keep last two
    why: "#raids is busy. The last two notifications stay under the list, and the older ones go."
  - setting: Time zone
    choice: America/Chicago
    why: "The raid is at 8 PM, Chicago time. Discord shows the time in each reader's own zone, so a raider in Lisbon reads 2 AM."
  - setting: Recurring reminders
    choice: On
    premium: true
    why: "One reminder for every raid until late March, instead of a new one each week."
week:
  - at: 2026-12-07T20:00
    text: "Ava adds three trials with **Bulk update** <img class=\"inline-ic\" src=\"/icons/edit.png\" alt=\"\" />, one task per recruit. She writes the codes too: `{{wb=Roster sheet}}` links the webhook, `{{recruit=…}}` and `{{class=…}}` carry the name and the class."
  - at: 2026-12-08T19:00
    text: "Leo **takes** the three trials. He presses **Owner** until it turns blue, then picks the first trial, the second and the third, without choosing anyone. With *Keep the state after a selection*, **Owner** stays blue between them, and each task becomes his."
    card: { kind: notice, type: claimed, by: "11859044175621002", task: "7" }
  - at: 2026-12-09T17:00
    text: "The officers' reminder mentions @Officers in #raids. Kai restocks the guild bank and ticks the task."
  - at: 2026-12-09T19:30
    text: "The raid's reminder mentions @Raiders in #raids, as a reply to the list. It will come every Wednesday at 7:30 PM until late March."
    card: { kind: reminder, task: "1" }
  - at: 2026-12-09T22:40
    text: "Mirel's trial went well. Leo ticks her task, and the webhook sends Make the row for the roster sheet."
    card: { kind: webhook, webhook: Roster sheet, task: "5", by: "11859044175621002" }
  - at: 2026-12-10T21:30
    text: "Thorn plays a second trial on Thursday, with a smaller group. Leo ticks it: one more row on the sheet."
---

## Next time

Every Monday, Ava first replaces the finished trials with the new recruits, with **Bulk update**: it fires no webhooks, so the sheet doesn't change. Then she presses **Reopen all** <img class="inline-ic" src="/icons/reopen.png" alt="" /> and picks **New date**, with next Wednesday at 5 PM: the bank's reminder moves there. Reopening fires the reopening webhooks of the tasks it reopens, so the trials go first.

Nobody ticks the raid: ticking a task stops its reminder. The raid's reminder comes back every Wednesday on its own. See [Reopen all](/docs/list-actions/#reopen-all).

## What TTM doesn't do here

TTM doesn't read the game. It has no raid sign-ups, no attendance, no loot tracking, and no calendar with RSVPs: a raid planner bot does those. TTM keeps the guild's work, pings the raid team on time and sends what the officers decide to the sheet.

## Questions

### Why `7d` and not `168h`?

On 14 March 2027 the clocks in Chicago move forward an hour. With days, the reminder stays at 7:30 PM after the change. With hours, it would arrive at 8:30 PM, when the raid has started. See [The repetition fields](/docs/reminders/#the-repetition-fields).

### How do I send the owner of the task to the sheet?

`{{user}}` is whoever ticks the task, which here is Leo. To send the owner even when another officer ticks, write it in the task as a free variable, `{{owner=Leo}}`, and use `{{owner}}` in the body. `{{task}}` carries the owner only as a Discord code, `<@id>`, which a sheet can't read. See [Personalize webhooks with free variables](/docs/tips/#personalize-webhooks-with-free-variables).

### Can a raider tick a trial?

No: each trial belongs to Leo. A raider who tries gets a refusal only they see. The officers who manage the channel's messages can, with *Manage messages*. See [Who can tick a task](/docs/core-concepts/#who-can-tick-a-task).
