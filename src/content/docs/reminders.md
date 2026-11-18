---
title: Reminders
description: Attach a schedule to a task so TTM pings its owner on time — who gets it, time zones, repetitions.
group: Features
order: 3
---

A reminder turns a task into something that reminds *you*, instead of the other way round. You set it once; TTM handles the pings. You add one with **Reminder** <img class="inline-ic" src="/icons/alertW.png" alt="" />: in the channel, in the second row under the list; in the Activity, in the panel of a task. Where to press: [How to do it](#how-to-do-it), at the bottom.

## The rules

- **A reminder has a date, a time and a time zone.** It fires **once**, unless your server uses [repeating reminders](#repeating-reminders).
- **The start must be at least 5 minutes in the future.** The form starts from ten minutes from now, so a reminder for "in a moment" needs no typing at all.
- **Only a task still to do can get one.** Completing a task stops its reminder — no need to clean up afterwards.
- **The reminder goes to the task's owner**, by direct message if the owner is a person. If the task has no owner yet, **you become it** when you save the reminder. From then on only you, and whoever has *Manage messages* on the channel, can tick that task. To give it to someone else, set the owner before or after creating the reminder: see [Owners and tags](/docs/owners-and-tags/).
- **Nothing changes until you save.** When you edit a reminder, Save stays off until you change the date or the recurrence.
- **Removing the owner removes the reminder**, because nobody is left to receive it.

Nothing arrived? The owner must accept direct messages from members of that server: see [Reminders by direct message](/docs/known-limits/#reminders-by-direct-message).

## Your time zone

TTM needs an official time-zone name like `Europe/Rome`. Look yours up on the **[time zone map](https://timezones.bitsplitters.app)**: select your area on the map, copy the value, and paste it into the field. The Activity also lets you search by city or country.

<div class="callout"><div class="callout-t">Your time zone is remembered</div>Choose a zone, and TTM stores <strong>your</strong> choice and proposes it from then on, in the channel and in the Activity. Until you choose one, the channel proposes the zone of your Discord language, such as <code>Europe/Rome</code> for Italian, and the Activity your device's. A language spoken across several zones, such as English (US), gets the server's zone. Reminders you write in the text of a list use the same zone. So every member of the team can think in their own local time.</div>

## How the reminder arrives

When the time comes, TTM reminds the task's owner. The reminder shows the task, the date it was due for and a button that jumps straight to the list.

- If the owner is a **person**, the reminder is a **direct message**.
- If the owner is a **role**, it is a **message in the list's channel** that mentions the role, as a reply to the list. Discord notifies everyone who has that role and can see the channel.

Either way, it arrives **within about ten seconds** of the scheduled time, and always in the right minute. TTM spreads the sends out to stay within Discord's limits. With [Readable push notifications](/docs/configuration/#readable-push-notifications) off it still arrives, without the plain text that makes phone previews readable.

A direct message can be refused, and then TTM waits some hours before it tries that person again: see [Reminders by direct message](/docs/known-limits/#reminders-by-direct-message).

### Don't want reminders by direct message?

You decide, from Discord's own settings:

- **Keep them, without a ping.** Right-click your conversation with TTM and choose *Mute*. The reminders still arrive, silently.
- **Stop them.** Click the server name, then *Privacy Settings*, and turn off *Direct Messages*. This stops direct messages from every member of that server, not only TTM.
- **Hand the task over.** Ask whoever manages the list to give the task to someone else, with **Owner** <img class="inline-ic" src="/icons/owner.png" alt="" />.

Muting the server is not enough: it silences the server's channels, not your direct messages.

A role is notified only if it can be mentioned. When that is the case, and what happens with @everyone or a deleted role: see [Reminders to a role](/docs/known-limits/#reminders-to-a-role).

## Repeating reminders

By default every reminder is a **single event** — one ping, nothing else to decide. Repetitions are a **Premium** feature, like webhooks: on the Free plan every reminder is single (see [What Premium unlocks](/docs/premium/); during the [beta](/docs/beta/) everything is unlocked). On a plan that includes them they are still an opt-in: a server manager enables **Recurring reminders** in [/config app](/docs/configuration/#recurring-reminders). Until then, only a reminder that is already recurring shows the repetition menus.

<div class="callout"><div class="callout-t">Recurring reminders you already have keep working</div>A reminder that was already recurring, for example one created during the beta, keeps firing on the Free plan. It also keeps firing on Premium while the toggle is off. It stays editable: you can change its date, move it to another task or lower the number of times it arrives. What you can't do is raise that number, or add new recurring reminders.<br><br>Cloning or importing a list creates new reminders. So where new recurring reminders can't be created, on the Free plan or with the toggle off, a recurring reminder is refused there. Clone without reminders, or set its repetitions to <code>0</code>.</div>

### The repetition fields

There are three menus, in the channel and in the Activity, so there is nothing to type and no format to get wrong.

| Menu | Meaning | Choices |
| :--- | :--- | :--- |
| **How many times, in total** | How many pings the reminder sends, the **first included**. **1 time** is a single reminder. The most is 50 on Premium. Where recurring reminders can't grow, on the Free plan or with the toggle off, the menu stops at the number the reminder already has, and the form says why. | 1 to 10, then 15 to 50 in steps of 5 |
| **Every** | The time between two pings, in the unit of the next menu. It doesn't count with **1 time**. | 1 to 10, 12, 14, then 15 to 50 in steps of 5, 60 and 90 |
| **Unit** | Minutes, hours or days. There are no weeks or months: a week is 7 days. | minutes, hours, days |

Going from one time to more, **Every** starts from 1 day. The menus always offer the values the reminder already has, even when they aren't in the list: a reminder written in the text of a list can run 37 times, or every 48 hours. One that already runs more than 50 times keeps its number. An interval that mixes units, such as `1d12h` from the text, shows in its smallest unit, 36 hours: leave **Every** and **Unit** as they are and it stays `1d12h`.

<div class="callout"><div class="callout-t">Daylight saving — the detail that matters</div><strong>Days</strong> keep the <strong>same wall-clock time</strong> across a DST change (e.g. always 09:00). <strong>Hours</strong> are <strong>exact</strong>: every 24 hours can shift by an hour after the clocks change. Pick the one that matches what you mean. In the text of a list it's the difference between <code>1d</code> and <code>24h</code>.</div>

## Reading a reminder on the task

On the task line the reminder always shows the date of the **first** ping, rendered by Discord in each reader's local time. A repeating reminder adds two compact values:

`↻` interval · `×` times in total

So `↻1h ×4` means four pings, one an hour, the first included. A single event shows **just the timestamp** — there is no badge, because there is nothing to repeat.

TTM never removes a reminder by itself. A reminder whose alerts are all **in the past** stays on its task, as a record. It sends nothing more, and it doesn't count among the reminders waiting. To set it again, choose a new date: until then, Save stays off.

In the text of a list, the same reminder is a timestamp and a triplet: see [Reminders in the text](/docs/writing-a-list/#reminders-in-the-text).

## Common errors

Several of these come from the channel's **When** form, where you type the date, the time and the zone. In the Activity you pick them from menus, so those can't go wrong there.

| Message | What to fix |
| :--- | :--- |
| *Invalid reminder* | The start must be at least 5 minutes in the future. |
| *The reminder to work must be created on a task to be performed* | Pick a task that isn't ticked yet: a completed task can't get a reminder. |
| *The date does not exist* | Check day, month and year together (e.g. 31 February). |
| *Invalid time* | Use the 24-hour format `HH:mm`, e.g. `15:30`. |
| *Over the plan* | On the Free plan recurring reminders are Premium: a reminder that was already recurring can keep the number of times it arrives or go lower, not higher. The menu offers only what is allowed, so you see this if the plan changed while the form was open: open the repetitions again. |
| *Over what is allowed* | Recurring reminders are turned off on this server: a reminder that was already recurring can keep the number of times it arrives or go lower. You see this if they were turned off while the form was open. An admin can turn them on in `/config app`. |
| *Incorrect time zone* | The name doesn't match an official zone — copy it from the time zone map. |

A reminder didn't arrive, or something else went wrong? See the [FAQ](/docs/troubleshooting/#reminders).

<div class="howto" id="how-to-do-it"><div class="howto-t">How to do it</div><div class="howto-grid"><a class="howto-go is-channel" href="/docs/channel-tasks/#reminder"><span class="howto-k"><img class="place-ic" src="/icons/posto-canale.svg" alt="" />In the channel</span><span class="howto-d">Reminder, in the second row under the list: the When form and the summary card.</span></a><a class="howto-go is-activity" href="/docs/activity-list/#reminder"><span class="howto-k"><img class="place-ic" src="/icons/activity.png" alt="" />In the Activity</span><span class="howto-d">Reminder, in the panel of a task: date, time, time zone and repetitions together.</span></a></div></div>
