---
title: "Notas de la versión"
description: "Las novedades de Team Tasks Manager, de la más reciente a la más antigua."
fonte: 96dbaef26d7b
---

Aquí está cada cambio que ves en Discord, del más reciente al más antiguo. Cada entrada enlaza a la página que lo explica.

## 2.6.0 — Tu zona horaria, en todas partes

Released 2026-11-24

- **Elige tu zona horaria una sola vez** — **/my timezone**, en cualquier servidor, muestra tu zona horaria y de dónde viene. **Elegir** fija la tuya, y TTM te la propone en todos los servidores, en el canal y en la Activity. **Quitar mi zona horaria** vuelve a la propuesta. Consulta [/my timezone](/docs/my-timezone/).
- **Una zona distinta vale solo para esa fecha** — la zona que dejes en un recordatorio ya no pasa a ser la tuya, y TTM olvida las que había aprendido así: te propone la tuya solo cuando la eliges. Bajo la zona horaria de **Cuándo**, una línea te dice de dónde viene la zona y cómo elegir la tuya. Consulta [/my timezone](/docs/my-timezone/).
- **También en la Activity** — el engranaje muestra tu zona horaria en **Para ti, en todas partes**, igual que `/my timezone`. Bajo la zona horaria de un recordatorio, la línea enlaza a ella. Consulta [Tus ajustes](/docs/activity/#your-settings).

## 2.5.0 — Nombres en vez de códigos

Released 2026-11-23

- **Personas, roles y canales por su nombre** — **Actualización en bloque** muestra `@Ava`, `@Moderadores` y `#general` en vez de los códigos de Discord, y el formulario **Contenido** muestra los canales por su nombre. Escribe `@` y un nombre para cada rol y cada canal, y para cualquiera que ya esté en la lista. Añade a alguien nuevo con **Propietario** o **Etiqueta**, o escribe su código. Un nombre que TTM no conoce se queda como texto, salvo como propietario: entonces TTM te avisa y no guarda nada. Consulta [Personas, roles y canales por su nombre](/docs/writing-a-list/#people-roles-and-channels-by-name).
- **Contenido es solo el texto** — el formulario **Contenido** ya no muestra las etiquetas de la tarea, igual que en la Activity: se quedan en la tarea, y **Etiqueta** las cambia. Una etiqueta escrita en el formulario se quita, y TTM te avisa. Consulta [Contenido](/docs/channel-tasks/#content).
- **Fechas de recordatorio que se leen** — en el texto de una lista, la fecha de un recordatorio es `2026-12-08 18:00`, en tu zona horaria, en vez de un código. Cámbiala y guarda, y el recordatorio se mueve. Para conservar una hora que alguien te dio en su zona, escribe la zona detrás: `2026-12-08 18:00 America/New_York`. Consulta [Recordatorios en el texto](/docs/writing-a-list/#reminders-in-the-text).
- **La guía a un clic** — bajo el texto de **Actualización en bloque** y de `/crear-lista`, una línea explica cómo añadir a alguien nuevo y enlaza a la guía. Cuando un nombre o una fecha no se puede guardar, el mensaje enlaza a la parte de la guía que lo explica. Consulta [Personas, roles y canales por su nombre](/docs/writing-a-list/#people-roles-and-channels-by-name).
- **También en la Activity** — **Editar la lista** muestra los nombres y las fechas en tu zona horaria. Bajo el texto, **Editar la lista** y **Nueva lista** tienen la misma línea, con el enlace a la guía. Ahora los enlaces se abren, en el texto de una tarea y en los mensajes: Discord te pregunta antes de sacarte de la Activity. Consulta [Editar la lista](/docs/activity-list/#edit-the-list).
- **Los códigos siguen funcionando** — un código que escribes o pegas se guarda tal cual, y el archivo de Descargar conserva los códigos, así que los archivos de antes se importan como están. Consulta [Los códigos detrás de los nombres](/docs/writing-a-list/#the-codes-behind-the-names).

## 2.4.1 — Webhooks y fechas, corregidos

Released 2026-11-21

- **Webhooks con comillas en el texto** — una tarea, una variable o un nombre con comillas, una barra invertida o un salto de línea ya no rompe el cuerpo de la llamada: TTM escapa el valor, así que el servicio recibe un JSON válido. Consulta [Tokens](/docs/config-webhook/#tokens).
- **Todos los formatos de `@time` fijan el recordatorio** — las fechas en los estilos `s` y `S` de Discord, la fecha corta con la hora, ahora cuentan como la fecha del recordatorio. `S` es el primer formato del menú de `@time`: hasta ahora TTM no lo veía, así que el recordatorio se contaba desde que guardabas y la fecha se quedaba en el texto. Consulta [Recordatorios en el texto](/docs/writing-a-list/#reminders-in-the-text).

## 2.4.0 — La segunda fila te muestra el camino

Released 2026-11-20

- **El rojo solo muestra lo que puedes quitar** — con **Propietario**, **Etiqueta**, **Recordatorio** o **Webhook** en rojo, el selector de tareas lista solo las tareas que tienen un propietario, etiquetas, un recordatorio o un webhook que quitar. Si ninguna lo tiene, el selector está apagado y lo dice, por ejemplo *Ningún propietario que quitar*, y recibes una nota con lo que puedes hacer en su lugar. Consulta [La segunda fila](/docs/channel-tasks/#the-second-row).
- **La Activity también lo dice** — en modo rojo, el panel de una tarea sin nada que quitar lo dice arriba, y **Eliminar** queda apagado. Consulta [El panel de una tarea](/docs/activity-list/#the-panel-of-a-task).
- **Contenido y Recordatorio te dicen qué sigue** — pulsa **Contenido** o **Recordatorio** y un mensaje que solo ves tú te dice qué tarea elegir en el selector sobre los botones, con un botón que te devuelve a la lista. Deja de salir cuando ya has elegido una tarea así, en cualquier servidor. Consulta [La segunda fila](/docs/channel-tasks/#the-second-row).

## 2.3.0 — Las listas nuevas se anuncian solas

Released 2026-11-19

- **Una lista nueva se anuncia sola** — crear, importar o clonar una lista publica una notificación debajo, con un enlace a la lista. Menciona a los propietarios de las tareas, así que Discord les avisa. Con el historial activado, el hilo empieza con la lista. Consulta [Cuando se crea una lista](/docs/configuration/#when-a-list-is-created).
- **Una explicación por lista** — con los consejos activados, la primera notificación de una lista nueva explica una sola vez por qué TTM publica notificaciones y dónde configurarlas. Consulta [Consejos](/docs/configuration/#tips).
- **`/config app` en un orden nuevo** — **Consejos** va primero, con un botón verde o gris. **Comportamiento** reúne las notificaciones push legibles, mantener el estado tras la selección y la nueva opción **Mencionar a los propietarios en listas nuevas**, activada por defecto. Los recordatorios recurrentes muestran el emoji de Premium. Consulta [/config app](/docs/configuration/).
- **Cada tarea que cambia dispara su webhook** — marca la última subtarea y el grupo también se completa: ahora los dos disparan sus webhooks. Marca un grupo y sus subtareas disparan los suyos. Las llamadas salen en el orden de la lista, y todo el marcado cuenta como un solo clic. Consulta [Cuándo se dispara un webhook](/docs/webhooks/#when-a-webhook-fires).
- **Reabrir todo dispara los webhooks de reapertura** — de las tareas que reabre, en el canal y en la Activity. Consulta [Cuándo se dispara un webhook](/docs/webhooks/#when-a-webhook-fires).
- **Un aviso por webhook** — cuando el mismo webhook está en varias tareas que cambian juntas y la llamada falla, recibes un solo aviso. Consulta [Cuando un webhook falla](/docs/webhooks/#when-a-webhook-fails).
- **Los recordatorios empiezan en tu zona horaria** — hasta que elijas una zona horaria, el formulario **Cuándo** propone la de tu idioma de Discord: `America/Sao_Paulo` en portugués de Brasil, `Europe/Rome` en italiano. Los recordatorios que escribes en el texto de una lista también la usan, en el canal y en la Activity. Un idioma que se habla en varias zonas, como el inglés (EE. UU.), conserva la zona del servidor. Consulta [Tu zona horaria](/docs/reminders/#your-time-zone).
- **Invitar desde la Activity** — **Invitar**, arriba a la derecha del inicio y de cada lista, abre la ventana de Discord para invitar a amigos o enviar la invitación a un canal. Consulta [Únete a los demás](/docs/activity/#join-the-others).
- **Tu estado de Discord muestra la Activity** — mientras estás en ella, tu perfil dice *Planificando tareas con el equipo*, en tu idioma, y nada sobre la lista. Discord te pregunta antes: si dices que no, la Activity se abre igualmente. Consulta [Tu estado en Discord](/docs/activity/#your-status-on-discord).

## 2.2.0 — Toma una tarea

Released 2026-11-18

- **Toma una tarea tú mismo** — haz clic en **Propietario** hasta que se ponga azul y elige una tarea sin elegir a nadie: es tuya, y el canal muestra quién la tomó. Una tarea que ya tiene propietario se queda como está: para sustituirlo, elígete antes en el menú. Con **Mantener el estado tras la selección**, toma una tarea tras otra sin volver a hacer clic en **Propietario**. Consulta [Propietario](/docs/channel-tasks/#owner).
- **Toma una tarea en la Activity** — en una tarea sin propietario, **Propietario** se abre con tu nombre ya elegido: **Guardar** la hace tuya. Consulta [Propietario](/docs/activity-list/#owner).
- **Quien recibe una tarea se entera** — da una tarea a otra persona, o a un rol, y la notificación del canal los menciona, así que Discord les avisa. Cuando tomas una tarea tú mismo, no se menciona a nadie. Consulta [Propietario](/docs/channel-tasks/#owner).

## 2.1.0 — Novedades en el bot

Released 2026-11-17

- **`/news`** — las últimas novedades de Team Tasks Manager, en tu idioma, en un mensaje que solo ves tú. Bajo cada novedad, **Servidor de Discord** abre nuestro servidor de soporte y **Notas de la versión** abre esa versión en esta página. Los botones **Anterior** y **Siguiente** van a las novedades más antiguas y más nuevas. Consulta [`/news`](/docs/commands/#news).
- **Todas las versiones en `/news`** — desde la 1.0.0, cada una con el día en que salió: retrocede con **Anterior**. Consulta [`/news`](/docs/commands/#news).
- **Una línea para las novedades que nadie ha leído** — cuando hay novedades que nadie de tu servidor ha abierto todavía, la última línea de los paneles del bot lo dice hasta que alguien abre `/news`: entonces desaparece para todo el servidor. Consulta [`/news`](/docs/commands/#news).

## 2.0.1 — Modo Activity en el Tutorial

Released 2026-11-16

- **Una lección sobre el modo Activity** — la lista de práctica del Tutorial tiene siete lecciones: antes de la última, marca una tarea en modo Activity, más fluido y libre de los límites de los canales de texto. Consulta [Primeros pasos](/docs/getting-started/#2-create-your-first-list).

## 2.0.0 — La Activity

Released 2026-11-15

- **La Activity** — una lista se abre en una ventana dentro de Discord, en el ordenador y en el móvil. Varias personas trabajan en ella a la vez, y todas ven cada cambio en el momento. Cuando sale la última persona, la lista vuelve a su canal, con un resumen de los cambios. Consulta [La Activity](/docs/activity/).
- **Un primer botón nuevo** — **Activity** <img class="inline-ic" src="/icons/activity.png" alt="" /> lleva la lista a la Activity, en canales de texto y en el chat de los canales de voz. Necesita el permiso de Discord *Usar actividades* en el canal. Una lista que ya esté en tus canales lo recibe la próxima vez que cambie. Consulta [Abrir una lista en la Activity](/docs/activity/#open-a-list-in-the-activity).
- **Clonar lista está en Más** — encima de **Descargar**, y ahí también con la lista bloqueada. La Guía también lo dice. Consulta [Qué hay dentro de Más](/docs/the-task-list/#whats-inside-more).
- **Mientras una lista está en la Activity** — su mensaje en el canal solo tiene **Entrar en la Activity**, y la lista no se puede cambiar ahí. Consulta [Únete a los demás](/docs/activity/#join-the-others).
- **Launch** — el **Lanzador de aplicaciones** de Discord, o el botón de actividades de una llamada de voz, abre las listas del canal. Entra en una, lleva otra a la Activity o crea una nueva. Consulta [El inicio del canal](/docs/activity/#the-home-of-the-channel).
- **`/config lists`** — una lista en la Activity se marca como *en la Activity*. **Eliminar** la quita para todos, y **Sellar** primero la devuelve al canal. Consulta [Qué se queda en el canal](/docs/activity/#what-stays-in-the-channel).
- **La oferta Founder** — durante un tiempo limitado antes de que termine la beta, cada servidor puede desbloquear la insignia Founder; los primeros 5000 Founders que compren (1000 desde el 22 de noviembre de 2026) obtienen el plan anual a 20 € en vez de 36 €, sin IVA. Consulta [Founder](/premium/#founder).
- **Recordatorios de rol por mensaje directo** — cuando el bot no puede escribir en el canal de la lista, el aviso que acompaña al recordatorio está en el idioma de quien eligió a las personas del rol.

## 1.5.0 — Recurrencia desde menús

Released 2026-11-07

- **Elige la recurrencia desde menús** — **Editar recurrencia** abre un formulario con tres menús en vez de dos campos para escribir: **Cuántas veces, en total**, **Cada** y **Unidad** (minutos, horas o días). No hay ningún intervalo que escribir ni formato que equivocar: para cuatro avisos eliges 4. Consulta [Los campos de la repetición](/docs/reminders/#the-repetition-fields).
- **La insignia cuenta cada aviso** — en la línea de la tarea, `↻1d ×4` ahora significa cuatro avisos, uno al día, el primero incluido. Antes, `×` contaba las repeticiones posteriores al primero. Una lista escrita antes de esta versión muestra el número antiguo hasta que alguien la cambie. Consulta [Leer un recordatorio en la tarea](/docs/reminders/#reading-a-reminder-on-the-task).
- **Hasta 50 veces en total** — en Premium un recordatorio llega como máximo 50 veces, el primero incluido, y uno que ya tenía más las conserva. En **Actualización en bloque** el triplete sigue contando las repeticiones posteriores al primero: como máximo 49. Consulta [Límites conocidos](/docs/known-limits/#reminders).

## 1.4.0 — Tutorial y listas en canales de voz

Released 2026-11-05

- **Un tutorial para tu primera lista** — la explicación que muestra `/crear-lista` tiene un botón **Tutorial** junto a **Crea tu lista**. Convierte la explicación en una lista de práctica de seis lecciones, en tu idioma, y te envía la Guía, la misma de **Más** → **Guía**, en un mensaje que solo ves tú. La lista de práctica es una lista normal: elimínala desde **Más** cuando termines. El botón aparece con los consejos activados, y la tarjeta de bienvenida y `/help` apuntan a él. Consulta [Primeros pasos](/docs/getting-started/#2-create-your-first-list).
- **Los emoji de los botones tienen nombres cortos** — en **Actualización en bloque**, en el formulario del texto de una tarea y en el archivo de Descargar, el emoji de un botón de la lista, como los de las lecciones del Tutorial, se muestra como `:owner:`, `:reminder:`, `:content:` y `:more:` en vez de un código largo. Escribe uno de estos nombres en una tarea y la lista muestra el emoji. Consulta [Emoji de los botones](/docs/writing-a-list/#button-emoji).
- **Listas en canales de voz** — `/crear-lista` funciona en el chat de un canal de voz, y **Clonar lista** también ofrece canales de voz. Una lista ahí hace todo lo que hace en un canal de texto, salvo el historial de actividad, porque Discord no permite hilos en los canales de voz: quien crea una recibe un mensaje corto que lo explica. En un canal de voz TTM necesita *Conectar* en lugar de los dos permisos del historial. Consulta [Canales de voz](/docs/known-limits/#voice-channels).

## 1.3.0 — Espacio entre grupos

Released 2026-11-03

- **Espacio entre grupos** — una opción nueva de `/config app`: desactívala y tus listas pierden las líneas en blanco encima y debajo de las tareas que tienen subtareas, para una lista más compacta. Activada por defecto: consulta [Espacio entre grupos](/docs/configuration/#space-around-groups).
- **El aspecto de la lista es un solo desplegable** — **Consejos**, **Tareas completadas atenuadas** y **Espacio entre grupos** son ahora opciones del mismo desplegable de `/config app`: marca las que quieras activar. Consulta [Consejos y aspecto de la lista](/docs/configuration/#list-appearance).
- **La Guía explica cómo marcar una tarea** — su primera página y la página de los botones de tarea ahora lo dicen en negrita: para marcar o desmarcar una tarea, todos los botones de la segunda fila deben estar apagados. Consulta [El menú de marcado](/docs/the-task-list/#the-check-selector).
- **Una lista bloqueada dice quién la está editando** — mientras alguien edita la lista, su última línea dice quién, y cómo desbloquearla si se queda bloqueada: **Más → Desbloquear lista**. Ocupa el lugar de la línea de consejos y se muestra incluso con los consejos ocultos. Consulta [Cuando la lista está bloqueada](/docs/the-task-list/#when-the-list-is-locked).

## 1.2.1 — Marcar una tarea

Released 2026-11-01

- **El menú de tareas dice *Marcar tarea*** — con todos los botones de tarea en gris, el menú sobre los botones dice para qué sirve, en vez de mostrar el título de la lista. Consulta [La segunda fila](/docs/channel-tasks/#the-second-row).
- **Los formularios que bloquean la lista dicen cómo desbloquearla** — **Actualización en bloque** y el formulario del texto de una tarea terminan con una línea: cerrarlos con **Cancelar** o con la ✕ deja la lista bloqueada, y **Más → Desbloquear lista** la desbloquea. Consulta [He pulsado Cancelar y la lista sigue bloqueada](/docs/troubleshooting/#i-pressed-cancel-and-the-list-stays-locked).

## 1.2.0 — Consejos, barra de progreso y lista completada

Released 2026-11-01

- **El menú de tareas te dice qué viene después** — mientras un botón de tarea está azul o rojo, el menú sobre los botones muestra la acción, como *Editar tarea* o *Eliminar tarea*: elige la tarea ahí. Con todos los botones en gris vuelve a mostrar el título de la lista. Consulta [La segunda fila](/docs/channel-tasks/#the-second-row).
- **Consejos bajo cada lista** — una pequeña última línea apunta a **Guía**, en **Más**, y a este sitio. El ajuste de la leyenda de `/config app` ahora se llama **Consejos**, y apaga tanto la línea como la explicación que muestra `/crear-lista`: consulta [Consejos](/docs/configuration/#tips).
- **Una barra de progreso** — una barra verde fina al final de cada lista, en pasos del 5 %. Solo está llena cuando todas las casillas están marcadas, y una lista sellada la conserva: consulta [Bajo la lista](/docs/the-task-list/#under-the-list).
- **Lista completada** — la marca que completa una lista lo dice en su notificación y en el hilo del historial: consulta [Modo de notificación](/docs/configuration/#notification-mode).
- **La Guía** dice qué hacer después de pulsar un botón de tarea: elegir la tarea en el menú.
- **Más** empieza con **Guía** y **Descargar**, luego **Sellar lista** y **Eliminar lista**. En una lista bloqueada, **Desbloquear lista** se queda arriba: consulta [Qué hay dentro de Más](/docs/the-task-list/#whats-inside-more).

## 1.1.0 — Tarjeta de invitación, mensaje de bienvenida y consejos en el estado

Released 2026-10-26

- **`/invite`** — una tarjeta pública con el logotipo, qué hace el bot y cómo empezar (la misma presentación que su página del App Directory) y tres botones: añadirlo a otro servidor (la página de autorización de Discord, directamente desde el bot), la guía y el servidor de soporte. El mismo nombre en todos los idiomas: consulta [Comandos](/docs/commands/).
- **Una tarjeta de bienvenida al entrar por primera vez** — una vez en la vida de un servidor, en su canal del sistema: qué hace el bot, tres pasos para empezar con `/crear-lista` y `/config app`, qué permisos pide y por qué: consulta [Conceptos básicos](/docs/core-concepts/#the-permissions-ttm-asks-for). Nunca por mensaje directo. No se envía nada cuando el servidor no tiene canal del sistema, oculta ahí los avisos de entrada o el bot no puede escribir en él.
- **`/help` dice quién ve los comandos de configuración** — la página de Configuración ahora dice que Discord muestra los tres subcomandos de `/config` solo a quien tiene *Gestionar servidor*, y dónde puede cambiarlo un administrador.
- **`/config app` te avisa cuando la zona horaria sigue siendo la predeterminada** — una línea bajo la zona actual, hasta que elijas la de tu equipo.
- **Consejos en el estado del bot** — la línea bajo el nombre del bot cambia cada diez minutos.
- **El panel Más** termina con el pie de página, como todas las demás páginas.

## 1.0.1 — Traducciones revisadas

Released 2026-10-24

- **Español, portugués, francés y alemán, revisados por completo** — una palabra para cada función, un mismo tono en todo, y los nombres de los permisos tal como los muestra Discord. El español latinoamericano ahora dice *tú*, no *vos*.
- **Opciones de `/config webhook` con tildes** en los idiomas que las usan, como *acción*, *événement* o *löschen*: consulta [/config webhook](/docs/config-webhook/).

## 1.0.0 — Primera versión pública

Released 2026-10-23

La primera versión de Team Tasks Manager de **bitsplitters**. Lo que trae:

### Listas

- **Listas de tareas compartidas** — escribes una lista como texto sencillo, con tareas, subtareas y grupos de tareas: consulta [Primeros pasos](/docs/getting-started/#2-create-your-first-list).
- **El panel de botones** — una fila actúa sobre toda la lista, una fila de botones de tres estados sobre una sola tarea. Consulta [La lista en el canal](/docs/the-task-list/).
- **Limpiar lista** quita las tareas completadas, tras una confirmación que te dice cuántas son y qué se va con ellas: consulta [Limpiar lista](/docs/the-task-list/#clean-list).
- **Reabrir todo** devuelve todas las tareas completadas a pendientes, y puede mover los recordatorios a una fecha nueva: consulta [Reabrir todo](/docs/the-task-list/#reopen-all).
- **Sellar lista** conserva una lista terminada en el canal como registro, sin botones, y **Eliminar lista** la quita para siempre: consulta [Qué hay dentro de Más](/docs/the-task-list/#whats-inside-more).
- **Desbloquear lista** — una lista que se queda bloqueada, porque alguien cerró un formulario con la ✕, se desbloquea desde **Más**: consulta [Cuando la lista está bloqueada](/docs/the-task-list/#when-the-list-is-locked).
- **Propietarios** — el propietario de una tarea puede ser una persona, un rol o varias personas que comparten un rol que crea TTM (Premium): consulta [Propietarios y etiquetas](/docs/owners-and-tags/#owner-a-person-a-role-or-several-people).
- **Solo el propietario marca una tarea** — o un miembro del rol propietario, o quien tenga *Gestionar mensajes* en el canal. Consulta [Quién puede marcar una tarea](/docs/core-concepts/#who-can-tick-a-task).
- **Todos los errores de una actualización en bloque a la vez** — cuando una actualización en bloque no se puede guardar, un solo mensaje lista todos los problemas. Consulta [Cuando el texto no se puede guardar](/docs/writing-a-list/#when-the-text-cant-be-saved).
- **`/config lists`** muestra todas las listas del servidor, y regenera, sella o elimina varias a la vez: consulta [/config lists](/docs/config-lists/).

### Descarga e importación

- **Descargar** te envía la lista como un archivo `.txt`, en un mensaje que solo ves tú: consulta [Qué hay dentro de Más](/docs/the-task-list/#whats-inside-more).
- **Importa una lista desde un archivo** — la opción `archivo` de `/crear-lista` reconstruye una lista a partir de ese archivo, incluso en otro servidor: consulta [`/crear-lista`](/docs/commands/#create-list).

### Recordatorios

- **Los recordatorios** llegan al propietario de la tarea en el minuto exacto. Una persona recibe un mensaje directo, un rol una mención en el canal de la lista: consulta [Recordatorios](/docs/reminders/).
- **Los recordatorios recurrentes** (Premium) añaden un intervalo y repeticiones, y un servidor los activa en `/config app`: consulta [Recordatorios repetidos](/docs/reminders/#repeating-reminders).
- **Guarda solo lo que cambió** — en la tarjeta resumen de un recordatorio existente, **Guardar** se activa cuando cambias algo. Un recordatorio guardado sin cambios no envía ninguna notificación: consulta [Editar o quitar](/docs/channel-tasks/#editing-or-removing).
- **Los recordatorios se quedan hasta que los quitas** — TTM nunca quita un recordatorio por su cuenta. Uno cuyos avisos ya pasaron se queda en su tarea. Uno sin propietario o sin fecha, o que no se puede leer, detiene el guardado, y el mensaje nombra la tarea que hay que corregir: consulta [Leer un recordatorio en la tarea](/docs/reminders/#reading-a-reminder-on-the-task). Quitar el propietario de una tarea cuyo recordatorio aún no ha llegado te pide confirmación, porque el recordatorio se va con él.

### Planes, configuración y webhooks

- **El plan Free y Premium** — tras la beta, el plan Free tiene límites y Premium los levanta: consulta [Qué desbloquea Premium](/docs/premium/). Lo que construyes durante la beta: consulta [Cómo funciona la beta](/docs/beta/).
- **Configuración** — `/config app` fija las notificaciones, el historial de actividad, los recordatorios, la zona horaria y los permisos del servidor: consulta [/config app](/docs/configuration/).
- **Los webhooks** (Premium) envían una petición HTTP que defines cuando una tarea se completa o se reabre. Admiten tokens `{{ }}`, y solo direcciones `https` públicas: consulta [/config webhook](/docs/config-webhook/).
- **Avisado donde importa** — cuando TTM no puede publicar en el canal de una lista, se lo dice en privado a quien actuó. Un webhook que falla también recibe un aviso: consulta [El bot dice que falta un permiso](/docs/troubleshooting/#the-bot-says-a-permission-is-missing) y [Cuando un webhook falla](/docs/webhooks/#when-a-webhook-fails).
- **Interfaz localizada** — los textos del bot y algunos nombres de comandos aparecen en tu idioma: consulta [Nombres de los comandos en tu idioma](/docs/commands/#command-names-in-your-language). Este sitio funciona con la traducción de tu navegador.

---

<div class="callout"><div class="callout-t">Próximamente</div>Una vista de tareas solo del propietario y un panel de progreso están en camino. Esta página seguirá cada paso.</div>
