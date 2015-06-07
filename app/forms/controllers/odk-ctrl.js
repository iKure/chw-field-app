'use strict';
angular.module('forms')
.controller('OdkCtrl', [ '$scope', 'Forms', function ($scope, Forms) {

  console.log('Hello from your Controller: OdkCtrl in module forms:. This is your controller:', this);
  $scope.records = Forms.records;

  $scope.$on('forms.update', function () {
    $scope.records = Forms.records;
    console.log("OdkCtrl: Got new records " + $scope.records.length);
    $scope.$apply();
  });
}]);
