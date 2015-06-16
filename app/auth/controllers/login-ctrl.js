'use strict';
angular.module('auth')
.controller('LoginCtrl', ['$scope', '$state', 'Auth', '$ionicLoading', function ($scope, $state, Auth, $ionicLoading) {
  console.log('Hello from your Controller: LoginCtrl in module auth:. This is your controller:', this);

  $scope.username = "";
  $scope.password = "";

  $scope.login = function () {
    $scope.error = false;
    if ($scope.username == "" || $scope.password == "") {
      $scope.error = "Enter a username and password";
      return false;
    }
    $ionicLoading.show({
      template: 'Authorizing',
      hideOnStateChange: true,
    });
    var promise = Auth.login($scope.username, $scope.password)
    promise.then(function () {
      console.log("LoginCtrl: Successful login");
      $state.go('patients.directory'); // Should put this in config
    }).catch(function (err) {
      console.log("LoginCtrl: Bad Login or something");
      if (err.message) {
        $scope.error = err.message;
      } else {
        $scope.error = "Authentication error. Sorry."
      }
      $ionicLoading.hide();
    });
  }
}]);
