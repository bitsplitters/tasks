---
title: "Propriétaires et tags"
description: "À qui appartient une tâche, qui elle mentionne, et les rôles que TTM crée quand plusieurs personnes possèdent une tâche."
fonte: 3beeb818c97b
---

Une tâche peut avoir un **propriétaire** et plusieurs **tags**. Le propriétaire est celui ou celle à qui la tâche appartient : la personne qui peut la cocher et qui reçoit son rappel. Les tags sont les utilisateurs et les rôles mentionnés sur la tâche, par exemple les personnes à prévenir quand elle est terminée.

Tu définis les deux avec les boutons **Propriétaire** <img class="inline-ic" src="/icons/owner.png" alt="" /> et **Tag** <img class="inline-ic" src="/icons/tag.png" alt="" /> : dans le salon, sur la deuxième rangée sous la liste ; dans l'Activity, dans le panneau d'une tâche.

<div class="howto" id="how-to-do-it"><div class="howto-t">Comment faire</div><div class="howto-grid"><a class="howto-go is-channel" href="/docs/channel-tasks/#owner"><span class="howto-k"><img class="place-ic" src="/icons/posto-canale.svg" alt="" />Dans le salon</span><span class="howto-d">Propriétaire et Tag, sur la deuxième rangée sous la liste.</span></a><a class="howto-go is-activity" href="/docs/activity-list/#owner"><span class="howto-k"><img class="place-ic" src="/icons/activity.png" alt="" />Dans l'Activity</span><span class="howto-d">Propriétaire et Tag, dans le panneau d'une tâche.</span></a></div></div>

## Propriétaire : une personne, un rôle ou plusieurs personnes

Le propriétaire est celui ou celle à qui une tâche appartient : la personne qui peut la cocher et qui reçoit son rappel. Ce peut être :

- **Une personne** : elle possède la tâche, et son rappel lui arrive par message privé.
- **Un rôle** : tous les membres de ce rôle possèdent la tâche, et n'importe lequel peut la cocher. Son rappel est un message dans le salon de la liste qui mentionne le rôle.
- **Plusieurs personnes** : TTM crée un rôle pour elles et en fait le propriétaire. C'est une fonctionnalité [Premium](/docs/premium/).

Tu ne peux pas mélanger personnes et rôles, et tu ne peux choisir qu'un seul rôle : une tâche a un seul propriétaire.

