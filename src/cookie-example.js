var express = require('express');
var cookieparser = require('cookie-parser');
var bodyparser = require('body-parser');

var app = express();

app.listen(process.env.PORT || 9090);
app.set('views', __dirname + '/views');
app.set('viewengine', 'ejs');
app.use(express.static(__dirname + '/public'));

app.use(cookieparser());

app.use(bodyparser.urlencoded({
  extended: true
}));

app.get('/', function (req, res, next){
  var myCookie = (req.cookies.userName) ? req.cookies.userName : 'No cookie stored';
  res.render('index.ejs', {'cookie' : myCookie});
});

app.post('/', function (req, res, next) {
  var half_minute = 30 * 1000;
  res.cookie('userName', req.body.userName, {maxAge : half_minute});
  res.redirect('/');
});

app.get('/forget', function (req, res, next) {
  res.clearCookie('userName');
  res.redirect('/');
});

console.log("Running");
