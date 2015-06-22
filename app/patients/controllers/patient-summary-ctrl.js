'use strict';
angular.module('patients')
.controller('PatientSummaryCtrl', ['$scope', 'records', function ($scope, records) {

  console.log('Hello from your Controller: PatientSummaryCtrl in module patients:. This is your controller:', this);
  console.log ("Hello RECORDS" + records);
  $scope.records = records;
}]);
