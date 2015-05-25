'use strict';
angular.module('patients')
.directive('patinfo', function () {
  return {
    templateUrl: 'patients/templates/information-basic.html',
    restrict: 'E'
  };
});
