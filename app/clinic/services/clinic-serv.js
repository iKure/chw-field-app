'use strict';
angular.module('clinic')
.service('Clinic', ['$rootScope', '$q', 'Config', 'pouchDB', 'Auth', function ($rootScope, $q, Config, pouchDB, Auth) {
  console.log('Hello from your Service: Clinic in module clinic');

  var service = {}
  service.localDB = false;
  service.remoteDB = false;
  // List available clinics — based on User's permission to databases
  function getAvailableClinics(user) {
    if (user.clinics) {
      return user.clinics;
    }
    return [];
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
      service.sync(clinic_id);
      deferred.resolve(true);
    });
    return deferred.promise;
  }
  service.setClinic = setClinic;

  var syncHandler = false;
  function sync(clinic_id) {
    if (Config.ENV.SERVER_URL) {
      var full_url = Config.ENV.SERVER_URL + clinic_id;
      console.log('ClinicService: Connecting to ' + full_url);
      service.remoteDB = new pouchDB(full_url);
    }
    if (!service.remoteDB) {
      console.log('ClinicService: No remoteDB');
      return false;
    }
    if (syncHandler) {
      syncHandler.cancel();
    }
    service.remoteDB.info().then(function () {
      syncHandler = service.localDB.sync(service.remoteDB, {
        live: true,
        retry: true,
      }).on('change', function (info) {
        // handle change
        console.log('ClinicService: Sync handeling changes');
      }).on('paused', function () {
        // replication paused (e.g. user went offline)
        console.log('ClinicService: Sync paused');
      }).on('active', function () {
        // replicate resumed (e.g. user went back online)
        console.log('ClinicService: Sync active');
      }).on('denied', function (info) {
        // a document failed to replicate, e.g. due to permissions
      }).on('complete', function (info) {
        // handle complete
      }).on('error', function (err) {
        // handle error
      });
      console.log('ClinicService: Syncing started....');
    });
    return true;
  }
  service.sync = sync;

  function getClinic () {
    var deferred = $q.defer();
    if (service.localDB) {
      deferred.resolve(service.localDB);
    } else {
      console.log('ClinicService: Getting current user');
      Auth.getCurrentUser().then(function (user) {
        console.log('ClinicService: Trying to set clinic...');
        var clinics = service.getAvailableClinics(user);
        if (clinics.length == 1) { // set up current clinic...
          console.log('ClinicService: Got auth — setting clinic');
          service.setClinic(clinics[0]).then(function () {
            console.log('ClinicService: returning clinic db');
            deferred.resolve(service.localDB);
          });
        }
      }).catch(function (err) {
        console.log('ClinicService: No clinic to get');
        deferred.reject('ClinicService: No clinic selected');
      });
    }
    return deferred.promise;
  }
  service.getClinic = getClinic;

  return service;
}]);
