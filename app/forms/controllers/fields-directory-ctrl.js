'use strict';
angular.module('forms')
.controller('FieldsDirectoryCtrl', ['$scope', 'Fields', function ($scope, Fields) {

  console.log('Hello from your Controller: FieldsDirectoryCtrl in module forms:. This is your controller:', this);

  $scope.records = [];
  Fields.all().then(function (results) {
    console.log('FieldsDirectoryCtrl: Got ' + results.length + ' records');
    $scope.records = results;
  });
}]);
