'use strict';
angular.module('patients')
.service('Vitals', [ '$rootScope', 'Config', 'Patients', function ($rootScope, Config, Patients) {
  console.log('Hello from your Service: Vitals in module patients');

  var localDB = new PouchDB('vitals');

  var service = {
    current: false,
    getAll: function () {
      console.log('Getting All VitalService Records');
      var promise = localDB.allDocs({include_docs: true, descending: true}, function (err, docs) {
        service.records = [];
        docs.rows.forEach( function (row) {
          service.records.push(row.doc);
        });
        $rootScope.$broadcast('vitals.update');
      });
      return promise;
    },
    save: function (obj) {
      console.log('VitalService: Got object ' + obj);
      var promise = false;
      if (obj._id) {
        promise = localDB.put(obj);
      }else {
        promise = localDB.post(obj);
      }
      promise.then(function (response) {
        console.log('VitalService: Saved object, id=' + response.id);
        service.getAll();
        service.getById(response.id);
      });
      return promise;
    },
    getById: function (id) {
      console.log('VitalService: Getting object, id=' + id);
      var promise = localDB.get(id);
      promise.then( function (doc) {
        service.current = doc;
        $rootScope.$broadcast('vitals.current.update');
      });
      promise.catch( function (err) {
        $rootScope.$broadcast('vitals.current.error');
      });
      return promise;
    }
  };
  service.getAll();
  return service;

}]);
