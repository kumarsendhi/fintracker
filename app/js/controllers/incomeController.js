
"use strict";

var j = jQuery.noConflict();

var app = angular.module("fintrackerApp");

app.controller('incomeController', function ($scope, $http, $cookies,$rootScope, messages,chart) {
	console.log("successfully inside income controller");

	$scope.months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
	$scope.weeks = ['week 1', 'week 2', 'week 3', 'week 4', 'week 5'];
	$scope.hideTable = true;


	$scope.args = "";
	$scope.message;
	$scope.Details = [];
	$scope.OriginalData = ""
	$scope.filterData = "";

	var nullDetails = function () {
		$scope.Detail.year = "";
		$scope.Detail.month = "";
		$scope.Detail.week = "";
		$scope.Detail.expenditures = "";
		$scope.Detail.date = "";
		$scope.Detail.Amount = "";
		$scope.Detail.expenseComment = "";
	}

	var SpendingAmount = function () {
		$scope.totalSpent = 0;
		for (var data in $scope.filterData) {
			$scope.totalSpent += $scope.filterData[data].Amount;
		}
	}


	$scope.monitorYear = function () {
		if ($scope.Detail.year == undefined) {
			$scope.OriginalData = "";
			$scope.filterData = "";
			$scope.Details = "";
			$scope.Detail = "";
			$scope.hideTable = true;
		}
	}

	$scope.generateExpenseForm = function () {
		if ($scope.Detail == undefined || $scope.Detail.year == undefined) {
			$scope.message = {
				status: messages.danger,
				details: "Year is required"
			}
			return;
		}
		else {
			$scope.message = "";
		}
		$scope.getExpenditure();
		$scope.hideTable = false;
	}

	function refresh() {
		var dfd = j.Deferred();
		$http.get('/ExpenseDetails/' + $scope.Detail.year + '/' + $scope.Detail.month+'/'+$rootScope.User).then(function (docs) {
			console.log(docs);
			$scope.OriginalData = docs.data;
			$scope.filterData = docs.data;
			$scope.Details = docs.data;
			var y = $scope.Detail.year;
			var m = $scope.Detail.month;
			nullDetails();
			$scope.Detail.year = y;
			$scope.Detail.month = m;
			SpendingAmount();
			dfd.resolve();
		}, function (err) {
			console.log(err);
			dfd.reject(err);
		});

		return dfd.promise();
	}

	var filterDetails = function () {
		$scope.filterData = $scope.OriginalData;
		if ($scope.Detail.month !== "" && $scope.Detail.month !== undefined && $scope.Detail.month !== null) {
			$scope.filterData = $scope.filterData.filter(function (i, n) {
				return i.month === $scope.Detail.month;
			});
		}

		if ($scope.Detail.week !== "" && $scope.Detail.week !== undefined && $scope.Detail.week !== null) {
			$scope.filterData = $scope.filterData.filter(function (i, n) {
				return i.week === $scope.Detail.week;
			});
		}

		if ($scope.Detail.expenditures !== "" && $scope.Detail.expenditures !== undefined && $scope.Detail.expenditures !== null) {
			$scope.filterData = $scope.filterData.filter(function (i, n) {
				return i.expenditures === $scope.Detail.expenditures;
			});
		}
		/**
		if($scope.Detail.date !=="" && $scope.Detail.date !== undefined && $scope.Detail.date !== null){
			$scope.filterData =$scope.filterData.filter(function (i,n){
				return new Date(i.date).setHours(0, 0, 0, 0) === new Date($scope.Detail.date).setHours(0, 0, 0, 0);
    		});
		}
		**/

		SpendingAmount();
		$scope.Hello = chart.drawPieChart($scope.filterData);
		$scope.Details = $scope.filterData;
	}


	$scope.monitorMonth = function () {
		refresh().then(function () {
			filterDetails();
		}
			)
	}


	$scope.monitorChange = function () {
		filterDetails();
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
		$scope.Detail.user =$rootScope.User;
		$http.post('/ExpenseDetails', $scope.Detail).then(function (docs) {
			console.log(docs);
			refresh();
			nullDetails();
			$scope.Detail.year = docs.data.year;
			$scope.Detail.month = docs.data.month;
			$scope.message = {
				status: messages.success,
				details: "success"
			}
		}, function (err) {
			console.log(err)
		});
	}

	$scope.remove = function (id) {
		console.log(id);
		$http.delete('/ExpenseDetails/' + id).success(function (response) {
			refresh();

		});
	}

	$scope.edit = function (id) {
		console.log(id);
		$http.get('/ExpenseDetails/' + id + '/details'+'/'+$rootScope.User).success(function (response) {


			$scope.Detail = response;
			$scope.Detail.expenditures = response.expenditures;
			//$scope.Detail.expenditures = response.expenditures.expenditureCategory;
			//$scope.expenditure = $scope.expendituresfromdb[0].expenditureCategory;
			filterDetails();
			console.log($scope.Detail);

		});
	}

	$scope.update = function () {
		console.log($scope.Detail._id);
		$http.put('/ExpenseDetails/' + $scope.Detail._id, $scope.Detail).success(function (response) {
			refresh();
		});
	};

	$scope.deselect = function () {
		$scope.Detail = "";
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


