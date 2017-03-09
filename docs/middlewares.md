Middleware en express
==

Expresss utiliza una serie de funciones middleware las cuales tienen acceso al objeto de solicitud(req), al de respuesta(res) y a la siguiente función de middleware en el ciclo de solicitud/respuesta la cual se denota normalmente con la variable next.

~~~
var app = express();

app.use(function (req, res, next) {
  console.log('Probando middleware');
  next();
});
~~~

Estas funciones permiten ejecutar codigo, realizar cambios en la solicitud y objetos de respuestas, finalizar el ciclo de solicitud respuesta o invocar la siguiente funcion en pila;

Express utiliza diferentes tipos de middleware:

- De nivel de aplicación.
- De nivel de direccionador.
- De nivel de manejo de errores.
- Incorporado.
- De terceros.


### Midleware de nivel de Aplicación

Consiste en una instancia del objeto de aplicación utilizando las funciones app.use() y app.METHOD(), en el que METHOD es el método HTTP que maneja la función de middleware.

En ejemplo siguiente encontramos una funcion sin ninguna ruta de montaje, por lo que se ejecuta cada vez que la aplicación recibe una solicitud.
~~~
app.use(function (req, res, next) {
  console.log('Time:', Date.now());
  next();
});
~~~
La función next() deja el control a la siguiente función middleware.

~~~
app.get('/img', function (req, res, next) {
  res.send('Carpeta img');
});
~~~


A continuacion tenemos un ejemplo de uso de next('route'), el cual deje el control a la siguiente ruta.
~~~
app.get('/user/:id', function (req, res, next) {
  if (req.params.id == 0) next('route');
  else next();
}, function (req, res, next) {
  res.render('else');
});

app.get('/user/:id', function (req, res, next) {
  res.render('vista');
});
~~~


### Middleware de nivel de direccionador

Este midddleware funciona igual que el de nivel de Aplicación excepto que está enlazado a una instancia:
~~~
var router = express.Router();
~~~
A continuación mostramos un ejemplo sencillo de uso del middleware de nivel de direccionador.
~~~
var app = express();
var router = express.Router();

//Se ejecuta para todo los request
router.use(function (req, res, next) {
  console.log('Probando middleware');
  next();
});

//se ejecuta para la petición request de la ruta /img
router.get('/img', function (req, res, next) {
    res.send('Carpeta img');

});

router.get('/user/:id', function (req, res, next) {
  //SI el id del user es 0 salta a next router
  if (req.params.id == 0) next('route');
  //si no pasa a next
  else next();
}, function (req, res, next) {
  res.render('else');
});

router.get('/user/:id', function (req, res, next) {
  res.render('vista');
});

//monta router en la app
app.use('/', router);
~~~


### Middleware de manejo de errores

Las funciones de manejos de errores se definen de la misma manera que las funciones anterios excepto que se le pasan cuatro argumentos en vez de tres, se añade el argumento err, al principio de llamada a la función.
~~~
app.use(function(err, req, res, next) {
  console.error(err.stack);
  res.status(500).send('Error');
});
~~~
El middleware de manejo de errores se define al final, después de otras llamadas de rutas y app.use();

~~~
var bodyParser = require('body-parser');

app.use(bodyParser());

app.use(function(err, req, res, next) {
  // 
});
~~~
A efectors practicos de organización se pueden definir la funciones de manejos de errores, por ejemplo:
~~~
var metodo = require('metodo1');

app.use(metodo());
app.use(errorFunction);
~~~
Con errorFunction con la siguiente estructura:
~~~
function errorFunction(err, req, res, next) {
  console.error(err.stack);
  next(err);
}
~~~


### Middleware Incorporado

La única función de middleware incorporado en Express es express.static.Esta función se basa en serve-static y es responsable del servicio de activos estáticos de una explicación Express.
~~~
express.static(root, [options])
~~~
El argumento root representa el directorio donde se realiza el servicio y options es opcional.

A continuación tenemos un ejemplo de las opciones de las que disponemos:
~~~
var options = {
  dotfiles: 'ignore',     //valores posibles "allow", "deny" y "ignore"
  etag: false,            //habilita la generación de tag
  extensions: ['htm', 'html'],    //establece las reservas de extensiones de archivos
  index: false,                   //envia el archivo de indice de directorios
  maxAge: '1d',        //establezca la propiedad max-age de la cabecera Cache-Control
  redirect: false,     //redirecciona a la raiz final cuando el acceso no es un directorio
  setHeaders: function (res, path, stat) {  
    res.set('x-timestamp', Date.now());     //Función que establece las cabeceras HTTP
  }
}

app.use(express.static('public', options));
~~~


### Middleware de terceros

Sirve para añadir funcionalidades a las aplicaciones Express. Es necesario el modulo Node.js para instalar la funcionalidad.

![softTerceros](imgs/terceros.PNG)
~~~
var express = require('express');
var app = express();
var cookieSesion = require('cookie-sesion');

app.use(cookieSesion());
~~~
