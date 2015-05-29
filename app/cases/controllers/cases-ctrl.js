'use strict';
angular.module('cases')
.controller('CasesCtrl', ['$scope', 'Cases', function ($scope, Cases) {

  console.log('Hello from your Controller: CasesCtrl in module cases:. This is your controller:', this);

  $scope.records = Cases.get();
  $scope.$on('cases.update', function () {
    $scope.records = Cases.get();
  });
}]);
