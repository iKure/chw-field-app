'use strict';
angular.module('cases', [
  'ionic',
  'ngCordova',
  'ui.router',
  'shared',
  // TODO: load other modules selected during generation
])
.config(function ($stateProvider) {

  console.log('Allo! Allo from your module: ' + 'cases');

  // some basic routing
  $stateProvider
    .state('cases', {
      url: '/cases',
      templateUrl: 'cases/templates/start.html',
      controller: 'StartCtrl as start'
    });
  // TODO: do your thing
});
