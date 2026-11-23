---
title: "/config"
description: "La commande pour qui gère TTM sur un serveur : trois panneaux (paramètres, listes et webhooks) et qui peut les ouvrir."
fonte: 2d6f9fe746d2
---

`/config` est la commande pour qui s'occupe de TTM sur ton serveur. Elle a trois sous-commandes, chacune avec sa mission :

| Sous-commande | À quoi elle sert |
| :--- | :--- |
| [`/config app`](/docs/configuration/) | Comment le bot se comporte ici : notifications, historique, les astuces pour les nouveaux arrivants, rappels, fuseau horaire et permissions. |
| [`/config lists`](/docs/config-lists/) | Toutes les listes du serveur : régénère une liste supprimée, scelle ou supprime celles que tu as terminées. |
| [`/config webhook`](/docs/config-webhook/) <a class="premium-tag" href="/docs/premium/" title="Débloquée pour tous les serveurs pendant la bêta">Premium</a> | Crée, consulte, modifie ou supprime les webhooks que tes tâches appellent quand elles sont terminées ou rouvertes. |

Les tâches elles-mêmes ne se gèrent jamais ici : tout ce qui concerne une seule liste se trouve dans ses boutons, dans le salon et dans l'Activity. Voir [La liste dans le salon](/docs/the-task-list/) et [Travailler sur une liste dans l'Activity](/docs/activity-list/).

## Qui peut ouvrir /config

Par défaut, seuls les membres ayant la permission *Gérer le serveur* voient `/config`. Cela vaut pour `/config app`, `/config lists` et `/config webhook` de la même façon.

Un administrateur peut l'ouvrir à d'autres rôles ou membres, ou le fermer dans certains salons. Ça se fait dans *Paramètres du serveur → Intégrations → Team Tasks Manager*, sur la commande `/config`. Discord fixe ces règles pour la commande entière, pas pour chaque sous-commande : qui peut ouvrir `/config` peut utiliser tous ses panneaux.

Les permissions que tu synchronises avec **Charger les permissions** dans `/config app` valent pour tes listes, pas pour `/config`. Voir [Synchroniser les permissions](/docs/configuration/#sync-permissions).
