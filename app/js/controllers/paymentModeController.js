
	"use strict";

var app = angular.module("fintrackerApp");

app.controller('paymentModeController',function($scope,$http,messages){
	
	$scope.message;
	
	var refresh = function(){
		$http.get('/PaymentMode').then(function(docs){
		$scope.paymentModes = docs.data;
		$scope.message={
			  status: messages.info,
			  details:"info"
		  }
	},function(err){
		console.log(err);
	});
	}
	
	refresh();	
	
	$scope.savePaymentMode=function(){
		console.log($scope.paymentMode);
		var paymentMode={
			paymentMode:$scope.paymentMode
		}
		$http.post('/PaymentMode',paymentMode).then(function(){
          $scope.message={
			  status: messages.success,
			  details:"success"
		  }
		  refresh();
	},function(err){
		console.log(err)
		});
		$scope.paymentMode = "";
		
	}

});

