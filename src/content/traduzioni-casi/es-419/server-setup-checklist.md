---
title: Configura un servidor de Discord sin saltarte un paso
seoTitle: Checklist para configurar un servidor de Discord, paso a paso
name: Checklist de configuración del servidor
description: "Dos personas abren un servidor de comunidad en una semana: una sola lista para roles, reglas, seguridad y bienvenida, un recordatorio antes de la apertura y un anuncio que se publica solo."
highlights: "Propietarios que tomas o das, etiquetas de canales, un recordatorio por mensaje directo, un webhook que publica el anuncio de apertura, la Activity la noche de la apertura."
intro: |
  Ava abre **Pixel Harbor**, un servidor de comunidad para pixel artists, el sábado por la tarde. Leo, un amigo que modera otro servidor, la ayuda. Tienen una semana (del lunes 7 al domingo 13 de diciembre de 2026) y una lista en un canal privado que solo ven ellos dos.
order: 1
team:
  guild: Pixel Harbor
  zone: Europe/Berlin
  people:
    - { id: "11819044175621001", name: Ava, username: ava.pixels, color: "#eb459e", about: "Propietaria del servidor. Crea la lista." }
    - { id: "11819044175621002", name: Leo, username: leo.mod, color: "#3ba55c", about: "Moderador. Nuevo en TTM." }
  roles:
    - { id: "11819044175622001", name: Admins, about: "Ava y Leo: los trabajos que puede hacer cualquiera de los dos.", members: ["11819044175621001", "11819044175621002"] }
  channels:
    - { id: "11819044175623001", name: setup, about: "Privado: solo lo ven Ava y Leo. La lista vive aquí." }
    - { id: "11819044175623002", name: reglas, about: "Las reglas del servidor." }
    - { id: "11819044175623003", name: bienvenida, about: "Donde llegan los miembros nuevos." }
    - { id: "11819044175623004", name: anuncios, about: "Donde se anuncia la apertura." }
