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
      templateUrl: 'messages/templates/list.html',
      controller: ['$scope', 'threads', function ($scope, threads) {
        $scope.threads = threads;
      }],
      resolve: {
        threads: ['Messages', function (Messages) {
          return Messages.list();
        }]
      }
    })
    .state('message_thread', {
      url: '/messages/:thread_id',
      templateUrl: 'messages/templates/list.html',
      controller: ['$scope', 'thread', function ($scope, thread) {
        $scope.thread = thread;
        $scope.thread_id = thread._id;
        $scope.messages = thread.messages;
      }],
      resolve: {
        thread: ['$stateParams', 'Messages', function ($stateParams, Messages) {
          return Messages.get($stateParams.thread_id);
        }],
      }
    });
  // TODO: do your thing
});
