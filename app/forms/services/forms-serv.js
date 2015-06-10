'use strict';
angular.module('forms')
.service('Forms', ['$rootScope', '$q', 'Config', function ($rootScope, $q, Config) {
  console.log('Hello from your Service: Forms in module forms');

  var localDB = new PouchDB('forms');
  var ready = false;

  if (Config.ENV.SERVER_URL) {
    var remoteDB = new PouchDB(Config.ENV.SERVER_URL + 'forms');
    console.log("FormsService: Getting data from: " + Config.ENV.SERVER_URL + 'forms');
    localDB.replicate.from(remoteDB).then(function () {
      ready = true;
    });
  }

  if (Config.ENV.FORMS) {
    Config.ENV.FORMS.forEach(function (form) {
      localDB.get(form._id).then(function (doc) {
        form._rev = doc._rev;
        localDB.put(form).then( function (response) {
          console.log( 'FormsService: Updated form id = ' + response.id);
          ready = true;
        });
      }).catch( function (err) {
        localDB.put(form).then( function (response) {
          console.log( 'FormsService: Created form id = ' + response.id);
          ready = true;
        });
      });
    });
  }

  if (!Config.ENV.SERVER_URL && !Config.ENV.FORMS) {
    ready = true;
  }

  function wait () {
    var deferred = $q.defer();
    var interval = setInterval(function () {
      console.log('FormsService: Checking for ready');
      if (ready) {
        deferred.resolve(true);
        clearInterval(interval);
      }
    }, 10);
    return deferred.promise;
  }

  var service = new Object;
  service.records = [];

  function get (id) {
    var deferred = $q.defer();
    wait().then(function () {
      var promise = localDB.get(id);
      promise.then(function (doc) {
        deferred.resolve(doc);
      });
    });
    return deferred.promise;
  }
  service.get = get;

  function all () {
    var deferred = $q.defer();
    wait().then(function () {
      var promise = localDB.allDocs({
        include_docs: true,
      }).then(function (docs) {
        var results = [];
        docs.rows.forEach(function (row) {
          results.push(row.doc);
        });
        deferred.resolve(results);
      });
    });
    return deferred.promise;
  }
  service.all = all;

  return service;
}]);
