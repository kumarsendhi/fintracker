
	"use strict";

var app = angular.module("fintrackerApp");

app.controller('incomeController',function($scope,$http){
	console.log("successfully inside income controller");
	$scope.months=[];
	$scope.generateExpenseForm = function(){
		
	}
	
	$scope.getMonth =function(){
		console.log($scope.months.length);
	}
	
});


