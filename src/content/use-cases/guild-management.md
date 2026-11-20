---
title: Get your guild ready for raid night
seoTitle: "Discord Guild Manager Bot: Raid Nights and Clan Tasks"
name: Guilds and clans
description: The prep before a raid night, the jobs during it and the follow-up after, owned by your officers and ticked together in the voice call.
order: 5
listTitle: Raid night
list: |
  - Before the raid
    - Post the start time in announcements
    - Check the roster
    - Fill the empty roles
    - Share the strategy for each boss
  - Supplies
    - Potions and food for the group
    - Repairs from the guild bank
  - During the raid
    - Assign the calls for each boss
    - Note the loot drops
  - After the raid
    - Split the loot
    - Thank the group in chat
    - Ask the no-shows what happened
    - Pick the date of the next raid
---

## What you get

- **Activity** <img class="inline-ic" src="/icons/activity.png" alt="" /> opens the list inside the voice call. Officers tick tasks together and see each change live, without leaving the call.
- **Owner** <img class="inline-ic" src="/icons/owner.png" alt="" /> can be a role. Give *Supplies* to your officers' role, and any officer can tick it.
- **Reopen all** <img class="inline-ic" src="/icons/reopen.png" alt="" /> starts the same list over for the next raid, and **New date** moves its reminders.
- **Reminder** <img class="inline-ic" src="/icons/alertW.png" alt="" /> sends the raid leader a direct message before the start.

## Recommended setup

- **Create the list in the chat of your raid voice channel.** In the call, open the Activities button and pick Team Tasks Manager: the home of the channel shows the list. See [Four ways in](/docs/activity/#four-ways-in).
- **Need the activity timeline?** A list in a voice channel has none, because Discord doesn't allow threads there. Use a text channel, and press **Activity** under the list: see [Voice channels](/docs/known-limits/#voice-channels).
- **Give each group an owner.** The raid leader owns *Before the raid*, the officers' role owns *Supplies*. See [Owners and tags](/docs/owners-and-tags/).
- **Add a reminder to *Post the start time***, the day before. Its owner gets a direct message: see [Reminders](/docs/reminders/).
- **After the raid, press Reopen all**, then **New date**, and pick the date of the next raid: see [Reopen all](/docs/list-actions/#reopen-all).

## Small server, big server

- **A static group of eight:** one list, one owner, everything ticked in the call.
- **A guild with several raid teams:** one list per team, each in its team's voice channel, with that team's officers as owner.

## What TTM doesn't do here

TTM doesn't run sign-ups. It has no calendar, no attendance and no loot system: for those, use a raid sign-up bot, or your game's own tools. TTM keeps the jobs around the raid, the ones somebody always forgets.

## Questions

### Does everyone need to open the Activity?

No. Whoever stays out still sees the list's message in the channel. When the last person leaves the Activity, the list goes back there with a summary of what changed: see [The Activity](/docs/activity/).

### Why can't some members open the Activity?

Opening it needs Discord's *Use Activities* permission on the channel, which an administrator grants. See [When the list doesn't open](/docs/activity/#when-the-list-doesnt-open).

### Can members tick tasks for the officers?

Not on a task the officers' role owns. Only the members of the role tick it, and whoever has *Manage messages* on the channel. See [Who can tick a task](/docs/core-concepts/#who-can-tick-a-task).

### Does it work for clans outside MMOs?

Yes. Rename the groups and the list fits a clan war, a league night or a build session. The list is plain text, and you change it before you submit.
