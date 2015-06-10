'use strict';
angular.module('forms')
.controller('FormCtrl', ['$scope', 'Forms', 'Fields', function ($scope, Forms, Fields) {

  console.log('Hello from your Controller: FormCtrl in module forms:. This is your controller:', this);

  $scope.form = {};
  $scope.data = {};

  if (!$scope.close) {
    $scope.close = function () {
      console.log("FormCtrl: Default close function");
    }
  }

  if ($scope.fieldId) {
    getField($scope.fieldId);
  }else if ($scope.formType) {
    getForm($scope.formType);
  }

  function getForm (type) {
    console.log('FormCtrl: Getting form type: ' + type);
    var promise = Forms.get(type);
    promise.then( function (doc) {
      console.log('FormCtrl: Got form type: ' + doc._id);
      $scope.form = doc;
      $scope.data.form_id = doc._id;
      $scope.apply();
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
    }).catch(function (err) {
      console.log('FormCtrl: Could not find form id: ' + id);
    });
  }

}]);
