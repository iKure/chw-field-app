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
    });
});
