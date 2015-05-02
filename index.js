var express = require('express');
var bodyParser = require("body-parser");
var app = express();

app.use(bodyParser.urlencoded({ extended: false }));

app.get('/', function (req, res) {
  res.redirect('/main');
});

app.set('view engine', 'ejs');
app.set('views', './views');

app.use('/bower_components', express.static(__dirname + '/bower_components'));
app.use('/public', express.static(__dirname + '/public'));
app.use('/dist', express.static(__dirname + '/dist'));
app.use('/fonts', express.static(__dirname + '/fonts'));
app.use('/Images', express.static(__dirname + '/Images'));
app.use('/controllers', express.static(__dirname + '/controllers'));
app.use('/views', express.static(__dirname + '/views'));
app.use('/models', express.static(__dirname + '/models'));

var UserController = require('./controllers/MainController.js');
app.use('/main', UserController());

app.listen(process.env.PORT || 3000);