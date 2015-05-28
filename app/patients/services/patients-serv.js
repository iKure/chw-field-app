'use strict';
angular.module('patients')
.service('Patients', [
  '$rootScope',
  'Config',
  'SharedState',
  function ($rootScope, Config, SharedState) {
    console.log('Hello from your Service: Patients in module patients');

    var service = SharedState.makeService('patient');

    service.updateRecords();

    return service;
  }
]);
