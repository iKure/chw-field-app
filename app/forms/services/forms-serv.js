'use strict';
angular.module('forms')
.service('Forms', ['$rootScope', '$q', 'Config', function ($rootScope, $q, Config) {
  console.log('Hello from your Service: Forms in module forms');

  var dbName = 'forms';
  if (Config.ENV.SaltDB) {
    dbName = dbName + '-' + Config.ENV.SaltDB;
  }

  var localDB = new PouchDB(dbName);
  var ready = false;

  if (Config.ENV.SERVER_URL) {
    var remoteDB = new PouchDB(Config.ENV.SERVER_URL + dbName);
    console.log("FormsService: Getting data from: " + Config.ENV.SERVER_URL + dbName);
    localDB.replicate.from(remoteDB).then(function () {
      ready = true;
    }).catch(function (err) {
      console.error(err);
      ready = true;
    });
  }

  if (Config.ENV.FORMS) {
    Config.ENV.FORMS.forEach(function (form) {
      localDB.get(form._id).then(function (doc) {
        form._rev = doc._rev;
        localDB.put(form).then( function (response) {
          console.log( 'FormsService: Updated form id = ' + response.id);
          ready = true;
        });
      }).catch( function (err) {
        localDB.put(form).then( function (response) {
          console.log( 'FormsService: Created form id = ' + response.id);
          ready = true;
        });
      });
    });
  }

  if (!Config.ENV.SERVER_URL && !Config.ENV.FORMS) {
    ready = true;
  }

  function wait () {
    var deferred = $q.defer();
    var interval = setInterval(function () {
      console.log('FormsService: Checking for ready');
      if (ready) {
        deferred.resolve(true);
        clearInterval(interval);
      }
    }, 10);
    return deferred.promise;
  }

  var service = new Object;
  service.records = [];

  function get (id) {
    var deferred = $q.defer();
    if (!id) {
      deferred.reject(false);
      return deferred.promise;
    }
    wait().then(function () {
      var promise = localDB.get(id).then(function (doc) {
        deferred.resolve(doc);
      }).catch(function (err) {
        console.error(err);
        deferred.reject(false);
      });
    });
    return deferred.promise;
  }
  service.get = get;

  function all () {
    var deferred = $q.defer();
    wait().then(function () {
      var promise = localDB.allDocs({
        include_docs: true,
      }).then(function (docs) {
        var results = [];
        docs.rows.forEach(function (row) {
          if (!row.doc.hidden) {
            results.push(row.doc);
          }
        });
        deferred.resolve(results);
      });
    });
    return deferred.promise;
  }
  service.all = all;

  return service;
}]);
