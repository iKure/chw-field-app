'use strict';
angular.module('forms')
.controller('FieldTextEditCtrl', ['$scope', '$ionicModal', '$cordovaKeyboard', 'focus', function ($scope, $ionicModal, $cordovaKeyboard, focus) {

  console.log('Hello from your Controller: FieldTextEditCtrl in module forms:. This is your controller:', this);

  $scope.editing = false;

  $scope.blurInput = function () {
    console.log("Not editing:" + $scope.label);
    $scope.editing = false;
    try {
      $cordovaKeyboard.hide();
    } catch (err) {
      console.log("No keyboard");
    }
  }

  $scope.setFocus = function ($event) {
    setTimeout(function () {
      console.log("Editing:" + $scope.label);
      $scope.editing = true;
      try {
        $cordovaKeyboard.show();
      } catch (err) {
        console.log("No keyboard");
      }
    }, 100);
  }

}]);
