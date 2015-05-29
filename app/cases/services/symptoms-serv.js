'use strict';
angular.module('cases')
.service('Symptoms', ['$rootScope', 'SharedState', function ($rootScope, SharedState) {
  console.log('Hello from your Service: Symptoms in module cases');
  var service = SharedState.makeService('symptom');

  $rootScope.$on('$stateChangeStart', function (event, toState, toParams) {
    if (!toParams.symptom_id) {
      service.clearCurrent();
      return false;
    }
    service.setCurrent(toParams.symptom_id);
  });

  $rootScope.$on('case.change', function () {
    service.updateRecords();
  });

  return service;
}]);
