---
title: "Modifier une liste à la main"
description: "Modifie une liste en écrivant son texte, pour changer beaucoup de choses d'un coup ou coller une liste venue d'ailleurs. Pour tout le reste, utilise les boutons, plus simples et qui t'évitent les erreurs."
fonte: 7218c363e178
---

Cette page est pour quand tu préfères modifier toi-même le texte d'une liste, dans **Mise à jour groupée** dans le salon ou dans **Modifier la liste** dans l'Activity.

Les boutons font les mêmes choses sans erreurs : **Propriétaire**, **Tag**, **Rappel** et **Webhook** écrivent les codes pour toi, et TTM les vérifie au fur et à mesure. Utilise-les d'abord. Le texte sert pour beaucoup de changements d'un coup, ou pour une liste que tu copies d'ailleurs.

Le tiret et les espaces qui font les tâches et les sous-tâches sont dans [Crée ta première liste](/docs/getting-started/#2-create-your-first-list). Le même texte se trouve dans `/creer-liste`, dans **Nouvelle liste** dans l'Activity et dans le fichier que te donne **Télécharger**.

Dans le formulaire **Contenu** d'une seule tâche, le propriétaire, les tags, le rappel et le webhook ont leurs propres boutons : le formulaire retire un propriétaire, un rappel ou un webhook que tu écris, et te le dit.

<div class="howto"><div class="howto-t">Comment faire</div><div class="howto-grid"><a class="howto-go is-channel" href="/docs/the-task-list/#bulk-update"><span class="howto-k"><img class="place-ic" src="/icons/posto-canale.svg" alt="" />Dans le salon</span><span class="howto-d">Mise à jour groupée, dans la première rangée sous la liste.</span></a><a class="howto-go is-activity" href="/docs/activity-list/#edit-the-list"><span class="howto-k"><img class="place-ic" src="/icons/activity.png" alt="" />Dans l'Activity</span><span class="howto-d">Modifier la liste, en haut de la liste.</span></a></div></div>

## Aide-mémoire

| Tu veux | Tu écris |
| :--- | :--- |
| [Une tâche](#tasks-and-subtasks) | `- La publier` |
| [Une sous-tâche](#tasks-and-subtasks) | `  - Écrire les notes`, sous sa tâche |
| [Une tâche terminée](#tasks-and-subtasks) | `- [X] La publier` |
| [Mentionner une personne](#mentioning-people-and-roles) | le bouton **Tag**, ou `@Nom` |
| [Une de deux personnes qui ont le même nom](#mentioning-people-and-roles) | `@Nom (pseudo)` |
| [Mentionner une nouvelle personne](#writing-someone-new) | le bouton **Tag**, ou `<@ID>` |
| [Mentionner un rôle](#mentioning-people-and-roles) | le bouton **Tag**, ou `@Rôle` |
| [Écrire @ sans mention](#writing--without-a-mention) | `\@Nom` |
| [Définir le propriétaire](#owners-the-mention-with-a-colon) | le bouton **Propriétaire**, ou `@Nom:` |
| [Définir une nouvelle personne comme propriétaire](#writing-someone-new) | le bouton **Propriétaire**, ou `<@ID>:` |
| [Lier un salon](#linking-channels) | `#salon` |
| [Ajouter un lien](#adding-a-hyperlink) | `[texte](https://url)` |
| [Lier une adresse e-mail ou un téléphone](#adding-a-hyperlink) | `[texte](mailto:nom@example.com)`, `[texte](tel:+12025550100)` |
| [Afficher l'emoji d'un bouton](#button-emoji) | `:owner:`, `:reminder:`, `:content:`, `:more:`, `:activity:` |
| [Un rappel à une date](#reminders-in-the-text) | le bouton **Rappel**, ou `2026-12-08 18:00 [0m,0m,0]` |
| [Un rappel dans un autre fuseau horaire](#reminders-in-the-text) | `2026-12-08 18:00 America/New_York [0m,0m,0]` |
| [Un rappel deux jours après l'enregistrement](#reminders-in-the-text) | `[2d,0m,0]` |
| [Lier un webhook](#webhooks-in-the-text) | le bouton **Webhook**, ou `{{wb=nom}}` |

## Tâches et sous-tâches

```
- [X] Réserver les salons vocaux
- [] Préparer les tableaux
  - [X] Collecter les inscriptions
  - [] Tirer les équipes au sort
- [] Publier le règlement
```

- **Une ligne qui commence par `-` est une tâche.**
- **Des espaces avant le tiret en font une sous-tâche** de la tâche au-dessus. Une tâche qui a des sous-tâches devient un **groupe**.
- **La première ligne ne peut pas être une sous-tâche.**
- **La case vient après le tiret** : `[]` pour une tâche à faire, `[X]` pour une tâche terminée. Change-la pour cocher ou décocher la tâche. Une nouvelle ligne sans case est une tâche à faire.
- **Le titre** peut faire jusqu'à 90 caractères.
- **La liste** peut faire jusqu'à environ 4000 caractères et 50 tâches, sous-tâches comprises. Après la bêta, l'offre Free autorise 20 tâches : voir [Ce que Premium débloque](/docs/premium/).

## Personnes, rôles et salons par leur nom

Dans le texte, les personnes, les rôles et les salons s'écrivent par leur nom, comme Discord les affiche : `@Ava`, `@Modérateurs`, `#général`.

Quand tu enregistres, TTM transforme chaque nom en mention, donc la liste prévient et renvoie comme d'habitude. Quand tu rouvres le formulaire, les noms sont revenus.

La ligne sous le texte, dans le salon et dans l'Activity, renvoie ici pour ajouter une nouvelle personne : voir [Écrire une nouvelle personne](#writing-someone-new).

## Mentionner des personnes et des rôles

Le bouton **Tag** ajoute les mentions pour toi : voir [Tags](/docs/owners-and-tags/#tags). Dans le texte, écris `@` et le nom :

```
- Demander à @Ava de vérifier le règlement, puis prévenir @Modérateurs
```

Ces mentions sont les **tags** de la tâche : copie-les, déplace-les ou retire-les comme tu veux.

- **Une personne** se désigne par le nom que le serveur affiche : son pseudo sur le serveur, sinon son nom d'affichage, sinon son nom d'utilisateur. Les majuscules et les minuscules n'ont pas d'importance.
- **Par le nom, tu écris les personnes que la liste mentionne déjà.** Une nouvelle personne se met avec le bouton **Propriétaire** ou **Tag**, ou avec son code : voir [Écrire une nouvelle personne](#writing-someone-new).
- **Un rôle** s'écrit `@` et son nom : `@Modérateurs`. Tous les rôles du serveur fonctionnent, même un que la liste ne mentionne pas encore.
- **Deux personnes qui ont le même nom** s'affichent avec leur nom d'utilisateur entre parenthèses : `@Mario (mario.rossi)` et `@Mario (mario_b)`. Écris-les de la même façon. Un nom qui correspond à plus d'une personne ne peut pas être enregistré, et le message liste les formes à écrire.
- **Un nom que TTM ne connaît pas**, comme `@elonmusk`, reste du texte simple. À la place du propriétaire, c'est une erreur : voir [Propriétaires : la mention avec deux-points](#owners-the-mention-with-a-colon).

Le nom le plus long l'emporte : avec Mario et Mario Rossi sur le serveur, `@Mario Rossi` est Mario Rossi. Un nom ne compte que comme mot entier, donc `@Leonardo` n'est pas `@Leo` suivi de « nardo ».

Certains `@` ne sont jamais un nom :

- `@everyone` et `@here` ;
- un `@` seul ;
- une adresse e-mail, comme `ava@example.com` ;
- tout ce qui est dans un lien ou entre accents graves.

### Écrire une nouvelle personne

Les boutons **Propriétaire** et **Tag** choisissent dans le menu propre à Discord, donc ils atteignent n'importe qui sur le serveur sans aucun code.

Dans le texte, écris le code de la personne là où irait le nom : `<@`, son ID et `>`, comme `<@123456789012345678>`. Seul, c'est un tag ; suivi de deux-points, c'est le propriétaire. Deux façons de l'obtenir :

- dans n'importe quel chat Discord, tape `\@` et le début de son nom, choisis la personne dans le menu et envoie : le message affiche son code, prêt à copier ;
- avec le **Mode développeur** activé (Paramètres utilisateur → Avancé), fais un clic droit sur la personne → **Copier l'identifiant de l'utilisateur**, et écris l'ID entre `<@` et `>`.

Enregistre, et à la prochaine ouverture du formulaire la personne s'affiche par son nom.

### Écrire @ sans mention

Mets une barre oblique inverse devant un nom que TTM connaît : `\@Ava` reste le mot @Ava, et personne n'est mentionné. `\#général` fait la même chose pour un salon.

Tout autre `@mot` reste du texte de lui-même, sans barre oblique inverse. L'exception est le début d'une tâche, suivi de deux-points, où ce serait un propriétaire : écris `\@mot:`.

TTM garde ta barre oblique inverse. La liste affiche le mot sans elle, et le formulaire la réaffiche la fois suivante, pour que tu distingues le mot de la mention. TTM n'ajoute jamais de barre oblique inverse de lui-même.

## Propriétaires : la mention avec deux-points

Le bouton **Propriétaire** définit le propriétaire d'une tâche pour toi : voir [Propriétaire](/docs/owners-and-tags/#owner-a-person-a-role-or-several-people). Dans le texte, le propriétaire est une mention suivie de **deux-points**, au début de la tâche :

```
- @Ava: Publier les notes de version
```

- **Un rôle** fonctionne de la même façon : `@Modérateurs:`. Un code aussi : `<@123456789012345678>:`.
- **Sans les deux-points**, la même mention n'est qu'un tag, pas un propriétaire.
- **Le nom du propriétaire** va du `@` aux deux-points, donc `@Ava Rossi:` est une erreur même quand TTM connaît Ava.
- **Un nom que TTM ne connaît pas** est une erreur à la place du propriétaire. TTM n'enregistre rien, et le message dit de choisir le propriétaire avec le bouton **Propriétaire** ou d'écrire son code.
- **Pour commencer une tâche par `@mot:` en texte simple**, voir [Écrire @ sans mention](#writing--without-a-mention). Le formulaire Contenu n'a pas de propriétaire, donc là `@mot:` reste du texte simple.

## Lier des salons

Écris `#` et le nom du salon, comme la barre latérale l'affiche :

```
- Spécifications dans #design, déploiement depuis #versions
```

Tous les salons que tu peux mentionner fonctionnent : salons textuels, d'annonces, vocaux, Stage, forums et salons média, et fils actifs. Les catégories, non.

<div class="callout"><div class="callout-t">Un lien de salon fonctionne aussi</div>Fais un clic droit sur le salon dans la barre latérale → <strong>Copier le lien du salon</strong> et colle-le dans la tâche : TTM reconnaît le lien et <strong>le raccourcit en tag de salon</strong>, que le formulaire affiche ensuite sous la forme <code>#nom</code>. Les liens qui pointent vers un <em>message</em> précis sont laissés tels quels : ils restent des liens cliquables.</div>

## Ajouter un lien

Pour les liens vers tout ce qui est hors de Discord, utilise le Markdown standard :

```
[notre feuille de route](https://example.com/roadmap)
```

La liste affiche **[notre feuille de route](https://example.com/roadmap)** : un lien propre et cliquable au lieu d'une URL brute.

La cible n'est pas obligée d'être une page web. Les liens `mailto:`, `tel:` et `sms:` fonctionnent de la même façon, et ouvrent l'application du lecteur :

```
[le responsable de la version](mailto:release@example.com)
[le téléphone d'astreinte](tel:+12025550100)
```

Le premier transforme une tâche en un « écris à cette personne » en un clic. Le second compose directement le numéro depuis un téléphone.

Un lien peut aussi pointer vers **une autre liste** : fais un clic droit sur son message → **Copier le lien du message** et colle-le entre les crochets. Les liens de messages restent tels quels : seuls les liens simples de salon deviennent un tag `#salon`.

## Emoji des boutons

Une tâche peut afficher l'emoji d'un bouton de la liste, comme le font les leçons du [Tutoriel](/docs/getting-started/#2-create-your-first-list). Dans le texte, chacun de ces emoji s'affiche sous la forme d'un nom court :

| Nom | Dans le texte | Bouton |
| :--- | :---: | :--- |
| `:owner:` | <img class="inline-ic" src="/icons/owner_blue.png" alt="" /> | **Propriétaire** <img class="inline-ic" src="/icons/owner.png" alt="" /> |
| `:reminder:` | <img class="inline-ic" src="/icons/alert_blue.png" alt="" /> | **Rappel** <img class="inline-ic" src="/icons/alertW.png" alt="" /> |
| `:content:` | <img class="inline-ic" src="/icons/task_blue.png" alt="" /> | **Contenu** <img class="inline-ic" src="/icons/task.png" alt="" /> |
| `:more:` | <img class="inline-ic" src="/icons/other_blue.png" alt="" /> | **Autre** <img class="inline-ic" src="/icons/other.png" alt="" /> |
| `:activity:` | <img class="inline-ic" src="/icons/activity_blue.png" alt="" /> | **Activity** <img class="inline-ic" src="/icons/activity.png" alt="" /> |

Laisse un nom où il est et l'emoji reste. Écris-en un toi-même, en minuscules, et la liste affiche l'emoji du bouton : pratique quand une tâche dit sur quel bouton appuyer. Tout autre mot entre deux-points reste tel que tu l'as écrit.

## Les rappels dans le texte

Le bouton **Rappel** définit un rappel pour toi, et le vérifie au fur et à mesure : voir [Rappels](/docs/reminders/). Dans le texte, un rappel est une date suivie d'un triplet, avant le propriétaire :

```
- [] 2026-12-08 18:00 [2d3h,1h,3] @Ava: Publier les notes de version
```

**La date** s'écrit `YYYY-MM-DD HH:mm`, pareil dans toutes les langues, dans ton fuseau horaire : voir [/my timezone](/docs/my-timezone/). Change la date et enregistre : le rappel se déplace. Seule la date juste avant un triplet est un rappel : une date n'importe où ailleurs reste comme tu l'as écrite.

- **Une date dans un autre fuseau** porte le fuseau après l'heure : `2026-12-08 18:00 America/New_York`. Elle ne compte que pour cette date, et l'emporte sur tous les autres fuseaux : pratique pour garder une heure qu'on t'a donnée dans le sien.
- **Le fuseau** s'écrit par son nom, comme `Europe/Rome`, en majuscules ou en minuscules, ou en UTC ou GMT avec un décalage, comme `GMT-5:30`.
- **Les abréviations** comme CET ou EST ne sont pas acceptées, parce que la même abréviation désigne des fuseaux différents selon les pays. La ligne reçoit une flèche.
- **Quand le formulaire se rouvre**, la date est de retour dans ton fuseau, au même moment.
- **Une date avec des secondes** les affiche : `2026-12-08 18:00:30`.
- **À la fin de l'heure d'été**, les horloges passent deux fois par la même heure. Une date dans cette heure porte son décalage, comme `2026-10-25 02:30 +02:00`, pour distinguer les deux 02:30. Sans décalage, TTM prend la première des deux.
- **Au début de l'heure d'été**, les horloges sautent une heure. Une date dans cette heure n'existe pas, et la ligne reçoit une flèche.

**Le triplet** est `[distance,intervalle,répétitions]` :

- **La distance** crée un rappel sans date absolue : elle est comptée à partir du moment où tu enregistres la liste.
- **Les répétitions** sont les rappels après le premier, donc la ligne de la tâche en montre un de plus : `[2d3h,1h,3]` donne `↻1h ×4`. Le maximum qu'une offre autorise ici est 49, soit 50 rappels au total.
- **Un événement unique** utilise l'intervalle `0m` et `0` répétition : `[2d3h,0m,0]`.
- **La distance et l'intervalle** n'utilisent que `d`, `h` et `m`. Une valeur en mois, comme `[1M,0m,0]`, est refusée, et la ligne reçoit une flèche.

`1d` et `24h` ne sont pas la même chose lors d'un changement d'heure : `1d` garde la même heure de la journée, `24h` est exact et peut se décaler d'une heure. Voir [Les champs de la répétition](/docs/reminders/#the-repetition-fields).

Les règles sont celles du formulaire de rappel, y compris le nombre de rappels qui peuvent attendre en même temps : voir [Limites connues](/docs/known-limits/). Là où de nouveaux rappels récurrents ne peuvent pas être créés, un triplet avec des répétitions supérieures à `0` n'est accepté que pour un rappel que la liste avait déjà, dans les limites de [Rappels répétés](/docs/reminders/#repeating-reminders).

**Ces rappels ne peuvent pas être enregistrés**, et le message nomme la tâche à corriger :

- un rappel sur une tâche **sans propriétaire** : les rappels vont au propriétaire, voir [Propriétaires : la mention avec deux-points](#owners-the-mention-with-a-colon) ;
- un rappel **sans date** et avec une distance de zéro, comme `[0m,0m,0]` seul : sa seule alerte serait le moment où tu enregistres, déjà passé ;
- un rappel **illisible** : un nombre trop grand, comme `[1h,1d,99999999999]`.

**Un rappel mal écrit reçoit une flèche**, comme une ligne sans tiret. TTM ne devine pas lequel tu voulais dire :

- deux dates ou deux triplets sur une même ligne ;
- une date sans son triplet, ou un rappel sans texte de tâche ;
- une date qui n'existe pas, comme `2026-02-30 10:00` ;
- une date sous une autre forme, comme `30/11/2026 18:00`.

Ces vérifications ne portent que sur les lignes que tu changes. Réécrire toute la liste vérifie les lignes que tu ajoutes ou modifies, et le texte d'une seule tâche vérifie cette tâche. Une nouvelle liste, un clone et un import vérifient chaque ligne.

## Les webhooks dans le texte

Le bouton **Webhook** lie un webhook à une tâche pour toi : voir [Webhooks](/docs/webhooks/). Dans le texte, le lien est un jeton réservé placé devant le texte de la tâche :

```
- [] {{wb=deploy}} Publier les notes de version
```

Tu peux le déplacer, le copier sur une autre tâche ou le supprimer, comme une mention. Le jeton n'apparaît jamais dans la liste. Une tâche avec le jeton a aussi besoin d'un texte.

`wb` est la seule clé réservée. Toute autre `{{clé=valeur}}` dans le texte d'une tâche est une **variable libre**, que le webhook peut utiliser : voir [Jetons](/docs/config-webhook/#tokens).

## Les codes derrière les noms

Discord stocke des **ID**, pas des noms : de longs nombres qui ne changent jamais. Derrière chaque nom du texte, il y a un code, et la liste garde les codes, dans son message, ses notifications et le fichier de Télécharger.

| Dans le texte | Le code derrière |
| :--- | :--- |
| `@Ava` | `<@123456789012345678>` |
| `@Modérateurs` | `<@&987654321098765432>` |
| `#général` | `<#111222333444555666>` |
| `2026-12-08 18:00` en UTC, avant un triplet | `<t:1796752800>`, la date en secondes |

Tu peux toujours écrire ou coller les codes : TTM les enregistre tels quels. Un fichier de Télécharger, ou un texte écrit avant les noms, fonctionne tel quel.

Quand quelqu'un change de nom sur Discord, le formulaire affiche le nouveau. Rien de ce qui est enregistré ne casse, parce que la liste garde l'ID.

Un code reste dans le texte dans quelques cas :

- deux rôles qui ont le même nom, ou deux salons qui ont le même nom : les codes les distinguent ;
- une personne dont Discord n'a pas envoyé le nom à temps à l'ouverture du formulaire. Laisse le code tel quel : la mention reste.

## Tout assembler

Une seule tâche peut combiner tout cela :

```
- @Ava: Relire les notes de version dans #versions, prévenir @Modérateurs à la fin — questions à [le responsable de la version](mailto:release@example.com)
```

## Quand le texte ne peut pas être enregistré

Si TTM ne peut pas lire une ligne, il te renvoie ton texte avec une **flèche** sur chaque ligne fautive, d'une ligne sans tiret à un rappel mal écrit. Le message dit quoi écrire, et renvoie vers la partie de cette page qui l'explique.

Sinon, **un seul message liste tous les problèmes d'un coup**, un par paragraphe : une liste trop longue, un rappel au-dessus d'une limite ou sans propriétaire. Corrige-les tous et enregistre de nouveau.

Un rappel dont toutes les alertes sont passées n'empêche pas l'enregistrement : il reste sur sa tâche. Voir [Lire un rappel sur la tâche](/docs/reminders/#reading-a-reminder-on-the-task).

Deux autres cas n'enregistrent rien, et TTM te le dit :

- TTM ne peut pas joindre le serveur sur Discord quand tu enregistres : réessaie dans un instant ;
- un formulaire resté ouvert plus de six heures ne peut pas relire ses noms : rouvre-le depuis la liste.
