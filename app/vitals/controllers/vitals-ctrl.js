'use strict';
angular.module('vitals')
.controller('VitalsCtrl', [ '$scope', '$state', '$stateParams', 'Patients', 'Vitals', function ($scope, $state, $stateParams, Patients, Vitals) {
  console.log('Hello from your Controller: VitalsCtrl in module vitals:. This is your controller:', this);
  var ctrl = this;
  ctrl.records = Vitals.get();

  $scope.$on('vitals.update', function () {
    ctrl.records = Vitals.get();
    $scope.$apply();
  });
}]);
