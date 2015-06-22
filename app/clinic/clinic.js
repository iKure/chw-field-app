'use strict';
angular.module('clinic', [
  'ionic',
  'ngCordova',
  'ui.router',
  // TODO: load other modules selected during generation
])
.config(function ($stateProvider) {

  console.log('Allo! Allo from your module: ' + 'clinic');

  // some basic routing
  $stateProvider
    .state('clinic', {
      url: '/clinic',
      templateUrl: 'clinic/templates/start.html',
    });
  // TODO: do your thing
});
