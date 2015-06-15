'use strict';
angular.module('messages')
.controller('MessageThreadCtrl', ['$scope', 'Messages', function ($scope, Messages) {

  console.log('Hello from your Controller: MessageThreadCtrl in module messages:. This is your controller:', this);

  function updateThread () {
    Messages.list({
      thread_id: $scope.thread_id,
    }).then(function (results) {
      $scope.messages = results;
    });
  }

  if (!$scope.messages || $scope.messages.length < 1) {
    updateThread();
  }
}]);
