var express = require('express');
var router = express.Router();

var Promise = require('bluebird');
var mysql = Promise.promisifyAll(require('mysql'));

module.exports = function() {

	var getAllUsers = function (res) {
		var connection = mysql.createConnection({
			host: 'localhost',
			user: 'root',
			password: '',
			database: 'node_test_db'
		});
		 
		connection.connect();

		connection.query('SELECT * FROM user', function (err, rows, fields) {
			if (err) throw err;
			res.send(rows);
		});
	};

	// view lekérés
	router.get('/', function (req, res) {
		res.set('Content-Type', 'text/html');
		res.render('user_view', { buttonLabel: 'nyomjad meg' });
	});

	// adat lekérés
	router.get('/all', function (req, res) {
		res.set('Content-Type', 'text/html');
		getAllUsers(res);
	});

	return router;
};