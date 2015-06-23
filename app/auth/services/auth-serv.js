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
    var db = new pouchDB(Config.ENV.SERVER_URL + 'auth', pouchOpts);
  }

  var service = {};
  service.currentUser = false;

  function login (username, password) {
    var deferred = $q.defer();
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
    promise.then(function (response) {
      console.log('AuthServ: Got successful login for ' + response.name);
      db.getUser(response.name).then(function (user) {
        console.log('AuthServ: Got user data for ' + user);
        service.currentUser = user;
        deferred.resolve(user);
      });
    });

    return deferred.promise;
  }
  service.login = login;

  function logout () {
    return db.logout(function (err, response) {
      if (err) {
        console.error(err);
      } else {
        console.log("AuthServ: Setting currentUser to false");
        service.currentUser = false;
      }
    });
  }
  service.logout = logout;

  function getSession () {
    var deferred = $q.defer();
    if (Config.ENV.SESSION) {
      service.currentUser = Config.ENV.SESSION.userCtx;
      deferred.resolve(Config.ENV.SESSION);
    } else if (!service.currentUser) {
      deferred.reject(false);
    } else if (Config.ENV.SERVER_URL) {
      console.log('AuthServ: Checking SERVER_URL');
      db.getSession(function (err, response) {
        if (err) {
          console.log("AuthServ: Could not reach network");
          deferred.reject(false); // Should attempt to connect to local?
        } else if (!response.userCtx.name) {
          console.log("AuthServ: User not logged in!");
          deferred.reject(false);
        } else {
          service.currentUser = response.userCtx;
          console.log("AuthServ: Got session user " + service.currentUser.name);
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
