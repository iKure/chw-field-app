'use strict';
angular.module('forms')
.controller('SubFormCtrl', ['$scope', '$ionicModal', '$state', '$stateParams', 'Forms', 'Fields', function ($scope, $ionicModal, $state, $stateParams, Forms, Fields) {

  console.log('Hello from your Controller: SubFormCtrl in module forms:. This is your controller:', this);

  function getFormFields() {
    if (!$scope.$parent.data) {
      return setTimeout(getFormFields, 100);
    }
    if (!$stateParams.name || !$scope.$parent.data[$stateParams.name]) {
      $state.go('forms.field', {
        field_id: $stateParams.field_id,
      });
      return false;
    }
    $scope.data = $scope.$parent.data[$stateParams.name];
    Forms.get($scope.data.include).then(function (doc) {
      $scope.form = doc;
      createPopover();
    });
  }

  function createPopover () {
    $ionicModal.fromTemplateUrl('forms/templates/sub-form.html', {
      scope: $scope,
      animation: 'slide-in-up'
    }).then(function (modal) {
      $scope.modal = modal;
      $scope.modal.show();
    });

    $scope.closeModal = function () {
      $scope.modal.hide();
    };
    $scope.$on('$destroy', function () {
      $scope.modal.remove();
    });
    $scope.$on('modal.hidden', function () {
      console.log("SubFormCtrl: Close modal");
      setTimeout(function () {
        $state.go('forms.field', {
          field_id: $stateParams.field_id,
        });
      }, 100);
    });
    $scope.$on('modal.removed', function () {
      console.log("SubFormCtrl: Modal removed");
    });
  }

  getFormFields();
}]);
