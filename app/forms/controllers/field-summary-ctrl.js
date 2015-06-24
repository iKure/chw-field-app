'use strict';
angular.module('forms')
.controller('FieldSummaryCtrl', ['$scope', '$state', 'Fields', 'field', function ($scope, $state, Fields, field) {

  console.log('Hello from your Controller: FieldSummaryCtrl in module forms:. This is your controller:', this);
  if (!field) {
    $state.go('^.list');
    return false;
  }
  $scope.field = field;
  $scope.form = field.form;

  function archive () {
    console.log("FieldSummaryCtrl: ARCHIVE! " + $scope.field._id);
    // show confirm
    // show loading
    Fields.toggleArchive($scope.field._id).then(function (response) {
      Fields.get(response.id).then(function (doc) {
        $scope.field = doc;
        console.log("FieldSummaryCtrl: Finished archiving field " + $scope.field._id);
        // hide loading
      });
    });
  }
  $scope.archive = archive;

  $scope.$on('fields.update', function () {
    Fields.get($scope.data._id).then(function (doc) {
      $scope.field = doc;
      $scope.form = doc.form;
    });
  });
}]);
