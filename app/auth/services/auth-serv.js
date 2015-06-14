'use strict';
angular.module('auth')
.service('Auth', ['$q', '$rootScope', 'Config', 'pouchDB', function ($q, $rootScope, Config, pouchDB) {
  console.log('Hello from your Service: Auth in module auth');

  if (Config.ENV.SERVER_URL) {
    var pouchOpts = {};
    if (Config.ENV.POUCH_OPTS) {
      pouchOpts = Config.ENV.POUCH_OPTS;
    }
    console.log("AuthServ: Connecting to: " + Config.ENV.SERVER_URL + " with " + pouchOpts);
    var local = new pouchDB('auth');
    var db = new PouchDB(Config.ENV.SERVER_URL + 'auth', pouchOpts);
  }

  var service = {};

  function login (username, password) {
    console.log("AuthServ: Logging in to :" + Config.ENV.SERVER_URL);
    console.log("AuthServ: username=" + username + ' & password=' + password);
    var ajaxOpts = {
      ajax: {
        headers: {
          Authorization: 'Basic ' + window.btoa(username + ':' + password)
        }
      }
    };

    var promise = db.login(username, password, ajaxOpts);

    return promise;
  }
  service.login = login;

  function logout () {
    return db.logout();
  }
  service.logout = logout;

  function getSession () {
    var deferred = $q.defer();
    if (Config.ENV.SESSION) {
      deferred.resolve(Config.ENV.SESSION);
    } else if (Config.ENV.SERVER_URL) {
      console.log('AuthServ: Checking SERVER_URL');
      db.getSession(function (err, response) {
        if (err) {
          console.log("AuthServ: Could not reach network");
        } else if (!response.userCtx.name) {
          console.log("AuthServ: User not logged in!");
          deferred.reject(false);
        } else {
          console.log("AuthServ: Got a user");
          deferred.resolve(response);
        }
      });
    } else {
      deferred.reject(false);
    }
    return deferred.promise;
  }
  service.getSession = getSession;

  return service;
}]);
