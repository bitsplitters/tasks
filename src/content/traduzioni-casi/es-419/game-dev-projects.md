---
title: Lleva tu juego a buen puerto con el equipo con el que ya hablas
seoTitle: Bot de Discord para administrar proyectos de desarrollo de videojuegos
name: Proyectos de desarrollo de videojuegos
description: "Tres desarrolladores y sus testers, un hito a la vez: un relevo cuando alguien se enferma, la build de playtest lanzada en GitHub Actions con una marca y el aviso a los testers el día del playtest."
highlights: "Un hito por grupo, una tarea quitada a otra persona, un recordatorio que sigue a su nuevo propietario, un webhook que lanza una build en GitHub Actions, la reunión semanal en la Activity."
intro: |
  Ava, Leo y Sam hacen **Lantern Keep**, un pequeño roguelike, en sus tardes libres. Ava escribe el código, Leo dibuja, Sam hace la música. Cinco jugadores de su comunidad prueban cada build. La lista vive en #dev desde que empezó el proyecto; esta es la semana del lunes 7 al domingo 13 de diciembre de 2026, con un playtest el viernes.
order: 4
team:
  guild: Lantern Keep
  zone: Europe/Stockholm
  people:
    - { id: "11849044175621001", name: Ava, username: ava.codes, color: "#eb459e", about: "Código. Dirige el proyecto." }
    - { id: "11849044175621002", name: Leo, username: leo.draws, color: "#3ba55c", about: "Arte." }
    - { id: "11849044175621003", name: Sam, username: sam.sound, color: "#5865f2", about: "Música y sonido. Enfermo esta semana." }
  roles:
    - { id: "11849044175622001", name: Testers, about: "Cinco jugadores de la comunidad." }
  channels:
    - { id: "11849044175623001", name: dev, about: "El canal del equipo; los testers pueden leerlo. La lista vive aquí." }
    - { id: "11849044175623002", name: devlog, about: "Donde los jugadores leen las novedades del juego." }
    - { id: "11849044175623003", name: playtest, about: "Donde los testers reportan bugs." }
