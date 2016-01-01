

  "use strict";

var app = angular.module("fintrackerApp",['ngRoute','ngCookies']);

app.config(function($routeProvider){
  $routeProvider
  .when('/ExpenseDetails',{
    templateUrl: 'templates/expenseform.html',
        controller: 'incomeController'
  })
  .when('/ExpenditureCategory',{
    templateUrl: 'templates/expenditureCategory.html',
        controller: 'expenditureCategoryController'
  })
   .when('/BackupData',{
    templateUrl: 'templates/BackupData.html',
        controller: 'BackupDataController'
  })
    .when('/RestoreData',{
    templateUrl: 'templates/RestoreData.html',
        controller: 'RestoreDataController'
  })
  /**
  .when('/weekconfig',{
    templateUrl: 'templates/weekconfig.html',
        controller: 'weekConfigController'
  })
  .when('/MonthConfig',{
    templateUrl: 'templates/monthconfig.html',
        controller: 'monthConfigController'
  })
  **/
  .otherwise({
    redirectTo:'/ExpenseDetails'
  });
});



