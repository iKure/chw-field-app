'use strict';
angular.module('patients')
.controller('VitalsCtrl', [ '$scope', '$state', 'Patients', 'Vitals', function ($scope, $state, Patients, Vitals) {
  console.log('Hello from your Controller: VitalsCtrl in module patients:. This is your controller:', this);
  var ctrl = this;
  ctrl.records = Vitals.records;

  $scope.$on('vitals.update', function () {
    ctrl.records = Vitals.records;
    $scope.$apply();
    console.log('VitalsCtrl got vitals update' + ctrl.records);
  });

  this.saveRecord = function (record) {
    Vitals.save(record);
    $state.go('patient.vitals')
  }

}]);
