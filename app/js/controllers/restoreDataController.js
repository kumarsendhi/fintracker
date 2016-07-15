"use strict";

var j = jQuery.noConflict();

var app = angular.module("fintrackerApp");

app.controller('RestoreDataController',RestoreDataController);

RestoreDataController.$inject=['$scope', '$http', '$cookies', 'messages'];

function RestoreDataController($scope, $http, $cookies, messages) {
	console.log("Inside Restore Data Controller");

	$scope.clickRestore = function () {
		console.log("sending the file field changes successfully.")
		var control = document.getElementById('SelectFile')
		var file = control.files[0];
		//console.log(files.length);

		var reader = new FileReader();
		reader.onload = function (event) {
			var contents = event.target.result;
			//var contentjson =angular.toJson(contents)
			console.log("File contents: " + contents);
			$http.post('/RestoreData',contents).then(function (docs) {
			console.log(docs);
			$scope.message = {
				status: messages.success,
				details: "Restore successfull"
			}
		}, function (err) {
			console.log(err)
		})
		};

		reader.onerror = function (event) {
			console.error("File could not be read! Code " + event.target.error.code);
		};

		reader.readAsText(file);

	}
}