'use strict';
angular.module('clinic')
.service('Clinic', ['$rootScope', '$q', 'Config', 'pouchDB', 'Auth', function ($rootScope, $q, Config, pouchDB, Auth) {
  console.log('Hello from your Service: Clinic in module clinic');

  var service = {}
  service.localDB = false;
  service.removeDB = false;
  // List available clinics — based on User's permission to databases
  function getAvailableClinics(user) {
    return user.clinics;
  }
  service.getAvailableClinics = getAvailableClinics;
  // Set pouch to load specific clinic
  function setClinic(clinic_id) {
    var deferred = $q.defer();
    console.log('ClinicService: Setting clinic to ' + clinic_id);
    service.localDB = new pouchDB(clinic_id);
    service.localDB.info().then(function () {
      console.log('ClinicService: Set up localDB');
      // attempt to set up syncing
      service.sync();
      deferred.resolve(true);
    });
    return deferred.promise;
  }
  service.setClinic = setClinic;

  function sync() {
    // cancel current syncing (if exists)
    console.log('ClinicService: Syncing....');
    // create new live environment
    return true;
  }
  service.sync = sync;

  function getClinic () {
    var deferred = $q.defer();
    if (service.localDB) {
      deferred.resolve(service.localDB);
    } else if (Auth.currentUser) {
      console.log('ClinicService: Trying to set clinic...');
      var clinics = service.getAvailableClinics(Auth.currentUser);
      if (clinics.length == 1) { // set up current clinic...
        console.log('ClinicService: Got auth — setting clinic');
        service.setClinic(clinics[0]).then(function () {
          console.log('ClinicService: returning clinic db');
          deferred.resolve(service.localDB);
        });
        return deferred.promise;
      }
    }
    console.log('ClinicService: No clinic to get');
    deferred.reject('ClinicService: No clinic selected');
    return deferred.promise;
  }
  service.getClinic = getClinic;

  return service;
}]);
