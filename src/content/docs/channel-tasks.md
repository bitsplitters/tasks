---
title: Editing a task in the channel
description: The second row of buttons under the list — Content, Owner, Tag, Reminder and Webhook — with their forms and menus.
group: In the channel
place: channel
order: 2
---

The second row under the list acts on **one task at a time**: its text, its owner, its tags, its reminder and its webhook. This page shows where to click. What each feature does, and its rules: [Owners and tags](/docs/owners-and-tags/), [Reminders](/docs/reminders/), [Webhooks](/docs/webhooks/).

## The second row

Each button in the second row is a **three-state switch**. Click it to cycle through the same colors Discord uses for its buttons:

- <span class="c-grey">Grey</span> — off.
- <span class="c-blue">Blue</span> — active in <span class="c-blue">edit</span> mode.
- <span class="c-red">Red</span> — active in <span class="c-red">delete</span> mode.

The workflow is always the same: **turn a button blue or red, then pick the task** in the [check selector](/docs/the-task-list/#the-check-selector). TTM applies the action to that task. While a button is blue or red, the selector says what will happen, for example *Edit task* or *Delete task*; with every button off, it says *Tick a task*: pick a task there to tick or untick it.

Until you've picked a task this way once, turning **Content** or **Reminder** blue or red sends you a message only you can see: it says which task to pick in the selector above the buttons and what pressing the button again does, with a button that takes you back to the list. Once you've picked a task with a second-row button on, the message stops, on every server.

| Button | <span class="c-blue">Blue (edit)</span> | <span class="c-red">Red (delete)</span> |
| :--- | :--- | :--- |
| [**Content**](#content) <img class="inline-ic" src="/icons/task.png" alt="" /> | Change the task text, in a form. | Delete the task. |
| [**Owner**](#owner) <img class="inline-ic" src="/icons/owner.png" alt="" /> | Set or change the owner: one person, one role, or several people. | Remove the owner, and its reminder too. |
| [**Tag**](#tag) <img class="inline-ic" src="/icons/tag.png" alt="" /> | Set the users and roles to notify, several at once. | Remove every tag on the task. |
| [**Reminder**](#reminder) <img class="inline-ic" src="/icons/alertW.png" alt="" /> | Add or edit a reminder. | Remove the reminder. |
| [**Webhook**](#webhook) <img class="inline-ic" src="/icons/api.png" alt="" /> | Link a webhook to the task. | Remove the webhook from the task. |

With **Owner**, **Tag**, **Reminder** or **Webhook** red, the selector lists only the tasks that have something to remove: an owner, tags, a reminder or a webhook. A task made only of tags isn't listed, since without them it would have no text. If no task has anything to remove, the selector is off and says so, for example *No owner to remove*, and you get a note on how to add one.

After you use **Owner**, **Tag** or **Reminder**, the button goes back to grey, or stays on for the next task: your server decides, with **Keep the state after a selection** in the **Behavior** menu of [/config app](/docs/configuration/#keep-the-state-after-a-selection). Keeping the state changes what Owner and Tag can do: see [Owner](#owner) and [Tag](#tag).

## Content

**Blue** opens a form with the task's text, without its tags: they stay on the task, and the **Tag** button changes them. Line breaks become spaces. Owners, tags, reminders and webhooks typed there are removed, and the bot tells you what it removed: they have their own buttons. A name TTM doesn't know stays text, but at the start, followed by a colon, it is an owner: the text isn't saved, and the message sends you to **Owner**. A text left empty, one with a reminder in months, or one that would make the list too long isn't saved either. When you change the text, its tags go back at the end, where **Tag** puts them too. Channels show by name, as in **Bulk update**. Channels, links and emoji: see [Writing a list](/docs/writing-a-list/).

While the form is open, the list is locked for the others. Saving unlocks it; the ✕ doesn't: see [When the list is locked](/docs/the-task-list/#when-the-list-is-locked).

**Red** deletes the task. Deleting a group with subtasks asks you first. Its subtasks stay in place: they join the group above, or become tasks if there is none. You can't delete the last task: use **Delete list** or **Seal list** in [More](/docs/the-task-list/#whats-inside-more).

## Owner

**Blue** shows a menu under the buttons, labelled *Pick a task in the menu above to take it, or choose who gets it*.

**To take a task**, click **Owner** until it turns blue, then pick the task in the check selector without choosing anyone: it becomes yours, and the channel shows who took it. A task that is already yours, or that someone else owns, stays as it is, and TTM tells you why. To take a task from someone else, choose yourself in the menu, confirm the selection, then pick the task: replacing an owner takes an explicit choice.

**To give a task to someone**, pick the owner in the menu, confirm the selection, then pick the task. To give a task to several people:

1. Click **Owner** until it turns blue.
2. Pick the people.
3. Confirm the selection: tap **Save** on mobile, or click outside the menu on desktop (see [Confirming a selection](#confirming-a-selection--desktop-vs-mobile)).
4. Pick the task in the check selector.
5. TTM creates the role (TTM1, TTM2…) and gives it to them.

**Whoever gets the task hears about it.** The notification in the channel mentions the new owner, so Discord notifies them: the person, or everyone in the role. When you take a task yourself, nobody is mentioned, because you already know. With [Notification mode](/docs/configuration/#notification-mode) set to *Disabled*, no notification is posted, as for every other action.

What an owner can be, and the roles TTM creates: [Owners and tags](/docs/owners-and-tags/#owner-a-person-a-role-or-several-people).

With **Keep the state after a selection** on, **Owner** stays blue after you take a task, and the menu stays empty: pick the next task to take it too. A task someone else owns loads its owner into the menu instead. For a role TTM created, the menu shows the people it gave the role to. Every change you confirm applies to that task at once. If you empty the menu, the owner is removed, and its reminder too, as in red mode. To go back to taking tasks, click **Owner** until it's blue again.

**Red** removes the owner, and its reminder too: nobody is left to receive it. If the reminder hasn't fired yet, TTM asks you to confirm first.

## Tag

How **Tag** behaves depends on **Keep the state after a selection**, in the **Behavior** menu of [/config app](/docs/configuration/#keep-the-state-after-a-selection). With it off (the default), tagging always **overwrites**. With it on, you also get a second mode, **live editing**.

<div class="callout"><div class="callout-t">In one line</div>With <strong>Keep the state after a selection</strong> off (the default), tagging always overwrites, and you must pick people first. With it on, pick people first to <em>overwrite</em> (assign), or pick the task first to <em>edit its tags live</em>.</div>

### With the state reset — the default

The button resets after every action, and Tag has one behavior: it **always overwrites**. Turn Tag blue, choose up to 25 users or roles in the menu that appears under the buttons, then pick the task.

For example, you choose *Anna* and *@Devs*. The task is now tagged Anna and @Devs, and nothing else. Your choice **replaces** the whole set: it doesn't add to it. Anyone tagged before that you didn't pick again is removed.

You must pick people **before** the task. If you pick a task with the menu empty, TTM shows an error: select at least one tag first.

### With the state kept — two modes

Now the button stays active after each action. What Tag does depends on one question: **did you pick people before the task?**

- **People first** means **assign**.
- **Task first**, with the menu still empty, means **live editing**.

**Assign — pick people, then the task.** It works like the overwrite above: you choose the users or roles, you pick the task, and its tags become exactly your choice. The button stays active, so your picks stay in the menu too. You can apply the same set to the next task, and the next, without choosing again.

**Live editing — pick the task, menu empty.** Turn Tag blue and pick the task you want to re-tag, without choosing anyone. This is not a mistake: the task's current tags load into the menu, already ticked. Now you edit that task directly:

- each time you close the menu, the task updates at once;
- untick someone and they leave the task; tick someone and they join it;
- there is no confirmation step, and nothing is overwritten: you adjust the existing set;
- untick everyone to remove all tags.

If you pick a different task, the editing moves there. Turn Tag off (grey) to finish: the next activation starts fresh.

**Red** removes every tag on the task.

### Confirming a selection — desktop vs mobile

The **Tag** and **Owner** menus let you pick several at once. These multi-select menus **don't apply a choice as soon as you tick it**: they wait for you to **confirm** the whole selection. Single-choice menus, like the check selector, apply as soon as you pick. How you confirm depends on the device:

- **On mobile**, a **Save** button appears under the open menu. Tap it to apply your picks.
- **On desktop**, there is **no Save button**. **Click anywhere outside the menu** to close it: closing the menu applies your selection. If your tags don't seem to apply, this is almost always the reason.

This matters most in live editing of tags or owner: on desktop, each click outside the menu saves one change.

## Reminder

Click **Reminder** <img class="inline-ic" src="/icons/alertW.png" alt="" /> until it turns **blue**. Then pick the task from the check selector: one that isn't ticked yet. TTM opens the **When** form, titled *Set reminder for task …*:

| Field | Format | Notes |
| :--- | :--- | :--- |
| **Day** | a number (1–31) | pre-filled |
| **Month** | a dropdown, in your language | no `dd/mm` ambiguity to worry about |
| **Year** | a number | pre-filled |
| **Time** | `HH:mm`, 24-hour | e.g. `15:30` |
| **Time zone** | an official zone name | pre-filled with *your* zone (until you change it, the one of your Discord language, or the server's) |

Everything arrives pre-filled with **ten minutes from now**. Submit it, and the task shows the scheduled time. While the form is open, the list is locked for the others. Who gets the reminder, and the time zone: see [Reminders](/docs/reminders/#the-rules).

### The summary card

With [recurring reminders](/docs/reminders/#repeating-reminders) on, submitting **When** doesn't save yet. TTM shows you a private summary card with the date it understood, a **Recurrence** line and four buttons. The line says *none* for a single reminder, or shows the recurrence badge:

| Button | What it does |
| :--- | :--- |
| **Save** | Store the reminder exactly as the card shows it. When you edit an existing reminder, it turns on once you change something. |
| **Edit date** | Reopen **When**, pre-filled with the current values. |
| **Edit recurrence** | Open the repetition form, with its three menus: see [The repetition fields](/docs/reminders/#the-repetition-fields). For a single reminder it opens on 2 times, every 1 day. With **1 time** the reminder stays single. |
| **Cancel** | Drop the whole thing — the list is unlocked. |

<div class="callout"><div class="callout-t">Nothing is saved until you press Save</div>Editing the date or the recurrence only updates the card. You can change them as often as you need, and <strong>Cancel</strong> really cancels.</div>

With recurring reminders off, or on the Free plan, the card appears only when you edit a reminder that is **already recurring**. That way the reminder doesn't lose its repetitions: **Edit recurrence** lets you keep the number of times it arrives or lower it, never go above the number it already has, and the form says why. A new reminder goes straight through **When** and is saved as a single event.

### Editing or removing

- **Edit** — click **Reminder** to blue, pick the task, and set the new values. You land straight on the summary card if the task already has a *repeating* reminder, or for any reminder with recurring reminders on. The card shows the current date and badge, so you can change only what you need. Otherwise **When** opens, pre-filled with the current date. Submitting the same date and recurrence the reminder already has changes nothing: TTM tells you, and sends no notification.
- **Remove** — click **Reminder** until it turns **red** (delete mode), then pick the task. The reminder is removed.

<div class="callout"><div class="callout-t">Closing a form is not cancelling</div>Discord never tells a bot that you closed a form with the ✕, so TTM cannot know: the list stays locked. Use <strong>Cancel</strong> on the <a href="#the-summary-card">summary card</a> when it's there. If you closed a form the hard way, open <strong>More</strong> under the list and press <strong>Unlock list</strong> <img class="inline-ic" src="/icons/unlock.png" alt="" />.</div>

## Webhook

Click **Webhook** <img class="inline-ic" src="/icons/api.png" alt="" /> until it turns **blue**, pick the webhook from the selector that appears, then pick the task. From then on, completing or reopening that task fires the call. Click **Webhook** until it turns **red** and pick the task to remove the link.

The webhooks themselves are created with `/config webhook`, by whoever manages the server: see [Webhooks](/docs/webhooks/). The **Content** form doesn't show the webhook of a task, and removes one you type there, telling you. In **Bulk update** it shows as a token: see [Webhooks in the text](/docs/writing-a-list/#webhooks-in-the-text).

## Where to go next

- [The list in the channel](/docs/the-task-list/) — the check selector, the first row and More.
- [Working on a list in the Activity](/docs/activity-list/) — the same five buttons, in the panel of a task.
- [FAQ](/docs/troubleshooting/#in-the-channel) — quick answers to the most common problems.
