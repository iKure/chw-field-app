'use strict';
angular.module('vitals', [
  'ionic',
  'ngCordova',
  'ui.router',
  // TODO: load other modules selected during generation
])
.config(function ($stateProvider) {

  console.log('Allo! Allo from your module: ' + 'vitals');

  // some basic routing
  $stateProvider
    .state('vitals', {
      url:'/vitals',
      templateUrl: 'vitals/templates/vitals-list.html',
      controller: 'VitalsCtrl as vitals',
    })
    .state('vitals-new', {
      url: '/vitals/new',
      templateUrl: 'vitals/templates/vitals-edit.html',
    })
    .state('vitals-new.field', {
      url: '/:type',
      views: {
        'menuContent':{
          template: '<vitals-form type="vitals.type" record="vitals.current" on-save="vitals.saveRecord(record)" />',
          controller: 'VitalsFormCtrl as vitals',
        }
      }
    });
});
