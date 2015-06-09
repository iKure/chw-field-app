'use strict';
angular.module('patients')
.service('Patients', [
  '$rootScope',
  'Config',
  function ($rootScope, Config, SharedState) {
    console.log('Hello from your Service: Patients in module patients');

    var localDB = new PouchDB('patients');

    var service = {};

    function get (id) {
      return localDB.get(id);
    }
    service.get = get;

    function list () {
      return localDB.allDocs({
        include_docs: true,
      });
    }
    service.list = list;

    function save (patient) {
      var promise = false;
      patient.date_modified = Date.now();
      if (patient._id) {
        console.log('PatientsService: Saving existing object');
        promise = localDB.put(patient);
      } else {
        console.log('PatientService: Saving new object');
        patient.date_created = Date.now();
        promise = localDB.post(patient);
      }
      promise.then(function (response) {
        console.log('PatientService: Saved patient: ' + response.id);
      });
      return promise;
    }
    service.save = save;

    return service;
  }
]);
