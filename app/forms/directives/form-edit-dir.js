'use strict';
angular.module('forms')
.directive('formEdit', function () {
  return {
    templateUrl: 'forms/templates/form-fields-list.html',
    restrict: 'EA',
    link: function postLink (scope, element, attrs) {
      console.log("Yo! FormEditDirective.");
    },
    scope: {
      form: '=?form',
      formType: '=?formType',
      data: '=?data',
      fieldId: '=?fieldId',
      close: '&onClose',
    },
    controller: 'FormCtrl',
  };
});
