var express = require('express');
var router = express.Router();

//ANGULAR 
var workoutApp = angular.module('workoutApp', ['ngRoute']);
var workoutModel = require('../models/workoutModel.js');

//----------------------------------------------------------
//VARIABLES
var excerciseCounter = 0;
var actualExcerciseID = 0;
var currentlyViewedExcerciseID = 0;
var excerciseContainer = [];
var sessionTimerGlobal = "";
var allKgs = 0;
var allReps = 0;

//----------------------------------------------------------
//ANGULAR CONTROLLERS
workoutApp.controller('mainController', function ($scope) {
	$scope.workoutChooser = "Chose your workout type";
});

workoutApp.controller("workout01Controller", function ($scope, $location, excerciseService) {

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

    		for (var i = 0; i < excerciseContainer.length; i++) {
    			for(var j in excerciseContainer[i]) {
    				console.log(excerciseContainer[i][j]);
    				for(var k = 0; k < excerciseContainer[i][j].length; k++) {
    					allKgs = allKgs + parseInt(excerciseContainer[i][j][k].kgs);
    					allReps = allReps + parseInt(excerciseContainer[i][j][k].reps);
    					console.log('All kgs:' + allKgs);
    				}
    			}
    		};

    		//redirect to result page
    	
		  $location.path('/workoutresult'); 
  		  $scope.workoutResult = excerciseContainer;
		  $.post('/workout/saveWorkoutToDb', excerciseContainer);
			//saveWorkoutToDb(excerciseContainer);

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

module.exports = function () {

  router.post('/sendDataToDb', function (req, res) {  
      workoutModel.sendDataToDb();
  });

  return router;
};

