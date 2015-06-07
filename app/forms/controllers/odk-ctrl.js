'use strict';
angular.module('forms')
.controller('OdkCtrl', [ '$scope', 'ODK', function ($scope, ODK) {

  console.log('Hello from your Controller: OdkCtrl in module forms:. This is your controller:', this);
  $scope.records = ODK.records;

  $scope.$on('odk.update', function () {
    $scope.records = ODK.records;
    console.log("OdkCtrl: Got new records " + $scope.records.length);
    $scope.$apply();
  });
}]);
