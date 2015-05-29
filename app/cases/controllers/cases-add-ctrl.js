'use strict';
angular.module('cases')
.controller('CasesAddCtrl', ['$scope', 'Cases', function ($scope, Cases) {

  console.log('Hello from your Controller: CasesAddCtrl in module cases:. This is your controller:', this);

  $scope.record = {};

  function save(record){
  	Cases.save(record);
  }
  $scope.save = save;
}]);
