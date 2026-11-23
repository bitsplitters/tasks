---
title: "Notes de version"
description: "Les nouveautés de Team Tasks Manager, de la plus récente à la plus ancienne."
fonte: 77cbf888899e
---

Tous les changements que tu vois dans Discord sont listés ici, du plus récent au plus ancien. Chaque entrée renvoie vers la page qui l'explique.

## 2.6.0 — Ton fuseau horaire, partout

Released 2026-11-24

- **Choisis ton fuseau horaire une seule fois** — **/my timezone**, sur n'importe quel serveur, affiche ton fuseau horaire et d'où il vient. **Choisir** définit le tien, et TTM te le propose sur tous les serveurs, dans le salon et dans l'Activity. **Revenir en automatique** te ramène à celui qui est proposé. Voir [/my timezone](/docs/my-timezone/).
- **Un autre fuseau ne vaut que pour cette date** — avec un fuseau à toi, celui que tu laisses dans un rappel ne le remplace plus. Sous le fuseau horaire de **Quand**, une ligne te dit si c'est le tien ou comment le choisir. Voir [/my timezone](/docs/my-timezone/).
- **Dans l'Activity aussi** — l'engrenage affiche ton fuseau horaire sous **Pour toi, partout**, le même que dans `/my timezone`. Sous le fuseau horaire d'un rappel, la ligne y renvoie. Voir [Tes réglages](/docs/activity/#your-settings).

## 2.5.0 — Des noms à la place des codes

Released 2026-11-23

