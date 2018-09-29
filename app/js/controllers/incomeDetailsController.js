
"use strict";

var j = jQuery.noConflict();

var app = angular.module("fintrackerApp");

app.controller('incomeDetailsController',incomeDetailsController);
incomeDetailsController.$inject=['$scope', '$http', '$cookies','$rootScope', 'messages','chartIncome'];

function incomeDetailsController($scope, $http, $cookies,$rootScope, messages,chartIncome) {
	console.log("successfully inside income Incomes controller");

	$scope.months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
	$scope.weeks = ['week 1', 'week 2', 'week 3', 'week 4', 'week 5'];
    $scope.types=['Salary','Rent','Cash Deposit','Home Loan'];
	$scope.hideTable = true;


	$scope.args = "";
	$scope.message;
	$scope.Incomes = [];
	$scope.OriginalData = ""
	$scope.filterData = "";

	var nullIncomes = function () {
		$scope.Income.year = "";
		$scope.Income.month = "";
		$scope.Income.week = "";
        $scope.Income.type = "";
		$scope.Income.date = "";
		$scope.Income.Amount = "";
		$scope.Income.incomeComment = "";
	}

	var MonthlyIncomeAmount = function () {
		$scope.monthlyIncome = 0;
		for (var data in $scope.filterData) {
            if($scope.filterData[data].type !== 'Cash Withdraw' ){
                $scope.monthlyIncome += $scope.filterData[data].Amount;
            }
            else{
                 $scope.monthlyIncome -= $scope.filterData[data].Amount;
            }		
		}
	}


	$scope.monitorYear = function () {
		if ($scope.Income.year == undefined) {
			$scope.OriginalData = "";
			$scope.filterData = "";
			$scope.Incomes = "";
			$scope.Income = "";
			$scope.hideTable = true;
		}
	}

	$scope.generateIncomeForm = function () {
		if ($scope.Income == undefined || $scope.Income.year == undefined) {
			$scope.message = {
				status: messages.danger,
				Incomes: "Year is required"
			}
			return;
		}
		else {
			$scope.message = "";
		}
		$scope.hideTable = false;
	}

	function refresh() {
		var dfd = j.Deferred();
		$http.get('/IncomeDetails/' + $scope.Income.year + '/' + $scope.Income.month+'/'+$rootScope.User).then(function (docs) {
			console.log(docs);
			$scope.OriginalData = docs.data;
			$scope.filterData = docs.data;
			$scope.Incomes = docs.data;
			var y = $scope.Income.year;
			var m = $scope.Income.month;
			nullIncomes();
			$scope.Income.year = y;
			$scope.Income.month = m;
			MonthlyIncomeAmount();
			$scope.Hello = chartIncome.drawPieChart($scope.filterData);
			dfd.resolve();
		}, function (err) {
			console.log(err);
			dfd.reject(err);
		});

		return dfd.promise();
	}

	var filterIncomes = function () {
		$scope.filterData = $scope.OriginalData;
		if ($scope.Income.month !== "" && $scope.Income.month !== undefined && $scope.Income.month !== null) {
			$scope.filterData = $scope.filterData.filter(function (i, n) {
				return i.month === $scope.Income.month;
			});
		}

		if ($scope.Income.week !== "" && $scope.Income.week !== undefined && $scope.Income.week !== null) {
			$scope.filterData = $scope.filterData.filter(function (i, n) {
				return i.week === $scope.Income.week;
			});
		}

		if ($scope.Income.type !== "" && $scope.Income.type !== undefined && $scope.Income.type !== null) {
			$scope.filterData = $scope.filterData.filter(function (i, n) {
				return i.type === $scope.Income.type;
			});
		}
   
        
		/**
		if($scope.Income.date !=="" && $scope.Income.date !== undefined && $scope.Income.date !== null){
			$scope.filterData =$scope.filterData.filter(function (i,n){
				return new Date(i.date).setHours(0, 0, 0, 0) === new Date($scope.Income.date).setHours(0, 0, 0, 0);
    		});
		}
		**/

		MonthlyIncomeAmount();
		$scope.Hello = chartIncome.drawPieChart($scope.filterData);
		$scope.Incomes = $scope.filterData;
	}


	$scope.monitorMonth = function () {
		refresh().then(function () {
			filterIncomes();
		}
			)
	}


	$scope.monitorChange = function () {
		filterIncomes();
	}

    

	$scope.addIncomes = function () {
		console.log($scope.Income);
		$scope.Income.user =$rootScope.User;
		$http.post('/IncomeDetails', $scope.Income).then(function (docs) {
			console.log(docs);
			refresh();
			nullIncomes();
			$scope.Income.year = docs.data.year;
			$scope.Income.month = docs.data.month;
			$scope.message = {
				status: messages.success,
				Incomes: "success"
			}
		}, function (err) {
			console.log(err)
		});
	}

	$scope.remove = function (id) {
		console.log(id);
		$http.delete('/IncomeDetails/' + id).success(function (response) {
			refresh();

		});
	}

	$scope.edit = function (id) {
		console.log(id);
		$http.get('/IncomeDetails/' + id + '/Incomes'+'/'+$rootScope.User).success(function (response) {


			$scope.Income = response;
			$scope.Income.expenditures = response.expenditures;
			//$scope.Income.expenditures = response.expenditures.expenditureCategory;
			//$scope.expenditure = $scope.expendituresfromdb[0].expenditureCategory;
			filterIncomes();
			console.log($scope.Income);

		});
	}

	$scope.update = function () {
		console.log($scope.Income._id);
		$http.put('/IncomeDetails/' + $scope.Income._id, $scope.Income).success(function (response) {
			refresh();
		});
	};

	$scope.deselect = function () {
		$scope.Income = "";
        $scope.hideTable = true;
	};

};


app.directive('jqdatepicker', function () {
    return {
        restrict: 'A',
        require: 'ngModel',
		link: function (scope, element, attrs, incomeIncomesController) {
            element.datepicker();
        }
    };
});


