'use strict';
angular.module('patients')
.controller('DirectoryCtrl', [ '$scope', 'Patients', function ($scope, Patients) {
  console.log('Hello from your Controller: DirectoryCtrl in module patients:. This is your controller:', this);
  var directory = this;
  directory.patients = Patients.get();

  $scope.$on('$stateChangeStart', function (event, toState, toParams) {
    if (toState.name.indexOf('patient_directory') >= 0) {
      Patients.clearCurrent();
    }
  });

  $scope.$on('patients.update', function () {
    directory.patients = Patients.get();
    $scope.$apply();
  });
}]);
