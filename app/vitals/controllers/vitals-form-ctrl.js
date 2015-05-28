'use strict';
angular.module('vitals')
.controller('VitalsFormCtrl', [ '$scope', '$state', '$stateParams', 'Vitals', function ($scope, $state, $stateParams, Vitals) {
  console.log('Hello from your Controller: VitalsFormCtrl in module vitals:. This is your controller:', this);
  var ctrl = this;
  ctrl.type = $stateParams.type;

  ctrl.current = {};
  if ($stateParams.vitals_id) {
    Vitals.setCurrent($stateParams.vitals_id);
  }

  this.saveRecord = function (record) {
    if (!record.field_type) {
      record.field_type = ctrl.type;
    }
    Vitals.save(record);
  }

  $scope.$on('vitals.change', function () {
    ctrl.current = Vitals.getCurrent();
    $scope.$apply();
  });
}]);
