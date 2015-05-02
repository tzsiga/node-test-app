var express = require('express');
var bodyParser = require("body-parser");
var app = express();
var router = express.Router();
var mysql = require('mysql');


// NODEJS EXPRESS CONFIGURATION
app.get('/', function (req, res) {
  res.redirect('/main');
});
app.listen(process.env.PORT || 3000);

// TO PARSE REQ CONTENT DURING POST
app.use(bodyParser.urlencoded({ extended: false }));

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


// DATABASE TESTING
var connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'GYM'
});

connection.connect(function(err){
  if(!err) {
      console.log("Database is connected ... \n\n");  
  } else {
      console.log("Error connecting database ... \n\n");  
  }
});

app.get("/api/getData",function(req,res){
  connection.query('SELECT * from EXCERCISE', function(err, rows, fields) {
  connection.end();
    if (!err)
      console.log('The solution is: ', rows);
    else
      console.log('Error while performing Query.');
    });
});


/*var connectionString = process.env.DATABASE_URL || 'mysql://localhost:3306/GYM';
router.get('/api/allData', function(req, res) {

    var results = [];

    // Get a mysql client from the connection pool
    mysql.connect(connectionString, function(err, client, done) {

        // SQL Query > Select Data
        var query = client.query("SELECT * FROM EXCERCISE");

        // Stream results back one row at a time
        query.on('row', function(row) {
            results.push(row);
        });

        // After all data is returned, close connection and return results
        query.on('end', function() {
            client.end();
            return res.json(results);
        });

        // Handle Errors
        if(err) {
          console.log(err);
        }

    });

});*/