'use strict';
angular.module('patients')
.controller('PatientCtrl', [ '$scope', '$state', '$stateParams', 'Patients', function ($scope, $state, $stateParams, Patients) {
  console.log('Hello from your Controller: ProfileCtrl in module patients:. This is your controller:', this);

  if (!$stateParams.id) {
    $state.go('patient_directory');
  }

  Patients.get($stateParams.id).then(function (doc) {
    $scope.patient = doc;
  });
}]);
