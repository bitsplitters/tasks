---
title: Run a community tournament without a spreadsheet
seoTitle: Discord Bot for Tournaments and Community Events
name: Tournaments and events
description: "A Saturday cup with eight teams: referees as owners, a reminder that keeps calling the missing teams, the casters' ping before the stream and the winner announced by a webhook."
highlights: "Owners in a group, the casters' TTM role, a reminder every 15 minutes, live ticks in the Activity, the winner in a free variable, Clone for next week."
intro: |
  Mia runs **Saturday Cup #12** on her gaming server: eight teams, four referees, two casters on the stream. The teams play from several countries. The staff has one list in #tournament-staff for the week of Monday 7 to Sunday 13 December 2026, and on Saturday they tick it live, together.
order: 3
team:
  guild: Fragline
  zone: Europe/London
  people:
    - { id: "11839044175621001", name: Mia, username: mia.fragline, color: "#f0b232", about: "Organizer. She has Manage messages on the staff channel." }
    - { id: "11839044175621002", name: Leo, username: leo.casts, color: "#3ba55c", about: "Caster." }
    - { id: "11839044175621003", name: Sam, username: sam.casts, color: "#5865f2", about: "Caster." }
    - { id: "11839044175621004", name: Noa, username: noa.ref, color: "#e74c3c", about: "Referee." }
    - { id: "11839044175621005", name: Kai, username: kai.ref, color: "#1abc9c", about: "Referee." }
    - { id: "11839044175621006", name: Zoe, username: zoe.ref, color: "#9b59b6", about: "Referee. Late on Saturday." }
  roles:
    - { id: "11839044175622001", name: Referees, about: "Noa, Kai, Zoe and one more." }
    - { id: "11839044175622002", name: TTM1, about: "Created by TTM for the stream, owned by both casters.", members: ["11839044175621002", "11839044175621003"], ttm: true }
  channels:
    - { id: "11839044175623001", name: tournament-staff, about: "The staff's channel. The list lives here." }
    - { id: "11839044175623002", name: announcements, about: "Where the players read the results." }
    - { id: "11839044175623003", name: Main stage, about: "The voice channel of the stream.", voice: true }
