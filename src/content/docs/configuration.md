---
title: /config app
description: Tailor notifications, history, reminders, time zone and permissions with /config app.
group: Configuration
order: 1
---

Run the command:

```
/config app
```

TTM opens a private panel with a summary of your current settings: the **Tips** button first, then five dropdowns and two more buttons. Nothing here is permanent — change it whenever your team's needs change.

By default, only members with the *Manage Server* permission can use `/config app`, like the rest of `/config`. See [Who can open /config](/docs/config/#who-can-open-config).

The settings apply to the lists in the channel and in the [Activity](/docs/activity/) alike. Where one counts in a single place, or works differently in the two, its section says so.

## Tips

The first group of the panel is a button that shows whether tips are on: green with **On** when they are, grey with **Off** when they aren't. Click it to switch them. Tips count in the channel and in the Activity.

Tips are help for whoever is new to TTM, in four places:

- when someone runs `/create-list`, a short explanation of how to write a list and an invite to try Activity mode, with the **Create your list** and **Tutorial** buttons: the new list takes the place of the explanation;
- under every list in the channel, a small line that points to the guide in Discord: *Not sure what the buttons do? More → Guide*, with a link to [The list in the channel](/docs/the-task-list/);
- under the list in the Activity, a line that says where to tap: *Not sure where to start? Tap a box to tick a task, tap its text for the rest.* See [Working on a list in the Activity](/docs/activity-list/);
- in a new list, the first notification in the channel ends with a short explanation: why TTM posts notifications, what the history thread is, and where to set them up. It appears once per list: see [When a list is created](#when-a-list-is-created).

On by default: handy while the team is learning the buttons, easy to switch off once everyone knows them. With tips hidden, `/create-list` opens the creation form straight away, one step fewer, lists end without the line, and new lists post their first notification without the explanation. Turning Tips off also removes the **Tutorial** button, which lives in the same explanation: see [Getting started](/docs/getting-started/#2-create-your-first-list). A list picks up the change the next time it's updated. A locked list still ends with a line that says who is editing it: see [When the list is locked](/docs/the-task-list/#when-the-list-is-locked). The [progress bar](/docs/the-task-list/#under-the-list) stays either way.

## Notification mode

Controls how much notification noise the bot leaves in the channel when tasks are selected:

| Option | Behaviour |
| :--- | :--- |
| Keep last only | Delete all notifications except the most recent one. |
| Keep last two | Delete all except the last two. |
| Keep all | Never delete notifications. |
| Disabled | Don't post task-selection notifications at all. |

When a tick completes the whole list, its notification says **List completed** under who ticked it, and so does the [history thread](#history-tracking).

In the Activity, ticks post no notification one by one: when the list goes back to the channel, the summary of the session follows this setting. See [Back to the channel](/docs/activity/#back-to-the-channel).

### When a list is created

A new list posts its own notification under it: *I created the list*, with a link to the list. It comes from `/create-list`, the Tutorial, an import from a file, a clone and **New list** in the Activity. A clone posts it in the new channel, and the channel of the original list gets the usual notification of the clone. With the mode **Disabled**, nothing is posted in the channel, but the history thread still records the creation.

With [Mention owners in new lists](#mention-owners-in-new-lists) on, the notification mentions the owners of the tasks, so Discord notifies them. A list created in the Activity mentions them in the summary that follows it back to the channel.

With [Tips](#tips) on, the first notification of a new list ends with an explanation: why TTM posts notifications and, with history tracking on, what the thread is. It appears once per list, and only if tips and notifications were both on when the list was created: a team that switched one of them off already knows its way around. Lists created before this explanation came don't show it.

## History tracking

When enabled, **every action on your lists is recorded in a dedicated thread**, giving you an audit trail of who did what and when. On by default. The thread starts with the list: its first line says who created it. Lists in voice channels have no history thread, because Discord doesn't allow threads there: see [Voice channels](/docs/known-limits/#voice-channels). A session in the Activity goes in the thread in full, one line per change, when the list goes back to the channel.

## Behavior

One dropdown with three options: **Readable push notifications**, **Keep the state after a selection** and **Mention owners in new lists**. They decide what TTM does when someone acts on a list. Tick the ones you want on: you can tick all three, some, or none.

### Readable push notifications

When on, TTM adds plain text alongside embeds, so your **mobile push notifications** are readable at a glance. Embeds alone often show up empty on a lock screen. On by default. Turning it off never stops a reminder: it arrives with just its card — or, for a role, just the mention. The mentions of owners still go out with it off, on their own.

### Keep the state after a selection

Only in the channel. After you use **Owner**, **Tag** or **Reminder** in the second row under the list, this decides whether the button goes back to grey or **keeps** the active mode. Off by default: the button goes back to grey. Turn it on when you apply the same action to several tasks in a row.

It also changes what **Tag** and **Owner** can do. With it off, your choice always overwrites. With it on, you also get live editing of a task's existing tags or owner. See [Tag](/docs/channel-tasks/#tag) for the full breakdown.

In the Activity the panel of a task always works the same way: after an action it stays on the task, with the buttons grey. See [The panel of a task](/docs/activity-list/#the-panel-of-a-task).

### Mention owners in new lists

When someone creates, imports or clones a list, its first notification mentions the owners of its tasks: people and roles, each once, in the order of the list. The mentions go in the plain text of the notification, so Discord notifies the owners. Whoever created the list isn't mentioned: they already know. Neither is @everyone, even when it owns a task: a new list doesn't notify the whole server.

On by default, also on servers that added TTM before this option came. A list created inside an Activity session mentions its owners in the summary, when it goes back to the channel. See [When a list is created](#when-a-list-is-created).

## List appearance

One dropdown with two options: **Completed tasks dimmed** and **Space around groups**. They decide how tasks look in lists. Tick the ones you want on: both, one, or none. A list already in a channel picks up the change the next time it's updated, for example when someone ticks a task.

Both change the list in the channel. In the Activity each person sets their own look with the gear: see [Your settings](/docs/activity/#your-settings).

### Completed tasks dimmed

Shows every completed task in Discord's smaller, grey text, so what is still to do stands out. On by default; switch it off to show completed tasks like all the others. A list picks up the change the next time it's updated.

### Space around groups

Puts a blank line above and below every task that has subtasks, so each group stands apart from the rest of the list. Off by default, for a more compact list: servers that added TTM before version 2.0.0 have it on until an admin switches it off. It changes only the list itself: notifications stay as they are. Discord has no thinner blank line for a list, so the choice is between a full line and none.

## Recurring reminders

Off by default. When it's off, every reminder is a **single event**: creating or editing one is a **one-step flow** — you pick the date and time, nothing else. Simpler and quicker for teams that just need a one-off ping.

Turn it **on** to unlock **repetitions and intervals**. In the channel, reminder creation then uses the two-step flow: a [summary card](/docs/channel-tasks/#the-summary-card) plus a repetition dialog. In the Activity, the repetition menus join the date in the [reminder panel](/docs/activity-list/#reminder). See [The repetition fields](/docs/reminders/#the-repetition-fields).

Recurring reminders are a **Premium** feature (see [What Premium unlocks](/docs/premium/)). The title of the group carries the Premium emoji on every server, Premium included: it marks a Premium feature, not a missing one. On the Free plan this dropdown is shown but switched off. Its note says: *"Recurring reminders are a Premium feature: on the Free plan every reminder is a single event. The recurring ones created before keep working."* Your choice isn't lost: on Premium the dropdown comes back set the way you left it.

A reminder that is *already* recurring keeps firing even while the toggle is off, or on the Free plan. What you can still change: see [Repeating reminders](/docs/reminders/#repeating-reminders).

## Time zone

Sets the time zone your team works in. Members can still use their own for reminders: until they choose one, TTM proposes the zone of their Discord language, and this one only when their language is spoken across several zones, such as English (US). See [Your time zone](/docs/reminders/#your-time-zone). Click the button, then paste an official zone name — look it up on the **[time zone map](https://timezones.bitsplitters.app)**.

## Sync permissions

By default, Discord's integration permissions only hide *commands* — the generated buttons and lists stay usable by everyone. Click **Load permissions** to extend your permission rules to those components too. After syncing, **users who aren't allowed see the list as read-only**.

Define the rules in *Server Settings → Integrations → Team Tasks Manager*, then sync. Channel restrictions are honoured as well: if a channel is off-limits for a user, the lists living there are read-only for them. The **Activity** button under the list follows the same rules: see [When the list doesn't open](/docs/activity/#when-the-list-doesnt-open).

<div class="callout"><div class="callout-t">Webhooks live in their own command</div>Webhooks are not configured from this panel: use <a href="/docs/config-webhook/"><code>/config webhook</code></a>. What they do: see <a href="/docs/webhooks/">Webhooks</a>.</div>

<div class="callout"><div class="callout-t">Looking for your lists?</div>This panel holds <em>settings</em> — how the bot behaves. To see the lists this server has, and to delete, seal or regenerate one, use <code>/config lists</code>: see <a href="/docs/config-lists/">/config lists</a>.</div>
