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
  function isEmpty(obj) {
    for (var prop in obj) {
      if (obj.hasOwnProperty(prop)) {
        return false;
      }
    }
    return true;
  }
  function save() {
    if (!$scope.field) {
      $scope.field = {};
    }
    Object.keys($scope.data).forEach(function (key) {
      if (isEmpty($scope.data[key])) {
        delete $scope.data[key];
      }
    });
    $scope.field.form_id = $scope.form._id;
    $scope.field.data = $scope.data;
    delete $scope.form;
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
