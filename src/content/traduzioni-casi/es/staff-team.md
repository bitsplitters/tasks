---
title: Mantén a tu equipo de moderadores en sintonía
seoTitle: "Bot de Discord para gestionar el staff: tareas para tu equipo de moderadores"
name: Staff y moderadores
description: "La semana de un equipo de moderación en una sola lista: tareas con un rol como propietario, un recordatorio de reunión que se repite, dos helpers nuevos que comparten una tarea y un anuncio cuando cambian las normas."
highlights: "Un rol como propietario, el rechazo para quien no lo es, un rol que TTM crea para dos personas, un recordatorio recurrente, un webhook con una variable libre, el hilo del historial."
intro: |
  Ava dirige a los moderadores de **Lumen Lounge**, un servidor de unos 4000 miembros. Los trabajos del staff se repiten cada semana y dos helpers nuevos, Kai y Zoe, empiezan el lunes. Esta es la primera semana del equipo con TTM, del lunes 7 al domingo 13 de diciembre de 2026.
order: 2
team:
  guild: Lumen Lounge
  zone: America/New_York
  people:
    - { id: "11829044175621001", name: Ava, username: ava.lumen, color: "#eb459e", about: "Responsable de los moderadores y moderadora ella misma." }
    - { id: "11829044175621002", name: Leo, username: leo.lumen, color: "#3ba55c", about: "Moderador." }
    - { id: "11829044175621003", name: Noa, username: noa.lumen, color: "#e67e22", about: "Helper." }
    - { id: "11829044175621004", name: Kai, username: kai.lumen, color: "#1abc9c", about: "Helper nuevo, desde el lunes." }
    - { id: "11829044175621005", name: Zoe, username: zoe.lumen, color: "#9b59b6", about: "Helper nueva, desde el lunes." }
  roles:
    - { id: "11829044175622001", name: Moderadores, about: "Ava, Leo y tres más." }
    - { id: "11829044175622002", name: Helpers, about: "Noa y, desde el lunes, Kai y Zoe." }
    - { id: "11829044175622003", name: Admins, about: "Los propietarios del servidor." }
    - { id: "11829044175622004", name: TTM1, about: "Creado por TTM para una tarea con dos personas como propietarias.", members: ["11829044175621004", "11829044175621005"], ttm: true }
  channels:
    - { id: "11829044175623001", name: staff, about: "Privado para el staff. La lista vive aquí." }
    - { id: "11829044175623002", name: normas, about: "Las normas del servidor." }
    - { id: "11829044175623003", name: anuncios, about: "Donde cada miembro lee las novedades." }
list:
  title: "Equipo de moderadores: semana 50"
  channel: "11829044175623001"
  at: 2026-12-09T21:00
  look: |
    Casi todas las tareas pertenecen a @Moderadores: cualquier moderador puede marcarlas. «Acompañar a un moderador durante un día» pertenece a @TTM1, el rol que TTM creó para Kai y Zoe. El recordatorio de la reunión muestra `↻7d ×4`: cada 7 días, 4 veces en total.
  text: |
    - [X] <@&11829044175622001>: Revisar los reportes abiertos
    - [] <@&11829044175622001>: Vaciar la cola de moderación
    - [X] <@&11829044175622001>: Comprobar el registro de AutoMod
    - [] <t:1796688000> [0m,7d,3] <@&11829044175622001>: Reunión del staff, el lunes a las 19:00 en el canal de voz Staff
    - [X] {{wb=Normas cambiadas}} <@&11829044175622001>: Actualizar las normas en <#11829044175623002> {{change=Los spoilers se quedan en los canales de spoilers durante dos semanas tras un lanzamiento}} <@&11829044175622003>
    - [X] <@&11829044175622004>: Acompañar a un moderador durante un día
    - [] <@11829044175621001>: Dar la bienvenida a los helpers nuevos
     - [X] Dar a Kai y Zoe el rol Helper
     - [] Explicarles las herramientas de moderación
    - [] <@&11829044175622001>: Publicar las notas de la reunión para quien no pudo asistir
    - [] <@&11829044175622001>: Planificar el evento de la comunidad de la semana que viene
    - [] <@&11829044175622001>: Dar las gracias a los miembros que han ayudado esta semana
webhooks:
  - name: Normas cambiadas
    service: discord
    trigger: completion
    method: POST
    url: https://discord.com/api/webhooks/<id>/<token>
    headers: "Content-Type: application/json"
    body: |
      {"content": "**Las normas han cambiado.** {{change}}.\nLee la versión nueva en <#11829044175623002>.", "allowed_mentions": {"parse": []}}
    postsAs: { name: Lumen Staff, channel: "11829044175623003", color: "#5865f2" }
    setup: |
      Abre los ajustes de #anuncios, luego *Integraciones → Webhooks → Nuevo webhook*. Ponle el nombre «Lumen Staff» y pulsa **Copiar URL del webhook**: esa es la URL de arriba. Mantenla en secreto, como una contraseña.

      El body no dice qué ha cambiado: lo dice `{{change}}`, a partir de la variable libre escrita en la tarea, `{{change=…}}`. La próxima vez que cambien las normas, el moderador escribe el cambio nuevo en la tarea con **Contenido** y el mismo webhook lo comunica. `allowed_mentions` con un `parse` vacío impide que el mensaje avise a nadie.
