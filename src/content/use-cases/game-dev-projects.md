---
title: Ship your game with the team you already talk to
seoTitle: Discord Project Management Bot for Game Dev Teams
name: Game dev projects
description: "A game jam split into design, art, code, audio and shipping: each part owned, and a webhook to tell your other tools when it's done."
order: 4
listTitle: "Game jam: 48 hours"
list: |
  - Design
    - Pick the twist on the theme
    - Write the one-page design doc
  - Art
    - Player sprite and animations
    - Tileset for the first level
    - Title screen
  - Code
    - Player movement
    - Enemy behavior
    - Save the high score
  - Audio
    - Music loop
    - Sound effects
  - Ship
    - Build for web and Windows
    - Upload to the jam page
    - Write the description and add screenshots
---

## What you get

- **Groups and subtasks** <img class="inline-ic" src="/icons/single_task.png" alt="" /> turn each area of the game into a group, with its pieces as steps.
- **Owner** <img class="inline-ic" src="/icons/owner.png" alt="" /> gives *Art* to the artist and *Code* to the programmer. Only they tick their tasks.
- **Webhook** <img class="inline-ic" src="/icons/api.png" alt="" />: tick a task, and TTM calls your other systems, such as a CI or a spreadsheet, anything that takes an HTTP request. It's a [Premium](/premium/) feature, unlocked for every server during the beta.
- **Activity** <img class="inline-ic" src="/icons/activity.png" alt="" /> opens the list in a window inside Discord, so the team reviews it together during the call.

## Recommended setup

- **One list per milestone**, in the team's channel. A short list is easier to read than the whole project in one.
- **Give each group an owner** with **Owner** <img class="inline-ic" src="/icons/owner.png" alt="" />. See [Owners and tags](/docs/owners-and-tags/).
- **Add a reminder to *Upload to the jam page***, a few hours before the deadline. Its owner gets a direct message: see [Reminders](/docs/reminders/).
- **Link a webhook to *Build for web and Windows*.** Create it with `/config webhook`, then link it with **Webhook** <img class="inline-ic" src="/icons/api.png" alt="" />. It fires when the task is ticked or reopened: see [/config webhook](/docs/webhooks/).
- **After the jam, download the list.** The file rebuilds it with `/create-list` for the next jam: see [Download](/docs/list-actions/#download). Then seal it, or delete it.

## Small server, big server

- **A solo dev or a duo:** skip the owners. The groups alone show what's left.
- **A studio with several teams:** one list per discipline or milestone, each in its own channel. Tag the reviewers on the tasks they sign off with **Tag** <img class="inline-ic" src="/icons/tag.png" alt="" />.

## What TTM doesn't do here

TTM is a shared checklist, not a project tool. It has no kanban columns, sprints, story points or charts: a task is to do or completed. It doesn't track bugs or connect to Git, except through webhooks. Keep the bugs in an issue tracker, and the team's checklist in TTM.

## Questions

### Can I link the design doc or the repository?

Yes, with a Markdown link in the task: `[design doc](https://example.com)`. See [Adding a hyperlink](/docs/writing-a-list/#adding-a-hyperlink).

### What if two people edit the list at once?

In the channel, a list that someone is editing waits until they're done: see [When the list is locked](/docs/the-task-list/#when-the-list-is-locked). In the Activity, several people work on it at once and see each change live.

### What can a webhook send?

The text of the task and its state, the list, who ticked it and when, the server and the channel. You can add values of your own in the task's text: see [Tokens](/docs/webhooks/#tokens).

### Does it replace our issue tracker?

No. It keeps the team's checklist where the team talks. A webhook can tell your tracker when a task is ticked.
