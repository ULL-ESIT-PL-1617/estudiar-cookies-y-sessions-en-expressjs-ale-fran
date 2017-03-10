var express = require('express');
var cookieparser = require('cookie-parser');
var bodyparser = require('body-parser');
var session = require('express-session');
var app = express();

app.listen(process.env.PORT || 9090);
app.set('views', __dirname + '/views');
app.set('viewengine', 'ejs');
app.use(express.static(__dirname + '/public'));

app.use(cookieparser());
app.use(bodyparser.urlencoded({
  extended: true
}));

app.use(session({
  secret: 'my-secret-key',
  saveUninitialized: false,
  resave: false
}));

app.use('/', function (req, res, next) {
  console.log(req.cookies);
  console.log('------------');
  console.log(req.session);
  next();
});

app.get('/', function(req, res){
  var html = `
        <form action="/" method="post">
           Your name: <input type="text" name="userName"><br>
           <button type="submit">Submit</button>
        </form>
  `;
  if (req.session.userName) {
    html += '<br>Your username from your session is: ' + req.session.userName;
  }
  res.send(html);
});

app.post('/', function(req, res){
  req.session.userName = req.body.userName;
  res.redirect('/');
});















console.log("Running");
