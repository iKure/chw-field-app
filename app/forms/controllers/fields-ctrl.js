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
    console.log('FieldsCtrl: Saving field: ' + $scope.data._id);
    Fields.save(data).then(function (response) {
      console.log('FieldsCtrl: Saved field: ' + response.id);
      $scope.data._id = response.id;
      $scope.data._rev = response.rev;
    });
  }
  $scope.save = save;

}]);
