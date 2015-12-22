
"use strict";

var app = angular.module("fintrackerApp");

app.controller('incomeController', function ($scope, $http, $cookies, messages) {
	console.log("successfully inside income controller");

	$scope.months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
	$scope.weeks = ['week 1', 'week 2', 'week 3', 'week 4', 'week 5'];


	$scope.args = "";
	$scope.message;
	$scope.Details =[];


	$scope.getMonth = function () {
		$scope.monthsfromdb = $scope.months;
		$scope.month = "(blank)";
	}

	$scope.getWeek = function () {
		$scope.weekfromdb = $scope.weeks;
		$scope.week = "(blank)";
	}

	$scope.getExpenditure = function () {
		if ($cookies.get('Expenditures') == null) {
			$scope.expenditures = [];
		} else {
			$scope.expenditures = JSON.parse($cookies.get('Expenditures'));
		}
		if ($scope.expenditures.length <= 0) {
			$scope.args = "expenditure";
			$http.get('/ExpenseDetails' + $scope.args).then(function (docs) {
				$scope.expendituresfromdb = docs.data;
				$cookies.put('Expenditures', JSON.stringify($scope.expendituresfromdb));
				$scope.expenditure = "(blank)";
				$scope.message = {
					status: messages.info,
					details: "info"
				}
			}, function (err) {
				console.log(err);
			});
		}
		else {
			$scope.expendituresfromdb = $scope.expenditures;
			$scope.expenditure = "(blank)";
		}
	}

	$scope.addDetails = function () {
		console.log($scope.Detail);
		$http.post('/ExpenseDetails', $scope.Detail).then(function (docs) {
			console.log(docs);
			refresh();
			$scope.Detail="";
			$scope.message = {
				status: messages.success,
				details: "success"
			}
		}, function (err) {
			console.log(err)
		});
	}
	
	function refresh(){
		$http.get('/ExpenseDetails').then(function(docs){
			console.log(docs);
		/**
			for (var i=0;i<docs.data.length;i++) {
				(function(i){
					console.log(docs.data[i].expenditures);
				$http.get('/ExpenseDetails/'+docs.data[i].expenditures+'/expenditure').then(function(expdocs){
					console.log(expdocs.data.expenditureCategory);
					docs.data[i].expenditures = expdocs.data.expenditureCategory;
				})
				})(i);
				
			}
			**/
			
			$scope.Details =docs.data;
			$scope.Detail ="";
			
		},function(err){
			console.log(err);
		});
	}
	
	refresh();
	
	
	$scope.remove=function(id){
		console.log(id);
		$http.delete('/ExpenseDetails/'+id).success(function(response){
		 refresh();
	 });
	}
	
	$scope.edit=function(id){
		console.log(id);
		$http.get('/ExpenseDetails/'+id+'/details').success(function(response){
		$scope.getMonth();
		$scope.getWeek();	
		$scope.getExpenditure();
		
		$scope.Detail =response;
		$scope.Detail.expenditures = response.expenditures;
		//$scope.Detail.expenditures = response.expenditures.expenditureCategory;
		//$scope.expenditure = $scope.expendituresfromdb[0].expenditureCategory;
		console.log($scope.Detail);
		
	});
	}
	
	$scope.update = function(){
	console.log($scope.Detail._id);
	$http.put('/ExpenseDetails/'+$scope.Detail._id,$scope.Detail).success(function(response){
		refresh();
	});
 };
 
 $scope.deselect=function(){
	 $scope.Detail ="";
 };

});


app.directive('jqdatepicker', function () {
    return {
        restrict: 'A',
        require: 'ngModel',
		link: function (scope, element, attrs, incomeController) {
            element.datepicker();
        }
    };
});


