'use strict';
angular.module('patients')
.controller('RegisterCrtl', [ '$scope', '$state', 'Patients', function ($scope, $state, Patients) {
  console.log('This is the RegisterCrtl');

  this.addPatient = function (patient) {
    Patients.addPatient(patient)
  };
  $scope.$on('patient.new', function (event, id) {
  	$state.go('patient.summary',{id:id});
  });
}]);
