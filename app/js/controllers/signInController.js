"use strict";

var j = jQuery.noConflict();

var app = angular.module("fintrackerApp");

app.controller('signinController',signinController);

signinController.$inject =['$scope', '$http', '$cookies', '$location', '$rootScope', 'messages'];

function signinController($scope, $http, $cookies, $location, $rootScope, messages) {
	console.log("Inside SignIn Data Controller");

	$scope.user = {
		userName: "",
		password: ""
	}

	$scope.signup = function () {
		$http.post('/signin', $scope.user)
			.success(function (user) {
				// No error: authentication OK    
				$location.url('/login');
			})
			.error(function (err) {
				// Error: authentication failed
				$rootScope.message = 'Signin failed.';
				$scope.message = {
					status: messages.danger,
					details: err
				}
				$scope.user = {
					userName: "",
					password: ""
				}

			});
	}
}