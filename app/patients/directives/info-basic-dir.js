'use strict';
angular.module('patients')
.directive('patinfo', ['Patients', function ($scope, Patients) {
  var form = this;

  return {
    scope:{
      patient: '=patient',
    },
    templateUrl: 'patients/templates/information-basic.html',
    restrict: 'E'
  };
}]);
