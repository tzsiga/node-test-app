var Promise = require('bluebird');
var mysql = require('mysql');

var connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'GYM'
});

var saveWorkoutToDb = function (workoutData) {
  console.log("SaveworkoutData-ba belepett");
  
  
  // Calculating actual date
  var today = new Date();
  var dd = today.getDate();
  var mm = today.getMonth()+1; //January is 0!
  var yyyy = today.getFullYear();
  
  if(dd<10) {
    dd='0'+dd
  } 
  
  if(mm<10) {
      mm='0'+mm
  }
  
  var actualDate =  mm+'/'+dd+'/'+yyyy;
  var excId = Math.floor((Math.random() * 10000) + 1);
  var postExcData = { DATE: actualDate, EXCERCISE_ID: excId };
  
  connection.query('INSERT INTO EXCERCISE SET ?', postExcData);
};

module.exports.saveWorkoutToDb = saveWorkoutToDb;