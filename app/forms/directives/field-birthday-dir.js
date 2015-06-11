'use strict';
angular.module('forms')
.directive('fieldBirthday', function () {
  return {
    templateUrl: 'forms/templates/field-birthday-form-directive.html',
    restrict: 'E',
    link: function postLink (scope, element, attrs) {
      console.log("Yo! field-birthday");
    },
    controller: "FieldBirthdayCtrl",
    scope: {
      field: '=field',
      data: '=data',
    }
  };
});
