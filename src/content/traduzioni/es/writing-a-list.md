---
title: "Editar una lista a mano"
description: "Edita una lista escribiendo su texto, para cambiar muchas cosas a la vez o pegar una lista de otro sitio. Para todo lo demás usa los botones, que son más sencillos y evitan errores."
fonte: 7218c363e178
---

Esta página es para cuando prefieres cambiar tú el texto de una lista, en **Actualización en bloque** en el canal o en **Editar la lista** en la Activity.

Los botones hacen lo mismo sin errores: **Propietario**, **Etiqueta**, **Recordatorio** y **Webhook** escriben los códigos por ti, y TTM los comprueba sobre la marcha. Usa primero esos. El texto sirve para muchos cambios a la vez o para una lista que copias de otro sitio.

El guion y los espacios que forman tareas y subtareas están en [Crea tu primera lista](/docs/getting-started/#2-create-your-first-list). El mismo texto está en `/crear-lista`, en **Nueva lista** en la Activity y en el archivo que te da **Descargar**.

En el formulario **Contenido** de una sola tarea, el propietario, las etiquetas, el recordatorio y el webhook tienen sus propios botones: el formulario quita un propietario, un recordatorio o un webhook que escribas, y te lo dice.

<div class="howto"><div class="howto-t">Cómo se hace</div><div class="howto-grid"><a class="howto-go is-channel" href="/docs/the-task-list/#bulk-update"><span class="howto-k"><img class="place-ic" src="/icons/posto-canale.svg" alt="" />En el canal</span><span class="howto-d">Actualización en bloque, en la primera fila bajo la lista.</span></a><a class="howto-go is-activity" href="/docs/activity-list/#edit-the-list"><span class="howto-k"><img class="place-ic" src="/icons/activity.png" alt="" />En la Activity</span><span class="howto-d">Editar la lista, en la parte superior de la lista.</span></a></div></div>

## Resumen rápido

| Quieres | Escribes |
| :--- | :--- |
| [Una tarea](#tasks-and-subtasks) | `- Publicarlo` |
| [Una subtarea](#tasks-and-subtasks) | `  - Escribir las notas`, bajo su tarea |
| [Una tarea completada](#tasks-and-subtasks) | `- [X] Publicarlo` |
| [Mencionar a una persona](#mentioning-people-and-roles) | el botón **Etiqueta**, o `@Nombre` |
| [Una de dos personas con el mismo nombre](#mentioning-people-and-roles) | `@Nombre (usuario)` |
| [Mencionar a alguien nuevo](#writing-someone-new) | el botón **Etiqueta**, o `<@ID>` |
| [Mencionar un rol](#mentioning-people-and-roles) | el botón **Etiqueta**, o `@Rol` |
| [Escribir @ sin mención](#writing--without-a-mention) | `\@Nombre` |
| [Fijar el propietario](#owners-the-mention-with-a-colon) | el botón **Propietario**, o `@Nombre:` |
| [Fijar como propietario a alguien nuevo](#writing-someone-new) | el botón **Propietario**, o `<@ID>:` |
| [Enlazar un canal](#linking-channels) | `#canal` |
| [Añadir un enlace](#adding-a-hyperlink) | `[texto](https://url)` |
| [Enlazar un correo o un teléfono](#adding-a-hyperlink) | `[texto](mailto:nombre@example.com)`, `[texto](tel:+12025550100)` |
| [Mostrar el emoji de un botón](#button-emoji) | `:owner:`, `:reminder:`, `:content:`, `:more:`, `:activity:` |
| [Un recordatorio en una fecha](#reminders-in-the-text) | el botón **Recordatorio**, o `2026-12-08 18:00 [0m,0m,0]` |
| [Un recordatorio en otra zona horaria](#reminders-in-the-text) | `2026-12-08 18:00 America/New_York [0m,0m,0]` |
| [Un recordatorio dos días después de guardar](#reminders-in-the-text) | `[2d,0m,0]` |
| [Vincular un webhook](#webhooks-in-the-text) | el botón **Webhook**, o `{{wb=nombre}}` |

## Tareas y subtareas

```
- [X] Reservar los canales de voz
- [] Preparar los cuadros
  - [X] Recoger las inscripciones
  - [] Sortear los equipos
- [] Publicar las normas
```

- **Una línea que empieza por `-` es una tarea.**
- **Los espacios antes del guion la convierten en una subtarea** de la tarea de arriba. Una tarea con subtareas se convierte en un **grupo**.
- **La primera línea no puede ser una subtarea.**
- **La casilla va después del guion**: `[]` para una tarea pendiente, `[X]` para una completada. Cámbiala para marcar o desmarcar la tarea. Una línea nueva sin casilla es una tarea pendiente.
- **El título** puede tener hasta 90 caracteres.
- **La lista** puede tener hasta unos 4000 caracteres y 50 tareas, subtareas incluidas. Tras la beta, el plan Free permite 20 tareas: consulta [Qué desbloquea Premium](/docs/premium/).

## Personas, roles y canales por su nombre

En el texto, las personas, los roles y los canales se escriben por su nombre, tal como los muestra Discord: `@Ava`, `@Moderadores`, `#general`.

Al guardar, TTM convierte cada nombre en una mención, así que la lista avisa y enlaza como siempre. Cuando vuelves a abrir el formulario, los nombres vuelven.

La línea bajo el texto, en el canal y en la Activity, enlaza aquí para añadir a alguien nuevo: consulta [Escribir a alguien nuevo](#writing-someone-new).

## Mencionar a personas y roles

El botón **Etiqueta** añade las menciones por ti: consulta [Etiquetas](/docs/owners-and-tags/#tags). En el texto, escribe `@` y el nombre:

```
- Pedir a @Ava que revise las normas, luego avisar a @Moderadores
```

Estas menciones son las **etiquetas** de la tarea: cópialas, muévelas o quítalas como quieras.

- **Una persona** va por el nombre que muestra el servidor: su apodo en el servidor, si no su nombre visible, si no su nombre de usuario. Las mayúsculas y minúsculas no importan.
- **Por nombre escribes a las personas que la lista ya menciona.** Alguien nuevo se añade con el botón **Propietario** o **Etiqueta**, o con su código: consulta [Escribir a alguien nuevo](#writing-someone-new).
- **Un rol** es `@` y su nombre: `@Moderadores`. Sirve cualquier rol del servidor, incluso uno que la lista todavía no menciona.
- **Dos personas con el mismo nombre** aparecen con su nombre de usuario entre paréntesis: `@Mario (mario.rossi)` y `@Mario (mario_b)`. Escríbelas igual. Un nombre que coincide con más de una persona no se puede guardar, y el mensaje lista las formas que debes escribir.
- **Un nombre que TTM no conoce**, como `@elonmusk`, se queda como texto sin más. En el lugar del propietario es un error: consulta [Propietarios: la mención con dos puntos](#owners-the-mention-with-a-colon).

Gana el nombre más largo: con Mario y Mario Rossi en el servidor, `@Mario Rossi` es Mario Rossi. Un nombre cuenta solo como palabra completa, así que `@Leonardo` no es `@Leo` seguido de «nardo».

Algunas `@` nunca son un nombre:

- `@everyone` y `@here`;
- una `@` sola;
- una dirección de correo, como `ava@example.com`;
- cualquier cosa dentro de un enlace o entre comillas invertidas.

### Escribir a alguien nuevo

Los botones **Propietario** y **Etiqueta** eligen del propio menú de Discord, así que llegan a cualquiera del servidor sin ningún código.

En el texto, escribe el código de la persona donde iría el nombre: `<@`, su ID y `>`, como `<@123456789012345678>`. Solo, es una etiqueta; seguido de dos puntos, es el propietario. Hay dos formas de conseguirlo:

- en cualquier chat de Discord, escribe `\@` y el principio de su nombre, elígela en el menú y envía: el mensaje muestra su código, listo para copiar;
- con el **Modo desarrollador** activado (Ajustes de usuario → Avanzado), haz clic derecho en la persona → **Copiar ID de usuario**, y escribe el ID entre `<@` y `>`.

Guarda, y la próxima vez que se abra el formulario la persona aparecerá por su nombre.

### Escribir @ sin mención

Pon una barra invertida delante de un nombre que TTM conoce: `\@Ava` se queda como la palabra @Ava y no se menciona a nadie. `\#general` hace lo mismo con un canal.

Cualquier otra `@palabra` se queda como texto por sí sola, sin barra invertida. La excepción es el principio de una tarea, seguido de dos puntos, donde sería un propietario: escribe `\@palabra:`.

TTM conserva tu barra invertida. La lista muestra la palabra sin ella, y el formulario la vuelve a mostrar la próxima vez, para que distingas la palabra de la mención. TTM nunca añade una barra invertida por su cuenta.

## Propietarios: la mención con dos puntos

El botón **Propietario** fija por ti el propietario de una tarea: consulta [Propietario](/docs/owners-and-tags/#owner-a-person-a-role-or-several-people). En el texto, el propietario es una mención seguida de **dos puntos**, al principio de la tarea:

```
- @Ava: Publicar las notas de la versión
```

- **Un rol** funciona igual: `@Moderadores:`. También un código: `<@123456789012345678>:`.
- **Sin los dos puntos**, la misma mención es solo una etiqueta, no un propietario.
- **El nombre del propietario** va desde la `@` hasta los dos puntos, así que `@Ava Rossi:` es un error aunque TTM conozca a Ava.
- **Un nombre que TTM no conoce** es un error en el lugar del propietario. TTM no guarda nada, y el mensaje dice que elijas al propietario con el botón **Propietario** o que escribas su código.
- **Para empezar una tarea con `@palabra:` como texto sin más**, consulta [Escribir @ sin mención](#writing--without-a-mention). El formulario Contenido no tiene propietario, así que ahí `@palabra:` se queda como texto.

## Enlazar canales

Escribe `#` y el nombre del canal, como lo muestra la barra lateral:

```
- Especificaciones en #diseño, despliegue desde #lanzamientos
```

Sirve cualquier canal que puedas mencionar: de texto, de anuncios, de voz, de escenario, foros y canales multimedia, y los hilos activos. Las categorías no.

<div class="callout"><div class="callout-t">Un enlace de canal también sirve</div>Haz clic derecho en el canal de la barra lateral → <strong>Copiar enlace</strong> y pégalo en la tarea: TTM reconoce el enlace y <strong>lo acorta a una etiqueta de canal</strong>, que el formulario muestra después como <code>#nombre</code>. Los enlaces que apuntan a un <em>mensaje</em> concreto se dejan como están: siguen siendo enlaces en los que se puede hacer clic.</div>

## Añadir un enlace

Para enlaces a cualquier cosa fuera de Discord, usa Markdown estándar:

```
[nuestra hoja de ruta](https://example.com/roadmap)
```

La lista muestra **[nuestra hoja de ruta](https://example.com/roadmap)**: un enlace limpio en el que se puede hacer clic, en vez de una URL a secas.

El destino no tiene que ser una página web. Los enlaces `mailto:`, `tel:` y `sms:` funcionan igual, y abren la app del lector:

```
[el responsable de la versión](mailto:release@example.com)
[el teléfono de guardia](tel:+12025550100)
```

El primero convierte una tarea en un «escribe a esta persona» con un clic. El segundo llama directamente desde un teléfono.

Un enlace también puede apuntar a **otra lista**: haz clic derecho en su mensaje → **Copiar enlace del mensaje** y pégalo entre los corchetes. Los enlaces de mensaje se quedan como están: solo los enlaces de canal sin más se convierten en una etiqueta `#canal`.

## Emoji de los botones

Una tarea puede mostrar el emoji de un botón de la lista, como hacen las lecciones del [Tutorial](/docs/getting-started/#2-create-your-first-list). En el texto, cada uno de estos emoji se muestra como un nombre corto:

| Nombre | En el texto | Botón |
| :--- | :---: | :--- |
| `:owner:` | <img class="inline-ic" src="/icons/owner_blue.png" alt="" /> | **Propietario** <img class="inline-ic" src="/icons/owner.png" alt="" /> |
| `:reminder:` | <img class="inline-ic" src="/icons/alert_blue.png" alt="" /> | **Recordatorio** <img class="inline-ic" src="/icons/alertW.png" alt="" /> |
| `:content:` | <img class="inline-ic" src="/icons/task_blue.png" alt="" /> | **Contenido** <img class="inline-ic" src="/icons/task.png" alt="" /> |
| `:more:` | <img class="inline-ic" src="/icons/other_blue.png" alt="" /> | **Más** <img class="inline-ic" src="/icons/other.png" alt="" /> |
| `:activity:` | <img class="inline-ic" src="/icons/activity_blue.png" alt="" /> | **Activity** <img class="inline-ic" src="/icons/activity.png" alt="" /> |

Deja un nombre donde está y el emoji se queda. Escribe uno tú, en minúsculas, y la lista muestra el emoji del botón: útil cuando una tarea dice qué botón pulsar. Cualquier otra palabra entre dos puntos se queda como la escribiste.

## Recordatorios en el texto

El botón **Recordatorio** fija un recordatorio por ti y lo comprueba sobre la marcha: consulta [Recordatorios](/docs/reminders/). En el texto, un recordatorio es una fecha seguida de un triplete, antes del propietario:

```
- [] 2026-12-08 18:00 [2d3h,1h,3] @Ava: Publicar las notas de la versión
```

**La fecha** se escribe `AAAA-MM-DD HH:mm`, igual en todos los idiomas, en tu zona horaria: consulta [/my timezone](/docs/my-timezone/). Cambia la fecha y guarda, y el recordatorio se mueve. Solo la fecha justo antes de un triplete es un recordatorio: una fecha en cualquier otro sitio se queda como la escribiste.

- **Una fecha en otra zona** lleva la zona después de la hora: `2026-12-08 18:00 America/New_York`. Cuenta solo para esa fecha, y gana a cualquier otra zona: útil para conservar una hora que alguien te dio en la suya.
- **La zona** se indica por su nombre, como `Europe/Rome`, en mayúsculas o minúsculas, o como UTC o GMT con un desfase, como `GMT-5:30`.
- **Las abreviaturas** como CET o EST no se aceptan, porque la misma abreviatura significa zonas distintas en países distintos. La línea recibe una flecha.
- **Cuando el formulario se vuelve a abrir**, la fecha vuelve a estar en tu zona, en el mismo momento.
- **Una fecha con segundos** los muestra: `2026-12-08 18:00:30`.
- **Cuando termina el horario de verano**, los relojes pasan dos veces por una hora. Una fecha en esa hora lleva su desfase, como `2026-10-25 02:30 +02:00`, para distinguir las dos 02:30. Sin desfase, TTM toma la primera de las dos.
- **Cuando empieza el horario de verano**, los relojes se saltan una hora. Una fecha en esa hora no existe, y la línea recibe una flecha.

**El triplete** es `[distancia,intervalo,repeticiones]`:

- **La distancia** crea un recordatorio sin fecha absoluta: se cuenta desde el momento en que guardas la lista.
- **Las repeticiones** son los avisos posteriores al primero, así que la línea de la tarea muestra uno más: `[2d3h,1h,3]` es `↻1h ×4`. El máximo que permite un plan aquí es 49, 50 avisos en total.
- **Un evento único** usa el intervalo `0m` y `0` repeticiones: `[2d3h,0m,0]`.
- **La distancia y el intervalo** usan solo `d`, `h` y `m`. Un valor en meses, como `[1M,0m,0]`, se rechaza, y la línea recibe una flecha.

`1d` y `24h` no son lo mismo con un cambio de horario: `1d` conserva la misma hora del día, `24h` es exacto y puede desplazarse una hora. Consulta [Los campos de la repetición](/docs/reminders/#the-repetition-fields).

Las reglas son las del formulario de recordatorio, incluido cuántos recordatorios pueden esperar a la vez: consulta [Límites conocidos](/docs/known-limits/). Donde no se pueden crear recordatorios recurrentes nuevos, un triplete con repeticiones superiores a `0` se acepta solo para un recordatorio que la lista ya tenía, dentro de los límites de [Recordatorios repetidos](/docs/reminders/#repeating-reminders).

**Estos recordatorios no se pueden guardar**, y el mensaje nombra la tarea que hay que corregir:

- un recordatorio en una tarea **sin propietario**: los recordatorios van al propietario, consulta [Propietarios: la mención con dos puntos](#owners-the-mention-with-a-colon);
- un recordatorio **sin fecha** y con distancia cero, como `[0m,0m,0]` solo: su único aviso sería el momento en que guardas, que ya pasó;
- un recordatorio **que no se puede leer**: un número demasiado grande, como `[1h,1d,99999999999]`.

**Un recordatorio mal escrito recibe una flecha**, como una línea sin guion. TTM no adivina cuál querías decir:

- dos fechas o dos tripletes en una línea;
- una fecha sin su triplete, o un recordatorio sin texto de tarea;
- una fecha que no existe, como `2026-02-30 10:00`;
- una fecha en otra forma, como `30/11/2026 18:00`.

Estas comprobaciones se aplican solo a las líneas que cambias. Reescribir toda la lista comprueba las líneas que añades o editas, y el texto de una sola tarea comprueba esa tarea. Una lista nueva, un clon y una importación comprueban todas las líneas.

## Webhooks en el texto

El botón **Webhook** vincula un webhook a una tarea por ti: consulta [Webhooks](/docs/webhooks/). En el texto, el vínculo es un token reservado delante del texto de la tarea:

```
- [] {{wb=deploy}} Publicar las notas de la versión
```

Puedes moverlo, copiarlo a otra tarea o borrarlo, como una mención. El token nunca se muestra en la lista. Una tarea con el token necesita además algo de texto.

`wb` es la única clave reservada. Cualquier otro `{{clave=valor}}` en el texto de una tarea es una **variable libre**, que el webhook puede usar: consulta [Tokens](/docs/config-webhook/#tokens).

## Los códigos detrás de los nombres

Discord guarda **ID**, no nombres: números largos que nunca cambian. Detrás de cada nombre del texto hay un código, y la lista conserva los códigos, en su mensaje, en sus notificaciones y en el archivo de Descargar.

| En el texto | El código que hay detrás |
| :--- | :--- |
| `@Ava` | `<@123456789012345678>` |
| `@Moderadores` | `<@&987654321098765432>` |
| `#general` | `<#111222333444555666>` |
| `2026-12-08 18:00` en UTC, antes de un triplete | `<t:1796752800>`, la fecha en segundos |

Todavía puedes escribir o pegar los códigos: TTM los guarda tal cual. Un archivo de Descargar, o un texto escrito antes de los nombres, funciona como está.

Cuando alguien cambia su nombre en Discord, el formulario muestra el nuevo. Nada de lo guardado se rompe, porque la lista conserva el ID.

Un código se queda en el texto en unos pocos casos:

- dos roles con el mismo nombre, o dos canales con el mismo nombre: los códigos los distinguen;
- una persona cuyo nombre Discord no envió a tiempo cuando se abrió el formulario. Deja el código como está: la mención se mantiene.

## Todo junto

Una sola tarea puede combinar todo esto:

```
- @Ava: Revisar las notas de la versión en #lanzamientos, avisar a @Moderadores al terminar — preguntas a [el responsable de la versión](mailto:release@example.com)
```

## Cuando el texto no se puede guardar

Si TTM no puede leer una línea, te devuelve tu texto con una **flecha** en cada línea incorrecta, desde una línea sin guion hasta un recordatorio mal escrito. El mensaje dice qué escribir, y enlaza a la parte de esta página que lo explica.

En los demás casos, **un solo mensaje lista todos los problemas a la vez**, uno por párrafo: una lista demasiado larga, un recordatorio que supera un límite o sin propietario. Corrígelos todos y guarda de nuevo.

Un recordatorio cuyos avisos están todos en el pasado no impide guardar: se queda en su tarea. Consulta [Leer un recordatorio en la tarea](/docs/reminders/#reading-a-reminder-on-the-task).

Otros dos casos no guardan nada, y TTM te lo dice:

- TTM no puede llegar al servidor en Discord cuando guardas: inténtalo de nuevo en un momento;
- un formulario abierto durante más de seis horas no puede volver a leer sus nombres: ábrelo de nuevo desde la lista.
