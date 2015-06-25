'use strict';
angular.module('forms', [
  'ionic',
  'ngCordova',
  'ui.router',
  "checklist-model",
  'focusOn',
  "pageslide-directive",
  "RecursionHelper",
])
.config(function ($stateProvider) {

  console.log('Allo! Allo from your module: ' + 'forms');

  $stateProvider
    .state('fields', {
      url: '/fields',
      abstract: true,
      templateUrl: 'forms/templates/view.html',
    })
    .state('fields.list', {
      url: '/list',
      views:{
        'fieldsContent':{
          templateUrl: 'forms/templates/fields-directory.html',
          controller: 'FieldsDirectoryCtrl',
        }
      }
    })
    .state('fields.create', {
      url: '/new',
      views: {
        'fieldsContent': {
          templateUrl: 'forms/templates/forms-directory.html',
          controller: 'FormsDirectoryCtrl',
        }
      }
    })
    .state('fields.field', {
      url: '/field/:field_id',
      views: {
        'fieldsContent': {
          templateUrl: 'forms/templates/field-summary-page.html',
          controller: 'FieldSummaryCtrl'
        }
      },
      resolve: {
        field: ['$state', '$stateParams', 'Fields', function ($state, $stateParams, Fields) {
          return Fields.get($stateParams.field_id).catch(function (err) {
            $state.go('fields.list');
            return false;
          });
        }]
      }
    })
    .state('fields.edit', {
      url: '/edit?type&field_id',
      views:{
        'fieldsContent': {
          templateUrl: 'forms/templates/field-edit-page.html',
          controller: ['$scope', '$state', 'form', 'field', function ($scope, $state, form, field) {
            if (!form && !field) {
              $state.go('forms.list');
              return false;
            }
            $scope.form = form;
            $scope.field = field;
            $scope.close = function () {
              if ($scope.field && $scope.field._id) {
                $state.go("fields.field", {field_id: $scope.field._id});
              } else {
                $state.go("fields.list");
              }
            }
          }],
        }
      },
      resolve: {
        form: ['$stateParams', 'Forms', function ($stateParams, Forms) {
          if (!$stateParams.type) {
            return false;
          }
          return Forms.get($stateParams.type);
        }],
        field: ['$stateParams', 'Fields', function ($stateParams, Fields) {
          if (!$stateParams.field_id) {
            return false;
          }
          return Fields.get($stateParams.field_id);
        }],
      }
    });
});
