'use strict';
angular.module('forms')
.directive('fieldForm', function () {
  return {
    templateUrl: 'forms/templates/field-form.html',
    restrict: 'A',
    link: function postLink (scope, element, attrs) {
      console.log("fieldFormDirective: Yo! Check this " + scope.field.type);
      if (!scope.data) {
        console.log("fieldFormDirective: No data");
      }
      scope.contentUrl = 'forms/templates/field-' + scope.field.type + '-form.html';
    },
    scope: {
      update: '&onUpdate',
      close: '&onClose',
      field_id: '=fieldId',
      field: '=field',
      data: '=data'
    }
  };
});
