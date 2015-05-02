//MAIN CONTROLLER
var express = require('express');
var router = express.Router();

module.exports = function () {

  // view response
  router.get('/', function (req, res) {
    res.set('Content-Type', 'text/html');
    res.render('MainView');
  });

  return router;
};

