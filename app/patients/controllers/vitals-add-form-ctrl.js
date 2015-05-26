'use strict';
angular.module('patients')
.controller('VitalsAddFormCtrl', [ '$scope', '$state', '$stateParams', 'Patients', 'Vitals', function ($scope, $state, $stateParams, Patients, Vitals) {
  console.log('Hello from your Controller: VitalsAddFormCtrl in module patients:. This is your controller:', this);
  this.type = $stateParams.type;
  this.current = {};
  if (Vitals.current) {
    this.current = Vitals.current;
  }

  this.saveRecord = function (record) {
    Vitals.save(record);
  }
}]);
