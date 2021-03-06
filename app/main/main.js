'use strict';
angular.module('main', [
  'ionic',
  'ngCordova',
  'ui.router',
  'yaru22.angular-timeago',
  // TODO: load other modules selected during generation
])
.config(function ($ionicConfigProvider) {
  $ionicConfigProvider.views.maxCache(0);
})
.run(['$q', 'Config', 'pouchDB', function ($q, Config, pouchDB) {
  var salt = '';
  if (Config.ENV.SaltDB) {
    salt = '-' + Config.ENV.SaltDB;
  }
  function initDB(id, docs) {
    var local = new pouchDB(id);
    docs.forEach(function (doc) {
      local.put(doc).then(function (result) {
        console.log('MAIN: Put ' + result.id);
      });
    });
    console.log("MAIN: Put " + docs.length + " records into " + id);
  }
  function cleanDB(id) {
    console.log('MAIN: Cleaning db: ' + id);
    var deferred = $q.defer();
    var db = new pouchDB(id);
    db.allDocs().then(function (results) {
      console.log('MAIN: Got ' + results.rows.length + ' docs to clean');
      if (results.rows.length == 0) {
        deferred.resolve(false);
        return false;
      }
      var deleted = 0;
      function moveOn () {
        deleted += 1;
        if (deleted == results.rows.length) {
          deferred.resolve(true);
        }
      }
      results.rows.forEach(function (res) {
        db.remove(res.id, res.value.rev).then(function () {
          console.log('MAIN: Deleted: ' + res.id);
          moveOn();
        }).catch(function () {
          console.log('MAIN: Could not delete' + res.id + '(' + res.value.rev + ')');
        });
      });
    });
    return deferred.promise;
  }
  if (Config.ENV.CLINICS) {
    console.log('MAIN: Init clinics');
    Object.keys(Config.ENV.CLINICS).forEach(function (clinic_id) {
      cleanDB(clinic_id + salt).then(function () {
        initDB(clinic_id + salt, Config.ENV.CLINICS[clinic_id]);
      });
    });
  }
  if (Config.ENV.CLINIC_LIST) {
    console.log('MAIN: Init list of clinics');
    cleanDB('clinics' + salt).then(function () {
      initDB('clinics' + salt, Config.ENV.CLINIC_LIST);
    })
  }
  if (Config.ENV.FORMS) {
    console.log('MAIN: Init forms');
    cleanDB('forms' + salt).then(function () {
      initDB('forms' + salt, Config.ENV.FORMS);
    });
  }
}]);
