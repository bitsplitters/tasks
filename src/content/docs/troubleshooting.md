---
title: FAQ
description: Frequently asked questions — quick answers to the most common problems, each with a link to the page that explains it in full.
group: Help & community
order: 8.5
---

Find the problem you see below. Each answer is short and links to the page that explains it in full. The problems of the list are split by place: [in the channel](#in-the-channel) and [in the Activity](#in-the-activity).

The search works with English words: try *tick*, *owner*, *reminder*.

## In the channel

### I can't find the `/create-list` command

Discord shows each command in the language of your Discord app. In Italian, the command is `/crea-lista`. Every translated name is in [Command names in your language](/docs/commands/#command-names-in-your-language).

### I can't tick a task

Check these points, in this order:

- **A button in the second row is blue or red.** Click it until it's off. While a button is active, picking a task applies that button's action. See [The check selector](/docs/the-task-list/#the-check-selector).
- **The task has an owner.** Only the owner, the members of the owner role and whoever has *Manage messages* on the channel can tick it. See [Who can tick a task](/docs/core-concepts/#who-can-tick-a-task).
- **The menu is disabled.** Someone is editing the list, so it is locked: see [I pressed Cancel and the list stays locked](#i-pressed-cancel-and-the-list-stays-locked) below.
- **The bot says *You're not allowed to use this feature on this server*.** Your server has synced its permissions, and the list is read-only for you. Ask an admin, and see [Sync permissions](/docs/configuration/#sync-permissions).
- **The beta is over and your server is on the Free plan.** When all the places of your plan are taken, a list outside them refuses the tick. A list created during the beta is the exception: its tasks can still be ticked. See [How the three places work](/docs/premium/#how-the-three-places-work) and [What a beta list keeps](/docs/beta/#what-a-beta-list-keeps).

### I pressed Cancel and the list stays locked

TTM locks a list while someone edits it: in **Bulk update**, in the form of a task's text and in a reminder form. Saving the form unlocks the list. Closing it with **Cancel** or the ✕ doesn't, because Discord doesn't tell the bot that the form was closed. The last line of the list says who locked it. Anyone can unlock the list: open **More** under the list and press **Unlock list** <img class="inline-ic" src="/icons/unlock.png" alt="" />. See [When the list is locked](/docs/the-task-list/#when-the-list-is-locked).

### My tags or owner didn't save

The **Tag** and **Owner** menus wait for you to confirm your choice. On mobile, tap **Save** under the open menu. On desktop there is no Save button: click anywhere outside the menu, and closing it applies your choice. See [Confirming a selection](/docs/channel-tasks/#confirming-a-selection--desktop-vs-mobile).

With **Keep the state after a selection** off (the default), pick the people first and the task second. See [Tag](/docs/channel-tasks/#tag).

If a task became yours instead of going to the people you picked, the menu was still empty when you picked the task: with the menu empty, **Owner** gives the task to you. Click **Owner** until it's red and pick the task to remove it, then pick the people, confirm, and pick the task again.

### I want to give a task to several people

Click **Owner** until it turns blue. In the menu under the buttons, labelled *Pick a task in the menu above to take it, or choose who gets it*, pick the people. Confirm your choice, then pick the task. TTM creates a role for those people and makes it the owner. In the Activity, choose them in the panel of the task: see [Owner](/docs/activity-list/#owner).

This is a Premium feature, unlocked during the beta. The bot needs the *Manage Roles* permission: an admin grants it on the bot's role in *Server Settings → Roles*, not on a channel. See [Owner: a person, a role, or several people](/docs/owners-and-tags/#owner-a-person-a-role-or-several-people).

### I deleted the list message by mistake

The data of the list is still in TTM, and its reminders keep arriving. Run `/config lists` and press the button of that list until it turns blue (**regenerate**). Then press **Apply** and confirm. TTM publishes the list again in its channel, with the same contents and the same timeline. See [Regenerate](/docs/config-lists/#regenerate).

## In the Activity

### The Activity doesn't open

Check these points, in this order:

- **The first button under the list is still Clone list.** The list was posted before the Activity arrived: it gets the Activity button the next time it changes.
- **The Activity button is off.** Someone is editing the list in the channel. The button turns on when the list is unlocked: see [When the list is locked](/docs/the-task-list/#when-the-list-is-locked).
- **The bot says you need *Use Activities*.** It is a Discord permission on the channel, and a server administrator enables it for you in the channel's *Permissions*.
- **The bot says *I can't see the Activity yet*.** Your Discord app may not support the Activity. Update it, or try another device.

See [When the list doesn't open](/docs/activity/#when-the-list-doesnt-open).

### The list shows only Join the Activity

The list is in the [Activity](/docs/activity/), and while it is there it can't be changed in the channel. Press **Join the Activity** to work on it with the others. When everyone leaves, the list comes back to the channel with all its buttons. See [Join the others](/docs/activity/#join-the-others).

### I can't tick a task in the Activity

TTM tells you why. Usually:

- **The task has an owner.** A bubble on the box says so. The rule is the same as in the channel: see [Who can tick a task](/docs/core-concepts/#who-can-tick-a-task).
- **Someone is editing that task.** A tap on its box says who. The other tasks stay free.
- **Someone is editing the whole list** with **Edit the list**. The line under the list says who, and the boxes come back when they are done. See [Who is editing what](/docs/activity-list/#who-is-editing-what).
- **The database isn't responding.** A strip says so, and the list is read-only until it is back: see [When the database isn't responding](/docs/activity/#when-the-database-isnt-responding).

### The list takes a while to come back from the Activity

The Activity was closed without pressing **Exit**. For TTM, a closed window looks like a connection that dropped for a moment: it waits 30 seconds for you to come back, then brings the list back to the channel. With a phone left in the background or locked, it can take up to a minute, because the bot first has to notice that the page has stopped answering.

**Exit** tells the bot at once that you are done: if you are the last one in the list, it is back in the channel right away. See [Back to the channel](/docs/activity/#back-to-the-channel).

### The Activity reloads after I change Discord's theme

When you change its theme, Discord reloads the Activity on its own, sometimes up to a minute later: TTM can't stop it. The list comes back by itself in a moment, with the theme you had. If your theme was **Match Discord**, it becomes the theme you were seeing: to follow Discord again, choose **Match Discord** with the gear. See [Your settings](/docs/activity/#your-settings).

After a reload, **Exit** still takes you out of the list, but because of a Discord bug it can't close the window: close it from Discord.

## Reminders

### My reminder didn't arrive

- **The reminder goes to the task's owner.** That is you only if the task had no owner when you set it. A person gets a direct message, and a role gets a mention in the list's channel. See [The rules](/docs/reminders/#the-rules).
- **The owner must allow direct messages from server members:** click the server name, then *Privacy Settings*. After a refused message, TTM waits some hours before it writes to that person again. See [Reminders by direct message](/docs/known-limits/#reminders-by-direct-message).
- **The owner is a role that can't be mentioned.** The reminder appears in the channel, but nobody gets a notification. See [Reminders to a role](/docs/known-limits/#reminders-to-a-role).
- **The owner role was deleted.** The reminder is not sent to anyone. Choose another owner for the task. See [Reminders to a role](/docs/known-limits/#reminders-to-a-role).
- **TTM can't post in the list's channel.** If the owner is a role TTM created for several people, each of them gets the reminder by direct message, with the reason. For any other role the reminder is not delivered until an admin grants the permission. See [The permissions TTM asks for](/docs/core-concepts/#the-permissions-ttm-asks-for).
- **The owner was removed, or the list was sealed.** In these cases the reminder is gone. Before removing an owner whose reminder hasn't fired yet, TTM asks you to confirm. See [Owners and tags](/docs/owners-and-tags/) and [Seal](/docs/config-lists/#seal).
- **The task is ticked.** Completing a task stops its reminder, and a ticked task can't get a new one.

### I want a weekly reminder

TTM has no unit for weeks, so a week is 7 days. First, an admin turns on **Recurring reminders** in [`/config app`](/docs/configuration/#recurring-reminders) (Premium, unlocked during the beta).

In the channel:

1. Click **Reminder** until it turns blue, pick the task and submit the **When** form.
2. On the card that appears, press **Edit recurrence**.
3. Choose **Every** 7 and **Unit** days, and in **How many times, in total** the number of weeks, e.g. 4 for four weeks. Then submit the form.
4. Press **Save** on the card.

In the Activity, tap the task's text, then **Reminder**: the same three menus are in the panel, under the date. Choose them, then tap **Save**.

See [The repetition fields](/docs/reminders/#the-repetition-fields).

## Plans and permissions

### I can't create a list, or the bot says to free a place

During the beta, there is no limit on lists. After the beta, the Free plan lets you work on three lists at a time. When all three places are taken, TTM refuses to create, clone or import a list. The same refusal appears when you work on a list that isn't in use. To free a place, use one of these:

- **Seal list** or **Delete list**, in the **More** <img class="inline-ic" src="/icons/other.png" alt="" /> panel of a list you no longer need, in the channel. A sealed list stays in the channel as a record.
- `/config lists`, which marks the lists **in use** and can seal or delete several at once.

Premium removes this limit. See [What happens to a fourth list](/docs/premium/#what-happens-to-a-fourth-list).

### Who can seal or delete a list?

In the **More** panel of a list, only members with *Manage messages* on the channel see **Seal list** and **Delete list**. In `/config lists`, the rule of `/config` applies: by default, members with *Manage Server*. See [What's inside More](/docs/the-task-list/#whats-inside-more) and [Who can open /config](/docs/config/#who-can-open-config).

### I can't find the `/config` command

By default, only members with the *Manage Server* permission see `/config`. An admin can open it to your role in *Server Settings → Integrations → Team Tasks Manager*. See [Who can open /config](/docs/config/#who-can-open-config).

### The bot says a permission is missing

There are two different cases:

- **The bot is missing a permission.** Its message names the permission and the steps to grant it. When the bot can't post in the list's channel, the message reaches only you, and at most once an hour. What each permission is for: [The permissions TTM asks for](/docs/core-concepts/#the-permissions-ttm-asks-for).
- **You are not allowed to use a feature.** The server's admins set this rule, not the bot. See [Sync permissions](/docs/configuration/#sync-permissions).

---

Still stuck? Ask us in the [Discord server](/docs/community/). Clear steps and a screenshot help us answer quickly.
