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
    connection.query('SELECT * FROM user', function (err, rows, fields) {
      if (err) {
        reject(new Error('Database error: ' + err));
      }

      resolve(rows, fields);
    });
  });
};

module.exports.getAllUsers = getAllUsers;