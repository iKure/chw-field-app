'use strict';
angular.module('forms')
.directive('fieldForm', function () {
  return {
    templateUrl: 'forms/templates/field-form.html',
    restrict: 'A',
    link: function postLink (scope, element, attrs) {
      console.log("fieldFormDirective: Yo!");
      scope.contentUrl = 'forms/templates/field-' + scope.field.type + '-form.html';
    },
    scope: {
      update: '&onUpdate',
      close: '&onClose',
      field: '=field',
      data: '=data'
    }
  };
});
