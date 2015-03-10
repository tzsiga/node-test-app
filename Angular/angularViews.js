//ANGULAR 
var workoutApp = angular.module('workoutApp', ['ngRoute']);


//----------------------------------------------------------
//VARIABLES
var excerciseCounter = 0;
var actualExcerciseID = 0;
var currentlyViewedExcerciseID = 0;
var excerciseContainer = [];


workoutApp.service('excerciseService', function() {

	var scopeList = [];

  var goForwardToExcercise = function(items) {
	console.log("BEFORE excerciseCounter: " + excerciseCounter);
	console.log("BEFORE currentlyViewedExcerciseID: " + currentlyViewedExcerciseID);
	if( excerciseCounter == 0) {
		startSessionTimer();
		excerciseCounter = 1;
		currentlyViewedExcerciseID = 1;
	}
	else {
		//if the max excercise id is equal to the currently viewed, there is no more opened excercises
		if( excerciseCounter == currentlyViewedExcerciseID ) {
			console.log("elso feltetel");
			//save the current sets
			excerciseContainer.push({
				key: excerciseCounter,
				value: items
			});
			scopeList = [];
			excerciseCounter++;
			currentlyViewedExcerciseID = excerciseCounter;

		}
		else if ( excerciseCounter > currentlyViewedExcerciseID ) {
			console.log("masodik feltetel");
			//save the current sets
			excerciseContainer.push({
				key: currentlyViewedExcerciseID,
				value: items
			});
			//load the already saved sets for the next excercise
			scopeList = [];
			scopeList = excerciseContainer[currentlyViewedExcerciseID].value;
			currentlyViewedExcerciseID++;
		}
		else {
			console.log("harmadik feltetel");
			//save the current sets
			excerciseContainer.push({
				key: currentlyViewedExcerciseID,
				value: items
			});
			//load the already saved sets for the next excercise
			scopeList = [];
			scopeList = excerciseCounter[currentlyViewedExcerciseID+1];
			currentlyViewedExcerciseID++;
		}
	}
	console.log("AFTER excerciseCounter: " + excerciseCounter);
	console.log("AFTER currentlyViewedExcerciseID: " + currentlyViewedExcerciseID);
	for (var i = 0; i < excerciseContainer.length; i++) {
	 console.log(excerciseContainer[i]);
	};
  }

  var goBackToLastExcercise = function(items){
  	console.log("BEFORE excerciseCounter: " + excerciseCounter);
	console.log("BEFORE currentlyViewedExcerciseID: " + currentlyViewedExcerciseID);


	if(excerciseCounter == 1 || excerciseCounter == 0 || currentlyViewedExcerciseID == 1) {

	}
	else {
		excerciseContainer.push({
			key: currentlyViewedExcerciseID,
			value: items
		});
		scopeList = [];
		scopeList = excerciseContainer[currentlyViewedExcerciseID - 2].value;
		currentlyViewedExcerciseID--;
	}
	console.log("AFTER excerciseCounter: " + excerciseCounter);
	console.log("AFTER currentlyViewedExcerciseID: " + currentlyViewedExcerciseID);
	for (var i = 0; i < excerciseContainer.length; i++) {
	 	console.log(excerciseContainer[i]);
	};

  }

  var getScopeList = function () {
  	return scopeList;
  }

  return {
    goForwardToExcercise: goForwardToExcercise,
    goBackToLastExcercise: goBackToLastExcercise,
    getScopeList: getScopeList
  };

});

//----------------------------------------------------------
//ANGULAR CONTROLLERS
workoutApp.controller('mainController', function ($scope) {
	$scope.workoutChooser = "Chose your workout type";
});

workoutApp.controller("workout01Controller", function ($scope, excerciseService) {

	$scope.excerciseId = currentlyViewedExcerciseID;
	$scope.items = [];
	$scope.items = excerciseService.getScopeList();

	$scope.goForwardToExcercise = function () {
		$scope.items = excerciseService.goForwardToExcercise($scope.items);
	};

	$scope.goBackToLastExcercise = function () {
		$scope.items = excerciseService.goBackToLastExcercise($scope.items);
	};	

	// $scope.goForwardToExcercise = function () {
	// 	console.log("BEFORE excerciseCounter: " + excerciseCounter);
	// 	console.log("BEFORE currentlyViewedExcerciseID: " + currentlyViewedExcerciseID);
	// 	if( excerciseCounter == 0) {
	// 		startSessionTimer();
	// 		excerciseCounter = 1;
	// 		currentlyViewedExcerciseID = 1;
	// 	}
	// 	else {
	// 		//if the max excercise id is equal to the currently viewed, there is no more opened excercises
	// 		if( excerciseCounter == currentlyViewedExcerciseID ) {
	// 			//save the current sets
	// 			excerciseContainer.push({
	// 				key: excerciseCounter,
	// 				value: $scope.items
	// 			});
	// 			$scope.items = [];
	// 			excerciseCounter++;
	// 			currentlyViewedExcerciseID = excerciseCounter;

	// 		}
	// 		else {
	// 			//save the current sets
	// 			excerciseContainer.push({
	// 				key: currentlyViewedExcerciseID,
	// 				value: $scope.items
	// 			});
	// 			//load the already saved sets for the next excercise
	// 			$scope.items = [];
	// 			$scope.items.push(excerciseCounter[currentlyViewedExcerciseID+1]);
	// 			currentlyViewedExcerciseID++;
	// 		}
	// 	}
	// 	console.log("AFTER excerciseCounter: " + excerciseCounter);
	// 	console.log("AFTER currentlyViewedExcerciseID: " + currentlyViewedExcerciseID);
	// 	for (var i = 0; i < excerciseContainer.length; i++) {
	// 	 console.log(excerciseContainer[i]);
	// 	};
	// }

	// $scope.goBackToLastExcercise = function () {
	// 	console.log("BEFORE excerciseCounter: " + excerciseCounter);
	// 	console.log("BEFORE currentlyViewedExcerciseID: " + currentlyViewedExcerciseID);


	// 	if(excerciseCounter == 1 || excerciseCounter == 0 || currentlyViewedExcerciseID == 1) {

	// 	}
	// 	else {
	// 		excerciseContainer.push({
	// 			key: currentlyViewedExcerciseID,
	// 			value: $scope.items
	// 		});
	// 		for (var i = 0; i < $scope.items.length; i++) {
	// 			console.log($scope.items[i]);
	// 		};
	// 		//$scope.items = [];
	// 		$scope.items = excerciseContainer[currentlyViewedExcerciseID - 2].value;
	// 		currentlyViewedExcerciseID--;
	// 	}
	// 	console.log("AFTER excerciseCounter: " + excerciseCounter);
	// 	console.log("AFTER currentlyViewedExcerciseID: " + currentlyViewedExcerciseID);
	// 	for (var i = 0; i < excerciseContainer.length; i++) {
	// 	 	console.log(excerciseContainer[i]);
	// 	};
	// }

	var setId = 1;

	$scope.increaseExcerciseId = function () {
		excerciseCounter++;
	}

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
        $("#workout01Sets").animate({scrollTop:$("#workout01Sets")[0].scrollHeight}, 1000);
    }

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
    }

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



//----------------------------------------------------------
//ANGULAR ROUTING
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
    });
});