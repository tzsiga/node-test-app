var express = require('express');
var bodyParser = require("body-parser");
var app = express();

app.use(bodyParser.urlencoded({ extended: false }));

app.set('view engine', 'ejs');
app.set('views', './views');

app.use('/bower_components', express.static(__dirname + '/bower_components'));
app.use('/public', express.static(__dirname + '/public'));
app.use('/Css', express.static(__dirname + '/Css'));
app.use('/Images', express.static(__dirname + '/Images'));
app.use('/JS', express.static(__dirname + '/JS'));
app.use('/Angular', express.static(__dirname + '/Angular'));
app.use('/views', express.static(__dirname + '/views'));

app.get('/', function (req, res) {
  res.redirect('/main');
});

var UserController = require('./controllers/MainController.js');
app.use('/main', UserController());

app.listen(process.env.PORT || 3000);