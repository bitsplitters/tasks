---
title: Getting started
description: Invite the bot, run your first command and create a list in a couple of minutes.
group: Getting started
order: 1
---

Team Tasks Manager (TTM) improves team coordination by letting you share and manage tasks **without leaving Discord**. If you have ever lost track of who was doing what across a chat and a separate task tool, this is for you.

This page takes you from zero to your first working list.

## 1. Invite the bot

Add Team Tasks Manager to your server with the **Add to Discord** button (top of this site). During the invite, keep the permissions TTM asks for — it needs them to post lists, manage threads and run reminders. If you skip one, the bot will tell you exactly which permission is missing when it needs it.

The permissions TTM may use are:

| Permission | Why it is needed |
| :--- | :--- |
| View channel | See the channel where the list lives |
| Send messages | Post and update the list |
| Send messages in threads | Write to the history/log thread |
| Embed links | Render the list as a rich embed |
| Create public / private threads | Create the optional log thread |
| Manage webhooks | Run the webhook feature |
| Attach files | Provide the list download |
| Read message history | Keep the list in sync |

<div class="callout"><div class="callout-t">Good to know</div>You can grant these later from <em>Server Settings → Roles → Team Tasks Manager</em>, or per channel from the channel's permission settings.</div>

## 2. Run a slash command

TTM is built almost entirely on buttons, so there are only a few commands to remember. There are two ways to launch one:

**Type `/`** in the message box, pick **Team Tasks Manager** from the app list, then choose the command. After the first character Discord suggests your most-used commands at the top.

**App Launcher** — click the app launcher icon in the message bar, choose **Team Tasks Manager** under *Apps on this Server*, then pick the command.

<div class="callout"><div class="callout-t">Tip</div>If your server has many apps, type part of the command name to filter the list.</div>

## 3. Create your first list

Run the command:

```
/create-list
```

TTM replies with a short legend on how to write a list and a **Create your list** button. Click it to open a form with two fields — the **list title** and the **list of activities**.

<div class="callout"><div class="callout-t">Already know the syntax?</div>The legend can be switched off in <a href="/docs/configuration/">Configuration</a>. With it off, <code>/create-list</code> opens the creation form immediately.</div>

Type your activities one per line, each starting with a dash `-`:

```
- Design the landing page
  - Draft the copy
  - Pick the palette
- Set up the repository
- Ship to staging
```

TTM reads that text and builds the list for you. The rules are simple:

- **A new line that starts with `-` is a new task.**
- **Spaces after the dash make it a subtask.** No space → a task; one or more spaces → a subtask of the task above. A task with subtasks becomes a **task group**.
- The list can hold up to **4000 characters** and up to **50 tasks in total** (subtasks included).

Once created, the list appears with a set of check controls and **two rows of buttons**. That panel is where the real power lives — head to [The task list panel](/docs/the-task-list/) to master it.

## Next steps

- [Core concepts](/docs/core-concepts/) — tasks, subtasks, groups, owners, tags and states.
- [The task list panel](/docs/the-task-list/) — every button, explained.
- [Configuration](/docs/configuration/) — tailor notifications, time zone and more.
