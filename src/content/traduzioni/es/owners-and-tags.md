---
title: "Propietarios y etiquetas"
description: "A quién pertenece una tarea, a quién menciona y los roles que crea TTM cuando varias personas son propietarias de una tarea."
fonte: 3beeb818c97b
---

Una tarea puede tener un **propietario** y varias **etiquetas**. El propietario es a quien pertenece la tarea: quien puede marcarla y quien recibe su recordatorio. Las etiquetas son los usuarios y roles mencionados en la tarea, por ejemplo las personas a las que avisar cuando se completa.

Configuras ambos con los botones **Propietario** <img class="inline-ic" src="/icons/owner.png" alt="" /> y **Etiqueta** <img class="inline-ic" src="/icons/tag.png" alt="" />: en el canal, en la segunda fila bajo la lista; en la Activity, en el panel de una tarea.

<div class="howto" id="how-to-do-it"><div class="howto-t">Cómo se hace</div><div class="howto-grid"><a class="howto-go is-channel" href="/docs/channel-tasks/#owner"><span class="howto-k"><img class="place-ic" src="/icons/posto-canale.svg" alt="" />En el canal</span><span class="howto-d">Propietario y Etiqueta, en la segunda fila bajo la lista.</span></a><a class="howto-go is-activity" href="/docs/activity-list/#owner"><span class="howto-k"><img class="place-ic" src="/icons/activity.png" alt="" />En la Activity</span><span class="howto-d">Propietario y Etiqueta, en el panel de una tarea.</span></a></div></div>

## Propietario: una persona, un rol o varias personas

El propietario es a quien pertenece una tarea: quien puede marcarla y quien recibe su recordatorio. Puede ser:

- **Una persona**: es la propietaria de la tarea y su recordatorio le llega por mensaje directo.
- **Un rol**: todos los que tienen ese rol son propietarios de la tarea, y cualquiera de ellos puede marcarla. Su recordatorio es un mensaje en el canal de la lista que menciona al rol.
- **Varias personas**: TTM crea un rol para ellas y lo convierte en propietario. Es una función [Premium](/docs/premium/).

No puedes mezclar personas y roles, y como máximo puedes elegir un rol: una tarea tiene un propietario.

