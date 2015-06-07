'use strict';
angular.module('forms')
.controller('OdkCtrl', [ '$scope', 'ODK', function ($scope, ODK) {

  console.log('Hello from your Controller: OdkCtrl in module forms:. This is your controller:', this);
  $scope.records = ODK.records;
}]);
