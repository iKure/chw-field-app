'use strict';
angular.module('auth', [
  'ionic',
  'ngCordova',
  'ui.router',
  // TODO: load other modules selected during generation
])
.config(function (pouchDBProvider, POUCHDB_METHODS) {
  // From: https://github.com/angular-pouchdb/angular-pouchdb
  // Example for nolanlawson/pouchdb-authentication
  var authMethods = {
    login: 'qify',
    logout: 'qify',
    getUser: 'qify'
  };
  pouchDBProvider.methods = angular.extend({}, POUCHDB_METHODS, authMethods);
})
.config(function ($stateProvider) {

  console.log('Allo! Allo from your module: ' + 'auth');

  // some basic routing
  $stateProvider
    .state('auth', {
      url: '/auth',
      templateUrl: 'auth/templates/start.html',
      controller: 'StartCtrl as start'
    });
  // TODO: do your thing
});
