---
title: Prepara a tu hermandad para la noche de raid
seoTitle: "Bot de Discord para administrar hermandades y clanes: noches de raid y tareas"
name: Hermandades y clanes
description: "La semana de una hermandad en torno a la noche de raid: un recordatorio que se repite cada miércoles durante meses, las pruebas de los reclutas hechas una tras otra y una hoja de la plantilla que se llena sola con Make y Google Sheets."
highlights: "Un recordatorio recurrente en días, pruebas hechas una tras otra, un webhook hacia Make y Google Sheets, variables libres, Reabrir todo con una fecha nueva."
intro: |
  Ava dirige **Ember Vanguard**, una hermandad de raids de unos sesenta jugadores. Leo dirige los raids, cada miércoles a las 20:00. Los oficiales reclutan y cada recluta juega un raid de prueba antes de entrar. Los miembros juegan desde las dos orillas del Atlántico. Esta es la semana de la hermandad del lunes 7 al domingo 13 de diciembre de 2026.
order: 5
team:
  guild: Ember Vanguard
  zone: America/Chicago
  people:
    - { id: "11859044175621001", name: Ava, username: ava.ember, color: "#eb459e", about: "Líder de la hermandad. Escribe la lista." }
    - { id: "11859044175621002", name: Leo, username: leo.raids, color: "#3ba55c", about: "Líder de los raids y oficial." }
    - { id: "11859044175621003", name: Kai, username: kai.ember, color: "#1abc9c", about: "Oficial." }
  roles:
    - { id: "11859044175622001", name: Oficiales, about: "Ava, Leo, Kai y dos más." }
    - { id: "11859044175622002", name: Raiders, about: "El equipo de raids, unos treinta jugadores." }
  channels:
    - { id: "11859044175623001", name: raids, about: "Donde hablan los raiders. La lista vive aquí." }
    - { id: "11859044175623002", name: oficiales, about: "Privado para los oficiales." }
list:
  title: "Ember Vanguard: la semana"
  channel: "11859044175623001"
  at: 2026-12-10T22:00
  look: |
    El recordatorio del raid muestra `↻7d ×16`: cada miércoles hasta finales de marzo. Las tres pruebas llevan el nombre y la clase del recluta como variables libres; su webhook no se ve. «Reponer el banco de la hermandad» tiene un solo recordatorio, que se mueve cada semana.
  text: |
    - [] <t:1796866200> [0m,7d,15] <@&11859044175622002>: Noche de raid a las 20:00: en voz antes de las 19:45, con comida y pociones
    - [X] <t:1796857200> [0m,0m,0] <@&11859044175622001>: Reponer el banco de la hermandad antes del raid
    - [X] <@11859044175621002>: Publicar la formación del raid
    - [X] <@&11859044175622001>: Revisar las solicitudes de esta semana
    - [X] {{wb=Hoja de plantilla}} <@11859044175621002>: Raid de prueba: Mirel, {{class=healer}} {{recruit=Mirel}}
    - [X] {{wb=Hoja de plantilla}} <@11859044175621002>: Raid de prueba: Thorn, {{class=tank}} {{recruit=Thorn}}
    - [] {{wb=Hoja de plantilla}} <@11859044175621002>: Raid de prueba: Vesk, {{class=mago}} {{recruit=Vesk}}
    - [] <@&11859044175622001>: Responder a cada candidato, aceptado o no
    - [] <@11859044175621001>: Planificar el evento de las fiestas de la hermandad
webhooks:
  - name: Hoja de plantilla
    service: make
    trigger: both
    method: POST
    url: https://hook.us1.make.com/<id>
    headers: "Content-Type: application/json"
    body: |
      {"recruit": "{{recruit}}", "class": "{{class}}", "officer": "{{user}}", "state": "{{state}}", "when": "{{when}}", "list": "{{list}}"}
    setup: |
      En Make, Ava crea un escenario con dos módulos. El primero es *Webhooks → Custom webhook*: Make genera su URL (la de arriba) y ella la pega en `/config webhook`. El segundo es *Google Sheets → Add a row*, sobre la hoja de la plantilla de la hermandad.

      Make aprende la forma de los datos con una primera solicitud. Ava presiona **Run once** en el escenario, vincula el webhook a una tarea de prueba y la marca. Ahora los campos `recruit`, `class`, `officer`, `state` y `when` se pueden asociar a las columnas de la hoja. Make desactiva un webhook que pasa cinco días sin escenario, así que el escenario va primero.

      Sin un evento, el webhook se dispara en ambos sentidos. Una prueba marcada por error y reabierta agrega una segunda fila, con `reopened` en la columna del estado: la hoja conserva las dos.
