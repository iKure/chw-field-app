'use strict';
angular.module('cases')
.service('Cases', [ '$rootScope', 'SharedState', function ($rootScope, SharedState) {
  console.log('Hello from your Service: Cases in module cases');
  var service = SharedState.makeService('case');

  $rootScope.$on('$stateChangeStart', function (event, toState, toParams) {
    if (!toParams.case_id) {
      return false;
    }
    service.setCurrent(toParams.case_id);
  });

  $rootScope.$on('$stateChangeStart', function (event, toState) {
    if (toState.name.indexOf('cases.list') >= 0) {
      service.clearCurrent();
      service.updateRecords();
    }
  });

  return service;
}]);
