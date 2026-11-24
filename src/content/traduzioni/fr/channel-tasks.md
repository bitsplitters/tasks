---
title: "Modifier une tâche dans le salon"
description: "La deuxième rangée de boutons sous la liste — Contenu, Propriétaire, Tag, Rappel et Webhook — avec leurs formulaires et leurs menus."
fonte: ba887a2603b7
---

La deuxième rangée sous la liste agit sur **une seule tâche à la fois** : son texte, son propriétaire, ses tags, son rappel et son webhook. Cette page montre où cliquer. Ce que fait chaque fonctionnalité, et ses règles : [Propriétaires et tags](/docs/owners-and-tags/), [Rappels](/docs/reminders/), [Webhooks](/docs/webhooks/).

## La deuxième rangée

Chaque bouton de la deuxième rangée est un **interrupteur à trois états**. Clique dessus pour passer d'une couleur à l'autre, les mêmes que Discord utilise pour ses boutons :

- <span class="c-grey">Gris</span> — désactivé.
- <span class="c-blue">Bleu</span> — actif en mode <span class="c-blue">modification</span>.
- <span class="c-red">Rouge</span> — actif en mode <span class="c-red">suppression</span>.

Le déroulement est toujours le même : **passe un bouton en bleu ou en rouge, puis choisis la tâche** dans le [menu de cochage](/docs/the-task-list/#the-check-selector). TTM applique l'action à cette tâche. Tant qu'un bouton est bleu ou rouge, le menu dit ce qui va se passer, par exemple *Modifier la tâche* ou *Supprimer la tâche* ; avec tous les boutons éteints, il dit *Cocher une tâche* : choisis une tâche là pour la cocher ou la décocher.

Tant que tu n'as pas choisi une tâche de cette façon au moins une fois, passer **Contenu** ou **Rappel** en bleu ou en rouge t'envoie un message que toi seul peux voir. Il dit quelle tâche choisir et ce que fait un nouvel appui sur le bouton. Dès que tu as choisi une tâche avec un bouton de la deuxième rangée allumé, le message s'arrête, sur tous les serveurs.

| Bouton | <span class="c-blue">Bleu (modification)</span> | <span class="c-red">Rouge (suppression)</span> |
| :--- | :--- | :--- |
| [**Contenu**](#content) <img class="inline-ic" src="/icons/task.png" alt="" /> | Change le texte de la tâche, dans un formulaire. | Supprime la tâche. |
| [**Propriétaire**](#owner) <img class="inline-ic" src="/icons/owner.png" alt="" /> | Définit ou change le propriétaire : une personne ou un rôle. Avec [Premium](/docs/premium/), plusieurs personnes aussi. | Retire le propriétaire, et son rappel aussi. |
| [**Tag**](#tag) <img class="inline-ic" src="/icons/tag.png" alt="" /> | Définit les membres et les rôles à prévenir, plusieurs à la fois. | Retire tous les tags de la tâche. |
| [**Rappel**](#reminder) <img class="inline-ic" src="/icons/alertW.png" alt="" /> | Ajoute ou modifie un rappel. | Retire le rappel. |
| [**Webhook**](#webhook) <img class="inline-ic" src="/icons/api.png" alt="" /> <a class="premium-tag" href="/docs/premium/" title="Débloquée pour tous les serveurs pendant la bêta">Premium</a> | Lie un webhook à la tâche. | Retire le webhook de la tâche. |

Avec **Propriétaire**, **Tag**, **Rappel** ou **Webhook** en rouge, le menu ne liste que les tâches qui ont quelque chose à retirer : un propriétaire, des tags, un rappel ou un webhook. Une tâche faite uniquement de tags n'est pas listée, puisque sans eux elle n'aurait plus de texte. Si aucune tâche n'a rien à retirer, le menu est désactivé et le dit, par exemple *Aucun propriétaire à retirer*, et tu reçois une note sur la façon d'en ajouter un.

Après avoir utilisé **Propriétaire**, **Tag** ou **Rappel**, le bouton redevient gris, ou reste allumé pour la tâche suivante : c'est ton serveur qui décide, avec **Conserver l'état après la sélection** dans le menu **Comportement** de [/config app](/docs/configuration/#keep-the-state-after-a-selection). Conserver l'état change ce que Propriétaire et Tag peuvent faire : voir [Propriétaire](#owner) et [Tag](#tag).

## Contenu

**Bleu** ouvre un formulaire avec le texte de la tâche. Ses tags n'y sont pas : ils restent sur la tâche, à la fin du texte, et le bouton **Tag** les modifie.

- Les sauts de ligne deviennent des espaces, et les salons s'affichent par leur nom, comme dans **Mise à jour groupée**.
- Les propriétaires, tags, rappels et webhooks écrits là sont retirés, et TTM te dit ce qu'il a retiré : ils ont leurs propres boutons.
- Un texte laissé vide, ou qui rendrait la liste trop longue, n'est pas enregistré.

Salons, liens et emoji dans le texte : voir [Modifier une liste à la main](/docs/writing-a-list/).

Tant que le formulaire est ouvert, la liste est verrouillée pour les autres. Enregistrer la déverrouille ; la ✕ non : voir [Quand la liste est verrouillée](/docs/the-task-list/#when-the-list-is-locked).

**Rouge** supprime la tâche. Supprimer un groupe qui a des sous-tâches te demande d'abord confirmation. Ses sous-tâches restent en place : elles rejoignent le groupe au-dessus, ou deviennent des tâches s'il n'y en a pas. Tu ne peux pas supprimer la dernière tâche : utilise **Supprimer la liste** ou **Sceller la liste** dans [Autre](/docs/the-task-list/#whats-inside-more).

## Propriétaire

**Bleu** affiche un menu sous les boutons, intitulé *Choisis une tâche dans le menu au-dessus pour la prendre, ou choisis à qui la donner*.

**Pour prendre une tâche**, clique sur **Propriétaire** jusqu'à ce qu'il soit bleu, puis choisis la tâche dans le menu de cochage sans désigner personne : elle devient la tienne, et le salon montre qui l'a prise. Une tâche qui est déjà la tienne, ou qui appartient à quelqu'un d'autre, reste comme elle est, et TTM te dit pourquoi. Pour prendre une tâche à quelqu'un d'autre, choisis-toi dans le menu, confirme la sélection, puis choisis la tâche : remplacer un propriétaire demande un choix explicite.

**Pour donner une tâche à quelqu'un**, choisis le propriétaire dans le menu, confirme la sélection, puis choisis la tâche. Pour donner une tâche à plusieurs personnes, une fonctionnalité [Premium](/docs/premium/) :

1. Clique sur **Propriétaire** jusqu'à ce qu'il soit bleu.
2. Choisis les personnes.
3. Confirme la sélection : touche **Enregistrer** sur mobile, ou clique en dehors du menu sur ordinateur (voir [Confirmer une sélection : ordinateur et mobile](#confirming-a-selection--desktop-vs-mobile)).
4. Choisis la tâche dans le menu de cochage.
5. TTM crée le rôle (TTM1, TTM2…) et le leur attribue.

**Celui qui reçoit la tâche en est informé.** La notification dans le salon mentionne le nouveau propriétaire, donc Discord le prévient : la personne, ou tous les membres du rôle. Quand tu prends une tâche toi-même, personne n'est mentionné, parce que tu le sais déjà. Avec le [Mode de notification](/docs/configuration/#notification-mode) sur *Notifications désactivées*, aucune notification n'est publiée, comme pour toutes les autres actions.

Ce qu'un propriétaire peut être, et les rôles que TTM crée : [Propriétaires et tags](/docs/owners-and-tags/#owner-a-person-a-role-or-several-people).

Avec **Conserver l'état après la sélection** activé, **Propriétaire** reste bleu après que tu as pris une tâche, et le menu reste vide : choisis la tâche suivante pour la prendre aussi.

- Une tâche qui appartient à quelqu'un d'autre charge plutôt son propriétaire dans le menu ; pour un rôle créé par TTM, le menu affiche les personnes à qui il a donné le rôle.
- Chaque changement que tu confirmes s'applique tout de suite à cette tâche.
- Si tu vides le menu, le propriétaire est retiré, et son rappel aussi, comme en mode rouge.

Pour revenir à la prise de tâches, clique sur **Propriétaire** jusqu'à ce qu'il soit de nouveau bleu.

**Rouge** retire le propriétaire, et son rappel aussi : plus personne ne le recevrait. Si le rappel n'a pas encore été envoyé, TTM te demande d'abord de confirmer.

## Tag

**Bleu** affiche un menu sous les boutons. Par défaut, choisis-y jusqu'à 25 membres ou rôles, confirme la sélection (voir [Confirmer une sélection : ordinateur et mobile](#confirming-a-selection--desktop-vs-mobile)), puis choisis la tâche :

- choisis *Anna* et *@Devs*, et la tâche est taguée Anna et @Devs, rien d'autre : ton choix **remplace** les tags de la tâche ;
- choisis les personnes **avant** la tâche : avec le menu vide, TTM te demande de sélectionner d'abord au moins un tag.

**Rouge** retire tous les tags de la tâche.

### Avec l'état conservé — deux modes

Avec **Conserver l'état après la sélection** activé, dans le menu **Comportement** de [/config app](/docs/configuration/#keep-the-state-after-a-selection), le bouton reste bleu après chaque tâche. Ce que fait alors Tag dépend de ce que tu choisis en premier :

- **Les personnes d'abord**, c'est **attribuer**.
- **La tâche d'abord**, avec le menu encore vide, c'est **l'édition en direct**.

**Attribuer — choisis les personnes, puis la tâche.** Les tags de la tâche deviennent exactement ton choix, comme ci-dessus. Tes choix restent dans le menu : tu peux donc appliquer le même ensemble à la tâche suivante, et à la suivante, sans rechoisir.

**Édition en direct — choisis la tâche, menu vide.** Passe Tag en bleu et choisis la tâche à retaguer, sans désigner personne. Ce n'est pas une erreur : les tags actuels de la tâche se chargent dans le menu, déjà cochés. Tu modifies alors cette tâche directement :

- chaque fois que tu fermes le menu, la tâche se met à jour tout de suite ;
- décoche quelqu'un et il quitte la tâche ; coche quelqu'un et il la rejoint ;
- il n'y a pas d'étape de confirmation, et rien n'est écrasé : tu ajustes l'ensemble existant ;
- décoche tout le monde pour retirer tous les tags.

Si tu choisis une autre tâche, l'édition se déplace là. Éteins Tag (gris) pour terminer : la prochaine activation repart de zéro.

### Confirmer une sélection : ordinateur et mobile

Les menus **Tag** et **Propriétaire** te laissent en choisir plusieurs à la fois. Ces menus à choix multiple **n'appliquent pas un choix dès que tu le coches** : ils attendent que tu **confirmes** toute la sélection. Les menus à choix unique, comme le menu de cochage, s'appliquent dès que tu choisis. La façon de confirmer dépend de l'appareil :

- **Sur mobile**, un bouton **Enregistrer** apparaît sous le menu ouvert. Touche-le pour appliquer tes choix.
- **Sur ordinateur**, il n'y a **pas de bouton Enregistrer**. **Clique n'importe où en dehors du menu** pour le fermer : fermer le menu applique ta sélection. Si tes tags ne semblent pas s'appliquer, c'est presque toujours la raison.

Cela compte surtout dans l'édition en direct des tags ou du propriétaire : sur ordinateur, chaque clic en dehors du menu enregistre un changement.

## Rappel

Clique sur **Rappel** <img class="inline-ic" src="/icons/alertW.png" alt="" /> jusqu'à ce qu'il soit **bleu**. Choisis ensuite la tâche dans le menu de cochage : une qui n'est pas encore cochée. TTM ouvre le formulaire **Quand**, intitulé *Rappel pour la tâche …* :

| Champ | Format | Notes |
| :--- | :--- | :--- |
| **Jour** | un nombre (1–31) | prérempli |
| **Mois** | un menu déroulant, dans ta langue | pas d'ambiguïté `jj/mm` à craindre |
| **Année** | un nombre | prérempli |
| **Heure** | `HH:mm`, format 24 heures | p. ex. `15:30` |
| **Fuseau horaire** | un nom de fuseau officiel | prérempli avec *ton* fuseau (tant que tu n'en as pas choisi un avec `/my timezone`, celui de ta langue Discord, ou celui du serveur) |

Tout arrive prérempli avec **dix minutes à partir de maintenant**. Envoie-le, et la tâche affiche l'heure programmée. Tant que le formulaire est ouvert, la liste est verrouillée pour les autres. Qui reçoit le rappel, et le fuseau horaire : voir [Rappels](/docs/reminders/#the-rules).

### La carte récapitulative

Avec les [rappels récurrents](/docs/reminders/#repeating-reminders) activés (une fonctionnalité Premium), envoyer **Quand** n'enregistre pas encore. TTM te montre une carte récapitulative privée avec la date comprise, une ligne **Récurrence** et quatre boutons. La ligne dit *aucune* pour un rappel unique, ou affiche le badge de récurrence :

| Bouton | Ce qu'il fait |
| :--- | :--- |
| **Enregistrer** | Stocke le rappel exactement comme la carte l'affiche. Quand tu modifies un rappel existant, il s'active dès que tu changes quelque chose. |
| **Modifier la date** | Rouvre **Quand**, prérempli avec les valeurs actuelles. |
| **Modifier la récurrence** | Ouvre le formulaire de répétition, avec ses trois menus : voir [Les champs de la répétition](/docs/reminders/#the-repetition-fields). Pour un rappel unique, il s'ouvre sur 2 fois, tous les 1 jour. Avec **1 fois**, le rappel reste unique. |
| **Annuler** | Abandonne tout — la liste est déverrouillée. |

<div class="callout"><div class="callout-t">Rien n'est enregistré tant que tu n'appuies pas sur Enregistrer</div>Modifier la date ou la récurrence ne met à jour que la carte. Tu peux les changer autant de fois que nécessaire, et <strong>Annuler</strong> annule vraiment.</div>

Avec les rappels récurrents désactivés, ou sur l'offre Free, la carte n'apparaît que quand tu modifies un rappel **déjà récurrent**, pour qu'il garde ses répétitions : voir [Répéter les rappels](/docs/reminders/#repeating-reminders). Un nouveau rappel passe directement par **Quand** et est enregistré comme un événement unique.

### Modifier ou retirer

- **Modifier** — passe **Rappel** en bleu et choisis la tâche :
  - si la tâche a déjà un rappel *répété*, ou si les rappels récurrents sont activés, tu arrives sur la carte récapitulative, avec la date et le badge actuels : ne change que ce qu'il faut ;
  - sinon **Quand** s'ouvre, prérempli avec la date actuelle ;
  - la même date et la même récurrence que celles du rappel ne changent rien : TTM te le dit, et n'envoie aucune notification.
- **Retirer** — clique sur **Rappel** jusqu'à ce qu'il soit **rouge** (mode suppression), puis choisis la tâche. Le rappel est retiré.

<div class="callout"><div class="callout-t">Fermer un formulaire, ce n'est pas annuler</div>Un formulaire fermé avec la ✕ laisse la liste verrouillée. Utilise <strong>Annuler</strong> sur la <a href="#the-summary-card">carte récapitulative</a> quand elle est là ; sinon voir <a href="/docs/the-task-list/#when-the-list-is-locked">Quand la liste est verrouillée</a>.</div>

## Webhook

Les webhooks sont une fonctionnalité [Premium](/docs/premium/).

Clique sur **Webhook** <img class="inline-ic" src="/icons/api.png" alt="" /> jusqu'à ce qu'il soit **bleu**, choisis le webhook dans le menu qui apparaît, puis choisis la tâche. Dès lors, terminer ou rouvrir cette tâche déclenche l'appel. Clique sur **Webhook** jusqu'à ce qu'il soit **rouge** et choisis la tâche pour retirer le lien.

Les webhooks eux-mêmes se créent avec [/config webhook](/docs/config-webhook/), par celui qui gère le serveur. Le formulaire **Contenu** n'affiche pas le webhook d'une tâche, et retire celui que tu y écris, en te le disant. Dans **Mise à jour groupée**, il s'affiche sous forme de jeton : voir [Les webhooks dans le texte](/docs/writing-a-list/#webhooks-in-the-text).

## Pour aller plus loin

- [La liste dans le salon](/docs/the-task-list/) — le menu de cochage, la première rangée et Autre.
- [Travailler sur une liste dans l'Activity](/docs/activity-list/) — les mêmes cinq boutons, dans le panneau d'une tâche.
- [FAQ](/docs/troubleshooting/#in-the-channel) — des réponses rapides aux problèmes les plus courants.
