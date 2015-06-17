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
    controller:['$scope', 'Patients', function ($scope, Patients) {
      $scope.sync = function () {
        Patients.startReplication();
      }
    }],
  };
});
