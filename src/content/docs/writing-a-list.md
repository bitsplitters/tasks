---
title: Writing a list
description: The text of a list — tasks and subtasks, owners, mentions, links, reminders and webhooks — wherever you write it.
group: Features
order: 1
---

A list is text, and you can write all of it by hand. The format is the same everywhere you meet it:

- `/create-list`, when you create a list;
- **Bulk update**, which rewrites the whole list in the channel;
- **Edit the list** and **New list**, in the Activity;
- the file that **Download** gives you in the channel, which `/create-list` imports back.

The text of a single task follows the same rules, with one exception: owners, reminders and webhooks have their own buttons, so its form removes them and tells you.

## Tasks and subtasks

```
- Book the voice channels
- Prepare the brackets
  - Collect the sign-ups
  - Seed the teams
- Post the rules
```

- **A line that starts with `-` is a task.**
- **Spaces before the dash make it a subtask** of the task above. A task with subtasks becomes a **group**. The first line can't be a subtask.
- **The box comes after the dash** when the list already exists: `[]` for a task to do, `[X]` for a completed one. Change it to tick or untick the task. A new line without a box is a task to do.
- The title can be up to **90 characters**. The list can be up to about **4000 characters** and **50 tasks**, subtasks included. After the beta, the Free plan allows 20 tasks: see [What Premium unlocks](/docs/premium/).

## How Discord references things

Discord doesn't store names, it stores **IDs** — long numbers that never change even if someone renames themselves. A mention is just a tiny code wrapping an ID. Once you know the pattern, you can type or edit them yourself.

### Finding an ID

First, turn on Developer Mode (once):

1. Discord → **User Settings** → **Advanced** → enable **Developer Mode**.

Then, anywhere in Discord:

- **Someone else's ID** — right-click their name or avatar → **Copy User ID**.
- **A role's ID** — Server Settings → Roles → right-click the role → **Copy Role ID** (or right-click a role mention).
- **A channel's ID** — right-click the channel in the sidebar → **Copy Channel ID**.
- **Your own ID** — right-click your name → **Copy User ID**.

## Mentioning people and roles

Wrap a user ID like this:

```
<@USER_ID>
```

For example `<@123456789012345678>` renders as **@username**. Roles use an extra `&`: `<@&987654321098765432>` renders as **@role**. These mentions are the task's **tags**: the **Tag** button writes the same codes for you, so in the text you can copy, move or remove them with confidence.

## Owners: the mention with a colon

A task's owner is a mention too, with one difference: it is followed by a **colon**. The **Owner** button writes it for you, at the start of the task:

```
<@USER_ID>: Ship the release notes
```

A role works the same way: `<@&ROLE_ID>:`. Without the colon, the same mention is just a tag, not an owner. A reminder goes to the task's owner, so TTM doesn't save a reminder on a task without an owner, and the message names the task to fix. Owners and tags, and what each can do: [Owners and tags](/docs/owners-and-tags/).

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

The target doesn't have to be a web page. `mailto:`, `tel:` and `sms:` links work the same way, and open the reader's own app. `[the release owner](mailto:release@example.com)` turns a task into a one-click "write to this person", and `[the on-call phone](tel:+12025550100)` dials it straight from a phone.

A link can also point to **another list**: right-click its message → **Copy Message Link** and paste it inside the brackets. Message links are left as they are — only plain channel links get shortened to a `#channel` tag.

## Button emoji

