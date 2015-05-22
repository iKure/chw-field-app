'use strict';
angular.module('patients')
.service('Patients', [
  '$rootScope',
  'Config',
  function ($rootScope, Config) {
    console.log('Hello from your Service: Patients in module patients');

    var localDB = new PouchDB('patients');

    if (Config.ENV.PATIENTS) {
      Config.ENV.PATIENTS.forEach( function (patient) {
        localDB.get(patient['_id']).catch(function () {
          localDB.put(patient);
        });
      });
    }

    var service = {
      getPatients:function () {
        console.log('PatientService: fetching all patients');
        localDB.allDocs({include_docs: true, descending: true}, function (err, docs) {
          service.patients = [];
          docs.rows.forEach( function (row) {
            service.patients.push(row.doc);
          });
          $rootScope.$broadcast('patients.update');
        });
      },
      addPatient: function (patient) {
        console.log('got patient: ' + patient.firstName);
        localDB.post(patient);
        service.getPatients();
      },
      getPatient: function (id) {
        console.log(id);
        return service.patients[0]; //there is probably something smart to do here
      }
    };

    service.getPatients();

    return service;
  }
]);
