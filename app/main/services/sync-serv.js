'use strict';
angular.module('main')
.service('Sync', ['$rootScope', 'Clinic', 'Messages', 'Forms', function ($rootScope, Clinic, Messages, Forms) {
  console.log('Hello from your Service: Sync in module main');
  var service = {};

  var syncState = {};
  function updateState(key, state) {
    console.log("SyncService: Update sync state " + key);
    syncState[key] = state;
    service.active = false;
    Object.keys(syncState).forEach(function (key) {
      if (syncState[key]) {
        service.active = true;
      }
    });
    if (service.active) {
      $rootScope.$broadcast('sync.active');
    } else {
      $rootScope.$broadcast('sync.paused');
    }
  }

  $rootScope.$on('clinic.sync.start', function () {
    updateState('clinic', true);
  });
  $rootScope.$on('clinic.sync.stop', function () {
    updateState('clinic', false);
  });

  $rootScope.$on('messages.sync.start', function () {
    updateState('messages', true);
  });
  $rootScope.$on('messages.sync.stop', function () {
    updateState('messages', false);
  });

  $rootScope.$on('forms.sync.start', function () {
    updateState('forms', true);
  });
  $rootScope.$on('forms.sync.stop', function () {
    updateState('forms', false);
  });

  service.sync = function () {
    console.log('SyncService: Try sync');
    Clinic.sync('foo');
    Messages.sync();
    Forms.sync();
  }

  return service;
}]);
