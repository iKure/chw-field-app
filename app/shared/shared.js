'use strict';
angular.module('shared', [
  'ionic',
  'ngCordova',
  'ui.router',
  // TODO: load other modules selected during generation
])
.config(function ($stateProvider) {

  console.log('Allo! Allo from your module: ' + 'shared');

  // some basic routing
  $stateProvider
    .state('shared', {
      url: '/shared',
      templateUrl: 'shared/templates/start.html',
      controller: 'StartCtrl as start'
    });
  // TODO: do your thing
});
