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
  $scope.keyToForm = function (key) {
    var form = false;
    $scope.forms.some(function (_form) {
      if (key == _form.name) {
        form = _form;
        return true;
      }
    });
    return form;
  }
  $scope.openForm = function (form) {
    if (popup) {
      popup.close();
    }
    if (!$scope.data[form.name]) {
      $scope.data[form.name] = {};
    }
    $scope.current = {
      type: form.include,
      name: form.name,
      label: form.label,
      data: $scope.data[form.name],
    };
    console.log("FieldRepeatableCtrl: Show sub-form " + form.name);
  }

  $scope.deleteForm = function (key) {
    console.log("FieldRepeatableCtrl: Deleting " + key);
    var d = $scope.data;
    delete d[key];
    $scope.closeForm();
  }

  $scope.closeForm = function () {
    $scope.current = false;
    console.log("FieldRepeatableCtrl: Hiding sub-form");
  }
  $scope.getKeys = function (obj) {
    return Object.keys(obj);
  }
}]);
