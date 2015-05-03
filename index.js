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
var urlencodedParser = bodyParser.urlencoded({ extended: false });

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

app.use(bodyParser.json())


// DATABASE TESTING
var connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'GYM'
});



app.get("/api/getAllExcercise",function(req,res){
    connection.connect(function(err){
    if(!err) {
        console.log("Database is connected ... \n\n");  
        
        var query = connection.query('SELECT DATE, WORKOUT_ID, KG, REPS, LAP FROM EXCERCISE, SESSION', function(err, rows, fields) {

        var results = [];
        results.push(rows);
          
          query.on('end', function() {
              connection.end();
              return res.json(results);
          });
          
          if (!err) {
            console.log('The solution is: ', rows);
          }
          else
            console.log('Error while performing Query.');
          });
    
    } else {
        console.log("Error connecting database ... \n\n");  
    }
  });
  
});

app.post("/api/addExcercise", urlencodedParser, function(req,res){
  
  connection.connect(function(err){
    if(!err) {
        console.log("Database is connected ... \n\n");  
        
          if (!req.body) return res.sendStatus(400);
          else {
            var excId = Math.floor((Math.random() * 100000) + 1);
            
            for(var i = 1; i < req.body.workout.length; i+=2) {
              var workoutId = 1;
              for(var j = 0; j < req.body.workout[i].length; j++) {
                console.log("az i erteke: " + i + " a j erteke: " + j);
                var kg = req.body.workout[i][j].kg;
                var rep = req.body.workout[i][j].rep;
                var lapCounter = j + 1;
                var lapData = { EXCERCISE_ID: excId, WORKOUT_ID: workoutId, KG: kg, REPS: rep, LAP: lapCounter };
                connection.query('INSERT INTO SESSION SET ?', lapData);
              }
              workoutId++;
            }
            
            var date =  new Date().toISOString().slice(0, 19).replace('T', ' ');
            var userID = 1;
            var postExcData = { DATE: date, EXCERCISE_ID: excId, USER_ID: userID };
            connection.query('INSERT INTO EXCERCISE SET ?', postExcData);
            connection.end();
          }
    } else {
        console.log("Error connecting database ... \n\n");  
    }
  });
  

});



