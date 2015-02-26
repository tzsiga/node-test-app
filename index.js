var express = require('express');
var bodyParser = require("body-parser");
var app = express();

app.use(bodyParser.urlencoded({ extended: false }));

app.set('view engine', 'ejs');
app.set('views', './views');

app.use('/bower_components', express.static(__dirname + '/bower_components'));
app.use('/public', express.static(__dirname + '/public'));

app.get('/', function (req, res) {
  res.redirect('/user');
});

var UserController = require('./controllers/UserController.js');
app.use('/user', UserController());

app.listen(process.env.PORT || 3000);