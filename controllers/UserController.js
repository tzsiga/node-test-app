var express = require('express');
var router = express.Router();

var UserModel = require('../models/UserModel.js');

module.exports = function () {

	// view response
	router.get('/', function (req, res) {
		res.set('Content-Type', 'text/html');
		res.render('user_view', { buttonLabel: 'nyomjad meg' });
	});

	// data response
	router.post('/all', function (req, res) {
    UserModel.getAllUsers().then(function (rows, fields) {
			res.set('Content-Type', 'application/json');
			res.send(rows);
		});
	});

	return router;
};