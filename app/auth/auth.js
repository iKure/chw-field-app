'use strict';
angular.module('auth', [
  'ionic',
  'ngCordova',
  'ui.router',
  // TODO: load other modules selected during generation
])
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
