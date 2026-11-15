---
title: The Activity
description: Open a list in a window inside Discord, where your team works on it together and sees every change as it happens.
group: In the Activity
place: activity
order: 1
---

The **Activity** opens a list in a window inside Discord, on desktop and on mobile. Several people work on it at once and see every change live. When the last one leaves, the list goes back to its channel with a summary of what changed. It speaks your Discord language if TTM does, English otherwise.

This page is about getting in and out. How you work on the list once inside: [Working on a list in the Activity](/docs/activity-list/).

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
- **New list** — a title and the tasks, written as in [Writing a list](/docs/writing-a-list/), created here and already in the Activity. Files are imported with `/create-list`, in the channel.

**Lists**, at the top of every list, takes you back there.

## Back to the channel

**Exit** brings the list back when you are alone. With others, you choose:

- **Leave on your own** — the others go on;
- **Bring back to the channel for everyone** — the Activity closes for all.

The list also goes back 30 seconds after the last person leaves, closing the window or locking the phone included. **Exit** and **Lists** do it at once.

Then a **summary** follows, one line per change with who made it: in the channel as your [Notification mode](/docs/configuration/#notification-mode) says, and in full in the thread of the [activity timeline](/docs/configuration/#history-tracking). It uses the language of whoever brought the list into the Activity.

## What stays in the channel

**Clone**, **Download**, **Seal**, **Delete**, **Unlock** and the import from a file: see [List actions](/docs/list-actions/). In the Activity a list unlocks by itself.

An admin can still **Delete**, **Seal** or **Regenerate** a list in the Activity from [`/config lists`](/docs/config-lists/). Delete removes it for the people inside too; Seal brings it back to the channel first.

## When the database isn't responding

No list enters the Activity, and the lists page hides **New list**. A list already in it turns read-only until the database is back, and a strip offers to bring it back to the channel.

## Your settings

The gear at the top right sets **Text size**, **Theme** and **Spaced rows**, more room to tap on a phone. They apply only to you, on that device.

## Where to go next

- [Working on a list in the Activity](/docs/activity-list/) — the boxes, the panel of a task, and who is editing what.
- [The list in the channel](/docs/the-task-list/) — every button under the list, in the channel.
- [What Premium unlocks](/docs/premium/) — the places on your plan, and what the paid plan lifts.
- [Something not working?](/docs/troubleshooting/#in-the-activity) — quick answers to the most common problems.
