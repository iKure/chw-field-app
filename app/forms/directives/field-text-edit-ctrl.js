'use strict';
angular.module('forms')
.controller('FieldTextEditCtrl', ['$scope', '$ionicModal', function ($scope, $ionicModal) {

  console.log('Hello from your Controller: FieldTextEditCtrl in module forms:. This is your controller:', this);
  $ionicModal.fromTemplateUrl('forms/directives/field-text-edit-modal.html', {
    scope: $scope,
    animation: 'slide-in-up',
    focusFirstInput: true,
  }).then(function (modal) {
    $scope.modal = modal;
  });
  $scope.openModal = function () {
    $scope.modal.show();
  };
  $scope.closeModal = function () {
    $scope.modal.hide();
  };
  $scope.$on('$destroy', function () {
    $scope.modal.remove();
  });
  // Execute action on hide modal
  $scope.$on('modal.hidden', function () {
    // Execute action
    console.log("Modal closes & value=" + $scope.value);
  });
  // Execute action on remove modal
  $scope.$on('modal.removed', function () {
    // Execute action
  });

  $scope.updateValue = function (val) {
    $scope.value = val;
  }
}]);
