'use strict';
angular.module('forms')
.directive('subForm', ['$ionicBackdrop', '$q', '$compile', function ($ionicBackdrop, $q, $compile) {
  return {
    restrict: 'E',
    transclude: true,
    templateUrl: 'forms/templates/sub-form.html',
    link: function (scope, element, attr) {
      console.log('SubForm: Yo!');
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
