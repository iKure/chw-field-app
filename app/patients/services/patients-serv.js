'use strict';
angular.module('patients')
.service('Patients', [
  '$rootScope',
  'Config',
  function ($rootScope, Config) {
    console.log('Hello from your Service: Patients in module patients');

    var default_patients = [];
    if (Config.ENV.PATIENTS) {
      default_patients = Config.ENV.PATIENTS;
    }

    var service = {
      patients: default_patients,
      addPatient: function (patient) {
        console.log("got patient: " + patient.first_name);
        service.patients.push(patient);
        $rootScope.$broadcast('patients.update');
      },
      getPatient: function (id) {
        return service.patients[0]; //there is probably something smart to do here
      }
    };

    return service;
  }
]);
