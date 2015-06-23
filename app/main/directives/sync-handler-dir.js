'use strict';
angular.module('patients')
.directive('syncHandler', function () {
  return {
    transclude: true,
    template: '<div class="something" ng-class="{active:syncActive}" ng-click="sync()" ng-transclude></div>',
    restrict: 'EA',
    link: function postLink (scope, element, attrs) {
      console.log("Yo! SyncHandler Directive");
    },
    controller:['$scope', '$ionicLoading', 'Sync', function ($scope, $ionicLoading, Sync) {
      $scope.sync = function () {
        Sync.sync();
      }
      $scope.$on('sync.active', function () {
        console.log('SyncHandlerDir: Got sync active!');
        $scope.syncActive = true;
      });
      $scope.$on('sync.paused', function () {
        $scope.syncActive = false;
      });
    }],
  };
});
