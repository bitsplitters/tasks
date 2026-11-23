---
title: Organiza un torneo de la comunidad sin una hoja de cálculo
seoTitle: Bot de Discord para torneos y eventos de la comunidad
name: Torneos y eventos
description: "Una copa del sábado con ocho equipos: los árbitros como propietarios, un recordatorio que sigue llamando a los equipos que faltan, el aviso a los comentaristas antes del directo y el ganador anunciado por un webhook."
highlights: "Propietarios en un grupo, el rol TTM de los comentaristas, un recordatorio cada 15 minutos, marcas en directo en la Activity, el ganador en una variable libre, Clonar lista para la semana siguiente."
intro: |
  Mia organiza la **Saturday Cup #12** en su servidor de gaming: ocho equipos, cuatro árbitros, dos comentaristas en directo. Los equipos juegan desde varios países. El staff tiene una lista en #staff-torneo para la semana del lunes 7 al domingo 13 de diciembre de 2026, y el sábado la marcan en directo, todos juntos.
order: 3
team:
  guild: Fragline
  zone: Europe/London
  people:
    - { id: "11839044175621001", name: Mia, username: mia.fragline, color: "#f0b232", about: "Organizadora. Tiene Gestionar mensajes en el canal del staff." }
    - { id: "11839044175621002", name: Leo, username: leo.casts, color: "#3ba55c", about: "Comentarista." }
    - { id: "11839044175621003", name: Sam, username: sam.casts, color: "#5865f2", about: "Comentarista." }
    - { id: "11839044175621004", name: Noa, username: noa.ref, color: "#e74c3c", about: "Árbitra." }
    - { id: "11839044175621005", name: Kai, username: kai.ref, color: "#1abc9c", about: "Árbitro." }
    - { id: "11839044175621006", name: Zoe, username: zoe.ref, color: "#9b59b6", about: "Árbitra. Llega tarde el sábado." }
  roles:
    - { id: "11839044175622001", name: Árbitros, about: "Noa, Kai, Zoe y uno más." }
    - { id: "11839044175622002", name: TTM1, about: "Creado por TTM para el directo, con los dos comentaristas como propietarios.", members: ["11839044175621002", "11839044175621003"], ttm: true }
  channels:
    - { id: "11839044175623001", name: staff-torneo, about: "El canal del staff. La lista vive aquí." }
    - { id: "11839044175623002", name: anuncios, about: "Donde los jugadores leen los resultados." }
    - { id: "11839044175623003", name: Escenario principal, about: "El canal de voz del directo.", voice: true }