**Une tâche pour plusieurs personnes** fonctionne comme une tâche possédée par un rôle. Le rôle s'appelle TTM1, TTM2 et ainsi de suite, et seules les personnes que tu as choisies l'ont. TTM a besoin de la permission *Gérer les rôles* pour le créer : voir [Les rôles que TTM crée](#the-roles-ttm-creates).

**Pour prendre une tâche toi-même**, dans le salon : clique sur **Propriétaire** jusqu'à ce qu'il devienne bleu, puis choisis la tâche sans choisir personne. Ça marche sur une tâche sans propriétaire. Une tâche qui en a déjà un ne change que si tu te choisis toi-même dans le menu : voir [Propriétaire](/docs/channel-tasks/#owner).

**Celui ou celle qui reçoit une tâche de quelqu'un d'autre est mentionné** dans la notification du salon, donc Discord le prévient : une personne, ou tous les membres du rôle. Dans l'Activity, la mention arrive avec le récapitulatif à la fin de la session.

**Retirer le propriétaire retire aussi son rappel**, car plus personne ne peut le recevoir. Si le rappel ne s'est pas encore déclenché, TTM te demande d'abord de confirmer.

Comment le rappel atteint une personne ou un rôle : voir [Comment le rappel arrive](/docs/reminders/#how-the-reminder-arrives). Qui peut cocher une tâche qui a un propriétaire : voir [Qui peut cocher une tâche](/docs/core-concepts/#who-can-tick-a-task).

## Tags

Un tag est un utilisateur ou un rôle mentionné sur la tâche. Une tâche peut porter **jusqu'à 25 tags**, personnes et rôles confondus. Les tags ne changent pas qui peut cocher la tâche : ils disent qui doit être au courant.

Un nouveau choix de tags **remplace** l'ancien : la tâche est taguée avec exactement les personnes et les rôles que tu as choisis. Pour ajouter quelqu'un, garde les autres dans ton choix. Retirer les tags les retire tous d'un coup.

La façon de les choisir diffère un peu entre les deux endroits. Dans le salon, un réglage du serveur décide si tu écrases les tags ou si tu les modifies en direct : voir [Tag](/docs/channel-tasks/#tag). Dans l'Activity, tu pars toujours des tags que la tâche a en ce moment : voir [Tag](/docs/activity-list/#tag).

Dans le texte d'une liste, un tag s'écrit `@` suivi du nom, comme `@Ava`, et le propriétaire est le même nom suivi de deux-points, `@Ava:` : voir [Modifier une liste à la main](/docs/writing-a-list/#owners-the-mention-with-a-colon).

## Les rôles que TTM crée

Cette partie s'adresse à ceux qui gèrent le serveur : ce que TTM fait des rôles qu'il crée pour les tâches de plusieurs personnes, ce dont il a besoin, et quand il les supprime.

Quand tu donnes une tâche à plusieurs personnes, TTM :

- crée un rôle appelé **TTM** suivi du premier numéro libre : TTM1, TTM2 et ainsi de suite. Le rôle est **mentionnable**, n'a **aucune permission** et se trouve tout en bas de la liste des rôles ;
- donne le rôle aux personnes que tu as choisies, une par une ;
- fait du rôle le propriétaire de la tâche.

### Ce dont il a besoin

Le bot a besoin de la permission *Gérer les rôles*, et le lien d'invitation l'inclut. Sans elle, TTM ne crée ni ne supprime de rôles. Sur un serveur qui a ajouté le bot avant, un administrateur devra peut-être l'accorder au rôle du bot. Fais-le dans *Paramètres du serveur → Rôles*, pas sur un salon.

Sur un salon, Discord affiche la même permission sous le nom *Gérer les permissions*. Là, elle fait autre chose : elle permet à un rôle de modifier les permissions de ce salon.

Un serveur peut avoir au maximum **250 rôles** : c'est une limite de Discord. Quand le serveur l'atteint, TTM ne peut pas créer le rôle, et il le dit.

Donner le rôle prend aussi du temps. Discord permet à un bot de le faire dix fois toutes les dix secondes, donc 25 personnes prennent environ vingt secondes. Avec plus de dix personnes, TTM te dit combien de temps ça va prendre.

### Quand TTM crée un nouveau rôle

**TTM ne modifie jamais un rôle une fois qu'il l'a créé.**

- Choisir des personnes différentes, même une de plus ou de moins, crée un nouveau rôle.
- Choisir exactement les mêmes personnes que le propriétaire actuel ne change rien.
- Dans le salon, avec **Conserver l'état après la sélection** activé, la même sélection sur plusieurs tâches de suite réutilise le rôle créé pour la première tâche.

### Quand un rôle cesse d'être à TTM

TTM se souvient des rôles qu'il crée et des personnes à qui il les a donnés. Un rôle ne reste à TTM que tant qu'il a l'aspect que TTM lui a laissé :

- le même nom ;
- aucune permission, ni sur le serveur ni sur un salon ;
- le même nombre de membres.

Renomme-le, donne-lui une permission, ajoute-le aux permissions d'un salon, ou ajoute ou retire un membre : il devient un des rôles de ton serveur. TTM vérifie cela avant de supprimer un rôle, et quand il affiche le propriétaire d'une tâche pour le changer. Un rôle qui n'est plus à TTM n'est jamais supprimé, et le choix du propriétaire affiche le rôle à la place des personnes.

Donc, pour garder un rôle pour ton serveur, **renomme-le**. Tu peux alors l'utiliser n'importe où. Une nouvelle couleur ou une nouvelle position ne suffit pas : TTM supprimerait quand même le rôle quand plus aucune liste ne l'utilise.

TTM peut voir *combien* de membres a un rôle, mais pas *qui* ils sont. Donc si tu remplaces un membre par un autre, TTM ne peut pas le savoir : il continue d'afficher les personnes à qui il a donné le rôle.

### Quand TTM supprime un rôle

TTM supprime un rôle qu'il a créé, y compris sur le serveur, quand ces deux conditions sont réunies :

- **plus aucune liste ne l'utilise**, comme propriétaire ou comme tag, et aucune permission de commande ne l'utilise ;
- il ressemble toujours à un rôle de TTM.

TTM vérifie toutes les dix minutes, et il ne touche jamais à un rôle créé il y a moins de dix minutes. Certains rôles restent toujours :

- les rôles d'une liste **scellée**, car le message scellé les affiche encore ;
- tous les rôles que TTM a créés, quand le bot est **retiré** d'un serveur.
