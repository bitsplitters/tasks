---
title: Garde ton équipe de modération sur la même longueur d'onde
seoTitle: "Bot Discord de gestion de staff : des tâches pour ton équipe de modération"
name: Staff et modérateurs
description: "La semaine d'une équipe de modération dans une seule liste : appartenant à un rôle, un rappel de réunion qui se répète, deux nouveaux helpers qui se partagent une tâche, et une annonce quand les règles changent."
highlights: "Un rôle comme propriétaire, le refus pour qui n'en fait pas partie, un rôle créé par TTM pour deux personnes, un rappel récurrent, un webhook avec une variable libre, le fil de l'historique."
intro: |
  Ava dirige les modérateurs de **Lumen Lounge**, un serveur d'environ 4 000 membres. Les tâches du staff se répètent chaque semaine, et deux nouveaux helpers, Kai et Zoe, commencent lundi. Voici la première semaine de l'équipe avec TTM, du lundi 7 au dimanche 13 décembre 2026.
order: 2
team:
  guild: Lumen Lounge
  zone: America/New_York
  people:
    - { id: "11829044175621001", name: Ava, username: ava.lumen, color: "#eb459e", about: "Responsable des modérateurs, et modératrice elle-même." }
    - { id: "11829044175621002", name: Leo, username: leo.lumen, color: "#3ba55c", about: "Modérateur." }
    - { id: "11829044175621003", name: Noa, username: noa.lumen, color: "#e67e22", about: "Helper." }
    - { id: "11829044175621004", name: Kai, username: kai.lumen, color: "#1abc9c", about: "Nouveau helper, depuis lundi." }
    - { id: "11829044175621005", name: Zoe, username: zoe.lumen, color: "#9b59b6", about: "Nouvelle helper, depuis lundi." }
  roles:
    - { id: "11829044175622001", name: Modérateurs, about: "Ava, Leo et trois autres." }
    - { id: "11829044175622002", name: Helpers, about: "Noa, et depuis lundi Kai et Zoe." }
    - { id: "11829044175622003", name: Administrateurs, about: "Les propriétaires du serveur." }
    - { id: "11829044175622004", name: TTM1, about: "Créé par TTM pour une tâche confiée à deux personnes.", members: ["11829044175621004", "11829044175621005"], ttm: true }
  channels:
    - { id: "11829044175623001", name: staff, about: "Privé pour le staff. La liste vit ici." }
    - { id: "11829044175623002", name: règles, about: "Les règles du serveur." }
    - { id: "11829044175623003", name: annonces, about: "Là où chaque membre lit les nouvelles." }
list:
  title: "Équipe de modération : semaine 50"
  channel: "11829044175623001"
  at: 2026-12-09T21:00
  look: |
    Presque toutes les tâches appartiennent à @Modérateurs : n'importe quel modérateur peut les cocher. « Accompagner un modérateur pendant une journée » appartient à @TTM1, le rôle que TTM a créé pour Kai et Zoe. Le rappel de la réunion affiche `↻7d ×4` : tous les 7 jours, 4 fois en tout.
  text: |
    - [X] <@&11829044175622001>: Examiner les signalements ouverts
    - [] <@&11829044175622001>: Vider la file de modération
    - [X] <@&11829044175622001>: Vérifier le journal d'AutoMod
    - [] <t:1796688000> [0m,7d,3] <@&11829044175622001>: Réunion du staff, lundi à 19 h dans le salon vocal Staff
    - [X] {{wb=Règles modifiées}} <@&11829044175622001>: Mettre à jour les règles dans <#11829044175623002> {{change=Les spoilers restent dans les salons de spoilers pendant deux semaines après une sortie}} <@&11829044175622003>
    - [X] <@&11829044175622004>: Accompagner un modérateur pendant une journée
    - [] <@11829044175621001>: Accueillir les nouveaux helpers
     - [X] Donner à Kai et Zoe le rôle Helper
     - [] Leur présenter les outils de modération
    - [] <@&11829044175622001>: Publier le compte rendu de la réunion pour les absents
    - [] <@&11829044175622001>: Planifier l'événement communautaire de la semaine prochaine
    - [] <@&11829044175622001>: Remercier les membres qui ont aidé cette semaine
webhooks:
  - name: Règles modifiées
    service: discord
    trigger: completion
    method: POST
    url: https://discord.com/api/webhooks/<id>/<token>
    headers: "Content-Type: application/json"
    body: |
      {"content": "**Les règles ont changé.** {{change}}.\nLis la nouvelle version dans <#11829044175623002>.", "allowed_mentions": {"parse": []}}
    postsAs: { name: Lumen Staff, channel: "11829044175623003", color: "#5865f2" }
    setup: |
      Ouvre les paramètres de #annonces, puis *Intégrations → Webhooks → Nouveau webhook*. Donne-lui le nom « Lumen Staff » et appuie sur **Copier l'URL du webhook** : c'est l'URL ci-dessus. Garde-la secrète, comme un mot de passe.

      Le body ne dit pas ce qui a changé : `{{change}}` le dit, à partir de la variable libre écrite dans la tâche, `{{change=…}}`. La prochaine fois que les règles changent, le modérateur écrit le nouveau changement dans la tâche avec **Contenu**, et le même webhook le dit. `allowed_mentions` avec un `parse` vide empêche le message de mentionner qui que ce soit.
