'use strict';
angular.module('patients')
.controller('PatientSummaryCtrl', ['$scope', 'Patients', 'Cases', function ($scope, Patients, Cases) {

  console.log('Hello from your Controller: PatientSummaryCtrl in module patients:. This is your controller:', this);

  $scope.$on('patient.change', function () {
    $scope.patient = Patients.getCurrent();
  });

  $scope.records = Cases.records;
  $scope.$on('cases.update', function () {
    $scope.records = Vitals.records;
  });
}]);
