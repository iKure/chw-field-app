'use strict';
angular.module('patients', [
  'ionic',
  'ngCordova',
  'ui.router',
  'shared',
  // TODO: load other modules selected during generation
])
.config(function ($stateProvider, $urlRouterProvider) {

  console.log('Allo! Allo from your module: ' + 'patients');

  $urlRouterProvider.otherwise('/patients/directory');

  // some basic routing
  $stateProvider
    .state('patients', {
      url: '/patients',
      templateUrl: 'patients/templates/view.html',
      abstract: true,
    })
    .state('patients.directory', {
      url: '/directory',
      views: {
        'patientsContent':{
          templateUrl: 'patients/templates/list.html',
          controller: 'PatientDirectoryCtrl',
        }
      }
    })
    .state('patients.register', {
      url: '/register',
      views: {
        'patientsContent': {
          templateUrl: 'patients/templates/register.html',
          controller: 'PatientFormCtrl',
        }
      }
    })
    .state('patients.single', {
      url: '/:patient_id',
      abstract: true,
      views: {
        'patientsContent': {
          templateUrl: 'patients/templates/menu-side.html',
          controller: 'PatientCtrl',
        }
      }
    })
    .state('patients.single.summary', {
      url: '/summary',
      views:{
        'personContent': {
          templateUrl: 'patients/templates/summary.html',
          controller: 'PatientSummaryCtrl',
        }
      }
    })
    .state('patients.single.new', {
      url: '/new',
      views:{
        'personContent': {
          templateUrl: 'patients/templates/forms-new.html',
          controller: 'FormsDirectoryCtrl',
        }
      }
    })
    .state('patients.single.form', {
      url: '/form?type&field_id',
      views: {
        'personContent': {
          template: '<form-edit initial-data="initialData" field-id="field_id" form-type="type" on-close="close()"></form-edit>',
          controller: ['$scope', '$state', '$stateParams', function ($scope, $state, $stateParams) {
            $scope.field_id = $stateParams.field_id;
            $scope.type = $stateParams.type;
            $scope.patient_id = $stateParams.patient_id;

            $scope.initialData = {
              patient_id: $scope.patient_id
            };

            $scope.close = function () {
              $state.go('patients.single.summary', {
                patient_id: $scope.patient_id,
              })
            }
          }],
        }
      }
    });
});
