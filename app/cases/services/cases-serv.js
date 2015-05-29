'use strict';
angular.module('cases')
.service('Cases', [ '$rootScope', 'Shared', function ($rootScope, Shared) {
  console.log('Hello from your Service: Cases in module cases');
  var service = Shared.makeService('case');

  return service;
}]);
