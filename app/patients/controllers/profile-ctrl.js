'use strict';
angular.module('patients')
.controller('ProfileCtrl', [ '$scope', '$stateParams', 'Patients', function ($scope, $stateParams, Patients) {
  console.log('Hello from your Controller: ProfileCtrl in module patients:. This is your controller:', this);
  var profile = this;

  Patients.getPatient($stateParams.id);
  $scope.$on('patient.update', function () {
    console.log("Profile got patient update" + Patients.patient);
    profile.patient = Patients.patient;
    $scope.$apply();
  });
}]);
