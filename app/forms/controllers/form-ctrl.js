'use strict';
angular.module('forms')
.controller('FormCtrl', ['$scope', '$state', '$stateParams', 'Forms', 'Fields', function ($scope, $state, $stateParams, Forms, Fields) {

  console.log('Hello from your Controller: FormCreateCtrl in module forms:. This is your controller:', this);
  if (!$stateParams.type) {
    $state.go('forms.list');
  }
  console.log('FormCreateCtrl: Create new form type: ' + $stateParams.type);

  var promise = Forms.get($stateParams.type);
  promise.then( function (doc) {
    console.log('FormCreateCtrl: Got form ' + doc._id);
    $scope.form = doc;
    $scope.data = {};
    $scope.$apply(); // This shouldn't be here
  }).catch( function (err) {
    console.log('FormCreateCtrl: Could not find form template type: ' + $stateParams.type);
    $state.go('forms.list');
  });

  function close () {
    console.log('FormCreateCtrl: Close');
    if ($scope.data._id) {
      $state.go('forms.field', {field_id: $scope.data._id});
    } else {
      $state.go('forms.list');
    }
  }
  $scope.close = close;
}]);
