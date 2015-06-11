'use strict';
angular.module('forms')
.controller('FieldSummaryCtrl', ['$scope', '$stateParams', 'Fields', 'Forms', function ($scope, $stateParams, Fields, Forms) {

  console.log('Hello from your Controller: FieldSummaryCtrl in module forms:. This is your controller:', this);

  $scope.form = {};
  $scope.data = {};

  getField($stateParams.field_id);

  function getForm (type) {
    console.log('FormCtrl: Getting form type: ' + type);
    var promise = Forms.get(type);
    promise.then( function (doc) {
      console.log('FormCtrl: Got form type: ' + doc._id);
      $scope.form = doc;
      $scope.data.form_id = doc._id;
    }).catch( function (err) {
      console.log('FormCtrl: Could not find form template type: ' + type);
      // not sure what the error state should be....
    });
  }

  function getField (id) {
    console.log('FieldSummaryCtrl: Getting field id: ' + id);
    var promise = Fields.get(id).then(function (doc) {
      console.log('FieldSummaryCtrl: Got field id: ' + id);
      $scope.data = doc;
      if (doc.form_id) {
        getForm(doc.form_id);
      }
    }).catch(function (err) {
      console.log('FieldSummaryCtrl: Could not find field id: ' + id);
    });
  }
}]);
