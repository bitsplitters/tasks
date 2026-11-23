---
title: Planifie tes vidéos avec les personnes qui les font
seoTitle: "Bot Discord pour créateurs de contenu : ton pipeline vidéo"
name: Créateurs de contenu
description: "Une vidéo par semaine avec un monteur et une artiste de miniatures : un rappel d'échéance qui suit le travail quand quelqu'un est absent, le ping aux modérateurs avant la première et la nouvelle vidéo annoncée par un webhook."
highlights: "Des tâches données à quelqu'un d'autre, un rappel qui suit son nouveau propriétaire, une révision à deux, un lien mailto, un webhook qui annonce la vidéo, Cloner pour la prochaine vidéo."
intro: |
  Mia fait une vidéo par semaine pour sa chaîne. Leo monte, Sam dessine les miniatures et les modérateurs du serveur gèrent le chat pendant la première. La vidéo de cette semaine parle d'un minuscule bureau qu'elle a construit en un week-end. La liste vit dans #production, du lundi 7 au dimanche 13 décembre 2026, avec la première samedi à 18 h.
order: 6
team:
  guild: Mia Makes
  zone: America/Toronto
  people:
    - { id: "11869044175621001", name: Mia, username: mia.makes, color: "#f0b232", about: "Créatrice. Elle écrit la liste." }
    - { id: "11869044175621002", name: Leo, username: leo.edits, color: "#3ba55c", about: "Monteur. Absent du mardi au jeudi." }
    - { id: "11869044175621003", name: Sam, username: sam.thumbs, color: "#5865f2", about: "Miniatures. Il monte aussi." }
  roles:
    - { id: "11869044175622001", name: Modérateurs, about: "Quatre modérateurs du serveur." }
    - { id: "11869044175622002", name: TTM1, about: "Créé par TTM pour la révision finale, propriété de Leo et Sam.", members: ["11869044175621002", "11869044175621003"], ttm: true }
  channels:
    - { id: "11869044175623001", name: production, about: "L'équipe et les modérateurs. La liste vit ici." }
    - { id: "11869044175623002", name: annonces, about: "Là où les membres découvrent les nouvelles vidéos." }