**Una tarea para varias personas** funciona como una tarea cuyo propietario es un rol. El rol se llama TTM1, TTM2 y así sucesivamente, y solo lo tienen las personas que elegiste. TTM necesita el permiso *Gestionar roles* para crearlo: consulta [Los roles que crea TTM](#the-roles-ttm-creates).

**Para quedarte tú con una tarea**, en el canal: haz clic en **Propietario** hasta que se ponga azul y elige la tarea sin escoger a nadie. Funciona en una tarea sin propietario. Una tarea que ya tiene uno solo cambia si te eliges a ti en el menú: consulta [Propietario](/docs/channel-tasks/#owner).

**Quien recibe una tarea de otra persona es mencionado** en la notificación del canal, así que Discord le avisa: a una persona, o a todos los del rol. En la Activity, la mención llega con el resumen al final de la sesión.

**Quitar el propietario también quita su recordatorio**, porque ya no queda nadie que lo reciba. Si el recordatorio aún no ha llegado, TTM te pide confirmación antes.

Cómo llega el recordatorio a una persona o a un rol: consulta [Cómo llega el recordatorio](/docs/reminders/#how-the-reminder-arrives). Quién puede marcar una tarea con propietario: consulta [Quién puede marcar una tarea](/docs/core-concepts/#who-can-tick-a-task).

## Etiquetas

Una etiqueta es un usuario o un rol mencionado en la tarea. Una tarea puede llevar **hasta 25 etiquetas**, personas y roles juntos. Las etiquetas no cambian quién puede marcar la tarea: dicen quién debería enterarse.

Una nueva elección de etiquetas **sustituye** a la anterior: la tarea queda etiquetada exactamente con las personas y los roles que elegiste. Para añadir a alguien, mantén a los demás en tu elección. Quitar las etiquetas las quita todas a la vez.

Cómo las eliges cambia un poco entre los dos lugares. En el canal, un ajuste del servidor decide si sobrescribes las etiquetas o las editas en directo: consulta [Etiqueta](/docs/channel-tasks/#tag). En la Activity siempre partes de las etiquetas que la tarea tiene ahora: consulta [Etiqueta](/docs/activity-list/#tag).

En el texto de una lista, una etiqueta es `@` y el nombre, como `@Ava`, y el propietario es el mismo nombre seguido de dos puntos, `@Ava:`: consulta [Editar una lista a mano](/docs/writing-a-list/#owners-the-mention-with-a-colon).

## Los roles que crea TTM

Esta parte es para quien gestiona el servidor: qué hace TTM con los roles que crea para las tareas de varias personas, qué necesita y cuándo los elimina.

Cuando das una tarea a varias personas, TTM:

- crea un rol llamado **TTM** seguido del primer número libre: TTM1, TTM2 y así sucesivamente. El rol es **mencionable**, **no tiene permisos** y queda al final de la lista de roles;
- da el rol a las personas que elegiste, una a una;
- convierte el rol en el propietario de la tarea.

### Qué necesita

El bot necesita el permiso *Gestionar roles*, y el enlace de invitación lo incluye. Sin él, TTM no crea ni elimina roles. En un servidor que añadió el bot antes, puede que un admin tenga que concedérselo al rol del bot. Hazlo en *Ajustes del servidor → Roles*, no en un canal.

En un canal, Discord muestra el mismo permiso como *Gestionar permisos*. Allí hace otra cosa: permite que un rol cambie los permisos de ese canal.

Un servidor puede tener como máximo **250 roles**: es un límite de Discord. Cuando el servidor lo alcanza, TTM no puede crear el rol y lo dice.

Dar el rol también lleva tiempo. Discord permite que un bot lo haga diez veces cada diez segundos, así que 25 personas tardan unos veinte segundos. Con más de diez personas, TTM te dice cuánto va a tardar.

### Cuándo crea TTM un rol nuevo

**TTM nunca cambia un rol una vez creado.**

- Elegir personas distintas, incluso una más o una menos, crea un rol nuevo.
- Elegir exactamente las mismas personas que el propietario actual no cambia nada.
- En el canal, con **Mantener el estado tras la selección** activado, la misma selección en varias tareas seguidas reutiliza el rol creado para la primera tarea.

### Cuándo un rol deja de ser de TTM

TTM recuerda los roles que crea y las personas a las que se los dio. Un rol sigue siendo de TTM solo mientras tenga el aspecto con el que TTM lo dejó:

- el mismo nombre;
- sin permisos, ni en el servidor ni en un canal;
- el mismo número de miembros.

Si lo renombras, le das un permiso, lo añades a los permisos de un canal, o añades o quitas un miembro, pasa a ser uno de los roles de tu servidor. TTM lo comprueba antes de eliminar un rol y cuando muestra el propietario de una tarea para cambiarlo. Un rol que ya no es de TTM nunca se elimina, y la elección de propietario muestra el rol en lugar de las personas.

Así que, para conservar un rol para tu servidor, **renómbralo**. Entonces puedes usarlo donde quieras. Un color nuevo o una posición nueva no bastan: TTM seguiría eliminando el rol cuando ninguna lista lo use ya.

TTM puede ver *cuántos* miembros tiene un rol, pero no *quiénes* son. Así que si cambias un miembro por otro, TTM no puede notarlo: sigue mostrando a las personas a las que dio el rol.

### Cuándo elimina TTM un rol

TTM elimina un rol que creó, también del servidor, cuando se cumplen las dos condiciones:

- **ninguna lista lo usa ya**, ni como propietario ni como etiqueta, y ningún permiso de comando lo usa;
- sigue pareciendo de TTM.

TTM lo comprueba cada diez minutos y nunca toca un rol creado hace menos de diez minutos. Algunos roles se quedan siempre:

- los roles de una lista **sellada**, porque el mensaje sellado aún los muestra;
- todos los roles que TTM creó, cuando el bot se **elimina** de un servidor.
