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
          templateUrl: 'forms/templates/fields-directory.html',
          controller: 'FieldsDirectoryCtrl',
        }
      }
    })
    .state('forms.create', {
      url: '/new',
      views: {
        'formsContent': {
          templateUrl: 'forms/templates/forms-directory.html',
          controller: 'FormsDirectoryCtrl',
        }
      }
    })
    .state('forms.field', {
      url: '/field?type&field_id',
      views:{
        'formsContent': {
          templateUrl: 'forms/templates/form-fields-list.html',
          controller: 'FormCtrl'
        }
      }
    });
});
