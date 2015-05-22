'use strict';
angular.module('patients')
.service('Patients', [
  '$rootScope',
  'Config',
  function ($rootScope, Config) {
    console.log('Hello from your Service: Patients in module patients');

    var defaultPatients = [];
    if (Config.ENV.PATIENTS) {
      defaultPatients = Config.ENV.PATIENTS;
    }

    var service = {
      patients: defaultPatients,
      addPatient: function (patient) {
        console.log('got patient: ' + patient.firstName);
        service.patients.push(patient);
        $rootScope.$broadcast('patients.update');
      },
      getPatient: function (id) {
        console.log(id);
        return service.patients[0]; //there is probably something smart to do here
      }
    };

    return service;
  }
]);
