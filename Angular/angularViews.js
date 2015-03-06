		var workoutApp = angular.module('workoutApp', ['ngRoute']);

		workoutApp.controller('mainController', function ($scope) {
			$scope.workoutChooser = "Chose your workout type";
		});

		workoutApp.controller("workout01Controller", function ($scope) {

			var setId = 1;

		    $scope.items = [];

		    $scope.addItem = function () {

		        $scope.items.push({
		        	setId: setId,
		        	kgs: $('#setRepH4').val(),
		        	reps: $('#setKgH4').val()
		            // kgs: $scope.newRep,
		            // reps: $scope.newKg
		        });
		        console.log(setId);
		        setId++;
		    };

		    $scope.removeItem = function (setID) {
		    	console.log("torlendo set: " + setID);
		    	var index = _.findIndex($scope.items, function(element) {
				  return element.setId == setID;
				});
		    	console.log("tombben a " + index + " helyen van");
		    	$scope.items.splice(index, 1);
		    	if(setId > 1) {
		    		setId--;
		    	}
		    };

		    $scope.increaseKgBtn = function () {
				var actualKg = parseFloat($('#setKgH4').val());
			    actualKg = actualKg + 2.5;
			    $('#setKgH4').val(actualKg);
			};

			$scope.decreaseKgBtn = function () {
				var actualKg = parseFloat($('#setKgH4').val());
			    actualKg = actualKg - 2.5;
			    $('#setKgH4').val(actualKg);
			};

		    $scope.increaseRepBtn = function () {
				var actualRep = parseFloat($('#setRepH4').val());
			    actualRep = actualRep + 1;
			    $('#setRepH4').val(actualRep);
			};

			$scope.decreaseRepBtn = function () {
				var actualRep = parseFloat($('#setRepH4').val());
			    actualRep = actualRep - 1;
			    $('#setRepH4').val(actualRep);
			};

		});

	    workoutApp.config(function($routeProvider) {
        $routeProvider
            .when('/', {
                templateUrl : '../views/mainpage.html',
                controller  : 'mainController'
            })
            .when('/workout0', {
                templateUrl : '../views/workout0.html',
                controller  : 'workout01Controller'
            })
            .when('/workout01', {
                templateUrl : '../views/workout01.html',
                controller  : 'workout01Controller'
            });
        });