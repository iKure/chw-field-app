'use strict';
angular.module('vitals')
.directive('vitalsView', function () {
  return {
    templateUrl: 'vitals/templates/vitals-view-base.html',
    restrict: 'E',
    scope: {
    	record: '=record',
    },
  };
});
