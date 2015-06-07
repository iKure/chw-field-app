'use strict';
angular.module('forms', [
  'ionic',
  'ngCordova',
  'ui.router',
  'shared',
])
.config(function ($stateProvider) {

  console.log('Allo! Allo from your module: ' + 'forms');

  $stateProvider
    .state('forms', {
      url: '/forms',
      templateUrl: 'forms/templates/start.html',
      controller: 'StartCtrl as start'
    })
    .state('forms.create', {
      url: '/new/:type',
      templateUrl: 'forms/templates/start.html',
    })
    .state('forms.view', {
      url: '/:form_id',
      templateUrl: 'forms/templates/start.html',
    });
});
