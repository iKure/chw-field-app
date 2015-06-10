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
    });
  };

  $scope.closeModal = function () {
    $cordovaKeyboard.close();
    $scope.modal.hide();
  };

  window.addEventListener('native.keyboardhide', function () {
    $scope.closeModal();
  });

  $scope.$on('$destroy', function () {
    $scope.modal.remove();
  });

  $scope.updateValue = function (val) {
    $scope.value = val;
  }
}]);