list:
  title: "Saturday Cup #12"
  channel: "11839044175623001"
  at: 2026-12-12T19:10
  look: |
    Sábado por la tarde, tras la final. «Ronda 1» no tiene propietario: cada partida pertenece a su árbitro, así que el grupo se marcó solo, con la última partida. «Llamar a los equipos que faltan» muestra `↻15m ×3`: tres avisos, con quince minutos entre uno y otro. La variable libre `{{winner=Team Nova}}` se queda en el texto, donde la leyó el webhook.
  text: |
    - [X] <@11839044175621001>: Abrir las inscripciones, con el [cuadro en Challonge](https://challonge.com/saturday_cup_12)
    - [X] <@&11839044175622001>: Comprobar las plantillas de los ocho equipos
    - [X] <t:1797080400> [0m,0m,0] <@&11839044175622001>: Abrir el check-in, de 13:00 a 14:00
    - [X] <t:1797082200> [0m,15m,2] <@&11839044175622001>: Llamar a los equipos que faltan
    - [X] <t:1797085800> [0m,0m,0] <@&11839044175622002>: Salir en directo en la llamada Escenario principal a las 15:00
    - [X] Ronda 1, al mejor de tres
     - [X] <@11839044175621004>: Partida A: Team Nova contra Pixel Pirates
     - [X] <@11839044175621005>: Partida B: Iron Owls contra Blue Shift
     - [X] <@11839044175621006>: Partida C: Night Foxes contra Glitch Gang
     - [X] <@11839044175621005>: Partida D: Red Comets contra Lumen Five
    - [X] <@&11839044175622001>: Arbitrar las semifinales y la final
    - [X] {{wb=Resultados}} <@11839044175621001>: Publicar los resultados {{winner=Team Nova}}
    - [] <@&11839044175622002>: Subir la repetición de la final
    - [] <@11839044175621001>: Dar las gracias a los equipos y enviar el formulario de opinión
    - [] <@11839044175621001>: Abrir las inscripciones para la Saturday Cup #13
webhooks:
  - name: Resultados
    service: discord
    trigger: completion
    method: POST
    url: https://discord.com/api/webhooks/<id>/<token>
    headers: "Content-Type: application/json"
    body: |
      {"content": "🏆 ¡**{{winner}}** ha ganado {{list}}! GG a los ocho equipos. El cuadro se queda en Challonge.", "allowed_mentions": {"parse": []}}
    postsAs: { name: Fragline Cups, channel: "11839044175623002", color: "#e67e22" }
    setup: |
      Abre los ajustes de #anuncios, luego *Integraciones → Webhooks → Nuevo webhook*. Ponle el nombre «Fragline Cups» y pulsa **Copiar URL del webhook**: esa es la URL de arriba. Mantenla en secreto, como una contraseña.

      Dos tokens escriben el mensaje. `{{winner}}` viene de la variable libre de la tarea, `{{winner=…}}`, que Mia escribe cuando termina la final. `{{list}}` es el título de la lista: la lista de la semana que viene se llama Saturday Cup #13 y el mismo webhook nombra la copa nueva.
settings:
  - setting: Zona horaria
    choice: Europe/London
    why: "La copa se juega a la hora de Londres. Discord muestra cada fecha de la lista en la zona del lector, así que un árbitro en Toronto lee sus propias horas. Cuando un árbitro guarda un recordatorio, TTM le propone la zona del idioma de su Discord hasta que elija una."
  - setting: Notificaciones push legibles
    choice: Activado
    why: "Los árbitros leen los recordatorios en el móvil. La push muestra la tarea, no una tarjeta vacía."
  - setting: Mencionar a los propietarios en listas nuevas
    choice: Activado
    why: "La lista de la semana que viene menciona a @Árbitros y a los comentaristas en cuanto se publica: saben que la copa sigue en marcha."
  - setting: Recordatorios recurrentes
    choice: Recurrentes activados
    premium: true
    why: "«Llamar a los equipos que faltan» avisa cada 15 minutos, hasta tres veces."
week:
  - at: 2026-12-07T19:00
    text: "Mia ejecuta `/crear-lista` en #staff-torneo y escribe las tareas del sábado, con @Árbitros como propietario de los trabajos que puede hacer cualquier árbitro, escrito como `@Árbitros:` ([Editar una lista a mano](/docs/writing-a-list/#owners-the-mention-with-a-colon) explica cómo). Pega el enlace del cuadro de Challonge. La primera notificación menciona a @Árbitros, así que se avisa a todos los árbitros."
  - at: 2026-12-08T20:30
    text: "Mia da «Salir en directo» a Leo y Sam juntos: elige a los dos en el menú bajo **Propietario**. TTM crea el rol **TTM1** para los dos y lo convierte en propietario. Un propietario de varias personas es una función [Premium](/premium/), desbloqueada para todos los servidores durante la beta."
  - at: 2026-12-09T21:00
    text: "Mia añade los recordatorios con **Recordatorio**: el check-in a las 13:00 para @Árbitros, «Llamar a los equipos que faltan» a las 13:30 cada 15 minutos (3 veces en total) y el directo a las 14:30 para TTM1."
  - at: 2026-12-12T13:00
    text: "El recordatorio del check-in menciona a @Árbitros en #staff-torneo. Kai abre el check-in y marca la tarea."
  - at: 2026-12-12T13:30
    text: "«Llamar a los equipos que faltan» avisa a @Árbitros. Faltan dos equipos: Noa escribe a sus capitanes. A las 13:45 vuelve el aviso."
  - at: 2026-12-12T13:52
    text: "El último equipo hace el check-in y Noa marca «Llamar a los equipos que faltan». Marcar una tarea detiene su recordatorio: el aviso de las 14:00 no llega nunca."
  - at: 2026-12-12T14:30
    text: "El recordatorio del directo menciona a TTM1, así que Leo y Sam lo reciben los dos."
    card: { kind: reminder, task: "5" }
  - at: 2026-12-12T14:40
    text: "Mia abre la lista con **Activity** <img class=\"inline-ic\" src=\"/icons/activity.png\" alt=\"\" />, el primer botón bajo ella. Los árbitros entran con **Entrar en la Activity** y cada uno marca su partida cuando termina. Zoe llega tarde: desde el panel de «Partida C», Mia le da la partida."
  - at: 2026-12-12T15:35
    text: "Noa termina la Partida A y toca la casilla de toda la «Ronda 1». Un globo dice que no: marcar el grupo marcaría también las partidas de Kai y Zoe. Mia podría, con *Gestionar mensajes* en el canal. Espera en cambio: cuando Kai marca la Partida D, la última, el grupo se marca solo."
  - at: 2026-12-12T18:45
    text: "Team Nova gana la final. Mia escribe `{{winner=Team Nova}}` en «Publicar los resultados» con **Contenido**, y luego marca la tarea. El webhook publica al ganador en #anuncios."
    card: { kind: webhook, webhook: Resultados, task: "8", by: "11839044175621001" }
  - at: 2026-12-12T19:05
    text: "El último árbitro sale de la Activity. La lista vuelve a #staff-torneo con un resumen, una línea por cada cambio con quién lo hizo. El resumen menciona a Zoe, que recibió la Partida C dentro de la Activity: las menciones de una sesión llegan con ella."
fonte: b260b9b17faa
---

## La próxima vez

El domingo, Mia abre **Más** <img class="inline-ic" src="/icons/other.png" alt="" /> y pulsa **Clonar lista**: el mismo canal, sin las marcas y sin los recordatorios. Con **Actualización en bloque** cambia el título a Saturday Cup #13, el enlace del cuadro y las partidas, y luego quita `{{winner=Team Nova}}`. Después da las fechas del próximo sábado con **Recordatorio**. El clon menciona a @Árbitros y a TTM1 en su primera notificación. Consulta [Clonar](/docs/list-actions/#clone).

La copa de la semana pasada se queda como registro. Para liberar su plaza, Mia puede **Sellar lista**, también en **Más**: el mensaje se queda, sin botones.

## Lo que TTM no hace aquí

TTM no gestiona cuadros, no lleva las puntuaciones ni hace el check-in de los equipos: eso lo hacen Challonge y start.gg. Tampoco hace el directo. TTM guarda el trabajo del staff en un solo sitio, avisa a las personas adecuadas en el minuto justo y anuncia el resultado que escribes.

## Preguntas

### ¿Por qué Noa no pudo marcar la Ronda 1?

Un grupo arrastra a sus subtareas. Marcarlo habría marcado las partidas de Kai y Zoe: solo pueden hacerlo sus propietarios, o quien tenga *Gestionar mensajes* en el canal. Consulta [Quién puede marcar una tarea](/docs/core-concepts/#who-can-tick-a-task).

### ¿Y si nadie marca «Llamar a los equipos que faltan»?

Avisa tres veces en total, a las 13:30, a las 13:45 y a las 14:00, y luego se detiene. Lo dice la insignia `↻15m ×3`. Consulta [Recordatorios repetidos](/docs/reminders/#repeating-reminders).

### ¿Reciben los comentaristas el recordatorio del directo por mensaje directo?

No. TTM1 es un rol, y un recordatorio para un rol es un mensaje en el canal de la lista que lo menciona, así que Discord avisa a todos los del rol. Da la tarea a un solo comentarista para enviarla por mensaje directo. Consulta [Cómo llega el recordatorio](/docs/reminders/#how-the-reminder-arrives).
