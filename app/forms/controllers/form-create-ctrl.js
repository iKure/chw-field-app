'use strict';
angular.module('forms')
.controller('FormCreateCtrl', ['$scope', '$state', '$stateParams', 'Forms', function ($scope, $state, $stateParams, Forms) {

  console.log('Hello from your Controller: FormCreateCtrl in module forms:. This is your controller:', this);
  if (!$stateParams.type) {
    $state.go('forms.list');
  }
  console.log('FormCreateCtrl: Create new form type: ' + $stateParams.type);

  var promise = Forms.get($stateParams.type);
  promise.then( function (doc) {
    console.log('FormCreateCtrl: Creating new fields');
  }).catch( function (err) {
    console.log('FormCreateCtrl: Could not find form template type: ' + $stateParams.type);
    $state.go('forms.list');
  });

}]);
