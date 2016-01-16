

"use strict";

var app = angular.module("fintrackerApp", ['ngRoute', 'ngCookies']);

app.config(function ($routeProvider, $locationProvider, $httpProvider) {
  var checkLoggedin = function ($q, $timeout, $http, $location, $rootScope) {
    var deferred = $q.defer();

    $http.get('/loggedin').success(function (user) {
      if (user !== "0") {
        $rootScope.User = user.userName;
        deferred.resolve();
      }
      else {
        $rootScope.message = 'You need to login';
        deferred.reject();
        $location.url('/login')
      }
    })

    return deferred.promise;
  }

  $httpProvider.interceptors.push(function ($q, $location,$rootScope) {
    return {
      response: function (response) {
        // do something on success
        return response;
      },
      responseError: function (response) {
        if (response.status === 401) {
          $rootScope.User ="";
          $location.url('/login');
        }
        return $q.reject(response);
      }
    };
  });

  $routeProvider
    .when('/ExpenseDetails', {
      templateUrl: 'templates/expenseform.html',
      controller: 'incomeController',
      resolve: {
        loggedin: checkLoggedin
      }
    })
    .when('/ExpenditureCategory', {
      templateUrl: 'templates/expenditureCategory.html',
      controller: 'expenditureCategoryController',
      resolve: {
        loggedin: checkLoggedin
      }
    })
    .when('/BackupData', {
      templateUrl: 'templates/BackupData.html',
      controller: 'BackupDataController',
      resolve: {
        loggedin: checkLoggedin
      }
    })
    .when('/RestoreData', {
      templateUrl: 'templates/RestoreData.html',
      controller: 'RestoreDataController',
      resolve: {
        loggedin: checkLoggedin
      }
    })
    .when('/login', {
      templateUrl: 'templates/login.html',
      controller: 'loginController'
    })
    .when('/logout', {
      templateUrl: 'templates/logout.html',
      controller: 'logOutController'
    })
    .otherwise({
      redirectTo: '/login'
    });
});



