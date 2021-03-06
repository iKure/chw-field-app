'use strict';
angular.module('patients') // This is not right, but its where I want things to go...
.directive('networkStatus', function () {
  return {
    restrict: 'A',
    link: function postLink (scope, element, attrs) {
      console.log("NetworkStatusDir: link & update online color");
      if (scope.online) {
        element.addClass('tabs-positive');
        element.removeClass('tabs-dark');
      } else {
        element.removeClass('tabs-positive');
        element.addClass('tabs-dark');
      }
    },
    controller: ['$scope', '$cordovaNetwork', function ($scope, $cordovaNetwork) {
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