settings:
  - setting: Mantener el estado tras la selección
    choice: Activado
    why: "Leo hace tres pruebas seguidas: **Propietario** sigue azul después de cada una."
  - setting: Modo de notificación
    choice: Eliminar todas las notificaciones excepto las dos últimas
    why: "#raids tiene mucha actividad. Las dos últimas notificaciones se quedan debajo de la lista y las más antiguas se van."
  - setting: Zona horaria
    choice: America/Chicago
    why: "El raid es a las 20:00, hora de Chicago. Discord muestra la hora en la zona de cada lector, así que un raider en Lisboa lee las 2:00."
  - setting: Recordatorios recurrentes
    choice: Recurrentes activados
    premium: true
    why: "Un recordatorio para cada raid hasta finales de marzo, en lugar de uno nuevo cada semana."
week:
  - at: 2026-12-07T20:00
    text: "Ava agrega tres pruebas con **Actualización en bloque** <img class=\"inline-ic\" src=\"/icons/edit.png\" alt=\"\" />, una tarea por recluta, con el nombre y la clase como variables libres: `{{recruit=…}}` y `{{class=…}}`. Luego vincula cada prueba a Hoja de plantilla con **Webhook**."
  - at: 2026-12-08T19:00
    text: "Leo **se queda con** las tres pruebas. Presiona **Propietario** hasta que se pone azul, luego elige la primera prueba, la segunda y la tercera, sin elegir a nadie. Con *Mantener el estado tras la selección*, **Propietario** sigue azul entre una y otra, y cada tarea pasa a ser suya."
    card: { kind: notice, type: claimed, by: "11859044175621002", task: "7" }
  - at: 2026-12-09T17:00
    text: "El recordatorio de los oficiales menciona a @Oficiales en #raids. Kai repone el banco de la hermandad y marca la tarea."
  - at: 2026-12-09T19:30
    text: "El recordatorio del raid menciona a @Raiders en #raids, como respuesta a la lista. Llegará cada miércoles a las 19:30 hasta finales de marzo."
    card: { kind: reminder, task: "1" }
  - at: 2026-12-09T22:40
    text: "La prueba de Mirel salió bien. Leo marca su tarea y el webhook envía a Make la fila para la hoja de la plantilla."
    card: { kind: webhook, webhook: Hoja de plantilla, task: "5", by: "11859044175621002" }
  - at: 2026-12-10T21:30
    text: "Thorn juega una segunda prueba el jueves, con un grupo más pequeño. Leo la marca: una fila más en la hoja."
fonte: 0d0a1a51d2e4
---

## La próxima vez

Cada lunes, Ava primero reemplaza las pruebas terminadas por los reclutas nuevos, con **Actualización en bloque**, que no dispara ningún webhook. Luego presiona **Reabrir todo** <img class="inline-ic" src="/icons/reopen.png" alt="" /> y elige **Nueva fecha**, con el miércoles siguiente a las 17:00: el recordatorio del banco se mueve ahí. **Reabrir todo** dispara los webhooks de las tareas que reabre: con las pruebas terminadas todavía ahí, la hoja tendría una fila «reopened» por cada una.

Nadie marca el raid: marcar una tarea detiene su recordatorio. El recordatorio del raid vuelve cada miércoles por sí solo. Consulta [Reabrir todo](/docs/list-actions/#reopen-all).

## Lo que TTM no hace aquí

TTM no lee el juego. No tiene inscripciones a los raids, asistencia, seguimiento del botín ni calendario con RSVP: eso lo hace un bot para planificar raids. TTM guarda el trabajo de la hermandad, avisa al equipo de raids a su hora y envía a la hoja lo que deciden los oficiales.

## Preguntas

### ¿Por qué días y no horas?

El 14 de marzo de 2027 los relojes de Chicago avanzan una hora. Ava eligió **Días** en el menú **Unidad**, así que el recordatorio se queda a las 19:30 después del cambio. Con **Horas**, llegaría a las 20:30, con el raid ya empezado. Consulta [Los campos de repetición](/docs/reminders/#the-repetition-fields).

### ¿Cómo envío a la hoja el propietario de la tarea?

`{{user}}` es quien marca la tarea, que aquí es Leo. Para enviar el propietario aunque marque otro oficial, escríbelo en la tarea como variable libre (`{{owner=Leo}}`) y usa `{{owner}}` en el body. `{{task}}` lleva el propietario solo como código de Discord, `<@id>`, que una hoja no sabe leer. Consulta [Personaliza los webhooks con variables libres](/docs/tips/#personalize-webhooks-with-free-variables).

### ¿Puede un raider marcar una prueba?

No: cada prueba pertenece a Leo. Un raider que lo intenta recibe un rechazo que solo ve él. Los oficiales que gestionan los mensajes del canal sí pueden, con *Gestionar mensajes*. Consulta [Quién puede marcar una tarea](/docs/core-concepts/#who-can-tick-a-task).
