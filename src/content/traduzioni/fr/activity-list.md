---
title: "Travailler sur une liste dans l'Activity"
description: "Les cases, la première rangée, le panneau d'une tâche (Contenu, Propriétaire, Tag, Rappel et Webhook) et qui modifie quoi."
fonte: 39bbd6a8e201
---

Dans l'Activity, la liste est une page à part : une case devant chaque tâche, une rangée de boutons en haut et un panneau pour chaque tâche. Les règles sont celles du salon : propriétaires, réglages du serveur, limites de l'offre. Ce que fait chaque fonctionnalité : [Propriétaires et tags](/docs/owners-and-tags/), [Rappels](/docs/reminders/), [Webhooks](/docs/webhooks/), [Actions sur la liste](/docs/list-actions/).

Sous la liste, une ligne aide ceux qui débutent : *Tu ne sais pas par où commencer ? Touche une case pour cocher une tâche, son texte pour le reste.* Elle suit les [Astuces](/docs/configuration/#tips) du serveur, comme dans le salon.

## La première rangée

Ces boutons agissent sur toute la liste.

| Bouton | Ce qu'il fait |
| :--- | :--- |
| **Guide** <img class="inline-ic" src="/icons/doc.png" alt="" /> | Un court guide de l'Activity, en cinq pages. |
| **Modifier la liste** <img class="inline-ic" src="/icons/edit.png" alt="" /> | Le titre et toute la liste sous forme de texte : voir [Modifier la liste](#edit-the-list). |
| **Nettoyer la liste** <img class="inline-ic" src="/icons/clean.png" alt="" /> | Retire les tâches terminées : voir [Nettoyer la liste et Tout rouvrir](#clean-the-list-and-reopen-all). |
| **Tout rouvrir** <img class="inline-ic" src="/icons/reopen.png" alt="" /> | Remet à faire les tâches terminées ; **Nouvelle date** déplace leurs rappels. |
| **Quitter** <img class="inline-ic" src="/icons/back.png" alt="" /> | Ramène la liste dans le salon : voir [Revenir dans le salon](/docs/activity/#back-to-the-channel). |

Au-dessus de la rangée, **Accueil** t'emmène à l'[accueil du salon](/docs/activity/#the-home-of-the-channel), et l'engrenage ouvre [tes paramètres](/docs/activity/#your-settings). Cloner, Télécharger, Sceller, Supprimer et Déverrouiller ne sont pas ici : ils [restent dans le salon](/docs/activity/#what-stays-in-the-channel).

## Cocher une tâche

**Touche la case** devant une tâche pour la cocher, et touche-la de nouveau pour la rouvrir. Un groupe entraîne ses sous-tâches, et il est coché quand elles le sont toutes, comme dans le salon. Chaque tâche qui change déclenche son [webhook](#webhook), sous-tâches et groupe compris, comme dans le salon.

Quand un cochage est refusé, une bulle sur la case t'en donne la raison : une tâche qui a un propriétaire ne peut être cochée que par son propriétaire, et par ceux qui ont *Gérer les messages* sur le salon (voir [Qui peut cocher une tâche](/docs/core-concepts/#who-can-tick-a-task)). Sur une tâche que quelqu'un d'autre modifie, la bulle dit qui.

## Le panneau d'une tâche

**Touche le texte d'une tâche** pour ouvrir son panneau, intitulé *Choisis ce que tu veux modifier dans la tâche …*. Il a les cinq boutons de la deuxième rangée du salon : **Contenu**, **Propriétaire**, **Tag**, **Rappel** et **Webhook**. Chacun passe par trois couleurs :

- <span class="c-grey">Gris</span> : éteint.
- <span class="c-blue">Bleu</span> : modifier. Le panneau montre les champs, et **Enregistrer**.
- <span class="c-red">Rouge</span> : supprimer. Le panneau montre **Supprimer**. Sur une tâche où il n'y a rien à supprimer, la phrase en haut le dit, par exemple *Aucun propriétaire à retirer*, et **Supprimer** reste éteint.

Un troisième appui remet le bouton au gris. Rien ne se passe tant que tu ne touches pas **Enregistrer** ou **Supprimer**. Après une action, le panneau reste sur la même tâche, avec les boutons gris, prêt pour la modification suivante. Il se ferme avec **Fermer**, avec un appui en dehors, ou tout seul après 30 secondes sans activité.

Tant que le panneau est ouvert, la tâche est verrouillée pour les autres : voir [Qui modifie quoi](#who-is-editing-what).

## Contenu

**Bleu** affiche le texte de la tâche, pour le changer, avec les salons par leur nom, comme `#general`. Les propriétaires, tags, rappels et webhooks saisis ici sont retirés : ils ont leurs propres boutons. Un propriétaire que TTM ne connaît pas n'est pas enregistré : le message t'envoie vers **Propriétaire**.

**Rouge** supprime la tâche. Supprimer un groupe qui a des sous-tâches te le demande d'abord, comme dans le salon. La dernière tâche d'une liste ne peut pas être supprimée : une liste ne peut pas rester vide. Pour supprimer la liste entière, passe par le salon.

## Propriétaire

**Bleu** affiche une recherche parmi les personnes et les rôles du serveur, avec en premier ceux qui sont dans l'Activity. Touche un nom pour l'ajouter, touche-le de nouveau pour le retirer, puis **Enregistrer**. Retire tous les noms et **Enregistrer** retire le propriétaire, comme le fait **Rouge**.

**Pour prendre une tâche** qui n'a pas de propriétaire, appuie sur **Propriétaire** jusqu'à ce qu'il soit bleu : ton nom est déjà choisi, donc **Enregistrer** te donne la tâche.

Pour la donner à quelqu'un d'autre, touche son nom : il prend la place du tien. Une tâche qui a déjà un propriétaire l'affiche, et ne change que si tu choisis quelqu'un.

- Une personne ou un rôle suffit sur toutes les offres.
- Plusieurs personnes deviennent un rôle que TTM crée, sur Premium : voir [Les rôles que crée TTM](/docs/owners-and-tags/#the-roles-ttm-creates). Quand il manque quelque chose, **Enregistrer** reste éteint et le panneau dit pourquoi.

**Rouge** retire le propriétaire, et son rappel aussi : plus personne ne peut le recevoir. Si le rappel n'a pas encore été envoyé, le panneau te demande d'abord de confirmer.

## Tag

**Bleu** affiche les tags que la tâche a en ce moment, déjà choisis. Ajoute et retire des personnes ou des rôles depuis la recherche, jusqu'à 25, puis **Enregistrer** : la tâche reçoit exactement l'ensemble que tu vois. Il n'y a ni mode d'écrasement ni modification en direct : tu pars toujours des tags actuels.

Retire-les tous et **Enregistrer** retire tous les tags, comme le fait **Rouge**.

**Rouge** retire tous les tags. Dans les deux cas, une tâche faite seulement de tags les garde, parce que sans eux elle n'aurait plus de texte.

## Rappel

**Bleu** affiche ensemble **Date**, **Heure** et **Fuseau horaire**, et les répétitions quand elles s'appliquent.

- Un **nouveau** rappel part de dix minutes à partir de maintenant, avec **Enregistrer** déjà activé.
- Un rappel **existant** affiche ses valeurs. **Enregistrer** reste éteint tant que tu ne changes rien.
- **Enregistrer** reste éteint pour une date passée, ou à moins de 5 minutes : *La date est déjà passée* te demande d'en choisir une nouvelle.

Touche **Fuseau horaire** pour le choisir : cherche par ville, par pays, par un nom comme `Europe/Paris` ou par un décalage comme `+5:30`.

- *Tes fuseaux horaires* liste ceux qui comptent pour toi : celui de cet appareil, le tien, celui du serveur.
- Une ligne sous le champ te dit d'où vient le fuseau : le tien, celui de cet appareil ou celui du serveur, avec **Paramètres** pour choisir le tien. Un autre fuseau ne vaut que pour cette date : voir [Ton fuseau horaire](/docs/reminders/#your-time-zone).
- *Sur cet appareil* affiche le même moment à l'heure de ton appareil, quand le fuseau est différent.

Les trois menus de répétition apparaissent sur Premium, avec l'interrupteur des [rappels répétés](/docs/reminders/#repeating-reminders) activé, ou quand le rappel se répète déjà : voir [Les champs de la répétition](/docs/reminders/#the-repetition-fields).

Une tâche cochée ne peut pas avoir de rappel. Sur une tâche sans propriétaire, le panneau dit qu'en enregistrant, tu en deviens le propriétaire.

**Rouge** retire le rappel.

## Webhook

Les webhooks sont une fonctionnalité [Premium](/docs/premium/).

**Bleu** liste les webhooks du serveur par leur nom, chacun avec le moment où il part : *à l'achèvement*, *à la réouverture* ou *toujours*. L'adresse ne s'affiche jamais. Choisis-en un, puis **Enregistrer**.

Un webhook qui n'existe plus s'affiche en haut, marqué *n'existe plus*, pour que tu en choisisses un autre. Si le serveur n'en a aucun, le panneau dit qu'ils se créent avec [/config webhook](/docs/config-webhook/).

**Rouge** retire le webhook de la tâche.

## Modifier la liste

**Modifier la liste** affiche le titre et chaque tâche sous forme de texte, dans le format expliqué dans [Modifier une liste à la main](/docs/writing-a-list/) : le même texte que la **Mise à jour groupée** du salon, lu selon les mêmes règles : personnes, rôles et salons par leur nom, dates de rappel dans ton fuseau horaire.

Une ligne sous le texte explique comment ajouter quelqu'un de nouveau, et renvoie vers [Modifier une liste à la main](/docs/writing-a-list/#people-roles-and-channels-by-name). Change ce qu'il faut et enregistre.

La liste est verrouillée pour les autres à partir de son ouverture jusqu'à ce que tu enregistres ou annules : **Annuler**, la ✕ et un appui en dehors la déverrouillent. Elle se ferme toute seule après 30 secondes sans activité. Si le texte ne peut pas être enregistré, les problèmes s'affichent dessous : voir [Quand le texte ne peut pas être enregistré](/docs/writing-a-list/#when-the-text-cant-be-saved).

## Nettoyer la liste et Tout rouvrir

**Nettoyer la liste** te demande d'abord de confirmer. Le récapitulatif de fin de session note combien de tâches tu as retirées. Quand aucune tâche n'est terminée, ou quand toutes le sont, il le dit et ne change rien.

**Tout rouvrir** te demande de confirmer à chaque fois. **Nouvelle date**, dans la même fenêtre, déplace les rappels des tâches que tu rouvres. Rouvrir déclenche les webhooks de réouverture des tâches que tu rouvres. Ce que changent les deux actions : [Actions sur la liste](/docs/list-actions/).

## Qui modifie quoi

Deux personnes ne changent jamais la même chose en même temps :

- Ta première modification d'une tâche la verrouille pour les autres. Un appui sur sa case leur dit qui modifie ; les autres tâches restent libres.
- Tant que quelqu'un modifie une tâche, **Modifier la liste**, **Nettoyer la liste** et **Tout rouvrir** attendent, et disent qui ils attendent.
- **Modifier la liste** verrouille toute la liste : les cases reviennent quand c'est fini.

Une modification laissée seule pendant 20 secondes demande *Tu es toujours là ? La modification se ferme dans 10 secondes* ; à 30, elle se ferme, et ce qui n'a pas été enregistré est perdu. La lecture n'a pas de limite de temps.

Si quelqu'un change la même chose juste avant que tu enregistres, tu choisis : **Écraser**, qui enregistre ta modification et perd la sienne ; **Recharger**, avec ton texte conservé en dessous pour le copier ; ou **Annuler**.

## Et ensuite

- [L'Activity](/docs/activity/) : comment y entrer, l'accueil du salon, et le retour dans le salon.
- [Modifier une tâche dans le salon](/docs/channel-tasks/) : les cinq mêmes boutons, sous la liste dans le salon.
- [FAQ](/docs/troubleshooting/#in-the-activity) : des réponses rapides aux problèmes les plus courants.
