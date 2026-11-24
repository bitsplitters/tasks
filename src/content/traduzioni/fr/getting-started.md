---
title: "Pour commencer"
description: "Invite le bot, crée une liste, puis coche une tâche et définis un rappel, dans le salon ou dans l'Activity."
fonte: e7a439b39622
---

Team Tasks Manager (TTM) permet à ton équipe de partager et de gérer ses tâches **sans quitter Discord**. Cette page t'emmène de zéro à une liste qui marche : tu la crées, tu coches une tâche, tu définis un rappel.

<div class="callout"><div class="callout-t">Pendant la bêta, toutes les fonctionnalités sont débloquées</div>Toutes les fonctionnalités sont débloquées, pour chaque serveur. Quand ces pages parlent de l'offre Free ou de Premium, cela ne vaut qu'après la bêta : voir <a href="/docs/beta/">Comment fonctionne la bêta</a>.</div>

## 1. Invite le bot

<p><a class="btn" href="/invite">Ajouter à Discord</a></p>

Ce bouton invite Team Tasks Manager sur ton serveur. Garde les permissions qu'il demande : TTM en a besoin pour publier les listes, faire partir les rappels et écrire la timeline. Si tu en décoches une, le bot te dit exactement laquelle manque quand il en a besoin. À quoi sert chaque permission : [Les permissions que TTM demande](/docs/core-concepts/#the-permissions-ttm-asks-for).

## 2. Crée ta première liste

Tape `/` dans la zone de message et choisis la commande, ou commence à taper son nom :

```
/creer-liste
```

Si ton Discord est dans une autre langue, la commande a un nom traduit : en anglais, c'est `/create-list`. Tous les noms sont dans la [Référence des commandes](/docs/commands/#command-names-in-your-language).

TTM répond avec une courte explication de la façon d'écrire une liste et un bouton **Crée ta liste**. Clique dessus : un formulaire s'ouvre avec deux champs, le **titre de la liste** et la **liste des activités**. Écris une activité par ligne, chacune commençant par un tiret `-`. Par exemple, avec le titre *Tournoi du samedi* :

```
- Réserver les salons vocaux
- Préparer les tableaux
  - Recueillir les inscriptions
  - Répartir les équipes
- Publier le règlement
- Diffuser la finale
```

Les règles :

- **Une ligne qui commence par `-` est une tâche.**
- **Des espaces avant le tiret en font une sous-tâche** de la tâche au-dessus. Une tâche avec des sous-tâches devient un **groupe**.
- Le titre peut faire jusqu'à **90 caractères**, la liste environ **4000 caractères** et **50 tâches**, sous-tâches comprises : voir [Limites connues](/docs/known-limits/).

Envoie le formulaire, et la liste apparaît dans le salon. Voici la même liste après quelques étapes. La première tâche est cochée, *Préparer les tableaux* a un propriétaire et *Diffuser la finale* a un rappel.

<picture class="screen">
  <source media="(max-width: 640px)" srcset="/screens/fr/list-mobile.png" width="795" height="1063" />
  <img src="/screens/fr/list-desktop.png" width="529" height="418" loading="lazy" alt="La liste Tournoi du samedi dans Discord : six tâches numérotées avec des cases. La première est cochée et grisée ; Préparer les tableaux a deux sous-tâches et un propriétaire ; Diffuser la finale a un propriétaire et une date de rappel. Sous les tâches, une petite ligne renvoie à Autre, au Guide et à la documentation complète, et une barre verte montre l'avancement. Sous la liste se trouvent le menu déroulant, Cocher une tâche, et deux rangées de boutons." />
</picture>

Tu préfères apprendre en faisant ? À côté de **Crée ta liste**, il y a un bouton **Tutoriel** : il transforme l'explication en une liste d'essai de sept leçons dans ta langue, et t'envoie le Guide dans un message que toi seul peux voir.

Fais les leçons dans l'ordre : chacune nomme un bouton avec son icône et te demande de faire quelque chose avec lui, du simple cochage jusqu'à l'ouverture dans l'Activity.

La liste d'essai est une liste normale : quand tu as fini, supprime-la depuis **Autre** → **Supprimer la liste**.

