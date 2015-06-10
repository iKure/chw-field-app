'use strict';
angular.module('patients', [
  'ionic',
  'ngCordova',
  'ui.router',
  'shared',
  // TODO: load other modules selected during generation
])
.config(function ($stateProvider, $urlRouterProvider) {

  console.log('Allo! Allo from your module: ' + 'patients');

  $urlRouterProvider.otherwise('/patients/directory');

  // some basic routing
  $stateProvider
    .state('patients', {
      url: '/patients',
      templateUrl: 'patients/templates/view.html',
      abstract: true,
    })
    .state('patients.directory', {
      url: '/directory',
      views: {
        'patientsContent':{
          templateUrl: 'patients/templates/list.html',
          controller: 'PatientDirectoryCtrl',
        }
      }
    })
    .state('patients.register', {
      url: '/register',
      views: {
        'patientsContent': {
          templateUrl: 'patients/templates/register.html',
          controller: 'PatientFormCtrl',
        }
      }
    })
    .state('patients.single', {
      url: '/:patient_id',
      abstract: true,
      views: {
        'patientsContent': {
          templateUrl: 'patients/templates/menu-side.html',
          controller: 'PatientCtrl',
        }
      }
    })
    .state('patients.single.summary', {
      url: '/summary',
      views:{
        'personContent': {
          templateUrl: 'patients/templates/summary.html',
          controller: 'PatientSummaryCtrl',
        }
      }
    })
    .state('patients.single.profile', {
      url: '/profile',
      views:{
        'personContent': {
          templateUrl: 'patients/templates/profile.html',
          controller: 'ProfileCtrl as profile',
        }
      }
    })
    .state('patients.single.info-edit', {
      url:'/info-edit',
      views:{
        'personContent':{
          templateUrl: 'patients/templates/info-edit.html',
          controller: 'PatientFormCtrl as form',
        }
      }
    });
});
