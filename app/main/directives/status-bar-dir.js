'use strict';
angular.module('patients')
.directive('statusBar', function () {
  return {
    templateUrl: 'main/templates/status-bar.html',
    restrict: 'E',
    link: function postLink (scope, element, attrs) {
      console.log('Yo! Status Bar Directive');
    },
    controller: ['$scope', '$cordovaNetwork', 'Auth', function ($scope, $cordovaNetwork, Auth) {
      $scope.user = Auth.currentUser;

      $scope.lastUpdated = false;
      $scope.$on('synced', function () {
        $scope.lastUpdated = Date.now();
      })

      $scope.online = true; // Default to true if in browser;
      try {
        $scope.online = $cordovaNetwork.isOnline();
        $scope.$on('$cordovaNetwork:online', function (event, networkState) {
          console.log("NetworkStatusDir: Is online");
          $scope.online = true;
        });
        $scope.$on('$cordovaNetwork:offline', function (event, networkState) {
          $scope.online = false;
        });
      } catch (err) {
        console.log("NetworkStatusDir: Is offline");
        console.log('Error getting network information');
      }
    }],
  };
});
