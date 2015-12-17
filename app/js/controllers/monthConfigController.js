
"use strict";

var app = angular.module("fintrackerApp");

app.controller('monthConfigController',function($scope,$http,messages){
	
	$scope.message;
	
	var refresh = function(){
		$http.get('/MonthConfig').then(function(docs){
		$scope.months = docs.data;
		$scope.message={
			  status: messages.info,
			  details:"info"
		  }
	},function(err){
		console.log(err);
	});
	}
	
	refresh();	
	
	$scope.saveMonth=function(){
		console.log($scope.Month);
		var Month={
			month:$scope.Month
		}
		$http.post('/MonthConfig',Month).then(function(){
          $scope.message={
			  status: messages.success,
			  details:"success"
		  }
	},function(err){
		console.log(err)
		});
		$scope.Month = "";
		refresh();
	}

});

