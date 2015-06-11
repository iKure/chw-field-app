'use strict';
angular.module('forms')
.directive('fieldTextEdit', function () {
  return {
    templateUrl: 'forms/templates/field-text-edit-field.html',
    restrict: 'EA',
    link: function postLink (scope, element, attrs) {
      console.log("Yo! Check a fieldTextEdit");
    },
    scope: {
      label: '=label',
      value: '=value',
      type: '=type',
    },
    controller: 'FieldTextEditCtrl',
  };
})
.directive ('syncFocusWith', function ($timeout, $rootScope) {
  return {
    restrict: 'A',
    scope: {
      focusValue: "=syncFocusWith"
    },
    link: function ($scope, $element, attrs) {
      $scope.$watch ("focusValue", function (currentValue, previousValue) {
        if (currentValue === true && !previousValue) {
          $element[0].focus();
        } else if (currentValue === false && previousValue) {
          $element[0].blur();
        }
      })
    }
  }
});
