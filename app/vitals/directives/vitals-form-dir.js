'use strict';
angular.module('vitals')
.directive('vitalsForm', function () {
  return {
    templateUrl: 'vitals/templates/vitals-form-base.html',
    link: function (scope, element, attrs) {
      if (!scope.type) {
        scope.type = 'placeholder';
      }
      scope.contentUrl = 'vitals/templates/vitals-form-' + scope.type + '.html';
      scope.$watch('type', function (v) {
        scope.contentUrl = 'vitals/templates/vitals-form-' + v + '.html';
      });
    },
    restrict: 'E',
    scope:{
      type:'=type',
      record:'=record',
      save: '&onSave',
      close: '&onClose',
    },
  };
});
