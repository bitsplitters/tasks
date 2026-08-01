---
title: Configuration
description: Tailor notifications, history, time zone and permissions with /config app.
group: Using the bot
order: 6
---

Run the command:

```
/config app
```

TTM opens a private panel with a summary of your current settings, four dropdowns and three buttons. Nothing here is permanent — change it whenever your team's needs change.

## Notification mode

Controls how much notification noise the bot leaves in the channel when tasks are selected:

| Option | Behaviour |
| :--- | :--- |
| Keep last only | Delete all notifications except the most recent one. |
| Keep last two | Delete all except the last two. |
| Keep all | Never delete notifications. |
| Disabled | Don't post task-selection notifications at all. |

## History tracking

When enabled, **every action on your lists is recorded in a dedicated thread**, giving you an audit trail of who did what and when. Off by default.

## Push notification

When enabled, TTM adds plain text alongside embeds so your **mobile push notifications** are readable at a glance (embeds alone often show up empty on a lock screen).

## Behavior on selection

After you use **owner**, **tag** or **reminder**, this decides whether the button **resets** to its neutral state or **keeps** the active mode — handy when you are applying the same action to several tasks in a row.

## Recurring reminders

Off by default. When it's off, every reminder is a **single event**: creating or editing one is a **one-step flow** — you pick the date and time, nothing else. Simpler and quicker for teams that just need a one-off ping.

Turn it **on** to unlock **repetitions and intervals**: reminder creation then uses the two-step flow (a summary screen plus a repetition dialog). See [Reminders](/docs/reminders/) for the repetition fields.

A reminder that is *already* recurring stays fully editable — with its repetitions and interval — even while the toggle is off, so existing schedules are never lost.

## Time zone

Sets the time zone your team works in (reminders can still use their own). Click the button, then paste an official zone name — look it up on the **[time zone map](https://timezones.bitsplitters.app)**.

## Sync permissions

By default, Discord's integration permissions only hide *commands* — the generated buttons and lists stay usable by everyone. Click **Load permissions** to extend your permission rules to those components too. After syncing, **users who aren't allowed see the list as read-only**.

Define the rules in *Server Settings → Integrations → Team Tasks Manager*, then sync.

## Webhooks

Opens the webhook overview, where you can review configured webhooks and get the exact command to create one. See the full [Webhooks](/docs/webhooks/) guide.
