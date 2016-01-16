"use strict";

var j = jQuery.noConflict();

var app = angular.module("fintrackerApp");

app.controller('loginController', function ($scope, $http, $cookies, $location,$rootScope, messages) {
	console.log("Inside login Data Controller");

	$scope.user = {
		username: "",
		password: ""
	}

	$scope.postLogin = function(){
    $http.post('/login', "username="+$scope.user.username+"&password="+$scope.user.password,{
       headers: {'Content-Type': 'application/x-www-form-urlencoded'}
    })
   .success(function(user){
      // No error: authentication OK
      $rootScope.message = 'Authentication successful!';
      $location.url('/ExpenseDetails');
    })
    .error(function(){
      // Error: authentication failed
      $rootScope.message = 'Authentication failed.';
      $scope.message = {
					status: messages.danger,
					details: "login failed"
				}
      $location.url('/login');
    });
  };
})