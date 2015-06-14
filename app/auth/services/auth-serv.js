'use strict';
angular.module('auth')
.service('Auth', ['$q', '$rootScope', 'Config', 'pouchDB', function ($q, $rootScope, Config, pouchDB) {
  console.log('Hello from your Service: Auth in module auth');

  if (Config.ENV.SERVER_URL) {
    var pouchOps = {};
    if (Config.ENV.POUCH_OPS) {
      pouchOps = Config.ENV.POUCH_OPS;
    }
    var local = new pouchDB('auth');
    var db = new PouchDB(Config.ENV.SERVER_URL + 'auth', pouchOps);
    local.sync(db, {live: true, retry: true}).on('error', console.log.bind(console));
  }

  var service = {};

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
