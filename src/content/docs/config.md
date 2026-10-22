---
title: /config
description: The command for whoever runs TTM on a server — three panels for settings, lists and webhooks, and who can open them.
group: Configuration
order: 0.5
---

`/config` is the command for whoever looks after TTM on your server. It has three subcommands, each with its own job:

| Subcommand | What it's for |
| :--- | :--- |
| [`/config app`](/docs/configuration/) | How the bot behaves here: notifications, history, the `/create-list` legend, reminders, time zone and permissions. |
| [`/config lists`](/docs/config-lists/) | Every list of the server: regenerate a deleted one, seal or delete the ones you are done with. |
| [`/config webhook`](/docs/webhooks/) | Create, view, modify or delete the webhooks your tasks call when they are completed or reopened. |

The tasks themselves are never handled here: everything about a single list lives in its buttons. See [The task list panel](/docs/the-task-list/).

## Who can open /config

By default, only members with the *Manage Server* permission see `/config`. That covers `/config app`, `/config lists` and `/config webhook` alike.

An admin can open it to other roles or members, or close it on some channels. Do it in *Server Settings → Integrations → Team Tasks Manager*, on the `/config` command. Discord sets these rules for the whole command, not for each subcommand: whoever can open `/config` can use all its panels.

The permissions you sync with **Load permissions** in `/config app` apply to your lists, not to `/config`. See [Sync permissions](/docs/configuration/#sync-permissions).
