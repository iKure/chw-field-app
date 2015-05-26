'use strict';
angular.module('patients')
.directive('vitalsForm', function () {
  return {
    template: '<div ng-include="contentUrl"></div>',
    link: function (scope, element, attrs) {
      if (!scope.type) {
        scope.type = 'placeholder';
      }
      scope.contentUrl = 'patients/templates/vitals-form-' + scope.type + '.html';
    },
    restrict: 'E',
    scope:{
      type:'=type',
    },
  };
});
