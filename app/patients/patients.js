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
      controller: 'DirectoryCtrl as directory'
    })
    .state('patients_profile', {
      url: '/patients/profile/:id',
      templateUrl: 'patients/templates/profile.html',
      controller: 'ProfileCtrl as profile',
    })
    .state('register', {
      url: '/patients/register',
      templateUrl: 'patients/templates/register.html',
      controller: 'RegisterCrtl as register'
    });
  // TODO: do your thing
});
