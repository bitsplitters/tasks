---
title: Getting started
description: Invite the bot, create a list, then tick a task and set a reminder — in the channel or in the Activity.
group: Getting started
order: 1
---

Team Tasks Manager (TTM) lets your team share and manage tasks **without leaving Discord**. This page takes you from zero to a working list: create it, tick a task, set a reminder.

<div class="callout"><div class="callout-t">Every feature is unlocked during the beta</div>Every feature is unlocked, for every server. Where these pages mention the Free plan or Premium, it applies only after the beta — see <a href="/docs/beta/">How the beta works</a>.</div>

## 1. Invite the bot

<p><a class="btn" href="/invite">Add to Discord</a></p>

That button invites Team Tasks Manager to your server. Keep the permissions it asks for: TTM needs them to post lists, run reminders and write the timeline. If you skip one, the bot tells you exactly which permission is missing when it needs it. What each permission is for: [The permissions TTM asks for](/docs/core-concepts/#the-permissions-ttm-asks-for).

## 2. Create your first list

Type `/` in the message box and pick the command, or start typing its name:

```
/create-list
```

If your Discord is in another language, the command has a translated name: in Italian it is `/crea-lista`. Every name is in [Commands reference](/docs/commands/#command-names-in-your-language).

TTM replies with a short explanation of how to write a list and a **Create your list** button. Click it: a form opens with two fields, the **list title** and the **list of activities**. Write one activity per line, each starting with a dash `-`. For example, with the title *Saturday tournament*:

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
- The title can be up to **90 characters**, the list about **4000 characters** and **50 tasks**, subtasks included: see [Known limits](/docs/known-limits/).

Submit the form, and the list appears in the channel. Here is the same list after a few steps. The first task is ticked, *Prepare the brackets* has an owner and *Stream the final* has a reminder.

<picture class="screen">
  <source media="(max-width: 640px)" srcset="/screens/list-mobile.png" width="795" height="1059" />
  <img src="/screens/list-desktop.png" width="456" height="418" loading="lazy" alt="The Saturday tournament list in Discord: six numbered tasks with checkboxes. The first is ticked and greyed out; Prepare the brackets has two subtasks and an owner; Stream the final has an owner and a reminder date. Under the tasks, a small line points to More, Guide and the full docs, and a green bar shows how much is done. Below the list are the drop-down menu, Tick a task, and two rows of buttons." />
</picture>

Rather learn by doing? Next to **Create your list** there's a **Tutorial** button: it turns the explanation into a practice list of seven lessons in your language, and sends you the Guide in a message only you can see.

Do the lessons in order: each one names a button with its icon and asks you to do something to itself, from ticking it to opening it in the Activity.

The practice list is a normal list: when you're done, delete it from **More** → **Delete list**.

Now pick where to work on it. The list is the same in both places, and it is [in one place at a time](/docs/core-concepts/#one-list-two-places).

## <img class="place-ic" src="/icons/posto-canale.svg" alt="" />3. In the channel

### Tick a task

Under the list there is the **check selector**, a drop-down menu that shows the list's title, and two rows of buttons. Open the menu and pick a task: its box changes from <img class="inline-ic" src="/icons/checkbox_empty.png" alt="" /> to <img class="inline-ic" src="/icons/checkbox_marked.png" alt="" />, and the list updates for everyone. Pick it again to reopen it.

Ticking a group ticks its subtasks too. Depending on your [settings](/docs/configuration/), TTM may also post a short notice under the list and record the change in a timeline thread.

<div class="callout"><div class="callout-t">Can't tick a task?</div>Every button in the second row must be <strong>off</strong>: if one is blue or red, picking a task applies that button's action instead. And a task with an owner can be ticked only by its owner, and by whoever has <em>Manage messages</em> on the channel.</div>

### Set a reminder

In the second row:

1. Click **Reminder** <img class="inline-ic" src="/icons/alertW.png" alt="" />, the fourth button, once: it turns **blue**.
2. Pick a task that is **not ticked yet**. A form titled *Set reminder for task …* opens, filled in with ten minutes from now.
3. Submit it as it is. If your server has turned on recurring reminders, a summary card follows: press **Save**.

The task shows the time, and the reminder arrives once. The time zone in the last field is the one of your Discord language, or the server's: change it if yours is different, and set yours with [/my timezone](/docs/my-timezone/) to have it proposed every time.

**Closed the form with ✕?** The list stays locked: open **More** under the list and press **Unlock list**. See [When the list is locked](/docs/the-task-list/#when-the-list-is-locked).

Every button under the list: [The list in the channel](/docs/the-task-list/) and [Editing a task in the channel](/docs/channel-tasks/).

## <img class="place-ic is-activity" src="/icons/activity.png" alt="" />4. In the Activity

In the Activity you work on the list in a window inside Discord, with boxes and panels instead of menus. Press **Activity** <img class="inline-ic" src="/icons/activity.png" alt="" />, the first button under the list. The others in the channel can join you there. You can also start from Discord's App Launcher or from a voice call: see [Four ways in](/docs/activity/#four-ways-in).

### Tick a task

Tap a task's box. The list updates for everyone in the window, and a group ticks its subtasks too.

### Set a reminder

Tap the text of a task that is not ticked yet: its panel opens. Tap **Reminder** <img class="inline-ic" src="/icons/alertW.png" alt="" /> once: it turns **blue**, and the date, the time and the time zone appear, set to ten minutes from now in your device's time zone. Tap **Save**.

When you are done, press **Exit**: the list goes back to the channel, with a summary of what changed.

Everything in the window: [The Activity](/docs/activity/) and [Working on a list in the Activity](/docs/activity-list/).

## Good to know before the first reminder

- **The reminder goes to the task's owner**, by direct message if the owner is a person.
- **If the task has no owner yet, you become its owner**, so the reminder comes to you: see [The rules](/docs/reminders/#the-rules).
- **Nothing arrived?** Allow direct messages from server members: see [Reminders by direct message](/docs/known-limits/#reminders-by-direct-message).

## Next steps

- [Core concepts](/docs/core-concepts/) — one list in two places, owners, tags, groups and permissions.
- [Owners and tags](/docs/owners-and-tags/) — give a task to a person, a role or several people, and tag who to notify.
- [Reminders](/docs/reminders/) — who gets them, time zones, repeating reminders.
- [Tips & tricks](/docs/tips/) — small habits that save time, like reusing a list on another server.
- [/config app](/docs/configuration/) — notifications, the tips, time zone and more.
- [FAQ](/docs/troubleshooting/) — quick answers to the most common problems.
