'use strict';
angular.module('forms')
.directive('fieldHelpText', function () {
  return {
    templateUrl: 'forms/templates/field-help-text.html',
    restrict: 'E',
    scope: {
      text: '=text',
      titile: '=title',
    }
  };
});
