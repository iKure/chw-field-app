'use strict';
angular.module('forms')
.controller('FieldCtrl', ['$scope', '$ionicPopover', 'Fields', function ($scope, $ionicPopover, Fields) {

  console.log('Hello from your Controller: FieldCtrl in module forms:. This is your controller:', this);

  $scope.$on('field.save', function (event, field_id) {
    console.log("FieldCtrl: Caught field save event — " + field_id + ' -> ' + $scope.field.name);
    $scope.data.parent = field_id;
    save();
  });

  function save () {
    console.log('FieldCtrl: Saving field: ' + $scope.field.name + '(' + $scope.data._id + ')');
    $scope.$emit('field.saving', $scope.field.name);
    Fields.save($scope.data).then(function (response) {
      console.log('FieldCtrl: Saved field: ' + $scope.field.name + '(' + response.id + ')');
      $scope.data._id = response.id;
      $scope.data._rev = response.rev;
      $scope.$emit('field.saved', $scope.field.name);
    }).catch(function (err) {
      console.log('FieldCtrl: Error saving field: ' + $scope.field.name);
      $scope.$emit('field.saved', $scope.field.name); // Just to make the thing not hang
    });
  }
  $scope.save = save;

  if (!$scope.data) {
    $scope.data = {};
  }

  if ($scope.field.include) {
    if (!$scope.data) {
      $scope.data = {};
    }
    $scope.data.include = $scope.field.include;
  }

  if ($scope.field.units) {
    $scope.data.units = $scope.field.units[0].value;
  }

}]);
