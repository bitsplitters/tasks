---
title: The list in the channel
description: The list's message in a Discord channel — the check selector, the first row of buttons, More, and what happens while someone edits it.
group: In the channel
place: channel
order: 1
---

Once a list exists, TTM shows a **check selector** and **two rows of buttons** beneath it. Almost nothing here needs a command: you just click. The first row acts on the whole list, and it is explained here. The second row acts on a single task: see [Editing a task in the channel](/docs/channel-tasks/).

## Under the list

The list ends with a thin **progress bar**: the share of ticked boxes, tasks and subtasks alike, in steps of 5%. It moves as soon as one box is ticked, and it is full only when every box is. A sealed list keeps it, showing where the list ended.

Above the bar, a small line helps whoever is new: *Not sure what the buttons do? More → Guide*. **Guide**, in [More](#whats-inside-more), explains every button without leaving Discord. If your team doesn't need it, hide the **Tips** in [/config app](/docs/configuration/#tips): the line goes, the bar stays. While the list is locked, the same line says who is editing it and how to unlock it, even with the Tips hidden: see [When the list is locked](#when-the-list-is-locked).

While the list is in the [Activity](/docs/activity/), the line says so, and **Join the Activity** is the only button under the list.

## The check selector

Above the buttons sits the **check selector**: the drop-down menu that shows the list's title. A list with more than 25 tasks has two menus, each labelled with the position of its last task. Use it to:

1. **Mark tasks done or open** — tick a task to complete it, untick it to reopen it. Its checkbox shows <img class="inline-ic" src="/icons/checkbox_empty.png" alt="" /> or <img class="inline-ic" src="/icons/checkbox_marked.png" alt="" />.
2. **Pick the task that an active button acts on** (see [the second row](/docs/channel-tasks/#the-second-row)).

Ticking or unticking a group does the same to its subtasks. Completing all its subtasks completes the group. A task with an owner can be ticked only by its owner, and by whoever has *Manage messages* on the channel: see [Who can tick a task](/docs/core-concepts/#who-can-tick-a-task). A refusal reaches only whoever picked the task.

<div class="callout"><div class="callout-t">Keep the task buttons off</div>To tick or untick tasks, <strong>every button in the second row must be off</strong>. If any task button is active (blue or red), picking a task applies that action instead of ticking it.</div>

## Row 1 — acts on the whole list

These buttons never touch a single task: they act on the **entire list**. What each action does, in both places: [List actions](/docs/list-actions/).

| Button | What it does |
| :--- | :--- |
| **Activity** <img class="inline-ic" src="/icons/activity.png" alt="" /> | Open the list in the Activity, a window inside Discord where you work on it together. See [The Activity](/docs/activity/). |
| **Bulk update** <img class="inline-ic" src="/icons/edit.png" alt="" /> | Edit the title and the whole list as text, in one form. For a single task, use the [second row](#row-2--acts-on-a-single-task). See [Bulk update](#bulk-update). |
| **Clean list** <img class="inline-ic" src="/icons/clean.png" alt="" /> | Remove every completed task, after a confirmation. |
| **Reopen all** <img class="inline-ic" src="/icons/reopen.png" alt="" /> | Bring every completed task back to to-do. You can also move their reminders to a new date. |
| **More** <img class="inline-ic" src="/icons/other.png" alt="" /> | Open a panel with the actions you need less often: the in-Discord guide, and clone, download, seal or delete the list. When the list is locked, you unlock it here. |

### Bulk update

**Bulk update** opens a form with the title and the whole list as text: one line per task, in the format explained in [Editing a list by hand](/docs/writing-a-list/). Change what you need and submit.

- People, roles and channels show by name, and reminder dates in your time zone.
- A line under the text says how to add someone new: see [People, roles and channels by name](/docs/writing-a-list/#people-roles-and-channels-by-name).
- While the form is open, the list is locked for everyone else: see [When the list is locked](#when-the-list-is-locked).

If the list changed while you were editing, TTM asks you what to do before it saves: see [When the list changes while you edit it](#when-the-list-changes-while-you-edit-it). If the text can't be saved, TTM shows it back with every problem: see [When the text can't be saved](/docs/writing-a-list/#when-the-text-cant-be-saved).

### Clean list

A confirmation window tells you how many tasks will go, and what goes with them. Submit it to confirm, or close the window to cancel. What Clean removes and what it keeps: [Clean](/docs/list-actions/#clean).

### Reopen all

The bot asks you in a message that only you can see: **Reopen**, **New date** or **Cancel**. **New date** opens the **When** window, the same as a [reminder](/docs/channel-tasks/#reminder): pick the date the first reminder moves to. What Reopen all changes: [Reopen all](/docs/list-actions/#reopen-all).

If someone locks or seals the list before you confirm, nothing changes: see [When the list is locked](#when-the-list-is-locked).

### What's inside More

Discord allows five buttons per row, so the actions you need less often sit in a panel that only you can see:

- **Unlock list** <img class="inline-ic" src="/icons/unlock.png" alt="" /> — only while the list is locked. It shows who is editing, and turns the list's buttons back on for everyone. See [When the list is locked](#when-the-list-is-locked).
- **Guide** <img class="inline-ic" src="/icons/doc.png" alt="" /> — the quick in-Discord guide, with a link back to this documentation.
- **Clone list** <img class="inline-ic" src="/icons/clone.png" alt="" /> — clone the list into another channel, even while the list is locked. See [Clone options](#clone-options).
- **Download** <img class="inline-ic" src="/icons/download.png" alt="" /> — a `.txt` file of the list, sent **only to you**. See [Download](/docs/list-actions/#download).
- **Seal list** <img class="inline-ic" src="/icons/seal.png" alt="" /> — keeps a finished list in the channel as a record, without buttons or menus. See [Seal](/docs/list-actions/#seal).
- **Delete list** <img class="inline-ic" src="/icons/delete.png" alt="" /> — deletes the list **permanently**. See [Delete](/docs/list-actions/#delete).

Sealing and deleting can't be undone, and the bot asks you to confirm first. Both need *Manage messages* on the channel: the same permission that lets you delete the list's message by hand. Without it, those two entries aren't there. Guide, Clone list and Download are there for everyone, and so is Unlock list when the list is locked.

While the list is locked, Seal list and Delete list aren't there. Whoever is editing would save onto a list that no longer exists.

### Clone options

When you press **Clone list** in **More**, the cloning controls replace the first row under the list, and the panel links you to the list:

- **Create list** — start cloning into the channel you picked in the dropdown.
- **Selection option** — keep the ticks in the clone, or not.
- **Reminder option** — keep the reminders in the clone, or not.
- **Exit** — go back to the list panel as it was. If someone was editing the list, it stays locked.

The dropdown offers text channels and voice channels. What a clone keeps, and the limits of your plan: [Clone](/docs/list-actions/#clone).

## Row 2 — acts on a single task

The second row has five buttons — Content, Owner, Tag, Reminder and Webhook — and each one is a three-state switch: off, edit or delete. Turn one on, then pick the task. Every button, its forms and its menus: [Editing a task in the channel](/docs/channel-tasks/).

## When the list is locked

TTM locks the list while someone edits it:

- in **Bulk update**;
- in the form of a task's text;
- in a reminder form.

For everyone else, these turn off: the check selector, the Activity button, **Bulk update**, **Clean list**, **Reopen all** and the task buttons. **More** stays on, with **Clone list** inside. **More** shows who is editing, and a locked list can't be sealed or deleted from there.

The last line of the list says it too: *🔒 @name is editing this list. Stuck? More → Unlock list*. It takes the place of the Tips line, and it shows even when your server hides the Tips. The mention shows the name and doesn't notify anyone. When the list is unlocked, the Tips line comes back, if your server shows it.

Locking the list also turns **Owner**, **Tag** and **Webhook** off if one of them was on: open it again from its button when you need it.

Saving the form unlocks the list. Closing it with **Cancel** or the ✕ doesn't, because Discord doesn't tell the bot: **Bulk update** and the form of a task's text say so in their last line. Then anyone can unlock the list: open **More** and press **Unlock list** <img class="inline-ic" src="/icons/unlock.png" alt="" />.

An admin can still seal, delete or regenerate a locked list from [`/config lists`](/docs/config-lists/). If that happens while you are editing, your change isn't saved. The bot tells you, and gives you back the text you wrote.

### When the list changes while you edit it

Someone may have started an action before you locked the list: a reminder, or a task's text. When they finish, their change applies, but the list stays locked for you. **More** then says who updated it in the meantime.

When you save **Bulk update**, TTM checks whether the list is still the one you opened. If it changed, nothing is saved yet. A message only you can see says so, shows the text you wrote, and offers three choices:

- **Overwrite** — save your text. The updates made in the meantime are lost.
- **Reload** — reopen **Bulk update** with the updated list. Your text stays in the message, to copy from.
- **Cancel** — keep the list as it is, with the updates, and unlock it.

If the list gets locked or sealed before you confirm Clean or Reopen, nothing changes. The bot tells you: *This list can't be changed right now*.

## Where to go next

- [Editing a task in the channel](/docs/channel-tasks/) — the second row: content, owner, tags, reminder and webhook.
- [The Activity](/docs/activity/) — work on a list together, in a window inside Discord.
- [Editing a list by hand](/docs/writing-a-list/) — mentions, owners, links and reminders in the text of Bulk update.
- [/config app](/docs/configuration/) — control notifications, history and permissions.
- [FAQ](/docs/troubleshooting/#in-the-channel) — quick answers to the most common problems.
