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
          templateUrl: 'forms/templates/field-summary.html',
          controller: 'FieldSummaryCtrl'
        }
      }
    })
    .state('fields.edit', {
      url: '/edit?type&field_id',
      views:{
        'fieldsContent': {
          templateUrl: 'forms/templates/field-edit-page.html',
          controller: ['$scope', '$state', '$stateParams', function ($scope, $state, $stateParams) {
            $scope.field_id = $stateParams.field_id;
            $scope.type = $stateParams.type;
            $scope.data = {};
            $scope.close = function () {
              if ($scope.data._id) {
                $state.go("forms.field", {field_id: $scope.data._id});
              } else {
                $state.go("forms.list");
              }
            }
          }],
        }
      }
    });
});
