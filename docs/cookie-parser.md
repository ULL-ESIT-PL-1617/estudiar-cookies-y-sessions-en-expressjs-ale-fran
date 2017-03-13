Cookies en expressJS
==

Para manejar las cookies en expressJS usamos un middleware llamado **cookie-parser**.

### Instalación

`npm install --save cookie-parser`

### Instanciación

~~~
[...]
var cookieparser = require('cookie-parser');

app.use(cookieparser());

[...]
~~~

### Crear cookie
~~~
res.cookie('<cookie-name>', <cookie-value>, {maxAge : <time-in-ms>});
~~~

### Leer cookie
~~~
req.cookies.<cookie-name>
~~~

### Eliminar cookie
~~~
req.clearCookie('<cookie-name>')
~~~

### Ejemplo
  [Enlace](https://github.com/ULL-ESIT-PL-1617/estudiar-cookies-y-sessions-en-expressjs-ale-fran/blob/master/src/cookie-example.js) al repo
