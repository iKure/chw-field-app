'use strict';
angular.module('shared')
.service('SharedState', [ '$rootScope', function ($rootScope) {
  console.log('Hello from your Service: SharedState in module shared');

  var state = {};
  var localDB = new PouchDB('app'); // Bad name for a localDB

  function setState (key, value) {
    if (!value) {
      delete state[key];
    } else {
      state[key] = value;
    }
    $rootScope.$broadcast('sharedState.update');
    return true;
  }
  this.setState = setState;

  function getState (key) {
    if (!key) {
      return state;
    }
    if (state[key]) {
      return state[key];
    }
    return false;
  }
  this.getState = getState;

  function makeService (name) {
    var current = false;
    var records = [];

    function recordsMap (doc, emit) {
      emit(doc._id, doc); // Should have configurable sort order
    }
    function docsToRecords(err, docs) {
      // Handle Error
      records = [];
      docs.rows.forEach( function (row) {
        service.records.push(row.doc);
      });
      $rootScope.$broadcast(name + '.update');
    }

    var service = {
      current: false,
      getAll: function () {
        console.log(name + 'Service: Getting all records');
        return localDB.query(
          recordsMap, {
          include_docs: true,
          descending: true,
        }, docsToRecords);
      },
      save: function (obj) {
        var promise;
        // inject current state into object
        if (obj._id) {
          console.log(name + 'Service: Saving existing object');
          promise = localDB.put(obj);
        }else {
          console.log(name + 'Service: Saving new object');
          promise = localDB.post(obj);
        }
        promise.then(function (response) {
          console.log(name + 'Service: Saved object, id=' + response.id);
          service.getAll();
          service.getById(response.id);
        });
        return promise;
      },
      getById: function (id) {
        console.log(name + 'Service: Getting object, id=' + id);
        var promise = localDB.get(id);
        promise.then( function (doc) {
          current = doc;
          $rootScope.$broadcast(name + '.change');
        });
        promise.catch( function (err) {
          $rootScope.$broadcast(name + '.error');
        });
        return promise;
      }
    }
    return service;
  }

}]);
