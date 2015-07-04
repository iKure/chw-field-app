'use strict';
angular.module('forms')
.directive('subForm', ['$ionicBackdrop', '$q', '$compile', function ($ionicBackdrop, $q, $compile) {
  return {
    restrict: 'E',
    templateUrl: 'forms/templates/sub-form.html',
    scope: {
      label: '=label',
      inputs: '=inputs',
      data: '=data',
    },
    link: function (scope, element, attr) {
      console.log('SubForm: Yo!');
      if (!scope.data) {
        scope.data = {};
      }
      scope.$watch('showing', function (newValue) {
        if (newValue) {
          console.log("SubForm: showing!!");
          $ionicBackdrop.retain();
        } else {
          console.log("SubForm: HIDE!!");
          $ionicBackdrop.release();
        }
      });
    }
  };
}]);
