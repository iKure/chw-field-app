'use strict';
angular.module('patients', [
  'ionic',
  'ngCordova',
  'ui.router',
  'yaru22.angular-timeago',
  // TODO: load other modules selected during generation
])
.config(function ($ionicConfigProvider) {
  $ionicConfigProvider.views.maxCache(0);
})
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
          controller: ['$scope', '$state', 'threads', function ($scope, $state, threads) {
            $scope.threads = threads;
          }],
        }
      },
      resolve: {
        threads: ['$q', 'Messages', 'Fields', 'Patients', function ($q, Messages, Fields, Patients) {
          var deferred = $q.defer();
          Messages.list().then(function (results) {
            var new_results = []
            function sendResults (obj) {
              new_results.push(obj);
              if (new_results.length == results.length) {
                deferred.resolve(new_results);
              }
            }
            results.forEach(function (thread) {
              if (!thread._id) {
                sendResults(thread);
                return false;
              }
              Fields.get(thread._id).then(function (field) {
                return Patients.get(field.patient_id).then(function (patient) {
                  thread.patient = patient;
                  sendResults(thread);
                });
              }).catch (function (err) {
                sendResults(thread);
              });
            });
          });
          return deferred.promise;
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
          controller: ['$scope', '$state', '$stateParams', '$ionicPopup', 'data', 'form', function ($scope, $state, $stateParams, $ionicPopup, data, form) {
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
                $ionicPopup.show({
                  title: 'Refer Case',
                  template: 'Does this case need attention from a doctor?',
                  scope: $scope,
                  buttons: [
                    { text: 'No'},
                    {
                      text: 'Yes',
                      type: 'button-positive',
                      onTap: function () {
                        return true;
                      }
                    }
                  ]
                }).then(function (res) {
                  if (res) {
                    // Redirect to recipient selection & add automatic message
                  }
                  $state.go('patients.single.summary', {
                    patient_id: $stateParams.patient_id,
                  });
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
