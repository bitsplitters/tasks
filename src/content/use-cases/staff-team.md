---
title: Keep your mod team on the same page
seoTitle: "Discord Staff Management Bot: Tasks for Your Mod Team"
name: Staff and mod team
description: "A moderation team's week in one list: owned by a role, a meeting reminder that repeats, two new helpers sharing a task, and an announcement when the rules change."
highlights: "A role as owner, the refusal for who isn't one, a role TTM creates for two people, a recurring reminder, a webhook with a free variable, the history thread."
intro: |
  Ava leads the moderators of **Lumen Lounge**, a server of about 4,000 members. The staff's jobs repeat every week, and two new helpers, Kai and Zoe, start on Monday. This is the team's first week with TTM, from Monday 7 to Sunday 13 December 2026.
order: 2
team:
  guild: Lumen Lounge
  zone: America/New_York
  people:
    - { id: "11829044175621001", name: Ava, username: ava.lumen, color: "#eb459e", about: "Head of the moderators, and a moderator herself." }
    - { id: "11829044175621002", name: Leo, username: leo.lumen, color: "#3ba55c", about: "Moderator." }
    - { id: "11829044175621003", name: Noa, username: noa.lumen, color: "#e67e22", about: "Helper." }
    - { id: "11829044175621004", name: Kai, username: kai.lumen, color: "#1abc9c", about: "New helper, from Monday." }
    - { id: "11829044175621005", name: Zoe, username: zoe.lumen, color: "#9b59b6", about: "New helper, from Monday." }
  roles:
    - { id: "11829044175622001", name: Moderators, about: "Ava, Leo and three more." }
    - { id: "11829044175622002", name: Helpers, about: "Noa, and from Monday Kai and Zoe." }
    - { id: "11829044175622003", name: Admins, about: "The owners of the server." }
    - { id: "11829044175622004", name: TTM1, about: "Created by TTM for a task owned by two people.", members: ["11829044175621004", "11829044175621005"], ttm: true }
  channels:
    - { id: "11829044175623001", name: staff, about: "Private to the staff. The list lives here." }
    - { id: "11829044175623002", name: rules, about: "The rules of the server." }
    - { id: "11829044175623003", name: announcements, about: "Where every member reads the news." }
list:
  title: "Mod team: week 50"
  channel: "11829044175623001"
  at: 2026-12-09T21:00
  look: |
    Almost every task belongs to @Moderators: any moderator can tick it. «Shadow a moderator for a day» belongs to @TTM1, the role TTM created for Kai and Zoe. The meeting's reminder shows `↻7d ×4`: every 7 days, 4 times in all.
  text: |
    - [X] <@&11829044175622001>: Review the open reports
    - [] <@&11829044175622001>: Clear the mod queue
    - [X] <@&11829044175622001>: Check the AutoMod log
    - [] <t:1796688000> [0m,7d,3] <@&11829044175622001>: Staff meeting, Monday 7 PM in the Staff voice channel
    - [X] {{wb=Rules changed}} <@&11829044175622001>: Update the rules in <#11829044175623002> {{change=Spoilers stay in the spoiler channels for two weeks after a release}} <@&11829044175622003>
    - [X] <@&11829044175622004>: Shadow a moderator for a day
    - [] <@11829044175621001>: Welcome the new helpers
     - [X] Give Kai and Zoe the Helper role
     - [] Walk them through the mod tools
    - [] <@&11829044175622001>: Post the meeting notes for whoever missed it
    - [] <@&11829044175622001>: Plan next week's community event
    - [] <@&11829044175622001>: Thank the members who helped this week
webhooks:
  - name: Rules changed
    service: discord
    trigger: completion
    method: POST
    url: https://discord.com/api/webhooks/<id>/<token>
    headers: "Content-Type: application/json"
    body: |
      {"content": "**The rules changed.** {{change}}.\nRead the new version in <#11829044175623002>.", "allowed_mentions": {"parse": []}}
    postsAs: { name: Lumen Staff, channel: "11829044175623003", color: "#5865f2" }
    setup: |
      Open the settings of #announcements, then *Integrations → Webhooks → New Webhook*. Name it «Lumen Staff» and press **Copy Webhook URL**: that's the URL above. Keep it secret, like a password.

      The body doesn't say what changed: `{{change}}` does, from the free variable written in the task, `{{change=…}}`. Next time the rules change, the moderator writes the new change in the task with **Content**, and the same webhook says it. `allowed_mentions` with an empty `parse` keeps the message from pinging anyone.
