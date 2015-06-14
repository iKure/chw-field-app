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
.run(['$rootScope', '$state', function ($rootScope, $state) {
  $rootScope.$on('$stateChangeStart', function (event, toState, toParams, fromState, fromParams) {
    // check login, if not logged in — redirect to login
    if (toState.name != 'login'){
      event.preventDefault();
      console.log("Auth: Caught no login @ " + toState.name);
      $state.go('login');
    }
  });
}])
.config(function ($stateProvider) {

  console.log('Allo! Allo from your module: ' + 'auth');

  // some basic routing
  $stateProvider
    .state('login', {
      url: '/login',
      templateUrl: 'auth/templates/login.html',
      controller: 'LoginCtrl'
    });
});
