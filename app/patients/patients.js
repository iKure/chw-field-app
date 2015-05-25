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
    .state('patient', {
      url: '/patient/:id',
      abstract: true,
      templateUrl: 'patients/templates/menu-side.html',
      controller: 'ProfileCtrl as profile',
    })
    .state('patient.summary', {
      url: '/summary',
      views:{
        'menuContent': {
          templateUrl: 'patients/templates/profile.html',
        }
      }
    })
    .state('patient.info-edit', {
      url:'/info-edit',
      views:{
        'menuContent':{
          templateUrl: 'patients/templates/info-edit.html'
        }
      }
    });
});
