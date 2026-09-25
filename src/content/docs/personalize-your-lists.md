---
title: Personalize your lists
description: Mention people and roles, link channels and add hyperlinks — by hand, with full control.
group: Using the bot
order: 6.5
---

A task is just Discord text, so you can enrich it the way you enrich any message: mention people and roles, link channels, add clickable links. The **Owner** and **Tag** buttons do some of this for you, and Tag can apply several users and roles at once. In **Bulk update**, or when you edit a task's content, you can also write and adjust these by hand. Bulk update shows the raw codes, so it helps to know what they mean.

## How Discord references things

Discord doesn't store names, it stores **IDs** — long numbers that never change even if someone renames themselves. A mention is just a tiny code wrapping an ID. Once you know the pattern, you can type or edit them yourself.

## Finding an ID

First, turn on Developer Mode (once):

1. Discord → **User Settings** → **Advanced** → enable **Developer Mode**.

Then, anywhere in Discord:

- **Someone else's ID** — right-click their name or avatar → **Copy User ID**.
- **A role's ID** — Server Settings → Roles → right-click the role → **Copy Role ID** (or right-click a role mention).
- **A channel's ID** — right-click the channel in the sidebar → **Copy Channel ID**.
- **Your own ID** — right-click your name → **Copy User ID**.

## Mentioning people

Wrap a user ID like this:

```
<@USER_ID>
```

For example `<@123456789012345678>` renders as **@username**. This is exactly what the **Tag** button inserts for you — so in bulk edit you can copy, move or remove these codes with confidence.

## Mentioning roles

Roles use an extra `&`:

```
<@&ROLE_ID>
```

`<@&987654321098765432>` renders as **@role**. Use it to point a task at a whole team at once.

## Owners: the mention with a colon

A task's owner is a mention too, with one difference: it is followed by a **colon**. The **Owner** button writes it for you, at the start of the task:

```
<@USER_ID>: Ship the release notes
```

A role works the same way: `<@&ROLE_ID>:`. Without the colon, the same mention is just a tag, not an owner. This matters in **Bulk update**: a reminder goes to the task's owner, so on a task without an owner the reminder is removed when you save. The list is saved anyway, and TTM tells you which tasks lost their reminder: see [Reading a reminder on the task](/docs/reminders/#reading-a-reminder-on-the-task).

## Linking channels

Channels use `#`:

```
<#CHANNEL_ID>
```

`<#111222333444555666>` renders as a clickable **#channel**. Perfect for sending readers to the right place — "specs in `<#…>`", "deploy from `<#…>`".

<div class="callout"><div class="callout-t">The shortcut: right-click → Copy Link</div>You don't need the ID, or even Developer Mode, for a channel: <strong>right-click the channel in the sidebar → Copy Link</strong> and paste it into the task. TTM recognises the link and <strong>shortens it to a channel tag</strong> for you, so <code>https://discord.com/channels/…/111222333444555666</code> becomes <code>&lt;#111222333444555666&gt;</code> on its own. Links that point to a specific <em>message</em> are left alone — those stay clickable links.</div>

## Adding a hyperlink

For links to anything outside Discord, use standard Markdown:

```
[visible text](https://example.com)
```

So `[our roadmap](https://example.com/roadmap)` becomes **[our roadmap](https://example.com/roadmap)** — a clean, clickable link instead of a bare URL.

The target doesn't have to be a web page: `mailto:`, `tel:` and `sms:` links work the same way and hand the task over to the reader's own app. `[the release owner](mailto:release@example.com)` turns a task into a one-click "write to this person", and `[the on-call phone](tel:+12025550100)` dials it straight from a phone.

A link can also point to **another list**: right-click its message → **Copy Message Link** and paste it inside the brackets. Message links are left as they are — only plain channel links get shortened to a `#channel` tag.

## Quick reference

| You want | You write | It shows |
| :--- | :--- | :--- |
| Mention a person | `<@USER_ID>` | @username |
| Mention a role | `<@&ROLE_ID>` | @role |
| Set the owner | `<@USER_ID>:` | @username: |
| Link a channel | `<#CHANNEL_ID>` | #channel |
| Add a link | `[text](https://url)` | text |
| Link an email address | `[text](mailto:name@example.com)` | text |
| Link a phone number | `[text](tel:+12025550100)` | text |

## Putting it together

A single task can combine all of these. In **Bulk update** you might write:

```
- Review the release notes in <#111222333444555666>, ping <@&987654321098765432> when done — questions to [the release owner](mailto:release@example.com)
```

<div class="callout"><div class="callout-t">Bulk edit with confidence</div>Bulk update shows the raw text of every task, including the mention codes above. Now that you can read them, you can safely reorder tasks, fix a wrong ID, or swap a channel link — without breaking anything. Just keep the colon after the owner's mention.</div>
