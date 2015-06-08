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
          templateUrl: 'forms/templates/forms-list.html',
          controller: 'FormsCtrl'
        }
      }
    })
    .state('forms.create', {
      url: '/new/:type',
      views:{
        'formsContent':{
          templateUrl: 'forms/templates/start.html',
          controller: 'FormCreateCtrl'
        }
      }
    })
    .state('forms.field', {
      url: '/field/:field_id',
      views:{
        'formsContent': {
          templateUrl: 'forms/templates/fields-list.html',
          controller: 'FieldsCtrl'
        }
      }
    });
});
