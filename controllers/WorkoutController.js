//ANGULAR 
var workoutApp = angular.module('workoutApp', ['ngRoute']);

//----------------------------------------------------------
//VARIABLES
var excerciseCounter = 0;
var actualExcerciseID = 0;
var currentlyViewedExcerciseID = 0;
var excerciseContainer = [];
var sessionTimerGlobal = "";
var allKgs = 0;
var allReps = 0;

workoutApp.filter('split', function() {
        return function(input, splitChar, splitIndex) {
            // do some bounds checking here to ensure it has that index
            return input.split(splitChar)[splitIndex];
        }
    });

//----------------------------------------------------------
//ANGULAR CONTROLLERS
workoutApp.controller('mainController', function ($scope) {
	$scope.workoutChooser = "Chose your workout type";
});

workoutApp.controller("workout01Controller", function ($scope, $location, $http, excerciseService) {

	$scope.excerciseId = currentlyViewedExcerciseID;
	$scope.items = [];
	$scope.workoutResult = excerciseContainer;
	$scope.sessionTime = sessionTimerGlobal;
	$scope.allKgs = allKgs;
	$scope.allReps = allReps;
	$scope.burnedCalories = 0;
	$scope.items = excerciseService.getScopeList();

	$scope.goForwardToExcercise = function () {
		$scope.items = excerciseService.goForwardToExcercise($scope.items);
	};

	$scope.goBackToLastExcercise = function () {
		$scope.items = excerciseService.goBackToLastExcercise($scope.items);
		//$('#workoutTypeText').val($scope.items);
	};	

	$scope.stopWorkout = function () {
		if (confirm('Your workout will be stopped and saved! Do you agree?')) {
		  sessionTimerGlobal = excerciseService.getSessionTime();
			//SAVE THE DATA OF THE ACTUAL PAGE
			var hasTheKey = _.has(excerciseContainer, excerciseCounter);
			if(hasTheKey == false) {
				excerciseContainer.push({
					key: excerciseCounter,
					value: $scope.items
				});
			}
			else {
				var storedValues = excerciseContainer[currentlyViewedExcerciseID-1].value;
				storedValues.push($scope.items);
				excerciseContainer.slice(currentlyViewedExcerciseID,1);
				excerciseContainer.push({
					key: currentlyViewedExcerciseID,
					values: storedValues
				});
			}


    		for (var i = 0; i < excerciseContainer.length; i++) {
    			console.log(excerciseContainer[i]);
    		};
			
			var workout = [];

    		for (var i = 0; i < excerciseContainer.length; i++) {
    			for(var j in excerciseContainer[i]) {
    				console.log(excerciseContainer[i][j]);
					var laps = [];
    				for(var k = 0; k < excerciseContainer[i][j].length; k++) {
						var lap = {};
    					allKgs = allKgs + parseInt(excerciseContainer[i][j][k].kgs);
    					allReps = allReps + parseInt(excerciseContainer[i][j][k].reps);
						
						lap.rep = parseInt(excerciseContainer[i][j][k].reps);
						lap.kg = parseInt(excerciseContainer[i][j][k].kgs);
						laps.push(lap);
    					console.log('All kgs:' + allKgs);
    				}
					workout.push(laps);
    			}
    		};

    		//redirect to result page
    	
		  $location.path('/workoutresult'); 
  		  $scope.workoutResult = excerciseContainer;
			
			var testData = { workout: workout };
		  $http.post("/api/addExcercise", JSON.stringify(testData))
		  .error( function(error) {
			 console.log("error: " + error); 
		  });
		  

		  //$scope = $scope || angular.element(document).scope();

		} else {
		    // Do nothing!
		}
	};

	var setId = 1;

	$scope.increaseExcerciseId = function () {
		excerciseCounter++;
	}

    $scope.addItem = function () {

        $scope.items.push({
        	setId: setId,
        	kgs: $('#setKgH4').val(),
        	reps: $('#setRepH4').val(),
        	type: $('#workoutTypeText').val()
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
        templateUrl : '../views/calculator.html'
    })
	.when('/calendar', {
        templateUrl : '../views/calendar.html',
		controller : 'calendarController'
    });
});

workoutApp.service('excerciseService', function() {

	var scopeList = [];

  var goForwardToExcercise = function(items) {
	console.log("EXC: " + excerciseCounter);
	console.log("CURR: " + currentlyViewedExcerciseID);
	if( excerciseCounter == 0) {
		startSessionTimer();
		excerciseCounter = 1;
		currentlyViewedExcerciseID = 1;
	}
	else {
		//if the max excercise id is equal to the currently viewed, there is no more opened excercises
		//CURR=1 and EXC=1 and next
		if( excerciseCounter == currentlyViewedExcerciseID ) {
			//save the current sets
			var hasTheKey = _.has(excerciseContainer, excerciseCounter);

			if(hasTheKey == false) {
				console.log("ELSO FELTETEL");
				excerciseContainer.push({
					key: excerciseCounter,
					value: items
				});
			}
			else {
				console.log("MASODIK FELTETEL");
				var storedValues = excerciseContainer[currentlyViewedExcerciseID].value;
				storedValues.push(items);
				excerciseContainer.slice(excerciseCounter,1);
				excerciseContainer.push({
					key: excerciseCounter,
					values: storedValues
				});
			}
			scopeList = [];
			excerciseCounter++;
			currentlyViewedExcerciseID++;

		}
		else if ( excerciseCounter > currentlyViewedExcerciseID ) {
			//save the current sets
			var hasTheKey = _.has(excerciseContainer, excerciseCounter);
			if(hasTheKey == false) {
				console.log("HARMADIK FELTETEL");
				excerciseContainer.push({
					key: excerciseCounter,
					value: items
				});
			}
			else {
				console.log("NEGYEDIK FELTETEL");
				var storedValues = excerciseContainer[currentlyViewedExcerciseID].value;
				console.log(storedValues);
				storedValues.push(items);
				excerciseContainer.slice(currentlyViewedExcerciseID,1);
				excerciseContainer.push({
					key: currentlyViewedExcerciseID,
					values: storedValues
				});
			}
			//load the already saved sets for the next excercise
			scopeList = [];
			scopeList = excerciseContainer[currentlyViewedExcerciseID].value;
			currentlyViewedExcerciseID++;
		}
		else {
			console.log("OTODIK FELTETEL");
			//save the current sets
			var storedValues = excerciseContainer[currentlyViewedExcerciseID].value;
			storedValues.push(items);
			excerciseContainer.slice(currentlyViewedExcerciseID,1);
			excerciseContainer.push({
				key: currentlyViewedExcerciseID,
				values: storedValues
			});
			//load the already saved sets for the next excercise
			scopeList = [];
			scopeList = excerciseCounter[currentlyViewedExcerciseID+1].value;
			currentlyViewedExcerciseID++;
		}
	}
  }

  var goBackToLastExcercise = function(items){
	if(excerciseCounter == 1 || excerciseCounter == 0 || currentlyViewedExcerciseID == 1) {

	}
	else {
		var hasTheKey = _.has(excerciseContainer, excerciseCounter);
		console.log("BACK ELSO FELTETEL");
		if(hasTheKey == false) {
			excerciseContainer.push({
				key: excerciseCounter,
				value: items
			});
		}
		else {
			console.log("BACK MASODIK FELTETEL");
			var storedValues = excerciseContainer[currentlyViewedExcerciseID-1].value;
			storedValues.push(items);
			excerciseContainer.slice(currentlyViewedExcerciseID,1);
			excerciseContainer.push({
				key: currentlyViewedExcerciseID,
				values: storedValues
			});
		}
		scopeList = [];
		scopeList = excerciseContainer[currentlyViewedExcerciseID - 2].value;
		currentlyViewedExcerciseID--;
	}
  }

  var getScopeList = function () {
  	return scopeList;
  }

  var getSessionTime = function () {
  	return $('#sessionTimeH5').text();
  }

  return {
    goForwardToExcercise: goForwardToExcercise,
    goBackToLastExcercise: goBackToLastExcercise,
    getScopeList: getScopeList,
    getSessionTime: getSessionTime
  };

});

