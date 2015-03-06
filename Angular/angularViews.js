		var workoutApp = angular.module('workoutApp', ['ngRoute']);

		workoutApp.controller('mainController', function ($scope) {
			$scope.message = "Main page";
		});

		workoutApp.controller("workout01Controller", function ($scope) {

			var setId = 1;

		    $scope.items = [];

		    $scope.addItem = function () {

		        $scope.items.push({
		        	setId: setId,
		            kgs: $scope.newRep,
		            reps: $scope.newKg
		        });
		        console.log(setId);
		        setId++;
		    };

		    $scope.removeItem = function (setID) {
		    	console.log("torlendo set: " + setID);
		    	var index = $scope.items.indexOf(setID);
		    	console.log("tombben a " + index + " helyen van");
		    	$scope.items.splice(index, 1);
		    	if(setId > 1) {
		    		setId--;
		    	}

		    }
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