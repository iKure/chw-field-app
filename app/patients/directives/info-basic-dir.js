'use strict';
angular.module('patients')
.directive('patinfo', ['Patients', function ($scope, Patients) {
	
  return {
    scope:{
      patient: '=patient',
      save: '&onSave',
      close: '&onClose',
    },
    templateUrl: 'patients/templates/information-basic.html',
    restrict: 'E'
  };
}]);
