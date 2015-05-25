'use strict';
angular.module('main')
.controller('TabsCtrl', [ '$scope', 'Patients', function ($scope, Patients) {
  console.log('Hello from your Controller: TabsCtrl in module main:. This is your controller:', this);

  var ctrl = this;

  ctrl.patient = Patients.patient;
  $scope.$on('patient.update', function () {
    console.log('TabsCrtl got patient update' + Patients.patient);
    ctrl.patient = Patients.patient;
    $scope.$apply();
  });
}]);
