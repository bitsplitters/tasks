---
title: List actions
description: Clean, Reopen all, Clone, Download, Seal and Delete — what each does to the whole list, and where you find it.
group: Features
order: 4
---

These actions work on the **whole list**, never on a single task. Two of them exist in both places; the others only in the channel.

| Action | In the channel | In the Activity |
| :--- | :---: | :---: |
| [Clean](#clean) | yes | yes |
| [Reopen all](#reopen-all) | yes | yes |
| [Clone](#clone) | yes | — |
| [Download](#download) | yes | — |
| [Seal](#seal) | yes, and in `/config lists` | only from `/config lists` |
| [Delete](#delete) | yes, and in `/config lists` | only from `/config lists` |

<div class="howto" id="how-to-do-it"><div class="howto-t">How to do it</div><div class="howto-grid"><a class="howto-go is-channel" href="/docs/the-task-list/#row-1--acts-on-the-whole-list"><span class="howto-k"><img class="place-ic" src="/icons/posto-canale.svg" alt="" />In the channel</span><span class="howto-d">The first row under the list, and More for Clone, Download, Seal and Delete.</span></a><a class="howto-go is-activity" href="/docs/activity-list/#the-first-row"><span class="howto-k"><img class="place-ic" src="/icons/activity.png" alt="" />In the Activity</span><span class="howto-d">Clean the list and Reopen all, at the top of the list.</span></a></div></div>

## Clean

**Clean** removes every completed task, subtasks included, and renumbers the tasks that stay. A group that isn't completed stays, even when some of its subtasks go.

First, a confirmation tells you how many tasks will go, and what goes with them. They go **for good**, with their reminders and tags, if they have any.

In the channel, if your server's configuration allows it, the notification in the list's channel or in its thread shows the removed tasks: see [Notification mode](/docs/configuration/#notification-mode). In the Activity, they end up in the summary at the end of the session.

- **No task completed**: there is nothing to remove, and the bot says so at once.
- **Every task completed**: Clean refuses, because a list can't be empty. Untick at least one task, or remove the whole list with [Delete](#delete), in the channel.

## Reopen all

**Reopen all** brings every completed task back to to-do. Text, owners, tags and reminders stay as they are. If no task is completed, the bot says there is nothing to reopen.

First, the bot asks you to choose:

- **Reopen** — reopen every task now.
- **New date** — reopen, and move the reminders of the tasks you reopen. The first of those reminders in the calendar moves to the date you pick, at least 5 minutes from now. The others keep the same distance from it.

  Reminders of tasks still to do stay as they are. This choice appears only when a task you reopen has a reminder.
- **Cancel** — leave the list as it is.

Reopening fires the **reopening webhooks** of the tasks it reopens, and it ignores owners: anyone who can edit the list can reopen it.

## Clone

**Clone** copies the list into another channel, as a new list. You choose:

- the channel: text channels and voice channels. A clone in a voice channel has no activity timeline: see [Voice channels](/docs/known-limits/#voice-channels);
- whether the clone keeps the ticks;
- whether it keeps the reminders.

A clone gets new reminders, so a recurring reminder can be refused: see [Repeating reminders](/docs/reminders/#repeating-reminders).

The clone posts its own notification in the new channel, and it can mention the owners of its tasks: see [When a list is created](/docs/configuration/#when-a-list-is-created). The channel of the original list gets the usual notification of the clone, without mentions.

A clone is a new list: it needs a free place, and it can't have more tasks than your plan allows. See [What Premium unlocks](/docs/premium/).

Only in the channel, even while the list is locked.

## Download

**Download** gives you a `.txt` file of the list, written as explained in [Editing a list by hand](/docs/writing-a-list/) and sent **only to you**. The file keeps Discord's codes in place of the names: see [The codes behind the names](/docs/writing-a-list/#the-codes-behind-the-names).

Keep it as a backup, or rebuild the list from it with `/create-list`, even on another server: see [Reuse a list anywhere](/docs/tips/#reuse-a-list-anywhere).

A Discord message is capped at 2000 characters, so Download never posts the list as text: it is always a file.

Only in the channel.

## Seal

**Seal** keeps a finished list in the channel as a record, marked *Sealed list*, without buttons or menus. Its reminders stop, and it frees a [place on your plan](/docs/premium/#how-the-three-places-work). What stays and what goes: [Seal](/docs/config-lists/#seal).

Sealing can't be undone, and the bot asks you to confirm first. If you may want to reuse the list, download it before you seal it.

In the channel, from **More**, sealing needs *Manage messages* on the channel, and a list that someone is editing can't be sealed. From [`/config lists`](/docs/config-lists/) the `/config` permissions apply, and an admin can seal even a list in the Activity: it goes back to the channel first.

## Delete

**Delete** removes the list **permanently**, with its tasks, owners, tags and reminders. The message is removed, and a short receipt takes its place in the channel.

Deleting can't be undone, and the bot asks you to confirm first. The permissions are the same as for [Seal](#seal). From `/config lists`, deleting a list in the Activity removes it for the people inside too.

<div class="callout"><div class="callout-t">Why delete instead of removing the message?</div>If you delete the message by hand, the list's data stays, and its reminders keep arriving. <strong>Delete</strong> takes the reminders with it. If a message is already gone, <a href="/docs/config-lists/"><code>/config lists</code></a> lets you clean up, or bring the list back.</div>
