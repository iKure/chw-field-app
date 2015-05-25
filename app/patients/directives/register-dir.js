'use strict';
angular.module('patients')
.directive('register', function () {
  return {
    templateUrl: 'patients/templates/information-basic.html',
    restrict: 'E'
  };
});
