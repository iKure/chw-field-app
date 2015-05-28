'use strict';
angular.module('patients')
.controller('PatientSummaryCtrl', ['$scope', 'Patients', 'Vitals', function ($scope, Patients, Vitals) {

  console.log('Hello from your Controller: PatientSummaryCtrl in module patients:. This is your controller:', this);

  $scope.$on('patient.change', function () {
    $scope.patient = Patients.getCurrent();
    $scope.$apply();
  });

  $scope.records = Vitals.get();
  $scope.$on('vitals.update', function () {
    $scope.records = Vitals.get();
    $scope.$apply();
  });
}]);
