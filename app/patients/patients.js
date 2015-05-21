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
    .state('profile', {
      url: '/patients/:id',
      templateUrl: 'patients/templates/profile.html',
      controller: 'ProfileCrtl as profile',
    })
    .state('patients', {
      url: '/patients',
      templateUrl: 'patients/templates/list.html',
      controller: 'DirectoryCtrl as directory'
    })
    .state('register', {
      url: '/patients/register',
      templateUrl: 'patients/templates/register.html',
      controller: 'RegisterCrtl as register'
    });
  // TODO: do your thing
});
