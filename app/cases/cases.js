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
      templateUrl: 'cases/templates/frame.html',
    })
    .state('cases.list', {
      url: '/list',
      views: {
        'mainContent': {
          templateUrl: 'cases/templates/list.html',
        }
      }
    });
  // TODO: do your thing
});
