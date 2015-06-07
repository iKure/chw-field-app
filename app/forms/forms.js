'use strict';
angular.module('forms', [
  'ionic',
  'ngCordova',
  'ui.router',
  // TODO: load other modules selected during generation
])
.config(function ($stateProvider) {

  console.log('Allo! Allo from your module: ' + 'forms');

  // some basic routing
  $stateProvider
    .state('forms', {
      url: '/forms',
      templateUrl: 'forms/templates/start.html',
      controller: 'StartCtrl as start'
    });
  // TODO: do your thing
});
