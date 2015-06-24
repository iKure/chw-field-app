'use strict';
angular.module('patients')
.controller('PatientCtrl', [ '$scope', '$state', '$ionicHistory', 'patient', function ($scope, $state, $ionicHistory, patient) {
  console.log('Hello from your Controller: ProfileCtrl in module patients:. This is your controller:', this);

  if (!patient) {
    $state.go('patients.directory');
    return false;
  }
  $scope.patient = patient;

  $scope.back = function () {
    $ionicHistory.goBack();
  }
}]);
