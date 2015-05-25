'use strict';
angular.module('patients')
.controller('PatientInfoCtrl', [ '$scope', '$state', 'Patients', function ($scope, $state, Patients) {
  console.log('Hello from your Controller: PatientInfoCtrl in module patients:. This is your controller:', this);
  var ctrl = this;

  ctrl.patient = Patients.patient;
  $scope.$on('patient.update', function () {
    console.log("Crtl got patient update" + Patients.patient);
    ctrl.patient = Patients.patient;
    $scope.$apply();
  });

  this.savePatient = function (patient) {
    Patients.savePatient(patient).then(function () {
      $state.go('patient.summary', { id:Patients.patient._id });
    });
  };
}]);
