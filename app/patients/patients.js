'use strict';
angular.module('patients', [
  'ionic',
  'ngCordova',
  'ui.router',
  'forms',
  'yaru22.angular-timeago',
  "checklist-model",
])
.config(function ($ionicConfigProvider) {
  $ionicConfigProvider.views.maxCache(0);
})
.run(['$rootScope', 'Clinic', function ($rootScope, Clinic) {
  $rootScope.$on('message.save', function (event, message) {
    console.log('Patients: Got the message');
    message.clinic_id = Clinic.currentClinic;
  });
}])
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
          controller: ['$scope', 'threads', function ($scope, threads) {
            $scope.threads = threads;
          }],
        }
      },
      resolve: {
        threads: ['Messages', 'Clinic', function (Messages, Clinic) {
          console.log('Patients: Getting messages for clinic=' + Clinic.currentClinic);
          return Messages.list({
            clinic_id:Clinic.currentClinic,
          });
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
      },
      resolve: {
        form: ['Forms', function (Forms) {
          // This should be configured in a seeting somewhere
          return Forms.get('demographics').catch(function (err) {
            console.error(err);
          });
        }]
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
      },
      resolve: {
        patient: ['$stateParams', 'Patients', function ($stateParams, Patients) {
          if (!$stateParams.patient_id) {
            return false;
          }
          return Patients.get($stateParams.patient_id).catch(function (err) {
            console.error(err);
          })
        }],
      }
    })
    .state('patients.single.summary', {
      url: '/summary',
      views:{
        'personNav': {
          templateUrl: 'patients/templates/nav-patient.html',
          controller: ['$scope', '$state', 'FormAdd', function ($scope, $state, FormAdd) {
            $scope.addForm = function () {
              FormAdd.show().then(function (type) {
                $state.go('^.edit', {
                  type: type,
                });
              });
            }
          }]
        },
        'personContent': {
          templateUrl: 'patients/templates/summary.html',
          controller: 'PatientSummaryCtrl',
        }
      },
      resolve: {
        records: ['Fields', 'patient', function (Fields, patient) {
          if (!patient) {
            return false;
          };
          return Fields.all({
            patient_id: patient._id,
          });
        }]
      }
    })
    .state('patients.single.edit', {
      url: '/edit?type&field_id&parent_id',
      views: {
        'personNav': {
          templateUrl: 'patients/templates/nav-field-edit.html',
          controller: ['$scope', '$stateParams', 'field', 'form', function ($scope, $stateParams, field, form) {
            $scope.form = form;
            $scope.field = field;
            if ($stateParams.parent_id) {
              $scope.parent_id = $stateParams.parent_id;
            }
            if (!form && field.form) {
              $scope.form = field.form;
            }
          }],
        },
        'personContent': {
          template: '<ion-view><ion-content><field-edit initial-data="initialData" field="field" form="form" on-close="close()"></form-edit></ion-content></ion-view>',
          controller: ['$scope', '$state', '$stateParams', '$ionicPopup', 'field', 'form', function ($scope, $state, $stateParams, $ionicPopup, field, form) {
            if (!form && !field) {
              $state.go('forms.list');
              return false;
            }
            $scope.form = form;
            $scope.field = field;
            if (!$scope.field) {
              $scope.field = {
                patient_id: $stateParams.patient_id
              };
              if ($stateParams.parent_id) {
                $scope.field.parent_id = $stateParams.parent_id;
              }
            }

            $scope.close = function () {
              if ($scope.field.parent_id) {
                $state.go('^.form', {
                  field_id: $scope.field.parent_id,
                });
              } else if ($scope.field._id) {
                $state.go('patients.single.form', {
                  patient_id: $stateParams.patient_id,
                  field_id: $scope.field._id,
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
        field: ['$stateParams', 'Fields', function ($stateParams, Fields) {
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
      url: '/form/:field_id?',
      views: {
        'personContent': {
          templateUrl: 'patients/templates/field-summary-page.html',
          controller: ['$scope', '$ionicSideMenuDelegate', 'field', function ($scope, $ionicSideMenuDelegate, field) {
            $scope.field = field;
          }],

        },
        'personNav': {
          templateUrl: 'patients/templates/nav-field.html',
          controller: ['$scope', '$state', '$ionicSideMenuDelegate', 'FormAdd', 'field', function ($scope, $state, $ionicSideMenuDelegate, FormAdd, field) {
            $scope.field = field;
            $scope.messagesVisiable = false;
            $scope.toggleMessages = function () {
              $ionicSideMenuDelegate.toggleRight();
              $scope.messagesVisiable = !$scope.messagesVisiable;
            }
            $scope.addForm = function () {
              FormAdd.show($scope.field.form.children).then(function (form_id) {
                $state.go('^.edit', {
                  type: form_id,
                  parent_id: $scope.field._id,
                });
              });
            }
          }],
        }
      },
      resolve: {
        field: ['$stateParams', 'Fields', function ($stateParams, Fields) {
          return Fields.get($stateParams.field_id);
        }]
      }
    });
}).run(['$rootScope', '$ionicPopup', 'Messages', function ($rootScope, $ionicPopup, Messages) {
  function addReferalAlert(thread_id) {
    function createReferalPopup () {
      var $scope = $rootScope.$new();
      $scope.users = [
        {
          name: 'Anirban Bandopadhayay'
        },
        {
          name: 'Dr. Anjuli Dasika'
        },
        {
          name: 'Dr. Nick Flanders'
        },
        {
          name: 'Jackie Wolf'
        },
      ];
      function tapFunc (event) {
        console.log("AutoReferral: Should capture users here...");
        return true; // Should return list... but doesn't matter because no real users.
      }
      $ionicPopup.show({
        title: 'Add Participants',
        templateUrl: 'messages/templates/participants-add.html',
        scope: $scope,
        buttons: [
          { text: 'Cancel' },
          {
            text: 'Add',
            type: 'button-positive',
            onTap: tapFunc,
          }
        ]
      }).then(function (result) {
        if (!result) {
          return false;
        }
        console.log("AutoReferral: Adding auto message!");
        Messages.save({
          thread_id: thread_id,
          body: "This case has been flagged for referal",
          sender: false,
        });
      });
    }
    $ionicPopup.show({
      title: 'Refer Case',
      template: 'Does this case need attention from a doctor?',
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
    }).then(function (result) {
      if (result) {
        createReferalPopup();
      }
    });
  }
  $rootScope.$on('$stateChangeSuccess', function (event, toState, toParams, fromState, fromParams) {
    if (fromState.name == 'patients.single.edit' &&
      toState.name == 'patients.single.form' &&
      !fromParams.parent_id &&
      !fromParams.field_id &&
      toParams.field_id) {
      addReferalAlert(toParams.field_id);
    }
  });
}]);
