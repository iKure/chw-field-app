'use strict';
angular.module('vitals')
.service('Vitals', [ '$rootScope', 'Config', 'SharedState', function ($rootScope, Config, SharedState) {
  console.log('Hello from your Service: Vitals in module vitals');

  var service = SharedState.makeService('vital');

  $rootScope.$on('$stateChangeStart', function (event, toState) {
    if (toState.name.indexOf('vitals.list') >= 0) {
      service.clearCurrent();
      service.updateRecords();
    }
  });

  $rootScope.$on('patient.update', function () {
    service.updateRecords();
  });
  service.updateRecords();

  return service;

}]);
