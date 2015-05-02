var workoutApp = angular.module('workoutApp', ['ngRoute']);

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