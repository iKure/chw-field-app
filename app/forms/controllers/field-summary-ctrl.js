'use strict';
angular.module('forms')
.controller('FieldSummaryCtrl', ['$scope', '$stateParams', 'Fields', 'Forms', 'data', function ($scope, $stateParams, Fields, Forms, data) {

  console.log('Hello from your Controller: FieldSummaryCtrl in module forms:. This is your controller:', this);

  $scope.data = data;
  $scope.form = data.form;

  function archive () {
    console.log("FieldSummaryCtrl: ARCHIVE! " + $scope.data._id);
    // show confirm
    // show loading
    Fields.toggleArchive($scope.data._id).then(function (response) {
      Fields.get(response.id).then(function (doc) {
        $scope.data = doc;
        console.log("FieldSummaryCtrl: Finished archiving field " + $scope.data._id);
        // hide loading
      });
    });
  }
  $scope.archive = archive;
}]);
