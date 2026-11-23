---
title: Webhooks
description: Fire an HTTP call when a task is completed or reopened — connect TTM to anything.
group: Features
order: 3.5
premium: true
---

Webhooks let a task talk to the outside world. Link one to a task: when that task is **completed** or **reopened**, TTM sends an HTTP request. It can go to a CI system, a chat, a spreadsheet automation, or anything else that accepts a call.

Whoever manages the server creates the webhooks with [/config webhook](/docs/config-webhook/): the address, the method, what the call sends. Then you link them to tasks with the **Webhook** button.

Webhooks are a [Premium](/docs/premium/) feature.

<div class="howto" id="how-to-do-it"><div class="howto-t">How to do it</div><div class="howto-grid"><a class="howto-go is-channel" href="/docs/channel-tasks/#webhook"><span class="howto-k"><img class="place-ic" src="/icons/posto-canale.svg" alt="" />In the channel</span><span class="howto-d">Webhook, in the second row under the list: pick the webhook, then the task.</span></a><a class="howto-go is-activity" href="/docs/activity-list/#webhook"><span class="howto-k"><img class="place-ic" src="/icons/activity.png" alt="" />In the Activity</span><span class="howto-d">Webhook, in the panel of a task: the server's webhooks by name.</span></a></div></div>

## Associating a webhook with a task

A new webhook isn't linked to anything yet. You link it to a task with **Webhook** <img class="inline-ic" src="/icons/api.png" alt="" />: in blue to link it, in red to remove it.

From then on, completing or reopening that task fires the call.

## When a webhook fires

A webhook fires when its task is **completed or reopened**, by a tick or by **Reopen all**. In the channel you tick with the check selector, the drop-down menu under the list. In the Activity you tick the box of the task.

- **Every task that changes** fires its webhook: the one you picked, and the ones that change with it. These are subtasks ticked in cascade, or a group completed by its last subtask. A subtask that was already ticked doesn't change, so it doesn't fire.
- The calls go out **one after the other**, in the order of the list. The whole tick counts as **one click**, however many tasks it changes.
- **Reopen all** fires the reopening webhooks of the tasks it reopens.
- **Bulk update** and **Edit the list** change many tasks at once, and fire **no** webhook.
- **The list must be in use**, holding one of the places of your plan: see [How the three places work](/docs/premium/#how-the-three-places-work).

A list created during the beta is the exception: its tasks can still be ticked without a place. Their webhooks stay silent until the list takes one, and TTM tells you so privately.

## When a webhook fails

If the call doesn't reach its destination, TTM writes a warning in the list's channel. It names the webhook and the task, then explains the error in one sentence. It also says what to check: the address, the headers, the method, or the server you are calling.

When the same webhook is on several tasks that change together, you get one warning, not one per task.

If notifications are off on the server, or TTM can't post in that channel, the warning reaches only whoever ticked the task. In the Activity, the warning reaches whoever ticked the task, in a bubble on its box.

## The webhook in the text

The link lives in the task itself, as the reserved token `{{wb=…}}`. You see it in **Bulk update** and in **Edit the list**: see [Webhooks in the text](/docs/writing-a-list/#webhooks-in-the-text).

The **Content** form of a single task doesn't show the token, and removes one you type there, telling you.

A task's text can also carry **free variables**: write `{{key=value}}` anywhere in it, and the webhook can use `{{key}}`. So one webhook can send different values for each task. See [Tokens](/docs/config-webhook/#tokens).
