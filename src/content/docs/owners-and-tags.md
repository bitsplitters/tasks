---
title: Owners and tags
description: Who a task belongs to, who it mentions, and the roles TTM creates when several people own a task.
group: Using the bot
order: 3.5
---

A task can have one **owner** and several **tags**. The owner is who the task belongs to: who can tick it, and who gets its reminder. Tags are the users and roles mentioned on the task, for example the people to notify when it is completed. You set both with the **Owner** <img class="inline-ic" src="/icons/owner.png" alt="" /> and **Tag** <img class="inline-ic" src="/icons/tag.png" alt="" /> buttons, in the [second row](/docs/the-task-list/#row-2--acts-on-a-single-task) under the list.

## Two ways to tag

How **Tag** behaves depends on one setting: **Behavior on selection** in [/config app](/docs/configuration/#behavior-on-selection). It decides whether the task buttons *reset* after each action or *keep* their active mode. Tag works very differently in the two cases:

- with **Reset status after selection** (the default), tagging always **overwrites**;
- with **Keep status after selection**, you also get a second mode, **live editing**.

### With Reset status after selection — the default

The button resets after every action, and Tag has one behavior: it **always overwrites**. Turn Tag blue, choose up to 25 users or roles in the menu that appears under the buttons, then pick the task.

For example, you choose *Anna* and *@Devs*. The task is now tagged Anna and @Devs, and nothing else. Your choice **replaces** the whole set: it doesn't add to it. Anyone tagged before that you didn't pick again is removed.

You must pick people **before** the task. If you pick a task with the menu empty, TTM shows an error: select at least one tag first.

### With Keep status after selection — two modes

Now the button stays active after each action. What Tag does depends on one question: **did you pick people before the task?**

- **People first** means **assign**.
- **Task first**, with the menu still empty, means **live editing**.

**Assign — pick people, then the task.** It works like the overwrite above: you choose the users or roles, you pick the task, and its tags become exactly your choice. The button stays active, so your picks stay in the menu too. You can apply the same set to the next task, and the next, without choosing again.

**Live editing — pick the task, menu empty.** Turn Tag blue and pick the task you want to re-tag, without choosing anyone. This is not a mistake: the task's current tags load into the menu, already ticked. Now you edit that task directly:

- each time you close the menu, the task updates at once;
- untick someone and they leave the task; tick someone and they join it;
- there is no confirmation step, and nothing is overwritten: you adjust the existing set;
- untick everyone to remove all tags.

If you pick a different task, the editing moves there. Turn Tag off (grey) to finish: the next activation starts fresh.

On desktop, you close the menu by clicking outside it: see [Confirming a tag selection](/docs/the-task-list/#confirming-a-tag-selection--desktop-vs-mobile).

## Owner: a person, a role, or several people

The owner is who a task belongs to: who can tick it, and who gets its reminder. You pick it in the owner menu:

- **One person** — they own the task, and its reminder reaches them by direct message.
- **One role** — everyone with that role owns the task, and any of them can tick it. Its reminder is a message in the list's channel that mentions the role.
- **Several people** — TTM creates a role for them, gives it to exactly those people and makes it the owner. From then on, it works like any role owner. This is a Premium feature, unlocked for every server during the beta: see [What Premium unlocks](/docs/premium/).

You can't mix people and roles, and you can pick one role at most: a task has one owner.

To give a task to several people:

1. Click **Owner** until it turns blue: a menu appears under the buttons, labelled *Choose one or more people, or a role, then the task*.
2. Pick the people.
3. Confirm the selection: tap **Save** on mobile, or click outside the menu on desktop.
4. Pick the task in the check selector.
5. TTM creates the role (TTM1, TTM2…) and gives it to them.

For this, the bot needs the *Manage Roles* permission: see [What it needs](#what-it-needs).

The owner menu works like the Tag menu (see [Two ways to tag](#two-ways-to-tag)):

- With **Reset status after selection**, pick the owner, then the task.
- With **Keep status after selection**, you can also **pick the task first**, with the menu empty. Its owner loads into the menu. For a role TTM created, the menu shows the people it gave the role to. Every change you confirm applies to that task at once. If you empty the menu, the owner is removed, and its reminder too, as in red mode.

How the reminder reaches a person or a role: see [How the reminder arrives](/docs/reminders/#how-the-reminder-arrives).

## The roles TTM creates

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
- With **Keep status after selection**, the same selection on several tasks in a row reuses the role created for the first task.

### When a role stops being TTM's

TTM remembers the roles it creates and the people it gave them to. A role stays TTM's only while it looks the way TTM left it:

- the same name;
- no permissions, neither on the server nor on a channel;
- the same number of members.

Rename it, give it a permission, add it to a channel's permissions, or add or remove a member: it becomes one of your server's roles. TTM checks this before it deletes a role, and when the owner menu loads the role's people. A role that is no longer TTM's is never deleted, and the menu shows the role instead of the people.

So, to keep a role for your server, **rename it**. Then you can use it anywhere. A new colour or a new position is not enough: TTM would still delete the role when no list uses it any more.

TTM can see *how many* members a role has, but not *who* they are. So if you swap one member for another, TTM can't tell: the owner menu keeps showing the people TTM gave the role to.

### When TTM deletes a role

TTM deletes a role it created, from the server too, when both of these are true:

- **no list uses it any more**, as owner or as tag, and no command permission uses it;
- it still looks like TTM's.

TTM checks every ten minutes, and it never touches a role created less than ten minutes ago. Some roles always stay:

- the roles of a **sealed** list, because the sealed message still shows them;
- every role TTM created, when the bot is **removed** from a server.

## Where to go next

- [The task list panel](/docs/the-task-list/) — every button under the list.
- [Reminders](/docs/reminders/) — the reminder form, and how a reminder reaches a person or a role.
- [Personalize your lists](/docs/personalize-your-lists/#owners-the-mention-with-a-colon) — how owners and tags look in Bulk update.
- [Something not working?](/docs/troubleshooting/) — quick answers to the most common problems.
