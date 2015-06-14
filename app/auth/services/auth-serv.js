'use strict';
angular.module('auth')
.service('Auth', ['$q','$rootScope', 'Config', 'pouchDB', function ($q, $rootScope, Config, pouchDB) {
  console.log('Hello from your Service: Auth in module auth');
  var localDB = new pouchDB('auth');

  var service = {};

  function getSession () {
  	var deferred = $q.defer();
  	console.log(Config.ENV);
  	if (Config.ENV.SESSION) {
  		deferred.resolve(Config.ENV.SESSION);
  	} else if (Config.ENV.SERVER_URL) {
  		console.log('AuthServ: Checking SERVER_URL');
  	} else {
  		deferred.reject(false);
  	}
  	return deferred.promise;
  }
  service.getSession = getSession;

  return service;
}]);
