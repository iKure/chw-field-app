'use strict';
angular.module('forms')
.controller('FormCtrl', ['$scope', '$state', '$stateParams', 'Forms', 'Fields', function ($scope, $state, $stateParams, Forms, Fields) {

  console.log('Hello from your Controller: FormCtrl in module forms:. This is your controller:', this);
  if ($stateParams.field_id) {
    getField($stateParams.field_id);
  }else if ($stateParams.type) {
    getForm($stateParams.type);
  }else {
    $state.go('forms.list');
  }

  function getForm (type) {
    console.log('FormCtrl: Getting form type: ' + type);
    var promise = Forms.get(type);
    promise.then( function (doc) {
      console.log('FormCtrl: Got form type: ' + doc._id);
      $scope.form = doc;
      $scope.$apply(); // This shouldn't be here
    }).catch( function (err) {
      console.log('FormCtrl: Could not find form template type: ' + type);
      // not sure what the error state should be....
    });
  }

  function getField (id) {
    console.log('FormCtrl: Getting form id: ' + id);
    var promise = Fields.get(id).then(function (doc) {
      console.log('FormCtrl: Got form id: ' + id);
      $scope.data = doc;
      if (doc.form_id) {
        getForm(doc.form_id);
      }
      $scope.$apply();
    }).catch(function (err) {
      console.log('FormCtrl: Could not find form id: ' + id);
    });
  }

  function close () {
    console.log('FormCtrl: Close');
    if ($scope.data._id) {
      $state.go('forms.field', {field_id: $scope.data._id});
    } else {
      $state.go('forms.list');
    }
  }
  $scope.close = close;
}]);
