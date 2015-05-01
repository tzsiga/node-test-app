var workoutApp = angular.module('workoutApp', ['ngRoute']);

workoutApp.config(function($routeProvider) {
	console.log()
$routeProvider
    .when('/', {
        templateUrl : '../views/mainpage.html',
        controller  : 'mainController'
    })
    .when('/mainpage', {
        templateUrl : '../views/mainpage.html',
        controller  : 'workout01Controller'
    })
    .when('/workout0', {
        templateUrl : '../views/workout0.html',
        controller  : 'workout01Controller'
    })
    .when('/workout01', {
        templateUrl : '../views/workout01.html',
        controller  : 'workout01Controller'
    })
    .when('/workoutresult', {
        templateUrl : '../views/workoutresult.html',
        controller  : 'workout01Controller'
    })
    .when('/calculator', {
        templateUrl : '../views/calculator.html',
        controller  : 'calculatorController'
    });
});