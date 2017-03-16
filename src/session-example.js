var express = require('express');
var session = require('express-session');
var bodyparser = require('body-parser');
var app = express();

app.listen(process.env.PORT || 9090);
app.set('views', __dirname + '/views');
app.set('viewengine', 'ejs');
app.use(express.static(__dirname + '/public'));

app.use(session({
    secret: 'my-secret',
    resave: true,
    saveUninitialized: true
}));

app.use(bodyparser.urlencoded({
  extended: true
}));

app.get('/', function (req, res, next){
  var name = (typeof(req.session.user) == 'undefined') ? 'stranger' : req.session.user;
  var text = (req.session.admin) ? 'Hey admin!' : 'Hey ' + name + '!';
  res.render('session.ejs', {"text" : text});
});

app.post('/', function (req, res, next) {
  res.redirect('/login' + '?username=' + req.body.userName + '&password=' + req.body.password);
})

app.get('/login', function (req, res, next) {
  if (!req.query.username || !req.query.password) {
    res.send('Login failed');
  } else if(req.query.username === "admin" && req.query.password === "1234") {
    req.session.user = "admin";
    req.session.admin = true;
    res.send(`<h2>Login success!</h2>
              <br>
              <a href="/"> back </a>`);
  } else {
    req.session.user = req.query.username;
    req.session.admin = false;
    res.send(`<h2>Login success!</h2>
              <br>
              <a href="/"> back </a>`);
  }
});

app.use('/content',function(req, res, next){
  if(req.session && req.session.user === 'admin' && req.session.admin)
    return next();
  else
    return res.sendStatus(401); //401 es unauthorized
});

app.get('/content', function (req, res, next){
  res.send(`<img src="/cat.jpg"/>
            <br>
            <a href="/"> back </a>`);
});

app.get('/logout', function (req, res, next) {
  var admin = req.session.admin;
  req.session.destroy();

  if(admin)
    res.send(`<h2>Logout success!</h2>
              <h4>Bye admin! </h4>
              <br>
              <a href="/"> back </a>`);
  else
    res.send(`<h2>Logout success!</h2>
              <h4>Bye user! </h4>
              <br>
              <a href="/"> back </a>`);
});

console.log("Running");
