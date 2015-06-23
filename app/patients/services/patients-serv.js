'use strict';
angular.module('patients')
.service('Patients', [
  '$rootScope',
  '$q',
  'Config',
  '$cordovaDevice',
  'Clinic',
  function ($rootScope, $q, Config, $cordovaDevice, Clinic) {
    console.log('Hello from your Service: Patients in module patients');

    var service = {};

    function get (id) {
      return Clinic.getClinic().then(function (db) {
        return db.get(id);
      });
    }
    service.get = get;

    function list (extra_matches) {
      console.log("PatientsService: Getting patients");
      var promise = Clinic.getClinic().then(function (db) {
        console.log("PatientsService: Got clinic & listing patients");
        var deferred = $q.defer();

        var promise = db.query(function (doc, emit) {
          if (doc.type != 'patient') {
            return false;
          }
          emit(doc.name);
        }, {
          include_docs: true,
        });

        promise.then(function (docs) {
          var results = [];
          docs.rows.forEach(function (row) {
            results.push(row.doc);
          });
          console.log("PatientsService: Got " + results.length + " patients");
          deferred.resolve(results);
        }).catch(function (err) {
          console.error(err);
        });

        return deferred.promise;
      });
      return promise;
    }
    service.list = list;

    function filter (str) {
      console.log("PatientsService: Filtering by " + str);
      return Clinic.getClinic().then(function (db) {
        var deferred = $q.defer();

        db.query(function (doc, emit) {
          if (doc.type != 'patient') {
            return false;
          }
          if (str && str != "" && (!doc.name || doc.name.indexOf(str) == -1) && (!doc._id || doc._id.indexOf(str) == -1)) {
            return false;
          }
          emit(doc.name);
        }, {
          include_docs: true,
        }).then(function (docs) {
          var results = [];
          docs.rows.forEach(function (row) {
            results.push(row.doc);
          });
          deferred.resolve(results);
        }).catch(function (err) {
          console.error(err);
        });

        return deferred.promise;
      });
    }
    service.filter = filter;

    function getID(db) {
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

        db.get(ID).then(function (id) {
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
      return Clinic.getClinic().then(function (db) {
        var deferred = $q.defer();

        function savePatient(patient) {
          patient.date_modified = Date.now();
          db.put(patient).then(function (response) {
            console.log('PatientService: Saved patient: ' + response.id);
            deferred.resolve(patient);
          });
        }

        if (!patient._id) {
          console.log('PatientService: Saving new object');
          getID(db).then(function (ID) {
            console.log("PatientService: Made ID = " + ID);
            patient._id = ID;
            patient.date_created = Date.now();
            patient.type = 'patient';
            savePatient(patient);
          });
        } else {
          console.log('PatientsService: Saving existing object');
          savePatient(patient);
        }

        return deferred.promise;
      });
    }
    service.save = save;

    return service;
  }
]);
