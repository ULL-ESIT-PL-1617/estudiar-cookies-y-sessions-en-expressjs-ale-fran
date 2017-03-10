Cookies
==

Las cookies son fragmentos de información que son enviados de un dominio y almacenados en el navegador del usuario mientras esta navegando en dicho dominio.
Cada vez que el usuario entre en dicho dominio, el navegador envia la informacion almacenada al dominio/servidor para saber la actividad previa de dicho usuario.

Las cookies se guardan en el cliente.
Las sessions se guardan en el servidor.

Las cookies se necesitan para validar la sesion.
el objeto session busca al objto cookie para comprobar si casa la peticion.


las cookies miran las cabeceras en las transacciones entre el cliente y servidor, lee dichas cabeceras y parse las cookies que se envian
El cookie-parser guarda las cookeis en req.cookies

express session nos permiten autenticar transacciones entre el cliente y servidor


importamos cookieparser y session

app.use(cookiparser());

app.use(session({
  secret: '', //Es una clave que se usará para las cookies
  saveUninitialized: true/false, //Sirve para almacenar las sessiones en una base de datos por ejemplo, y mantener el log in aunq se haya caido el server
                                    //Entonces cuandl vuelva el server, el usuario aun estará logeado.
  resave: true/false, //aunq nada cambie se vuelve a guardar

  }));

//Al correr el server e ir a la ruta hacemos  log(req.cookie) y log(req.session)

cookie: -> `{ 'my-session': 's:5IYyiNZQUFyTVdoPGpe-YeEaiDrGhZjQ.TOUyg9lwQxXFF2i0JBERFGtXFWlZQeVpCb+s853Qy10' }`
             |cookieName|  |        session id                || Es la firma usada para firmar la cookie para la autenticacion nel srrvidor

session: -> `Session { cookie:  { path: '/',    _expires: null,   originalMaxAge: null,    httpOnly: true } } `
            | Es nuestra cookie en la session |
