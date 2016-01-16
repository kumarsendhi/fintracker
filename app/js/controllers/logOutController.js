"use strict";

var j = jQuery.noConflict();

var app = angular.module("fintrackerApp");

app.controller('logOutController', function ($scope, $http, $cookies, $location,$rootScope, messages) {
	console.log("successfully inside logout controller");
	
	$http.post('/logout') .success(function(doc){
      // No error: authentication OK
	  $rootScope.User=null;

	   $scope.message = {
					status: messages.success,
					details: "logout successfull"
				}
      $location.url('/logout');
    })
    .error(function(){
      // Error: authentication failed
	  $rootScope.User=null;
      $scope.message = {
					status: messages.danger,
					details: "logout successfull"
				}
      $location.url('/logout');
    });
});