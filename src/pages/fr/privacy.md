---
layout: ../../layouts/Legal.astro
title: "Politique de confidentialité"
description: "Quelles données le bot Discord Team Tasks Manager collecte, pourquoi, et comment elles sont traitées."
updated: "Dernière mise à jour : 24 novembre 2026"
fonte: a242d550d1bb
---

Cette Politique de confidentialité explique quelles données le bot **Team Tasks Manager** (« TTM ») collecte et comment nous les traitons. Elle s'applique à l'utilisation du bot sur Discord, Activity comprise (voir [L'Activity](#lactivity)), à notre serveur communautaire Discord (voir [Notre serveur communautaire](#notre-serveur-communautaire)) et à nos sites web (voir [Nos sites web](#nos-sites-web)). Pour tes droits au titre de la législation européenne sur la protection des données, consulte aussi notre [page RGPD](/fr/gdpr/).

## Qui nous sommes

Le responsable du traitement est **bitsplitters** — Alessandro Vurro, Via di Dragone 478/B, 00126 Rome (RM), Italie. N° de TVA italien 18349651002, e-mail certifié (PEC) : alessandro.vurro@pec.it. Contact : **info@bitsplitters.app**.

## Ce que nous collectons

TTM ne stocke que ce qui est nécessaire pour faire fonctionner les listes de tâches dans ton serveur :

- **Identifiants Discord** — ID du serveur (guild), du salon et des messages ; ID des utilisateurs et des rôles quand tu attribues un propriétaire, ajoutes un tag ou configures des permissions.
- **Contenu des tâches que tu crées** — titres des listes et texte des tâches, y compris tout ce que tu y écris (mentions, liens, notes).
- **Rappels** — dates, intervalles, répétitions et fuseau horaire défini pour le serveur.
- **Ton fuseau horaire personnel** — le fuseau horaire que tu choisis avec `/my timezone` ou dans l'engrenage de l'[Activity](#lactivity). Il est enregistré avec ton ID utilisateur Discord et réutilisé d'un serveur à l'autre. Un autre fuseau choisi pour une date n'est pas enregistré, et **Retirer mon fuseau** le supprime.
- **Ton canal de messages privés** — quand tu es propriétaire d'une tâche, ses rappels te parviennent par message privé ; le bot conserve donc l'ID de son canal de messages privés avec toi, pour les livrer avec une seule requête à Discord. Si tu n'acceptes pas les messages privés, il conserve aussi jusqu'à quand ne pas réessayer (six heures après la tentative échouée). Les deux sont enregistrés avec ton ID utilisateur Discord, comme le fuseau horaire ; les messages eux-mêmes ne sont pas conservés.
- **Si tu as appris la deuxième rangée** — quand tu appuies sur **Contenu** ou **Rappel** sous une liste, le bot t'envoie une courte astuce avec l'étape suivante, jusqu'à la première fois où tu choisis une tâche dans le menu de la liste avec l'un d'eux activé. Ensuite l'astuce ne revient plus, sur aucun serveur : pour cela le bot conserve ton ID utilisateur Discord et la date à laquelle tu l'as fait, rien d'autre.
- **Les rôles que TTM crée** — quand une tâche est confiée à plusieurs personnes, TTM crée un rôle et conserve son ID, le nom qu'il lui a donné, les ID utilisateur des personnes à qui il l'a donné, qui l'a demandé, quand, et dans laquelle des langues du bot : pour afficher ces personnes quand la tâche est modifiée, pour supprimer le rôle quand plus aucune liste ne l'utilise, et — la langue — pour rédiger l'avis qui accompagne un rappel envoyé à ces personnes par message privé quand TTM ne peut pas publier dans le salon de la liste.
- **Configuration** — paramètres par serveur comme le mode de notification, l'enregistrement de l'historique, l'option push et le fuseau horaire.
- **Webhooks** — la méthode HTTP, l'URL, les en-têtes et le corps que tu définis, et leur association aux tâches.
- **Journaux d'activité** — enregistrements des actions effectuées sur les listes (qui a fait quoi, et quand), quand l'enregistrement de l'historique est activé.
- **L'Activity** — quand tu ouvres une liste dans l'Activity, la fenêtre de TTM à l'intérieur de Discord : qui tu es, une clé pour la fenêtre, et un enregistrement des modifications jusqu'à la publication de leur résumé. Voir [L'Activity](#lactivity).
- **Statistiques d'utilisation agrégées** — des compteurs par serveur : à quelle fréquence chaque fonctionnalité est utilisée et quand elle l'a été pour la dernière fois. Aussi, chaque jour, les totaux de listes, de tâches, de rappels et de webhooks, et le nombre de membres du serveur. Enfin, pour chaque langue de l'app Discord, combien d'interactions, de personnes et de serveurs il y a eu ce jour-là : pour compter chaque personne et chaque serveur une seule fois, TTM garde leurs ID en mémoire pour ce jour seulement et n'enregistre que les totaux. Aucune de ces statistiques n'enregistre qui a fait quoi.

## Ce que nous ne collectons PAS

- Nous ne lisons **pas** et ne stockons **pas** tes messages Discord généraux ni tes messages privés. Le bot n'utilise aucun des accès privilégiés de Discord : ni le contenu des messages, ni la liste des membres, ni la présence.
- Nous ne collectons **pas** d'adresses e-mail, de mots de passe ni d'informations de paiement via le bot. Si tu nous écris par e-mail, nous n'utilisons ton adresse que pour te répondre.

## Pourquoi nous les utilisons

Nous traitons ces données uniquement pour **fournir le service** : afficher et mettre à jour tes listes, envoyer des rappels et des notifications, exécuter les webhooks que tu configures, et maintenir et améliorer le bot (grâce aux statistiques agrégées). Tu n'as aucune obligation légale de fournir ces données, mais sans elles le bot ne peut pas fonctionner : sans les identifiants Discord et le contenu de tes listes, TTM n'a rien à t'afficher ni à te rappeler.

## Partage

Nous ne vendons **pas** tes données. Les données sont traitées par notre hébergeur **OVHcloud**, qui héberge le bot et sa base de données en **France (UE)**, en tant que sous-traitant pour notre compte. Le bot fonctionne aussi sur la plateforme **Discord** : ton utilisation est donc soumise à la [Politique de confidentialité de Discord](https://discord.com/privacy). Discord est établi aux États-Unis : voir [Transferts internationaux](/fr/gdpr/#transferts-internationaux). **Cloudflare**, également établi aux États-Unis, héberge la page de l'[Activity](#lactivity) et achemine sa connexion au bot. Quand tu utilises des webhooks, TTM envoie les données que tu as configurées aux **destinations tierces que tu choisis** — ces services échappent à notre contrôle.

**Rapports d'erreur.** Quand quelque chose échoue de façon inattendue, le bot envoie un rapport dans un salon privé de notre serveur Discord, que nous seuls pouvons voir. Un rapport contient les ID du serveur et de l'utilisateur concernés et les détails techniques de la panne. Il peut contenir un fragment de ce qui était en cours de traitement, comme un morceau de tâche. Nous supprimons ces rapports une fois la panne corrigée, et au plus tard dans les 12 mois.

**E-mail.** Ce que tu écris à nos adresses sur bitsplitters.app est transféré par **Cloudflare Email Routing**, en tant que sous-traitant pour notre compte, vers une boîte aux lettres chez **Google** (Gmail), où nous le lisons pour te répondre. Ton message peut donc arriver aux États-Unis : voir [Transferts internationaux](/fr/gdpr/#transferts-internationaux). Nous utilisons ton adresse et ton message uniquement pour te répondre et suivre la même demande : pour respecter une obligation légale quand tu exerces tes droits ou signales un contenu illicite (art. 6, par. 1, point c), du RGPD), dans le cadre du service quand tu nous écris à son sujet (art. 6, par. 1, point b), du RGPD), sinon sur la base de notre intérêt légitime à te répondre (art. 6, par. 1, point f), du RGPD).

## Conservation

Les données sont conservées tant que le bot est présent et utilisé dans ton serveur.

**Quand le bot est retiré d'un serveur**, nous supprimons son contenu et ses données opérationnelles : les listes de tâches et leurs tâches, les tags, les rappels et les événements de rappel programmés, les webhooks et leurs actions, l'historique d'activité, les enregistrements de modifications de l'Activity et les enregistrements des rôles créés par TTM — les rôles eux-mêmes restent dans le serveur, qui les gère désormais.

**Ce que nous conservons** est le minimum nécessaire pour faire fonctionner le service et mesurer son adoption : l'ID du serveur avec les paramètres configurés pour lui, les dates d'arrivée et de départ du bot, les paramètres de permissions des commandes, les enregistrements d'abonnement le cas échéant, et des compteurs d'utilisation non identifiants. **Aucun contenu de tâche n'est conservé.**

**Journaux opérationnels** — pour diagnostiquer les pannes, le bot écrit des journaux techniques sur le serveur où il tourne. Au niveau de journalisation utilisé en production, ils ne contiennent **pas** le texte de tes tâches ni les titres de tes listes ; ils peuvent contenir des identifiants Discord, par exemple l'ID de l'utilisateur concerné par une erreur. Les journaux sont supprimés automatiquement après **30 jours**.

**Sauvegardes** — nous sauvegardons la base de données toutes les heures, de façon chiffrée, pour rétablir le service après une panne. Les sauvegardes sont conservées **14 jours**, dans l'UE. Les données que tu supprimes, ou que nous supprimons quand le bot quitte un serveur, peuvent donc survivre dans une sauvegarde jusqu'à 14 jours ; ensuite elles disparaissent définitivement. Une sauvegarde ne sert jamais qu'à rétablir le service.

**E-mails** — nous conservons les e-mails que tu nous envoies, avec nos réponses, **12 mois** après notre dernière réponse, pour pouvoir suivre la même demande ; plus tôt, si tu nous le demandes.

**Ton fuseau horaire personnel, ton canal de messages privés et la deuxième rangée** — le fuseau horaire que tu as choisi (**Retirer mon fuseau** le supprime, c'est toi qui le fais), l'ID de ton canal de messages privés avec le bot (avec, si tu n'acceptes pas les messages privés, jusqu'à quand ne pas réessayer) et l'enregistrement du fait que tu as appris la deuxième rangée sont enregistrés avec ton ID utilisateur Discord et ne sont liés à aucun serveur en particulier : retirer le bot d'un serveur ne les supprime donc pas. Écris à **info@bitsplitters.app** avec ton ID utilisateur Discord et nous les supprimerons. Supprimer l'enregistrement de la deuxième rangée fait simplement revenir l'astuce.

**L'Activity** — la clé de sa fenêtre dure 24 heures, et son empreinte est supprimée dans l'heure qui suit son expiration. L'enregistrement des modifications faites là-bas est supprimé quand la liste retourne dans le salon. Voir [L'Activity](#lactivity).

**Tu peux supprimer toi-même une liste**, sans nous le demander : le bouton **Supprimer la liste** dans le panneau *Autre* de la liste, ou `/config lists` quand le message de la liste n'est plus là. La suppression est immédiate et définitive, et elle emporte avec elle les tâches, propriétaires, tags, rappels et l'historique d'activité de la liste.

**Sceller la liste**, dans le même panneau, supprime aussi les données de la liste de TTM, mais laisse son message — et son fil de timeline — dans le salon comme de simples messages Discord, sous le contrôle de ton serveur. Les rôles que TTM a créés pour cette liste restent aussi, et TTM les oublie.

**Un rôle créé par TTM** est oublié — son enregistrement et les personnes à qui il a été donné — dès qu'aucune liste ne l'utilise plus, comme propriétaire ou comme tag : si le rôle est encore tel que TTM l'a laissé (même nom, aucune permission, même nombre de membres), TTM le supprime aussi du serveur ; sinon il le laisse à ton serveur. TTM oublie aussi les rôles d'une liste quand tu la scelles, et tous quand le bot est retiré du serveur.

Tu peux demander la suppression à tout moment (voir [RGPD](/fr/gdpr/)) ; nous pouvons aussi supprimer des données plus tôt.

## L'Activity

L'[Activity](/docs/activity/) ouvre une liste dans une fenêtre à l'intérieur de Discord. En plus de ce que le bot traite déjà :

- **La connexion.** Quand tu l'ouvres, tu fais savoir à TTM qui tu es, via Discord. Discord donne à TTM le profil de base de ton compte — ton ID utilisateur, ton nom et ton avatar, la langue de ton app Discord et quelques détails du compte, comme tes badges et ton type de Nitro — jamais ton e-mail. TTM n'enregistre que ton ID utilisateur et utilise la langue pour les textes de la fenêtre et pour les totaux quotidiens par langue (voir [Ce que nous collectons](#ce-que-nous-collectons)) ; il n'enregistre pas le reste, ni l'accès que Discord lui accorde.
- **Ton statut sur Discord.** Dans la même fenêtre, Discord te demande si TTM peut aussi afficher sur ton profil que tu es dans l'Activity. Si tu acceptes, TTM envoie à Discord une ligne, *Planifie les tâches avec l'équipe* dans ta langue, que tes amis et les membres de tes serveurs voient pendant que tu y es. Elle ne dit rien de la liste, du serveur ni du salon, et TTM n'enregistre rien pour cela. Si tu refuses, l'Activity s'ouvre quand même, sans cette ligne.
- **La clé de la fenêtre.** TTM donne à la fenêtre une clé qui dure 24 heures, pour qu'elle se reconnecte toute seule après un redémarrage du bot. TTM n'enregistre qu'une empreinte de la clé, avec ton ID utilisateur, le serveur et le salon concernés, la date de création et la date d'expiration. Les empreintes expirées sont supprimées dans l'heure.
- **Les modifications.** Tant qu'une liste est dans l'Activity, TTM enregistre chaque modification, pour rédiger le résumé publié quand la liste retourne dans le salon : qui l'a faite et quand, le numéro et le texte de la tâche et, selon la modification, les propriétaires, les tags ou les personnes mentionnées (sous forme d'ID Discord), la date d'un rappel ou de **Tout rouvrir**, le nom d'un webhook, le texte des tâches supprimées par **Nettoyer la liste**. Ces enregistrements sont supprimés quand la liste retourne dans le salon : dès que le résumé est publié, ou aussitôt s'il ne peut pas l'être, par exemple parce que le salon n'existe plus. Il reste une ligne sans donnée personnelle — quelle liste, la langue de son résumé, quand elle s'est ouverte et fermée, et pourquoi — qui suit la liste.
- **Qui est là.** Qui est dans l'Activity, et qui modifie quoi, n'est gardé qu'en mémoire, tant que la liste y est. Pour afficher les noms, TTM garde en mémoire pendant dix minutes ceux qu'il reçoit de Discord — des personnes dans l'Activity et, avec **Propriétaire** et **Tag**, des membres dont le nom correspond à ce que tu tapes — pour ne pas les redemander. Il ne les enregistre pas.
- **La page et sa connexion.** La fenêtre est une page hébergée par **Cloudflare, Inc.** (États-Unis), en tant que sous-traitant pour notre compte, que Discord charge via son propre proxy. Cloudflare achemine aussi la connexion entre la fenêtre et le bot jusqu'à notre serveur. Ce qu'ils échangent, comme la liste et ses modifications, passe par le proxy de Discord et le réseau de Cloudflare, chiffré à chaque étape : chacun le déchiffre pour l'acheminer, comme le font ces services. Comme nos sites web, la page n'utilise aucun cookie ; contrairement à eux, elle ne charge aucune statistique de visites. Dans ton navigateur, elle conserve les réglages de la page — taille du texte, thème et lignes espacées — qui restent sur ton appareil et n'arrivent jamais à TTM. Elle conserve aussi la clé de la fenêtre, dans le stockage de session que le navigateur vide quand tu fermes Discord, pour ne pas te reconnecter quand Discord la recharge : **Quitter** la supprime aussitôt. Comme tout serveur web, Cloudflare enregistre des données techniques sur chaque requête et chaque connexion, pour la sécurité et pour faire fonctionner le service. Voir la [Politique de confidentialité de Cloudflare](https://www.cloudflare.com/privacypolicy/).
- **Base juridique.** L'exécution du service que tu demandes quand tu ouvres une liste dans l'Activity (art. 6, par. 1, point b), du RGPD).

## Notre serveur communautaire

Nous gérons un serveur Discord pour les utilisateurs de TTM ([comment le rejoindre](/docs/community/)). Le rejoindre est facultatif, et c'est distinct de l'utilisation du bot : le bot n'en a pas besoin.

- **Ce que nous voyons.** Comme sur tout serveur Discord, ses administrateurs et ses modérateurs peuvent voir ton nom d'utilisateur Discord, ton avatar et ton profil tels qu'ils apparaissent dans le serveur, les rôles que tu y as et les messages que tu publies dans ses salons. Nous ne les copions nulle part ailleurs, sauf les transcriptions de tickets décrites plus bas.
- **Modération, rôles et tickets.** Le serveur utilise **MEE6**, un bot Discord tiers, pour attribuer des rôles (par exemple le rôle de membre une fois que tu acceptes le règlement), pour aider à modérer et pour gérer les tickets. MEE6 traite les données dont il a besoin pour cela selon [sa propre politique de confidentialité](https://mee6.xyz/privacy.html).
- **Tickets.** Les candidatures d'ambassadeur, les propositions de collaboration et les demandes d'assistance qui exigent de la discrétion passent par des tickets : un salon privé visible uniquement par toi et par l'équipe. Quand un ticket est fermé, MEE6 crée une **transcription** — une copie des messages de ce ticket, avec les noms et les ID Discord de ceux qui les ont écrits — pour que nous puissions donner suite à la même demande. MEE6 la conserve sur son propre site web, où elle ne s'ouvre qu'après connexion avec Discord, et publie le lien vers elle dans un salon que seule l'équipe peut voir. Nous supprimons ce lien, et toute copie que nous avons téléchargée, dans les **12 mois**, ou plus tôt si tu nous le demandes. La durée pendant laquelle MEE6 conserve sa copie dépend de MEE6 : si tu veux qu'elle soit supprimée, dis-le-nous et nous demanderons à MEE6 de la supprimer.
- **Base juridique.** Notre intérêt légitime à gérer un espace d'assistance et de discussion pour le bot, à examiner les candidatures et les propositions qui nous y sont envoyées, et à le garder sûr (art. 6, par. 1, point f), du RGPD).

Discord reste le fournisseur de la plateforme, et ce qu'il collecte est régi par la [Politique de confidentialité de Discord](https://discord.com/privacy).

## Nos sites web

Nos sites web — bitsplitters.app, tasks.bitsplitters.app et timezones.bitsplitters.app — n'utilisent aucun cookie. tasks.bitsplitters.app mémorise dans ton navigateur le thème et la langue que tu choisis, pour te les proposer à ta prochaine visite : ces choix restent sur ton appareil et ne nous parviennent jamais. Les deux autres sites ne stockent rien dans ton navigateur.

- **Hébergement.** Ils sont hébergés sur **GitHub Pages**, un service de GitHub, Inc. (États-Unis). Comme tout serveur web, GitHub enregistre des données techniques sur chaque visite, y compris ton adresse IP, pour la sécurité et pour faire fonctionner le service. Voir la [Déclaration de confidentialité de GitHub](https://docs.github.com/en/site-policy/privacy-policies/github-general-privacy-statement).
- **Statistiques de visites.** Pour compter les visites et voir quels sites nous envoient des gens, nos pages chargent un script de **Cloudflare Web Analytics**, un service de Cloudflare, Inc. (États-Unis). Pour chaque page vue, il enregistre la page, le site d'où tu viens, ton pays, ton navigateur, ton système d'exploitation et ton type d'appareil, ainsi que le temps de chargement de la page. Il ne dépose aucun cookie, ne stocke rien dans ton navigateur et ne t'identifie pas : nous ne voyons que des totaux, jamais des visiteurs individuels. Cloudflare reçoit ton adresse IP avec la requête, comme tout serveur web, et ne l'utilise pas pour te reconnaître. Voir la [Politique de confidentialité de Cloudflare](https://www.cloudflare.com/privacypolicy/).
- **La carte des fuseaux horaires.** La carte de timezones.bitsplitters.app charge ses images depuis les serveurs d'**OpenStreetMap**, qui reçoivent donc ton adresse IP. Voir la [politique de confidentialité de la fondation OpenStreetMap](https://osmfoundation.org/wiki/Privacy_Policy).
- **Base juridique.** Notre intérêt légitime à publier la documentation et les outils qui accompagnent le bot, et à savoir, de façon agrégée, combien de personnes les lisent et d'où elles viennent (art. 6, par. 1, point f), du RGPD).

## Sécurité

Nous appliquons des mesures techniques et organisationnelles raisonnables pour protéger les données. Aucune méthode de transmission ou de stockage n'est totalement sûre : nous ne pouvons donc pas garantir une sécurité absolue.

## Enfants

TTM ne s'adresse à personne en dessous de l'âge minimum exigé par Discord.

## Modifications

Nous pouvons mettre à jour cette politique ; la date de « Dernière mise à jour » reflète la dernière version.

## Contact

**info@bitsplitters.app**
