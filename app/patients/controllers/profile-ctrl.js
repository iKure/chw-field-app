'use strict';
angular.module('patients')
.controller('ProfileCtrl', [ '$scope', '$stateParams', 'Patients', function ($scope, $stateParams, Patients) {
  console.log('Hello from your Controller: ProfileCtrl in module patients:. This is your controller:', this);
  var profile = this;

  Patients.setCurrent($stateParams.id);
  $scope.$on('patient.change', function () {
    profile.patient = Patients.getCurrent();
    $scope.$apply();
  });
}]);
