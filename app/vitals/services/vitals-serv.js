'use strict';
angular.module('vitals')
.service('Vitals', [ '$rootScope', 'Config', 'SharedState', function ($rootScope, Config, SharedState) {
  console.log('Hello from your Service: Vitals in module vitals');

  var service = SharedState.makeService('vital');

  service['clearCurrentSet'] = function () {
    service.currentSet = {};
    return service.currentSet;
  };
  service['getCurrentSet'] = function (type) {
    if (!type) {
      return service.currentSet;
    }
    if (service.currentSet[type]) {
      return service.currentSet[type];
    }
    return false;
  };

  $rootScope.$on('patient.update', function () {
    service.updateRecords();
  });
  service.updateRecords();

  return service;

}]);
