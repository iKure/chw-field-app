'use strict';
angular.module('patients', [
  'ionic',
  'ngCordova',
  'ui.router',
  'shared',
  // TODO: load other modules selected during generation
])
.config(function ($stateProvider) {

  console.log('Allo! Allo from your module: ' + 'patients');

  // some basic routing
  $stateProvider
    .state('patient_directory', {
      url: '/patients/directory',
      templateUrl: 'patients/templates/list.html',
      controller: 'PatientDirectoryCtrl',
    })
    .state('patient_register', {
      url: '/patients/register',
      templateUrl: 'patients/templates/register.html',
      controller: 'PatientFormCtrl',
    })
    .state('patient', {
      url: '/patient/:patient_id',
      abstract: true,
      templateUrl: 'patients/templates/menu-side.html',
      controller: 'PatientCtrl',
    })
    .state('patient.summary', {
      url: '/summary',
      views:{
        'patientContent': {
          templateUrl: 'patients/templates/summary.html',
          controller: 'PatientSummaryCtrl as summary',
        }
      }
    })
    .state('patient.profile', {
      url: '/profile',
      views:{
        'patientContent': {
          templateUrl: 'patients/templates/profile.html',
          controller: 'ProfileCtrl as profile',
        }
      }
    })
    .state('patient.info-edit', {
      url:'/info-edit',
      views:{
        'patientContent':{
          templateUrl: 'patients/templates/info-edit.html',
          controller: 'PatientFormCtrl as form',
        }
      }
    });
});
