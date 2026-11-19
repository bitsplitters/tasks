---
title: Core concepts
description: One list in two places, the vocabulary of TTM — tasks, groups, owners, tags, reminders — and the permissions it asks for.
group: Getting started
order: 2
---

A few terms come up throughout the app. Learn them once and everything else clicks into place.

## One list, two places

A list lives in a message in a Discord channel, where everyone finds it. The **Activity** opens the same list in a window inside Discord, where several people work on it together and see every change live. It is the same list, not a copy.

A list is in one place at a time. While it is in the Activity, its message in the channel keeps only **Join the Activity**. When everyone leaves, the list goes back to the channel with a summary of what changed.

What a list can do is the same in both places: owners, tags, reminders, webhooks, your server's settings and the limits of your plan. What changes is how you do it. In the channel you use the menus and buttons under the message. In the Activity you tap a task's box, or its text. These pages are split the same way:

- **Features** — what each feature does and its rules, the same in both places.
- **In the channel** — the list's message, its menus and its buttons.
- **In the Activity** — the window, the boxes and the panel of each task.

A few actions exist only in the channel: Clone, Download, Seal, Delete, Unlock and the import from a file. See [What stays in the channel](/docs/activity/#what-stays-in-the-channel).

## Tasks, subtasks and groups

| Term | What it is |
| :--- | :--- |
| **Task** | A single activity — neither a subtask nor a group. |
| **Subtask** | An activity that belongs to a larger one. |
| **Task group** | A task made of subtasks. |

You never pick these types from a menu — TTM infers them from how you write the list. A line starting with `-` is a task. Spaces before the dash turn it into a subtask of the line above. A task with subtasks automatically becomes a **group**. The whole format: [Writing a list](/docs/writing-a-list/).

Groups behave as a unit: ticking a group ticks its subtasks too, and ticking every subtask marks the group as done.

## Task state

Every task is either **open** or **completed**, shown by its checkbox:

- **Open** <img class="inline-ic" src="/icons/checkbox_empty.png" alt="" /> — still to do.
- **Completed** <img class="inline-ic" src="/icons/checkbox_marked.png" alt="" /> — done.

In the channel you tick or untick a task in the [check selector](/docs/the-task-list/#the-check-selector), the menu under the list. In the Activity you tap its [box](/docs/activity-list/#tick-a-task). Completing or reopening a task is what can trigger notifications and webhooks.

### Who can tick a task

**Only the owner can tick or untick a task that has an owner.** These people can do it:

- the owner, or the members of the owner role;
- whoever has *Manage messages* on the channel.

Anyone else gets a refusal that only they see, and nothing changes. The rule covers subtasks too: you can't tick or untick a group if that changes a subtask that belongs to someone else. Anyone who can use the list can tick a task without an owner.

## Owner vs. tag

These look similar but do different jobs:

- **Owner** <img class="inline-ic" src="/icons/owner.png" alt="" /> — the person or role *responsible* for the task. A task has one owner, and it can be several people: TTM creates a role for them (see [The roles TTM creates](/docs/owners-and-tags/#the-roles-ttm-creates)).
- **Tag** <img class="inline-ic" src="/icons/tag.png" alt="" /> — one or more users or roles *mentioned* on the task, for example the people to notify when it is completed.

The rules of both: [Owners and tags](/docs/owners-and-tags/).

## Reminders

A **reminder** <img class="inline-ic" src="/icons/alertW.png" alt="" /> attaches a schedule to a task: a date, a time and a time zone. When it comes due, TTM reminds the task's **owner**, so nobody has to keep checking. A person gets a direct message, and a role gets a mention in the list's channel.

One ping is the default, and on the Free plan it is the only kind. Repeating reminders add an interval and a number of repetitions. They are a Premium feature that a server switches on in [Configuration](/docs/configuration/#recurring-reminders). Full details in [Reminders](/docs/reminders/).

## Notifications & history

When a list is created, or a task is ticked or unticked, TTM can post a notification and — if you enable it — record every action in a dedicated **history thread**. A new list's notification can mention the owners of its tasks, so they hear about it. Changes made in the Activity arrive as one summary, when the list goes back to the channel. How much noise you want is entirely up to you: see [Configuration](/docs/configuration/).

## Who can use lists and commands

By default the app's commands follow Discord's own visibility rules (Server Settings → Integrations). Buttons and lists, however, stay usable by anyone unless you **sync permissions** — after which the list becomes read-only for users who are not allowed, in the channel and in the Activity. This too lives in [Configuration](/docs/configuration/#sync-permissions).

`/config` has a rule of its own: by default only members with *Manage Server* see it. An admin can change that in *Server Settings → Integrations*. See [Who can open /config](/docs/config/#who-can-open-config).

A few actions have a rule of their own:

- only the owner can tick or untick a task that has an owner: see [Who can tick a task](#who-can-tick-a-task);
- sealing or deleting a list from its *More* panel, in the channel, needs *Manage messages* on the channel. From `/config lists`, the `/config` permissions apply;
- opening a list in the Activity needs Discord's *Use Activities* permission on the channel: see [When the list doesn't open](/docs/activity/#when-the-list-doesnt-open).

## The permissions TTM asks for

When you invite the bot, Discord shows the permissions it asks for. This is what each one is for:

| Permission | Why it is needed |
| :--- | :--- |
| View channel | See the channel where the list lives |
| Send messages | Post and update the list |
| Embed links | Render the list as a rich embed |
| Manage messages | Clear the bot's own older notifications, so the channel stays readable |
| Create public threads | Create the optional timeline thread, in text channels |
| Manage webhooks | Write into the timeline thread, in text channels |
| Connect | Post the list in the chat of a voice channel |
| Attach files | Provide the list download |
| Read message history | Keep the list in sync |
| Mention everyone | Notify the people you tag on a task, and the role that owns a task when its reminder comes due |
| Manage roles | Create the role that makes several people the owner of a task (Premium) |
| Use external emojis | Show the bot's own icons on buttons and lists |

**In a voice channel** a list lives in the channel's chat, which has no timeline: TTM doesn't need *Create public threads* and *Manage webhooks* there. It needs *Connect*, the permission to join the voice channel, because without it TTM can't post in the chat. TTM asks for it when you invite it, and Discord gives it to everyone by default; if your server takes it away on a voice channel, grant it to TTM there, or `/create-list` will tell you it's missing. See [Voice channels](/docs/known-limits/#voice-channels).

<div class="callout"><div class="callout-t">Good to know</div>You can grant these later from <em>Server Settings → Roles → Team Tasks Manager</em>, or per channel from the channel's permission settings. <em>Manage roles</em> is the exception: it works only on the bot's role, not per channel.</div>
