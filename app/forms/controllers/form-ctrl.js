'use strict';
angular.module('forms')
.controller('FieldEditCtrl', ['$scope', 'Fields', 'Auth', function ($scope, Fields, Auth) {
  console.log('Hello from your Controller: FieldEditCtrl in module forms:. This is your controller:', this);
  if ($scope.field && $scope.field.data) {
    $scope.data = $scope.field.data;
  }
  if (!$scope.data && $scope.initialData) {
    $scope.data = $scope.initialData;
  }
  if (!$scope.data) {
    $scope.data = {};
  }
  if (!$scope.form && $scope.field.form) {
    $scope.form = $scope.field.form;
  }
  if (Auth.currentUser.roles.length > 0) {
    $scope.data.role = Auth.currentUser.roles[0];
  }
  function save() {
    delete $scope.data.role;
    if (!$scope.field) {
      $scope.field = {};
    }
    $scope.field.form_id = $scope.form._id;
    $scope.field.data = $scope.data;
    Fields.save($scope.field).then(function (response) {
      $scope.field._id = response.id;
      $scope.field._rev = response.rev;
      if ($scope.close) {
        $scope.close();
      }
    });
  }
  $scope.save = save;
}]);
