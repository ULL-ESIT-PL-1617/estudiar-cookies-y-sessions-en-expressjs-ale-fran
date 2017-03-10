var express = require('express');
var cookieparser = require('cookie-parser');
var session = require('express-session');
var app = express();

app.listen(process.env.PORT || 8080);
app.set('views', __dirname + '/views');
app.set('viewengine', 'ejs');
app.use(express.static(__dirname + '/public'));

app.use(cookieparser());

app.use(session({
  secret: 'my-secret',
  saveUninitialized: false,
  resave: false
}));

app.use('/', function (req, res, next){
  console.log(req.cookies);
  console.log('***********');
  console.log(req.session);
  next();
})

app.get('/', function (req, res, next) {

  res.render('index.ejs', {});

});














console.log("Running");
