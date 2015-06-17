'use strict';
angular.module('forms')
.controller('FieldRepeatableCtrl', ['$scope', '$ionicPopup', function ($scope, $ionicPopup) {

  console.log('Hello from your Controller: FieldRepeatableCtrl in module forms:. This is your controller:', this);
  $scope.checked = false;
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
  $scope.current = {};
  $scope.addForm = function (form) {
    if (popup) {
      popup.close();
    }
    if (!$scope.data[form.name]) {
      $scope.data[form.name] = {};
    }
    $scope.current = {
      type: form.include,
      label: form.label,
      data: $scope.data[form.name],
    };
    $scope.checked = true;
    console.log("FieldRepeatableCtrl: Show sub-form");
  }

  $scope.closeForm = function () {
    $scope.current = {};
    $scope.checked = false;
    console.log("FieldRepeatableCtrl: Hiding sub-form");
  }
}]);
