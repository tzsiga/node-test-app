var Promise = require('bluebird');
var mysql = require('mysql');

var connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'node_test_db'
});

// async model function
var getAllUsers = function () {
  return new Promise(function (resolve, reject) {
    connection.query('SELECT * FROM USER', function (err, rows, fields) {
      if (err) {
        reject(new Error('Database error: ' + err));
      }

      resolve(rows, fields);
    });
  });
};

var sendDataToDb = function (name, age) {
  console.log(name, age);
  var postData = { NAME : name, AGE: age };
  //connection.query('INSERT INTO GYM SET ?', postData);
};

module.exports.getAllUsers = getAllUsers;
module.exports.sendDataToDb = sendDataToDb;