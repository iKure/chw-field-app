'use strict';
angular.module('forms')
.controller('FieldListCtrl', ['$scope', 'Fields', function ($scope, Fields) {

  console.log('Hello from your Controller: FieldListCtrl in module forms:. This is your controller:', this);

  function save() {
    Fields.save($scope.data, $scope.form).then(function (response) {
      $scope.data._id = response.id;
      $scope.data._rev = response.rev;
      $scope.$broadcast('field.save', response.id);
    });
  }
  $scope.save = save;
}]);
