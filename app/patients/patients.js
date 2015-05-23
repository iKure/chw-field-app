'use strict';
angular.module('patients', [
  'ionic',
  'ngCordova',
  'ui.router',
  // TODO: load other modules selected during generation
])
.config(function ($stateProvider, $urlRouterProvider) {

  console.log('Allo! Allo from your module: ' + 'patients');

  // some basic routing
  $stateProvider
    .state('patients.directory', {
      url: '/patients',
      templateUrl: 'patients/templates/list.html',
    })
    .state('patients.profile', {
      url: '/profile/:id',
      templateUrl: 'patients/templates/profile.html',
    })
    .state('patient.register', {
      url: '/patients/register',
      templateUrl: 'patients/templates/register.html',
      controller: 'RegisterCrtl as register'
    });
  // TODO: do your thing
});
