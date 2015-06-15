'use strict';
angular.module('messages')
.service('Messages', ['$rootScope', '$q', 'Config', 'pouchDB', 'Auth', function ($rootScope, $q, Config, pouchDB, Auth) {
  console.log('Hello from your Service: Messages in module messages');

  var dbName = 'messages';
  if (Config.ENV.SaltDB) {
    dbName = dbName + '-' + Config.ENV.SaltDB;
  }

  var localDB = new pouchDB(dbName);
  var remoteDB = false;
  if (Config.ENV.SERVER_URL) {
    var fullUrl = Config.ENV.SERVER_URL + dbName;
    console.log("MessagesService: connecting to " + fullUrl);
    remoteDB = new pouchDB(fullUrl);
    var syncHandler = localDB.sync(remoteDB, {
      live: true,
      retry: true
    });
  }

  var service = {};

  function list (extra_matches) {
    console.log('MessagesService: Getting messages for ' + extra_matches);
    var deferred = $q.defer();

    var matches = {};
    if (extra_matches) {
      Object.keys(extra_matches).forEach(function (key) {
        matches[key] = extra_matches[key];
      });
    }

    var promise = localDB.query(function (doc, emit) {
      var passes = true;
      Object.keys(matches).forEach(function (key) {
        if (doc[key] != matches[key]) {
          passes = false;
        }
      });
      if (!passes) {
        return false;
      }
      emit(doc.name);
    }, {
      include_docs: true,
      descending: true,
    });

    promise.then(function (docs) {
      var results = [];
      docs.rows.forEach(function (row) {
        results.push(row.doc);
      });
      console.log('MessagesService: Got ' + results.length + ' messages');
      deferred.resolve(results);
    });

    return deferred.promise;
  }
  service.list = list;

  return service;
}]);