list:
  title: "Épisode 42 : le bureau minuscule"
  channel: "11869044175623001"
  at: 2026-12-11T20:00
  look: |
    Vendredi soir : la vidéo est prête. Le premier montage et la passe couleur sont maintenant à Sam, avec le rappel du montage. « Révision finale » appartient à TTM1, le rôle que TTM a créé pour Leo et Sam. Le lien de la vidéo attend dans `{{video=…}}`, pour que le webhook le lise samedi.
  text: |
    - [X] <@11869044175621001>: Écrire le [script](https://docs.google.com/document/d/1tiny-desk-script/edit)
    - [X] <@11869044175621001>: Filmer la construction, avec les deux caméras
    - [X] <@11869044175621001>: [Demander au sponsor d'approuver la lecture de la pub](mailto:partners@example.com?subject=Episode%2042%20ad%20read)
    - [X] <t:1796922000> [0m,0m,0] <@11869044175621003>: Premier montage, environ 12 minutes
    - [X] <@11869044175621003>: Passe couleur et son
    - [X] <@11869044175621003>: Miniature, trois options au choix
    - [X] <@&11869044175622002>: Révision finale
    - [] <t:1797112800> [0m,0m,0] <@&11869044175622001>: Première à 18 h : épingler le lien et suivre le chat
    - [] {{wb=Nouvelle vidéo}} <@11869044175621001>: Publier la vidéo {{video=https://youtu.be/tinydesk42}}
    - [] <@11869044175621001>: Répondre aux premiers commentaires
webhooks:
  - name: Nouvelle vidéo
    service: discord
    trigger: completion
    method: POST
    url: https://discord.com/api/webhooks/<id>/<token>
    headers: "Content-Type: application/json"
    body: |
      {"content": "Nouvelle vidéo : **J'ai construit un minuscule bureau en un week-end**\n{{video}}", "allowed_mentions": {"parse": []}}
    postsAs: { name: Mia Makes, channel: "11869044175623002", color: "#f0b232" }
    setup: |
      Ouvre les paramètres de #annonces, puis *Intégrations → Webhooks → Nouveau webhook*. Donne-lui le nom « Mia Makes », mets-y l'image du salon et appuie sur **Copier l'URL du webhook** : c'est l'URL ci-dessus. Garde-la secrète, comme un mot de passe.

      Le lien vient de la tâche : `{{video}}` lit la variable libre `{{video=…}}`. Mia écrit le lien avec **Contenu** dès que YouTube le lui donne, avant la première. La semaine prochaine, elle change le titre dans le body avec `/config webhook action:modifier`, ou le déplace aussi dans la tâche, sous la forme `{{title=…}}`.
settings:
  - setting: Astuces
    choice: Désactivées
    why: "L'équipe connaît les boutons. Sans le Tutoriel et la ligne d'aide, la liste est plus courte."
  - setting: Notifications push lisibles
    choice: Activé
    why: "Sam lit les rappels sur son téléphone. La notification push montre la tâche, pas une carte vide."
  - setting: Tâches terminées estompées
    choice: Activé
    why: "Vendredi, la plus grande partie de la liste est faite. Les tâches cochées s'estompent, et la première ressort."
week:
  - at: 2026-12-07T10:00
    text: "Mia lance `/creer-liste` dans #production et écrit les tâches de la semaine. Puis elle donne à chacune son propriétaire avec **Propriétaire** : les notifications mentionnent Leo, Sam et @Modérateurs, donc chacun sait ce qui est à lui. **Rappel** fixe l'échéance du montage et le ping de la première, et **Webhook** associe « Publier la vidéo » à Nouvelle vidéo. Le lien du sponsor ouvre un nouvel e-mail, avec l'objet déjà écrit."
  - at: 2026-12-07T10:30
    text: "Mia donne « Révision finale » à Leo et Sam ensemble : elle choisit les deux dans le menu sous **Propriétaire**. TTM crée pour eux le rôle **TTM1** et en fait le propriétaire. Un propriétaire de plusieurs personnes est une fonctionnalité [Premium](/premium/), débloquée pour chaque serveur pendant la bêta."
  - at: 2026-12-08T09:00
    text: "Leo est absent jusqu'à jeudi soir. Mia **donne** ses deux tâches à Sam : elle choisit Sam dans le menu sous **Propriétaire**, confirme, puis choisit « Premier montage ». Elle recommence pour la passe couleur. La notification nomme Leo et mentionne Sam, donc Discord le prévient."
    card: { kind: notice, type: updated, by: "11869044175621001", from: "11869044175621002", task: "4" }
  - at: 2026-12-10T12:00
    text: "L'échéance du premier montage arrive à Sam par message privé. Elle ne va plus à Leo : un rappel suit le propriétaire de sa tâche."
    card: { kind: reminder, task: "4" }
  - at: 2026-12-10T16:30
    text: "Sam termine le montage et le coche."
  - at: 2026-12-11T17:00
    text: "Leo est de retour. Lui et Sam regardent la vidéo ensemble, et Leo coche « Révision finale » : l'un ou l'autre peut le faire, puisque tous deux ont TTM1."
  - at: 2026-12-12T17:00
    text: "Le rappel de la première mentionne @Modérateurs dans #production, en réponse à la liste. Une heure avant : la date du rappel est 17 h."
    card: { kind: reminder, task: "8" }
  - at: 2026-12-12T18:00
    text: "La première commence. Mia coche « Publier la vidéo », et le webhook publie le lien dans #annonces."
    card: { kind: webhook, webhook: Nouvelle vidéo, task: "9", by: "11869044175621001" }
fonte: ef4a937f2aeb
---

## La prochaine fois

Après cette vidéo, Mia ouvre **Autre** <img class="inline-ic" src="/icons/other.png" alt="" /> et appuie sur **Cloner la liste** : le même salon, sans les cases cochées et sans les rappels. Avec **Mise à jour groupée**, elle change le titre, les tâches et les liens, et retire le `{{video=…}}` de l'ancienne vidéo. Ensuite, elle donne les nouvelles dates avec **Rappel**. Voir [Cloner](/docs/list-actions/#clone).

Le clone garde TTM1 comme propriétaire de « Révision finale », donc le rôle reste même si Mia supprime l'ancienne liste : TTM ne le supprime que lorsqu'aucune liste ne l'utilise plus.

## Ce que TTM ne fait pas ici

TTM ne téléverse pas, ne programme pas et ne monte pas de vidéos, et il ne lit pas les statistiques de ta chaîne. Il ne conserve pas de fichiers : le montage et les miniatures vivent dans ton cloud, et la liste y renvoie. TTM garde le travail de la semaine, les échéances et les personnes.

## Questions

### Et si Mia avait retiré Leo au lieu de donner ses tâches à Sam ?

Le rappel serait parti avec lui : un rappel sans propriétaire n'atteint personne. S'il ne s'est pas encore déclenché, TTM demande d'abord : tu peux fermer la fenêtre pour tout garder. Voir [Propriétaire](/docs/channel-tasks/#owner).

### Pourquoi Sam a-t-il reçu une mention et pas Mia ?

Une notification mentionne la personne qui reçoit une tâche de quelqu'un d'autre. Sam a reçu les tâches de Leo de la part de Mia. La personne qui agit n'est jamais mentionnée : elle le sait déjà. Voir [Propriétaires et tags](/docs/owners-and-tags/).

### Le rappel de la première peut-il arriver plus tôt, ou deux fois ?

Le rappel arrive à la date que tu lui donnes, donc une heure avant, c'est 17 h. Pour pinger les modérateurs deux fois, une heure avant et dix minutes avant, rends-le répété : à partir de 17 h, toutes les 50 minutes, deux fois en tout. Les rappels répétés sont une fonctionnalité [Premium](/premium/), débloquée pour chaque serveur pendant la bêta. Voir [Rappels répétés](/docs/reminders/#repeating-reminders).
