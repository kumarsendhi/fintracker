
	"use strict";

var app = angular.module("fintrackerApp");

app.controller('weekConfigController',function($scope,$http,messages){
	
	$scope.message;
	
	var refresh = function(){
		$http.get('/WeekConfig').then(function(docs){
		$scope.weeks = docs.data;
		$scope.message={
			  status: messages.info,
			  details:"info"
		  }
	},function(err){
		console.log(err);
	});
	}
	
	refresh();	
	
	$scope.saveWeekNo=function(){
		console.log($scope.weekNo);
		var weekNo={
			week:$scope.weekNo
		}
		$http.post('/WeekConfig',weekNo).then(function(){
          $scope.message={
			  status: messages.success,
			  details:"success"
		  }
	},function(err){
		console.log(err)
		});
		$scope.weekNo = "";
		refresh();
	}

});

