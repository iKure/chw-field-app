'use strict';
angular.module('messages')
.controller('MessageThreadCtrl', ['$scope', '$ionicScrollDelegate', 'Messages', function ($scope, $ionicScrollDelegate, Messages) {

  console.log('Hello from your Controller: MessageThreadCtrl in module messages:. This is your controller:', this);

  function updateThread () {
    console.log("MessageThreadCtrl: Updating thread");
    if (!$scope.thread_id) {
      console.log("MessageThreadCtrl: No thread_id, can't update");
      return false;
    }
    Messages.get($scope.thread_id).then(function (thread) {
      $scope.thread = thread;
      $scope.messages = thread.messages;
      $ionicScrollDelegate.resize();
    });
  }

  $scope.$on('messages.update', updateThread);

  function addMessage (message) {
    updateThread();
  }
  $scope.addMessage = addMessage;

  if (!$scope.messages || $scope.messages.length < 1) {
    updateThread();
  }
}]);
