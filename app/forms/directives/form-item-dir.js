'use strict';
angular.module('forms')
.directive('formItem', function () {
  return {
    templateUrl: 'forms/templates/form-item-view.html',
    restrict: 'E',
    link: function postLink (scope, element, attrs) {
      console.log('Yo! This is a form-item');
    },
    scope:{
      data: '=data',
    }
  };
});
