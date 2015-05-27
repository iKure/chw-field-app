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
      url: '/vitals',
      templateUrl: 'vitals/templates/start.html',
      controller: 'StartCtrl as start'
    });
  // TODO: do your thing
});
