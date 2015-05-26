'use strict';
angular.module('patients')
.directive('vitalsForm', function () {
  return {
    templateUrl: 'patients/templates/vitals-form-base.html',
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
