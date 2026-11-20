---
title: Plan your videos with the people who make them
seoTitle: "Discord Bot for Content Creators: Your Video Pipeline"
name: Content creators
description: Script, recording, edit, thumbnail and clips in one list, with the editor and the designer each owning their step.
order: 6
listTitle: This week's video
list: |
  - Next video
    - Write the script
    - Record
    - Edit
    - Make the thumbnail
    - Schedule the upload
  - Shorts
    - Cut three clips from the video
    - Add captions
    - Post them across the week
  - The video after
    - Pick the topic
    - Research and outline
  - Community
    - Share the video in announcements
    - Answer the first comments
---

## What you get

- **Owner** <img class="inline-ic" src="/icons/owner.png" alt="" /> gives *Edit* to the editor and *Make the thumbnail* to the designer. Each step has a name on it.
- **Reminder** <img class="inline-ic" src="/icons/alertW.png" alt="" /> sends the editor a direct message the day before the upload.
- **Tag** <img class="inline-ic" src="/icons/tag.png" alt="" /> mentions you on *Schedule the upload*, so you hear about it when it's done.
- **Reopen all** <img class="inline-ic" src="/icons/reopen.png" alt="" /> starts the same list over for next week's video, and **New date** moves its reminders.

## Recommended setup

- **Create the list in your team's private channel**, not in the community's.
- **Give each step an owner** with **Owner** <img class="inline-ic" src="/icons/owner.png" alt="" />. Only the owner ticks it, so nobody marks the edit done for the editor. See [Who can tick a task](/docs/core-concepts/#who-can-tick-a-task).
- **Add a reminder to *Edit***, the day before the upload. See [Reminders](/docs/reminders/).
- **Link your files in the tasks**: the script, the raw footage folder, the thumbnail draft. See [Adding a hyperlink](/docs/writing-a-list/#adding-a-hyperlink).
- **Two videos at once?** **Clone list** <img class="inline-ic" src="/icons/clone.png" alt="" />, in **More**, copies the list into another channel, without the ticks if you like: see [Clone](/docs/list-actions/#clone).

## Small server, big server

- **You and one editor:** owners on *Edit* and *Make the thumbnail* only. You tick the rest.
- **A team with writers, editors and a shorts editor:** one list per video, a role as owner where several people share a step, and the [activity timeline](/docs/configuration/#history-tracking) on.

## What TTM doesn't do here

TTM doesn't upload, schedule or announce your videos, and it has no analytics. It doesn't store files: they stay in your drive, linked from the tasks. To announce new videos in your server, use a notification bot.

## Questions

### Can my editor see only the team's list?

Yes, if the list is in a channel only the team can read. To keep the buttons for the team in other channels too, see [Sync permissions](/docs/configuration/#sync-permissions).

### Can I see who finished what?

Yes. Turn on the [activity timeline](/docs/configuration/#history-tracking): a thread next to the list records every tick.

### Does it work on my phone?

Yes. The list works in the Discord app, in the channel and in the Activity, on desktop and on mobile.

### Can I reuse the list for every video?

Yes. When a video is out, press **Reopen all** and the same steps are to do again, with their owners. Change the topic with **Bulk update** <img class="inline-ic" src="/icons/edit.png" alt="" />: see [Bulk update](/docs/the-task-list/#bulk-update).
