'use strict';
angular.module('messages', [
  'ionic',
  'ngCordova',
  'ui.router',
  // TODO: load other modules selected during generation
])
.config(function ($stateProvider) {

  console.log('Allo! Allo from your module: ' + 'messages');

  // some basic routing
  $stateProvider
    .state('messages', {
      url: '/messages',
      templateUrl: 'messages/templates/start.html',
      controller: 'StartCtrl as start',
      resolve: {
        messages: ['Messages', function (Messages) {
          return Messages.list();
        }]
      }
    });
  // TODO: do your thing
});
