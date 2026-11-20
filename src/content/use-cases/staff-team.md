---
title: Keep your mod team on the same page
seoTitle: "Discord Staff Management Bot: Tasks for Your Mod Team"
name: Staff and mod team
description: "The weekly jobs of a moderation team in one list: owned by a role, ticked by whoever does them, reopened every week."
order: 2
listTitle: "Mod team: this week"
list: |
  - Review the open reports
  - Clear the mod queue
  - Check the AutoMod log
  - Weekly staff meeting
    - Collect the agenda
    - Post the summary in the staff channel
  - Update the rules if anything changed
  - New helpers
    - Give them the helper role
    - Walk them through the mod tools
    - Check in after their first week
  - Plan next week's community event
  - Thank the members who helped this week
---

## What you get

- **Owner** <img class="inline-ic" src="/icons/owner.png" alt="" /> can be a role. Give a task to *Moderators*, and anyone with the role can take it and tick it.
- **Reminder** <img class="inline-ic" src="/icons/alertW.png" alt="" /> on a task owned by a role arrives as a mention of the role in the list's channel. The whole team sees it.
- **Reopen all** <img class="inline-ic" src="/icons/reopen.png" alt="" /> starts the same list over each week, and **New date** moves its reminders to the new week.
- The [activity timeline](/docs/configuration/#history-tracking) keeps every tick on record, so the team lead sees who did what.

## Recommended setup

- **Put the list in the staff channel**, where only the team can read it.
- **Give each task to a role, not a person.** Use **Owner** <img class="inline-ic" src="/icons/owner.png" alt="" /> and pick *Moderators* or *Helpers*: whoever is online does it. A person as owner fits a job that only one member can do. See [Owners and tags](/docs/owners-and-tags/).
- **Keep the buttons for the staff.** Choose who can use TTM in *Server Settings → Integrations → Team Tasks Manager*, then press **Load permissions** in `/config app`. Members who aren't allowed see the list as read-only: see [Sync permissions](/docs/configuration/#sync-permissions).
- **One reminder per deadline.** Put one on the staff meeting, an hour before it starts. Reminders can also repeat: it's a [Premium](/premium/) feature, switched on in [`/config app`](/docs/configuration/#recurring-reminders).
- **Start over each week.** Press **Reopen all**, then **New date**, and pick the new date of the first reminder. The others keep the same distance from it: see [Reopen all](/docs/list-actions/#reopen-all).

## Small server, big server

- **Three mods:** one role owns every task, and the list is the agenda of your weekly call.
- **Admins, mods and helpers:** one list per team, each in its own channel, with that team's role as owner. Each team reads only its own list.

## What TTM doesn't do here

TTM doesn't moderate. It has no bans, warnings, case logs or tickets: a moderation bot and a ticket bot do those. TTM keeps the work around them, the jobs your team repeats every week. It doesn't track shifts or measure how active each moderator is.

## Questions

### Can members see the staff list?

Only if they can read its channel. Put it in a staff channel, and sync the permissions so that only the staff can press its buttons.

### Who can tick a task owned by a role?

Any member of the role, and whoever has *Manage messages* on the channel. Everyone else gets a refusal that only they see: see [Who can tick a task](/docs/core-concepts/#who-can-tick-a-task).

### Can the list repeat on its own?

The list doesn't: you start it over with **Reopen all**. Reminders can repeat, with an interval and a number of repetitions. That's a [Premium](/premium/) feature, unlocked for every server during the beta: see [Repeating reminders](/docs/reminders/#repeating-reminders).

### Can a moderator get the reminder by direct message?

Yes: make that moderator the owner instead of the role. A reminder reaches a person by direct message, and a role by a mention in the channel. See [How the reminder arrives](/docs/reminders/#how-the-reminder-arrives).