list:
  title: "Saturday Cup #12"
  channel: "11839044175623001"
  at: 2026-12-12T19:10
  look: |
    Saturday evening, after the final. «Round 1» has no owner: each match belongs to its referee, so the group was ticked by itself, with the last match. «Call the missing teams» shows `↻15m ×3`: three pings, fifteen minutes apart. The free variable `{{winner=Team Nova}}` stays in the text, where the webhook read it.
  text: |
    - [X] <@11839044175621001>: Open the sign-ups, with the [bracket on Challonge](https://challonge.com/saturday_cup_12)
    - [X] <@&11839044175622001>: Check the rosters of the eight teams
    - [X] <t:1797080400> [0m,0m,0] <@&11839044175622001>: Open the check-in, 1 PM to 2 PM
    - [X] <t:1797082200> [0m,15m,2] <@&11839044175622001>: Call the missing teams
    - [X] <t:1797085800> [0m,0m,0] <@&11839044175622002>: Go live on the Main stage call at 3 PM
    - [X] Round 1, best of three
     - [X] <@11839044175621004>: Match A: Team Nova vs Pixel Pirates
     - [X] <@11839044175621005>: Match B: Iron Owls vs Blue Shift
     - [X] <@11839044175621006>: Match C: Night Foxes vs Glitch Gang
     - [X] <@11839044175621005>: Match D: Red Comets vs Lumen Five
    - [X] <@&11839044175622001>: Referee the semifinals and the final
    - [X] {{wb=Results}} <@11839044175621001>: Post the results {{winner=Team Nova}}
    - [] <@&11839044175622002>: Upload the replay of the final
    - [] <@11839044175621001>: Thank the teams and send the feedback form
    - [] <@11839044175621001>: Open the sign-ups for Saturday Cup #13
webhooks:
  - name: Results
    service: discord
    trigger: completion
    method: POST
    url: https://discord.com/api/webhooks/<id>/<token>
    headers: "Content-Type: application/json"
    body: |
      {"content": "🏆 **{{winner}}** won {{list}}! GG to all eight teams. The bracket stays up on Challonge.", "allowed_mentions": {"parse": []}}
    postsAs: { name: Fragline Cups, channel: "11839044175623002", color: "#e67e22" }
    setup: |
      Open the settings of #announcements, then *Integrations → Webhooks → New Webhook*. Name it «Fragline Cups» and press **Copy Webhook URL**: that's the URL above. Keep it secret, like a password.

      Two tokens write the message. `{{winner}}` comes from the free variable in the task, `{{winner=…}}`, which Mia writes once the final is over. `{{list}}` is the title of the list: next week's list is called Saturday Cup #13, and the same webhook names the new cup.
settings:
  - setting: Time zone
    choice: Europe/London
    why: "The cup runs on London time. Discord shows every date of the list in the reader's own zone, so a referee in Toronto reads his own hours. When a referee saves a reminder, TTM proposes the zone of their Discord language until they choose one."
  - setting: Readable push notifications
    choice: On
    why: "The referees read the reminders on their phones. The push shows the task, not an empty card."
  - setting: Mention owners in new lists
    choice: On
    why: "Next week's list mentions @Referees and the casters as soon as it's posted: they know the cup is on."
  - setting: Recurring reminders
    choice: On
    premium: true
    why: "«Call the missing teams» pings every 15 minutes, until someone ticks it."
week:
  - at: 2026-12-07T19:00
    text: "Mia runs `/create-list` in #tournament-staff and writes Saturday's tasks, with @Referees as the owner of the jobs any referee can do, written as `@Referees:` ([Writing a list](/docs/writing-a-list/#owners-the-mention-with-a-colon) shows how). She pastes the link of the bracket from Challonge. The first notification mentions @Referees, so every referee is notified."
  - at: 2026-12-08T20:30
    text: "Mia gives «Go live» to Leo and Sam together: she picks both in the menu under **Owner**. TTM creates the role **TTM1** for the two of them and makes it the owner. An owner of several people is a [Premium](/premium/) feature, unlocked for every server during the beta."
  - at: 2026-12-09T21:00
    text: "Mia adds the reminders with **Reminder**: the check-in at 1 PM to @Referees, «Call the missing teams» at 1:30 PM every 15 minutes, 3 times in all, and the stream at 2:30 PM to TTM1."
  - at: 2026-12-12T13:00
    text: "The check-in reminder mentions @Referees in #tournament-staff. Kai opens the check-in and ticks the task."
  - at: 2026-12-12T13:30
    text: "«Call the missing teams» pings @Referees. Two teams are missing, and Noa writes to their captains. At 1:45 PM the ping comes again."
  - at: 2026-12-12T13:52
    text: "The last team checks in, and Noa ticks «Call the missing teams». Ticking a task stops its reminder: the ping of 2:00 PM never comes."
  - at: 2026-12-12T14:30
    text: "The stream's reminder mentions TTM1, so Leo and Sam both get it."
    card: { kind: reminder, task: "5" }
  - at: 2026-12-12T14:40
    text: "Mia opens the list with **Activity** <img class=\"inline-ic\" src=\"/icons/activity.png\" alt=\"\" />, the first button under it. The referees join with **Join the Activity**, and each one ticks their match as it ends. Zoe is late: from the panel of «Match C», Mia gives the match to her."
  - at: 2026-12-12T15:35
    text: "Noa finishes Match A and taps the box of the whole «Round 1». A bubble says no: ticking the group would also tick the matches of Kai and Zoe. Mia could, with *Manage messages* on the channel. She waits instead: when Kai ticks Match D, the last one, the group is ticked by itself."
  - at: 2026-12-12T18:45
    text: "Team Nova wins the final. Mia writes `{{winner=Team Nova}}` in «Post the results» with **Content**, then ticks the task. The webhook posts the winner in #announcements."
    card: { kind: webhook, webhook: Results, task: "8", by: "11839044175621001" }
  - at: 2026-12-12T19:05
    text: "The last referee leaves the Activity. The list goes back to #tournament-staff with a summary, one line per change with who made it. The summary mentions Zoe, who got Match C inside the Activity: the mentions of a session arrive with it."
---

## Next time

On Sunday, Mia opens **More** <img class="inline-ic" src="/icons/other.png" alt="" /> and presses **Clone**: the same channel, without the ticks and without the reminders. With **Bulk update** she changes the title to Saturday Cup #13, the bracket link and the matches, and removes `{{winner=Team Nova}}`. Then she gives the new Saturday's dates with **Reminder**. The clone mentions @Referees and TTM1 in its first notification. See [Clone](/docs/list-actions/#clone).

The cup of last week stays as a record. To free its place, Mia can **Seal** it, also in **More**: the message stays, without buttons.

## What TTM doesn't do here

TTM doesn't run brackets, keep scores or check teams in: Challonge and start.gg do that. It doesn't stream either. TTM keeps the staff's work in one place, pings the right people at the right minute and announces the result you write.

## Questions

### Why couldn't Noa tick Round 1?

A group carries its subtasks along. Ticking it would have ticked the matches of Kai and Zoe, and only their owners can do that, or whoever has *Manage messages* on the channel. See [Who can tick a task](/docs/core-concepts/#who-can-tick-a-task).

### What if nobody ticks «Call the missing teams»?

It pings three times in all, at 1:30, 1:45 and 2:00 PM, then stops. The badge `↻15m ×3` says so. See [Repeating reminders](/docs/reminders/#repeating-reminders).

### Do the casters get the stream's reminder by direct message?

No. TTM1 is a role, and a reminder for a role is a message in the list's channel that mentions it, so Discord notifies everyone in the role. Give the task to one caster to send it by direct message. See [How the reminder arrives](/docs/reminders/#how-the-reminder-arrives).
