'use strict';
angular.module('forms')
.service('Forms', ['$rootScope', 'Config', function ($rootScope, Config) {
  console.log('Hello from your Service: Forms in module forms');

  var localDB = new PouchDB('forms');

  if (Config.ENV.FORMS) {
    Config.ENV.FORMS.forEach(function (form) {
      localDB.get(form._id).catch( function (err) {
        localDB.put(form).then( function (response) {
          console.log( 'FormsService: PUT form id = ' + response.id);
        });
      });
    });
  }

  var service = new Object;
  service.records = [];

  function get (id) {
    return localDB.get(id);
  }
  service.get = get;

  function getRecords () {
    var promise = localDB.allDocs({
      include_docs: true,
    });
    promise.then(loadRecords);
    return promise;
  }
  service.getRecords = getRecords;

  function loadRecords (docs) {
    service.records = [];
    docs.rows.forEach(function (row) {
      service.records.push(row.doc);
    });
    console.log('FormsService: Got ' + service.records.length + ' records');
    $rootScope.$broadcast('forms.update');
  }

  service.getRecords();
  return service;
}]);
