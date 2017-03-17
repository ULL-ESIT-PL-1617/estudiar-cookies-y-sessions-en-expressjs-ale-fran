Autenticación con express-session
==
La autentificación es el proceso de verificar que un usuario es de hecho quién él o ella dice ser y determinar que privilegios se le otorga.
A continuación se mostrará un ejemplo de uso de ambos conceptos en las sesiones de ExpressJS:

`session_auth.js`
~~~
var express = require('express'),
    app = express(),
    session = require('express-session');
app.use(session({
    secret: '2C44-4D44-WppQ38S',
    resave: true,
    saveUninitialized: true
}));

// Authentication and Authorization Middleware
var auth = function(req, res, next) {
  if (req.session && req.session.user === "pepito" && req.session.admin)
    return next();
  else
    return res.sendStatus(401);
};


app.get('/login', function (req, res) {
  if (!req.query.username || !req.query.password) {
    res.send('login fallido');    
  } else if(req.query.username === "pepito" || req.query.password === "mejorcontraseñaever") {
    req.session.user = "pepito";
    req.session.admin = true;
    res.send("login con exito!");
  }
});


app.get('/logout', function (req, res) {
  req.session.destroy();
  res.send("logout success!");
});

// content
app.get('/content', auth, function (req, res) {
    res.send("Login con éxito!!");
});

app.listen(3000);
~~~

Como podemos ver al comienzo de este fichero importamos los modulos de `express` y `express-session` e indicamos al instancia de express `app` que use el modulo de `express-session`.

~~~
var express = require('express'),
    app = express(),
    session = require('express-session');
app.use(session({
    secret: '2C44-4D44-WppQ38S',
    resave: true,
    saveUninitialized: true
}));
~~~

A continuación disponemos de una función de autentificación la cual guardamos en la variable `auth` que nos permitira acceso a nuestra pagina si estamos correctamento logueados.

~~~
var auth = function(req, res, next) {
  if (req.session && req.session.user === "pepito" && req.session.admin)
    return next();
  else
    return res.sendStatus(401);
};
~~~

Seguidamente disponemos de la funcion que nos guardara la información de nuestro inicio de sesión en caso de que este sea correcto cuando nos dirijamos a login.


~~~
app.get('/login', function (req, res) {
  if (!req.query.username || !req.query.password) {
    res.send('login fallido');    
  } else if(req.query.username === "pepito" || req.query.password === "mejorcontraseñaever") {
    req.session.user = "pepito";
    req.session.admin = true;
    res.send("login con exito!");
  }
});
~~~

Por ultimo tenemos dos get de `/logout` y `content`. El primero destruira nuestra session lo cual nos obligara a tener que volver a iniciar sesión para volver acceder al contenido de la pagina. Y la segunda nos servira para comprobar que estamos logueados con exito.

~~~
app.get('/logout', function (req, res) {
  req.session.destroy();
  res.send("logout success!");
});

// content
app.get('/content', auth, function (req, res) {
    res.send("Login con éxito!!");
});
~~~
---
Para probar este código necesitamos realizar las siguientes pruebas y ejecutar los siguientes comandos:

~~~
npm install express
npm install express-session
node session_auth.js &
~~~
~~~
localhost:3000/content
localhost:3000/login?username=amy&password=amyspassword
localhost:3000/content
localhost:3000/logout
localhost:3000/content
~~~
