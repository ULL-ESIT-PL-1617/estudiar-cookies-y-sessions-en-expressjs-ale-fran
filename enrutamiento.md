Aplicación expressJS
==

Los requisitos para hacer una aplicación en expressjs son:
* Un directorio */public* con los ficheros html,css..etc
* Un directorio */views* con para renderizar las vistas (html's dinámicos)
* La aplicación en sí **app.js**


## Enrutamiento

El enrutamiento determina cómo una aplicación responde ante las peticiones a ciertas rutas.

Las rutas siguen la siguiente estructura `app.METHOD(PATH, HANDLER)`:
- app es una instrancia de express.
- METHOD es alguno de los [métodos http](https://en.wikipedia.org/wiki/Hypertext_Transfer_Protocol#Request_methods)
  - get
  - post
  - put
  - delete
  - ...etc
- PATH es la ruta en el servidor
- HANDLER es la funcion que se ejecuta cuando se va a esa ruta.

Por ejemplo:

~~~
var express = require('express');
var path = require('path');
var app = express(); //Instancia de express
app.listen(process.env.PORT || 8080);

app.use(express.static(path.resolve('/public'))); //middleware

app.get('/about', function(request, response){  //Responde con helloWorld
  response.send('Hello World!')                 //en la pagina about
});

app.post('/contact', function (request, response) {
  res.send('Got a POST request')
});
~~~

### Acceso a las rutas
Las rutas también aceptan expresiones regulares, como:

~~~
app.get('/ab?cd', function (req, res) {
  //Reponde a abcd, y acd
  //Porque el ? indica que es opcional justo lo que está antes  
});

app.get('/ab+cd', function (req, res) {
  //Responde a abcd, abbbbbbbcd
})

app.get('/ab*cd', function (req, res) {
  //Respone a acd, a(cualquier cosa)cd
})

app.get(/.*fly$/, function (req, res) {
  //Responde a (cualquier cosa)fly, que acabe en fly.
})
~~~

### Parametros de rutas

~~~
app.get('/users/:uid', function (req, res) {
  //Para acceder al user id es a través de req.params.uid
});
~~~

### Manejadores de rutas

Puedes proveer una ruta para que llame a distintas callbacks para que actúen como *middleware*.

~~~
app.get('/path1', function (req, res, next) {
    //Codigo..
    next();
  },
  function (req, res) {
    res.send('path1'); //Redirige a la pagina path1
  });

  //Incluso puedes definirlas y pasarlas en un array
  var f1 = function(req, res, next){ /*Codigo..*/ next();};
  var f2 = function(req, res, next){ /*Codigo..*/ next();};
  var f3 = function(req, res, next){ /*Codigo..*/ next();};      

  app.get('/path1', [f1, f2, f3]);

  //O combinar las 2 formas
  app.get('/path1', [f1, f2], function(req, res, next) {})
~~~

### Metodos de respuesta

Los métodos en el objeto *respuesta* **(res)** de la tabla pueden enviar una respuesta al cliente y terminar el ciclo de solicitud/respuestas. Si ninguno de estos métodos se invoca desde un manejador de rutas, la solicitud de cliente se dejará colgada.

| Método | Descripcion |
| ------ | ------ |
|  res.download()  |  Solicita un archivo para descargarlo.  |
|  res.end()  |  Finaliza el proceso de respuesta.  |
|  res.json()  |  Envía una respuesta JSON.  |
|  res.redirect()  |  Redirecciona una solicitud.  |
|  res.render()  |  Representa una plantilla de vista.  |
|  res.send()  |  Envía una respuesta de varios tipos.  |
|  res.sendFile()  |  Envía un archivo como una secuencia de octetos.  |
|  res.sendStatus() | Establece el código de estado de la respuesta y envía su representación de serie como el cuerpo de respuesta. |

### express.Router

Utilice la clase express.Router para crear manejadores de rutas montables y modulares. Una instancia Router es un sistema de middleware y direccionamiento completo; por este motivo, a menudo se conoce como una “miniaplicación”.
Para adaptarla a nuestra aplicación es con un *require* como si fuera un modulo normal, lo que antes hay que exportar nuestro middleware.

~~~
//Birds.js
var express = require('express');
var router = express.Router();

router.use(function timeLog(req, res, next) {
  console.log('Time: ', Date.now());
  next();
});

router.get('/', function(req, res) {
  res.send('Birds home page');
});

router.get('/about', function(req, res) {
  res.send('About birds'); <--Para llegar aqui la ruta es /birds/about
});

module.exports = router;
~~~

~~~
//App.js
...
var birds = require('./birds');
app.use('/birds', birds);
...

~~~
