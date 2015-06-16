'use strict';
angular.module('patients', [
  'ionic',
  'ngCordova',
  'ui.router',
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
    .state('patients.messages', {
      url: '/messages',
      views: {
        'patientsContent': {
          templateUrl: 'patients/templates/message-threads.html',
          controller: ['$scope', '$state', 'threads', 'Fields', function ($scope, $state, threads, Fields) {
            $scope.threads = threads;
            $scope.go_to_field = function (field_id) {
              Fields.get(field_id).then(function (doc) {
                $state.go('patients.single.form', {
                  field_id: doc._id,
                  patient_id: doc.patient_id,
                });
              });
            }
          }],
        }
      },
      resolve: {
        threads: ['Messages', function (Messages) {
          return Messages.list();
        }]
      }
    })
    .state('patients.directory', {
      url: '/directory',
      views: {
        'patientsContent':{
          templateUrl: 'patients/templates/list.html',
          controller: 'PatientDirectoryCtrl',
        }
      },
      resolve: {
        records: ['Patients', function (Patients) {
          return Patients.list();
        }]
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
    .state('patients.single.edit', {
      url: '/edit?type&field_id',
      views: {
        'personContent': {
          template: '<form-edit initial-data="initialData" data="data" form="form" on-close="close()"></form-edit>',
          controller: ['$scope', '$state', '$stateParams', 'data', 'form', function ($scope, $state, $stateParams, data, form) {
            $scope.data = data;
            $scope.form = form;
            if (!form && data.form) {
              $scope.form = data.form;
            }

            $scope.initialData = {
              patient_id: $stateParams.patient_id
            };

            $scope.close = function () {
              if ($scope.data._id) {
                $state.go('patients.single.form', {
                  patient_id: $stateParams.patient_id,
                  field_id: $scope.data._id,
                });
              } else {
                $state.go('patients.single.summary', {
                  patient_id: $stateParams.patient_id,
                });
              }
            }
          }],
        }
      },
      resolve: {
        data: ['$stateParams', 'Fields', function ($stateParams, Fields) {
          if (!$stateParams.field_id) {
            return false;
          }
          return Fields.get($stateParams.field_id);
        }],
        form: ['$stateParams', 'Forms', function ($stateParams, Forms) {
          if (!$stateParams.type) {
            return false;
          }
          return Forms.get($stateParams.type);
        }]
      }
    })
    .state('patients.single.form', {
      url: '/form/:field_id',
      views: {
        'personContent': {
          templateUrl: 'forms/templates/field-summary.html',
          controller: 'FieldSummaryCtrl',
        },
      },
      resolve: {
        data: ['$stateParams', 'Fields', function ($stateParams, Fields) {
          return Fields.get($stateParams.field_id);
        }]
      }
    });
});
