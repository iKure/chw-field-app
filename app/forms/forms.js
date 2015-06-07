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
      abstract: true,
      templateUrl: 'forms/templates/view.html',
    })
    .state('forms.list', {
      url: '/list',
      views:{
        'formsContent':{
          templateUrl: 'forms/templates/odk-list.html',
          controller: 'OdkCtrl as Odk'
        }
      }
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