list:
  title: Apertura de Pixel Harbor
  channel: "11819044175623001"
  at: 2026-12-11T12:00
  tips: true
  look: |
    Las tareas marcadas son más pequeñas y grises, así que destaca lo que queda. Cada tarea tiene un propietario: Leo para los trabajos que tomó o que le dieron, Ava para los suyos, @Admins para los que puede hacer cualquiera de los dos. «Anunciar la apertura» tiene su recordatorio, y «Abrir las puertas» muestra su webhook, que solo ve TTM.
  text: |
    - [X] <@11819044175621001>: Activar Comunidad en Configuración del servidor, con la [guía de Discord](https://support.discord.com/hc/en-us/articles/360047132851)
    - [X] <@&11819044175622001>: Escribir las reglas en <#11819044175623002>
    - [X] <@11819044175621002>: Configurar AutoMod: spam, enlaces y filtro de palabras
    - [] <@11819044175621002>: Escribir el mensaje de bienvenida para <#11819044175623003>
    - [X] <@&11819044175622001>: Crear los roles
     - [X] Miembro, Artista, Moderador
     - [X] Colores y orden en la lista de roles
    - [] <@&11819044175622001>: Fijar los permisos de cada categoría
    - [] <@&11819044175622001>: Probar el servidor con una cuenta que solo tenga Miembro
    - [] <@11819044175621002>: Fijar una guía para los futuros moderadores: :owner: y luego una tarea para tomarla, :reminder: para un aviso ese día
    - [] <t:1797008400> [0m,0m,0] <@11819044175621001>: Anunciar la apertura en nuestras redes y en los servidores asociados
    - [] {{wb=Publicación de apertura}} <@11819044175621001>: Abrir las puertas
webhooks:
  - name: Publicación de apertura
    service: discord
    trigger: completion
    method: POST
    url: https://discord.com/api/webhooks/<id>/<token>
    headers: "Content-Type: application/json"
    body: |
      {"content": "**¡{{guild}} está abierto!**\nEmpieza por <#11819044175623002>, y luego saluda en <#11819044175623003>. Tenemos muchas ganas de ver tu arte.", "allowed_mentions": {"parse": []}}
    postsAs: { name: Pixel Harbor, channel: "11819044175623004", color: "#f0b232" }
    setup: |
      Abre la configuración de #anuncios, luego *Integraciones → Webhooks → Nuevo webhook*. Ponle un nombre, dale el ícono del servidor y presiona **Copiar URL del webhook**: esa es la URL de arriba. La URL es como una contraseña del canal: cualquiera que la tenga puede publicar ahí, así que pégala solo en `/config webhook`.

      El body es el mensaje, escrito y revisado días antes de la apertura. `allowed_mentions` con un `parse` vacío significa que el mensaje no avisa a nadie, aunque alguien le agregue una mención más tarde.
settings:
  - setting: Consejos
    choice: Activados, luego desactivados
    why: "Leo es nuevo en TTM: el Tutorial y la línea de ayuda debajo de la lista le muestran dónde presionar. Ava los desactiva el sábado por la noche, con el servidor abierto y Leo ya conociendo los botones."
  - setting: Sincronizar permisos
    choice: Cargados
    why: "En *Configuración del servidor → Integraciones*, solo @Admins puede usar TTM. Después de la sincronización, un moderador agregado más tarde ve la lista en solo lectura hasta que Ava le da el rol."
week:
  - at: 2026-12-07T10:00
    text: "Ava ejecuta `/crear-lista` en #setup y escribe solo las tareas. Luego da los propietarios con **Propietario**: @Admins para los trabajos que puede hacer cualquiera de los dos, Leo para la guía, ella misma para Comunidad y «Abrir las puertas». Con **Webhook** vincula «Abrir las puertas» a Publicación de apertura."
  - at: 2026-12-07T10:20
    text: "Leo **toma** «Configurar AutoMod»: presiona **Propietario** hasta que se pone azul, luego elige la tarea sin elegir a nadie. La tarea pasa a ser suya y el canal dice quién la tomó."
    card: { kind: notice, type: claimed, by: "11819044175621002", task: "3" }
  - at: 2026-12-07T19:40
    text: "Ava activa Comunidad y escribe las reglas con Leo. Pega el enlace de #reglas, copiado con *Copiar enlace* en el canal: TTM lo convierte en una etiqueta de canal."
  - at: 2026-12-08T09:00
    text: "Ava **da** «Escribir el mensaje de bienvenida» a Leo: lo elige en el menú debajo de **Propietario**, luego elige la tarea. La notificación lo menciona, así que Discord le avisa."
    card: { kind: notice, type: assigned, by: "11819044175621001", task: "4" }
  - at: 2026-12-09T21:00
    text: "Ava marca el grupo «Crear los roles». Sus dos subtareas se marcan con él."
  - at: 2026-12-10T22:10
    text: "Ava pone un recordatorio en «Anunciar la apertura», para el viernes a las 18:00. La tarea no tenía propietario, y un recordatorio va al propietario: al guardarlo, Ava pasa a ser la propietaria."
  - at: 2026-12-11T18:00
    text: "El recordatorio llega a Ava por mensaje directo. El botón que tiene debajo abre la lista."
    card: { kind: reminder, task: "9" }
  - at: 2026-12-12T17:30
    text: "Ava abre la lista con **Activity** <img class=\"inline-ic\" src=\"/icons/activity.png\" alt=\"\" />, el primer botón debajo de ella. Leo entra con **Entrar a la Activity**. Prueban el servidor juntos, marcando las últimas tareas sobre la marcha."
  - at: 2026-12-12T18:00
    text: "Ava marca «Abrir las puertas». El webhook publica el anuncio en #anuncios, con el nombre y el ícono del webhook."
    card: { kind: webhook, webhook: Publicación de apertura, task: "10", by: "11819044175621001" }
  - at: 2026-12-12T18:40
    text: "Ava y Leo salen de la Activity. La lista vuelve a #setup con un resumen de lo que cambiaron, y el hilo de la lista registra cada cambio con quién lo hizo. Ava desactiva los **Consejos** en `/config app`."
fonte: 46fb8aa39338
---

## La próxima vez

Ava guarda la lista para el próximo servidor que abra: en **Más** <img class="inline-ic" src="/icons/other.png" alt="" />, **Descargar** <img class="inline-ic" src="/icons/download.png" alt="" /> le da la lista como un archivo `.txt`, escrito como el texto de arriba. En el servidor nuevo ejecuta `/crear-lista` y adjunta el archivo.

Los roles y canales de Pixel Harbor no existen allí. TTM comprueba cada mención antes de crear nada y lista todas las que el servidor nuevo no tiene: Ava las cambia en el archivo por las nuevas e importa de nuevo. El archivo también conserva las marcas, y un recordatorio con la fecha pasada vuelve sin dispararse. Así que cambia `[X]` por `[]` y da al recordatorio una fecha nueva con **Recordatorio**. Consulta [Reutiliza una lista en cualquier lugar](/docs/tips/#reuse-a-list-anywhere).

## Lo que TTM no hace aquí

TTM sigue el trabajo; la configuración la haces tú. No crea tus canales, no cambia permisos ni configura AutoMod: eso vive en *Configuración del servidor*. Tampoco copia un servidor. Para un servidor con los mismos canales y roles, Discord tiene sus propias plantillas de servidor, en *Configuración del servidor*.

## Preguntas

### ¿Tengo que escribir los códigos?

No. Los escriben los botones: **Propietario** para el propietario, **Etiqueta** para las etiquetas, **Recordatorio** para el recordatorio, **Webhook** para el webhook. Tú escribes solo las tareas. Los códigos importan cuando copias una lista, o cuando prefieres escribir en lugar de hacer clic: consulta [Editar una lista a mano](/docs/writing-a-list/).

### ¿Por qué Leo recibió una mención y Ava no?

Una notificación menciona a quien *recibe* una tarea de otra persona, para que Discord se lo diga. Leo recibió «Escribir el mensaje de bienvenida» de Ava. Cuando él mismo tomó «Configurar AutoMod», no se mencionó a nadie: ya lo sabía. Consulta [Propietarios y etiquetas](/docs/owners-and-tags/).

### ¿Verán los miembros la lista?

Cualquiera que pueda leer su canal la ve. En un canal privado, solo quienes tienen acceso. Para mantener las listas en solo lectura para algunos, consulta [Sincronizar permisos](/docs/configuration/#sync-permissions).
