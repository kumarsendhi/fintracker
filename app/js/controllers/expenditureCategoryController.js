
	"use strict";

var app = angular.module("fintrackerApp");

app.controller('expenditureCategoryController',expenditureCategoryController)

expenditureCategoryController.$inject=['$scope','$http','messages']


function expenditureCategoryController($scope,$http,messages){
	
	$scope.message;
	
	var refresh = function(){
		$http.get('/ExpenditureCategory').then(function(docs){
		$scope.expenditures = docs.data;
		$scope.message={
			  status: messages.info,
			  details:"info"
		  }
	},function(err){
		console.log(err);
	});
	}
	
	refresh();	
	
	$scope.saveExpenditureCategory=function(){
		console.log($scope.expCat);
		var expCat={
			expenditureCategory:$scope.expCat
		}
		$http.post('/ExpenditureCategory',expCat).then(function(){
          $scope.message={
			  status: messages.success,
			  details:"success"
		  }
		  refresh();
	},function(err){
		console.log(err)
		});
		$scope.expCat = "";
		
	}

};

