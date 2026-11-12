---
title: The Activity
description: Open a list in a window inside Discord, where your team works on it together and sees every change as it happens.
group: Using the bot
order: 3.2
---

The **Activity** opens a list in a window inside Discord, on desktop and on mobile. Several people work on it at once, and everyone sees each change as it happens. When the last person leaves, the list goes back to its channel, with a summary of what changed.

While a list is in the Activity, its message stays in the channel, but the list can't be changed there.

## Open a list in the Activity

Press <span class="dchip is-blue" role="img" aria-label="Activity button, blue"><img src="/icons/activity.png" alt="" /></span> under the list: it is the first button of the [first row](/docs/the-task-list/#row-1--acts-on-the-whole-list). TTM answers *Opening **Groceries** in the Activity…*, in a message only you can see, and the Activity opens.

If the window doesn't connect within 30 seconds, that message becomes a warning: your Discord app may not support the Activity. The list then stays in the channel, as before.

The button is there in text channels and in the chat of voice channels. **Clone list**, which used to have its place, is now in the **More** panel: see [What's inside More](/docs/the-task-list/#whats-inside-more).

A list posted before the Activity arrived gets the button the first time it changes, for example when you tick a task.

### When the list doesn't open

The Activity button follows the same rules as the other buttons of the list, such as the [permissions synced](/docs/configuration/#sync-permissions) in `/config app`. On top of those, TTM refuses in a message only you can see:

- **without Discord's *Use Activities* permission** on the channel. The message tells you how to fix it: a server administrator enables *Use Activities* for you in the channel's *Permissions*;
- **while the database isn't responding.** The Activity opens once it is back, and meanwhile the list works in the channel;
- **while someone is editing the list** in the channel. The button is off until the list is unlocked: see [When the list is locked](/docs/the-task-list/#when-the-list-is-locked);
- **when your plan has no free place** for the list: see [How the three places work](/docs/premium/#how-the-three-places-work).

## Join the others

While a list is in the Activity, its message in the channel has a single button: <span class="dchip is-blue" role="img" aria-label="Join the Activity button, blue"><img src="/icons/activity.png" alt="" /></span> **Join the Activity**. Press it to work with whoever is there. Discord's own **Join**, on the profile of someone in the Activity, works too.

The last line of the list says <img class="inline-ic" src="/icons/activity_blue.png" alt="" /> *This list is being worked on in the Activity*, in place of the Tips. Meanwhile nothing changes the list from the channel. A form or a panel opened before stops, with a message that says how to join.

## The lists of the channel

The Activity also opens from Discord itself, without pressing anything under a list:

- in a text channel, from Discord's **App Launcher** in the message bar: pick Team Tasks Manager, then **Launch**;
- in a voice channel, from the Activities button of the call.

You land on the **lists of the channel**:

- **Now in the Activity** — the lists people are working on, with who is there and who is editing. Tap one to join.
- **In the channel** — the other lists, the most recent first, with the tasks done out of the total. Tap one to read it as it is, then press **Bring into the Activity** to work on it here. It goes through the same checks as the Activity button.
- **New list** — write a title and the tasks, with the same syntax as [Bulk update](/docs/the-task-list/#row-1--acts-on-the-whole-list). The list is created in this channel, already in the Activity. Files can't be imported here: use `/create-list` in the channel.

A list being edited in the channel shows who is editing it. You can read it, and **Bring into the Activity** turns on when the edit ends.

**Lists**, at the top of every list, takes you back to this page. If you were the last one on that list, it goes back to the channel 30 seconds later, unless someone returns.

Launch doesn't open in threads, forum posts, announcement channels or stages: lists live in text channels and in the chat of voice channels.

## Working on the list

The list looks as it does in the channel, and the same rules apply: owners, the server's settings and your plan's limits.

- **Tick a task by tapping its box.** A group carries its subtasks along, and a task with an owner follows the same rule as in the channel: see [The check selector](/docs/the-task-list/#the-check-selector).
- **Tap the text of a task** to open its panel, with the five buttons of the channel's [second row](/docs/the-task-list/#row-2--acts-on-a-single-task): Content, Owner, Tag, Reminder and Webhook. One tap turns a button blue, to change; a second turns it red, to delete. Nothing changes until you tap **Save**, and nothing is deleted until you tap **Delete**.

The panel stays open after you save, so you can set an owner and then a reminder. Close it with **Close**, the ✕, or a tap outside it.

In the panel:

- **Owner** and **Tag** search people and roles by name, and list first whoever is in the Activity;
- **Reminder** has the date, the time and the time zone in one place, and suggests your device's time zone. Recurring reminders work as in the channel: see [Repeating reminders](/docs/reminders/#repeating-reminders). On a task without an owner, saving a reminder makes you its owner;
- **Webhook** lists the server's webhooks by name, and never shows their address. They are created in the channel with [/config webhook](/docs/webhooks/).

### The first row

| Button | Function | What it does |
| :---: | :--- | :--- |
| <span class="dchip is-blue" role="img" aria-label="Guide button, blue"><img src="/icons/doc.png" alt="" /></span> | **Guide** | A short guide to the Activity, in a few pages. |
| <span class="dchip is-blue" role="img" aria-label="Edit the list button, blue"><img src="/icons/edit.png" alt="" /></span> | **Edit the list** | The title and the whole list as text, as in **Bulk update**. The list is locked for the others until you save or cancel. |
| <span class="dchip is-blue" role="img" aria-label="Clean the list button, blue"><img src="/icons/clean.png" alt="" /></span> | **Clean the list** | Remove every completed task, after a confirmation. The removed tasks are listed in the summary at the end. |
| <span class="dchip is-blue" role="img" aria-label="Reopen all button, blue"><img src="/icons/reopen.png" alt="" /></span> | **Reopen all** | Bring every completed task back to to-do, after a confirmation. **New date** moves their reminders too, as in the channel. |
| <span class="dchip is-grey" role="img" aria-label="Exit button, grey"><img src="/icons/back.png" alt="" /></span> | **Exit** | Leave the Activity, and bring the list back to the channel if you are the last one: see [Back to the channel](#back-to-the-channel). |

## Who is editing what

Two people never change the same thing at the same time:

- **A task is locked for the others** from the first change you make in its panel. They see its box off, and a tap tells them who is editing it. Every other task stays free.
- **While a task is being changed**, Edit the list, Clean the list and Reopen all wait, for everyone.
- **Edit the list locks the whole list** as soon as it opens. The last line of the list says who is editing.

An edit left alone closes by itself. After 20 seconds without a touch, the page asks *Still there? Editing closes in 10 seconds.* One touch is enough to stay. At 30 seconds the edit closes, and what you hadn't saved is lost.

Reading has no time limit: you can keep a list open as long as you like.

Rarely, someone changes the same thing just before you save, for example around an update of TTM. Then the page offers three choices:

- **Overwrite** — save your change. The update made in the meantime is lost.
- **Reload** — open it again with the update. Your text stays below, to copy from.
- **Cancel** — keep the update, and save nothing.

## Back to the channel

**Exit** brings the list back to the channel when you are alone. With others, you choose:

- **Leave alone** — you leave, and the others go on;
- **Bring the list back to the channel** — the Activity closes for everyone. The others see who brought the list back.

The list also goes back by itself when the last person leaves, and nobody returns within 30 seconds. Closing the window counts as leaving, and so does a phone that stays locked for 30 seconds.

When the list is back, its message gets the usual buttons again. A **summary** of the session follows: one line per change, in order, with who made it.

- In the channel, the summary follows your server's [Notification mode](/docs/configuration/#notification-mode). With the default, it shows the last change and how many more there were.
- With the [activity timeline](/docs/configuration/#history-tracking) on, its thread gets every change.

The summary is in the language of the person who brought the list into the Activity. If nothing changed, there is no summary.

## What stays in the channel

**Clone**, **Download**, **Seal**, **Delete**, **Unlock** and the import from a file are only in the channel. In the Activity a list unlocks by itself, when an edit is saved, closed or left alone.

While a list is in the Activity, an admin can still handle it from [`/config lists`](/docs/config-lists/), where its row says *in the Activity*:

- **Delete** removes it for everyone, the people in the Activity included. They can keep reading it, and the page says who deleted it;
- **Seal** first brings the list back to the channel, with its summary, then seals it;
- **Regenerate** posts it again, and the list stays in the Activity.

Before Delete and Seal, the confirmation warns that someone is working on the list.

## When the database isn't responding

- The Activity button refuses to open a list, and the list keeps working in the channel.
- A list already in the Activity becomes read-only, and a strip says so. You can bring it back to the channel from the strip, or wait: editing comes back by itself.
- The lists of the channel show only the lists already in the Activity, without **New list**. The others appear when the database is back.

## Languages

The Activity speaks your Discord language, if TTM speaks it too, and English otherwise. The list's message and its summary, in the channel and in the thread, use the language of the person who brought the list into the Activity.

## Where to go next

- [The task list panel](/docs/the-task-list/) — every button under the list, in the channel.
- [Owners and tags](/docs/owners-and-tags/) — who a task belongs to, and who it mentions.
- [Reminders](/docs/reminders/) — the reminder of a task, field by field.
- [What Premium unlocks](/docs/premium/) — the places on your plan, and what the paid plan lifts.
