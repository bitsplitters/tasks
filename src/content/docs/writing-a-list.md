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
- the file that **Download** gives you in the channel, which `/create-list` imports back. The file keeps Discord's codes in place of the names: see [The codes behind the names](#the-codes-behind-the-names).

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

## People, roles and channels by name

In the text, people, roles and channels are written by name, as Discord shows them: `@Ava`, `@Moderators`, `#general`. When you save, TTM turns each name into a mention, so the list notifies and links as usual. When you open the form again, the names are back.

Under the text, a short line says how to write them, in the channel and in the Activity.

## Mentioning people and roles

Write `@` and the name:

```
- Ask @Ava to check the rules, then tell @Moderators
```

- **A person** goes by the name the server shows: their server nickname, otherwise their display name, otherwise their username. Upper and lower case don't matter. By name you write the people the list already mentions.
- **Two people with the same name** show with their username in brackets: `@Mario (mario.rossi)` and `@Mario (mario_b)`. Write them the same way. A name that matches more than one person can't be saved: the message lists the forms to write.
- **A role** is `@` and its name: `@Moderators`. Every role of the server works, even one the list doesn't mention yet.
- **The Content form of a task** has only its text, channels included: owner and tags have their own buttons, **Owner** and **Tag**. See [Content](/docs/channel-tasks/#content).
- **Someone the list doesn't mention yet** is added with the **Owner** or **Tag** button, which pick from Discord's own menu. In the text, write their code instead: see [Writing someone new](#writing-someone-new).
- **A name TTM doesn't know**, such as `@elonmusk`, stays plain text: TTM turns into mentions only the names it knows, and leaves every other `@word` as you wrote it.

The longest name wins: with Mario and Mario Rossi on the server, `@Mario Rossi` is Mario Rossi. A name counts only as a whole word, so `@Leonardo` isn't `@Leo` followed by "nardo".

Some `@` are never a name: `@everyone` and `@here`, a lone `@`, an email address such as `ava@example.com`, and anything inside a link or between backticks.

These mentions are the task's **tags**. The **Tag** button adds them for you, and in the text they show as names: copy, move or remove them as you like.

### Writing someone new

A person's code is `<@`, their ID and `>`: `<@123456789012345678>`. Write it where the name would go, as a tag or, followed by a colon, as the owner. Two ways to get it:

- in any Discord chat, type `\@` and the start of their name, pick them from the menu and send: the message shows their code, ready to copy;
- with **Developer Mode** on (User Settings → Advanced), right-click the person → **Copy User ID**, and write the ID between `<@` and `>`.

Save, and the next time the form opens the person shows by name. The **Owner** and **Tag** buttons do the same without any code.

### Writing @ without a mention

Put a backslash in front of a name TTM knows: `\@Ava` stays the word @Ava, and nobody is mentioned. `\#general` does the same for a channel. Any other `@word` stays text by itself, with no backslash. When a task holds the word of a name TTM knows, the form shows it with its backslash, so saving leaves it as it is.

## Owners: the mention with a colon

A task's owner is a mention too, with one difference: it is followed by a **colon**. The **Owner** button writes it for you, at the start of the task:

```
@Ava: Ship the release notes
```

A role works the same way: `@Moderators:`, and so does a code: `<@123456789012345678>:`. Without the colon, the same mention is just a tag, not an owner. A name TTM doesn't know in the owner's place stays text, as anywhere else, so the task has no owner: pick one with the **Owner** button. A reminder goes to the task's owner, so TTM doesn't save a reminder on a task without an owner, and the message names the task to fix. Owners and tags, and what each can do: [Owners and tags](/docs/owners-and-tags/).

## Linking channels

Write `#` and the channel's name, as the sidebar shows it:

```
- Specs in #design, deploy from #releases
```

Every channel you can mention works: text, announcement, voice, stage, forum and media channels, and active threads. Categories don't.

<div class="callout"><div class="callout-t">A channel link works too</div>Right-click the channel in the sidebar → <strong>Copy Link</strong> and paste it into the task: TTM recognises the link and <strong>shortens it to a channel tag</strong>, which the form then shows as <code>#name</code>. Links that point to a specific <em>message</em> are left alone — those stay clickable links.</div>

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

A reminder appears as a date followed by a triplet:

```
- [] 2026-12-08 18:00 [2d3h,1h,3] @Ava: Ship the release notes
```

The date is written `YYYY-MM-DD HH:mm`, the same in every language, in **your** time zone: the one you chose for your reminders, otherwise the zone of your Discord language, otherwise the server's (see [Your time zone](/docs/reminders/#your-time-zone)). The form names the zone above the text, and says which of the three it is. Change the date and save, and the reminder moves.

- **A date in another zone** carries the zone after the time: `2026-12-08 18:00 America/New_York`. It counts for that date only, and wins over every other zone: handy to keep a time someone gave you in their zone. Write the zone by its name, such as `Europe/Rome`, in upper or lower case, or as `UTC` or `GMT` with the offset: `UTC+2`, `GMT-5:30`. Abbreviations such as `CET` or `EST` aren't accepted, because the same abbreviation means different zones in different countries: the line gets an arrow. When the form opens again, the date is back in your zone, at the same moment.
- A date with seconds shows them: `2026-12-08 18:00:30`.
- When summer time ends, the clocks go through one hour twice. A date in that hour carries its offset, such as `2026-10-25 02:30 +02:00`, so the two 02:30 stay apart. Without an offset, TTM takes the first of the two.
- When summer time starts, the clocks skip an hour. A date in that hour doesn't exist, and the line gets an arrow.

Only the date right before a triplet is a reminder. A date anywhere else in the text stays as you wrote it.

The triplet is `[distance,interval,repetitions]`. The first value lets you create a reminder **from text**, without an absolute date: it is counted from the moment you save the list. The repetitions are the pings **after** the first one, so the task line shows one more: `[2d3h,1h,3]` is `↻1h ×4`, and the most a plan allows here is 49, 50 pings in total. A single event uses the sentinel interval `0m` and `0` repetitions — `[2d3h,0m,0]`. Distance and interval use only `d`, `h` and `m`. A value in months, such as `[1M,0m,0]`, is refused, and the line is marked with an arrow.

`1d` and `24h` are not the same across a daylight-saving change: see [The repetition fields](/docs/reminders/#the-repetition-fields).

The same rules apply as in the reminder form. Where new recurring reminders can't be created, a triplet with repetitions above `0` is accepted only for a reminder the list already had. Even then, the limits in [Repeating reminders](/docs/reminders/#repeating-reminders) apply. If several reminders break a rule, one message lists them all, one paragraph each. The same message also lists any other problem in the text, such as a list that's too long or has too many tasks.

These reminders can't be saved, and the message names the task to fix:

- a reminder on a task with **no owner**. Reminders go to the owner, and a mention without the colon is only a tag: see [Owners: the mention with a colon](#owners-the-mention-with-a-colon);
- a reminder with **no date** and a distance of zero, such as `[0m,0m,0]` on its own. Its only alert would be the moment you save, already gone;
- a reminder that **can't be read**: a number too large, such as `[1h,1d,99999999999]`.

A reminder written badly is marked with an arrow, like a line without a dash: two dates or two triplets on one line, a date without its triplet, a date that doesn't exist, such as `2026-02-30 10:00`, or a reminder without task text. TTM doesn't guess which one you meant.

These checks look only at the lines you change. Rewriting the whole list checks the lines you add or edit, and the text of a single task checks that task. A new list, a clone and an import check every line.

## Webhooks in the text

A webhook linked to a task is stored in the task itself, as a reserved token in front of its text:

```
- [] {{wb=deploy}} Ship the release notes
```

You can move it, copy it onto another task or delete it by hand, exactly like a mention. The token never shows up in the rendered list. A task with the token also needs some text.

`wb` is the only reserved key. Any other `{{key=value}}` in a task's text is a **free variable**: the webhook can use it as `{{key}}`. See [Tokens](/docs/webhooks/#tokens).

## The codes behind the names

Discord doesn't store names: it stores **IDs**, long numbers that never change, even when someone renames themselves. Behind every name in the text there is a code, and the list keeps the codes: in its message, in its notifications and in the Download file.

| In the text | The code behind it |
| :--- | :--- |
| `@Ava` | `<@123456789012345678>` |
| `@Moderators` | `<@&987654321098765432>` |
| `#general` | `<#111222333444555666>` |
| `2026-12-08 18:00` in UTC, before a triplet | `<t:1796752800>`, the date in seconds |

You can still write or paste the codes: TTM saves them as they are, and that's how you write someone the list doesn't mention yet. A Download file, or a text written before the names, works as it is. When someone changes their name on Discord, the form shows the new one, and nothing saved breaks, because the list keeps the ID.

A code stays in the text in a few cases:

- two roles with the same name, or two channels with the same name: the codes tell them apart;
- a person whose name Discord didn't send in time when the form opened. Leave the code as it is: the mention stays.

## Quick reference

| You want | You write | It shows |
| :--- | :--- | :--- |
| A task | `- Ship it` | a new task |
| A subtask | `  - Write the notes` | a subtask of the line above |
| A completed task | `- [X] Ship it` | a ticked box |
| Mention a person | `@Name` | @Name |
| Mention one of two people with the same name | `@Name (username)` | @Name |
| Mention someone new | the **Tag** button, or `<@ID>` | @Name |
| Mention a role | `@Role` | @Role |
| Set the owner | `@Name:` | @Name: |
| Set someone new as owner | the **Owner** button, or `<@ID>:` | @Name: |
| Link a channel | `#channel` | #channel |
| Write @ without a mention | `\@Name` | @Name, as text |
| Add a link | `[text](https://url)` | text |
| Link an email address | `[text](mailto:name@example.com)` | text |
| Link a phone number | `[text](tel:+12025550100)` | text |
| Show a button's emoji | `:owner:`, `:reminder:`, `:content:`, `:more:` | the button's emoji |
| A reminder on a date | `2026-12-08 18:00 [0m,0m,0]`, on a task with an owner | the date |
| A reminder in another time zone | `2026-12-08 18:00 America/New_York [0m,0m,0]` | the date |
| A reminder two days after saving | `[2d,0m,0]`, on a task with an owner | the date |
| Link a webhook | `{{wb=name}}` | nothing |

## Putting it together

A single task can combine all of these:

```
- @Ava: Review the release notes in #releases, ping @Moderators when done — questions to [the release owner](mailto:release@example.com)
```

<div class="callout"><div class="callout-t">Rewrite with confidence</div>The text shows every task as it is stored, with names in place of the codes. Reorder tasks, give a task to someone the list already names by writing their name, or swap a channel — without breaking anything. Just keep the colon after the owner's name.</div>

## When the text can't be saved

If TTM can't read your text as a list, it shows the text back, with an arrow on each wrong line. The arrow marks a line without a dash, a first line that is a subtask, or a line with a reminder in months (`M`). It also marks a reminder written badly: two dates or two triplets, a date without its triplet, a date that doesn't exist, or a reminder without task text. A webhook token (`{{wb=…}}`) without task text gets the arrow too, and so do a name TTM doesn't know, a name that matches more than one person and a date in a time zone TTM doesn't know: the message says what to write. Otherwise, **one message lists every problem at once**, one per paragraph:

- the list is too long;
- the list has more tasks than a list can hold, or than your plan allows;
- a reminder is over a limit: recurring where recurring reminders aren't allowed, repetitions over your plan, or too many reminders waiting at the same time;
- a reminder has no owner, or no date and a distance of zero.

Fix them all and save again. A reminder whose alerts are all in the past doesn't stop the save: it stays on its task. See [Reading a reminder on the task](/docs/reminders/#reading-a-reminder-on-the-task).

Two more cases save nothing, and TTM tells you. If TTM can't reach the server on Discord when you save, try again in a moment. A form left open for more than six hours can't read its names back: open it again from the list.

<div class="howto"><div class="howto-t">How to do it</div><div class="howto-grid"><a class="howto-go is-channel" href="/docs/the-task-list/#bulk-update"><span class="howto-k"><img class="place-ic" src="/icons/posto-canale.svg" alt="" />In the channel</span><span class="howto-d">Bulk update, in the first row under the list.</span></a><a class="howto-go is-activity" href="/docs/activity-list/#edit-the-list"><span class="howto-k"><img class="place-ic" src="/icons/activity.png" alt="" />In the Activity</span><span class="howto-d">Edit the list, at the top of the list.</span></a></div></div>
