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
        },
      },
    })
    .state('tabs.patient.summary', {
      url: '/summary',
      views: {
        'patientContent': {
          templateUrl: 'patients/templates/summary.html',
          controller: 'PatientSummaryCtrl as summary',
        },
      }
    })
    .state('tabs.patient.profile', {
      url: '/profile',
      views: {
        'patientContent': {
          templateUrl: 'patients/templates/profile.html',
          controller: 'ProfileCtrl as profile',
        }
      }
    })
    .state('tabs.patient.info-edit', {
      url:'/info-edit',
      views:{
        'patientContent':{
          templateUrl: 'patients/templates/info-edit.html',
          controller: 'PatientFormCtrl as form',
        }
      }
    })
    .state('tabs.vitals', {
      url:'/vitals',
      abstract: true,
      views: {
        'mainContent': {
          templateUrl: 'main/templates/case-layout.html',
          controller: 'ProfileCtrl as profile',
        }
      }
    })
    .state('tabs.vitals.list', {
      url: '/list',
      views: {
        'caseContent': {
          templateUrl: 'vitals/templates/vitals-list.html',
          controller: 'VitalsCtrl as vitals',
        }
      }
    })
    .state('tabs.vitals.new', {
      url: '/new',
      views: {
        'caseContent': {
          templateUrl: 'vitals/templates/vitals-edit.html',
          controller: 'VitalsAddCtrl as vitals',
        }
      }
    })
    .state('tabs.vitals.new.field', {
      url: '/:type',
      views: {
        'menuContent':{
          template: '<vitals-form type="vitals.type" record="vitals.current" on-save="vitals.saveRecord(record)" />',
          controller: 'VitalsFormCtrl as vitals',
        }
      }
    })
    .state('tabs.cases', {
      url:'/cases',
      abstract: true,
      views: {
        'mainContent': {
          templateUrl: 'main/templates/patient-layout.html',
          controller: 'ProfileCtrl as profile',
        }
      }
    })
    .state('tabs.cases.list', {
      url: '/list',
      views: {
        'patientContent': {
          templateUrl: 'cases/templates/list.html',
          controller: 'CasesCtrl as ctrl',
        }
      }
    })
    .state('tabs.cases.new', {
      url: '/new',
      views: {
        'patientContent': {
          templateUrl: 'cases/templates/symptoms.html',
          controller: 'CasesAddCtrl as ctrl',
        }
      }
    })
    .state('tabs.case', {
      url: '/:case_id',
      abstract: true,
      views: {
        'mainContent':{
          templateUrl: 'main/templates/case-layout.html',
          controller: 'ConnectedStateCtrl as ctrl',
        }
      }
    })
    .state('tabs.case.summary', {
      url: '/summary',
      views: {
        'caseContent':{
          templateUrl: 'cases/templates/summary.html',
          controller: 'CaseSummaryCtrl',
        }
      }
    })
    .state('tabs.surveys', {
      url: '/surveys',
      views: {
        'mainContent': {
          templateUrl: 'main/templates/patient-layout.html',
          controller: 'ProfileCtrl as profile'
        }
      }
    })
    .state('tabs.surveys.list', {
      url: '/list',
      views: {
        'patientContent': {
          templateUrl: 'main/templates/survey-list.html',
        }
      }
    })
    .state('tabs.surveys.page1', {
      url: '/page1',
      views: {
        'patientContent': {
          templateUrl: 'main/templates/survey-p1.html'
        }
      }
    })
    .state('tabs.surveys.page2', {
      url: '/page2',
      views: {
        'patientContent': {
          templateUrl: 'main/templates/survey-p2.html'
        }
      }
    })
    .state('tabs.surveys.page3', {
      url: '/page3',
      views: {
        'patientContent': {
          templateUrl: 'main/templates/survey-p3.html'
        }
      }
    });

});
