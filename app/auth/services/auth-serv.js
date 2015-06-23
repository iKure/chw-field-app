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

  function getCurrentUser () {
    console.log('AuthServ: Get current user');
    var deferred = $q.defer();
    if (service.currentUser) {
      console.log('AuthServ: current user is set, return');
      deferred.resolve(service.currentUser);
    } else {
      service.getSession().then(function (user) {
        console.log('AuthServ: Got current user from session');
        deferred.resolve(user);
      }).catch(function (err) {
        console.log('AuthServ: No current user');
        deferred.reject(false);
      });
    }
    return deferred.promise;
  }
  service.getCurrentUser = getCurrentUser;

  function getSession () {
    console.log('AuthServ: Getting session');
    var deferred = $q.defer();
    if (Config.ENV.SESSION) {
      service.currentUser = Config.ENV.SESSION.userCtx;
      deferred.resolve(Config.ENV.SESSION);
    } else if (service.currentUser) {
      console.log('AuthServ: There is a current user, return that');
      deferred.resolve(service.currentUser);
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
          db.getUser(response.userCtx.name).then(function (user) {
            console.log("AuthServ: Got session user " + user.name);
            service.currentUser = user;
            deferred.resolve(user);
          });
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
