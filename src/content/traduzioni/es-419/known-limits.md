---
title: "Límites conocidos"
description: "Los topes de listas, tareas, recordatorios y más: la mayoría vienen de Discord, y cómo trabajar dentro de ellos."
fonte: a9ff3dff4029
---

Team Tasks Manager funciona por completo dentro de Discord, así que la mayoría de los límites de abajo no son una decisión de TTM. Vienen de Discord. Por ejemplo: cuánto puede durar un mensaje, cuántos menús caben en un mensaje, hasta cuánto tiempo atrás se pueden eliminar mensajes en bloque. Cuando un límite es de Discord, lo decimos.

## Listas y tareas

| Límite | Valor | Por qué |
| :--- | :--- | :--- |
| Listas en uso por servidor | **3** con el plan Free | Consulta [Cómo funcionan los tres lugares](/docs/premium/#how-the-three-places-work). |
| Caracteres por lista | **4000** | La lista entera se edita dentro de un único campo de Discord, y Discord limita ese campo a 4000 caracteres. Cuenta *todo lo que se ve*: el texto de las tareas, las casillas, la hora de un recordatorio y un salto de línea por fila, no solo lo que escribes. TTM deja un pequeño margen de seguridad por debajo del límite máximo. |
| Elementos por lista | **50** (tareas + subtareas) | Discord permite 5 filas de componentes por mensaje y hasta 25 opciones por menú desplegable. TTM reserva filas para los botones de acción, y eso deja espacio para 50 elementos seleccionables en total, subtareas incluidas. Tu plan puede fijar un tope menor: consulta [Qué desbloquea Premium](/docs/premium/). |
| Título de la lista | **90** caracteres | Las ventanas de creación, edición y clonación no te dejan escribir más. El título también da nombre al menú de la lista y a su hilo del historial, que Discord mantiene cortos. |
| Archivo importado | `.txt`, hasta **64 KB** | `/crear-lista` solo importa el archivo que genera **Descargar**. Qué más revisa: consulta [`/crear-lista`](/docs/commands/#create-list). |

<div class="callout"><div class="callout-t">¿Llegaste a un tope?</div>Reparte el trabajo en varias listas. Dos listas enfocadas se leen mejor que una al máximo, y cada una tiene sus propios recordatorios, propietarios y etiquetas.</div>

**Descargar siempre te da un archivo.** Un mensaje normal de Discord está limitado a 2000 caracteres. Por eso **Descargar**, en el panel **Más** <img class="inline-ic" src="/icons/other.png" alt="" /> debajo de la lista en el canal, nunca publica la lista como texto.

Te envía un archivo `.txt` solo a ti, en un mensaje que solo tú puedes ver. Es el mismo archivo que `/crear-lista` puede volver a importar.

**Eliminar el mensaje no es lo mismo que eliminar la lista.** La lista conserva su lugar y sus recordatorios siguen llegando: consulta [Qué pasa con una cuarta lista](/docs/premium/#what-happens-to-a-fourth-list).

## Recordatorios

| Límite | Valor | Por qué |
| :--- | :--- | :--- |
| Recordatorios en espera a la vez | **10** con el plan Free | Consulta [Qué desbloquea Premium](/docs/premium/). |
| Repeticiones por recordatorio | **hasta 50** con Premium, ninguna con Free | Los recordatorios recurrentes son una función Premium: con el plan Free cada recordatorio es un evento único. Con Premium un recordatorio puede llegar como máximo 50 veces en total, la primera incluida; elige **1 vez** para un recordatorio único. En el texto de una lista, en **Actualización en bloque** o en **Editar la lista**, la tripleta cuenta las repeticiones después de la primera: como máximo 49. |
| Qué tan pronto puede enviarse un recordatorio | **5 minutos** a partir de ahora | La fecha de inicio debe estar al menos cinco minutos en el futuro, para que el planificador tenga tiempo de tomarlo. |
| Qué tan puntual es un recordatorio | alrededor de **10 segundos** | Los recordatorios que vencen a la vez se reparten en un máximo de diez segundos, para respetar los límites de Discord. El recordatorio llega igualmente en el minuto correcto. |

Las repeticiones solo se ofrecen con un plan que incluye recordatorios recurrentes, y solo cuando **Recurrentes activados** está seleccionado en [/config app](/docs/configuration/#recurring-reminders). Por defecto cada recordatorio es un evento único. Los recordatorios recurrentes que ya tienes siguen enviándose en cualquier caso: consulta [Recordatorios repetidos](/docs/reminders/#repeating-reminders).

### Recordatorios por mensaje directo

El recordatorio de una persona llega por mensaje directo, así que depende de la configuración de mensajes directos del propietario. Si el propietario no acepta mensajes directos de los miembros del servidor, Discord rechaza el mensaje y ese recordatorio no llega. Pasa lo mismo si el propietario ya no comparte ningún servidor con el bot.

Para aceptar mensajes directos de los miembros de un servidor, haz clic en el nombre del servidor y luego en *Configuración de privacidad*.

Después de un mensaje rechazado, TTM lo recuerda y no vuelve a intentarlo con esa persona durante **6 horas**. Pasado ese tiempo lo intenta de nuevo, y el primer mensaje directo que llega borra la pausa.

### Recordatorios a un rol

Cuando el propietario de una tarea es un rol, el recordatorio es un mensaje en el canal de la lista que menciona al rol. Discord convierte la mención en una notificación solo en uno de estos casos:

- el rol permite que cualquiera lo mencione: en *Configuración del servidor → Roles*, el rol puede ser mencionado con @ por cualquiera;
- el bot tiene el permiso *Mencionar @everyone, @here y todos los roles* en el canal de la lista. El enlace de invitación lo concede.

Si no, el mensaje aparece en el canal y nadie recibe una notificación. TTM te avisa cuando configuras un recordatorio así. También te avisa cuando conviertes un rol así en propietario de una tarea con un recordatorio.

- **@everyone como propietario**: solo cuenta el permiso del bot.
- **Un rol creado por TTM** para varios propietarios nace mencionable. Sus recordatorios lo notifican incluso sin el permiso, salvo que alguien desactive ese ajuste.
- **Un rol eliminado** no recibe ningún recordatorio. TTM te lo dice, y la solución es elegir otro propietario.

En cualquier caso, solo se notifica a los miembros que pueden ver el canal de la lista.

## Propietarios y etiquetas

Cada tarea tiene **un propietario**: una persona o un rol. Con Premium también pueden ser hasta 25 personas, que comparten un rol que TTM crea para ellas. 25 es el máximo del menú de propietarios.

Una tarea puede llevar **hasta 25 etiquetas**, los usuarios o roles a notificar: 25 es el máximo de Discord para un menú.

**Los roles que crea TTM cuentan dentro de los 250 roles por servidor de Discord.** Al llegar a 250 roles, TTM no puede crear otro y lo dice. Cuándo elimina TTM sus roles: consulta [Los roles que crea TTM](/docs/owners-and-tags/#the-roles-ttm-creates).

**TTM ve cuántos miembros tiene un rol, no quiénes son.** Si en un rol creado por TTM cambias un miembro por otro, TTM sigue mostrando a las personas a las que se lo dio: consulta [Los roles que crea TTM](/docs/owners-and-tags/#the-roles-ttm-creates).

## Webhooks

| Límite | Valor |
| :--- | :--- |
| Webhooks por servidor | **25** con Premium, ninguno nuevo con el plan Free. El selector es un menú desplegable de Discord, y 25 opciones es su máximo. |
| Nombre del webhook | hasta **96** caracteres \* |
| URL del webhook | hasta **2000** caracteres |

\* El límite de Discord es 100, pero el nombre viaja dentro del identificador del campo del formulario junto con
un marcador breve, y esos caracteres también cuentan: TTM verifica 96 y lo dice si te pasas. El mensaje
de error cita el mismo número que lees aquí.

## El historial de actividad

Cuando el historial está activado, TTM publica cada acción en un hilo junto a la lista, mediante un webhook de Discord.

Discord permite **15 webhooks por canal**, así que TTM crea **un webhook por canal** y lo reutiliza para todas las listas de ese canal. El nombre y la imagen que ves en cada mensaje se establecen por mensaje, así que visualmente no cambia nada.

Si un canal ya llegó a los 15 de Discord (por otros bots o integraciones), el historial de una lista nueva no puede empezar. Libera uno en **Configuración del canal → Integraciones → Webhooks**.

## Canales de voz

Las listas también funcionan en el chat de un canal de voz, con una diferencia: allí no tienen [historial de actividad](#the-activity-timeline). El historial es un hilo junto a la lista, y Discord no permite hilos en los canales de voz.

Todo lo demás funciona como en un canal de texto: los botones, las notificaciones, los recordatorios, la [Activity](/docs/activity/), **Clonar lista**, **Descargar**, **Sellar lista** y **Eliminar lista**.

Cuando el historial está activado en [`/config app`](/docs/configuration/#history-tracking), quien crea una lista en un canal de voz recibe un breve mensaje al respecto, visible solo para esa persona; la lista de práctica del Tutorial se lo salta. Si necesitas el historial, crea la lista en un canal de texto, o cópiala allí con **Clonar lista**.

En un canal de voz TTM no necesita *Crear hilos públicos* ni *Gestionar webhooks*, que solo sirven para el historial. En cambio necesita *Conectar*: sin él, TTM no puede escribir en el chat del canal de voz.

Discord da *Conectar* a todos por defecto; si tu servidor lo quita en un canal de voz, concédeselo a TTM allí, o `/crear-lista` te dirá que falta.

## Notificaciones

Cuando TTM ordena sus propios mensajes de notificación, Discord solo permite eliminar en bloque los mensajes de los **últimos 14 días**. Las notificaciones más antiguas pueden quedarse en el canal: puedes quitarlas manualmente.

---

Estos números reflejan la versión actual del bot. Cualquier cambio quedará anotado en las [Notas de la versión](/docs/release-notes/).
