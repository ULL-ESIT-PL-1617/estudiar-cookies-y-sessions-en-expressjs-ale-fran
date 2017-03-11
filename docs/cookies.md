Cookies
==

Una *cookie HTTP* es un pequeño fragmento de información que el servidor envía al navegador del usuario, puede almacenarla ahí y este reenviarla al servidor
con la próxima peticion. Normalmente esto se hace para saber si 2 peticiones provienen del mismo navegador permitiendo así mantener a un usuario *logeado*, por ejemplo.
De esta forma es posible *mantener* información, ya que el protocolo HTTP no tiene estado.

> Hypertext Transfer Protocol o HTTP es el protocolo de comunicación que permite las transferencias de información en la World Wide Web.

> HTTP define la sintaxis y la semántica que utilizan los elementos de software de la arquitectura web (clientes, servidores, proxies) para comunicarse

> HTTP es un protocolo sin estado, es decir, no guarda ninguna información sobre conexiones anteriores

> [HTTP Wikipedia](https://es.wikipedia.org/wiki/Hypertext_Transfer_Protocol)

Las cookies se usan principalmente para los siguientes propósitos:
 1. Mantener la sesion (logins de usuarios, *carritos de compras...*)
 2. Personalizacion (Preferencias del usuario)
 3. Rastreo (Analizar el comportamiento del usuario)

Las cookies también se usan para el almacenamiento de informacion local en general del navegador, aunque para ello existe  **localStorage** y **sessionStorage**.

A esta información se puede acceder desde la consola del navegador.
- **document.cookie:** Devuelve una *string* que separa las cookies por **;**
- **localStorage:** Devuelve un objeto con la información almacenada en el navegador asociada al dominio.
- **sessionStorage:** Es como *localStorage*, con la diferencia de que al cerrar el navegador, dicha información se pierde.

##### Cookies vs localStorage
> *"HTML local storage; better than cookies."*

> Antes del HTML5, la información se guardaba en cookies, incluida en cada petición al servidor. El **localStorage** es más seguro, y se puede guardar mucha mas información (al menos 5MB) sin afectar el comportamiento de la web, ya que se guarda en local.

> **localStorage** funciona por dominios, es decir que todas las paginas de un mismo dominio pueden acceder a la misma información.

> [w3Schools](https://www.w3schools.com/html/html5_webstorage.asp)

## Creando cookies

Una cookie se puede crear de la siguiente forma:
~~~
<cookie-name>=<cookie-value>
~~~

El servidor le dice al navegador que guarde una cookie (en el lenguaje que sea). La respuesta enviada al navegador contendrá la cabecera con la información y el navegador almacenará la cookie.

~~~
HTTP/1.0 200 OK
Content-type: text/html
Set-Cookie: yummy_cookie=choco
Set-Cookie: tasty_cookie=strawberry
[page content]
~~~

Ahora con cada petición al servidor el navegador enviara las cookies almacenadas usando la cabecera.

~~~
GET /sample_page.html HTTP/1.1
Host: www.example.org
Cookie: yummy_cookie=choco; tasty_cookie=strawberry
~~~

## Cookies en sesiones

Al crear una cookie sin especificar la fecha de expiración, se crea una *cookie de sesión* ya que al cerrar el navegador se perderá dicha cookie.
Hay que tener en cuenta que algunos navegadores tienen activada una opción de restablecer las cookies de sesión, lo que hará permanentes algunas cookies como si el navegador nunca se cerrase.

## Cookies permanentes

Para hacer cookies permanentes son *(con permanentes se refiere a que no se pierden al cerrar el navegador)*.

~~~
Set-Cookie: id=a3fWa; Expires=Wed, 21 Oct 2015 07:28:00 GMT;
~~~

## httpOnly cookies

Las cookies seguras solo se envían al servidor si se usa el protocolo SSL y HTTPS.
Para prevenir ataques *cross-site scripting (XSS)*, las HTTP-only cookies no son accesibles a través de JavaScript con la propiedad **Document.cookie** o alguna otra API.   
Para ello se define de la siguiente forma:

~~~
Set-Cookie: id=a3fWa; Expires=Wed, 21 Oct 2015 07:28:00 GMT; Secure; HttpOnly
~~~

## Alcance de las cookies

El alcance está definido por el dominio y ruta (conjunto de urls).

El dominio especifica el host al cual se va a envía la cookie.
Si no se especifica, por defecto el alcance es del documento actual.
Si se especifica el dominio, siempre se incluyen los subdominios.

Si la ruta existe el alcance también se extiende a los sub directorios.

## Cookies del mismo *site*

Las cookies del mismo site permiten al servidor asegurar que una cookie no debería ser enviada a peticiones de otros sites, lo que provee de proteccion contra los ataques cross-site requests. Este tipo de cookies aun estan en fase experimental.
