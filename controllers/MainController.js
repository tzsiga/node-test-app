//MAIN CONTROLLER
var express = require('express');
var router = express.Router();

var UserModel = require('../models/MainModel.js');

module.exports = function () {

  // view response
  router.get('/', function (req, res) {
    res.set('Content-Type', 'text/html');
    res.render('MainView');
  });

  return router;
};

