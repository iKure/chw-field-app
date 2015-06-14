'use strict';
angular.module('forms')
.service('Fields', ['$rootScope', 'Forms', '$q', 'Config', 'Auth', function ($rootScope, Forms, $q, Config, Auth) {
  console.log('Hello from your Service: Fields in module forms');

  var dbName = 'fields';

  var localDB = new PouchDB(dbName);

  if (Config.ENV.SERVER_URL) {
    var remoteDB = new PouchDB(Config.ENV.SERVER_URL + dbName);
    console.log("FormsService: Getting data from: " + Config.ENV.SERVER_URL + dbName);
    var syncHandler = localDB.sync(remoteDB, {
      live: true,
      retry: true
    });
  }

  var service = new Object;
  service.records = [];

  function get(id) {
    return localDB.get(id);
  }
  service.get = get;

  function all(matches) {
    var deferred = $q.defer();

    if (!matches) {
      matches = {
        parent: undefined
      };
    }

    var results = [];

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
      emit(doc.date_created);
    }, {
      include_docs: true,
      descending: true,
    })

    promise.then(function (docs) {
      docs.rows.forEach(function (row) {
        results.push(row.doc);
      });
      deferred.resolve(results);
    });

    return deferred.promise;
  }
  service.all = all;

  function save (field) {
    var promise = false;
    field.date_modified = Date.now();
    field.user_modified = Auth.currentUser.name;
    if (!field._id) {
      field.date_created = Date.now();
      field.user_created = Auth.currentUser.name;
      promise = localDB.post(field);
    } else {
      promise = localDB.put(field);
    }
    return promise;
  }
  service.save = save;

  return service;
}]);
