'use strict';
angular.module('forms')
.controller('FormsDirectoryCtrl', ['$scope', 'Forms', function ($scope, Forms) {

  console.log('Hello from your Controller: FormsDirectoryCtrl in module forms:. This is your controller:', this);

  $scope.records = [];
  Forms.all().then(function (docs) {
    $scope.records = docs;
    console.log('FormsDirectoryCtrl: Got ' + $scope.records.length + ' records');
  });
}]);
