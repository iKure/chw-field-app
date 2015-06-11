'use strict';
angular.module('forms', [
  'ionic',
  'ngCordova',
  'ui.router',
  'shared',
  "checklist-model",
  'focusOn',
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
      url: '/field/:field_id',
      views: {
        'formsContent': {
          templateUrl: 'forms/templates/field-summary.html',
          controller: 'FieldSummaryCtrl'
        }
      }
    })
    .state('forms.edit', {
      url: '/edit?type&field_id',
      views:{
        'formsContent': {
          template: '{{close}}<form-edit field-id="field_id" form-type="type" data="data" on-close="close()"></form-edit>',
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
