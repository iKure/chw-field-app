'use strict';
angular.module('forms')
.service('Fields', ['$rootScope', 'Forms', '$q', function ($rootScope, Forms, $q) {
  console.log('Hello from your Service: Fields in module forms');

  var localDB = new PouchDB('fields');

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
    if (!field._id) {
      field.date_created = Date.now();
      promise = localDB.post(field);
    } else {
      promise = localDB.put(field);
    }
    return promise;
  }
  service.save = save;

  return service;
}]);
