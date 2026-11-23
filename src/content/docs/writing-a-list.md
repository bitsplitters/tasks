---
title: Editing a list by hand
description: Edit a list by writing its text, to change many things at once or paste a list from somewhere else. For everything else, use the buttons, which are simpler and keep you from making mistakes.
group: Reference
order: 9.3
---

This page is for when you'd rather change the text of a list yourself, in **Bulk update** in the channel or in **Edit the list** in the Activity.

The buttons do the same things without mistakes: **Owner**, **Tag**, **Reminder** and **Webhook** write the codes for you, and TTM checks them as you go. Use them first. The text is for many changes at once, or for a list you copy from somewhere else.

The dash and the spaces that make tasks and subtasks are in [Create your first list](/docs/getting-started/#2-create-your-first-list). The same text is in `/create-list`, in **New list** in the Activity and in the file that **Download** gives you.

In the **Content** form of a single task, owner, tags, reminder and webhook have their own buttons: the form removes an owner, a reminder or a webhook you type, and tells you.

<div class="howto"><div class="howto-t">How to do it</div><div class="howto-grid"><a class="howto-go is-channel" href="/docs/the-task-list/#bulk-update"><span class="howto-k"><img class="place-ic" src="/icons/posto-canale.svg" alt="" />In the channel</span><span class="howto-d">Bulk update, in the first row under the list.</span></a><a class="howto-go is-activity" href="/docs/activity-list/#edit-the-list"><span class="howto-k"><img class="place-ic" src="/icons/activity.png" alt="" />In the Activity</span><span class="howto-d">Edit the list, at the top of the list.</span></a></div></div>

## Quick reference

| You want | You write |
| :--- | :--- |
| [A task](#tasks-and-subtasks) | `- Ship it` |
| [A subtask](#tasks-and-subtasks) | `  - Write the notes`, under its task |
| [A completed task](#tasks-and-subtasks) | `- [X] Ship it` |
| [Mention a person](#mentioning-people-and-roles) | the **Tag** button, or `@Name` |
| [One of two people with the same name](#mentioning-people-and-roles) | `@Name (username)` |
| [Mention someone new](#writing-someone-new) | the **Tag** button, or `<@ID>` |
| [Mention a role](#mentioning-people-and-roles) | the **Tag** button, or `@Role` |
| [Write @ without a mention](#writing--without-a-mention) | `\@Name` |
| [Set the owner](#owners-the-mention-with-a-colon) | the **Owner** button, or `@Name:` |
| [Set someone new as owner](#writing-someone-new) | the **Owner** button, or `<@ID>:` |
| [Link a channel](#linking-channels) | `#channel` |
| [Add a link](#adding-a-hyperlink) | `[text](https://url)` |
| [Link an email address or a phone](#adding-a-hyperlink) | `[text](mailto:name@example.com)`, `[text](tel:+12025550100)` |
| [Show a button's emoji](#button-emoji) | `:owner:`, `:reminder:`, `:content:`, `:more:`, `:activity:` |
| [A reminder on a date](#reminders-in-the-text) | the **Reminder** button, or `2026-12-08 18:00 [0m,0m,0]` |
| [A reminder in another time zone](#reminders-in-the-text) | `2026-12-08 18:00 America/New_York [0m,0m,0]` |
| [A reminder two days after saving](#reminders-in-the-text) | `[2d,0m,0]` |
| [Link a webhook](#webhooks-in-the-text) | the **Webhook** button, or `{{wb=name}}` |

## Tasks and subtasks

```
- [X] Book the voice channels
- [] Prepare the brackets
  - [X] Collect the sign-ups
  - [] Seed the teams
- [] Post the rules
```

- **A line that starts with `-` is a task.**
- **Spaces before the dash make it a subtask** of the task above. A task with subtasks becomes a **group**.
- **The first line can't be a subtask.**
- **The box comes after the dash**: `[]` for a task to do, `[X]` for a completed one. Change it to tick or untick the task. A new line without a box is a task to do.
- **The title** can be up to 90 characters.
- **The list** can be up to about 4000 characters and 50 tasks, subtasks included. After the beta, the Free plan allows 20 tasks: see [What Premium unlocks](/docs/premium/).

## People, roles and channels by name

In the text, people, roles and channels are written by name, as Discord shows them: `@Ava`, `@Moderators`, `#general`.

When you save, TTM turns each name into a mention, so the list notifies and links as usual. When you open the form again, the names are back.

The line under the text, in the channel and in the Activity, links here for adding someone new: see [Writing someone new](#writing-someone-new).

## Mentioning people and roles

The **Tag** button adds mentions for you: see [Tags](/docs/owners-and-tags/#tags). In the text, write `@` and the name:

```
- Ask @Ava to check the rules, then tell @Moderators
```

These mentions are the task's **tags**: copy, move or remove them as you like.

- **A person** goes by the name the server shows: their server nickname, otherwise their display name, otherwise their username. Upper and lower case don't matter.
- **By name you write the people the list already mentions.** Someone new goes with the **Owner** or **Tag** button, or with their code: see [Writing someone new](#writing-someone-new).
- **A role** is `@` and its name: `@Moderators`. Every role of the server works, even one the list doesn't mention yet.
- **Two people with the same name** show with their username in brackets: `@Mario (mario.rossi)` and `@Mario (mario_b)`. Write them the same way. A name that matches more than one person can't be saved, and the message lists the forms to write.
- **A name TTM doesn't know**, such as `@elonmusk`, stays plain text. In the owner's place it is an error instead: see [Owners: the mention with a colon](#owners-the-mention-with-a-colon).

The longest name wins: with Mario and Mario Rossi on the server, `@Mario Rossi` is Mario Rossi. A name counts only as a whole word, so `@Leonardo` isn't `@Leo` followed by "nardo".

Some `@` are never a name:

- `@everyone` and `@here`;
- a lone `@`;
- an email address, such as `ava@example.com`;
- anything inside a link or between backticks.

### Writing someone new

The **Owner** and **Tag** buttons pick from Discord's own menu, so they reach anyone on the server without any code.

In the text, write the person's code where the name would go: `<@`, their ID and `>`, such as `<@123456789012345678>`. On its own it is a tag; followed by a colon, it is the owner. Two ways to get it:

- in any Discord chat, type `\@` and the start of their name, pick them from the menu and send: the message shows their code, ready to copy;
- with **Developer Mode** on (User Settings → Advanced), right-click the person → **Copy User ID**, and write the ID between `<@` and `>`.

Save, and the next time the form opens the person shows by name.

### Writing @ without a mention

Put a backslash in front of a name TTM knows: `\@Ava` stays the word @Ava, and nobody is mentioned. `\#general` does the same for a channel.

Any other `@word` stays text by itself, with no backslash. The exception is the start of a task, followed by a colon, where it would be an owner: write `\@word:`.

TTM keeps your backslash. The list shows the word without it, and the form shows it again next time, so you can tell the word from the mention. TTM never adds a backslash of its own.

## Owners: the mention with a colon

The **Owner** button sets a task's owner for you: see [Owner](/docs/owners-and-tags/#owner-a-person-a-role-or-several-people). In the text, the owner is a mention followed by a **colon**, at the start of the task:

```
- @Ava: Ship the release notes
```

- **A role** works the same way: `@Moderators:`. So does a code: `<@123456789012345678>:`.
- **Without the colon**, the same mention is just a tag, not an owner.
- **The owner's name** runs from the `@` to the colon, so `@Ava Rossi:` is an error even when TTM knows Ava.
- **A name TTM doesn't know** is an error in the owner's place. TTM saves nothing, and the message says to pick the owner with the **Owner** button or write their code.
- **To start a task with `@word:` as plain text**, see [Writing @ without a mention](#writing--without-a-mention). The Content form has no owner, so there `@word:` stays plain text.

## Linking channels

Write `#` and the channel's name, as the sidebar shows it:

```
- Specs in #design, deploy from #releases
```

Every channel you can mention works: text, announcement, voice, stage, forum and media channels, and active threads. Categories don't.

<div class="callout"><div class="callout-t">A channel link works too</div>Right-click the channel in the sidebar → <strong>Copy Link</strong> and paste it into the task: TTM recognises the link and <strong>shortens it to a channel tag</strong>, which the form then shows as <code>#name</code>. Links that point to a specific <em>message</em> are left alone: those stay clickable links.</div>

## Adding a hyperlink

For links to anything outside Discord, use standard Markdown:

```
[our roadmap](https://example.com/roadmap)
```

The list shows **[our roadmap](https://example.com/roadmap)**: a clean, clickable link instead of a bare URL.

The target doesn't have to be a web page. `mailto:`, `tel:` and `sms:` links work the same way, and open the reader's own app:

```
[the release owner](mailto:release@example.com)
[the on-call phone](tel:+12025550100)
```

The first turns a task into a one-click "write to this person". The second dials straight from a phone.

A link can also point to **another list**: right-click its message → **Copy Message Link** and paste it inside the brackets. Message links stay as they are: only plain channel links become a `#channel` tag.

## Button emoji

A task can show the emoji of a list button, as the lessons of the [Tutorial](/docs/getting-started/#2-create-your-first-list) do. In the text, each of these emoji shows as a short name:

| Name | In the text | Button |
| :--- | :---: | :--- |
| `:owner:` | <img class="inline-ic" src="/icons/owner_blue.png" alt="" /> | **Owner** <img class="inline-ic" src="/icons/owner.png" alt="" /> |
| `:reminder:` | <img class="inline-ic" src="/icons/alert_blue.png" alt="" /> | **Reminder** <img class="inline-ic" src="/icons/alertW.png" alt="" /> |
| `:content:` | <img class="inline-ic" src="/icons/task_blue.png" alt="" /> | **Content** <img class="inline-ic" src="/icons/task.png" alt="" /> |
| `:more:` | <img class="inline-ic" src="/icons/other_blue.png" alt="" /> | **More** <img class="inline-ic" src="/icons/other.png" alt="" /> |
| `:activity:` | <img class="inline-ic" src="/icons/activity_blue.png" alt="" /> | **Activity** <img class="inline-ic" src="/icons/activity.png" alt="" /> |

Leave a name where it is and the emoji stays. Write one yourself, in lowercase, and the list shows the button's emoji: handy when a task says which button to press. Any other word between colons stays as you wrote it.

## Reminders in the text

The **Reminder** button sets a reminder for you, and checks it as you go: see [Reminders](/docs/reminders/). In the text, a reminder is a date followed by a triplet, before the owner:

```
- [] 2026-12-08 18:00 [2d3h,1h,3] @Ava: Ship the release notes
```

**The date** is written `YYYY-MM-DD HH:mm`, the same in every language, in your time zone: see [/my timezone](/docs/my-timezone/). Change the date and save, and the reminder moves. Only the date right before a triplet is a reminder: a date anywhere else stays as you wrote it.

- **A date in another zone** carries the zone after the time: `2026-12-08 18:00 America/New_York`. It counts for that date only, and wins over every other zone: handy to keep a time someone gave you in theirs.
- **The zone** goes by its name, such as `Europe/Rome`, in upper or lower case, or as UTC or GMT with an offset, such as `GMT-5:30`.
- **Abbreviations** such as CET or EST aren't accepted, because the same abbreviation means different zones in different countries. The line gets an arrow.
- **When the form opens again**, the date is back in your zone, at the same moment.
- **A date with seconds** shows them: `2026-12-08 18:00:30`.
- **When summer time ends**, the clocks go through one hour twice. A date in that hour carries its offset, such as `2026-10-25 02:30 +02:00`, so the two 02:30 stay apart. Without an offset, TTM takes the first of the two.
- **When summer time starts**, the clocks skip an hour. A date in that hour doesn't exist, and the line gets an arrow.

**The triplet** is `[distance,interval,repetitions]`:

- **The distance** creates a reminder without an absolute date: it is counted from the moment you save the list.
- **The repetitions** are the pings after the first one, so the task line shows one more: `[2d3h,1h,3]` is `↻1h ×4`. The most a plan allows here is 49, 50 pings in total.
- **A single event** uses the interval `0m` and `0` repetitions: `[2d3h,0m,0]`.
- **Distance and interval** use only `d`, `h` and `m`. A value in months, such as `[1M,0m,0]`, is refused, and the line gets an arrow.

`1d` and `24h` are not the same across a daylight-saving change: `1d` keeps the same time of day, `24h` is exact and can shift by an hour. See [The repetition fields](/docs/reminders/#the-repetition-fields).

The rules are those of the reminder form, including how many reminders can wait at a time: see [Known limits](/docs/known-limits/). Where new recurring reminders can't be created, a triplet with repetitions above `0` is accepted only for a reminder the list already had, within the limits of [Repeating reminders](/docs/reminders/#repeating-reminders).

**These reminders can't be saved**, and the message names the task to fix:

- a reminder on a task with **no owner**: reminders go to the owner, see [Owners: the mention with a colon](#owners-the-mention-with-a-colon);
- a reminder with **no date** and a distance of zero, such as `[0m,0m,0]` on its own: its only alert would be the moment you save, already gone;
- a reminder that **can't be read**: a number too large, such as `[1h,1d,99999999999]`.

**A reminder written badly gets an arrow**, like a line without a dash. TTM doesn't guess which one you meant:

- two dates or two triplets on one line;
- a date without its triplet, or a reminder without task text;
- a date that doesn't exist, such as `2026-02-30 10:00`;
- a date in another form, such as `30/11/2026 18:00`.

These checks look only at the lines you change. Rewriting the whole list checks the lines you add or edit, and the text of a single task checks that task. A new list, a clone and an import check every line.

## Webhooks in the text

The **Webhook** button links a webhook to a task for you: see [Webhooks](/docs/webhooks/). In the text, the link is a reserved token in front of the task's text:

```
- [] {{wb=deploy}} Ship the release notes
```

You can move it, copy it onto another task or delete it, like a mention. The token never shows in the list. A task with the token also needs some text.

`wb` is the only reserved key. Any other `{{key=value}}` in a task's text is a **free variable**, which the webhook can use: see [Tokens](/docs/config-webhook/#tokens).

## The codes behind the names

Discord stores **IDs**, not names: long numbers that never change. Behind every name in the text there is a code, and the list keeps the codes, in its message, its notifications and the Download file.

| In the text | The code behind it |
| :--- | :--- |
| `@Ava` | `<@123456789012345678>` |
| `@Moderators` | `<@&987654321098765432>` |
| `#general` | `<#111222333444555666>` |
| `2026-12-08 18:00` in UTC, before a triplet | `<t:1796752800>`, the date in seconds |

You can still write or paste the codes: TTM saves them as they are. A Download file, or a text written before the names, works as it is.

When someone changes their name on Discord, the form shows the new one. Nothing saved breaks, because the list keeps the ID.

A code stays in the text in a few cases:

- two roles with the same name, or two channels with the same name: the codes tell them apart;
- a person whose name Discord didn't send in time when the form opened. Leave the code as it is: the mention stays.

## Putting it together

A single task can combine all of these:

```
- @Ava: Review the release notes in #releases, ping @Moderators when done — questions to [the release owner](mailto:release@example.com)
```

## When the text can't be saved

If TTM can't read a line, it shows your text back with an **arrow** on each wrong line, from a line without a dash to a reminder written badly. The message says what to write, and links to the part of this page that explains it.

Otherwise, **one message lists every problem at once**, one per paragraph: a list that's too long, a reminder over a limit or without an owner. Fix them all and save again.

A reminder whose alerts are all in the past doesn't stop the save: it stays on its task. See [Reading a reminder on the task](/docs/reminders/#reading-a-reminder-on-the-task).

Two more cases save nothing, and TTM tells you:

- TTM can't reach the server on Discord when you save: try again in a moment;
- a form left open for more than six hours can't read its names back: open it again from the list.
