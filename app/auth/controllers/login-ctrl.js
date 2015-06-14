'use strict';
angular.module('auth')
.controller('LoginCtrl', ['$scope', 'Auth', function ($scope, Auth) {
  console.log('Hello from your Controller: LoginCtrl in module auth:. This is your controller:', this);

  $scope.login = function () {
  	Auth.login($scope.username, $scope.password).then(function () {
  		$scope.go('/');
  	}).catch(function (err) {
  		$scope.error = true;
  	});
  }
}]);
