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
    console.log('FormCreateCtrl: Creating new fields');
    Fields.save({}, doc).then(function (response) {
      console.log('FormCreateCtrl: Forwarding to new field: ' + response.id);
      $state.go('forms.field', {
        field_id: response.id
      });
    });
  }).catch( function (err) {
    console.log('FormCreateCtrl: Could not find form template type: ' + $stateParams.type);
    $state.go('forms.list');
  });

}]);
