'use strict';
angular.module('clinic')
.service('Clinic', ['$rootScope', '$q', 'Config', 'pouchDB', 'Auth', function ($rootScope, $q, Config, pouchDB, Auth) {
  console.log('Hello from your Service: Clinic in module clinic');

  var service = {}
  // List available clinics — based on User's permission to databases
  function getClinics(user) {
    return [];
  }
  service.getClinics = getClinics;
  // Set pouch to load specific clinic
  function setClinic(clinic_id) {
    // Create or get pouch instance
    // attempt to set up syncing
    return true;
  }
  service.setClinic = setClinic;

  function sync() {
    // cancel current syncing (if exists)
    // create new live environment
    return true;
  }

  return service;
}]);
