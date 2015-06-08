'use strict';
angular.module('forms')
.controller('FieldsCtrl', ['$scope', '$state', '$stateParams', 'Fields', 'Forms', function ($scope, $state, $stateParams, Fields, Forms) {

  console.log('Hello from your Controller: FieldsCtrl in module forms:. This is your controller:', this);

  function redirect (reason) {
    if (!reason) {
      reason = "??";
    }
    console.log('FieldsCtrl: ' + reason + ' —> redirecting');
    $state.go('forms.list');
  }
  if (!$stateParams.field_id) {
    redirect('No field_id');
  }

  $scope.data = {};
  $scope.fields = [];

  Fields.get($stateParams.field_id).then(function (doc) {
    console.log('FieldsCtrl: Got field data: ' + doc._id);
    $scope.data = doc;
    console.log('FieldsCtrl: Getting form: ' + doc.form_id);
    Forms.get(doc.form_id).then(function (doc) {
      console.log('FieldsCtrl: Got form structure: ' + doc._id);
      $scope.fields = doc.fields;
      $scope.$apply();
    });
  });

  function update (key, value) {
    $scope.data[key] = value;
  }
  $scope.update = update;

  function save () {
    console.log('FieldsCtrl: Saving field: ' + $scope.data._id);
    Fields.save($scope.data).then(function (response) {
      console.log('FieldsCtrl: Saved field: ' + response.id);
      $scope.data._rev = response.rev;
    });
  }
  $scope.save = save;

}]);