settings:
  - setting: Notification mode
    choice: Keep last only
    why: "#staff is where the team talks. Only the latest notification stays under the list, so the conversation stays readable."
  - setting: History tracking
    choice: On
    why: "The thread of the list keeps one line per action, with who did it: Ava reads the week there, not in the channel."
  - setting: Keep the state after a selection
    choice: On
    why: "Ava picks @Moderators once and gives it to several tasks in a row: **Owner** stays blue after each one."
  - setting: Recurring reminders
    choice: On
    premium: true
    why: "The staff meeting is every Monday: one reminder that repeats, instead of a new one each week."
  - setting: Sync permissions
    choice: Loaded
    why: "In *Server Settings → Integrations*, only the staff roles can use TTM. A member who ends up in #staff by mistake sees the list read-only."
week:
  - at: 2026-12-07T09:00
    text: "Ava writes the week's list in #staff with `/create-list`, without owners."
  - at: 2026-12-07T09:10
    text: "Ava picks @Moderators in the menu under **Owner**, then the tasks one after the other. With *Keep the state after a selection*, **Owner** stays blue between them, so each task takes the role in one click. Each notification mentions @Moderators; with *Keep last only*, only the last stays."
  - at: 2026-12-07T10:30
    text: "Ava gives «Shadow a moderator for a day» to Kai and Zoe together: she picks both in the menu. TTM creates the role **TTM1**, gives it to the two of them and makes it the owner. The notification mentions the role, so both are notified. An owner of several people is a [Premium](/premium/) feature, unlocked for every server during the beta."
    card: { kind: notice, type: assigned, by: "11829044175621001", task: "6" }
  - at: 2026-12-07T19:00
    text: "The meeting's reminder arrives. The owner is a role, so the reminder is a message in #staff that mentions @Moderators, as a reply to the list."
    card: { kind: reminder, task: "4" }
  - at: 2026-12-08T11:00
    text: "Leo updates the rules and ticks the task. The webhook posts the change in #announcements, with the text of the free variable."
    card: { kind: webhook, webhook: Rules changed, task: "5", by: "11829044175621002" }
  - at: 2026-12-08T15:20
    text: "Noa, a helper, tries to tick «Review the open reports». The task belongs to @Moderators, so she gets a refusal that only she sees: *Only @Moderators can check or uncheck this task, or whoever manages the messages of this channel.* The list doesn't change."
  - at: 2026-12-08T15:30
    text: "Leo reviews the reports and ticks the task: any member of the role can."
  - at: 2026-12-09T18:00
    text: "Kai and Zoe spend the day with Leo. In the evening Kai ticks their task: either of them can, since both have TTM1."
  - at: 2026-12-11T17:00
    text: "Ava opens the thread of the list. It has one line for each owner, tick and change of the week, with who did it."
  - at: 2026-12-11T17:15
    text: "Ava wants to keep TTM1 for the next trials. In *Server Settings → Roles* she renames it «Trial helpers»: from then on it's one of the server's roles, and TTM never deletes it. Without the new name, TTM would delete the role once no list used it."
---

## Next time

Every Monday, Ava presses **Reopen all** <img class="inline-ic" src="/icons/reopen.png" alt="" /> and picks **Reopen**: the tasks start over with their owners. Nobody ticks the staff meeting, because ticking a task stops its reminder: it stays in the list all month, and its reminder comes back every Monday on its own. A list whose reminders are single would use **New date** instead, which moves them to the new week at once. See [Reopen all](/docs/list-actions/#reopen-all).

## What TTM doesn't do here

TTM doesn't moderate. It has no bans, warnings, case logs or tickets: a moderation bot and a ticket bot do those. TTM keeps the work around them, the jobs your team repeats every week. It doesn't track shifts or measure how active each moderator is.

## Questions

### Who can tick a task owned by a role?

Any member of the role, and whoever has *Manage messages* on the channel. Everyone else gets a refusal that only they see: see [Who can tick a task](/docs/core-concepts/#who-can-tick-a-task).

### Can a moderator get the reminder by direct message?

Yes: make that moderator the owner instead of the role. A reminder reaches a person by direct message, and a role by a mention in the channel. See [How the reminder arrives](/docs/reminders/#how-the-reminder-arrives).

### What happens to TTM1 if nobody renames it?

TTM deletes a role it created once no list uses it, checking every ten minutes. Renaming it, giving it a permission or changing its members makes it one of your server's roles, and TTM leaves it alone. See [The roles TTM creates](/docs/owners-and-tags/#the-roles-ttm-creates).
