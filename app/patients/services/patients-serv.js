'use strict';
angular.module('patients')
.service('Patients', [
  '$rootScope',
  function ($rootScope) {
    console.log('Hello from your Service: Patients in module patients');

    var service = {
      patients: [],
      addPatient: function (patient) {
        console.log("got patient: " + patient.first_name);
        service.patients.push(patient);
        $rootScope.$broadcast('patients.update');
      }
    };
    return service;
  }
]);
