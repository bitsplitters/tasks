---
title: Planifica tus vídeos con quienes los hacen
seoTitle: "Bot de Discord para creadores de contenido: el flujo de tus vídeos"
name: Creadores de contenido
description: "Un vídeo a la semana con un editor y un artista de miniaturas: un recordatorio de la fecha límite que sigue al trabajo cuando alguien está ausente, el aviso a los moderadores antes del estreno y el vídeo nuevo anunciado por un webhook."
highlights: "Tareas dadas a otra persona, un recordatorio que sigue a su nuevo propietario, una revisión de dos personas, un enlace mailto, un webhook que anuncia el vídeo, Clonar lista para el próximo vídeo."
intro: |
  Mia hace un vídeo a la semana para su canal. Leo edita, Sam dibuja las miniaturas y los moderadores del servidor llevan el chat durante el estreno. El vídeo de esta semana trata de un escritorio diminuto que construyó en un fin de semana. La lista vive en #producción, del lunes 7 al domingo 13 de diciembre de 2026, con el estreno el sábado a las 18:00.
order: 6
team:
  guild: Mia Makes
  zone: America/Toronto
  people:
    - { id: "11869044175621001", name: Mia, username: mia.makes, color: "#f0b232", about: "Creadora. Escribe la lista." }
    - { id: "11869044175621002", name: Leo, username: leo.edits, color: "#3ba55c", about: "Editor. Ausente de martes a jueves." }
    - { id: "11869044175621003", name: Sam, username: sam.thumbs, color: "#5865f2", about: "Miniaturas. También edita." }
  roles:
    - { id: "11869044175622001", name: Moderadores, about: "Cuatro moderadores del servidor." }
    - { id: "11869044175622002", name: TTM1, about: "Creado por TTM para la revisión final, propiedad de Leo y Sam.", members: ["11869044175621002", "11869044175621003"], ttm: true }
  channels:
    - { id: "11869044175623001", name: producción, about: "El equipo y los moderadores. La lista vive aquí." }
    - { id: "11869044175623002", name: anuncios, about: "Donde los miembros se enteran de los vídeos nuevos." }
