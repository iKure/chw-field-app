'use strict';
angular.module('clinic')
.service('Clinic', ['$rootScope', '$q', 'Config', 'pouchDB', 'Auth', function ($rootScope, $q, Config, pouchDB, Auth) {
  console.log('Hello from your Service: Clinic in module clinic');

  var service = {}
  service.localDB = false;
  service.remoteDB = false;
  var salt = ''
  if (Config.ENV.SaltDB) {
    salt = '-' + Config.ENV.SaltDB;
  }
  var dbName = 'clinics' + salt;
  var clinicLocalDB = pouchDB(dbName)
  if (Config.ENV.SERVER_URL) {
    var clinicRemoteDB = pouchDB(Config.ENV.SERVER_URL + dbName + salt);
  }
  // List available clinics — based on User's permission to databases
  function getAvailableClinics(user) {
    console.log('ClinicService: Get available clinics for ' + user.name);
    var deferred = $q.defer();
    clinicLocalDB.allDocs({
      include_docs: true,
    }).then(function (results) {
      var clinics = [];
      results.rows.forEach(function (row) {
        if (row.doc.members.indexOf(user.name) >= 0) {
          clinics.push(row.doc);
        }
      });
      deferred.resolve(clinics);
    });
    return deferred.promise;
  }
  service.getAvailableClinics = getAvailableClinics;
  // Set pouch to load specific clinic
  function setClinic(clinic) {
    var deferred = $q.defer();
    console.log('ClinicService: Setting clinic to ' + clinic._id + salt);
    service.localDB = pouchDB(clinic._id + salt);
    service.localDB.changes({
      since: 'now',
      live: true,
      include_docs: true
    }).on('change', function () {
      console.log('ClinicService: Has change');
      $rootScope.$broadcast('clinic.update');
    });
    service.localDB.info().then(function () {
      console.log('ClinicService: Set up localDB');
      service.currentClinic = clinic._id;
      // attempt to set up syncing
      service.sync(clinic._id + salt);
      deferred.resolve(true);
    });
    return deferred.promise;
  }
  service.setClinic = setClinic;

  var syncHandler = false;
  function sync(clinic_id) {
    var deferred = $q.defer();
    if (Config.ENV.SERVER_URL) {
      var full_url = Config.ENV.SERVER_URL + clinic_id + salt;
      console.log('ClinicService: Connecting to ' + full_url);
      service.remoteDB = pouchDB(full_url, {
        skipSetup: true,
      });
    }
    if (!service.remoteDB) {
      console.log('ClinicService: No remoteDB');
      deferred.reject('No remote');
      return deferred.promise;
    }
    if (syncHandler) {
      syncHandler.cancel();
    }
    console.log('ClinicService: Logged into remote');
    service.remoteDB.info().then(function () {
      console.log('ClinicService: Syncing started....');
      $rootScope.$broadcast('clinic.sync.start');
      syncHandler = service.localDB.sync(service.remoteDB, {
        live: true,
        retry: true,
      }).on('paused', function () {
        // replication paused (e.g. user went offline)
        $rootScope.$broadcast('clinic.sync.stop');
        console.log('ClinicService: Sync paused');
      }).on('active', function () {
        // replicate resumed (e.g. user went back online)
        console.log('ClinicService: Sync active');
        $rootScope.$broadcast('clinic.sync.start');
      }).on('denied', function (info) {
        // a document failed to replicate, e.g. due to permissions
      });
    }).catch(function (err) {
      console.log('ClinicService: ' + err.message);
      deferred.reject(err.message);
    });
    return deferred.promise;
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
        service.getAvailableClinics(user).then(function (clinics) {
          if (clinics.length == 1) { // set up current clinic...
            console.log('ClinicService: Got auth — setting clinic');
            service.setClinic(clinics[0]).then(function () {
              console.log('ClinicService: returning clinic db');
              deferred.resolve(service.localDB);
            });
          }
        });
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
