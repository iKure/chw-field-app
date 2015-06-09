'use strict';
angular.module('forms')
.directive('fieldList', function () {
  return {
    templateUrl: 'forms/templates/fields-list.html',
    restrict: 'A',
    link: function postLink (scope, element, attrs) {
      //element.text('this is the myDirective directive', attrs);
    },
    scope: {
      data: '=data',
      fields: '=fields',
      save: '&onSave',
      close: '&onClose',
    }
  };
});
