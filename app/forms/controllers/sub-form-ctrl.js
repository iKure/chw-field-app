'use strict';
angular.module('forms')
.controller('SubFormCtrl', ['$scope', '$ionicModal', '$state', '$stateParams', 'Forms', 'Fields', function ($scope, $ionicModal, $state, $stateParams, Forms, Fields) {

  console.log('Hello from your Controller: SubFormCtrl in module forms:. This is your controller:', this);
  Forms.get($scope.data.include).then(function (doc) {
    $scope.form = doc;
  });

  $ionicModal.fromTemplateUrl('forms/templates/sub-form.html', {
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function (modal) {
    $scope.modal = modal;
    console.log("SubFormCtrl has created a modal");
  });

  function openModal () {
    $scope.modal.show();
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
}]);
