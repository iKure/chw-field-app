'use strict';
angular.module('clinic')
.service('Clinic', ['$rootScope', '$q', 'Config', 'pouchDB', 'Auth', function ($rootScope, $q, Config, pouchDB, Auth) {
  console.log('Hello from your Service: Clinic in module clinic');

  var service = {}
  service.localDB = false;
  service.removeDB = false;
  // List available clinics — based on User's permission to databases
  function getClinics(user) {
    return user.clinics;
  }
  service.getClinics = getClinics;
  // Set pouch to load specific clinic
  function setClinic(clinic_id) {
    console.log('ClinicService: Setting clinic to ' + clinic_id);
    service.localDB = new pouchDB(clinic_id);
    console.log('ClinicService: Set up localDB');
    // attempt to set up syncing
    service.sync();
    return true;
  }
  service.setClinic = setClinic;

  function sync() {
    // cancel current syncing (if exists)
    console.log('ClinicService: Syncing....');
    // create new live environment
    return true;
  }
  service.sync = sync;

  if (Auth.currentUser) {
    console.log('ClinicService: Trying to set clinic...');
    var clinics = service.getClinics(Auth.currentUser);
    if (clinics.length == 1) { // set up current clinic...
      console.log('ClinicService: Got auth — setting clinic');
      service.setClinic(clinics[0]);
    }
  }
  return service;
}]);
