'use strict';
angular.module('forms')
.directive('fieldForm', function () {
  return {
    templateUrl: 'forms/templates/field-form.html',
    restrict: 'A',
    link: function postLink (scope, element, attrs) {
      var type = scope.field.type;
      if (!scope.data) {
        scope.data = {};
      }
      console.log("fieldFormDirective: Yo! Check this " + type);
      if (!scope.data) {
        console.log("fieldFormDirective: No data");
      }
      scope.contentUrl = 'forms/templates/field-' + type + '-form.html';
    },
    scope: {
      save: '&onSave',
      update: '&onUpdate',
      close: '&onClose',
      field_id: '=fieldId',
      field: '=field',
      data: '=data'
    },
    controller: 'FieldCtrl',
  };
});
