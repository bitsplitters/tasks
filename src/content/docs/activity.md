---
title: The Activity
description: Open a list in a window inside Discord, where your team works on it together and sees every change as it happens.
group: Using the bot
order: 3.2
---

The **Activity** opens a list in a window inside Discord, on desktop and on mobile. Several people work on it at once and see every change live. When the last one leaves, the list goes back to its channel with a summary of what changed. It speaks your Discord language if TTM does, English otherwise.

## Open a list in the Activity

Press <span class="dchip is-blue" role="img" aria-label="Activity button, blue"><img src="/icons/activity.png" alt="" /></span>, the first button of the [first row](/docs/the-task-list/#row-1--acts-on-the-whole-list), in a text channel or in the chat of a voice channel. **Clone list**, which sat there before, is now in [More](/docs/the-task-list/#whats-inside-more). An older list gets the button the first time it changes.

If the window doesn't connect within 30 seconds, TTM warns you and the list stays in the channel.

### When the list doesn't open

The button follows the rules of the rest of the list, such as the [permissions synced](/docs/configuration/#sync-permissions) in `/config app`. TTM also refuses, in a message only you can see:

- without Discord's *Use Activities* permission on the channel, which an administrator grants in the channel's *Permissions*;
- while the database isn't responding;
- while someone is editing the list in the channel: see [When the list is locked](/docs/the-task-list/#when-the-list-is-locked);
- when your plan has no free place: see [How the three places work](/docs/premium/#how-the-three-places-work).

## Join the others

While a list is in the Activity, its message keeps a single button, <span class="dchip is-blue" role="img" aria-label="Join the Activity button, blue"><img src="/icons/activity.png" alt="" /></span> **Join the Activity**, and the last line says <img class="inline-ic" src="/icons/activity_blue.png" alt="" /> *This list is being worked on in the Activity*. Discord's **Join**, on the profile of someone inside, works too. Nothing changes the list from the channel meanwhile.

## The lists of the channel

You can also start from Discord: the **App Launcher** in a text channel's message bar (Team Tasks Manager, then **Launch**), or the Activities button of a voice call. Threads, forum posts, announcement channels and stages are left out. You land on the lists of the channel:

- **Now in the Activity** — who is on each list, and who is editing. Tap one to join.
- **In the channel** — the other lists, newest first. Tap one to read it, then **Bring into the Activity**, which waits while someone edits it in the channel.
- **New list** — a title and the tasks, written as in [Bulk update](/docs/the-task-list/#row-1--acts-on-the-whole-list), created here and already in the Activity. Files are imported with `/create-list`, in the channel.

**Lists**, at the top of every list, takes you back there.

## Working on the list

The rules are those of the channel: owners, server settings, plan limits.

- **Tap a box** to tick a task, as with [the check selector](/docs/the-task-list/#the-check-selector).
- **Tap a task's text** to open its panel, with the [second row](/docs/the-task-list/#row-2--acts-on-a-single-task): Content, Owner, Tag, Reminder and Webhook. One tap turns a button blue, to change; a second, red, to delete. Nothing happens until **Save** or **Delete**, and the panel stays open for the next change.

**Owner** and **Tag** search by name and show first who is in the Activity. **Reminder** suggests your device's time zone, and makes you the owner of a task without one. **Webhook** shows the server's webhooks by name only.

| Button | Function | What it does |
| :---: | :--- | :--- |
| <span class="dchip is-blue" role="img" aria-label="Guide button, blue"><img src="/icons/doc.png" alt="" /></span> | **Guide** | A short guide to the Activity. |
| <span class="dchip is-blue" role="img" aria-label="Edit the list button, blue"><img src="/icons/edit.png" alt="" /></span> | **Edit the list** | The whole list as text, as in **Bulk update**. |
| <span class="dchip is-blue" role="img" aria-label="Clean the list button, blue"><img src="/icons/clean.png" alt="" /></span> | **Clean the list** | Removes the completed tasks. |
| <span class="dchip is-blue" role="img" aria-label="Reopen all button, blue"><img src="/icons/reopen.png" alt="" /></span> | **Reopen all** | Brings the completed tasks back to to-do; **New date** moves their reminders. |
| <span class="dchip is-grey" role="img" aria-label="Exit button, grey"><img src="/icons/back.png" alt="" /></span> | **Exit** | Leaves the Activity: see [Back to the channel](#back-to-the-channel). |

## Who is editing what

Two people never change the same thing at once. Your first change to a task locks it for the others, and a tap on its box tells them who is editing; meanwhile Edit, Clean and Reopen all wait. **Edit the list** locks the whole list.

An edit left alone for 20 seconds asks *Still there?*; at 30 it closes, and what wasn't saved is lost. Reading has no time limit.

If someone changes the same thing just before you save, you choose: **Overwrite**, **Reload** with your text kept below, or **Cancel**.

## Back to the channel

**Exit** brings the list back when you are alone. With others, you choose:

- **Leave on your own** — the others go on;
- **Bring back to the channel for everyone** — the Activity closes for all.

The list also goes back 30 seconds after the last person leaves, closing the window or locking the phone included. **Exit** and **Lists** do it at once.

Then a **summary** follows, one line per change with who made it: in the channel as your [Notification mode](/docs/configuration/#notification-mode) says, and in full in the thread of the [activity timeline](/docs/configuration/#history-tracking). It uses the language of whoever brought the list into the Activity.

## What stays in the channel

**Clone**, **Download**, **Seal**, **Delete**, **Unlock** and the import from a file. In the Activity a list unlocks by itself.

An admin can still **Delete**, **Seal** or **Regenerate** a list in the Activity from [`/config lists`](/docs/config-lists/). Delete removes it for the people inside too; Seal brings it back to the channel first.

## When the database isn't responding

No list enters the Activity, and the lists page hides **New list**. A list already in it turns read-only until the database is back, and a strip offers to bring it back to the channel.

## Your settings

The gear at the top right sets **Text size**, **Theme** and **Spaced rows**, more room to tap on a phone. They apply only to you, on that device.

## Where to go next

- [The task list panel](/docs/the-task-list/) — every button under the list, in the channel.
- [Owners and tags](/docs/owners-and-tags/) — who a task belongs to, and who it mentions.
- [Reminders](/docs/reminders/) — the reminder of a task, field by field.
- [What Premium unlocks](/docs/premium/) — the places on your plan, and what the paid plan lifts.
