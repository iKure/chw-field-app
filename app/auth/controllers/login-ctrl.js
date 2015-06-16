'use strict';
angular.module('auth')
.controller('LoginCtrl', ['$scope', '$state', 'Auth', function ($scope, $state, Auth) {
  console.log('Hello from your Controller: LoginCtrl in module auth:. This is your controller:', this);

  $scope.username = "";
  $scope.password = "";

  $scope.login = function () {
    Auth.login($scope.username, $scope.password).then(function () {
      console.log("LoginCtrl: Successful login");
      $state.go('patients.directory'); // Should put this in config
    }).catch(function (err) {
      console.log("LoginCtrl: Bad Login or something");
      $scope.error = true;
    });
  }
}]);
