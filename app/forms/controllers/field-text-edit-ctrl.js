'use strict';
angular.module('forms')
.controller('FieldTextEditCtrl', ['$scope', '$ionicModal', '$cordovaKeyboard', function ($scope, $ionicModal, $cordovaKeyboard) {

  console.log('Hello from your Controller: FieldTextEditCtrl in module forms:. This is your controller:', this);
  $ionicModal.fromTemplateUrl('forms/templates/field-text-edit-modal.html', {
    scope: $scope,
    animation: 'slide-in-up',
    focusFirstInput: true,
  }).then(function (modal) {
    $scope.modal = modal;
    console.log("Modal created for " + $scope.label);
  });
  console.log('Should have created a modal!');

  $scope.openModal = function () {
    $scope.modal.show().then(function () {
      $cordovaKeyboard.show();
      console.log("Modal opened for " + $scope.label);
    });
  };

  $scope.closeModal = function () {
    $cordovaKeyboard.close();
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
