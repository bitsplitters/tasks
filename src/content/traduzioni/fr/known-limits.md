---
title: "Limites connues"
description: "Les plafonds sur les listes, les tâches, les rappels et le reste : la plupart viennent de Discord lui-même, et comment travailler avec."
fonte: abe38a403ccc
---

Team Tasks Manager travaille entièrement dans Discord, donc la plupart des limites ci-dessous ne sont pas un choix de TTM. Elles viennent de Discord lui-même. Par exemple : la longueur maximale d'un message, le nombre de menus qui tiennent dans un message. Quand une limite est celle de Discord, on le dit.

## Listes et tâches

| Limite | Valeur | Pourquoi |
| :--- | :--- | :--- |
| Listes utilisées par serveur | **3** avec l'offre Free | Voir [Comment fonctionnent les trois places](/docs/premium/#how-the-three-places-work). |
| Caractères par liste | **4000** | La liste entière se modifie dans un seul champ de Discord, et Discord plafonne ce champ à 4000 caractères. Le compte inclut *tout ce qui s'affiche* : le texte des tâches, les cases, l'heure d'un éventuel rappel et un saut de ligne par ligne, pas seulement ce que tu écris. TTM garde une petite marge de sécurité sous la limite maximale. |
| Éléments par liste | **50** (tâches + sous-tâches) | Discord permet 5 rangées de composants par message et jusqu'à 25 options par menu déroulant. TTM réserve des rangées aux boutons d'action, ce qui laisse de la place pour 50 éléments sélectionnables en tout, sous-tâches comprises. Ton offre peut te limiter plus tôt : voir [Ce que Premium débloque](/docs/premium/). |
| Titre de la liste | **90** caractères | Les fenêtres de création, de modification et de clonage ne te laissent pas en écrire plus. Le titre donne aussi son nom au menu de la liste et à son fil d'historique, que Discord garde courts. |
| Fichier importé | `.txt`, jusqu'à **64 Ko** | `/creer-liste` n'importe que le fichier produit par **Télécharger**. Ce qu'elle vérifie d'autre : voir [`/creer-liste`](/docs/commands/#create-list). |

<div class="callout"><div class="callout-t">Tu as touché un plafond ?</div>Répartis le travail sur plusieurs listes. Deux listes ciblées se lisent mieux qu'une seule au maximum, et chacune a ses propres rappels, propriétaires et tags.</div>

**Télécharger te donne toujours un fichier.** Un message Discord normal est limité à 2000 caractères. C'est pourquoi **Télécharger**, dans le panneau **Autre** <img class="inline-ic" src="/icons/other.png" alt="" /> sous la liste dans le salon, ne publie jamais la liste sous forme de texte.

Il t'envoie un fichier `.txt`, à toi seul, dans un message que toi seul peux voir. C'est le même fichier que `/creer-liste` peut réimporter.

**Supprimer le message n'est pas supprimer la liste.** La liste garde sa place, et ses rappels continuent d'arriver : voir [Ce qui arrive à une quatrième liste](/docs/premium/#what-happens-to-a-fourth-list).

## Rappels

| Limite | Valeur | Pourquoi |
| :--- | :--- | :--- |
| Rappels en attente en même temps | **10** avec l'offre Free | Voir [Ce que Premium débloque](/docs/premium/). |
| Répétitions par rappel | **jusqu'à 50** avec Premium, aucune avec Free | Les rappels récurrents sont une fonctionnalité Premium : avec l'offre Free, chaque rappel est un événement unique. Avec Premium, un rappel peut arriver au maximum 50 fois en tout, la première comprise ; choisis **1 fois** pour un rappel unique. Dans le texte d'une liste, dans **Mise à jour groupée** ou **Modifier la liste**, le triplet compte les répétitions après la première : 49 au maximum. |
| Délai minimum d'un rappel | **5 minutes** à partir de maintenant | La date de départ doit être au moins cinq minutes dans le futur, pour que le planificateur ait le temps de le prendre en charge. |
| Ponctualité d'un rappel | à environ **10 secondes** près | Les rappels qui arrivent à échéance en même temps sont étalés sur dix secondes au maximum, pour rester dans les limites de débit de Discord. Le rappel arrive quand même dans la bonne minute. |

Les répétitions ne sont proposées qu'avec une offre qui inclut les rappels récurrents, et seulement quand **Rappels récurrents** est activé dans [/config app](/docs/configuration/#recurring-reminders). Par défaut, chaque rappel est un événement unique. Les rappels récurrents que tu as déjà continuent de se déclencher dans tous les cas : voir [Rappels répétés](/docs/reminders/#repeating-reminders).

### Rappels par message privé

Le rappel d'une personne arrive par message privé, donc il dépend des réglages de messages privés du propriétaire. Si le propriétaire n'accepte pas les messages privés des membres du serveur, Discord refuse le message, et ce rappel n'arrive pas. Il se passe la même chose si le propriétaire ne partage plus de serveur avec le bot.

Pour accepter les messages privés des membres d'un serveur, clique sur le nom du serveur, puis sur *Paramètres de confidentialité*.

Après un message refusé, TTM s'en souvient et n'essaie plus cette personne pendant **6 heures**. Ensuite, il réessaie, et le premier message privé qui passe efface la pause.

### Rappels à un rôle

Quand le propriétaire d'une tâche est un rôle, le rappel est un message dans le salon de la liste qui mentionne le rôle. Discord ne transforme la mention en notification que dans l'un de ces cas :

- le rôle permet à tout le monde de le mentionner : dans *Paramètres du serveur → Rôles*, le rôle peut être mentionné avec @ par n'importe qui ;
- le bot a la permission *Mentionner @everyone, @here et tous les rôles* dans le salon de la liste. Le lien d'invitation l'accorde.

Sinon, le message apparaît dans le salon et personne ne reçoit de notification. TTM te prévient quand tu définis un tel rappel. Il te prévient aussi quand tu fais d'un tel rôle le propriétaire d'une tâche qui a un rappel.

- **@everyone comme propriétaire** : seule la permission du bot compte.
- **Un rôle créé par TTM** pour plusieurs propriétaires naît mentionnable. Ses rappels le notifient même sans la permission, sauf si quelqu'un désactive ce réglage.
- **Un rôle supprimé** ne reçoit aucun rappel. TTM te le dit, et la solution est de choisir un autre propriétaire.

Dans tous les cas, seuls les membres qui peuvent voir le salon de la liste sont notifiés.

## Propriétaires et tags

Chaque tâche a **un propriétaire** : une personne ou un rôle. Avec Premium, il peut aussi y avoir jusqu'à 25 personnes, qui partagent un rôle que TTM crée pour elles. 25 est le maximum du menu des propriétaires.

Une tâche peut porter **jusqu'à 25 tags**, les utilisateurs ou les rôles à prévenir : 25 est le maximum de Discord pour un menu.

**Les rôles que TTM crée comptent dans les 250 rôles par serveur de Discord.** À 250 rôles, TTM ne peut plus en créer de nouveau, et il le dit. Quand TTM supprime ses rôles : voir [Les rôles que TTM crée](/docs/owners-and-tags/#the-roles-ttm-creates).

**TTM voit combien de membres a un rôle, pas qui ils sont.** Si dans un rôle créé par TTM tu remplaces un membre par un autre, TTM continue d'afficher les personnes à qui il l'a donné : voir [Les rôles que TTM crée](/docs/owners-and-tags/#the-roles-ttm-creates).

## Webhooks

| Limite | Valeur |
| :--- | :--- |
| Webhooks par serveur | **25** avec Premium, aucun nouveau avec l'offre Free. Le sélecteur est un menu déroulant de Discord, et 25 options en sont le maximum. |
| Nom du webhook | jusqu'à **96** caractères \* |
| URL du webhook | jusqu'à **2000** caractères |

\* La limite de Discord est de 100, mais le nom voyage dans l'identifiant du champ du formulaire avec un
court marqueur, et ces caractères comptent eux aussi : TTM vérifie 96 et te le dit si tu les dépasses. Le message
d'erreur cite le même nombre que tu lis ici.

## La timeline de l'activité

Quand la timeline est activée, TTM publie chaque action dans un fil à côté de la liste, via un webhook de Discord.

Discord autorise **15 webhooks par salon**, donc TTM crée **un webhook par salon** et le réutilise pour chaque liste de ce salon. Le nom et l'image que tu vois sur chaque message sont définis message par message, donc rien ne change visuellement.

Si un salon a déjà atteint les 15 de Discord (à cause d'autres bots ou intégrations), la timeline d'une nouvelle liste ne peut pas démarrer. Libères-en un dans **Paramètres du salon → Intégrations → Webhooks**.

## Salons vocaux

Les listes fonctionnent aussi dans le chat d'un salon vocal, avec une différence : là, elles n'ont pas de [timeline de l'activité](#the-activity-timeline). La timeline est un fil à côté de la liste, et Discord n'autorise pas les fils dans les salons vocaux.

Tout le reste fonctionne comme dans un salon textuel : les boutons, les notifications, les rappels, l'[Activity](/docs/activity/), **Cloner la liste**, **Télécharger**, **Sceller la liste** et **Supprimer la liste**.

Quand la timeline est activée dans [`/config app`](/docs/configuration/#history-tracking), la personne qui crée une liste dans un salon vocal reçoit un court message à ce sujet, visible d'elle seule ; la liste d'essai du Tutoriel l'ignore. Si tu as besoin de la timeline, crée la liste dans un salon textuel, ou copie-la là avec **Cloner la liste**.

Dans un salon vocal, TTM n'a pas besoin de *Créer des fils publics* ni de *Gérer les webhooks*, qui ne servent qu'à la timeline. Il lui faut *Se connecter* à la place : sans elle, TTM ne peut pas écrire dans le chat du salon vocal.

Discord donne *Se connecter* à tout le monde par défaut ; si ton serveur la retire sur un salon vocal, accorde-la à TTM là, sinon `/creer-liste` te dit qu'elle manque.

---

Ces chiffres reflètent la version actuelle du bot. Tout changement sera noté dans les [Notes de version](/docs/release-notes/).
