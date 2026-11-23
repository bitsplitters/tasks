---
title: /config webhook
description: Fire an HTTP call when a task is completed or reopened — connect TTM to anything.
group: Configuration
order: 3
premium: true
---

Webhooks let a task talk to the outside world. Associate one with a task: when that task is **completed** or **reopened**, TTM sends an HTTP request you defined. It can go to a CI system, a chat, a spreadsheet automation, or anything else that accepts a call.

Webhooks are a **Premium** feature, unlocked for every server during the beta. After the beta, on the Free plan the webhooks you already have stay, and you can still change or delete them, but you can't create new ones: see [What Premium unlocks](/docs/premium/).

By default, only members with the *Manage Server* permission can use `/config webhook`, like the rest of `/config`. See [Who can open /config](/docs/config/#who-can-open-config).

## Creating a webhook

```
/config webhook
```

The command takes a few options:

| Option | Required? | Values | Notes |
| :--- | :--- | :--- | :--- |
| **action** | Required | view · create · modify · delete | What you want to do. |
| **webhook** | Required | a name | The webhook to act on, up to 96 characters. |
| **trigger** | Optional | completion · reopen | Omit it to act on **both** directions at once. |

Choosing **create** (or **modify**) opens a form with four fields:

- **HTTP method** — `GET`, `POST`, `PUT` or `DELETE`.
- **URL** — a public `https` address.
- **Headers** — one `Key: value` per line.
- **Body** — JSON.

A webhook is really a **pair of actions** — one for completion, one for reopen — under a single name. That's what the trigger picks.

<div class="callout"><div class="callout-t">The trigger is optional on purpose</div>Omit it and one command covers both directions. <strong>Create</strong> sets up completion and reopen with the same configuration: the <code>{{state}}</code> and <code>{{when}}</code> tokens tell the two events apart. <strong>View</strong> prints both, and <strong>delete</strong> removes the webhook entirely, with all its actions. <strong>Modify</strong> pre-fills from the completion action and overwrites both.</div>

Webhooks are a [Premium](/docs/premium/) feature, and during the beta they are unlocked for everyone. On the Free plan you can't create new ones, but the ones created during the beta stay: see [What a beta list keeps](/docs/beta/#what-a-beta-list-keeps). Each server can keep up to **25** webhooks. Reached the ceiling? Delete one you no longer use — TTM lists them all in the error.

## Tokens

Inside the URL, headers and body you can drop `{{ }}` tokens that TTM replaces at send time.

In the body, a token goes inside a JSON string, between quotes. TTM escapes the value, so a task with quotes or a line break still sends valid JSON. In the URL, each value is percent-encoded: a space becomes `%20`.

**Built-in tokens**

| Token | Value |
| :--- | :--- |
| `{{task}}` | The task text |
| `{{state}}` | State — completed or reopened |
| `{{list}}` | The list title |
| `{{user}}` / `{{user_id}}` | Name / id of whoever toggled the task |
| `{{when}}` | Date and time (ISO-8601) |
| `{{guild}}` / `{{guild_id}}` | Server name / id |
| `{{channel}}` / `{{channel_id}}` | Channel name / id |

**Free variables** — define `{{key=value}}` anywhere in a task's text and reference `{{key}}` in the webhook. Unknown tokens simply resolve to an empty string.

## Associating a webhook with a task

Creating a webhook doesn't wire it to anything yet: you link it to a task with **Webhook** <img class="inline-ic" src="/icons/api.png" alt="" />, in blue to link it and in red to remove it. From then on, completing or reopening that task fires the call. Where to press: [How to do it](#how-to-do-it), at the bottom.

The link is stored **in the task itself**, as the reserved token `{{wb=…}}`, which you see in **Bulk update** and in **Edit the list**: see [Webhooks in the text](/docs/writing-a-list/#webhooks-in-the-text). The **Content** form of a single task doesn't show the token, and removes one you type there, telling you.

## When a webhook fires

A webhook fires when its task is **completed or reopened**, by a tick or by **Reopen all**. You tick in the channel with the check selector, the drop-down menu under the list, and in the Activity with the box of the task. In detail:

- **every task that changes** fires its webhook: the one you picked and the ones that change with it, subtasks ticked in cascade or a group completed by its last subtask. A subtask that was already ticked doesn't change, so it doesn't fire;
- the calls go out **one after the other**, in the order of the list, and the whole tick counts as **one click**, however many tasks it changes;
- **Reopen all** fires the reopening webhooks of the tasks it reopens. **Bulk update** and **Edit the list** change many tasks at once and fire **no** webhook;
- **the list must be in use**, holding one of the places of your plan. How a list takes a place: see [How the three places work](/docs/premium/#how-the-three-places-work). A list created during the beta is the exception: its tasks can still be ticked without a place. Their webhooks stay silent until the list takes one. TTM tells you so privately.

## When a webhook fails

If the call doesn't reach its destination, TTM writes a warning in the list's channel. It names the webhook and the task, then explains the error in one sentence. It also says what to check: the address, the headers, the method, or the server you are calling. When the same webhook is on several tasks that change together, you get one warning, not one per task.

If notifications are off on the server, or TTM can't post in that channel, the warning reaches only whoever ticked the task.

In the Activity, the warning reaches whoever ticked the task, in a bubble on its box.

## Example

A `POST` that announces a completion:

```
Method: POST
URL:     https://example.com/hooks/ttm
Headers: Content-Type: application/json
Body:
{
  "text": "{{user}} {{state}} \"{{task}}\" in {{list}}",
  "at": "{{when}}"
}
```

## Security

For everyone's safety, TTM only accepts **public `https` URLs**. Internal or non-routable destinations — `localhost`, private IP ranges, link-local addresses — are blocked. The body must be valid JSON, and every header line must follow the `Key: value` format.

<div class="howto" id="how-to-do-it"><div class="howto-t">How to do it</div><div class="howto-grid"><a class="howto-go is-channel" href="/docs/channel-tasks/#webhook"><span class="howto-k"><img class="place-ic" src="/icons/posto-canale.svg" alt="" />In the channel</span><span class="howto-d">Webhook, in the second row under the list: pick the webhook, then the task.</span></a><a class="howto-go is-activity" href="/docs/activity-list/#webhook"><span class="howto-k"><img class="place-ic" src="/icons/activity.png" alt="" />In the Activity</span><span class="howto-d">Webhook, in the panel of a task: the server's webhooks by name.</span></a></div></div>
