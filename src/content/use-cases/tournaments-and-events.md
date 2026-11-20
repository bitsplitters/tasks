---
title: Run a community tournament without a spreadsheet
seoTitle: Discord Bot for Tournaments and Community Events
name: Tournaments and events
description: Everything before, during and after a community event, with a name on every job and a reminder before the big moments.
order: 3
listTitle: Saturday tournament
list: |
  - Before
    - Announce the date and the format
    - Open the sign-ups
    - Book the voice channels
    - Write the rules
  - Brackets
    - Close the sign-ups
    - Seed the teams
    - Post the brackets
  - On the day
    - Check in the teams
    - Run the matches
    - Stream the final
  - After
    - Post the results
    - Hand out the prizes
    - Ask the players for feedback
---

## What you get

- **Owner** <img class="inline-ic" src="/icons/owner.png" alt="" /> puts one person on the brackets and one on the stream. Everyone knows whose job is whose.
- **Reminder** <img class="inline-ic" src="/icons/alertW.png" alt="" /> sends the owner a direct message before the sign-ups close or the final starts.
- **Activity** <img class="inline-ic" src="/icons/activity.png" alt="" /> opens the list in a window inside Discord. On the day, the organizers tick tasks together and see every change live.
- **Seal list** <img class="inline-ic" src="/icons/seal.png" alt="" /> keeps the list in the channel as a record once it's over, and frees its place on your plan.

## Recommended setup

- **Create the list a week before**, in the organizers' channel.
- **Give each group an owner**: *Before* to the host, *Brackets* to whoever seeds the teams, *On the day* to the referee. A task with an owner can be ticked only by its owner: see [Who can tick a task](/docs/core-concepts/#who-can-tick-a-task).
- **Add two reminders**: on *Close the sign-ups*, and on *Stream the final*. Each one reaches its owner by direct message: see [Reminders](/docs/reminders/).
- **Tag the casters** on *Stream the final* with **Tag** <img class="inline-ic" src="/icons/tag.png" alt="" />: they're mentioned on the task, and hear about it when it's ticked.
- **On the day, press Activity** under the list. The other organizers join with **Join the Activity**: see [The Activity](/docs/activity/).
- **Running it again next month?** Before you seal the list, use **Clone list** <img class="inline-ic" src="/icons/clone.png" alt="" /> from **More** for a copy without the ticks, in another channel: see [Clone](/docs/list-actions/#clone). Then seal the original.

## Small server, big server

- **A game night with friends:** keep the four groups' first tasks and drop the rest. One owner, no reminders.
- **A tournament with a staff of ten:** one owner per group, and a role as owner where several people share a job. Several people as owner is a [Premium](/premium/) feature, unlocked during the beta: see [Owners and tags](/docs/owners-and-tags/).

## What TTM doesn't do here

TTM keeps the work behind the event. It doesn't take sign-ups or RSVPs, draw brackets or put the event on a calendar. For the date, Discord has its own server events, which members can mark as interested. For brackets, use a bracket tool and link it in a task.

## Questions

### Should players see the list?

It's up to you. In a public channel, players see what's ready, and only owners tick their tasks. A task without an owner can be ticked by anyone who can use the list: keep it in the organizers' channel, or [sync the permissions](/docs/configuration/#sync-permissions).

### Can I link the bracket page?

Yes, with a Markdown link in the task: `[the brackets](https://example.com)`. See [Adding a hyperlink](/docs/writing-a-list/#adding-a-hyperlink).

### Who gets the reminder?

The owner of the task: a person by direct message, a role by a mention in the list's channel. If the task has no owner yet, you become it when you save the reminder. See [How the reminder arrives](/docs/reminders/#how-the-reminder-arrives).

### Does it work on phones?

Yes. The list works in the Discord app, in the channel and in the Activity, on desktop and on mobile.
