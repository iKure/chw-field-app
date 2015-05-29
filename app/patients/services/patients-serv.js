'use strict';
angular.module('patients')
.service('Patients', [
  '$rootScope',
  'Config',
  'SharedState',
  function ($rootScope, Config, SharedState) {
    console.log('Hello from your Service: Patients in module patients');

    var service = SharedState.makeService('patient');

    $rootScope.$on('$stateChangeStart', function (event, toState) {
      if (toState.name.indexOf('patient_directory') >= 0) {
        service.clearCurrent();
        service.updateRecords();
      }
    });
    service.updateRecords();

    return service;
  }
]);