settings:
  - setting: Modo de notificación
    choice: Eliminar todas las notificaciones excepto la última
    why: "#staff es donde habla el equipo. Bajo la lista solo se queda la última notificación, así la conversación sigue siendo legible."
  - setting: Seguimiento del historial
    choice: Activado
    why: "El hilo de la lista guarda una línea por acción, con quién la hizo: Ava lee la semana ahí, no en el canal."
  - setting: Mantener el estado tras la selección
    choice: Activado
    why: "Ava elige @Moderadores una vez y se lo asigna a varias tareas seguidas: **Propietario** sigue azul tras cada una."
  - setting: Recordatorios recurrentes
    choice: Recurrentes activados
    premium: true
    why: "La reunión del staff es cada lunes: un recordatorio que se repite, en lugar de uno nuevo cada semana."
  - setting: Sincronizar permisos
    choice: Cargados
    why: "En *Ajustes del servidor → Integraciones*, solo los roles del staff pueden usar TTM. Un miembro que acaba en #staff por error ve la lista en solo lectura."
week:
  - at: 2026-12-07T09:00
    text: "Ava escribe la lista de la semana en #staff con `/crear-lista`, sin propietarios."
  - at: 2026-12-07T09:10
    text: "Ava elige @Moderadores en el menú bajo **Propietario**, y luego las tareas una tras otra. Con *Mantener el estado tras la selección*, **Propietario** sigue azul entre una y otra, así que cada tarea toma el rol con un clic. Cada notificación menciona a @Moderadores; con *Eliminar todas las notificaciones excepto la última*, solo se queda la última."
  - at: 2026-12-07T10:30
    text: "Ava da «Acompañar a un moderador durante un día» a Kai y Zoe juntos: elige a los dos en el menú. TTM crea el rol **TTM1**, se lo da a los dos y lo convierte en propietario. La notificación menciona al rol, así que se avisa a ambos. Un propietario de varias personas es una función [Premium](/premium/), desbloqueada para todos los servidores durante la beta."
    card: { kind: notice, type: assigned, by: "11829044175621001", task: "6" }
  - at: 2026-12-07T19:00
    text: "Llega el recordatorio de la reunión. El propietario es un rol, así que el recordatorio es un mensaje en #staff que menciona a @Moderadores, como respuesta a la lista."
    card: { kind: reminder, task: "4" }
  - at: 2026-12-08T11:00
    text: "Leo actualiza las normas y marca la tarea. El webhook publica el cambio en #anuncios, con el texto de la variable libre."
    card: { kind: webhook, webhook: Normas cambiadas, task: "5", by: "11829044175621002" }
  - at: 2026-12-08T15:20
    text: "Noa, una helper, intenta marcar «Revisar los reportes abiertos». La tarea pertenece a @Moderadores, así que recibe un rechazo que solo ve ella: *Solo @Moderadores puede marcar o desmarcar esta tarea, o quien gestione los mensajes de este canal.* La lista no cambia."
  - at: 2026-12-08T15:30
    text: "Leo revisa los reportes y marca la tarea: puede hacerlo cualquier miembro del rol."
  - at: 2026-12-09T18:00
    text: "Kai y Zoe pasan el día con Leo. Por la tarde Kai marca su tarea: puede hacerlo cualquiera de los dos, porque ambos tienen TTM1."
  - at: 2026-12-11T17:00
    text: "Ava abre el hilo de la lista. Tiene una línea por cada propietario, marca y cambio de la semana, con quién lo hizo."
  - at: 2026-12-11T17:15
    text: "Ava quiere conservar TTM1 para las próximas pruebas. En *Ajustes del servidor → Roles* lo renombra «Helpers en prueba»: a partir de ese momento es uno de los roles del servidor y TTM nunca lo elimina. Sin el nombre nuevo, TTM eliminaría el rol cuando ninguna lista lo usara ya."
fonte: 00ff5b6fd601
---

## La próxima vez

Cada lunes, Ava pulsa **Reabrir todo** <img class="inline-ic" src="/icons/reopen.png" alt="" /> y elige **Reabrir**: las tareas empiezan de nuevo con sus propietarios. Nadie marca la reunión del staff, porque marcar una tarea detiene su recordatorio: se queda en la lista todo el mes y su recordatorio vuelve cada lunes por sí solo. Una lista con recordatorios únicos usaría en cambio **Nueva fecha**, que los mueve de inmediato a la semana nueva. Consulta [Reabrir todo](/docs/list-actions/#reopen-all).

## Lo que TTM no hace aquí

TTM no modera. No tiene baneos, avisos, registros de casos ni tickets: eso lo hacen un bot de moderación y un bot de tickets. TTM guarda el trabajo que rodea a todo eso, las tareas que tu equipo repite cada semana. No sigue los turnos ni mide lo activo que es cada moderador.

## Preguntas

### ¿Quién puede marcar una tarea cuyo propietario es un rol?

Cualquier miembro del rol y quien tenga *Gestionar mensajes* en el canal. Todos los demás reciben un rechazo que solo ven ellos: consulta [Quién puede marcar una tarea](/docs/core-concepts/#who-can-tick-a-task).

### ¿Puede un moderador recibir el recordatorio por mensaje directo?

Sí: haz propietario a ese moderador en lugar del rol. Un recordatorio llega a una persona por mensaje directo, y a un rol con una mención en el canal. Consulta [Cómo llega el recordatorio](/docs/reminders/#how-the-reminder-arrives).

### ¿Qué pasa con TTM1 si nadie lo renombra?

TTM elimina un rol que ha creado cuando ninguna lista lo usa ya, y lo comprueba cada diez minutos. Renombrarlo, darle un permiso o cambiar sus miembros lo convierte en uno de los roles de tu servidor, y TTM no lo toca. Consulta [Los roles que crea TTM](/docs/owners-and-tags/#the-roles-ttm-creates).