A task can show the emoji of a list button, as the lessons of the [Tutorial](/docs/getting-started/#2-create-your-first-list) do. In the text, these emoji don't show as a long code but as a short name:

| Name | In the text | Button |
| :--- | :---: | :--- |
| `:owner:` | <img class="inline-ic" src="/icons/owner_blue.png" alt="" /> | **Owner** <img class="inline-ic" src="/icons/owner.png" alt="" /> |
| `:reminder:` | <img class="inline-ic" src="/icons/alert_blue.png" alt="" /> | **Reminder** <img class="inline-ic" src="/icons/alertW.png" alt="" /> |
| `:content:` | <img class="inline-ic" src="/icons/task_blue.png" alt="" /> | **Content** <img class="inline-ic" src="/icons/task.png" alt="" /> |
| `:more:` | <img class="inline-ic" src="/icons/other_blue.png" alt="" /> | **More** <img class="inline-ic" src="/icons/other.png" alt="" /> |
| `:activity:` | <img class="inline-ic" src="/icons/activity_blue.png" alt="" /> | **Activity** <img class="inline-ic" src="/icons/activity.png" alt="" /> |

Leave a name where it is and the emoji stays. Write one yourself, in lowercase, and the list shows the button's emoji: handy when a task says which button to press. Any other word between colons stays as you wrote it.

## Reminders in the text

A reminder appears as a timestamp followed by a triplet:

```
- [] <t:1726497546> [2d3h,1h,3] Ship the release notes
```

The triplet is `[distance,interval,repetitions]`. The first value lets you create a reminder **from text**, without an absolute date: it is counted from the moment you save the list. The repetitions are the pings **after** the first one, so the task line shows one more: `[2d3h,1h,3]` is `↻1h ×4`, and the most a plan allows here is 49, 50 pings in total. A single event uses the sentinel interval `0m` and `0` repetitions — `[2d3h,0m,0]`. Distance and interval use only `d`, `h` and `m`. A value in months, such as `[1M,0m,0]`, is refused, and the line is marked with an arrow.

`1d` and `24h` are not the same across a daylight-saving change: see [The repetition fields](/docs/reminders/#the-repetition-fields).

The same rules apply as in the reminder form. Where new recurring reminders can't be created, a triplet with repetitions above `0` is accepted only for a reminder the list already had. Even then, the limits in [Repeating reminders](/docs/reminders/#repeating-reminders) apply. If several reminders break a rule, one message lists them all, one paragraph each. The same message also lists any other problem in the text, such as a list that's too long or has too many tasks.

These reminders can't be saved, and the message names the task to fix:

- a reminder on a task with **no owner**. Reminders go to the owner, and a mention without the colon is only a tag: see [Owners: the mention with a colon](#owners-the-mention-with-a-colon);
- a reminder with **no date** and a distance of zero, such as `[0m,0m,0]` on its own. Its only alert would be the moment you save, already gone;
- a reminder that **can't be read**: a number too large, such as `[1h,1d,99999999999]`, or a date that doesn't exist.

A reminder written badly is marked with an arrow, like a line without a dash: two dates or two triplets on one line, a date without its triplet, or a reminder without task text. TTM doesn't guess which one you meant.

These checks look only at the lines you change. Rewriting the whole list checks the lines you add or edit, and the text of a single task checks that task. A new list, a clone and an import check every line.

## Webhooks in the text

A webhook linked to a task is stored in the task itself, as a reserved token in front of its text:

```
- [] {{wb=deploy}} Ship the release notes
```

You can move it, copy it onto another task or delete it by hand, exactly like a mention. The token never shows up in the rendered list. A task with the token also needs some text.

`wb` is the only reserved key. Any other `{{key=value}}` in a task's text is a **free variable**: the webhook can use it as `{{key}}`. See [Tokens](/docs/webhooks/#tokens).

## Quick reference

| You want | You write | It shows |
| :--- | :--- | :--- |
| A task | `- Ship it` | a new task |
| A subtask | `  - Write the notes` | a subtask of the line above |
| A completed task | `- [X] Ship it` | a ticked box |
| Mention a person | `<@USER_ID>` | @username |
| Mention a role | `<@&ROLE_ID>` | @role |
| Set the owner | `<@USER_ID>:` | @username: |
| Link a channel | `<#CHANNEL_ID>` | #channel |
| Add a link | `[text](https://url)` | text |
| Link an email address | `[text](mailto:name@example.com)` | text |
| Link a phone number | `[text](tel:+12025550100)` | text |
| Show a button's emoji | `:owner:`, `:reminder:`, `:content:`, `:more:` | the button's emoji |
| A reminder two days after saving | `[2d,0m,0]`, on a task with an owner | the date |
| Link a webhook | `{{wb=name}}` | nothing |

## Putting it together

A single task can combine all of these:

```
- Review the release notes in <#111222333444555666>, ping <@&987654321098765432> when done — questions to [the release owner](mailto:release@example.com)
```

<div class="callout"><div class="callout-t">Rewrite with confidence</div>The text shows every task as it is stored, including the codes above. Now that you can read them, you can safely reorder tasks, fix a wrong ID, or swap a channel link — without breaking anything. Just keep the colon after the owner's mention.</div>

## When the text can't be saved

If TTM can't read your text as a list, it shows the text back, with an arrow on each wrong line. The arrow marks a line without a dash, a first line that is a subtask, or a line with a reminder in months (`M`). It also marks a reminder written badly: two dates or two triplets, a date without its triplet, or a reminder without task text. A webhook token (`{{wb=…}}`) without task text gets the arrow too. Otherwise, **one message lists every problem at once**, one per paragraph:

- the list is too long;
- the list has more tasks than a list can hold, or than your plan allows;
- a reminder is over a limit: recurring where recurring reminders aren't allowed, repetitions over your plan, or too many reminders waiting at the same time;
- a reminder has no owner, or no date and a distance of zero.

Fix them all and save again. A reminder whose alerts are all in the past doesn't stop the save: it stays on its task. See [Reading a reminder on the task](/docs/reminders/#reading-a-reminder-on-the-task).

<div class="howto"><div class="howto-t">How to do it</div><div class="howto-grid"><a class="howto-go is-channel" href="/docs/the-task-list/#bulk-update"><span class="howto-k"><img class="place-ic" src="/icons/posto-canale.svg" alt="" />In the channel</span><span class="howto-d">Bulk update, in the first row under the list.</span></a><a class="howto-go is-activity" href="/docs/activity-list/#edit-the-list"><span class="howto-k"><img class="place-ic" src="/icons/activity.png" alt="" />In the Activity</span><span class="howto-d">Edit the list, at the top of the list.</span></a></div></div>
