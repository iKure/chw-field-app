'use strict';
angular.module('patients')
.directive('patinfo', function () {
  return {
    scope:{
      patient: '=patient',
      save: '&onSave',
      close: '&onClose',
    },
    templateUrl: 'patients/templates/information-basic.html',
    restrict: 'E'
  };
});