Maintenant, choisis où travailler dessus. La liste est la même dans les deux endroits, et elle est [à un seul endroit à la fois](/docs/core-concepts/#one-list-two-places).

## <img class="place-ic" src="/icons/posto-canale.svg" alt="" />3. Dans le salon

### Cocher une tâche

Sous la liste, il y a le **menu de cochage**, un menu déroulant qui affiche le titre de la liste, et deux rangées de boutons. Ouvre le menu et choisis une tâche : sa case passe de <img class="inline-ic" src="/icons/checkbox_empty.png" alt="" /> à <img class="inline-ic" src="/icons/checkbox_marked.png" alt="" />, et la liste se met à jour pour tout le monde. Choisis-la de nouveau pour la rouvrir.

Cocher un groupe coche aussi ses sous-tâches. Selon tes [réglages](/docs/configuration/), TTM peut aussi publier une courte notification sous la liste et enregistrer le changement dans un fil de timeline.

<div class="callout"><div class="callout-t">Tu n'arrives pas à cocher une tâche ?</div>Chaque bouton de la deuxième rangée doit être <strong>éteint</strong> : si l'un est bleu ou rouge, choisir une tâche applique l'action de ce bouton à la place. Et une tâche qui a un propriétaire ne peut être cochée que par son propriétaire, et par toute personne qui a <em>Gérer les messages</em> sur le salon.</div>

### Définir un rappel

Sur la deuxième rangée :

1. Clique une fois sur **Rappel** <img class="inline-ic" src="/icons/alertW.png" alt="" />, le quatrième bouton : il devient **bleu**.
2. Choisis une tâche **pas encore cochée**. Un formulaire intitulé *Rappel pour la tâche …* s'ouvre, rempli avec dix minutes à partir de maintenant.
3. Envoie-le tel quel. Si ton serveur a activé les rappels récurrents, une carte récapitulative suit : appuie sur **Enregistrer**.

La tâche affiche l'heure, et le rappel arrive une seule fois. Le fuseau horaire du dernier champ est celui de ta langue Discord, ou celui du serveur : change-le si le tien est différent, et définis-le avec [/my timezone](/docs/my-timezone/) pour qu'il te soit toujours proposé.

**Tu as fermé le formulaire avec ✕ ?** La liste reste verrouillée : ouvre **Autre** sous la liste et appuie sur **Déverrouiller la liste**. Voir [Quand la liste est verrouillée](/docs/the-task-list/#when-the-list-is-locked).

Tous les boutons sous la liste : [La liste dans le salon](/docs/the-task-list/) et [Modifier une tâche dans le salon](/docs/channel-tasks/).

## <img class="place-ic is-activity" src="/icons/activity.png" alt="" />4. Dans l'Activity

Dans l'Activity, tu travailles sur la liste dans une fenêtre à l'intérieur de Discord, avec des cases et des panneaux à la place des menus. Appuie sur **Activity** <img class="inline-ic" src="/icons/activity.png" alt="" />, le premier bouton sous la liste. Les autres personnes du salon peuvent t'y rejoindre. Tu peux aussi partir du Lanceur d'applications de Discord ou d'un appel vocal : voir [Quatre façons d'entrer](/docs/activity/#four-ways-in).

### Cocher une tâche

Touche la case d'une tâche. La liste se met à jour pour tout le monde dans la fenêtre, et un groupe coche aussi ses sous-tâches.

### Définir un rappel

Touche le texte d'une tâche pas encore cochée : son panneau s'ouvre. Touche une fois **Rappel** <img class="inline-ic" src="/icons/alertW.png" alt="" /> : il devient **bleu**, et la date, l'heure et le fuseau horaire apparaissent, réglés sur dix minutes à partir de maintenant dans le fuseau horaire de ton appareil. Touche **Enregistrer**.

Quand tu as fini, appuie sur **Quitter** : la liste retourne dans le salon, avec un récapitulatif de ce qui a changé.

Tout ce qu'il y a dans la fenêtre : [L'Activity](/docs/activity/) et [Travailler sur une liste dans l'Activity](/docs/activity-list/).

## Bon à savoir avant le premier rappel

- **Le rappel va au propriétaire de la tâche**, par message privé si le propriétaire est une personne.
- **Si la tâche n'a pas encore de propriétaire, tu le deviens**, donc le rappel t'arrive : voir [Les règles](/docs/reminders/#the-rules).
- **Rien n'est arrivé ?** Autorise les messages privés des membres du serveur : voir [Rappels par message privé](/docs/known-limits/#reminders-by-direct-message).

## Prochaines étapes

- [Concepts de base](/docs/core-concepts/) : une liste à deux endroits, propriétaires, tags, groupes et permissions.
- [Propriétaires et tags](/docs/owners-and-tags/) : donne une tâche à une personne, à un rôle ou à plusieurs personnes, et tague qui prévenir.
- [Rappels](/docs/reminders/) : qui les reçoit, fuseaux horaires, rappels récurrents.
- [Trucs et astuces](/docs/tips/) : de petites habitudes qui font gagner du temps, comme réutiliser une liste sur un autre serveur.
- [/config app](/docs/configuration/) : notifications, astuces, fuseau horaire et plus encore.
- [FAQ](/docs/troubleshooting/) : des réponses rapides aux problèmes les plus courants.
