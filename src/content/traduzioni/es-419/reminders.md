---
title: "Recordatorios"
description: "Asocia un horario a una tarea para que TTM avise a su propietario a tiempo: quién lo recibe, zonas horarias, repeticiones."
fonte: e9b5187d37f5
---

Un recordatorio convierte una tarea en algo que te recuerda *a ti*, en lugar de al revés. Lo configuras una vez; TTM se encarga de los avisos. Se agrega con **Recordatorio** <img class="inline-ic" src="/icons/alertW.png" alt="" />: en el canal, en la segunda fila bajo la lista; en la Activity, en el panel de una tarea.

<div class="howto" id="how-to-do-it"><div class="howto-t">Cómo se hace</div><div class="howto-grid"><a class="howto-go is-channel" href="/docs/channel-tasks/#reminder"><span class="howto-k"><img class="place-ic" src="/icons/posto-canale.svg" alt="" />En el canal</span><span class="howto-d">Recordatorio, en la segunda fila bajo la lista: el formulario Cuándo y la tarjeta de resumen.</span></a><a class="howto-go is-activity" href="/docs/activity-list/#reminder"><span class="howto-k"><img class="place-ic" src="/icons/activity.png" alt="" />En la Activity</span><span class="howto-d">Recordatorio, en el panel de una tarea: fecha, hora, zona horaria y repeticiones juntas.</span></a></div></div>

## Las reglas

