'use strict';
angular.module('forms')
.controller('FieldRepeatableCtrl', ['$scope', '$ionicPopup', function ($scope, $ionicPopup) {

  console.log('Hello from your Controller: FieldRepeatableCtrl in module forms:. This is your controller:', this);

  var popup = false;
  $scope.pickForm = function () {
    popup = $ionicPopup.show({
      templateUrl: 'forms/templates/field-repeatable-form-select.html',
      title: 'Pick a form',
      subTitle: 'You can select multiple forms',
      scope: $scope,
      buttons: [
        { text: 'Cancel' }
      ]
    });
  }

  $scope.addForm = function () {
    if (popup) {
      popup.close();
    }
    console.log("Slide out window for sub-form");
  }
}]);
