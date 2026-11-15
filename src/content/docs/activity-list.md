---
title: Working on a list in the Activity
description: The boxes, the first row, the panel of a task — Content, Owner, Tag, Reminder and Webhook — and who is editing what.
group: In the Activity
place: activity
order: 2
---

Inside the Activity the list is a page of its own: a box in front of every task, a row of buttons at the top, and a panel for each task. The rules are those of the channel: owners, server settings, plan limits. What each feature does: [Owners and tags](/docs/owners-and-tags/), [Reminders](/docs/reminders/), [Webhooks](/docs/webhooks/), [List actions](/docs/list-actions/).

Under the list, a line helps whoever is new: *Not sure where to start? Tap a box to tick a task, tap its text for the rest.* It follows the server's [Tips](/docs/configuration/#tips), as in the channel.

## The first row

These buttons act on the whole list.

| Button | Function | What it does |
| :---: | :--- | :--- |
| <span class="dchip is-blue" role="img" aria-label="Guide button, blue"><img src="/icons/doc.png" alt="" /></span> | **Guide** | A short guide to the Activity, in five pages. |
| <span class="dchip is-blue" role="img" aria-label="Edit the list button, blue"><img src="/icons/edit.png" alt="" /></span> | **Edit the list** | The title and the whole list as text: see [Edit the list](#edit-the-list). |
| <span class="dchip is-blue" role="img" aria-label="Clean the list button, blue"><img src="/icons/clean.png" alt="" /></span> | **Clean the list** | Removes the completed tasks: see [Clean the list and Reopen all](#clean-the-list-and-reopen-all). |
| <span class="dchip is-blue" role="img" aria-label="Reopen all button, blue"><img src="/icons/reopen.png" alt="" /></span> | **Reopen all** | Brings the completed tasks back to to-do; **New date** moves their reminders. |
| <span class="dchip is-grey" role="img" aria-label="Exit button, grey"><img src="/icons/back.png" alt="" /></span> | **Exit** | Takes the list back to the channel: see [Back to the channel](/docs/activity/#back-to-the-channel). |

Above the row, **Lists** takes you to the [lists of the channel](/docs/activity/#the-lists-of-the-channel), and the gear opens [your settings](/docs/activity/#your-settings). Clone, Download, Seal, Delete and Unlock aren't here: they [stay in the channel](/docs/activity/#what-stays-in-the-channel).

## Tick a task

**Tap the box** in front of a task to tick it, and tap it again to reopen it. A group carries its subtasks along, and it is ticked when all of them are, as in the channel. If the task has a [webhook](#webhook), ticking it fires the call there too.

When a tick is refused, a bubble on the box tells you why: a task with an owner can be ticked only by its owner, and by whoever has *Manage messages* on the channel (see [Who can tick a task](/docs/core-concepts/#who-can-tick-a-task)). On a task someone else is editing, the bubble says who.

## The panel of a task

**Tap the text of a task** to open its panel, titled *Choose what to change in task …*. It has the five buttons of the channel's second row: **Content**, **Owner**, **Tag**, **Reminder** and **Webhook**. Each one cycles through three colors:

- <span class="c-grey">Grey</span> — off.
- <span class="c-blue">Blue</span> — change: the panel shows the fields, and **Save**.
- <span class="c-red">Red</span> — delete: the panel shows **Delete**.

A third tap turns the button grey again. Nothing happens until you tap **Save** or **Delete**. After an action the panel stays on the same task, with the buttons grey, ready for the next change. It closes with **Close**, with a tap outside it, or by itself after 30 seconds without activity.

While the panel is open, the task is locked for the others: see [Who is editing what](#who-is-editing-what).

## Content

**Blue** shows the text of the task, to change it. Owners, tags, reminders and webhooks typed there are removed: they have their own buttons.

**Red** deletes the task. Deleting a group with subtasks asks you first, as in the channel. The last task of a list can't be deleted: a list can't be left empty. To delete the whole list, use the channel.

## Owner

**Blue** shows a search over the people and roles of the server, with whoever is in the Activity first. Tap a name to add it, tap it again to remove it, then **Save**.

- One person or one role is enough on every plan.
- Several people become a role that TTM creates: see [The roles TTM creates](/docs/owners-and-tags/#the-roles-ttm-creates). It needs Premium and the *Manage Roles* permission for TTM; without them **Save** stays off, and the panel says why. Discord lets TTM give a role to ten people every ten seconds, so with more than ten a notice says how long it takes.

**Red** removes the owner, and its reminder too: nobody is left to receive it. If the reminder hasn't fired yet, the panel asks you to confirm first.

## Tag

**Blue** shows the tags the task has now, already chosen. Add and remove people or roles from the search, up to 25, then **Save**: the task gets exactly the set you see. There is no overwrite mode or live editing: you always start from the current tags.

**Red** removes every tag. A task made only of tags keeps them, because without them it would have no text.

## Reminder

**Blue** shows **Date**, **Time** and **Time zone** together, and the repetitions when they apply.

- A **new** reminder starts from ten minutes from now, with **Save** already on.
- An **existing** reminder shows its values. **Save** stays off until you change something.
- **Save** stays off for a date that has passed, or one less than 5 minutes away: *The date has already passed* tells you to choose a new one.

Tap **Time zone** to choose it: search by city, country, a name such as `Europe/Rome` or an offset such as `+5:30`. *Your time zones* lists the ones that matter to you: this device's, the one you chose, the server's. Under the fields, *On this device* shows the same moment in your device's time, when the zone is different. The zone you choose is remembered: see [Your time zone](/docs/reminders/#your-time-zone).

The three repetition menus appear on a plan with [repeating reminders](/docs/reminders/#repeating-reminders) and the toggle on, or when the reminder already repeats: see [The repetition fields](/docs/reminders/#the-repetition-fields).

A ticked task can't get a reminder. On a task without an owner, the panel says that saving makes you its owner.

**Red** removes the reminder.

## Webhook

**Blue** lists the server's webhooks by name, each with when it fires: *on completion*, *on reopening* or *always*. The address never shows. Choose one, then **Save**. A webhook that no longer exists shows on top, marked *no longer exists*, so you can choose another one. If the server has none, the panel says they are created with `/config webhook`: see [Webhooks](/docs/webhooks/).

**Red** removes the webhook from the task.

## Edit the list

**Edit the list** shows the title and every task as text, in the format of [Writing a list](/docs/writing-a-list/): the same text as the channel's **Bulk update**, read by the same rules. Change what you need and save.

The list is locked for the others from the moment it opens until you save or cancel: **Cancel**, the ✕ and a tap outside unlock it. It closes by itself after 30 seconds without activity. If the text can't be saved, the problems show under it: see [When the text can't be saved](/docs/writing-a-list/#when-the-text-cant-be-saved).

## Clean the list and Reopen all

**Clean the list** asks you to confirm first. The summary at the end of the session records how many tasks you removed. With no task completed, or with every task completed, it says so and changes nothing.

**Reopen all** asks you to confirm every time. **New date**, in the same window, moves the reminders of the tasks you reopen. Reopening calls no webhook. What both actions change: [List actions](/docs/list-actions/).

## Who is editing what

Two people never change the same thing at once:

- Your first change to a task locks it for the others. A tap on its box tells them who is editing; the other tasks stay free.
- While someone changes a task, **Edit the list**, **Clean the list** and **Reopen all** wait, and say who they are waiting for.
- **Edit the list** locks the whole list: the boxes come back when it is done.

An edit left alone for 20 seconds asks *Still there? Editing closes in 10 seconds*; at 30 it closes, and what wasn't saved is lost. Reading has no time limit.

If someone changes the same thing just before you save, you choose: **Overwrite**, which saves your change and loses theirs; **Reload**, with your text kept below to copy from; or **Cancel**.

## Where to go next

- [The Activity](/docs/activity/) — how to get in, the lists of the channel, and back to the channel.
- [Editing a task in the channel](/docs/channel-tasks/) — the same five buttons, under the list in the channel.
- [FAQ](/docs/troubleshooting/#in-the-activity) — quick answers to the most common problems.
