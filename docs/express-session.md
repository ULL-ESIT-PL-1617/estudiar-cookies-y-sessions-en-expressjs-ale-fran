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

Nos permite crear una session con las opciones pasadas.

El middleware enviará automáticamente
