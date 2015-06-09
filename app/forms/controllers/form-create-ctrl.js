'use strict';
angular.module('forms')
.controller('FormCreateCtrl', ['$scope', '$state', '$stateParams', 'Forms', 'Fields', function ($scope, $state, $stateParams, Forms, Fields) {

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
  }).catch( function (err) {
    console.log('FormCreateCtrl: Could not find form template type: ' + $stateParams.type);
    $state.go('forms.list');
  });

  function save() {
    Fields.save($scope.data, $scope.form).then(function (response) {
      $scope.data._id = response.id;
      $scope.data._rev = response.rev;
      $scope.$broadcast('field.save', response.id);
    });
    // show loading until all saving is done.
    // redirect to fields page
  }
  $scope.save = save;
}]);
