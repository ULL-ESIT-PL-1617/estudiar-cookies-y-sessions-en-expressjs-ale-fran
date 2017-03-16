Express-Session
==

Con node.js podemos explicar de una forma bastante simple el funcionamiento y comportamiento de las sessions.

### Session in express.js

A través del middleware cookie-sesion podemos crear una sesion simple en la cual nos permitira guardar información en la mismo.
Para poder utilizar una API y porbar nuestras sessions necesitamos tener instalado `express` y `express-session`
~~~
npm install express
npm install express-session
~~~
A continuación mostramos un codigo de ejemplo de una API que utiliza cookie-session:
~~~
var cookieSession = require('cookie-session')
var express = require('express')

var app = express()

app.use(cookieSession({
name: 'session',
keys: ['key1'],

//Opciones
maxAge: 24 * 60 * 60 * 1000,
domain: 'myDomainName',
~~~

### cookie-session

Nos permite crear una session con las opciones pasadas. El middleware enviará automáticamente la inforamción que añadamos a nuestra session al req.session.

Algunas de las opciones que pueden incluir nuestras session son:
+ maxAge: número de milisegundos a partir de `Date.now()` para expirar.
+ expires: fecha a la que el objeto expira.
+ path: la ruta de la cookie, por defecto es ´/´.
+ domain: dominio de la cookie.
+ httpOnly: si es true indica que la cookie solo puede ser enviada mediante protocolo HTTP(S).

Un ejemplo de uso de las `cookie-session`, el cual cuenta el numero de visitas a la página y las va guardando en la cookie:
~~~
var cookieSession = require('cookie-session')
var express = require('express')

var app = express()

app.set('trust proxy', 1) // Confiamos en el primer proxy

app.use(cookieSession({
  name: 'session',
  keys: ['key1', 'key2']
}))

app.get('/', function (req, res, next) {
  // Aumentamos las visitas
  req.session.views = (req.session.views || 0) + 1

  // Respondemos con el numero de visitas
  res.end(req.session.views + ' views')
})

app.listen(8080)
~~~
