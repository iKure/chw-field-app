'use strict';
angular.module('cases', [
  'ionic',
  'ngCordova',
  'ui.router',
  'shared',
  // TODO: load other modules selected during generation
])
.config(function ($stateProvider) {

  console.log('Allo! Allo from your module: ' + 'cases');

  // some basic routing
  $stateProvider
    .state('cases', {
      url: '/cases',
      templateUrl: 'cases/templates/frame.html',
    })
    .state('cases.list', {
      url: '/list',
      views: {
        'mainContent': {
          templateUrl: 'cases/templates/list.html',
          controller: 'CasesCtrl',
        }
      }
    })
    .state('cases.new', {
      url: '/new',
      views: {
        'mainContent': {
          templateUrl: 'cases/templates/symptoms.html',
          controller: 'CasesAddCtrl as ctrl',
        }
      }
    })
    .state('cases.summary', {
      url: '/:case_id',
      views: {
        'mainContent': {
          templateUrl: 'cases/templates/summary.html',
          controller: 'CaseSummaryCtrl',
        }
      }
    })
    .state('cases.summary.vitals', {
      url: '/vitals',
      views: {
        'caseContent': {
          templateUrl: 'vitals/templates/vitals-edit.html',
          controller: 'VitalsAddCtrl as vitals',
        }
      }
    })
    .state('cases.summary.vitals.new.field', {
      url: '/:type',
      views: {
        'menuContent':{
          template: '<vitals-form type="vitals.type" record="vitals.current" on-save="vitals.saveRecord(record)" />',
          controller: 'VitalsFormCtrl as vitals',
        }
      }
    });
});
