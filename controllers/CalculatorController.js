var workoutApp = angular.module('workoutApp', ['ngRoute']);

workoutApp.controller('calculatorController', function ($scope) {

	<!--  10 * Kg + 6.25 * Height - 5 * Age + 5 -->
	var kg = parseInt($scope.Kg);
	var height = parseInt($scope.Height);
	var age = parseInt($scope.Age);

	$scope.defaultCalorieIntake = 10 * kg + 6.25 * height - 5 * age + 5;
});