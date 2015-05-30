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
    var service = new Object();

    service.current = false;
    service.records = [];

    var plural_name = name + 's'; // Lazy pluralization
    var state_id = name + '_id';

    function get (id) {
      if (!id) {
        return service.records;
      }
    }
    service.get = get;

    function getCurrent () {
      if (service.current) {
        return service.current;
      }
      return false;
    }
    service.getCurrent = getCurrent;

    function clearCurrent () {
      service.current = false;
      console.log(name + 'Service: Clear current record');
      setState(state_id, false);
      $rootScope.$broadcast(name + '.change');
      return true;
    }
    service.clearCurrent = clearCurrent;

    function recordsMap (doc, emit) {
      if (doc.type != name) {
        return false;
      }

      var passes = true;
      var currentState = getState();
      Object.keys(currentState).forEach(function (key) {
        if (key == state_id) {
          return false;
        }
        if (currentState[key] != doc[key]) {
          passes = false;
        }
      });
      if (!passes) {
        return false;
      }
      emit(doc._id, doc); // Should have configurable sort order
    }
    function docsToRecords(err, docs) {
      // Handle Error
      service.records = [];
      docs.rows.forEach( function (row) {
        service.records.push(row.doc);
      });
      console.log(name + 'Service: Got ' + service.records.length + ' records');
      $rootScope.$broadcast(plural_name + '.update');
    }

    function updateRecords () {
      console.log(name + 'Service: Getting all records');
      return localDB.query(
        recordsMap, {
        include_docs: true,
        descending: true,
      }, docsToRecords);
    }
    service.updateRecords = updateRecords;

    function save (obj) {
      var promise;

      var currentState = getState();
      Object.keys(currentState).forEach(function (key) {
        if (key == state_id) {
          return false;
        }
        if (obj[key]) {
          return false;
        }
        obj[key] = currentState[key];
      });

      obj.type = name;
      obj.date_modified = Date.now();
      if (obj._id) {
        console.log(name + 'Service: Saving existing object');
        promise = localDB.put(obj);
      }else {
        console.log(name + 'Service: Saving new object');
        obj.date_created = Date.now();
        promise = localDB.post(obj);
      }
      promise.then(function (response) {
        console.log(name + 'Service: Saved object, id=' + response.id);
        updateRecords();
        setCurrent(response.id);
      });
      return promise;
    }
    service.save = save;

    function setCurrent (id) {
      console.log(name + 'Service: Getting object, id=' + id);
      var promise = localDB.get(id);
      promise.then( function (doc) {
        service.current = doc;
        setState(state_id, id);
        $rootScope.$broadcast(name + '.change');
      });
      promise.catch( function (err) {
        $rootScope.$broadcast(name + '.error');
      });
      return promise;
    }
    service.setCurrent = setCurrent;

    return service;
  }
  this.makeService = makeService;

}]);
