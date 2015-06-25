'use strict';
angular.module('messages')
.controller('MessageCreateCtrl', ['$scope', 'Messages', function ($scope, Messages) {

  console.log('Hello from your Controller: MessageCreateCtrl in module messages:. This is your controller:', this);

  function save () {
    if ($scope.thread_id) {
      $scope.message.thread_id = $scope.thread_id;
    }
    $scope.$root.$broadcast('message.save', $scope.message);
    Messages.save($scope.message).then(function (message) {
      $scope.message = {};
      if ($scope.create) {
        $scope.create({
          message: message,
        });
      }
    });
  }
  $scope.save = save;
}]);
