var Promise = require('bluebird');
var mysql = require('mysql');
var express = require('express');
var router = express.Router();

var connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'GYM'
});

// async model function
v/*ar getAllUsers = function () {
  return new Promise(function (resolve, reject) {
    connection.query('SELECT * FROM USER', function (err, rows, fields) {
      if (err) {
        reject(new Error('Database error: ' + err));
      }

      resolve(rows, fields);
    });
  });
}; */

/*var sendDataToDb = function (name, age) {
  console.log(name, age);
  var postData = { NAME : name, AGE: age };
  connection.query('INSERT INTO USER SET ?', postData);
};*/

// view response
router.get('/excData', function (req, res) {
  var result = [];
  
  connection.query('SELECT * FROM EXCERCISE', function(err, rows) {
    console.log(rows);
  })
  
});

// data response
router.post('/excercise', function (req, res) {
  UserModel.getAllUsers().then(function (rows, fields) {
    res.set('Content-Type', 'application/json');
    res.send(rows);
  });
});

router.post('/sendDataToDb', function (req, res) {
    UserModel.sendDataToDb(req.body.name, req.body.age);
});

//module.exports.getAllUsers = getAllUsers;
//module.exports.sendDataToDb = sendDataToDb;