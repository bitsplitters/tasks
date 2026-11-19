---
title: The Activity
description: Open a list in a window inside Discord, where your team works on it together and sees every change as it happens.
group: In the Activity
place: activity
order: 1
---

Try Activity mode: smoother and free from the limits of text channels, ideal for longer or collaborative work sessions.

The **Activity** opens a list in a window inside Discord, on desktop and on mobile. Several people work on it at once and see every change live. When the last one leaves, the list goes back to its channel with a summary of what changed. It speaks your Discord language if TTM does, English otherwise.

This page is about getting in and out. How you work on the list once inside: [Working on a list in the Activity](/docs/activity-list/).

## Four ways in

- **From a list in a channel** — press <span class="dchip is-blue" role="img" aria-label="Activity button, blue"><img src="/icons/activity.png" alt="" /></span>, the first button under the list. That list opens. See [Open a list in the Activity](#open-a-list-in-the-activity).
- **From the message bar** — in a text channel, open Discord's **App Launcher**, pick Team Tasks Manager, then **Launch**. See [The home of the channel](#the-home-of-the-channel).
- **From a voice call** — press the call's Activities button and pick Team Tasks Manager. See [The home of the channel](#the-home-of-the-channel).
- **From someone already inside** — press **Join the Activity** under the list, Discord's **Join** on their profile, or the invite they send you. See [Join the others](#join-the-others).

The App Launcher and the voice call open the home of the channel, with all its lists: you pick one there, or create a new one.

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

To bring someone in, press **Invite**, at the top right of the home and of every list, next to who is there. Discord opens its own window, where you pick friends or a channel to send the invite to. It needs Discord's *Create Invite* permission on the channel: without it, TTM tells you so on the button, and how an administrator grants it.

## Your status on Discord

While you're in the Activity, your Discord profile shows Team Tasks Manager with *Planning tasks with the team*, in your language. It says nothing about the list, the server or the channel. Discord asks you first, in the window where you let TTM know who you are. If you say no, the Activity opens all the same, without that line.

## The home of the channel

When you start from the **App Launcher** or from a **voice call** (see [Four ways in](#four-ways-in)), TTM opens the home of the channel, with the channel's name as its title. Threads, forum posts, announcement channels and stages are left out. The home has three parts:

- **New list**, under the title — a title and the tasks, written as in [Writing a list](/docs/writing-a-list/), created here and already in the Activity. The summary that follows it back to the channel starts with its creation, and can mention the owners of its tasks: see [When a list is created](/docs/configuration/#when-a-list-is-created). Files are imported with `/create-list`, in the channel.
- **Now in the Activity** — who is on each list, and who is editing. Tap one to join.
- **In the channel** — the other lists, newest first. Tap one to read it, then **Bring into the Activity**, which waits while someone edits it in the channel.

The <span class="dchip is-grey" role="img" aria-label="Home button, grey"><img src="/icons/home.png" alt="" /></span> **Home** button, at the top left of every list, takes you back there.

## Back to the channel

**Exit** brings the list back when you are alone. With others, you choose:

- **Leave on your own** — the others go on;
- **Bring back to the channel for everyone** — the Activity closes for all.

The list also goes back 30 seconds after the last person leaves, closing the window or locking the phone included. **Exit** and **Home** do it at once.

Then a **summary** follows, one line per change with who made it: in the channel as your [Notification mode](/docs/configuration/#notification-mode) says, and in full in the thread of the [activity timeline](/docs/configuration/#history-tracking). It uses the language of whoever brought the list into the Activity.

## What stays in the channel

**Clone**, **Download**, **Seal**, **Delete**, **Unlock** and the import from a file: see [List actions](/docs/list-actions/). In the Activity a list unlocks by itself.

An admin can still **Delete**, **Seal** or **Regenerate** a list in the Activity from [`/config lists`](/docs/config-lists/). Delete removes it for the people inside too; Seal brings it back to the channel first.

## When the database isn't responding

No list enters the Activity, and the home hides **New list**. A list already in it turns read-only until the database is back, and a strip offers to bring it back to the channel.

## Your settings

The gear at the top right sets **Text size**, **Theme** and **Spaced rows**, more room to tap on a phone. They apply only to you, on that device.

## Where to go next

- [Working on a list in the Activity](/docs/activity-list/) — the boxes, the panel of a task, and who is editing what.
- [The list in the channel](/docs/the-task-list/) — every button under the list, in the channel.
- [What Premium unlocks](/docs/premium/) — the places on your plan, and what the paid plan lifts.
- [FAQ](/docs/troubleshooting/#in-the-activity) — quick answers to the most common problems.
