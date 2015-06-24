'use strict';
angular.module('forms')
.directive('fieldSummary', ['RecursionHelper', function (RecursionHelper) {
  return {
    templateUrl: 'forms/templates/field-summary.html',
    restrict: 'E',
    link: function postLink (scope, element, attrs) {
      console.log("Yo! Field Summary Directive!");
    },
    scope: {
      data: '=data',
      inputs: '=?inputs',
    },
    compile: function (element) {
      return RecursionHelper.compile(element, function (scope, iElement, iAttrs, controller, transcludeFn) {
        // Define your normal link function here.
        // Alternative: instead of passing a function,
        // you can also pass an object with
        // a 'pre'- and 'post'-link function.
      });
    }
  };
}]);
