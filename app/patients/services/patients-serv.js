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
          if( patient._id ) {
            localDB.put(patient);
          }
        });
      });
    }

    var service = {
      patient: false,
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
        return localDB.post(patient).then(function (response) {
          console.log("Service made new id: " + response.id);
          service.getPatients();
          $rootScope.$broadcast('patient.new', response.id);
        });
      },
      savePatient: function (patient) {
        console.log('patients-serv: SAVING PATIENT ' + patient.firstName);
        return localDB.put(patient).then(function (response) {
          service.getPatients();
        });
      },
      getPatient: function (id) {
        console.log("Getting patient: " + id);
        localDB.get(id).then( function (doc) {
          service.patient = doc;
          $rootScope.$broadcast('patient.update');
        }).catch( function () {
          $rootScope.$broadcast('patient.update');
        });
        return false;
      }
    };

    service.getPatients();

    return service;
  }
]);
