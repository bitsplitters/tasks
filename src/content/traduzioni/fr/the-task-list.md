---
title: "La liste dans le salon"
description: "Le message de la liste dans un salon Discord : le menu de cochage, la première rangée de boutons, Autre, et ce qui se passe pendant que quelqu'un la modifie."
fonte: 6656d50714c3
---

Dès qu'une liste existe, TTM affiche en dessous un **menu de cochage** et **deux rangées de boutons**. Presque rien ici ne demande une commande : tu cliques, c'est tout. La première rangée agit sur toute la liste, et elle est expliquée ici. La deuxième rangée agit sur une seule tâche : voir [Modifier une tâche dans le salon](/docs/channel-tasks/).

## Sous la liste

La liste se termine par une fine **barre de progression** : la part de cases cochées, tâches et sous-tâches confondues, par pas de 5 %. Elle bouge dès qu'une case est cochée, et elle n'est pleine que quand toutes les cases le sont. Une liste scellée la garde, et elle montre où en était la liste à la fin.

Au-dessus de la barre, une petite ligne aide qui débute : *Tu ne sais pas à quoi servent les boutons ? Autre → Guide*. **Guide**, dans [Autre](#whats-inside-more), explique chaque bouton sans quitter Discord. Si ton équipe n'en a pas besoin, masque les **Astuces** dans [/config app](/docs/configuration/#tips) : la ligne disparaît, la barre reste. Tant que la liste est verrouillée, la même ligne dit qui la modifie et comment la déverrouiller, même avec les Astuces masquées : voir [Quand la liste est verrouillée](#when-the-list-is-locked).

Tant que la liste est dans l'[Activity](/docs/activity/), la ligne le dit, et **Rejoindre l'Activity** est le seul bouton sous la liste.

## Le menu de cochage

Au-dessus des boutons se trouve le **menu de cochage** : le menu déroulant qui affiche le titre de la liste. Une liste de plus de 25 tâches a deux menus, chacun étiqueté avec la position de sa dernière tâche. Utilise-le pour :

1. **Marquer des tâches comme terminées ou à faire** : coche une tâche pour la terminer, décoche-la pour la rouvrir. Sa case affiche <img class="inline-ic" src="/icons/checkbox_empty.png" alt="" /> ou <img class="inline-ic" src="/icons/checkbox_marked.png" alt="" />.
2. **Choisir la tâche sur laquelle agit un bouton actif** (voir [la deuxième rangée](/docs/channel-tasks/#the-second-row)).

Cocher ou décocher un groupe fait la même chose à ses sous-tâches. Terminer toutes ses sous-tâches termine le groupe. Une tâche qui a un propriétaire ne peut être cochée que par son propriétaire, et par ceux qui ont *Gérer les messages* sur le salon : voir [Qui peut cocher une tâche](/docs/core-concepts/#who-can-tick-a-task). Un refus n'arrive qu'à la personne qui a choisi la tâche.

<div class="callout"><div class="callout-t">Garde les boutons de tâche éteints</div>Pour cocher ou décocher des tâches, <strong>chaque bouton de la deuxième rangée doit être éteint</strong>. Si un bouton de tâche est actif (bleu ou rouge), choisir une tâche applique cette action au lieu de la cocher.</div>

## Rangée 1 : agit sur toute la liste

Ces boutons ne touchent jamais une seule tâche : ils agissent sur la **liste entière**. Ce que fait chaque action, aux deux endroits : [Actions sur la liste](/docs/list-actions/).

| Bouton | Ce qu'il fait |
| :--- | :--- |
| **Activity** <img class="inline-ic" src="/icons/activity.png" alt="" /> | Ouvre la liste dans l'Activity, une fenêtre dans Discord où vous travaillez dessus ensemble. Voir [L'Activity](/docs/activity/). |
| **Mise à jour groupée** <img class="inline-ic" src="/icons/edit.png" alt="" /> | Modifie le titre et toute la liste sous forme de texte, dans un seul formulaire. Pour une seule tâche, utilise la [deuxième rangée](#row-2--acts-on-a-single-task). Voir [Mise à jour groupée](#bulk-update). |
| **Nettoyer la liste** <img class="inline-ic" src="/icons/clean.png" alt="" /> | Retire toutes les tâches terminées, après une confirmation. |
| **Tout rouvrir** <img class="inline-ic" src="/icons/reopen.png" alt="" /> | Remet à faire toutes les tâches terminées. Tu peux aussi déplacer leurs rappels à une nouvelle date. |
| **Autre** <img class="inline-ic" src="/icons/other.png" alt="" /> | Ouvre un panneau avec les actions dont tu as moins souvent besoin : le guide dans Discord, et cloner, télécharger, sceller ou supprimer la liste. Quand la liste est verrouillée, c'est ici que tu la déverrouilles. |

### Mise à jour groupée

**Mise à jour groupée** ouvre un formulaire avec le titre et toute la liste sous forme de texte : une ligne par tâche, dans le format expliqué dans [Modifier une liste à la main](/docs/writing-a-list/). Change ce qu'il faut et envoie.

- Les personnes, les rôles et les salons s'affichent par leur nom, et les dates de rappel dans ton fuseau horaire.
- Une ligne sous le texte explique comment ajouter quelqu'un de nouveau : voir [Personnes, rôles et salons par leur nom](/docs/writing-a-list/#people-roles-and-channels-by-name).
- Tant que le formulaire est ouvert, la liste est verrouillée pour tous les autres : voir [Quand la liste est verrouillée](#when-the-list-is-locked).

Si la liste a changé pendant que tu la modifiais, TTM te demande quoi faire avant d'enregistrer : voir [Quand la liste change pendant que tu la modifies](#when-the-list-changes-while-you-edit-it). Si le texte ne peut pas être enregistré, TTM te le montre de nouveau avec chaque problème : voir [Quand le texte ne peut pas être enregistré](/docs/writing-a-list/#when-the-text-cant-be-saved).

### Nettoyer la liste

Une fenêtre de confirmation te dit combien de tâches vont partir, et ce qui part avec elles. Envoie-la pour confirmer, ou ferme la fenêtre pour annuler. Ce que Nettoyer retire et ce qu'il garde : [Nettoyer](/docs/list-actions/#clean).

### Tout rouvrir

Le bot te pose la question dans un message que toi seul peux voir : **Rouvrir**, **Nouvelle date** ou **Annuler**. **Nouvelle date** ouvre la fenêtre **Quand**, la même qu'un [rappel](/docs/channel-tasks/#reminder) : choisis la date à laquelle se déplace le premier rappel. Ce que change Tout rouvrir : [Tout rouvrir](/docs/list-actions/#reopen-all).

Si quelqu'un verrouille ou scelle la liste avant que tu confirmes, rien ne change : voir [Quand la liste est verrouillée](#when-the-list-is-locked).

### Ce qu'il y a dans Autre

Discord autorise cinq boutons par rangée, donc les actions dont tu as moins souvent besoin se trouvent dans un panneau que toi seul peux voir :

- **Déverrouiller la liste** <img class="inline-ic" src="/icons/unlock.png" alt="" /> : seulement quand la liste est verrouillée. Il montre qui la modifie et réactive les boutons de la liste pour tout le monde. Voir [Quand la liste est verrouillée](#when-the-list-is-locked).
- **Guide** <img class="inline-ic" src="/icons/doc.png" alt="" /> : le guide rapide dans Discord, avec un lien vers cette documentation.
- **Cloner la liste** <img class="inline-ic" src="/icons/clone.png" alt="" /> : clone la liste dans un autre salon, même quand elle est verrouillée. Voir [Options de clonage](#clone-options).
- **Télécharger** <img class="inline-ic" src="/icons/download.png" alt="" /> : un fichier `.txt` de la liste, envoyé **à toi seul**. Voir [Télécharger](/docs/list-actions/#download).
- **Sceller la liste** <img class="inline-ic" src="/icons/seal.png" alt="" /> : garde dans le salon une liste terminée comme compte rendu, sans boutons ni menus. Voir [Sceller](/docs/list-actions/#seal).
- **Supprimer la liste** <img class="inline-ic" src="/icons/delete.png" alt="" /> : supprime la liste **définitivement**. Voir [Supprimer](/docs/list-actions/#delete).

Sceller et supprimer sont irréversibles, et le bot te demande de confirmer d'abord. Les deux demandent *Gérer les messages* sur le salon : la même permission qui te permet de supprimer à la main le message de la liste. Sans elle, ces deux entrées ne sont pas là. Guide, Cloner la liste et Télécharger sont là pour tout le monde, et Déverrouiller la liste aussi quand la liste est verrouillée.

Tant que la liste est verrouillée, Sceller la liste et Supprimer la liste ne sont pas là. La personne qui modifie enregistrerait sur une liste qui n'existe plus.

### Options de clonage

Quand tu appuies sur **Cloner la liste** dans **Autre**, les commandes de clonage remplacent la première rangée sous la liste, et le panneau te renvoie vers la liste :

- **Créer la liste** : lance le clonage dans le salon choisi dans le menu déroulant.
- **Option de sélection** : garde les cases cochées dans le clone, ou non.
- **Option de rappel** : garde les rappels dans le clone, ou non.
- **Quitter** : revient au panneau de la liste tel qu'il était. Si quelqu'un modifiait la liste, elle reste verrouillée.

Le menu déroulant propose les salons textuels et les salons vocaux. Ce que garde un clone, et les limites de ton offre : [Cloner](/docs/list-actions/#clone).

## Rangée 2 : agit sur une seule tâche

La deuxième rangée a cinq boutons (Contenu, Propriétaire, Tag, Rappel et Webhook) et chacun est un interrupteur à trois états : éteint, modifier ou supprimer. Allume-en un, puis choisis la tâche. Chaque bouton, ses formulaires et ses menus : [Modifier une tâche dans le salon](/docs/channel-tasks/).

## Quand la liste est verrouillée

TTM verrouille la liste pendant que quelqu'un la modifie :

- dans **Mise à jour groupée** ;
- dans le formulaire du texte d'une tâche ;
- dans un formulaire de rappel.

Pour tous les autres, ceci est désactivé : le menu de cochage, le bouton Activity, **Mise à jour groupée**, **Nettoyer la liste**, **Tout rouvrir** et les boutons de tâche. **Autre** reste actif, avec **Cloner la liste** dedans. **Autre** montre qui modifie, et une liste verrouillée ne peut pas être scellée ni supprimée depuis là.

La dernière ligne de la liste le dit aussi : *🔒 @nom modifie la liste. Elle est restée verrouillée ? Autre → Déverrouiller la liste*. Elle prend la place de la ligne des Astuces, et elle s'affiche même quand ton serveur masque les Astuces. La mention montre le nom et ne prévient personne. Quand la liste est déverrouillée, la ligne des Astuces revient, si ton serveur l'affiche.

Verrouiller la liste désactive aussi **Propriétaire**, **Tag** et **Webhook** si l'un d'eux était actif : rouvre-le depuis son bouton quand tu en as besoin.

Enregistrer le formulaire déverrouille la liste. Le fermer avec **Annuler** ou avec la ✕ ne le fait pas, parce que Discord ne le dit pas au bot : **Mise à jour groupée** et le formulaire du texte d'une tâche le disent dans leur dernière ligne. N'importe qui peut alors déverrouiller la liste : ouvre **Autre** et appuie sur **Déverrouiller la liste** <img class="inline-ic" src="/icons/unlock.png" alt="" />.

Un administrateur peut quand même sceller, supprimer ou régénérer une liste verrouillée depuis [`/config lists`](/docs/config-lists/). Si cela arrive pendant que tu modifies, ta modification n'est pas enregistrée. Le bot te le dit et te rend le texte que tu avais écrit.

### Quand la liste change pendant que tu la modifies

Quelqu'un a peut-être commencé une action avant que tu verrouilles la liste : un rappel, ou le texte d'une tâche. Quand cette personne a fini, sa modification s'applique, mais la liste reste verrouillée pour toi. **Autre** dit alors qui l'a mise à jour entre-temps.

Quand tu enregistres **Mise à jour groupée**, TTM vérifie que la liste est toujours celle que tu avais ouverte. Si elle a changé, rien n'est encore enregistré. Un message que toi seul peux voir le dit, te montre le texte que tu avais écrit et propose trois choix :

- **Écraser** : enregistre ton texte. Les mises à jour faites entre-temps sont perdues.
- **Recharger** : rouvre **Mise à jour groupée** avec la liste mise à jour. Ton texte reste dans le message, pour que tu le copies.
- **Annuler** : garde la liste telle qu'elle est, avec les mises à jour, et la déverrouille.

Si la liste est verrouillée ou scellée avant que tu confirmes Nettoyer ou Rouvrir, rien ne change. Le bot te le dit : *Cette liste ne peut pas être modifiée pour le moment*.

## Et ensuite

- [Modifier une tâche dans le salon](/docs/channel-tasks/) : la deuxième rangée, avec le contenu, le propriétaire, les tags, le rappel et le webhook.
- [L'Activity](/docs/activity/) : travaillez ensemble sur une liste, dans une fenêtre à l'intérieur de Discord.
- [Modifier une liste à la main](/docs/writing-a-list/) : mentions, propriétaires, liens et rappels dans le texte de Mise à jour groupée.
- [/config app](/docs/configuration/) : contrôle les notifications, l'historique et les permissions.
- [FAQ](/docs/troubleshooting/#in-the-channel) : des réponses rapides aux problèmes les plus courants.
