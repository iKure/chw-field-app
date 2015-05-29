'use strict';
angular.module('cases')
.service('Cases', [ '$rootScope', 'SharedState', function ($rootScope, SharedState) {
  console.log('Hello from your Service: Cases in module cases');
  var service = SharedState.makeService('case');

  return service;
}]);
