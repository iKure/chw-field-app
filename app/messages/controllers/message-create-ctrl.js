'use strict';
angular.module('messages')
.controller('MessageCreateCtrl', ['$scope', 'Messages', function ($scope, Messages) {

  console.log('Hello from your Controller: MessageCreateCtrl in module messages:. This is your controller:', this);
  
  function save () {
    Messages.save($scope.message).then(function (message) {
      $scope.message = {};
      if ($scope.messages) {
        $scope.messages.push(message);
      }
    });
  }
  $scope.save = save;
}]);
