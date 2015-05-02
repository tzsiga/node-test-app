var workoutApp = angular.module('workoutApp', ['ngRoute']);

/*workoutApp.controller('calculatorController', function ($scope) {

	<!--  10 * Kg + 6.25 * Height - 5 * Age + 5 -->
	var kg = parseInt($scope.Kg);
	var height = parseInt($scope.Height);
	var age = parseInt($scope.Age);

	$scope.defaultCalorieIntake = 10 * kg + 6.25 * height - 5 * age + 5;
});*/

workoutApp.controller('calculatorController', function ($scope) {

	$scope.hello = "valami";

	var kg = parseInt($scope.Kg);
	var height = parseInt($scope.Height);
	var age = parseInt($scope.Age);
	console.log(kg);
	console.log(height);

	$scope.defaultCalorieIntake = 10 * kg + 6.25 * height - 5 * age + 5;
});

window.name = "NG_DEFER_BOOTSTRAP!";

/* require config here */

requirejs(['jquery','underscore','angularjs'], function ($, _ ) {
/* create angular app here */
 angular.element(document).ready(function () {
  angular.resumeBootstrap();
  
 });
}