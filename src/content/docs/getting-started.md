---
title: Getting started
description: Invite the bot, create a list, tick a task and set a reminder — in a few minutes.
group: Getting started
order: 1
---

Team Tasks Manager (TTM) lets your team share and manage tasks **without leaving Discord**. This page takes you from zero to a working list: create it, tick a task, set a reminder.

<div class="callout"><div class="callout-t">Everything is free during the beta</div>Every feature is unlocked, for every server. Where these pages mention the Free plan or Premium, it applies only after the beta — see <a href="/docs/beta/">Free during the beta</a>.</div>

## 1. Invite the bot

<p><a class="btn" href="/invite">Add to Discord</a></p>

That button invites Team Tasks Manager to your server. Keep the permissions it asks for: TTM needs them to post lists, run reminders and write the timeline. If you skip one, the bot tells you exactly which permission is missing when it needs it. What each permission is for: [The permissions TTM asks for](/docs/core-concepts/#the-permissions-ttm-asks-for).

## 2. Create your first list

Type `/` in the message box and pick the command, or start typing its name:

```
/create-list
```

If your Discord is in another language, the command has a translated name: in Italian it is `/crea-lista`. Every name is in [Commands reference](/docs/commands/#command-names-in-your-language).

TTM replies with a short legend on how to write a list and a **Create your list** button. Click it: a form opens with two fields, the **list title** and the **list of activities**. Write one activity per line, each starting with a dash `-`. For example, with the title *Saturday tournament*:

```
- Book the voice channels
- Prepare the brackets
  - Collect the sign-ups
  - Seed the teams
- Post the rules
- Stream the final
```

The rules:

- **A line that starts with `-` is a task.**
- **Spaces before the dash make it a subtask** of the task above. A task with subtasks becomes a **group**.
- The title can be up to **256 characters**. The list can be up to about **4000 characters** and **50 tasks**, subtasks included. After the beta, the Free plan allows 20 tasks: see [What Premium unlocks](/docs/premium/).

Submit the form, and the list appears in the channel. Here is the same list after a few steps. The first task is ticked, *Prepare the brackets* has an owner and *Stream the final* has a reminder.

<picture class="screen">
  <source media="(max-width: 640px)" srcset="/screens/list-mobile.png" width="946" height="1048" />
  <img src="/screens/list-desktop.png" width="424" height="371" loading="lazy" alt="The Saturday tournament list in Discord: six numbered tasks with checkboxes. The first is ticked and greyed out; Prepare the brackets has two subtasks and an owner; Stream the final has an owner and a reminder date. Below the list are the drop-down menu, showing the list's title, and two rows of buttons." />
</picture>

## 3. Tick a task

Under the list there is the **check selector**, a drop-down menu that shows the list's title, and two rows of buttons. Open the menu and pick a task: its box changes from <img class="inline-ic" src="/icons/checkbox_empty.png" alt="" /> to <img class="inline-ic" src="/icons/checkbox_marked.png" alt="" />, and the list updates for everyone. Pick it again to reopen it. Ticking a group ticks its subtasks too. Depending on your [settings](/docs/configuration/), TTM may also post a short notice under the list and record the change in a timeline thread.

<div class="callout"><div class="callout-t">Can't tick a task?</div>Every button in the second row must be <strong>grey</strong>: if one is blue or red, picking a task applies that button's action instead. And a task with an owner can be ticked only by its owner, and by whoever has <em>Manage messages</em> on the channel.</div>

## 4. Set a reminder

In the second row, click the bell <img class="inline-ic" src="/icons/alertW.png" alt="" /> — **Reminder**, the fourth button — once: it turns **blue**. Then pick a task that is **not ticked yet**. TTM posts a short note that the list is being edited, and a form titled *Set reminder for task …* opens. It is already filled in with ten minutes from now: submit it as it is. The first time, the time zone in the last field is the server's: change it if yours is different. The task shows the time, and the reminder arrives once. If your server has turned on recurring reminders, a summary card follows the form: press **Save**.

Good to know before the first try:

- **The reminder goes to the task's owner**, by direct message if the owner is a person.
- **If the task has no owner yet, you become its owner**, so the reminder comes to you. From then on only you, and whoever has *Manage messages*, can tick that task. To give it to someone else, set the owner first with the person button <img class="inline-ic" src="/icons/owner.png" alt="" /> — **Owner**, the second in the row.
- **Nothing arrived?** Allow direct messages from server members: click the server name, then *Privacy Settings*. After a refused message, TTM waits some hours before it writes to that person again: see [Reminders by direct message](/docs/known-limits/#reminders-by-direct-message).
- **Closed the form with ✕?** The list stays locked: press the unlock button in TTM's note.

## Next steps

- [The task list panel](/docs/the-task-list/) — every button, explained.
- [Owners and tags](/docs/owners-and-tags/) — give a task to a person, a role or several people, and tag who to notify.
- [Reminders](/docs/reminders/) — repeating reminders, time zones, editing and removing.
- [Core concepts](/docs/core-concepts/) — owners, tags, groups and permissions.
- [Tips & tricks](/docs/tips/) — small habits that save time, like reusing a list on another server.
- [Configuration](/docs/configuration/) — notifications, the legend, time zone and more.
- [Something not working?](/docs/troubleshooting/) — quick answers to the most common problems.
