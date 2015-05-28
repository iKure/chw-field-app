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

    var plural_name = name + 's'; // Lazy pluralization
    var state_id = name + '_id';

    function get (id) {
      if (!id) {
        return records;
      }
    }
    this.get = get;

    function getCurrent () {
      if (current) {
        return current;
      }
      return false;
    }
    this.getCurrent = getCurrent;

    function clearCurrent () {
      current = false;
      console.log(name + 'Service: Clear current record');
      setState(state_id, false);
      $rootScope.$broadcast(name + '.change');
      return true;
    }
    this.clearCurrent = clearCurrent;

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
      records = [];
      docs.rows.forEach( function (row) {
        records.push(row.doc);
      });
      console.log(name + 'Service: Got ' + records.length + ' records');
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
    this.updateRecords = updateRecords;

    function save (obj) {
      var promise;

      var currentState = getState();
      Object.keys(currentState).forEach(function (key) {
        if (key == state_id) {
          return false;
        }
        obj[key] = currentState[key];
      });

      obj.type = name;
      if (obj._id) {
        console.log(name + 'Service: Saving existing object');
        promise = localDB.put(obj);
      }else {
        console.log(name + 'Service: Saving new object');
        promise = localDB.post(obj);
      }
      promise.then(function (response) {
        console.log(name + 'Service: Saved object, id=' + response.id);
        updateRecords();
        setCurrent(response.id);
      });
      return promise;
    }
    this.save = save;

    function setCurrent (id) {
      console.log(name + 'Service: Getting object, id=' + id);
      var promise = localDB.get(id);
      promise.then( function (doc) {
        current = doc;
        setState(state_id, id);
        $rootScope.$broadcast(name + '.change');
      });
      promise.catch( function (err) {
        $rootScope.$broadcast(name + '.error');
      });
      return promise;
    }
    this.setCurrent = setCurrent;

    return this;
  }
  this.makeService = makeService;

}]);
