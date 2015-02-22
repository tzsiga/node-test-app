var express = require('express');
var router = express.Router();

var Promise = require('bluebird');
var mysql = require('mysql');

module.exports = function() {

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
				if (err) throw 'Database error: ' + err;
				resolve(rows, fields);
			});
		});
	};

	// view response
	router.get('/', function (req, res) {
		res.set('Content-Type', 'text/html');
		res.render('user_view', { buttonLabel: 'nyomjad meg' });
	});

	// data response
	router.post('/all', function (req, res) {
		getAllUsers().then(function (rows, fields) {
			res.set('Content-Type', 'application/json');
			res.send(rows);
		});
	});

	return router;
};