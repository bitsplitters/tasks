---
title: /config webhook
description: Create the webhooks of your server — the HTTP call, the tokens it can carry, and the addresses TTM accepts.
group: Configuration
order: 3
premium: true
---

`/config webhook` creates the webhooks of your server: the HTTP call that a task sends when it is completed or reopened. What a webhook does, and how to link it to a task: see [Webhooks](/docs/webhooks/).

By default, only members with the *Manage Server* permission can use `/config webhook`, like the rest of `/config`. See [Who can open /config](/docs/config/#who-can-open-config).

Webhooks are **Premium**, unlocked for every server during the beta. After the beta, on the Free plan the webhooks you already have stay, and you can still change or delete them, but you can't create new ones: see [What a beta list keeps](/docs/beta/#what-a-beta-list-keeps).

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

Choosing **create** or **modify** opens a form with four fields:

- **HTTP method** — `GET`, `POST`, `PUT` or `DELETE`.
- **URL** — a public `https` address.
- **Headers** — one `Key: value` per line.
- **Body** — JSON.

A webhook is really a **pair of actions**, one for completion and one for reopen, under a single name. The trigger picks one of them. Leave it out, and one command covers both:

| Action | Without a trigger |
| :--- | :--- |
| **create** | Sets up completion and reopen with the same configuration. The `{{state}}` and `{{when}}` tokens tell the two events apart. |
| **view** | Prints both. |
| **modify** | Pre-fills from the completion action, and overwrites both. |
| **delete** | Removes the webhook entirely, with all its actions. |

Each server can keep up to **25** webhooks. Reached the ceiling? Delete one you no longer use: TTM lists them all in the error.

A new webhook isn't linked to any task yet: see [Associating a webhook with a task](/docs/webhooks/#associating-a-webhook-with-a-task).

## Tokens

Inside the URL, the headers and the body you can drop `{{ }}` tokens, which TTM replaces at send time.

In the body, a token goes inside a JSON string, between quotes. TTM escapes the value, so a task with quotes or a line break still sends valid JSON.

In the URL, each value is percent-encoded: a space becomes `%20`.

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

**Free variables** — define `{{key=value}}` anywhere in a task's text, and reference `{{key}}` in the webhook. Unknown tokens simply resolve to an empty string.

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

For everyone's safety, TTM only accepts **public `https` URLs**. Internal or non-routable destinations — `localhost`, private IP ranges, link-local addresses — are blocked.

The body must be valid JSON, and every header line must follow the `Key: value` format.
