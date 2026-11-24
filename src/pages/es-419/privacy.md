---
layout: ../../layouts/Legal.astro
title: "Política de privacidad"
description: "Qué datos recoge el bot de Discord Team Tasks Manager, por qué y cómo se tratan."
updated: "Última actualización: 24 de noviembre de 2026"
fonte: fbdb53671f51
---

Esta Política de privacidad explica qué datos recoge el bot **Team Tasks Manager** («TTM») y cómo los tratamos. Se aplica al uso del bot en Discord, Activity incluida (consulta [La Activity](#la-activity)), a nuestro servidor de la comunidad en Discord (consulta [Nuestro servidor de la comunidad](#nuestro-servidor-de-la-comunidad)) y a nuestros sitios web (consulta [Nuestros sitios web](#nuestros-sitios-web)). Para tus derechos según la normativa de protección de datos de la UE, consulta también nuestra [página del RGPD](/es-419/gdpr/).

## Quiénes somos

El responsable del tratamiento es **bitsplitters** — Alessandro Vurro, Via di Dragone 478/B, 00126 Roma (RM), Italia. Número de IVA italiano 18349651002, correo electrónico certificado (PEC): alessandro.vurro@pec.it. Contacto: **info@bitsplitters.app**.

## Qué recogemos

TTM solo almacena lo necesario para administrar listas de tareas dentro de tu servidor:

- **Identificadores de Discord**: los ID del servidor (guild), del canal y del mensaje; los ID de usuario y de rol cuando asignas un propietario, agregas una etiqueta o configuras permisos.
- **El contenido de las tareas que creas**: los títulos de las listas y el texto de las tareas, incluido todo lo que escribas en ellos (menciones, enlaces, notas).
- **Recordatorios**: fechas, intervalos, repeticiones y la zona horaria establecida para el servidor.
- **Tu zona horaria personal**: la zona horaria que eliges con `/my timezone` o en el engranaje de la [Activity](#la-activity). Se almacena con tu ID de usuario de Discord y se reutiliza en todos los servidores. Una zona distinta que eliges para una fecha no se almacena, y **Quitar mi zona horaria** la elimina.
- **Tu canal de mensajes directos**: cuando eres propietario de una tarea, sus recordatorios te llegan por mensaje directo, así que el bot guarda el ID de su canal de mensajes directos contigo, para entregarlos con una sola solicitud a Discord. Si no aceptas mensajes directos, también guarda hasta cuándo no volver a intentarlo (seis horas después del intento fallido). Ambos datos se almacenan con tu ID de usuario de Discord, como la zona horaria; los mensajes en sí no se almacenan.
- **Si aprendiste la segunda fila**: cuando presionas **Contenido** o **Recordatorio** debajo de una lista, el bot te envía un consejo breve con el paso siguiente, hasta la primera vez que eliges una tarea en el menú de la lista con uno de ellos activado. A partir de entonces el consejo no vuelve, en ningún servidor: para ello el bot guarda tu ID de usuario de Discord y cuándo lo hiciste, nada más.
- **Roles que crea TTM**: cuando una tarea se asigna a varias personas, TTM crea un rol y guarda su ID, el nombre que le dio, los ID de usuario de las personas a las que se lo dio, quién lo pidió, cuándo y en cuál de los idiomas del bot: para mostrar a esas personas cuando se edita la tarea, para eliminar el rol cuando ninguna lista lo use ya y, el idioma, para redactar el aviso que acompaña a un recordatorio enviado a esas personas por mensaje directo cuando TTM no puede publicar en el canal de la lista.
- **Configuración**: ajustes por servidor como el modo de notificación, el registro del historial, la opción push y la zona horaria.
- **Webhooks**: el método HTTP, la URL, los encabezados y el cuerpo que defines, y su asociación con las tareas.
- **Registros de actividad**: registros de las acciones realizadas en las listas (quién hizo qué y cuándo), cuando el registro del historial está activado.
- **La Activity**: cuando abres una lista en la Activity, la ventana de TTM dentro de Discord: quién eres, una clave de la ventana y un registro de los cambios hasta que se publica su resumen. Consulta [La Activity](#la-activity).
- **Estadísticas de uso agregadas**: contadores por servidor: con qué frecuencia se usa cada función y cuándo se usó por última vez. Además, cada día, los totales de listas, tareas, recordatorios y webhooks, y el número de miembros del servidor. Por último, para cada idioma de la app de Discord, cuántas interacciones, personas y servidores hubo ese día: para contar cada persona y cada servidor una sola vez, TTM guarda sus ID en memoria solo durante ese día y almacena únicamente los totales. Ninguna de estas estadísticas registra quién hizo qué.

## Qué NO recogemos

- **No** leemos ni almacenamos tus mensajes generales de Discord ni tus mensajes directos. El bot no usa ningún acceso privilegiado de Discord: ni el contenido de los mensajes, ni la lista de miembros, ni la presencia.
- **No** recogemos direcciones de correo, contraseñas ni datos de pago a través del bot. Si nos escribes por correo electrónico, usamos tu dirección solo para responderte.

## Por qué los usamos

Tratamos estos datos únicamente para **prestar el servicio**: mostrar y actualizar tus listas, enviar recordatorios y notificaciones, ejecutar los webhooks que configuras, y mantener y mejorar el bot (mediante estadísticas agregadas). No tienes ninguna obligación legal de proporcionar estos datos, pero sin ellos el bot no puede funcionar: sin los ID de Discord y el contenido de tus listas, TTM no tiene nada que mostrarte ni que recordarte.

## Compartir datos

**No** vendemos tus datos. Los datos los trata nuestro proveedor de infraestructura **OVHcloud**, que aloja el bot y su base de datos en **Francia (UE)**, como encargado del tratamiento por cuenta nuestra. El bot también funciona en la plataforma de **Discord**, así que tu uso está sujeto a la [Política de privacidad de Discord](https://discord.com/privacy). Discord tiene su sede en Estados Unidos: consulta [Transferencias internacionales](/es-419/gdpr/#transferencias-internacionales). **Cloudflare**, que también tiene su sede en Estados Unidos, aloja la página de la [Activity](#la-activity) y lleva su conexión con el bot. Cuando usas webhooks, TTM envía los datos que configuraste a los **destinos de terceros que elijas**; esos servicios quedan fuera de nuestro control.

**Informes de errores.** Cuando algo falla de forma inesperada, el bot envía un informe a un canal privado de nuestro servidor de Discord, que solo nosotros podemos ver. Un informe contiene los ID del servidor y del usuario implicados y los detalles técnicos del fallo. Puede contener un fragmento de lo que se estaba procesando, como un trozo de una tarea. Eliminamos estos informes cuando se corrige el fallo y, a más tardar, en 12 meses.

**Correo electrónico.** Lo que escribes a nuestras direcciones de bitsplitters.app llega a un buzón alojado por **OVHcloud** en **Francia (UE)**, como encargado del tratamiento por cuenta nuestra, donde lo leemos para responderte. Usamos tu dirección y tu mensaje solo para responderte y dar seguimiento a la misma solicitud: para cumplir una obligación legal cuando ejerces tus derechos o denuncias contenido ilegal (art. 6.1.c del RGPD), como parte del servicio cuando nos escribes sobre él (art. 6.1.b del RGPD) y, en los demás casos, por nuestro interés legítimo en responderte (art. 6.1.f del RGPD).

## Conservación

Los datos se conservan mientras el bot esté presente y en uso en tu servidor.

**Cuando se quita el bot de un servidor** eliminamos su contenido y sus datos operativos: las listas de tareas y sus tareas, las etiquetas, los recordatorios y los eventos de recordatorio programados, los webhooks y sus acciones, el historial de actividad, los registros de cambios de la Activity y los registros de los roles que creó TTM; los roles en sí se quedan en el servidor, que los administra a partir de entonces.

**Lo que conservamos** es el mínimo necesario para prestar el servicio y medir su adopción: el ID del servidor junto con los ajustes configurados para él, las fechas en que el bot entró y salió, los ajustes de permisos de los comandos, los registros de suscripción cuando proceda y los contadores de uso no identificativos. **No se conserva ningún contenido de tareas.**

**Registros operativos**: para diagnosticar fallos, el bot escribe registros técnicos en el servidor donde se ejecuta. Con el nivel de registro que se usa en producción **no** contienen el texto de tus tareas ni los títulos de tus listas; pueden contener identificadores de Discord, por ejemplo el ID del usuario implicado en un error. Los registros se eliminan automáticamente a los **30 días**.

**Copias de seguridad**: hacemos una copia de seguridad cifrada de la base de datos cada hora, para restaurar el servicio tras un fallo. Las copias se conservan durante **14 días**, en la UE. Los datos que eliminas tú, o que eliminamos nosotros cuando el bot sale de un servidor, pueden, por lo tanto, sobrevivir en una copia hasta 14 días; después desaparecen para siempre. Una copia de seguridad solo se usa para restaurar el servicio.

**Correos electrónicos**: conservamos los correos que nos envías, con nuestras respuestas, durante **12 meses** desde nuestra última respuesta, para poder dar seguimiento a la misma solicitud; antes, si nos lo pides.

**Tu zona horaria personal, tu canal de mensajes directos y la segunda fila**: la zona horaria que elegiste (puedes eliminarla tú mismo con **Quitar mi zona horaria**), el ID de tu canal de mensajes directos con el bot (con, si no aceptas mensajes directos, hasta cuándo no volver a intentarlo) y el registro de que aprendiste la segunda fila se almacenan con tu ID de usuario de Discord y no están ligados a ningún servidor concreto, así que quitar el bot de un servidor no los elimina. Escribe a **info@bitsplitters.app** con tu ID de usuario de Discord y los eliminaremos. Eliminar el registro de la segunda fila solo hace que el consejo vuelva.

**La Activity**: la clave de su ventana dura 24 horas, y su huella se elimina en la hora siguiente a su caducidad. El registro de los cambios hechos allí se elimina cuando la lista vuelve al canal. Consulta [La Activity](#la-activity).

**Puedes eliminar tú mismo una lista**, sin pedírnoslo: el botón **Eliminar lista** del panel *Más* de la lista, o `/config lists` cuando el mensaje de la lista ya no está. La eliminación es inmediata y permanente, y se lleva consigo las tareas, los propietarios, las etiquetas, los recordatorios y el historial de actividad de la lista.

**Sellar lista**, en el mismo panel, también elimina los datos de la lista de TTM, pero deja su mensaje, y su hilo de cronología, en el canal como mensajes ordinarios de Discord, bajo el control de tu servidor. Los roles que TTM creó para esa lista también se quedan, y TTM los olvida.

**Un rol que creó TTM** se olvida, junto con su registro y las personas a las que se dio, cuando ninguna lista lo usa ya, como propietario o como etiqueta: si el rol sigue como lo dejó TTM (el mismo nombre, sin permisos, el mismo número de miembros), TTM también lo elimina del servidor; si no, lo deja a cargo de tu servidor. TTM también olvida los roles de una lista cuando la sellas, y todos ellos cuando se quita el bot del servidor.

Puedes solicitar la eliminación en cualquier momento (consulta el [RGPD](/es-419/gdpr/)); también podemos eliminar datos antes.

## La Activity

La [Activity](/docs/activity/) abre una lista en una ventana dentro de Discord. Además de lo que el bot ya administra:

- **Inicio de sesión.** Cuando la abres, le haces saber a TTM quién eres, a través de Discord. Discord le da a TTM el perfil básico de tu cuenta (tu ID de usuario, nombre y avatar, el idioma de tu app de Discord y algunos datos de la cuenta, como tus insignias y tu tipo de Nitro), nunca tu correo electrónico. TTM solo almacena tu ID de usuario y usa el idioma para los textos de la ventana y para los totales diarios por idioma (consulta [Qué recogemos](#qué-recogemos)); no almacena el resto, ni el acceso que Discord le concede.
- **Tu estado en Discord.** En la misma ventana, Discord pregunta si TTM puede mostrar también en tu perfil que estás en la Activity. Si aceptas, TTM envía a Discord una línea, *Planificando tareas con el equipo* en tu idioma, que ven tus amigos y los miembros de tus servidores mientras estás allí. No dice nada de la lista, el servidor ni el canal, y TTM no almacena nada por ello. Si dices que no, la Activity se abre igualmente, sin esa línea.
- **La clave de la ventana.** TTM le da a la ventana una clave que dura 24 horas, para que se reconecte sola tras un reinicio del bot. TTM solo almacena una huella de la clave, con tu ID de usuario, el servidor y el canal a los que corresponde, cuándo se creó y cuándo caduca. Las huellas caducadas se eliminan en una hora.
- **Los cambios.** Mientras una lista está en la Activity, TTM registra cada cambio, para redactar el resumen que se publica cuando la lista vuelve al canal: quién lo hizo y cuándo, el número y el texto de la tarea y, según el cambio, los propietarios, las etiquetas o las personas mencionadas (como ID de Discord), la fecha de un recordatorio o de **Reabrir todo**, el nombre de un webhook, el texto de las tareas eliminadas con **Limpiar la lista**. Estos registros se eliminan cuando la lista vuelve al canal: en cuanto se publica el resumen, o de inmediato si no se puede, por ejemplo porque el canal ya no existe. Lo que queda es una línea sin datos personales (qué lista, el idioma de su resumen, cuándo se abrió y se cerró, y por qué) que va con la lista.
- **Quién está.** Quién está en la Activity y quién edita qué se guarda solo en memoria, mientras la lista está allí. Para mostrar nombres, TTM guarda en memoria durante diez minutos los que recibe de Discord (de las personas que están en la Activity y, con **Propietario** y **Etiqueta**, de los miembros cuyo nombre coincide con lo que escribes) para no volver a pedirlos. No los almacena.
- **La página y su conexión.** La ventana es una página alojada por **Cloudflare, Inc.** (Estados Unidos), como encargado del tratamiento por cuenta nuestra, que Discord carga a través de su propio proxy. Cloudflare también lleva la conexión entre la ventana y el bot hasta nuestro servidor. Lo que intercambian, como la lista y sus cambios, pasa por el proxy de Discord y la red de Cloudflare, cifrado en cada tramo: cada uno de ellos lo descifra para encaminarlo, como hacen estos servicios. Como nuestros sitios web, la página no usa cookies; a diferencia de ellos, no carga estadísticas de visitas. En tu navegador guarda los ajustes de la página (tamaño del texto, tema y filas espaciadas), que se quedan en tu dispositivo y nunca llegan a TTM. También guarda la clave de la ventana, en el almacenamiento de sesión que el navegador vacía cuando cierras Discord, para no iniciar sesión de nuevo cuando Discord la recarga: **Salir** la elimina de inmediato. Como cualquier servidor web, Cloudflare registra datos técnicos de cada solicitud y conexión, por seguridad y para prestar el servicio. Consulta la [Política de privacidad de Cloudflare](https://www.cloudflare.com/privacypolicy/).
- **Base jurídica.** Ejecución del servicio que solicitas cuando abres una lista en la Activity (art. 6.1.b del RGPD).

## Nuestro servidor de la comunidad

Administramos un servidor de Discord para los usuarios de TTM ([cómo unirte](/docs/community/)). Unirte es opcional y es independiente del uso del bot: el bot no lo necesita.

- **Lo que vemos.** Como en cualquier servidor de Discord, sus administradores y moderadores pueden ver tu nombre de usuario de Discord, tu avatar y tu perfil tal como se muestran en el servidor, los roles que tienes allí y los mensajes que publicas en sus canales. No los copiamos a ningún otro lugar, salvo las transcripciones de los tickets que se describen más abajo.
- **Moderación, roles y tickets.** El servidor usa **MEE6**, un bot de Discord de terceros, para dar roles (por ejemplo el rol de miembro cuando aceptas las reglas), para ayudar a moderar y para administrar tickets. MEE6 trata los datos que necesita para ello según [su propia política de privacidad](https://mee6.xyz/privacy.html).
- **Tickets.** Las solicitudes de embajador, las propuestas de colaboración y las peticiones de soporte que requieren privacidad pasan por tickets: un canal privado visible solo para ti y para el equipo. Cuando se cierra un ticket, MEE6 genera una **transcripción**, una copia de los mensajes de ese ticket, con los nombres y los ID de Discord de quienes los escribieron, para que podamos hacer seguimiento de la misma solicitud. MEE6 la guarda en su propio sitio web, donde solo se abre tras iniciar sesión con Discord, y publica el enlace en un canal que solo ve el equipo. Eliminamos ese enlace, y cualquier copia que hayamos descargado, en un plazo de **12 meses**, o antes si nos lo pides. Cuánto tiempo conserva MEE6 su copia depende de MEE6: si quieres que se elimine, avísanos y le pediremos a MEE6 que la elimine.
- **Base jurídica.** Nuestro interés legítimo en administrar un espacio de soporte y debate para el bot, en revisar las solicitudes y propuestas que se nos envían allí y en mantenerlo seguro (art. 6.1.f del RGPD).

Discord sigue siendo el proveedor de la plataforma, y lo que recoge se rige por la [Política de privacidad de Discord](https://discord.com/privacy).

## Nuestros sitios web

Nuestros sitios web (bitsplitters.app, tasks.bitsplitters.app y timezones.bitsplitters.app) no usan cookies. tasks.bitsplitters.app recuerda en tu navegador el tema y el idioma que eliges, para mostrártelos de nuevo en tu próxima visita: estas elecciones se quedan en tu dispositivo y nunca nos llegan. Los otros dos sitios no almacenan nada en tu navegador.

- **Alojamiento.** Están alojados en **GitHub Pages**, un servicio de GitHub, Inc. (Estados Unidos). Como cualquier servidor web, GitHub registra datos técnicos de cada visita, incluida tu dirección IP, por seguridad y para prestar el servicio. Consulta la [Declaración de privacidad de GitHub](https://docs.github.com/en/site-policy/privacy-policies/github-general-privacy-statement).
- **Estadísticas de visitas.** Para contar las visitas y ver qué sitios nos envían personas, nuestras páginas cargan un script de **Cloudflare Web Analytics**, un servicio de Cloudflare, Inc. (Estados Unidos). Por cada visualización de página registra la página, el sitio del que vienes, tu país, navegador, sistema operativo y tipo de dispositivo, y cuánto tardó en cargarse la página. No establece cookies, no almacena nada en tu navegador y no te identifica: solo vemos totales, nunca visitantes individuales. Cloudflare recibe tu dirección IP con la solicitud, como cualquier servidor web, y no la usa para reconocerte. Consulta la [Política de privacidad de Cloudflare](https://www.cloudflare.com/privacypolicy/).
- **El mapa de zonas horarias.** El mapa de timezones.bitsplitters.app carga sus imágenes de los servidores de **OpenStreetMap**, que por lo tanto reciben tu dirección IP. Consulta la [política de privacidad de la Fundación OpenStreetMap](https://osmfoundation.org/wiki/Privacy_Policy).
- **Base jurídica.** Nuestro interés legítimo en publicar la documentación y las herramientas que acompañan al bot, y en saber, de forma agregada, cuántas personas las leen y de dónde vienen (art. 6.1.f del RGPD).

## Seguridad

Aplicamos medidas técnicas y organizativas razonables para proteger los datos. Ningún método de transmisión o almacenamiento es completamente seguro, así que no podemos garantizar una seguridad absoluta.

## Menores

TTM no está dirigido a nadie por debajo de la edad mínima que exige Discord.

## Cambios

Podemos actualizar esta política; la fecha de «Última actualización» refleja la versión más reciente.

## Contacto

**info@bitsplitters.app**
