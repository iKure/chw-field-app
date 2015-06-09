'use strict';
angular.module('patients')
.controller('PatientDirectoryCtrl', [ '$scope', 'Patients', function ($scope, Patients) {
  console.log('Hello from your Controller: DirectoryCtrl in module patients:. This is your controller:', this);
  $scope.records = [];
  Patients.list().then(function (results) {
    $scope.records = [];
    results.rows.forEach(function (row) {
      $scope.records.push(row.doc);
    });
  });
}]);
