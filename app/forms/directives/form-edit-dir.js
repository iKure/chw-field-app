'use strict';
angular.module('forms')
.directive('fieldEdit', function () {
  return {
    templateUrl: 'forms/templates/form-fields-list.html',
    restrict: 'EA',
    link: function postLink (scope, element, attrs) {
      console.log("Yo! FormEditDirective.");
    },
    scope: {
      form: '=?form',
      initialData: '=?initialData',
      field: '=?field',
      close: '&onClose',
    },
    controller: 'FieldEditCtrl',
  };
});