- **Personnes, rôles et salons par leur nom** — **Mise à jour groupée** affiche `@Ava`, `@Modérateurs` et `#général` au lieu des codes de Discord, et le formulaire **Contenu** affiche les salons par leur nom. Écris `@` et un nom pour chaque rôle et chaque salon, et pour toute personne déjà dans la liste. Ajoute une nouvelle personne avec **Propriétaire** ou **Tag**, ou écris son code. Un nom que TTM ne connaît pas reste du texte, sauf pour un propriétaire : dans ce cas TTM te le dit et n'enregistre rien. Voir [Personnes, rôles et salons par leur nom](/docs/writing-a-list/#people-roles-and-channels-by-name).
- **Le contenu, c'est seulement le texte** — le formulaire **Contenu** n'affiche plus les tags de la tâche, comme dans l'Activity : ils restent sur la tâche, et **Tag** les modifie. Un tag écrit dans le formulaire est retiré, et TTM te le dit. Voir [Contenu](/docs/channel-tasks/#content).
- **Des dates de rappel lisibles** — dans le texte d'une liste, la date d'un rappel s'écrit `2026-12-08 18:00`, dans ton fuseau horaire, au lieu d'un code. Change-la et enregistre : le rappel se déplace. Pour garder une heure qu'on t'a donnée dans son fuseau, écris le fuseau après : `2026-12-08 18:00 America/New_York`. Voir [Les rappels dans le texte](/docs/writing-a-list/#reminders-in-the-text).
- **Le guide à un clic** — sous le texte de **Mise à jour groupée** et de `/creer-liste`, une ligne explique comment ajouter une nouvelle personne et renvoie vers le guide. Quand un nom ou une date ne peut pas être enregistré, le message renvoie vers la partie du guide qui l'explique. Voir [Personnes, rôles et salons par leur nom](/docs/writing-a-list/#people-roles-and-channels-by-name).
- **Dans l'Activity aussi** — **Modifier la liste** affiche les noms et les dates dans ton fuseau horaire. Sous le texte, **Modifier la liste** et **Nouvelle liste** ont la même ligne, avec le lien vers le guide. Les liens s'ouvrent maintenant, dans le texte d'une tâche et dans les messages : Discord te demande d'abord si tu veux en sortir. Voir [Modifier la liste](/docs/activity-list/#edit-the-list).
- **Les codes fonctionnent toujours** — un code que tu écris ou colles est enregistré tel quel, et le fichier de **Télécharger** garde les codes : les anciens fichiers s'importent donc sans changement. Voir [Les codes derrière les noms](/docs/writing-a-list/#the-codes-behind-the-names).

## 2.4.1 — Webhooks et dates, corrigés

Released 2026-11-21

- **Webhooks avec des guillemets dans le texte** — une tâche, une variable ou un nom avec des guillemets, une barre oblique inverse ou un saut de ligne ne casse plus le corps de l'appel : TTM échappe la valeur, et le service reçoit un JSON valide. Voir [Jetons](/docs/config-webhook/#tokens).
- **Tous les formats `@time` définissent le rappel** — les dates aux styles `s` et `S` de Discord, la date courte avec l'heure, comptent maintenant comme la date du rappel. `S` est le premier format du menu `@time` : jusqu'ici TTM ne le voyait pas, donc le rappel était calculé à partir du moment où tu enregistrais, et la date restait dans le texte. Voir [Les rappels dans le texte](/docs/writing-a-list/#reminders-in-the-text).

## 2.4.0 — La deuxième rangée te montre le chemin

Released 2026-11-20

- **Le rouge n'affiche que ce que tu peux retirer** — avec **Propriétaire**, **Tag**, **Rappel** ou **Webhook** en rouge, le menu des tâches ne liste que les tâches qui ont un propriétaire, des tags, un rappel ou un webhook à retirer. Si aucune n'en a, le menu est désactivé et le dit, par exemple *Aucun propriétaire à retirer*, et tu reçois une note sur ce qu'il faut faire à la place. Voir [La deuxième rangée](/docs/channel-tasks/#the-second-row).
- **L'Activity le dit aussi** — en mode rouge, le panneau d'une tâche qui n'a rien à retirer le dit en haut, et **Supprimer** reste désactivé. Voir [Le panneau d'une tâche](/docs/activity-list/#the-panel-of-a-task).
- **Contenu et Rappel te disent la suite** — appuie sur **Contenu** ou **Rappel** et un message que toi seul peux voir dit quelle tâche choisir dans le menu au-dessus des boutons, avec un bouton qui te ramène à la liste. Il s'arrête dès que tu as choisi une tâche de cette façon, sur n'importe quel serveur. Voir [La deuxième rangée](/docs/channel-tasks/#the-second-row).

## 2.3.0 — Les nouvelles listes s'annoncent

Released 2026-11-19

- **Une nouvelle liste s'annonce** — créer, importer ou cloner une liste publie une notification en dessous, avec un lien vers la liste. Elle mentionne les propriétaires des tâches, donc Discord les prévient. Avec le suivi de l'historique activé, le fil commence par la liste. Voir [Quand une liste est créée](/docs/configuration/#when-a-list-is-created).
- **Une explication par liste** — avec les astuces activées, la première notification d'une nouvelle liste explique une seule fois pourquoi TTM publie des notifications et où les configurer. Voir [Astuces](/docs/configuration/#tips).
- **`/config app` dans un nouvel ordre** — les **Astuces** viennent en premier, avec un bouton vert ou gris. **Comportement** réunit les notifications push lisibles, la conservation de l'état après la sélection et la nouvelle option **Mentionner les propriétaires dans les nouvelles listes**, activée par défaut. Les rappels récurrents affichent l'emoji Premium. Voir [/config app](/docs/configuration/).
- **Chaque tâche qui change déclenche son webhook** — coche la dernière sous-tâche et le groupe est terminé lui aussi : maintenant les deux déclenchent leurs webhooks. Coche un groupe et ses sous-tâches déclenchent les leurs. Les appels partent dans l'ordre de la liste, et tout le cochage compte comme un seul clic. Voir [Quand un webhook se déclenche](/docs/webhooks/#when-a-webhook-fires).
- **Tout rouvrir déclenche les webhooks de réouverture** — pour les tâches qu'il rouvre, dans le salon et dans l'Activity. Voir [Quand un webhook se déclenche](/docs/webhooks/#when-a-webhook-fires).
- **Un seul avertissement par webhook** — quand le même webhook est sur plusieurs tâches qui changent ensemble et que l'appel échoue, tu reçois un seul avertissement. Voir [Quand un webhook échoue](/docs/webhooks/#when-a-webhook-fails).
- **Les rappels partent de ton fuseau horaire** — tant que tu n'as pas choisi de fuseau horaire, le formulaire **Quand** propose celui de ta langue Discord : `America/Sao_Paulo` en portugais du Brésil, `Europe/Rome` en italien. Les rappels que tu écris dans le texte d'une liste l'utilisent aussi, dans le salon et dans l'Activity. Une langue parlée dans plusieurs fuseaux, comme l'anglais (US), garde celui du serveur. Voir [Ton fuseau horaire](/docs/reminders/#your-time-zone).
- **Inviter depuis l'Activity** — **Inviter**, en haut à droite de l'accueil et de chaque liste, ouvre la fenêtre de Discord pour inviter des amis ou envoyer l'invitation dans un salon. Voir [Rejoindre les autres](/docs/activity/#join-the-others).
- **Ton statut Discord affiche l'Activity** — tant que tu es dedans, ton profil dit *Planifie les tâches avec l'équipe*, dans ta langue, et rien sur la liste. Discord te le demande d'abord : si tu refuses, l'Activity s'ouvre quand même. Voir [Ton statut sur Discord](/docs/activity/#your-status-on-discord).

## 2.2.0 — Prendre une tâche

Released 2026-11-18

- **Prends une tâche toi-même** — clique sur **Propriétaire** jusqu'à ce qu'il soit bleu, puis choisis une tâche sans désigner personne : elle est à toi, et le salon montre qui l'a prise. Une tâche qui a déjà un propriétaire reste comme elle est : pour le remplacer, choisis-toi d'abord dans le menu. Avec **Conserver l'état après la sélection**, prends une tâche après l'autre sans recliquer sur **Propriétaire**. Voir [Propriétaire](/docs/channel-tasks/#owner).
- **Prends une tâche dans l'Activity** — sur une tâche sans propriétaire, **Propriétaire** s'ouvre avec ton nom déjà choisi : **Enregistrer** la rend à toi. Voir [Propriétaire](/docs/activity-list/#owner).
- **Celui qui reçoit une tâche en est informé** — donne une tâche à quelqu'un d'autre, ou à un rôle, et la notification dans le salon le mentionne, donc Discord le prévient. Quand tu prends une tâche toi-même, personne n'est mentionné. Voir [Propriétaire](/docs/channel-tasks/#owner).

## 2.1.0 — Les news dans le bot

Released 2026-11-17

- **`/news`** — les dernières nouvelles de Team Tasks Manager, dans ta langue, dans un message que toi seul peux voir. Sous chaque nouveauté, **Serveur Discord** ouvre notre serveur d'assistance et **Notes de version** ouvre cette version sur cette page. Les boutons **Précédente** et **Suivante** vont vers les nouveautés plus anciennes et plus récentes. Voir [`/news`](/docs/commands/#news).
- **Chaque version dans `/news`** — à partir de la 1.0.0, chacune avec son jour de sortie : reviens en arrière avec **Précédente**. Voir [`/news`](/docs/commands/#news).
- **Une ligne pour les nouveautés que personne n'a lues** — quand il y a une nouveauté que personne sur ton serveur n'a encore ouverte, la dernière ligne des panneaux du bot le dit jusqu'à ce que quelqu'un ouvre `/news` : elle disparaît alors pour tout le monde sur le serveur. Voir [`/news`](/docs/commands/#news).

## 2.0.1 — Le mode Activity dans le Tutoriel

Released 2026-11-16

- **Une leçon sur le mode Activity** — la liste d'entraînement du Tutoriel compte sept leçons : avant la dernière, coche une tâche en mode Activity, plus fluide et libéré des limites des salons textuels. Voir [Pour commencer](/docs/getting-started/#2-create-your-first-list).

## 2.0.0 — L'Activity

Released 2026-11-15

- **L'Activity** — une liste s'ouvre dans une fenêtre à l'intérieur de Discord, sur ordinateur et sur mobile. Plusieurs personnes y travaillent en même temps, et chacun voit chaque changement en direct. Quand la dernière personne part, la liste retourne dans son salon, avec un résumé des changements. Voir [L'Activity](/docs/activity/).
- **Un nouveau premier bouton** — **Activity** <img class="inline-ic" src="/icons/activity.png" alt="" /> emmène la liste dans l'Activity, dans les salons textuels et dans le chat des salons vocaux. Il faut la permission Discord *Utiliser les Activités* sur le salon. Une liste déjà présente dans tes salons l'obtient à son prochain changement. Voir [Ouvrir une liste dans l'Activity](/docs/activity/#open-a-list-in-the-activity).
- **Cloner la liste est dans Autre** — au-dessus de **Télécharger**, et là même quand la liste est verrouillée. Le Guide le dit aussi. Voir [Ce qu'il y a dans Autre](/docs/the-task-list/#whats-inside-more).
- **Quand une liste est dans l'Activity** — son message dans le salon n'a que **Rejoindre l'Activity**, et la liste ne peut pas y être modifiée. Voir [Rejoindre les autres](/docs/activity/#join-the-others).
- **Launch** — le **Lanceur d'applications** de Discord, ou le bouton des Activités d'un appel vocal, ouvre les listes du salon. Rejoins-en une, emmène-en une autre dans l'Activity, ou crée-en une nouvelle. Voir [L'accueil du salon](/docs/activity/#the-home-of-the-channel).
- **`/config lists`** — une liste dans l'Activity est marquée *dans l'Activity*. **Supprimer** la retire pour tout le monde, et **Sceller** la ramène d'abord dans le salon. Voir [Ce qui reste dans le salon](/docs/activity/#what-stays-in-the-channel).
- **L'offre Founder** — pour une durée limitée avant la fin de la bêta, chaque serveur peut débloquer le badge Founder ; les 5 000 premiers Founders à acheter obtiennent l'offre annuelle à 20 € au lieu de 36 €, hors TVA. Voir [Founder](/premium/#founder).
- **Rappels de rôle par message privé** — quand le bot ne peut pas écrire dans le salon de la liste, l'avis qui accompagne le rappel est dans la langue de la personne qui a choisi les membres du rôle.

## 1.5.0 — La récurrence depuis des menus

Released 2026-11-07

- **Choisis la récurrence dans des menus** — **Modifier la récurrence** ouvre un formulaire avec trois menus au lieu de deux champs à écrire : **Combien de fois, au total**, **Intervalle** et **Unité** (minutes, heures ou jours). Pas d'intervalle à écrire et pas de format à rater : pour quatre rappels, tu choisis 4. Voir [Les champs de la répétition](/docs/reminders/#the-repetition-fields).
- **Le badge compte chaque rappel** — sur la ligne de la tâche, `↻1d ×4` veut maintenant dire quatre rappels, un par jour, le premier compris. Avant, `×` comptait les répétitions après le premier. Une liste écrite avant cette version affiche l'ancien nombre jusqu'à ce que quelqu'un la modifie. Voir [Lire un rappel sur la tâche](/docs/reminders/#reading-a-reminder-on-the-task).
- **Jusqu'à 50 fois au total** — en Premium, un rappel arrive au plus 50 fois, le premier compris, et un rappel qui en avait déjà plus les garde. Dans **Mise à jour groupée**, le triplet compte toujours les répétitions après le premier : 49 au maximum. Voir [Limites connues](/docs/known-limits/#reminders).

## 1.4.0 — Tutoriel, listes dans les salons vocaux

Released 2026-11-05

- **Un tutoriel pour ta première liste** — l'explication affichée par `/creer-liste` a un bouton **Tutoriel** à côté de **Crée ta liste**. Il transforme l'explication en une liste d'entraînement de six leçons, dans ta langue, et t'envoie le Guide, le même que dans **Autre** → **Guide**, dans un message que toi seul peux voir. La liste d'entraînement est une liste normale : supprime-la depuis **Autre** quand tu as fini. Le bouton apparaît avec les astuces activées, et la carte de bienvenue et `/help` y renvoient. Voir [Pour commencer](/docs/getting-started/#2-create-your-first-list).
- **Les emoji des boutons ont des noms courts** — dans **Mise à jour groupée**, dans le formulaire du texte d'une tâche et dans le fichier de Télécharger, l'emoji d'un bouton de la liste, comme ceux des leçons du Tutoriel, s'affiche sous la forme `:owner:`, `:reminder:`, `:content:` et `:more:` au lieu d'un long code. Écris un de ces noms dans une tâche et la liste affiche l'emoji. Voir [Emoji des boutons](/docs/writing-a-list/#button-emoji).
- **Des listes dans les salons vocaux** — `/creer-liste` fonctionne dans le chat d'un salon vocal, et **Cloner la liste** propose aussi les salons vocaux. Une liste là-bas fait tout ce qu'elle fait dans un salon textuel, sauf la timeline de l'activité, parce que Discord n'autorise pas les fils dans les salons vocaux : celui qui en crée une reçoit un court message qui l'explique. Dans un salon vocal, TTM a besoin de *Se connecter* à la place des deux permissions de la timeline. Voir [Salons vocaux](/docs/known-limits/#voice-channels).

## 1.3.0 — De l'espace autour des groupes

Released 2026-11-03

- **Espace autour des groupes** — une nouvelle option de `/config app` : désactive-la et tes listes perdent les lignes vides au-dessus et en dessous des tâches qui ont des sous-tâches, pour une liste plus compacte. Activée par défaut : voir [Espace autour des groupes](/docs/configuration/#space-around-groups).
- **L'apparence des listes est un seul menu déroulant** — **Astuces**, **Tâches terminées estompées** et **Espace autour des groupes** sont maintenant des options du même menu déroulant de `/config app` : coche celles que tu veux activer. Voir [Astuces et apparence des listes](/docs/configuration/#list-appearance).
- **Le Guide dit comment cocher une tâche** — sa première page et la page des boutons de tâche le disent maintenant en gras : pour cocher ou décocher une tâche, tous les boutons de la deuxième rangée doivent être éteints. Voir [Le menu de cochage](/docs/the-task-list/#the-check-selector).
- **Une liste verrouillée dit qui la modifie** — pendant que quelqu'un modifie la liste, sa dernière ligne dit qui, et comment la déverrouiller si elle reste verrouillée : **Autre → Déverrouiller la liste**. Elle prend la place de la ligne d'astuces et s'affiche même avec les astuces masquées. Voir [Quand la liste est verrouillée](/docs/the-task-list/#when-the-list-is-locked).

## 1.2.1 — Cocher une tâche

Released 2026-11-01

- **Le menu des tâches dit *Cocher une tâche*** — quand tous les boutons de tâche sont gris, le menu au-dessus des boutons dit à quoi il sert, au lieu d'afficher le titre de la liste. Voir [La deuxième rangée](/docs/channel-tasks/#the-second-row).
- **Les formulaires qui verrouillent la liste disent comment la déverrouiller** — **Mise à jour groupée** et le formulaire du texte d'une tâche se terminent par une ligne : les fermer avec **Annuler** ou la ✕ laisse la liste verrouillée, et **Autre → Déverrouiller la liste** la déverrouille. Voir [J'ai appuyé sur Annuler et la liste reste verrouillée](/docs/troubleshooting/#i-pressed-cancel-and-the-list-stays-locked).

## 1.2.0 — Astuces, barre de progression, liste terminée

Released 2026-11-01

- **Le menu des tâches te dit la suite** — tant qu'un bouton de tâche est bleu ou rouge, le menu au-dessus des boutons affiche l'action, comme *Modifier la tâche* ou *Supprimer la tâche* : choisis la tâche là. Avec tous les boutons gris, il affiche de nouveau le titre de la liste. Voir [La deuxième rangée](/docs/channel-tasks/#the-second-row).
- **Des astuces sous chaque liste** — une petite dernière ligne renvoie vers **Guide**, dans **Autre**, et vers ce site. Le réglage de la légende de `/config app` s'appelle maintenant **Astuces**, et désactive à la fois la ligne et l'explication affichée par `/creer-liste` : voir [Astuces](/docs/configuration/#tips).
- **Une barre de progression** — une fine barre verte en bas de chaque liste, par paliers de 5 %. Elle n'est pleine que quand toutes les cases sont cochées, et une liste scellée la garde : voir [Sous la liste](/docs/the-task-list/#under-the-list).
- **Liste terminée** — le cochage qui termine une liste le dit dans sa notification et dans le fil de l'historique : voir [Mode de notification](/docs/configuration/#notification-mode).
- **Le Guide** dit quoi faire après avoir appuyé sur un bouton de tâche : choisir la tâche dans le menu.
- **Autre** commence par **Guide** et **Télécharger**, puis **Sceller la liste** et **Supprimer la liste**. Sur une liste verrouillée, **Déverrouiller la liste** reste en haut : voir [Ce qu'il y a dans Autre](/docs/the-task-list/#whats-inside-more).

## 1.1.0 — Carte d'invitation, message de bienvenue, astuces dans le statut

Released 2026-10-26

- **`/invite`** — une carte publique avec le logo, ce que fait le bot et comment commencer (la même présentation que sa page de l'App Directory) et trois boutons : l'ajouter à un autre serveur (la page d'autorisation de Discord, directement depuis le bot), le guide, le serveur d'assistance. Même nom dans toutes les langues : voir [Commandes](/docs/commands/).
- **Une carte de bienvenue à la première arrivée** — une seule fois dans la vie d'un serveur, dans son salon système : ce que fait le bot, trois étapes pour commencer avec `/creer-liste` et `/config app`, quelles permissions il demande et pourquoi : voir [Concepts de base](/docs/core-concepts/#the-permissions-ttm-asks-for). Jamais en message privé. Rien n'est envoyé si le serveur n'a pas de salon système, s'il y masque les messages d'arrivée, ou si le bot ne peut pas y écrire.
- **`/help` dit qui voit les commandes de configuration** — la page Configuration dit maintenant que Discord ne montre les trois sous-commandes `/config` qu'à ceux qui ont *Gérer le serveur*, et où un administrateur peut changer cela.
- **`/config app` te dit quand le fuseau horaire est encore celui par défaut** — une ligne sous le fuseau actuel, jusqu'à ce que tu choisisses celui de ton équipe.
- **Des astuces dans le statut du bot** — la ligne sous le nom du bot change toutes les dix minutes.
- **Le panneau Autre** se termine par le pied de page, comme toutes les autres pages.

## 1.0.1 — Traductions relues

Released 2026-10-24

- **Espagnol, portugais, français et allemand, relus en entier** — un mot pour chaque fonctionnalité, un ton unique partout, et les noms des permissions tels que Discord les affiche. L'espagnol d'Amérique latine dit maintenant *tú*, pas *vos*.
- **Options de `/config webhook` avec des accents** dans les langues qui en ont, comme *acción*, *événement* ou *löschen* : voir [/config webhook](/docs/config-webhook/).

## 1.0.0 — Première version publique

Released 2026-10-23

La première version de Team Tasks Manager par **bitsplitters**. Ce qu'elle apporte :

### Listes

- **Des listes de tâches partagées** — tu écris une liste en texte simple, avec des tâches, des sous-tâches et des groupes de tâches : voir [Pour commencer](/docs/getting-started/#2-create-your-first-list).
- **Le panneau de boutons** — une rangée agit sur toute la liste, une rangée de boutons à trois états sur une seule tâche. Voir [La liste dans le salon](/docs/the-task-list/).
- **Nettoyer la liste** retire les tâches terminées, après une confirmation qui te dit combien elles sont et ce qui part avec elles : voir [Nettoyer la liste](/docs/the-task-list/#clean-list).
- **Tout rouvrir** remet toutes les tâches terminées à faire, et peut déplacer les rappels à une nouvelle date : voir [Tout rouvrir](/docs/the-task-list/#reopen-all).
- **Sceller la liste** garde une liste terminée dans le salon comme compte rendu, sans boutons, et **Supprimer la liste** la retire définitivement : voir [Ce qu'il y a dans Autre](/docs/the-task-list/#whats-inside-more).
- **Déverrouiller la liste** — une liste restée verrouillée, parce que quelqu'un a fermé un formulaire avec la ✕, se déverrouille depuis **Autre** : voir [Quand la liste est verrouillée](/docs/the-task-list/#when-the-list-is-locked).
- **Propriétaires** — le propriétaire d'une tâche peut être une personne, un rôle, ou plusieurs personnes qui partagent un rôle que TTM crée (Premium) : voir [Propriétaires et tags](/docs/owners-and-tags/#owner-a-person-a-role-or-several-people).
- **Seul le propriétaire coche une tâche** — ou un membre du rôle propriétaire, ou celui qui a *Gérer les messages* sur le salon. Voir [Qui peut cocher une tâche](/docs/core-concepts/#who-can-tick-a-task).
- **Toutes les erreurs d'une mise à jour groupée d'un coup** — quand une mise à jour groupée ne peut pas être enregistrée, un seul message liste tous les problèmes. Voir [Quand le texte ne peut pas être enregistré](/docs/writing-a-list/#when-the-text-cant-be-saved).
- **`/config lists`** affiche toutes les listes du serveur, et en régénère, en scelle ou en supprime plusieurs à la fois : voir [/config lists](/docs/config-lists/).

### Téléchargement et import

- **Télécharger** t'envoie la liste sous forme de fichier `.txt`, dans un message que toi seul peux voir : voir [Ce qu'il y a dans Autre](/docs/the-task-list/#whats-inside-more).
- **Importer une liste depuis un fichier** — l'option `file` de `/creer-liste` reconstruit une liste à partir de ce fichier, même sur un autre serveur : voir [`/creer-liste`](/docs/commands/#create-list).

### Rappels

- **Les rappels** arrivent au propriétaire de la tâche à la bonne minute. Une personne reçoit un message privé, un rôle une mention dans le salon de la liste : voir [Rappels](/docs/reminders/).
- **Les rappels récurrents** (Premium) ajoutent un intervalle et des répétitions, et un serveur les active dans `/config app` : voir [Rappels répétés](/docs/reminders/#repeating-reminders).
- **Enregistrer seulement ce qui a changé** — sur la carte récapitulative d'un rappel existant, **Enregistrer** s'active dès que tu changes quelque chose. Un rappel enregistré sans changement n'envoie aucune notification : voir [Modifier ou retirer](/docs/channel-tasks/#editing-or-removing).
- **Les rappels restent jusqu'à ce que tu les retires** — TTM ne retire jamais un rappel de lui-même. Un rappel dont toutes les alertes sont passées reste sur sa tâche. Un rappel sans propriétaire ou sans date, ou qui ne peut pas être lu, bloque l'enregistrement, et le message nomme la tâche à corriger : voir [Lire un rappel sur la tâche](/docs/reminders/#reading-a-reminder-on-the-task). Retirer le propriétaire d'une tâche dont le rappel n'a pas encore été envoyé demande une confirmation, parce que le rappel part avec lui.

### Offres, configuration et webhooks

- **L'offre Free et Premium** — après la bêta, l'offre Free a des limites et Premium les lève : voir [Ce que Premium débloque](/docs/premium/). Ce que tu construis pendant la bêta : voir [Comment fonctionne la bêta](/docs/beta/).
- **Configuration** — `/config app` règle les notifications, la timeline de l'activité, les rappels, le fuseau horaire et les permissions du serveur : voir [/config app](/docs/configuration/).
- **Les webhooks** (Premium) envoient une requête HTTP que tu définis quand une tâche est terminée ou rouverte. Ils acceptent des jetons `{{ }}`, et seulement des adresses `https` publiques : voir [/config webhook](/docs/config-webhook/).
- **Prévenu là où ça compte** — quand TTM ne peut pas publier dans le salon d'une liste, il le dit en privé à la personne qui a agi. Un webhook en échec reçoit aussi un avertissement : voir [Le bot dit qu'une permission manque](/docs/troubleshooting/#the-bot-says-a-permission-is-missing) et [Quand un webhook échoue](/docs/webhooks/#when-a-webhook-fails).
- **Interface localisée** — les textes du bot et certains noms de commandes apparaissent dans ta langue : voir [Noms des commandes dans ta langue](/docs/commands/#command-names-in-your-language). Ce site fonctionne avec la traduction de ton navigateur.

---

<div class="callout"><div class="callout-t">Bientôt</div>Une vue des tâches réservée au propriétaire et un tableau de bord de progression arrivent. Cette page suivra chaque étape.</div>
