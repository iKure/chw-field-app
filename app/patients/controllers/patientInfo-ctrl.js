'use strict';
angular.module('patients')
.controller('PatientInfoCtrl', [ '$scope', '$state', 'Patients', function ($scope, $state, Patients) {
  console.log('Hello from your Controller: PatientInfoCtrl in module patients:. This is your controller:', this);
  var ctrl = this;

  ctrl.patient = Patients.getCurrent();
  $scope.$on('patients.change', function () {
    ctrl.patient = Patients.getCurrent();
    $scope.$apply();
  });

  this.savePatient = function (patient) {
    Patients.save(patient).then(function (response) {
      $state.go('patient.summary', { id:response.id });
    });
  };
}]);
