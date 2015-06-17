'use strict';
angular.module('forms')
.directive('fieldRepeatable', function () {
  return {
    templateUrl: 'forms/templates/field-repeatable-dir.html',
    restrict: 'E',
    link: function postLink (scope, element, attrs) {
      console.log("Yo! Field Repeatable Directive");
    },
    controller: "FieldRepeatableCtrl",
    scope: {
      data: '=data',
      label: '=label',
      forms: '=forms',
    }
  };
});
