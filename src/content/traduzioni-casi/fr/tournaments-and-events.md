---
title: Organise un tournoi communautaire sans tableur
seoTitle: Bot Discord pour tournois et événements communautaires
name: Tournois et événements
description: "Une coupe du samedi avec huit équipes : des arbitres propriétaires, un rappel qui relance les équipes manquantes, le ping des commentateurs avant le stream et le vainqueur annoncé par un webhook."
highlights: "Des propriétaires dans un groupe, le rôle TTM des commentateurs, un rappel toutes les 15 minutes, des cases cochées en direct dans l'Activity, le vainqueur dans une variable libre, Cloner pour la semaine prochaine."
intro: |
  Mia organise la **Saturday Cup #12** sur son serveur de jeux : huit équipes, quatre arbitres, deux commentateurs au stream. Les équipes jouent depuis plusieurs pays. Le staff a une liste dans #tournoi-staff pour la semaine du lundi 7 au dimanche 13 décembre 2026, et samedi ils la cochent en direct, ensemble.
order: 3
team:
  guild: Fragline
  zone: Europe/London
  people:
    - { id: "11839044175621001", name: Mia, username: mia.fragline, color: "#f0b232", about: "Organisatrice. Elle a Gérer les messages dans le salon du staff." }
    - { id: "11839044175621002", name: Leo, username: leo.casts, color: "#3ba55c", about: "Commentateur." }
    - { id: "11839044175621003", name: Sam, username: sam.casts, color: "#5865f2", about: "Commentateur." }
    - { id: "11839044175621004", name: Noa, username: noa.ref, color: "#e74c3c", about: "Arbitre." }
    - { id: "11839044175621005", name: Kai, username: kai.ref, color: "#1abc9c", about: "Arbitre." }
    - { id: "11839044175621006", name: Zoe, username: zoe.ref, color: "#9b59b6", about: "Arbitre. En retard samedi." }
  roles:
    - { id: "11839044175622001", name: Arbitres, about: "Noa, Kai, Zoe et un autre." }
    - { id: "11839044175622002", name: TTM1, about: "Créé par TTM pour le stream, confié aux deux commentateurs.", members: ["11839044175621002", "11839044175621003"], ttm: true }
  channels:
    - { id: "11839044175623001", name: tournoi-staff, about: "Le salon du staff. La liste vit ici." }
    - { id: "11839044175623002", name: annonces, about: "Là où les joueurs lisent les résultats." }
    - { id: "11839044175623003", name: Scène principale, about: "Le salon vocal du stream.", voice: true }
