---
title: "Referencia de comandos"
description: "Todos los comandos de barra en un solo lugar, con la página que los explica. La mayor parte de TTM vive en botones, no en comandos."
fonte: 103a298bf4e4
---

TTM mantiene los comandos al mínimo: una vez creada una lista, lo haces todo con botones y menús. Para ejecutar un comando, escribe `/` en el cuadro de mensajes y elígelo. También puedes abrir el **Lanzador de aplicaciones** en la barra de mensajes y elegir **Team Tasks Manager** en *Aplicaciones en este servidor*.

Si tu Discord está en otro idioma, algunos nombres están traducidos: consulta [Nombres de los comandos en tu idioma](#command-names-in-your-language) al final.

| Comando | Para qué sirve | Dónde se explica |
| :--- | :--- | :--- |
| `/crear-lista` | Crear una lista, o reconstruir una a partir de un archivo | [Crea tu primera lista](/docs/getting-started/#2-create-your-first-list); el archivo [más abajo](#create-list) |
| `/config` | Los tres comandos para quien se encarga de TTM en el servidor | [/config](/docs/config/) |
| `/config app` | La configuración del servidor: notificaciones, historial, consejos, recordatorios, zona horaria, permisos | [/config app](/docs/configuration/) |
| `/config lists` | Todas las listas del servidor: regenerar, sellar o eliminar varias a la vez | [/config lists](/docs/config-lists/) |
| `/config webhook` | Crear, ver, editar o eliminar un webhook | [/config webhook](/docs/config-webhook/) |
| `/my timezone` | Tu zona horaria, la misma en todos los servidores | [/my timezone](/docs/my-timezone/) |
| `/beta` | Qué significa la beta para tu servidor | [Cómo funciona la beta](/docs/beta/) |
| `/help` | Tu punto de partida dentro de Discord | [Más abajo](#help) |
| `/invite` | Una tarjeta para agregar TTM a otro servidor | [Más abajo](#invite) |
| `/news` | Las últimas novedades de TTM | [Más abajo](#news) |

## `/crear-lista`

Para crear una lista desde cero, consulta [Crea tu primera lista](/docs/getting-started/#2-create-your-first-list). Esta sección trata de la única opción del comando, **`archivo`**, que puedes omitir.

Adjunta el archivo `.txt` que te da **Descargar** en una lista. Lleva el nombre de la lista y puede venir de otro servidor. TTM reconstruye entonces la lista a partir del archivo en lugar de abrir el formulario de creación.

La lista vuelve con sus tareas y su estado, propietarios, etiquetas, recordatorios y webhooks. Como cualquier lista nueva, necesita un lugar libre en tu plan (consulta [Cómo funcionan los tres lugares](/docs/premium/#how-the-three-places-work)).

TTM rechaza un archivo de inmediato si no es un `.txt` o si pesa más de **64 KB**. Si no, TTM lee el archivo. Si algo no encaja, TTM no crea nada y enumera todos los problemas en un solo mensaje, cada uno con su línea o su tarea:

- **El formato**: el archivo no es texto UTF-8, o no empieza con `#!ttm/1`. Falta el título.

  Una línea no es una tarea, o un recordatorio está escrito en meses (`M`) o está mal escrito. Un webhook está vinculado a una tarea sin texto, la lista empieza con una subtarea, o no hay tareas.
- **El tamaño**: la lista es demasiado larga para un mensaje, o tiene más tareas de las que caben en una lista o de las que permite tu plan.
- **Los recordatorios**: un recordatorio no tiene propietario, no tiene fecha y una distancia de cero, o se repite más veces de las que permite tu plan. Un recordatorio recurrente se rechaza donde no se pueden crear nuevos (consulta [Recordatorios](/docs/reminders/#repeating-reminders)). Habría demasiados recordatorios en espera a la vez.
- **Este servidor**: un rol, un canal o un webhook del archivo no existe aquí, o un usuario del archivo no es miembro.

Los recordatorios cuyos avisos están todos en el pasado no son un problema: vuelven en sus tareas y no envían nada más.

→ Consulta [Reutiliza una lista en cualquier lugar](/docs/tips/#reuse-a-list-anywhere).

## `/help`

Este comando es tu punto de partida dentro de Discord. Abre un panel con cinco botones:

- **Inicio** <img class="inline-ic" src="/icons/home.png" alt="" />: un resumen de la app.
- **Empezar** <img class="inline-ic" src="/icons/start.png" alt="" />: un inicio rápido, con un enlace a esta documentación.
- **Configuración** <img class="inline-ic" src="/icons/config.png" alt="" />: para qué sirven `/config app`, `/config lists` y `/config webhook`.
- **Premium** <img class="inline-ic" src="/icons/premium.png" alt="" />: cómo será el plan de pago cuando termine la beta, límites gratuitos incluidos.
- **Quiénes somos** <img class="inline-ic" src="/icons/aboutus.png" alt="" />: quién construye TTM.

## `/invite`

Muestra una tarjeta para agregar Team Tasks Manager a otro servidor: la misma presentación que su página del App Directory (qué hace, cómo empezar), el botón **Agregar a Discord**, la guía y el servidor de soporte.

**Agregar a Discord** abre la página de autorización de Discord para el bot, con los mismos permisos que https://tasks.bitsplitters.app/invite.

La tarjeta es visible para todos en el canal, así que puedes ejecutarla donde la vean las personas que configurarán el otro servidor. No lee nada del servidor y no necesita ningún permiso.

## `/news`

Las últimas novedades de Team Tasks Manager, en tu idioma: qué hay de nuevo en el bot y cómo usarlo. Las novedades se abren en un mensaje que solo ves tú, con su fecha debajo del título.

Debajo del texto, **Servidor de Discord** abre nuestro servidor de soporte y **Notas de la versión** abre esa versión en la página de [Notas de la versión](/docs/release-notes/). Cuando hay novedades más antiguas o más recientes, los botones **Anterior** y **Siguiente** te llevan a ellas.

Si retrocedes, encuentras todas las versiones desde la primera, la 1.0.0, cada una con el día en que salió. Funciona solo en servidores y no necesita ningún permiso.

Cuando hay novedades que nadie de tu servidor ha leído todavía, la última línea de los paneles del bot lo dice, en lugar del pie habitual: en `/help`, la Guía, **Más**, `/config app` y la explicación que muestra `/crear-lista`.

En cuanto alguien del servidor abre `/news`, la línea desaparece para todos. Un servidor que agrega TTM después de una novedad no recibe la línea: la novedad está en `/news`.

## Nombres de los comandos en tu idioma

Discord muestra cada comando en el idioma de tu app de Discord, y en inglés para un idioma al que TTM no está traducido. `/config app`, `/config lists`, `/config webhook` (con su opción `webhook`), `/my timezone`, `/beta`, `/help`, `/invite` y `/news` tienen el mismo nombre en todas partes.

| Idioma | `/create-list` | su opción `file` | opciones de `/config webhook` |
| :--- | :--- | :--- | :--- |
| Inglés, y cualquier otro idioma | `/create-list` | `file` | `action` · `trigger` |
| Italiano | `/crea-lista` | `file` | `azione` · `evento` |
| Español | `/crear-lista` | `archivo` | `acción` · `evento` |
| Português (Brasil) | `/criar-lista` | `arquivo` | `ação` · `evento` |
| Français | `/creer-liste` | `fichier` | `action` · `événement` |
| Deutsch | `/liste-erstellen` | `datei` | `aktion` · `ereignis` |

Las elecciones dentro de las opciones (ver, crear, editar, eliminar; finalización, reapertura) también aparecen en tu idioma.
