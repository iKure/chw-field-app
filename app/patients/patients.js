'use strict';
angular.module('patients', [
  'ionic',
  'ngCordova',
  'ui.router',
  // TODO: load other modules selected during generation
])
.config(function ($stateProvider, $urlRouterProvider) {

  console.log('Allo! Allo from your module: ' + 'patients');

  $urlRouterProvider.otherwise('/patients');

  // some basic routing
  $stateProvider
    .state('patients', {
      url: '/patients',
      templateUrl: 'patients/templates/list.html',
    })
    .state('patients_profile', {
      url: '/profile/:id',
      templateUrl: 'patients/templates/profile.html',
    })
    .state('patient_register', {
      url: '/patients/register',
      templateUrl: 'patients/templates/register.html',
      controller: 'RegisterCrtl as register'
    });
  // TODO: do your thing
});
