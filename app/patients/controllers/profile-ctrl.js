'use strict';
angular.module('patients')
.controller('ProfileCtrl', [ '$scope', '$stateParams', 'Patients', function ($scope, $stateParams, Patients) {
  console.log('Hello from your Controller: ProfileCtrl in module patients:. This is your controller:', this);

  if (Patients.getCurrent()) {
    $scope.patient = Patients.getCurrent();
  }
  if ($stateParams.id) {
    Patients.setCurrent($stateParams.id);
  }
  $scope.$on('patient.change', function () {
    $scope.patient = Patients.getCurrent();
    $scope.$apply();
  });
}]);
