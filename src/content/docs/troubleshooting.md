---
title: Something not working?
description: Quick answers to the most common problems, each with a link to the page that explains it in full.
group: Help & community
order: 8.5
---

Find the problem you see below. Each answer is short and links to the page that explains it in full.

The search works with English words: try *tick*, *owner*, *reminder*.

## Lists and tasks

### I can't find the `/create-list` command

Discord shows each command in the language of your Discord app. In Italian, the command is `/crea-lista`. Every translated name is in [Command names in your language](/docs/commands/#command-names-in-your-language).

### I can't tick a task

Check these points, in this order:

- **A button in the second row is blue or red.** Click it until it turns grey. While a button is active, picking a task applies that button's action. See [The check selector](/docs/the-task-list/#the-check-selector).
- **The task has an owner.** Only the owner, the members of the owner role and whoever has *Manage messages* on the channel can tick it. See [The check selector](/docs/the-task-list/#the-check-selector).
- **The menu is disabled.** Someone is editing the list, so it is locked: see [The list is locked](#the-list-is-locked) below.
- **The bot says *You're not allowed to use this feature on this server*.** Your server has synced its permissions, and the list is read-only for you. Ask an admin, and see [Sync permissions](/docs/configuration/#sync-permissions).
- **The beta is over and your server is on the Free plan.** When all the places of your plan are taken, a list outside them refuses the tick. A list created during the beta is the exception: its tasks can still be ticked. See [How the three places work](/docs/premium/#how-the-three-places-work) and [What a beta list keeps](/docs/beta/#what-a-beta-list-keeps).

### The list is locked

TTM locks a list while someone edits it, for example with **Bulk update** or a reminder form. It posts a note in the channel with the name of that person. The list also stays locked when someone closes a form with the ✕, because Discord doesn't tell the bot. Anyone can press the <img class="inline-ic" src="/icons/unlock.png" alt="" /> unlock button in the note. See [When the list is locked](/docs/the-task-list/#when-the-list-is-locked).

### My tags or owner didn't save

The **Tag** and **Owner** menus wait for you to confirm your choice. On mobile, tap **Save** under the open menu. On desktop there is no Save button: click anywhere outside the menu, and closing it applies your choice. See [Confirming a tag selection](/docs/the-task-list/#confirming-a-tag-selection--desktop-vs-mobile).

With **Reset status after selection** (the default), pick the people first and the task second. See [Two ways to tag](/docs/owners-and-tags/#two-ways-to-tag).

### I want to give a task to several people

Click **Owner** until it turns blue. In the menu under the buttons, labelled *Choose one or more people, or a role, then the task*, pick the people. Confirm your choice, then pick the task. TTM creates a role for those people and makes it the owner.

This is a Premium feature, unlocked during the beta. The bot needs the *Manage Roles* permission: an admin grants it on the bot's role in *Server Settings → Roles*, not on a channel. See [Owner: a person, a role, or several people](/docs/owners-and-tags/#owner-a-person-a-role-or-several-people).

### I deleted the list message by mistake

The data of the list is still in TTM, and its reminders keep arriving. Run `/config lists` and press the button of that list until it turns blue (**regenerate**). Then press **Apply** and confirm. TTM publishes the list again in its channel, with the same contents and the same timeline. See [Regenerate](/docs/config-lists/#regenerate).

## Reminders

### My reminder didn't arrive

- **The reminder goes to the task's owner.** That is you only if the task had no owner when you set it. A person gets a direct message, and a role gets a mention in the list's channel. See [Adding a reminder](/docs/reminders/#adding-a-reminder).
- **The owner must allow direct messages from server members:** click the server name, then *Privacy Settings*. After a refused message, TTM waits some hours before it writes to that person again. See [Reminders by direct message](/docs/known-limits/#reminders-by-direct-message).
- **The owner is a role that can't be mentioned.** The reminder appears in the channel, but nobody gets a notification. See [Reminders to a role](/docs/known-limits/#reminders-to-a-role).
- **The owner role was deleted.** The reminder is not sent to anyone. Choose another owner for the task. See [Reminders to a role](/docs/known-limits/#reminders-to-a-role).
- **The owner was removed, or the list was sealed.** In these cases the reminder is gone. See [Row 2](/docs/the-task-list/#row-2--acts-on-a-single-task) and [Seal](/docs/config-lists/#seal).
- **The task is ticked.** Completing a task stops its reminder, and a ticked task can't get a new one.

### I want a weekly reminder

TTM has no unit for weeks, so a week is `7d`.

1. An admin turns on **Recurring reminders** in [`/config app`](/docs/configuration/#recurring-reminders) (Premium, unlocked during the beta).
2. Click **Reminder** until it turns blue, pick the task and submit the **When** form.
3. On the card that appears, press **Edit recurrence**.
4. Write `7d` as the interval and the number of extra weeks in **Repetitions**, then submit the form.
5. Press **Save** on the card.

See [The repetition fields](/docs/reminders/#the-repetition-fields).

## Plans and permissions

### I can't create a list, or the bot says to free a place

During the beta, there is no limit on lists. After the beta, the Free plan lets you work on three lists at a time. When all three places are taken, TTM refuses to create, clone or import a list. The same refusal appears when you work on a list that isn't in use. To free a place, use one of these:

- **Seal list** or **Delete list**, in the <img class="inline-ic" src="/icons/other.png" alt="" /> **More** panel of a list you no longer need. A sealed list stays in the channel as a record.
- `/config lists`, which marks the lists **in use** and can seal or delete several at once.

Premium removes this limit. See [What happens to a fourth list](/docs/premium/#what-happens-to-a-fourth-list).

### Who can seal or delete a list?

In the **More** panel of a list, only members with *Manage messages* on the channel see **Seal list** and **Delete list**. In `/config lists`, the rules of `/config` apply: server administrators, or the people the server has authorized. See [What's inside More](/docs/the-task-list/#whats-inside-more) and [Who can use it](/docs/config-lists/#who-can-use-it).

### The bot says a permission is missing

There are two different cases:

- **The bot is missing a permission.** Its message names the permission and the steps to grant it. What each permission is for: [The permissions TTM asks for](/docs/core-concepts/#the-permissions-ttm-asks-for).
- **You are not allowed to use a feature.** The server's admins set this rule, not the bot. See [Sync permissions](/docs/configuration/#sync-permissions).

---

Still stuck? Ask us in the [Discord server](/docs/community/). Clear steps and a screenshot help us answer quickly.
