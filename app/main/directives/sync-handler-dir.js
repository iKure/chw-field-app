'use strict';
angular.module('patients')
.directive('syncHandler', function () {
  return {
    transclude: true,
    template: '<div class="something" ng-click="sync()" ng-transclude></div>',
    restrict: 'EA',
    link: function postLink (scope, element, attrs) {
      console.log("Yo! SyncHandler Directive");
    },
    controller:['$scope', 'Clinic', function ($scope, Clinic) {
      $scope.sync = function () {
        Clinic.sync('foo');
      }
    }],
  };
});
