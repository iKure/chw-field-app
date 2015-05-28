'use strict';
angular.module('main', [
  'ionic',
  'ngCordova',
  'ui.router',
  // TODO: load other modules selected during generation
])
.config(function ($stateProvider, $urlRouterProvider) {

  console.log('Allo! Allo from your module: ' + 'main');

  $urlRouterProvider.otherwise('/tab/directory');

  // some basic routing
  $stateProvider
    .state('tabs', {
      url: '/tab',
      templateUrl: 'main/templates/tabs.html',
      controller: "TabsCtrl as tabs",
    })
    .state('tabs.patient_directory', {
      url: '/directory',
      views: {
        'mainContent': {
          templateUrl: 'patients/templates/list.html',
          controller: 'DirectoryCtrl as directory',
        }
      }
    })
    .state('tabs.patient_register', {
      url: '/register',
      views: {
        'mainContent': {
          templateUrl: 'patients/templates/register.html',
          controller: 'PatientFormCtrl as form',
        }
      }
    })
    .state('tabs.patient', {
      url: '/patients/:id',
      views: {
        'mainContent': {
          templateUrl: 'main/templates/patient-layout.html',
          controller: 'ProfileCtrl as profile',
        }
      },
    })
    .state('tabs.patient.summary', {
      url: '/summary',
      views: {
        'patientNavigation': {
          templateUrl: 'patients/templates/navigation.html',
          controller: 'ProfileCtrl as profile',
        },
        'patientContent': {
          templateUrl: 'patients/templates/summary.html',
          controller: 'PatientSummaryCtrl as summary',
        }
      }
    });
});
