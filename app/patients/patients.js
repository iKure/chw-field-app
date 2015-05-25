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
    .state('patients_directory', {
      url: '/directory',
      templateUrl: 'patients/templates/list.html',
    })
    .state('patients_register', {
      url: '/register',
      templateUrl: 'patients/templates/register.html',
    })
    .state('tabs.patient.summary', {
      url: '/summary',
      views:{
        'menuContent': {
          templateUrl: 'patients/templates/profile.html',
        }
      }
    })
    .state('tabs.patient.info-edit', {
      url:'/info-edit',
      views:{
        'menuContent':{
          templateUrl: 'patients/templates/info-edit.html'
        }
      }
    });
  // TODO: do your thing
});
