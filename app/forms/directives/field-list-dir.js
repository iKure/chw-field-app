'use strict';
angular.module('forms')
.directive('fieldList', function () {
  return {
    templateUrl: 'forms/templates/field-edit-list.html',
    restrict: 'E',
    link: function postLink (scope, element, attrs) {
      console.log("Yo! Field List Directive!");
      if (!scope.data) {
        scope.data = {};
      }
    },
    scope: {
      data: '=data',
      inputs: '=inputs',
    }
  };
});
