---
title: "/config app"
description: "Adapte les notifications, l'historique, les rappels, le fuseau horaire et les permissions avec /config app."
fonte: 449f5cc3050a
---

Lance la commande :

```
/config app
```

TTM ouvre un panneau privé avec un résumé de tes réglages actuels : d'abord le bouton **Astuces**, puis cinq menus déroulants et deux autres boutons. Rien ici n'est définitif : modifie les réglages quand les besoins de ton équipe changent.

Par défaut, seuls les membres qui ont la permission *Gérer le serveur* peuvent utiliser `/config app`, comme le reste de `/config`. Voir [Qui peut ouvrir /config](/docs/config/#who-can-open-config).

Les réglages s'appliquent aux listes du salon comme à celles de l'[Activity](/docs/activity/). Quand l'un d'eux ne compte qu'à un seul endroit, ou fonctionne différemment dans les deux, sa section le dit.

## Astuces

Le premier groupe du panneau est un bouton qui montre si les astuces sont activées : vert avec **Activées** quand elles le sont, gris avec **Désactivées** quand elles ne le sont pas. Clique dessus pour les basculer. Les astuces comptent dans le salon et dans l'Activity.

Les astuces sont une aide pour qui découvre TTM, à quatre endroits :

- quand quelqu'un lance `/creer-liste`, une courte explication sur la façon d'écrire une liste et une invitation à essayer le mode Activity, avec les boutons **Crée ta liste** et **Tutoriel** : la nouvelle liste prend la place de l'explication ;
- sous chaque liste du salon, une petite ligne qui renvoie au guide dans Discord : *Tu ne sais pas à quoi servent les boutons ? Autre → Guide*, avec un lien vers [La liste dans le salon](/docs/the-task-list/) ;
- sous la liste dans l'Activity, une ligne qui dit où toucher : *Tu ne sais pas par où commencer ? Touche une case pour cocher une tâche, son texte pour le reste.* Voir [Travailler sur une liste dans l'Activity](/docs/activity-list/) ;
- dans une nouvelle liste, la première notification dans le salon se termine par une courte explication : pourquoi TTM publie des notifications, ce qu'est le fil de l'historique et où les configurer. Elle apparaît une seule fois par liste : voir [Quand une liste est créée](#when-a-list-is-created).

Activées par défaut : pratiques tant que l'équipe apprend les boutons, faciles à désactiver quand tout le monde les connaît. Avec les astuces masquées :

- `/creer-liste` ouvre tout de suite le formulaire de création, sans le bouton **Tutoriel** : voir [Pour commencer](/docs/getting-started/#2-create-your-first-list) ;
- les listes se terminent sans la ligne d'aide ;
- les nouvelles listes publient leur première notification sans l'explication.

Une liste prend en compte le changement à sa prochaine mise à jour. Dans les deux cas, la [barre de progression](/docs/the-task-list/#under-the-list) reste, et une liste verrouillée se termine toujours par la ligne qui dit qui la modifie : voir [Quand la liste est verrouillée](/docs/the-task-list/#when-the-list-is-locked).

## Mode de notification

Contrôle combien de bruit de notifications le bot laisse dans le salon quand des tâches sont sélectionnées :

| Option | Comportement |
| :--- | :--- |
| Supprimer toutes les notifications sauf la dernière | Supprime toutes les notifications sauf la plus récente. |
| Supprimer toutes les notifications sauf les deux dernières | Supprime toutes les notifications sauf les deux dernières. |
| Ne supprimer aucune notification | Ne supprime jamais les notifications. |
| Notifications désactivées | Ne publie aucune notification de sélection de tâche. |

Quand un cochage termine toute la liste, sa notification indique **Liste terminée** sous le nom de la personne qui a coché, et le [fil de l'historique](#history-tracking) aussi.

Dans l'Activity, les cochages ne publient aucune notification un par un : quand la liste revient dans le salon, le récapitulatif de la session suit ce réglage. Voir [Revenir dans le salon](/docs/activity/#back-to-the-channel).

### Quand une liste est créée

Une nouvelle liste publie sa propre notification sous elle : *j'ai créé la liste*, avec un lien vers la liste. Elle vient de `/creer-liste`, du Tutoriel, d'un import depuis un fichier, d'un clone et de **Nouvelle liste** dans l'Activity. Un clone la publie dans le nouveau salon, et le salon de la liste d'origine reçoit la notification habituelle du clone. Avec le mode **Notifications désactivées**, rien n'est publié dans le salon, mais le fil de l'historique enregistre quand même la création.

Avec [Mentionner les propriétaires dans les nouvelles listes](#mention-owners-in-new-lists) activé, la notification mentionne les propriétaires des tâches, et Discord les prévient. Une liste créée dans l'Activity les mentionne dans le récapitulatif qui la suit dans le salon.

Avec les [Astuces](#tips) activées, la première notification d'une nouvelle liste se termine par une explication : pourquoi TTM publie des notifications et, si le suivi de l'historique est activé, ce qu'est le fil. Elle apparaît une seule fois par liste, et seulement si les astuces et les notifications étaient toutes les deux activées à la création de la liste : une équipe qui en a désactivé une s'y retrouve déjà. Les listes créées avant l'arrivée de cette explication ne l'affichent pas.

## Suivi de l'historique

Quand il est activé, **chaque action sur tes listes est enregistrée dans un fil dédié**, ce qui te donne une piste d'audit de qui a fait quoi et quand. Activé par défaut. Le fil commence avec la liste : sa première ligne dit qui l'a créée. Les listes dans les salons vocaux n'ont pas de fil d'historique, parce que Discord n'y autorise pas les fils : voir [Salons vocaux](/docs/known-limits/#voice-channels). Une session dans l'Activity entre en entier dans le fil, une ligne par modification, quand la liste revient dans le salon.

## Comportement

Un menu déroulant avec trois options : **Notifications push lisibles**, **Conserver l'état après la sélection** et **Mentionner les propriétaires dans les nouvelles listes**. Elles décident de ce que fait TTM quand quelqu'un agit sur une liste. Coche celles que tu veux activer : tu peux cocher les trois, quelques-unes ou aucune.

### Notifications push lisibles

Quand l'option est activée, TTM ajoute du texte simple à côté des embeds, pour que tes **notifications push sur mobile** soient lisibles d'un coup d'œil. Les embeds seuls s'affichent souvent vides sur un écran verrouillé. Activée par défaut. La désactiver n'arrête jamais un rappel : il arrive avec sa seule fiche, ou, pour un rôle, avec la seule mention. Les mentions des propriétaires partent quand même, seules, même avec l'option désactivée.

### Conserver l'état après la sélection

Seulement dans le salon. Après avoir utilisé **Propriétaire**, **Tag** ou **Rappel** dans la deuxième rangée sous la liste, ce réglage décide si le bouton redevient gris ou **garde** le mode actif. Désactivée par défaut : le bouton redevient gris. Active-la quand tu appliques la même action à plusieurs tâches de suite.

Elle change aussi ce que **Tag** et **Propriétaire** peuvent faire. Désactivée, ton choix écrase toujours. Activée, tu peux aussi modifier en direct les tags ou le propriétaire existants d'une tâche. Voir [Tag](/docs/channel-tasks/#tag) pour le détail complet.

Dans l'Activity, le panneau d'une tâche fonctionne toujours de la même façon : après une action, il reste sur la tâche, avec les boutons gris. Voir [Le panneau d'une tâche](/docs/activity-list/#the-panel-of-a-task).

### Mentionner les propriétaires dans les nouvelles listes

Quand quelqu'un crée, importe ou clone une liste, sa première notification mentionne les propriétaires de ses tâches : personnes et rôles, chacun une fois, dans l'ordre de la liste. Les mentions vont dans le texte simple de la notification, et Discord prévient donc les propriétaires. La personne qui a créé la liste n'est pas mentionnée : elle sait déjà. @everyone ne l'est pas non plus, même s'il est propriétaire d'une tâche : une nouvelle liste ne prévient pas tout le serveur.

Activée par défaut, y compris sur les serveurs qui ont ajouté TTM avant l'arrivée de cette option. Une liste créée pendant une session de l'Activity mentionne ses propriétaires dans le récapitulatif, quand elle revient dans le salon. Voir [Quand une liste est créée](#when-a-list-is-created).

## Apparence des listes

Un menu déroulant avec deux options : **Tâches terminées estompées** et **Espace autour des groupes**. Elles décident de l'apparence des tâches dans les listes. Coche celles que tu veux activer : les deux, une seule ou aucune. Une liste déjà dans un salon prend en compte le changement à sa prochaine mise à jour, par exemple quand quelqu'un coche une tâche.

Les deux changent la liste dans le salon. Dans l'Activity, chacun règle son propre affichage avec l'engrenage : voir [Tes réglages](/docs/activity/#your-settings).

### Tâches terminées estompées

Affiche chaque tâche terminée dans le texte plus petit et gris de Discord, pour que ce qu'il reste à faire ressorte. Activée par défaut ; désactive-la pour afficher les tâches terminées comme toutes les autres. Une liste prend en compte le changement à sa prochaine mise à jour.

### Espace autour des groupes

Met une ligne vide au-dessus et en dessous de chaque tâche qui a des sous-tâches, pour que chaque groupe se détache du reste de la liste. Désactivée par défaut, pour une liste plus compacte : les serveurs qui ont ajouté TTM avant la version 2.0.0 l'ont activée jusqu'à ce qu'un administrateur la désactive. Elle ne change que la liste elle-même : les notifications restent comme elles sont. Discord n'a pas de ligne vide plus fine pour une liste, donc le choix est entre une ligne entière et aucune.

## Rappels récurrents

Désactivés par défaut. Quand ils sont désactivés, chaque rappel est un **événement unique** : en créer ou en modifier un se fait **en une seule étape**, tu choisis la date et l'heure, rien d'autre. Plus simple et plus rapide pour les équipes qui n'ont besoin que d'un rappel ponctuel.

**Active-les** pour débloquer les **répétitions et les intervalles**. Dans le salon, la création d'un rappel passe alors par le parcours en deux étapes : une [carte récapitulative](/docs/channel-tasks/#the-summary-card) plus une fenêtre de répétition. Dans l'Activity, les menus de répétition rejoignent la date dans le [panneau du rappel](/docs/activity-list/#reminder). Voir [Les champs de la répétition](/docs/reminders/#the-repetition-fields).

Les rappels récurrents sont une fonctionnalité [Premium](/docs/premium/). Sur l'offre Free, ce menu déroulant est affiché mais désactivé, et sa note le dit. Ton choix n'est pas perdu : sur Premium, le menu revient réglé comme tu l'avais laissé.

L'emoji Premium dans le titre du groupe s'affiche sur tous les serveurs, Premium compris : il signale une fonctionnalité Premium, pas une fonctionnalité manquante.

Un rappel qui est *déjà* récurrent continue de partir même quand l'interrupteur est désactivé, ou sur l'offre Free. Ce que tu peux encore changer : voir [Rappels répétés](/docs/reminders/#repeating-reminders).

## Fuseau horaire

Définit le fuseau horaire dans lequel travaille ton équipe. Les membres peuvent quand même utiliser le leur pour les rappels : tant qu'ils n'en ont pas choisi un, TTM leur propose le fuseau de leur langue Discord, et celui-ci seulement quand leur langue est parlée sur plusieurs fuseaux, comme l'anglais (US). Voir [Ton fuseau horaire](/docs/reminders/#your-time-zone). Clique sur le bouton, puis colle un nom de fuseau officiel : cherche-le sur la **[carte des fuseaux horaires](https://timezones.bitsplitters.app)**.

## Synchroniser les permissions

Par défaut, les permissions d'intégration de Discord ne masquent que les *commandes* : les boutons et les listes générés restent utilisables par tout le monde. Clique sur **Charger les permissions** pour étendre tes règles de permissions à ces composants aussi. Après la synchronisation, **les utilisateurs non autorisés voient la liste en lecture seule**.

Définis les règles dans *Paramètres du serveur → Intégrations → Team Tasks Manager*, puis synchronise. Les restrictions de salon sont respectées aussi : si un salon est interdit à un utilisateur, les listes qui s'y trouvent sont en lecture seule pour lui. Le bouton **Activity** sous la liste suit les mêmes règles : voir [Quand la liste ne s'ouvre pas](/docs/activity/#when-the-list-doesnt-open).

<div class="callout"><div class="callout-t">Les webhooks ont leur propre commande</div>Les webhooks ne se configurent pas depuis ce panneau : utilise <a href="/docs/config-webhook/"><code>/config webhook</code></a>. Ce qu'ils font : voir <a href="/docs/webhooks/">Webhooks</a>.</div>

<div class="callout"><div class="callout-t">Tu cherches tes listes ?</div>Ce panneau contient des <em>réglages</em> : la façon dont se comporte le bot. Pour voir les listes de ce serveur, et pour en supprimer, sceller ou régénérer une, utilise <code>/config lists</code> : voir <a href="/docs/config-lists/">/config lists</a>.</div>
