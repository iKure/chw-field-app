'use strict';
angular.module('forms')
.directive('fieldInput', ['$compile', '$templateRequest', function ($compile, $templateRequest) {
  return {
    restrict: 'A',
    link: function postLink (scope, element, attrs) {
      if (scope.field.type) {
        console.log("fieldFormDirective: Yo! Check this " + scope.field.type);
        $templateRequest('forms/templates/input-' + scope.field.type + '.html').then(function (html) {
          element.append($compile(html)(scope));
        });
      }
    },
    scope: {
      field: '=field',
      data: '=?data',
    },
    template: '{{data}}',
  };
}]);
