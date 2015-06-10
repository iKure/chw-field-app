'use strict';
angular.module('forms')
.directive('subForm', function () {
  return {
    restrict: 'EA',
    templateUrl: 'forms/templates/field-sub-form.html',
    link: function postLink (scope, element, attrs) {
      console.log('Yo! This is a SubForm Directive');
    },
    scope: {
      data: '=data',
      form_id: '=formId',
      label: '=label',
    },
    controller: 'SubFormCtrl',
  };
});
