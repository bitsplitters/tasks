---
title: "FAQ"
description: "Preguntas frecuentes: respuestas rápidas a los problemas más comunes, cada una con un enlace a la página que lo explica por completo."
fonte: c80b5664452a
---

Busca abajo el problema que tienes. Cada respuesta es breve y te lleva a la página que lo explica por completo. Los problemas de la lista están divididos por lugar: [en el canal](#in-the-channel) y [en la Activity](#in-the-activity).

La búsqueda funciona con palabras en español: prueba *marcar*, *propietario*, *recordatorio*.

## En el canal

### No encuentro el comando `/crear-lista`

Discord muestra cada comando en el idioma de tu app de Discord. En español el comando es `/crear-lista`, en inglés `/create-list`. Todos los nombres traducidos están en [Nombres de los comandos en tu idioma](/docs/commands/#command-names-in-your-language).

### No puedo marcar una tarea

Revisa estos puntos, por orden:

- **Un botón de la segunda fila está azul o rojo.** Haz clic en él hasta que quede apagado. Mientras un botón está activo, elegir una tarea aplica la acción de ese botón. Consulta [El menú de marcado](/docs/the-task-list/#the-check-selector).
- **La tarea tiene un propietario.** Solo pueden marcarla el propietario, los miembros del rol propietario y quien tenga *Gestionar mensajes* en el canal. Consulta [Quién puede marcar una tarea](/docs/core-concepts/#who-can-tick-a-task).
- **El menú está desactivado.** Alguien está editando la lista, así que está bloqueada: consulta [He pulsado Cancelar y la lista sigue bloqueada](#i-pressed-cancel-and-the-list-stays-locked) más abajo.
- **El bot dice *No tienes permiso para usar esta función en este servidor*.** Tu servidor ha sincronizado sus permisos y para ti la lista es de solo lectura. Pídeselo a un administrador y consulta [Sincronizar permisos](/docs/configuration/#sync-permissions).
- **La beta ha terminado y tu servidor está en el plan Free.** Cuando todas las plazas de tu plan están ocupadas, una lista que no ocupa ninguna rechaza el marcado. Una lista creada durante la beta es la excepción: sus tareas se pueden seguir marcando. Consulta [Cómo funcionan las tres plazas](/docs/premium/#how-the-three-places-work) y [Qué conserva una lista de la beta](/docs/beta/#what-a-beta-list-keeps).

### He pulsado Cancelar y la lista sigue bloqueada

TTM bloquea una lista mientras alguien la edita, y cerrar el formulario con **Cancelar** o con la ✕ no la desbloquea, porque Discord no se lo comunica al bot. Cualquiera puede desbloquearla: abre **Más** bajo la lista y pulsa **Desbloquear lista** <img class="inline-ic" src="/icons/unlock.png" alt="" />. Consulta [Cuando la lista está bloqueada](/docs/the-task-list/#when-the-list-is-locked).

### Mis etiquetas o mi propietario no se han guardado

Los menús **Etiqueta** y **Propietario** esperan a que confirmes tu elección. En el móvil, toca **Guardar** bajo el menú abierto. En el ordenador no hay botón Guardar: haz clic en cualquier punto fuera del menú y, al cerrarse, se aplica tu elección. Consulta [Confirmar una selección](/docs/channel-tasks/#confirming-a-selection--desktop-vs-mobile).

Con **Mantener el estado tras la selección** desactivado (el valor por defecto), elige primero a las personas y después la tarea. Consulta [Etiqueta](/docs/channel-tasks/#tag).

Si una tarea ha pasado a ser tuya en lugar de ir a las personas que habías elegido, el menú todavía estaba vacío cuando elegiste la tarea: con el menú vacío, **Propietario** te da la tarea a ti. Para arreglarlo:

1. Haz clic en **Propietario** hasta que esté rojo y elige la tarea, para quitar el propietario.
2. Haz clic en **Propietario** hasta que esté azul, elige a las personas y confirma.
3. Elige la tarea otra vez.

### Quiero dar una tarea a varias personas

Haz clic en **Propietario** hasta que se ponga azul. En el menú bajo los botones, con el texto *Elige una tarea en el menú de arriba para tomarla, o elige a quién dársela*, elige a las personas. Confirma tu elección y después elige la tarea. TTM crea un rol para esas personas y lo pone como propietario. En la Activity, elígelas en el panel de la tarea: consulta [Propietario](/docs/activity-list/#owner).

Es una función [Premium](/docs/premium/). El bot necesita el permiso *Gestionar roles*: un administrador se lo concede al rol del bot en *Ajustes del servidor → Roles*, no en un canal. Consulta [Propietario: una persona, un rol o varias personas](/docs/owners-and-tags/#owner-a-person-a-role-or-several-people).

### He eliminado por error el mensaje de la lista

Los datos de la lista siguen en TTM y sus recordatorios siguen llegando. Ejecuta `/config lists` y pulsa el botón de esa lista hasta que se ponga azul (**regenerar**). Después pulsa **Aplicar** y confirma. TTM vuelve a publicar la lista en su canal, con el mismo contenido y el mismo historial. Consulta [Regenerar](/docs/config-lists/#regenerate).

## En la Activity

### La Activity no se abre

Revisa estos puntos, por orden:

- **El primer botón bajo la lista sigue siendo Clonar lista.** La lista se publicó antes de que llegara la Activity: tendrá el botón de la Activity la próxima vez que cambie.
- **El botón de la Activity está apagado.** Alguien está editando la lista en el canal. El botón se enciende cuando la lista se desbloquea: consulta [Cuando la lista está bloqueada](/docs/the-task-list/#when-the-list-is-locked).
- **El bot dice que necesitas *Usar actividades*.** Es un permiso de Discord en el canal, y un administrador del servidor te lo activa en los *Permisos* del canal.
- **El bot dice *Todavía no veo la Activity*.** Puede que tu app de Discord no admita la Activity. Actualízala o prueba con otro dispositivo.

Consulta [Cuando la lista no se abre](/docs/activity/#when-the-list-doesnt-open).

### La lista solo muestra Entrar en la Activity

La lista está en la [Activity](/docs/activity/) y, mientras esté allí, no se puede cambiar en el canal. Pulsa **Entrar en la Activity** para trabajar en ella con los demás. Cuando todos salen, la lista vuelve al canal con todos sus botones. Consulta [Únete a los demás](/docs/activity/#join-the-others).

### No puedo marcar una tarea en la Activity

TTM te dice por qué. Normalmente:

- **La tarea tiene un propietario.** Lo dice un globo sobre la casilla. La regla es la misma que en el canal: consulta [Quién puede marcar una tarea](/docs/core-concepts/#who-can-tick-a-task).
- **Alguien está editando esa tarea.** Al tocar su casilla ves quién. Las demás tareas siguen libres.
- **Alguien está editando toda la lista** con **Editar la lista**. La línea bajo la lista dice quién, y las casillas vuelven cuando termine. Consulta [Quién está editando qué](/docs/activity-list/#who-is-editing-what).
- **La base de datos no responde.** Lo dice una franja y la lista es de solo lectura hasta que vuelva: consulta [Cuando la base de datos no responde](/docs/activity/#when-the-database-isnt-responding).

### La lista tarda en volver de la Activity

La Activity se ha cerrado sin pulsar **Salir**. Para TTM, una ventana cerrada se parece a una conexión que se ha caído un momento: espera 30 segundos a que vuelvas y después devuelve la lista al canal. Con un teléfono en segundo plano o bloqueado puede tardar hasta un minuto, porque el bot primero tiene que darse cuenta de que la página ha dejado de responder.

**Salir** le dice al bot al instante que has terminado: si eres la última persona en la lista, vuelve al canal enseguida. Consulta [Volver al canal](/docs/activity/#back-to-the-channel).

### La Activity se recarga cuando cambio el tema de Discord

Cuando cambias el tema de Discord, este recarga la Activity por su cuenta, a veces hasta un minuto después: TTM no puede evitarlo. La lista vuelve sola en un momento, con el tema que tenías.

Si tu tema era **Igual que Discord**, pasa a ser el tema que estabas viendo. Para volver a seguir a Discord, elige **Igual que Discord** con el engranaje: consulta [Tus ajustes](/docs/activity/#your-settings).

Tras una recarga, **Salir** te saca igualmente de la lista, pero por un error de Discord no puede cerrar la ventana: ciérrala desde Discord.

## Recordatorios

### Mi recordatorio no ha llegado

- **El recordatorio va al propietario de la tarea.** Eres tú solo si la tarea no tenía propietario cuando lo configuraste. Una persona recibe un mensaje directo, y un rol recibe una mención en el canal de la lista. Consulta [Las reglas](/docs/reminders/#the-rules).
- **El propietario debe permitir los mensajes directos de los miembros del servidor**, en los *Ajustes de privacidad* del servidor. Consulta [Recordatorios por mensaje directo](/docs/known-limits/#reminders-by-direct-message).
- **El propietario es un rol que no se puede mencionar.** El recordatorio aparece en el canal, pero nadie recibe una notificación. Consulta [Recordatorios a un rol](/docs/known-limits/#reminders-to-a-role).
- **El rol propietario se ha eliminado.** El recordatorio no se envía a nadie. Elige otro propietario para la tarea. Consulta [Recordatorios a un rol](/docs/known-limits/#reminders-to-a-role).
- **TTM no puede escribir en el canal de la lista.** Consulta [Los permisos que pide TTM](/docs/core-concepts/#the-permissions-ttm-asks-for).
  - Un rol que TTM ha creado para varias personas: cada una recibe el recordatorio por mensaje directo, con el motivo.
  - Cualquier otro rol: el recordatorio no se entrega hasta que un administrador conceda el permiso.
- **Se ha quitado al propietario, o la lista se ha sellado.** En estos casos el recordatorio desaparece. Antes de quitar a un propietario cuyo recordatorio aún no ha llegado, TTM te pide que confirmes. Consulta [Propietarios y etiquetas](/docs/owners-and-tags/) y [Sellar](/docs/config-lists/#seal).
- **La tarea está marcada.** Completar una tarea detiene su recordatorio, y una tarea marcada no puede recibir uno nuevo.

### Quiero un recordatorio semanal

TTM no tiene una unidad para semanas, así que una semana son 7 días. Primero, un administrador activa **Recordatorios recurrentes** en [`/config app`](/docs/configuration/#recurring-reminders) (una función [Premium](/docs/premium/)).

En el canal:

1. Haz clic en **Recordatorio** hasta que se ponga azul, elige la tarea y envía el formulario **Cuándo**.
2. En la tarjeta que aparece, pulsa **Editar recurrencia**.
3. Elige **Cada** 7 y **Unidad** días, y en **Cuántas veces, en total** el número de semanas, por ejemplo 4 para cuatro semanas. Después envía el formulario.
4. Pulsa **Guardar** en la tarjeta.

En la Activity, toca el texto de la tarea y después **Recordatorio**: los mismos tres menús están en el panel, bajo la fecha. Elígelos y toca **Guardar**.

Consulta [Los campos de la repetición](/docs/reminders/#the-repetition-fields).

## Planes y permisos

### No puedo crear una lista, o el bot dice que libere una plaza

Durante la beta no hay ningún límite de listas. Después, el plan Free te permite trabajar con tres listas a la vez, y TTM rechaza una cuarta hasta que selles o elimines una: consulta [Qué pasa con una cuarta lista](/docs/premium/#what-happens-to-a-fourth-list).

### ¿Quién puede sellar o eliminar una lista?

En el panel **Más** de una lista, **Sellar lista** y **Eliminar lista** solo los ven los miembros con *Gestionar mensajes* en el canal. En `/config lists` se aplica la regla de `/config`: por defecto, los miembros con *Gestionar servidor*. Consulta [Qué hay dentro de Más](/docs/the-task-list/#whats-inside-more) y [Quién puede abrir /config](/docs/config/#who-can-open-config).

### No encuentro el comando `/config`

Por defecto, solo los miembros con el permiso *Gestionar servidor* ven `/config`. Un administrador puede abrirlo a tu rol en *Ajustes del servidor → Integraciones → Team Tasks Manager*. Consulta [Quién puede abrir /config](/docs/config/#who-can-open-config).

### El bot dice que falta un permiso

Hay dos casos distintos:

- **Al bot le falta un permiso.** Su mensaje nombra el permiso y los pasos para concederlo. Cuando el bot no puede escribir en el canal de la lista, el mensaje te llega solo a ti, y como máximo una vez por hora. Para qué sirve cada permiso: [Los permisos que pide TTM](/docs/core-concepts/#the-permissions-ttm-asks-for).
- **Tú no tienes permiso para usar una función.** Esta regla la fijan los administradores del servidor, no el bot. Consulta [Sincronizar permisos](/docs/configuration/#sync-permissions).

---

¿Sigues sin resolverlo? Pregúntanos en el [servidor de Discord](/docs/community/). Unos pasos claros y una captura de pantalla nos ayudan a responder rápido.
