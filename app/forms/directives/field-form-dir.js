'use strict';
angular.module('forms')
.directive('fieldInput', function () {
  return {
    templateUrl: 'forms/templates/input-base.html',
    restrict: 'A',
    link: function postLink (scope, element, attrs) {
      var type = scope.field.type;
      console.log("fieldFormDirective: Yo! Check this " + type);
      if (!scope.data) {
        console.log("fieldFormDirective: No data");
      }
      scope.contentUrl = 'forms/templates/input-' + type + '.html';
    },
    scope: {
      field: '=field',
      data: '=data'
    }
  };
});