- **Un recordatorio tiene una fecha, una hora y una zona horaria.** Se envía **una sola vez**, a menos que tu servidor use [recordatorios repetidos](#repeating-reminders), una función Premium.
- **El inicio debe estar al menos 5 minutos en el futuro.** El formulario parte de diez minutos desde ahora, así que un recordatorio para «en un momento» no necesita escribir nada.
- **Solo una tarea pendiente puede tener uno.** Completar una tarea detiene su recordatorio: no hace falta limpiar después.
- **El recordatorio va al propietario de la tarea**, por mensaje directo si el propietario es una persona. Si la tarea aún no tiene propietario, **te conviertes en él** al guardar el recordatorio. Desde entonces, solo tú y quien tenga *Gestionar mensajes* en el canal pueden marcar esa tarea. Para dársela a otra persona, fija el propietario antes o después de crear el recordatorio: consulta [Propietarios y etiquetas](/docs/owners-and-tags/).
- **No cambia nada hasta que guardas.** Cuando editas un recordatorio, Guardar se queda apagado hasta que cambies la fecha o la recurrencia.
- **Quitar el propietario quita el recordatorio**, porque no queda nadie que lo reciba.

¿No llegó nada? El propietario debe aceptar mensajes directos de los miembros de ese servidor: consulta [Recordatorios por mensaje directo](/docs/known-limits/#reminders-by-direct-message).

## Tu zona horaria

TTM necesita un nombre oficial de zona horaria como `Europe/Rome`. Busca el tuyo en el **[mapa de zonas horarias](https://timezones.bitsplitters.app)**: selecciona tu zona en el mapa, copia el valor y pégalo en el campo. La Activity también te permite buscar por ciudad o país.

<div class="callout"><div class="callout-t">Elige tu zona horaria</div>Usa <a href="/docs/my-timezone/"><strong>/my timezone</strong></a> en cualquier servidor, o el engranaje de la Activity, y TTM te propondrá <strong>tu</strong> zona en todas partes, en el canal y en la Activity. Hasta que elijas una, TTM la aprende: la zona que dejes en un recordatorio pasa a ser la tuya. Con una zona propia, una zona distinta en un recordatorio vale solo para esa fecha. Los recordatorios que escribes en el texto de una lista usan la misma zona.</div>

## Cómo llega el recordatorio

Cuando llega la hora, TTM avisa al propietario de la tarea. El recordatorio muestra la tarea, la fecha para la que estaba fijado y un botón que salta directamente a la lista.

- Si el propietario es una **persona**, el recordatorio es un **mensaje directo**.
- Si el propietario es un **rol**, es un **mensaje en el canal de la lista** que menciona al rol, como respuesta a la lista. Discord avisa a todos los que tienen ese rol y pueden ver el canal.

En ambos casos, llega **en unos diez segundos** de la hora programada, y siempre en el minuto correcto. TTM reparte los envíos para respetar los límites de Discord. Con las [Notificaciones push legibles](/docs/configuration/#readable-push-notifications) desactivadas, llega igualmente, sin el texto plano que hace legibles las vistas previas del teléfono.

Un mensaje directo puede ser rechazado, y entonces TTM espera unas horas antes de volver a intentarlo con esa persona: consulta [Recordatorios por mensaje directo](/docs/known-limits/#reminders-by-direct-message).

### ¿No quieres recordatorios por mensaje directo?

Lo decides tú, desde la propia configuración de Discord:

- **Conservarlos, sin aviso.** Haz clic derecho en tu conversación con TTM y elige *Silenciar*. Los recordatorios siguen llegando, en silencio.
- **Detenerlos.** Haz clic en el nombre del servidor, después en *Configuración de privacidad*, y desactiva *Mensajes directos*. Esto detiene los mensajes directos de todos los miembros de ese servidor, no solo de TTM.
- **Pasar la tarea a otra persona.** Pide a quien gestiona la lista que dé la tarea a otra persona, con **Propietario** <img class="inline-ic" src="/icons/owner.png" alt="" />.

Silenciar el servidor no basta: silencia los canales del servidor, no tus mensajes directos.

Un rol recibe aviso solo si se le puede mencionar. Cuándo ocurre eso, y qué pasa con @everyone o con un rol eliminado: consulta [Recordatorios a un rol](/docs/known-limits/#reminders-to-a-role).

## Recordatorios repetidos

Por defecto, cada recordatorio es un **evento único**: un aviso, y nada más que decidir. Las repeticiones son una función [Premium](/docs/premium/): en el plan Free, cada recordatorio es único. En un plan que las incluye siguen siendo opcionales: una persona que gestiona el servidor activa **Recordatorios recurrentes** en [/config app](/docs/configuration/#recurring-reminders). Hasta entonces, solo un recordatorio que ya es recurrente muestra los menús de repetición.

<div class="callout"><div class="callout-t">Los recordatorios recurrentes que ya tienes siguen funcionando</div>Un recordatorio que ya era recurrente sigue enviándose en el plan Free, y en Premium con el interruptor desactivado: puedes cambiar su fecha, moverlo a otra tarea o reducir el número de veces que llega, pero no aumentarlo. Clonar o importar una lista crea recordatorios nuevos, así que donde no se pueden crear recordatorios recurrentes nuevos, una clonación o una importación rechaza uno recurrente: clona sin recordatorios, o pon sus repeticiones a <code>0</code>.</div>

### Los campos de repetición

Hay tres menús, en el canal y en la Activity, así que no hay nada que escribir ni un formato en el que equivocarse.

| Menú | Significado | Opciones |
| :--- | :--- | :--- |
| **Cuántas veces, en total** | Cuántos avisos envía el recordatorio, **el primero incluido**. **1 vez** es un recordatorio único. El máximo es 50 en Premium. Donde los recordatorios recurrentes no pueden crecer, en el plan Free o con el interruptor desactivado, el menú se detiene en el número que el recordatorio ya tiene, y el formulario dice por qué. | de 1 a 10, después de 15 a 50 de 5 en 5 |
| **Cada** | El tiempo entre dos avisos, en la unidad del menú siguiente. No cuenta con **1 vez**. | de 1 a 10, 12, 14, después de 15 a 50 de 5 en 5, 60 y 90 |
| **Unidad** | Minutos, horas o días. No hay semanas ni meses: una semana son 7 días. | minutos, horas, días |

Al pasar de una vez a más, **Cada** parte de 1 día. Los menús siempre ofrecen los valores que el recordatorio ya tiene, aunque no estén en la lista:

- un recordatorio escrito en el texto de una lista puede ejecutarse 37 veces, o cada 48 horas;
- uno que ya se ejecuta más de 50 veces conserva su número;
- un intervalo que mezcla unidades, como `1d12h`, se muestra en su unidad más pequeña, 36 horas: deja **Cada** y **Unidad** como están y se queda en `1d12h`.

<div class="callout"><div class="callout-t">Horario de verano: el detalle que importa</div>En el menú <strong>Unidad</strong>, los <strong>días</strong> mantienen la <strong>misma hora de reloj</strong> a través de un cambio de horario, por ejemplo siempre las 09:00. Las <strong>horas</strong> son <strong>exactas</strong>: cada 24 horas puede desplazarse una hora tras el cambio de horario. Elige la que coincida con lo que quieres decir.</div>

## Leer un recordatorio en la tarea

En la línea de la tarea, el recordatorio muestra siempre la fecha del **primer** aviso, representada por Discord en la hora local de cada lector. Un recordatorio repetido agrega dos valores compactos:

`↻` intervalo · `×` veces en total

Así, `↻1h ×4` significa cuatro avisos, uno por hora, el primero incluido. Un evento único muestra **solo la marca de tiempo**: no hay insignia, porque no hay nada que repetir.

TTM nunca quita un recordatorio por sí mismo. Un recordatorio cuyos avisos están todos **en el pasado** se queda en su tarea, como registro. No envía nada más y no cuenta entre los recordatorios pendientes. Para configurarlo de nuevo, elige una fecha nueva: hasta entonces, Guardar se queda apagado.

En el texto de una lista, el mismo recordatorio es una fecha en tu zona horaria y un trío de valores, como `2026-12-08 18:00 [0m,0m,0]`: consulta [Recordatorios en el texto](/docs/writing-a-list/#reminders-in-the-text).

## Errores frecuentes

Varios de estos vienen del formulario **Cuándo** del canal, donde escribes la fecha, la hora y la zona. En la Activity los eliges en menús, así que ahí no pueden fallar.

| Mensaje | Qué corregir |
| :--- | :--- |
| *Recordatorio no válido* | El inicio debe estar al menos 5 minutos en el futuro. |
| *Una tarea completada no puede tener recordatorio* | Desmarca antes la tarea, si aún está pendiente; o elige una tarea que no esté marcada. |
| *La fecha no existe* | Comprueba juntos día, mes y año (por ejemplo, 31 de febrero). |
| *Hora no válida* | Usa el formato de 24 horas `HH:mm`, por ejemplo `15:30`. |
| *Por encima del plan* o *Por encima de lo permitido* | Aquí no están disponibles los recordatorios recurrentes: en el plan Free, o desactivados en `/config app`. Un recordatorio que ya era recurrente puede conservar el número de veces que llega o bajarlo. Lo ves si el plan o la opción cambiaron mientras el formulario estaba abierto: abre las repeticiones de nuevo. |
| *Zona horaria incorrecta* | El nombre no coincide con una zona oficial: cópialo del mapa de zonas horarias. |

¿No llegó un recordatorio, o falló otra cosa? Consulta las [FAQ](/docs/troubleshooting/#reminders).
