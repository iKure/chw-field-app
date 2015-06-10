'use strict';
angular.module('forms')
.controller('FormsDirectoryCtrl', ['$scope', 'Forms', function ($scope, Forms) {

  console.log('Hello from your Controller: FormsDirectoryCtrl in module forms:. This is your controller:', this);

  $scope.records = [];
  Forms.getRecords().then(function (docs) {
    $scope.records = [];
    docs.rows.forEach(function (row) {
      $scope.records.push(row.doc);
    });
    console.log('FormsDirectoryCtrl: Got ' + docs.rows.lenght + ' records');
    $scope.$apply();
  });
}]);