list:
  title: "Episodio 42: el escritorio diminuto"
  channel: "11869044175623001"
  at: 2026-12-11T20:00
  look: |
    Viernes por la tarde: el vídeo está listo. El primer montaje y el pase de color ahora son de Sam, con el recordatorio del montaje. «Revisión final» es de TTM1, el rol que TTM creó para Leo y Sam. El enlace del vídeo espera en `{{video=…}}`, para que el webhook lo lea el sábado.
  text: |
    - [X] <@11869044175621001>: Escribir el [guion](https://docs.google.com/document/d/1tiny-desk-script/edit)
    - [X] <@11869044175621001>: Grabar la construcción, con las dos cámaras
    - [X] <@11869044175621001>: [Pedir al patrocinador que apruebe la lectura del anuncio](mailto:partners@example.com?subject=Episode%2042%20ad%20read)
    - [X] <t:1796922000> [0m,0m,0] <@11869044175621003>: Primer montaje, unos 12 minutos
    - [X] <@11869044175621003>: Pase de color y sonido
    - [X] <@11869044175621003>: Miniatura, tres opciones para elegir
    - [X] <@&11869044175622002>: Revisión final
    - [] <t:1797112800> [0m,0m,0] <@&11869044175622001>: Estreno a las 18:00: fijar el enlace y vigilar el chat
    - [] {{wb=Vídeo nuevo}} <@11869044175621001>: Publicar el vídeo {{video=https://youtu.be/tinydesk42}}
    - [] <@11869044175621001>: Responder a los primeros comentarios
webhooks:
  - name: Vídeo nuevo
    service: discord
    trigger: completion
    method: POST
    url: https://discord.com/api/webhooks/<id>/<token>
    headers: "Content-Type: application/json"
    body: |
      {"content": "Vídeo nuevo: **Construí un escritorio diminuto en un fin de semana**\n{{video}}", "allowed_mentions": {"parse": []}}
    postsAs: { name: Mia Makes, channel: "11869044175623002", color: "#f0b232" }
    setup: |
      Abre los ajustes de #anuncios, luego *Integraciones → Webhooks → Nuevo webhook*. Ponle el nombre «Mia Makes», dale la imagen del canal y pulsa **Copiar URL del webhook**: esa es la URL de arriba. Mantenla en secreto, como una contraseña.

      El enlace viene de la tarea: `{{video}}` lee la variable libre `{{video=…}}`. Mia escribe el enlace con **Contenido** en cuanto YouTube se lo da, antes del estreno. La semana que viene cambia el título en el body con `/config webhook acción:editar`, o lo pasa también a la tarea, como `{{title=…}}`.
settings:
  - setting: Consejos
    choice: Desactivados
    why: "El equipo conoce los botones. Sin el Tutorial y la línea de ayuda, la lista es más corta."
  - setting: Notificaciones push legibles
    choice: Activado
    why: "Sam lee los recordatorios en el móvil. La push muestra la tarea, no una tarjeta vacía."
  - setting: Tareas completadas atenuadas
    choice: Activado
    why: "El viernes la mayor parte de la lista está hecha. Las tareas marcadas se desvanecen y el estreno destaca."
week:
  - at: 2026-12-07T10:00
    text: "Mia ejecuta `/crear-lista` en #producción y escribe las tareas de la semana. Luego da a cada una su propietario con **Propietario**: las notificaciones mencionan a Leo, a Sam y a @Moderadores, así cada uno sabe qué es suyo. **Recordatorio** fija la fecha límite del montaje y el aviso del estreno, y **Webhook** vincula «Publicar el vídeo» a Vídeo nuevo. El enlace del patrocinador abre un correo nuevo, con el asunto ya escrito."
  - at: 2026-12-07T10:30
    text: "Mia da «Revisión final» a Leo y Sam juntos: elige a los dos en el menú bajo **Propietario**. TTM crea para ellos el rol **TTM1** y lo convierte en propietario. Un propietario de varias personas es una función [Premium](/premium/), desbloqueada para todos los servidores durante la beta."
  - at: 2026-12-08T09:00
    text: "Leo está ausente hasta el jueves por la tarde. Mia **da** sus dos tareas a Sam: elige a Sam en el menú bajo **Propietario**, confirma y luego elige «Primer montaje». Lo repite para el pase de color. La notificación nombra a Leo y menciona a Sam, así que Discord le avisa."
    card: { kind: notice, type: updated, by: "11869044175621001", from: "11869044175621002", task: "4" }
  - at: 2026-12-10T12:00
    text: "La fecha límite del primer montaje llega a Sam por mensaje directo. Ya no va a Leo: un recordatorio sigue al propietario de su tarea."
    card: { kind: reminder, task: "4" }
  - at: 2026-12-10T16:30
    text: "Sam termina el montaje y lo marca."
  - at: 2026-12-11T17:00
    text: "Leo ha vuelto. Él y Sam ven el vídeo juntos y Leo marca «Revisión final»: puede hacerlo cualquiera de los dos, porque ambos tienen TTM1."
  - at: 2026-12-12T17:00
    text: "El recordatorio del estreno menciona a @Moderadores en #producción, como respuesta a la lista. Una hora antes: la fecha del recordatorio son las 17:00."
    card: { kind: reminder, task: "8" }
  - at: 2026-12-12T18:00
    text: "Empieza el estreno. Mia marca «Publicar el vídeo» y el webhook publica el enlace en #anuncios."
    card: { kind: webhook, webhook: Vídeo nuevo, task: "9", by: "11869044175621001" }
fonte: ef4a937f2aeb
---

## La próxima vez

Después de este vídeo, Mia abre **Más** <img class="inline-ic" src="/icons/other.png" alt="" /> y pulsa **Clonar lista**: el mismo canal, sin las marcas y sin los recordatorios. Con **Actualización en bloque** cambia el título, las tareas y los enlaces, y quita el `{{video=…}}` del vídeo anterior. Luego da las fechas nuevas con **Recordatorio**. Consulta [Clonar](/docs/list-actions/#clone).

El clon mantiene a TTM1 como propietario de «Revisión final», así que el rol se queda aunque Mia elimine la lista antigua: TTM lo elimina solo cuando ya ninguna lista lo usa.

## Lo que TTM no hace aquí

TTM no sube, ni programa, ni edita vídeos, y no lee las estadísticas de tu canal. No guarda archivos: el montaje y las miniaturas viven en tu nube, y la lista enlaza a ellos. TTM guarda el trabajo de la semana, las fechas límite y las personas.

## Preguntas

### ¿Y si Mia hubiera quitado a Leo en lugar de dar sus tareas a Sam?

El recordatorio se habría ido con él: un recordatorio sin propietario no llega a nadie. Si todavía no ha llegado, TTM pregunta antes, y puedes cerrar la ventana para conservarlo todo. Consulta [Propietario](/docs/channel-tasks/#owner).

### ¿Por qué Sam recibió una mención y Mia no?

Una notificación menciona a quien recibe una tarea de otra persona. Sam recibió las tareas de Leo de parte de Mia. A quien actúa nunca se le menciona: ya lo sabe. Consulta [Propietarios y etiquetas](/docs/owners-and-tags/).

### ¿Puede el recordatorio del estreno llegar antes, o dos veces?

El recordatorio llega en la fecha que le das, así que una hora antes significa las 17:00. Para avisar a los moderadores dos veces, una hora antes y diez minutos antes, haz que se repita: desde las 17:00, cada 50 minutos, dos veces en total. Los recordatorios repetidos son una función [Premium](/premium/), desbloqueada para todos los servidores durante la beta. Consulta [Recordatorios repetidos](/docs/reminders/#repeating-reminders).
