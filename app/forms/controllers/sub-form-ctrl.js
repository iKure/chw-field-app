'use strict';
angular.module('forms')
.controller('SubFormCtrl', ['$scope', '$ionicModal', '$state', '$stateParams', 'Forms', 'Fields', function ($scope, $ionicModal, $state, $stateParams, Forms, Fields) {

  console.log('Hello from your Controller: SubFormCtrl in module forms:. This is your controller:', this);
  Forms.get($scope.data.include).then(function (doc) {
    $scope.form = doc;
    updateValue();
  });

  updateValue();

  $ionicModal.fromTemplateUrl('forms/templates/sub-form.html', {
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function (modal) {
    $scope.modal = modal;
    console.log("SubFormCtrl has created a modal");
  });

  function openModal () {
    $scope.modal.show();
    updateValue();
    if ($scope.data._id) {
      Fields.get($scope.data._id).then(function (doc) {
        console.log('SubFormCtrl: Reloading data');
        $scope.data = doc;
      });
    }
  }
  $scope.open = openModal;

  function closeModal () {
    $scope.modal.hide();
    updateValue();
  };
  $scope.close = closeModal;

  $scope.$on('$destroy', function () {
    $scope.modal.remove();
  });
  $scope.$on('modal.hidden', function () {
    console.log("SubFormCtrl: Close modal");
  });
  $scope.$on('modal.removed', function () {
    console.log("SubFormCtrl: Modal removed");
  });

  function gatherValues() {
    var values = {};
    if (!$scope.form) {
      return {};
    }
    $scope.form.fields.forEach(function (field) {
      if ($scope.data[field.name] && $scope.data[field.name].value) {
        values[field.name] = $scope.data[field.name].value;
      }
    });
    return values;
  }

  function updateValue() {
    var values = gatherValues();
    if (Object.keys(values).length > 0) {
      $scope.data.value = true;
      return true;
    }
    $scope.data.value = false;
    return false;
  }

}]);