list:
  title: "Lantern Keep: 0.4 y 0.5"
  channel: "11849044175623001"
  at: 2026-12-10T19:00
  spaced: true
  look: |
    Cada hito es un grupo, con una línea en blanco alrededor. Lo que está hecho se desvanece, así que destaca lo que queda de la 0.4: el playtest. «Mezclar la música del tráiler» ahora es de Ava, con su recordatorio. El webhook de «Crear la build de playtest» no se ve; `{{version=0.4.0}}` sí: la build lo leyó.
  text: |
    - [] Hito 0.4: el playtest
     - [X] <@11849044175621001>: Pesca: lanzar, esperar, recoger
     - [X] <@11849044175621002>: Sprites para los seis peces
     - [X] <@11849044175621001>: Corregir los bugs del último playtest, en [el reporte de los testers](https://discord.com/channels/1184904417562000000/11849044175623003/1184904417562399001)
     - [X] {{wb=Build de playtest}} <@11849044175621001>: Crear la build de playtest {{version=0.4.0}}
     - [] <t:1797008400> [0m,0m,0] <@&11849044175622001>: Playtest a las 18:00, luego reportar en <#11849044175623003>
    - [] Hito 0.5: el tráiler
     - [] <t:1797073200> [0m,0m,0] <@11849044175621001>: Mezclar la música del tráiler
     - [] <@11849044175621002>: Capturar los clips de juego
     - [] <@11849044175621003>: Efectos de sonido para la pesca
     - [] <@11849044175621002>: Montar el tráiler, 45 segundos
    - [] <@11849044175621001>: Planificar el hito 0.6 en el [documento de diseño](https://docs.google.com/document/d/1lantern-keep-design/edit)
    - [] <@11849044175621001>: Publicar el devlog en <#11849044175623002>
webhooks:
  - name: Build de playtest
    service: github
    trigger: completion
    method: POST
    url: https://api.github.com/repos/lantern-keep/game/actions/workflows/playtest.yml/dispatches
    headers: |
      Accept: application/vnd.github+json
      Authorization: Bearer <your token>
      X-GitHub-Api-Version: 2026-03-10
      Content-Type: application/json
    body: |
      {"ref": "main", "inputs": {"version": "{{version}}", "requested_by": "{{user}}"}}
    setup: |
      El workflow que compila el juego empieza con `workflow_dispatch` y declara los dos inputs que envía el body. Debe estar en la rama predeterminada del repositorio:

      ```yaml
      on:
        workflow_dispatch:
          inputs:
            version:
              required: true
            requested_by:
              required: false
      ```

      Los pasos siguientes leen `${{ inputs.version }}`. El token va en el header `Authorization`. Ava crea un personal access token *fine-grained* en *GitHub → Settings → Developer settings*, limitado a este único repositorio, con solo el permiso *Actions*, de lectura y escritura. Un token filtrado puede lanzar una build y nada más.

      El evento es solo la finalización: reabrir la tarea por error no lanza una segunda build.
settings:
  - setting: Tareas completadas atenuadas
    choice: Activado
    why: "Las partes ya hechas de un hito se desvanecen y destaca lo que queda."
  - setting: Espacio entre grupos
    choice: Activado
    why: "Cada hito es un grupo: una línea en blanco muestra dónde termina uno y empieza el siguiente."
week:
  - at: 2026-12-07T20:00
    text: "Ava agrega el hito 0.5 con **Actualización en bloque** <img class=\"inline-ic\" src=\"/icons/edit.png\" alt=\"\" />: el tráiler, en cuatro tareas. Luego da a cada una su propietario con **Propietario**, y a la música su fecha límite con **Recordatorio**."
  - at: 2026-12-08T09:15
    text: "Sam está enfermo toda la semana y la música del tráiler vence el sábado. Ava le **quita** «Mezclar la música del tráiler»: presiona **Propietario**, se elige a sí misma en el menú, confirma y luego elige la tarea. Elegir solo la tarea no bastaría: reemplazar a un propietario requiere una elección explícita. La notificación nombra a Sam y no menciona a nadie, porque Ava lo sabe. El recordatorio de la tarea ahora le llega a ella."
    card: { kind: notice, type: updated, by: "11849044175621001", from: "11849044175621003", task: "2.1" }
  - at: 2026-12-09T20:00
    text: "La reunión semanal, en una llamada de voz. Ava abre la lista con **Activity** <img class=\"inline-ic\" src=\"/icons/activity.png\" alt=\"\" />, y Leo entra con **Entrar a la Activity**. Con **Editar la lista** mueven las correcciones de bugs antes de la build y agregan el enlace al reporte de los testers. Mientras ella edita, toda la lista está bloqueada para Leo: las casillas vuelven cuando ella guarda."
  - at: 2026-12-10T18:30
    text: "Los bugs están corregidos. Ava marca «Crear la build de playtest» y el webhook lanza la build en GitHub Actions, con la versión escrita en la tarea."
    card: { kind: webhook, webhook: Build de playtest, task: "1.4", by: "11849044175621001" }
  - at: 2026-12-11T18:00
    text: "El recordatorio de los testers llega a #dev, como respuesta a la lista, y menciona a @Testers. Cualquiera de ellos puede marcar el playtest después de jugar y reportar."
    card: { kind: reminder, task: "1.5" }
  - at: 2026-12-12T12:00
    text: "El recordatorio de la música del tráiler llega a Ava por mensaje directo, no a Sam: un recordatorio sigue al propietario de su tarea."
    card: { kind: reminder, task: "2.1" }
fonte: e78bad9b590a
---

## La próxima vez

Cuando la 0.4 está hecha, Ava presiona **Limpiar lista**: el hito terminado se va con sus subtareas y la 0.5 sube. Con **Actualización en bloque** escribe debajo la 0.6, a partir del documento de diseño. El webhook se queda en el servidor: lo vincula a la siguiente tarea de build con **Webhook** <img class="inline-ic" src="/icons/api.png" alt="" />, y escribe `{{version=0.5.0}}` en su texto con **Contenido**. Consulta [Limpiar](/docs/list-actions/#clean).

## Lo que TTM no hace aquí

TTM no es un issue tracker. No lee tu repositorio, no cierra issues ni muestra un burndown: eso lo hacen GitHub, GitLab y Jira. Lanza la build y no espera su resultado. Si el equipo quiere el resultado en Discord, el workflow puede publicarlo en un canal con un webhook de Discord propio.

## Preguntas

### ¿Por qué Ava no eligió simplemente la tarea para quedársela?

Elegir una tarea sin haber elegido a nadie la toma solo si está libre. Una tarea cuyo propietario es otra persona se queda suya, y TTM dice por qué. Para reemplazar a un propietario, primero eliges al nuevo en el menú. Consulta [Propietario](/docs/channel-tasks/#owner).

### ¿Reabrir la tarea lanza otra build?

No. El webhook se creó con `evento:finalización`, así que solo lo dispara la finalización. Sin un evento, se dispararía en ambos casos. Consulta [Cuándo se dispara un webhook](/docs/webhooks/#when-a-webhook-fires).

### ¿Puede un tester marcar el playtest?

Sí: la tarea pertenece a @Testers, así que puede marcarla cualquier miembro del rol. Ava también puede, con *Gestionar mensajes* en el canal. Consulta [Quién puede marcar una tarea](/docs/core-concepts/#who-can-tick-a-task).
