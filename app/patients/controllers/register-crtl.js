'use strict';
angular.module('patients')
.controller('RegisterCrtl', [ '$scope', 'Patients', function ($scope, Patients) {
  console.log("This is the RegisterCrtl");

  this.addPatient = function (patient) {
    Patients.addPatient(patient)
  }
}]);
