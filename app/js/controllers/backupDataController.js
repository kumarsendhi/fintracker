"use strict";

var j = jQuery.noConflict();

var app = angular.module("fintrackerApp");

app.controller('BackupDataController', function ($scope, $http, $cookies,$rootScope, messages) {
	console.log("inside backup controller")
	$scope.months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
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

	$scope.generateBackupForm = function () {
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

		$scope.hideTable = false;
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
			if(document.getElementById('dynamicDownloadLink')!=null){
				document.getElementById('content').removeChild(document.getElementById('dynamicDownloadLink'));
			}
			
			dfd.resolve();
		}, function (err) {
			console.log(err);
			dfd.reject(err);
		}
	
		);
		return dfd.promise();
	}

	var filterDetails = function () {
		$scope.filterData = $scope.OriginalData;
		if ($scope.Detail.month !== "" && $scope.Detail.month !== undefined && $scope.Detail.month !== null) {
			$scope.filterData = $scope.filterData.filter(function (i, n) {
				return i.month === $scope.Detail.month;
			});
		}

		$scope.Details = $scope.filterData;
	}


	$scope.monitorMonth = function () {
		refresh().then(function () {
			filterDetails();
		}
			)

	}

	$scope.backup = function () {
		if ($scope.Detail.month !== undefined && $scope.Detail.month !== null) {
			var data = $scope.OriginalData
			for(var i=0;i<data.length;i++){
				delete data[i]["$$hashKey"];
				delete data[i]["_id"];
			}
			var json = JSON.stringify(data);
			
			
			var blob = new Blob([json], { type: "application/json" });
			var url = URL.createObjectURL(blob);
			var d = document.createElement('div');
			d.id = "dynamicDownloadLink"
			document.getElementById('content').appendChild(d);

			var a = document.createElement('a');

			a.download = $scope.Detail.year + "_" + $scope.Detail.month + ".json";
			a.href = url;
			a.textContent = "Download " + $scope.Detail.year + "_" + $scope.Detail.month + ".json";

			document.getElementById('dynamicDownloadLink').appendChild(a);
		}
	}


});