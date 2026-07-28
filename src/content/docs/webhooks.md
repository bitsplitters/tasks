---
title: Webhooks
description: Fire an HTTP call when a task is completed or reopened — connect TTM to anything.
group: Using the bot
order: 7
---

Webhooks let a task talk to the outside world. Associate one with a task and, when that task is **completed** or **reopened**, TTM sends an HTTP request you defined — to a CI system, a chat, a spreadsheet automation, anything that accepts a call.

## Creating a webhook

```
/config webhook
```

The command takes a few options:

| Option | Values | Notes |
| :--- | :--- | :--- |
| **action** | view · create · modify · delete | What you want to do. Required. |
| **webhook** | a name | The webhook to act on. Required. |
| **trigger** | completion · reopen | *Optional.* Omit it to act on **both** directions at once. |

Choosing **create** (or **modify**) opens a form with four fields:

- **HTTP method** — `GET`, `POST`, `PUT` or `DELETE`.
- **URL** — a public `https` address.
- **Headers** — one `Key: value` per line.
- **Body** — JSON.

<div class="callout"><div class="callout-t">The trigger is optional on purpose</div>Omit it and <strong>create</strong> sets up both completion and reopen with the same configuration — the <code>{{state}}</code> and <code>{{when}}</code> tokens tell the two events apart. <strong>Modify</strong> pre-fills from the completion action and overwrites both.</div>

## Tokens

Inside the URL, headers and body you can drop `{{ }}` tokens that TTM replaces at send time.

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

Creating a webhook doesn't wire it to anything yet. Open the list, use the **Webhook** control <img class="inline-ic" src="/icons/api.png" alt="" /> on the second button row (or the 🔗 control on the task) and pick the webhook. From then on, completing or reopening that task fires the call.

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
