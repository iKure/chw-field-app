'use strict';
angular.module('patients')
.controller('DirectoryCtrl', [ '$scope', 'Patients', function ($scope, Patients) {
  console.log('Hello from your Controller: DirectoryCtrl in module patients:. This is your controller:', this);
  var directory = this;

  $scope.$on('patients.update', function () {
    directory.patients = Patients.patients;
  });

  this.patients = Patients.patients;

}]);