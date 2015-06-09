'use strict';
angular.module('patients')
.controller('PatientDirectoryCtrl', [ '$scope', 'Patients', function ($scope, Patients) {
  console.log('Hello from your Controller: PatientDirectoryCtrl in module patients:. This is your controller:', this);
  $scope.records = [];
  Patients.list().then(function (results) {
    console.log('PatientDirectoryCtrl: Got ' + results.rows.length + ' patients');
    $scope.records = [];
    results.rows.forEach(function (row) {
      $scope.records.push(row.doc);
    });
    $scope.$apply();
  });
}]);