list:
  title: "Saturday Cup #12"
  channel: "11839044175623001"
  at: 2026-12-12T19:10
  look: |
    Samedi soir, après la finale. « Tour 1 » n'a pas de propriétaire : chaque match appartient à son arbitre, donc le groupe s'est coché tout seul, avec le dernier match. « Relancer les équipes manquantes » affiche `↻15m ×3` : trois pings, à quinze minutes d'écart. La variable libre `{{winner=Team Nova}}` reste dans le texte, là où le webhook l'a lue.
  text: |
    - [X] <@11839044175621001>: Ouvrir les inscriptions, avec le [tableau sur Challonge](https://challonge.com/saturday_cup_12)
    - [X] <@&11839044175622001>: Vérifier les rosters des huit équipes
    - [X] <t:1797080400> [0m,0m,0] <@&11839044175622001>: Ouvrir le check-in, de 13 h à 14 h
    - [X] <t:1797082200> [0m,15m,2] <@&11839044175622001>: Relancer les équipes manquantes
    - [X] <t:1797085800> [0m,0m,0] <@&11839044175622002>: Passer en direct dans l'appel Scène principale à 15 h
    - [X] Tour 1, au meilleur des trois
     - [X] <@11839044175621004>: Match A : Team Nova contre Pixel Pirates
     - [X] <@11839044175621005>: Match B : Iron Owls contre Blue Shift
     - [X] <@11839044175621006>: Match C : Night Foxes contre Glitch Gang
     - [X] <@11839044175621005>: Match D : Red Comets contre Lumen Five
    - [X] <@&11839044175622001>: Arbitrer les demi-finales et la finale
    - [X] {{wb=Résultats}} <@11839044175621001>: Publier les résultats {{winner=Team Nova}}
    - [] <@&11839044175622002>: Téléverser le replay de la finale
    - [] <@11839044175621001>: Remercier les équipes et envoyer le formulaire de retours
    - [] <@11839044175621001>: Ouvrir les inscriptions pour la Saturday Cup #13
webhooks:
  - name: Résultats
    service: discord
    trigger: completion
    method: POST
    url: https://discord.com/api/webhooks/<id>/<token>
    headers: "Content-Type: application/json"
    body: |
      {"content": "🏆 **{{winner}}** a remporté {{list}} ! GG aux huit équipes. Le tableau reste en ligne sur Challonge.", "allowed_mentions": {"parse": []}}
    postsAs: { name: Fragline Cups, channel: "11839044175623002", color: "#e67e22" }
    setup: |
      Ouvre les paramètres de #annonces, puis *Intégrations → Webhooks → Nouveau webhook*. Donne-lui le nom « Fragline Cups » et appuie sur **Copier l'URL du webhook** : c'est l'URL ci-dessus. Garde-la secrète, comme un mot de passe.

      Deux jetons écrivent le message. `{{winner}}` vient de la variable libre de la tâche, `{{winner=…}}`, que Mia écrit une fois la finale terminée. `{{list}}` est le titre de la liste : la liste de la semaine prochaine s'appellera Saturday Cup #13, et le même webhook nommera la nouvelle coupe.
settings:
  - setting: Fuseau horaire
    choice: Europe/London
    why: "La coupe se joue à l'heure de Londres. Discord affiche chaque date de la liste dans le fuseau du lecteur, donc un arbitre à Toronto lit ses propres heures. Quand un arbitre enregistre un rappel, TTM propose le fuseau de sa langue Discord jusqu'à ce qu'il en choisisse un."
  - setting: Notifications push lisibles
    choice: Activé
    why: "Les arbitres lisent les rappels sur leur téléphone. La notification push montre la tâche, pas une carte vide."
  - setting: Mentionner les propriétaires dans les nouvelles listes
    choice: Activé
    why: "La liste de la semaine prochaine mentionne @Arbitres et les commentateurs dès qu'elle est publiée : ils savent que la coupe a lieu."
  - setting: Rappels récurrents
    choice: Récurrents activés
    premium: true
    why: "« Relancer les équipes manquantes » envoie un ping toutes les 15 minutes, jusqu'à trois fois."
week:
  - at: 2026-12-07T19:00
    text: "Mia lance `/creer-liste` dans #tournoi-staff et écrit les tâches de samedi, avec @Arbitres comme propriétaire des tâches que n'importe quel arbitre peut faire, écrit sous la forme `@Arbitres:` ([Modifier une liste à la main](/docs/writing-a-list/#owners-the-mention-with-a-colon) montre comment). Elle colle le lien du tableau depuis Challonge. La première notification mentionne @Arbitres, donc chaque arbitre est prévenu."
  - at: 2026-12-08T20:30
    text: "Mia donne « Passer en direct » à Leo et Sam ensemble : elle choisit les deux dans le menu sous **Propriétaire**. TTM crée le rôle **TTM1** pour eux deux et en fait le propriétaire. Un propriétaire de plusieurs personnes est une fonctionnalité [Premium](/premium/), débloquée pour chaque serveur pendant la bêta."
  - at: 2026-12-09T21:00
    text: "Mia ajoute les rappels avec **Rappel** : le check-in à 13 h pour @Arbitres, « Relancer les équipes manquantes » à 13 h 30 toutes les 15 minutes, 3 fois en tout, et le stream à 14 h 30 pour TTM1."
  - at: 2026-12-12T13:00
    text: "Le rappel du check-in mentionne @Arbitres dans #tournoi-staff. Kai ouvre le check-in et coche la tâche."
  - at: 2026-12-12T13:30
    text: "« Relancer les équipes manquantes » prévient @Arbitres. Deux équipes manquent, et Noa écrit à leurs capitaines. À 13 h 45, le ping revient."
  - at: 2026-12-12T13:52
    text: "La dernière équipe fait son check-in, et Noa coche « Relancer les équipes manquantes ». Cocher une tâche arrête son rappel : le ping de 14 h ne vient jamais."
  - at: 2026-12-12T14:30
    text: "Le rappel du stream mentionne TTM1, donc Leo et Sam le reçoivent tous les deux."
    card: { kind: reminder, task: "5" }
  - at: 2026-12-12T14:40
    text: "Mia ouvre la liste avec **Activity** <img class=\"inline-ic\" src=\"/icons/activity.png\" alt=\"\" />, le premier bouton sous la liste. Les arbitres la rejoignent avec **Rejoindre l'Activity**, et chacun coche son match quand il se termine. Zoe est en retard : depuis le panneau de « Match C », Mia lui donne le match."
  - at: 2026-12-12T15:35
    text: "Noa termine le Match A et touche la case de tout « Tour 1 ». Une bulle dit non : cocher le groupe cocherait aussi les matchs de Kai et Zoe. Mia le pourrait, avec *Gérer les messages* sur le salon. Elle attend plutôt : quand Kai coche le Match D, le dernier, le groupe se coche tout seul."
  - at: 2026-12-12T18:45
    text: "La Team Nova gagne la finale. Mia écrit `{{winner=Team Nova}}` dans « Publier les résultats » avec **Contenu**, puis coche la tâche. Le webhook publie le vainqueur dans #annonces."
    card: { kind: webhook, webhook: Résultats, task: "8", by: "11839044175621001" }
  - at: 2026-12-12T19:05
    text: "Le dernier arbitre quitte l'Activity. La liste retourne dans #tournoi-staff avec un résumé, une ligne par changement avec la personne qui l'a fait. Le résumé mentionne Zoe, qui a reçu le Match C dans l'Activity : les mentions d'une session arrivent avec lui."
fonte: b260b9b17faa
---

## La prochaine fois

Dimanche, Mia ouvre **Autre** <img class="inline-ic" src="/icons/other.png" alt="" /> et appuie sur **Cloner la liste** : le même salon, sans les cases cochées et sans les rappels. Avec **Mise à jour groupée**, elle change le titre en Saturday Cup #13, le lien du tableau et les matchs, et retire `{{winner=Team Nova}}`. Puis elle donne les dates du nouveau samedi avec **Rappel**. Le clone mentionne @Arbitres et TTM1 dans sa première notification. Voir [Cloner](/docs/list-actions/#clone).

La coupe de la semaine dernière reste comme compte rendu. Pour libérer sa place, Mia peut la **Sceller**, aussi dans **Autre** : le message reste, sans boutons.

## Ce que TTM ne fait pas ici

TTM ne gère pas les tableaux, ne tient pas les scores et ne fait pas les check-ins des équipes : Challonge et start.gg s'en chargent. Il ne fait pas non plus de stream. TTM garde le travail du staff au même endroit, prévient les bonnes personnes à la bonne minute et annonce le résultat que tu écris.

## Questions

### Pourquoi Noa n'a-t-elle pas pu cocher Tour 1 ?

Un groupe entraîne ses sous-tâches. Le cocher aurait coché les matchs de Kai et Zoe, et seuls leurs propriétaires peuvent le faire, ou toute personne qui a *Gérer les messages* sur le salon. Voir [Qui peut cocher une tâche](/docs/core-concepts/#who-can-tick-a-task).

### Et si personne ne coche « Relancer les équipes manquantes » ?

Il envoie trois pings en tout, à 13 h 30, 13 h 45 et 14 h, puis s'arrête. Le badge `↻15m ×3` le dit. Voir [Rappels répétés](/docs/reminders/#repeating-reminders).

### Les commentateurs reçoivent-ils le rappel du stream par message privé ?

Non. TTM1 est un rôle, et un rappel pour un rôle est un message dans le salon de la liste qui le mentionne, donc Discord prévient tous les membres du rôle. Donne la tâche à un seul commentateur pour l'envoyer par message privé. Voir [Comment le rappel arrive](/docs/reminders/#how-the-reminder-arrives).
