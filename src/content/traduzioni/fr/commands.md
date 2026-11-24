---
title: "Référence des commandes"
description: "Toutes les commandes slash au même endroit, avec la page qui l'explique : l'essentiel de TTM vit dans les boutons, pas dans les commandes."
fonte: f50d9f1a0b4b
---

TTM réduit les commandes au minimum : une fois qu'une liste existe, tu fais tout avec des boutons et des menus. Pour exécuter une commande, tape `/` dans la zone de message et choisis-la. Tu peux aussi ouvrir le **Lanceur d'applications** dans la barre de messages et choisir **Team Tasks Manager** sous *Applications sur ce serveur*.

Si ton Discord est dans une autre langue, certains noms sont traduits : voir [Noms des commandes dans ta langue](#command-names-in-your-language) en bas.

| Commande | À quoi elle sert | Où c'est expliqué |
| :--- | :--- | :--- |
| `/creer-liste` | Créer une liste, ou en reconstruire une depuis un fichier | [Crée ta première liste](/docs/getting-started/#2-create-your-first-list) ; le fichier [plus bas](#create-list) |
| `/config` | Les trois commandes pour qui s'occupe de TTM sur le serveur | [/config](/docs/config/) |
| `/config app` | Les réglages du serveur : notifications, historique, astuces, rappels, fuseau horaire, permissions | [/config app](/docs/configuration/) |
| `/config lists` | Toutes les listes du serveur : en régénérer, sceller ou supprimer plusieurs d'un coup | [/config lists](/docs/config-lists/) |
| `/config webhook` | Créer, voir, modifier ou supprimer un webhook | [/config webhook](/docs/config-webhook/) |
| `/my timezone` | Ton fuseau horaire, le même sur chaque serveur | [/my timezone](/docs/my-timezone/) |
| `/beta` | Ce que la bêta signifie pour ton serveur | [Comment fonctionne la bêta](/docs/beta/) |
| `/help` | Ton point de départ dans Discord | [Plus bas](#help) |
| `/invite` | Une carte pour ajouter TTM à un autre serveur | [Plus bas](#invite) |
| `/news` | Les dernières nouveautés de TTM | [Plus bas](#news) |

## `/creer-liste`

Pour créer une liste de zéro, voir [Crée ta première liste](/docs/getting-started/#2-create-your-first-list). Cette section parle de l'unique option de la commande, **`fichier`**, que tu peux omettre.

Joins le fichier `.txt` que te donne **Télécharger** sur une liste. Il porte le nom de la liste, et il peut venir d'un autre serveur. TTM reconstruit alors la liste à partir du fichier au lieu d'ouvrir le formulaire de création.

La liste revient avec ses tâches et leur état, ses propriétaires, ses tags, ses rappels et ses webhooks. Comme toute nouvelle liste, elle demande une place libre dans ton offre (voir [Comment fonctionnent les trois places](/docs/premium/#how-the-three-places-work)).

TTM refuse tout de suite un fichier qui n'est pas un `.txt` ou qui pèse plus de **64 Ko**. Sinon, TTM lit le fichier. Si quelque chose ne va pas, TTM ne crée rien et liste tous les problèmes dans un seul message, chacun avec sa ligne ou sa tâche :

- **Le format** : le fichier n'est pas du texte UTF-8, ou il ne commence pas par `#!ttm/1`. Le titre manque ou dépasse 90 caractères.

  Une ligne n'est pas une tâche, ou un rappel est écrit en mois (`M`) ou mal écrit. Un webhook est lié à une tâche sans texte, la liste commence par une sous-tâche, ou il n'y a aucune tâche.
- **La taille** : la liste est trop longue pour un message, ou elle a plus de tâches qu'une liste ne peut en contenir ou que ton offre n'en permet.
- **Les rappels** : un rappel n'a pas de propriétaire, n'a pas de date et a une distance de zéro, ou se répète plus de fois que ton offre ne le permet. Un rappel récurrent est refusé là où l'on ne peut pas en créer de nouveaux (voir [Rappels](/docs/reminders/#repeating-reminders)). Il y aurait trop de rappels en attente en même temps.
- **Ce serveur** : un rôle, un salon ou un webhook du fichier n'existe pas ici, ou un utilisateur du fichier n'est pas membre.

Les rappels dont toutes les alertes sont dans le passé ne posent pas de problème : ils reviennent sur leurs tâches, et n'envoient plus rien.

→ Voir [Réutiliser une liste n'importe où](/docs/tips/#reuse-a-list-anywhere).

## `/help`

Cette commande est ton point de départ dans Discord. Elle ouvre un panneau avec cinq boutons :

- **Accueil** <img class="inline-ic" src="/icons/home.png" alt="" /> : un aperçu de l'app.
- **Commencer** <img class="inline-ic" src="/icons/start.png" alt="" /> : un démarrage rapide, avec un lien vers cette documentation.
- **Configuration** <img class="inline-ic" src="/icons/config.png" alt="" /> : à quoi servent `/config app`, `/config lists` et `/config webhook`.
- **Premium** <img class="inline-ic" src="/icons/premium.png" alt="" /> : à quoi ressemblera l'offre payante quand la bêta sera finie, limites de l'offre Free comprises.
- **Qui sommes-nous** <img class="inline-ic" src="/icons/aboutus.png" alt="" /> : qui construit TTM.

## `/invite`

Affiche une carte pour ajouter Team Tasks Manager à un autre serveur : la même présentation que sa page de l'App Directory (ce qu'il fait, comment commencer), le bouton **Ajouter à Discord**, le guide et le serveur d'assistance.

**Ajouter à Discord** ouvre la page d'autorisation de Discord pour le bot, avec les mêmes permissions que https://tasks.bitsplitters.app/invite.

La carte est visible de tout le monde dans le salon, donc tu peux exécuter la commande là où les personnes qui vont configurer l'autre serveur peuvent la voir. Elle ne lit rien du serveur et ne demande aucune permission.

## `/news`

Les dernières nouveautés de Team Tasks Manager, dans ta langue : ce qu'il y a de nouveau dans le bot et comment l'utiliser. La nouveauté s'ouvre dans un message que toi seul peux voir, avec sa date sous le titre.

Sous le texte, **Serveur Discord** ouvre notre serveur d'assistance et **Notes de version** ouvre cette version sur la page [Notes de version](/docs/release-notes/). Quand il y a des nouveautés plus anciennes ou plus récentes, les boutons **Précédente** et **Suivante** t'y emmènent.

En remontant, tu trouves toutes les versions depuis la première, la 1.0.0, chacune avec le jour de sa sortie. La commande ne fonctionne que sur les serveurs, et ne demande aucune permission.

Quand il y a une nouveauté que personne sur ton serveur n'a encore lue, la dernière ligne des panneaux du bot le dit, à la place du pied de page habituel : dans `/help`, dans le Guide, dans **Autre**, dans `/config app` et dans l'explication que montre `/creer-liste`.

Dès que quelqu'un du serveur ouvre `/news`, la ligne disparaît pour tout le monde. Un serveur qui ajoute TTM après une nouveauté n'a pas la ligne : la nouveauté est dans `/news`.

## Noms des commandes dans ta langue

Discord affiche chaque commande dans la langue de ton app Discord, et en anglais pour une langue dans laquelle TTM n'est pas traduit. `/config app`, `/config lists`, `/config webhook` (avec son option `webhook`), `/my timezone`, `/beta`, `/help`, `/invite` et `/news` gardent le même nom partout.

| Langue | `/create-list` | son option `file` | options de `/config webhook` |
| :--- | :--- | :--- | :--- |
| Anglais, et toute autre langue | `/create-list` | `file` | `action` · `trigger` |
| Italiano | `/crea-lista` | `file` | `azione` · `evento` |
| Español | `/crear-lista` | `archivo` | `acción` · `evento` |
| Português (Brasil) | `/criar-lista` | `arquivo` | `ação` · `evento` |
| Français | `/creer-liste` | `fichier` | `action` · `événement` |
| Deutsch | `/liste-erstellen` | `datei` | `aktion` · `ereignis` |

Les choix à l'intérieur des options (voir, créer, modifier, supprimer ; achèvement, réouverture) apparaissent aussi dans ta langue.
