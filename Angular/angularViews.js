		var workoutApp = angular.module('workoutApp', ['ngRoute']);

		workoutApp.controller('mainController', function ($scope) {
			$scope.message = "Main page";
		});

		workoutApp.controller('workout01Controller', function ($scope) {
			$scope.message = "workout01 page";
		});

	    workoutApp.config(function($routeProvider) {
        $routeProvider
            .when('/', {
                templateUrl : '../views/workout0.html',
                controller  : 'mainController'
            })
            .when('/workout01', {
                templateUrl : '../views/workout01.html',
                controller  : 'workout01Controller'
            });
        });