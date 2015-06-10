'use strict';
angular.module('forms')
.directive('fieldTextEdit', function () {
  return {
    templateUrl: 'forms/templates/field-text-edit-field.html',
    restrict: 'EA',
    link: function postLink (scope, element, attrs) {
      console.log("Yo! Check a fieldTextEdit");
    },
    scope: {
      label: '=label',
      value: '=value',
    },
    controller: 'FieldTextEditCtrl',
  };
});