settings:
  - setting: Mode de notification
    choice: Supprimer toutes les notifications sauf la dernière
    why: "#staff est l'endroit où l'équipe discute. Seule la dernière notification reste sous la liste, donc la conversation reste lisible."
  - setting: Suivi de l'historique
    choice: Activé
    why: "Le fil de la liste garde une ligne par action, avec la personne qui l'a faite : Ava lit la semaine là, pas dans le salon."
  - setting: Conserver l'état après la sélection
    choice: Activé
    why: "Ava choisit @Modérateurs une fois et le donne à plusieurs tâches à la suite : **Propriétaire** reste bleu après chacune."
  - setting: Rappels récurrents
    choice: Récurrents activés
    premium: true
    why: "La réunion du staff a lieu chaque lundi : un seul rappel qui se répète, au lieu d'un nouveau chaque semaine."
  - setting: Synchroniser les permissions
    choice: Chargées
    why: "Dans *Paramètres du serveur → Intégrations*, seuls les rôles du staff peuvent utiliser TTM. Un membre qui se retrouve dans #staff par erreur voit la liste en lecture seule."
week:
  - at: 2026-12-07T09:00
    text: "Ava écrit la liste de la semaine dans #staff avec `/creer-liste`, sans propriétaires."
  - at: 2026-12-07T09:10
    text: "Ava choisit @Modérateurs dans le menu sous **Propriétaire**, puis les tâches l'une après l'autre. Avec *Conserver l'état après la sélection*, **Propriétaire** reste bleu entre elles, donc chaque tâche prend le rôle en un clic. Chaque notification mentionne @Modérateurs ; avec *Supprimer toutes les notifications sauf la dernière*, seule la dernière reste."
  - at: 2026-12-07T10:30
    text: "Ava donne « Accompagner un modérateur pendant une journée » à Kai et Zoe ensemble : elle choisit les deux dans le menu. TTM crée le rôle **TTM1**, le donne aux deux et en fait le propriétaire. La notification mentionne le rôle, donc les deux sont prévenus. Un propriétaire de plusieurs personnes est une fonctionnalité [Premium](/premium/), débloquée pour chaque serveur pendant la bêta."
    card: { kind: notice, type: assigned, by: "11829044175621001", task: "6" }
  - at: 2026-12-07T19:00
    text: "Le rappel de la réunion arrive. Le propriétaire est un rôle, donc le rappel est un message dans #staff qui mentionne @Modérateurs, en réponse à la liste."
    card: { kind: reminder, task: "4" }
  - at: 2026-12-08T11:00
    text: "Leo met à jour les règles et coche la tâche. Le webhook publie le changement dans #annonces, avec le texte de la variable libre."
    card: { kind: webhook, webhook: Règles modifiées, task: "5", by: "11829044175621002" }
  - at: 2026-12-08T15:20
    text: "Noa, une helper, essaie de cocher « Examiner les signalements ouverts ». La tâche appartient à @Modérateurs, donc elle reçoit un refus qu'elle seule voit : *Cette tâche ne peut être cochée ou décochée que par @Modérateurs, ou par qui gère les messages de ce salon.* La liste ne change pas."
  - at: 2026-12-08T15:30
    text: "Leo examine les signalements et coche la tâche : tout membre du rôle le peut."
  - at: 2026-12-09T18:00
    text: "Kai et Zoe passent la journée avec Leo. Le soir, Kai coche leur tâche : l'un ou l'autre peut le faire, puisque tous deux ont TTM1."
  - at: 2026-12-11T17:00
    text: "Ava ouvre le fil de la liste. Il a une ligne pour chaque propriétaire, coche et changement de la semaine, avec la personne qui l'a fait."
  - at: 2026-12-11T17:15
    text: "Ava veut garder TTM1 pour les prochains essais. Dans *Paramètres du serveur → Rôles*, elle le renomme « Helpers à l'essai » : à partir de là, c'est un des rôles du serveur, et TTM ne le supprime jamais. Sans le nouveau nom, TTM supprimerait le rôle dès qu'aucune liste ne l'utiliserait."
fonte: 00ff5b6fd601
---

## La prochaine fois

Chaque lundi, Ava appuie sur **Tout rouvrir** <img class="inline-ic" src="/icons/reopen.png" alt="" /> et choisit **Rouvrir** : les tâches repartent de zéro avec leurs propriétaires. Personne ne coche la réunion du staff, parce que cocher une tâche arrête son rappel : elle reste dans la liste tout le mois, et son rappel revient tout seul chaque lundi. Une liste dont les rappels sont uniques utiliserait plutôt **Nouvelle date**, qui les déplace d'un coup vers la nouvelle semaine. Voir [Tout rouvrir](/docs/list-actions/#reopen-all).

## Ce que TTM ne fait pas ici

TTM ne modère pas. Il n'a ni bans, ni avertissements, ni journaux de cas, ni tickets : un bot de modération et un bot de tickets s'en chargent. TTM garde le travail autour d'eux, les tâches que ton équipe répète chaque semaine. Il ne suit pas les horaires et ne mesure pas l'activité de chaque modérateur.

## Questions

### Qui peut cocher une tâche appartenant à un rôle ?

Tout membre du rôle, et toute personne qui a *Gérer les messages* sur le salon. Tous les autres reçoivent un refus qu'eux seuls voient : voir [Qui peut cocher une tâche](/docs/core-concepts/#who-can-tick-a-task).

### Un modérateur peut-il recevoir le rappel par message privé ?

Oui : fais de ce modérateur le propriétaire à la place du rôle. Un rappel arrive à une personne par message privé, et à un rôle par une mention dans le salon. Voir [Comment le rappel arrive](/docs/reminders/#how-the-reminder-arrives).

### Que devient TTM1 si personne ne le renomme ?

TTM supprime un rôle qu'il a créé dès qu'aucune liste ne l'utilise, en vérifiant toutes les dix minutes. Le renommer, lui donner une permission ou changer ses membres en fait un des rôles de ton serveur, et TTM n'y touche plus. Voir [Les rôles que TTM crée](/docs/owners-and-tags/#the-roles-ttm-creates).
