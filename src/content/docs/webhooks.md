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

| Option | Required? | Values | Notes |
| :--- | :--- | :--- | :--- |
| **action** | Required | view · create · modify · delete | What you want to do. |
| **webhook** | Required | a name | The webhook to act on, up to 100 characters. |
| **trigger** | Optional | completion · reopen | Omit it to act on **both** directions at once. |

Choosing **create** (or **modify**) opens a form with four fields:

- **HTTP method** — `GET`, `POST`, `PUT` or `DELETE`.
- **URL** — a public `https` address.
- **Headers** — one `Key: value` per line.
- **Body** — JSON.

A webhook is really a **pair of actions** — one for completion, one for reopen — under a single name. That's what the trigger picks.

<div class="callout"><div class="callout-t">The trigger is optional on purpose</div>Omit it and one command covers both directions: <strong>create</strong> sets up completion and reopen with the same configuration (the <code>{{state}}</code> and <code>{{when}}</code> tokens tell the two events apart), <strong>view</strong> prints both, and <strong>delete</strong> removes the webhook entirely, with all its actions. <strong>Modify</strong> pre-fills from the completion action and overwrites both.</div>

Each server can keep up to **25** webhooks. Reached the ceiling? Delete one you no longer use — TTM lists them all in the error.

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

Creating a webhook doesn't wire it to anything yet. Open the list, click **Webhook** <img class="inline-ic" src="/icons/api.png" alt="" /> on the second button row until it turns **blue**, pick the webhook from the selector and then the task. From then on, completing or reopening that task fires the call. Click **Webhook** until it turns **red** and pick the task to remove the association.

The association is stored **in the task itself**, as a reserved token: in **Bulk update** you'll see it in front of the task text.

```
- [] {{wb=deploy}} Ship the release notes
```

You can move it, copy it onto another task or delete it by hand, exactly like a mention — the token never shows up in the rendered list, and `wb` is the only reserved key (every other `{{key=value}}` is a free variable, see below).

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
