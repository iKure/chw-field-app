'use strict';
angular.module('patients')
.controller('PatientSummaryCtrl', ['$scope', 'Patients', 'Vitals', function ($scope, Patients, Vitals) {

  console.log('Hello from your Controller: PatientSummaryCtrl in module patients:. This is your controller:', this);
  var ctrl = this;
  ctrl.patient = Patients.getCurrent();

  $scope.$on('patient.change', function () {
    ctrl.patient = Patients.getCurrent();
    $scope.$apply();
  });

  ctrl.records = Vitals.get();
  $scope.$on('vitals.update', function () {
  	ctrl.records = Vitals.get();
  	$scope.$apply();
  });
}]);
