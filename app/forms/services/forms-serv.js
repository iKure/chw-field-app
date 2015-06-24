'use strict';
angular.module('forms')
.service('Forms', ['$rootScope', '$q', 'Config', 'pouchDB', function ($rootScope, $q, Config, pouchDB) {
  console.log('Hello from your Service: Forms in module forms');

  var dbName = 'forms';
  /*
  if (Config.ENV.SaltDB) {
    dbName = dbName + '-' + Config.ENV.SaltDB;
  }
  */

  var localDB = new pouchDB(dbName);
  var remoteDB = false;
  if (Config.ENV.SERVER_URL) {
    console.log("FormsService: Getting data from: " + Config.ENV.SERVER_URL + dbName);
    remoteDB = new PouchDB(Config.ENV.SERVER_URL + dbName);
  }

  var service = new Object;
  service.records = [];

  function sync () {
    if (!remoteDB) {
      return false;
    }
    $rootScope.$on('forms.sync.start');
    localDB.replicate.from(remoteDB).then(function () {
      $rootScope.$broadcast('forms.synced');
      $rootScope.$on('forms.sync.stop');
    }).catch(function (err) {
      console.error(err);
      $rootScope.$on('forms.sync.stop');
    });
  }
  service.sync = sync;

  function get (id) {
    var deferred = $q.defer();
    if (!id) {
      deferred.reject(false);
      return deferred.promise;
    }
    var promise = localDB.get(id).then(function (doc) {
      deferred.resolve(doc);
    }).catch(function (err) {
      console.error(err);
      deferred.reject(false);
    });
    return deferred.promise;
  }
  service.get = get;

  function all () {
    var deferred = $q.defer();
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
    return deferred.promise;
  }
  service.all = all;

  return service;
}]);
