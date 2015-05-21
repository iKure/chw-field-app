'use strict';
angular.module('patients', [
  'ionic',
  'ngCordova',
  'ui.router',
  // TODO: load other modules selected during generation
])
.config(function ($stateProvider) {

  console.log('Allo! Allo from your module: ' + 'patients');

  // some basic routing
  $stateProvider
    .state('patients', {
      url: '/patients',
      templateUrl: 'patients/templates/start.html',
      controller: 'StartCtrl as start'
    })
    .state('register', {
      url: '/patients/register',
      templateUrl: 'patients/templates/register.html',
      controller: 'RegisterCrtl as register'
    });
  // TODO: do your thing
});
