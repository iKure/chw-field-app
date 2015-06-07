'use strict';
angular.module('forms')
.service('ODK', ['$rootScope', 'Config', function ($rootScope, Config) {
  console.log('Hello from your Service: ODK in module forms');

  var localDB = new PouchDB('odk_forms');

  if (Config.ENV.FORMS) {
    Config.ENV.FORMS.forEach(function (form) {
      localDB.get(form._id).catch( function (err) {
        localDB.put(form).then( function (response) {
          console.log( 'ODKService: PUT form id = ' + response.id);
        });
      });
    });
  }

  var service = new Object;
  service.records = [];

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
    console.log('ODKService: Got ' + service.records.length + ' records');
    $rootScope.$broadcast('odk.update');
  }

  service.getRecords();
  return service;
}]);
