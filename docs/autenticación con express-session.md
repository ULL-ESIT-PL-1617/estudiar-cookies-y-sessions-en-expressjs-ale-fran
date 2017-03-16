Autenticación con express-ession
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

// Login endpoint
app.get('/login', function (req, res) {
  if (!req.query.username || !req.query.password) {
    res.send('login fallido');    
  } else if(req.query.username === "pepito" || req.query.password === "mejorcontraseña") {
    req.session.user = "amy";
    req.session.admin = true;
    res.send("login success!");
  }
});

// Logout endpoint
app.get('/logout', function (req, res) {
  req.session.destroy();
  res.send("logout success!");
});

// Contenido de
app.get('/content', auth, function (req, res) {
    res.send("Login con éxito!!");
});

app.listen(3000);
~~~

Para probar este código nesecitamos realizar las siguienter pruebas y ejecuter lso siguientes comandos:

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
