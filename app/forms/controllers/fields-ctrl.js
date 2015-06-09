'use strict';
angular.module('forms')
.controller('FieldCtrl', ['$scope', 'Fields', 'Forms', function ($scope, Fields) {

  console.log('Hello from your Controller: FieldCtrl in module forms:. This is your controller:', this);

  $scope.$on('field.save', function (event, field_id) {
    console.log("FieldCtrl: Caught field save event — " + field_id + ' -> ' + $scope.field.name);
    $scope.data.parent = field_id;
    save();
  });

  function save () {
    console.log('FieldCtrl: Saving field: ' + $scope.data._id);
    $scope.$emit('field.saving', $scope.field.name);
    Fields.save($scope.data).then(function (response) {
      console.log('FieldCtrl: Saved field: ' + response.id);
      $scope.data._id = response.id;
      $scope.data._rev = response.rev;
      $scope.$emit('field.saved', $scope.field.name);
    });
  }
  $scope.save = save;

  if($scope.field.include){
    $scope.data.include = $scope.field.include;
  }

}]);
