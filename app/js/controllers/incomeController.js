
	"use strict";

var app = angular.module("fintrackerApp");

app.controller('incomeController',function($scope,$http,$cookies,messages){
	console.log("successfully inside income controller");
	if($cookies.get('Months')==null){
		$scope.months= [];
	}else{
		$scope.months= $cookies.get('Months');
	}
	
	if($cookies.get('Weeks')==null){
		$scope.weeks= [];
	}else{
		$scope.weeks= $cookies.get('Weeks');
	}
	
	if($cookies.get('Expenditures')==null){
		$scope.expenditures= [];
	}else{
		$scope.expenditures= $cookies.get('Expenditures');
	}
	
	$scope.args="";
	$scope.message;
	
	$scope.generateExpenseForm = function(){
		
	}
	
	$scope.getMonth = function () {
		if ($scope.months.length <= 0) {
			$scope.args = "month";
			$http.get('/' + $scope.args).then(function (docs) {
				$scope.monthsfromdb = docs.data;
				$scope.month = "(blank)";
				$scope.message = {
					status: messages.info,
					details: "info"
				}
			}, function (err) {
				console.log(err);
			});
		}
	}
	
	$scope.getWeek = function () {
		if ($scope.weeks.length <= 0) {
			$scope.args = "week";
			$http.get('/' + $scope.args).then(function (docs) {
				$scope.weekfromdb = docs.data;
				$scope.week = "(blank)";
				$scope.message = {
					status: messages.info,
					details: "info"
				}
			}, function (err) {
				console.log(err);
			});
		}
	}
	
	$scope.getExpenditure = function(){
		if($scope.expenditures.length <=0){
			$scope.args = "expenditure";
			$http.get('/'+$scope.args).then(function(docs){
				$scope.expendituresfromdb = docs.data;
				$scope.expenditure ="(blank)";
				$scope.message ={
					status: messages.info,
					details: "info"
				}
			},function(err){
				console.log(err);
			});
		}
	}
		
		
		
		
	});


