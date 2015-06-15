'use strict';
angular.module('patients')
.service('Patients', [
  '$rootScope',
  '$q',
  'Config',
  '$cordovaDevice',
  function ($rootScope, $q, Config, $cordovaDevice) {
    console.log('Hello from your Service: Patients in module patients');

    var dbName = 'patients';
    if (Config.ENV.SaltDB) {
      dbName = dbName + '-' + Config.ENV.SaltDB;
    }

    var localDB = new PouchDB(dbName);
    var remoteDB = false;
    if (Config.ENV.SERVER_URL) {
      var fullUrl = Config.ENV.SERVER_URL + dbName;
      console.log("Patients connecting to: " + fullUrl);
      remoteDB = new PouchDB(fullUrl);
      var syncHandler = localDB.sync(remoteDB, {
        live: true,
        retry: true
      });
    }

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

    function getID() {
      var deferred = $q.defer();
      console.log("PatientService: Attempting to get new ID");
      function makeID() {
        var id_salt = 'PA';
        try {
          id_salt = $cordovaDevice.getUUID();
        } catch (err) {
          console.log("ERROR:" + err);
          id_salt = Math.random().toString(36);
        }
        id_salt = id_salt.substr(id_salt.length - 3);

        var timeStr = Date.now().toString();
        timeStr = timeStr.substr(timeStr.length - 6);

        var ID = id_salt + '-' + timeStr;
        console.log("PatientService: Trying ID = " + ID);

        localDB.get(ID).then(function (id) {
          makeID();
        }).catch(function () {
          deferred.resolve(ID);
        });
      }
      makeID();
      return deferred.promise;
    }
    service.getID = getID

    function save (patient) {
      var deferred = $q.defer();

      function savePatient(patient) {
        patient.date_modified = Date.now();
        localDB.put(patient).then(function (response) {
          console.log('PatientService: Saved patient: ' + response.id);
          deferred.resolve(patient);
        });
      }

      if (!patient._id) {
        console.log('PatientService: Saving new object');
        getID().then(function (ID) {
          console.log("PatientService: Made ID = " + ID);
          patient._id = ID;
          patient.date_created = Date.now();
          savePatient(patient);
        });
      } else {
        console.log('PatientsService: Saving existing object');
        savePatient(patient);
      }

      return deferred.promise;
    }
    service.save = save;

    return service;
  }
]);
