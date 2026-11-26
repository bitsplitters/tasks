---
title: Owners and tags
description: Who a task belongs to, who it mentions, and the roles TTM creates when several people own a task.
group: Features
order: 2
---

A task can have one **owner** and several **tags**. The owner is who the task belongs to: who can tick it, and who gets its reminder. Tags are the users and roles mentioned on the task, for example the people to notify when it is completed.

You set both with the **Owner** <img class="inline-ic" src="/icons/owner.png" alt="" /> and **Tag** <img class="inline-ic" src="/icons/tag.png" alt="" /> buttons: in the channel, in the second row under the list; in the Activity, in the panel of a task.

<div class="howto" id="how-to-do-it"><div class="howto-t">How to do it</div><div class="howto-grid"><a class="howto-go is-channel" href="/docs/channel-tasks/#owner"><span class="howto-k"><img class="place-ic" src="/icons/posto-canale.svg" alt="" />In the channel</span><span class="howto-d">Owner and Tag, in the second row under the list.</span></a><a class="howto-go is-activity" href="/docs/activity-list/#owner"><span class="howto-k"><img class="place-ic" src="/icons/activity.png" alt="" />In the Activity</span><span class="howto-d">Owner and Tag, in the panel of a task.</span></a></div></div>

## Owner: a person, a role, or several people

The owner is who a task belongs to: who can tick it, and who gets its reminder. It can be:

- **One person** — they own the task, and its reminder reaches them by direct message.
- **One role** — everyone with that role owns the task, and any of them can tick it. Its reminder is a message in the list's channel that mentions the role.
- **Several people** — TTM creates a role for them and makes it the owner. This is a [Premium](/docs/premium/) feature.

You can't mix people and roles, and you can pick one role at most: a task has one owner.

**A task for several people** works like a task owned by a role. The role is called TTM1, TTM2 and so on, and only the people you picked have it. TTM needs the *Manage Roles* permission to create it: see [The roles TTM creates](#the-roles-ttm-creates).

**To take a task yourself**, in the channel: click **Owner** until it turns blue, then pick the task without choosing anyone. It works on a task with no owner. A task that already has one changes only if you choose yourself in the menu: see [Owner](/docs/channel-tasks/#owner).

**Whoever gets a task from someone else is mentioned** in the notification in the channel, so Discord notifies them: a person, or everyone in the role. In the Activity, the mention arrives with the summary at the end of the session.

**Removing the owner removes its reminder too**, because nobody is left to receive it. If the reminder hasn't fired yet, TTM asks you to confirm first.

How the reminder reaches a person or a role: see [How the reminder arrives](/docs/reminders/#how-the-reminder-arrives). Who can tick a task with an owner: see [Who can tick a task](/docs/core-concepts/#who-can-tick-a-task).

## Tags

A tag is a user or a role mentioned on the task. A task can carry **up to 25 tags**, people and roles together. Tags don't change who can tick the task: they say who should know about it.

A new choice of tags **replaces** the old one: the task is tagged with exactly the people and roles you chose. To add someone, keep the others in your choice. Removing the tags removes all of them at once.

How you choose them differs a little between the two places. In the channel, a setting of the server decides whether you overwrite the tags or edit them live: see [Tag](/docs/channel-tasks/#tag). In the Activity you always start from the tags the task has now: see [Tag](/docs/activity-list/#tag).

**Tagging yourself** takes one click in both places, and leaves the other tags as they are. In the channel, **Tag** blue and the task, with the menu empty: a second time on the same task removes you. In the Activity, **Tag** and **Save**: your name is already added.

In the text of a list, a tag is `@` and the name, such as `@Ava`, and the owner is the same name followed by a colon, `@Ava:`: see [Editing a list by hand](/docs/writing-a-list/#owners-the-mention-with-a-colon).

## The roles TTM creates

This part is for whoever manages the server: what TTM does with the roles it creates for tasks of several people, what it needs, and when it deletes them.

When you give a task to several people, TTM:

- creates a role called **TTM** followed by the first free number: TTM1, TTM2, and so on. The role is **mentionable**, has **no permissions**, and sits at the bottom of the role list;
- gives the role to the people you picked, one at a time;
- makes the role the owner of the task.

### What it needs

The bot needs the *Manage Roles* permission, and the invite link includes it. Without it, TTM neither creates nor deletes roles. On a server that added the bot before, an admin may have to grant it to the bot's role. Do it in *Server Settings → Roles*, not on a channel.

On a channel, Discord shows the same permission as *Manage Permissions*. There it does something else: it lets a role change that channel's permissions.

A server can have at most **250 roles**: this is a Discord limit. When the server reaches it, TTM can't create the role, and it says so.

Giving the role also takes time. Discord lets a bot do it ten times every ten seconds, so 25 people take about twenty seconds. With more than ten people, TTM tells you how long it will take.

### When TTM creates a new role

**TTM never changes a role once it has created it.**

- Picking different people, even one more or one less, creates a new role.
- Picking exactly the same people as the current owner changes nothing.
- In the channel, with **Keep the state after a selection** on, the same selection on several tasks in a row reuses the role created for the first task.

### When a role stops being TTM's

TTM remembers the roles it creates and the people it gave them to. A role stays TTM's only while it looks the way TTM left it:

- the same name;
- no permissions, neither on the server nor on a channel;
- the same number of members.

Rename it, give it a permission, add it to a channel's permissions, or add or remove a member: it becomes one of your server's roles.

TTM checks this before it deletes a role, and when it shows a task's owner to change it. A role that is no longer TTM's is never deleted, and the owner choice shows the role instead of the people.

So, to keep a role for your server, **rename it**. Then you can use it anywhere. A new colour or a new position is not enough: TTM would still delete the role when no list uses it any more.

TTM can see *how many* members a role has, but not *who* they are. So if you swap one member for another, TTM can't tell: it keeps showing the people it gave the role to.

### When TTM deletes a role

TTM deletes a role it created, from the server too, when both of these are true:

- **no list uses it any more**, as owner or as tag, and no command permission uses it;
- it still looks like TTM's.

TTM checks every ten minutes, and it never touches a role created less than ten minutes ago. Some roles always stay:

- the roles of a **sealed** list, because the sealed message still shows them;
- every role TTM created, when the bot is **removed** from a server.
