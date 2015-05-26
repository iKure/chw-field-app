'use strict';
angular.module('patients')
.controller('VitalsAddCtrl', [ '$scope', '$state', '$stateParams', 'Patients', 'Vitals', function ($scope, $state, $stateParams, Patients, Vitals) {
  console.log('Hello from your Controller: VitalsCtrl in module patients:. This is your controller:', this);
  var ctrl = this;
  ctrl.records = Vitals.records;
  ctrl.current = {};
  ctrl.currentSet = {};

  this.patient = Patients.current;

  $scope.$on('vitals.update', function () {
    ctrl.records = Vitals.records;
    $scope.$apply();
  });
  $scope.$on('vitals.current.update', function () {
    ctrl.current = Vitals.current;
    if (ctrl.current.type) {
      ctrl.currentSet[ctrl.current.type] = ctrl.current._id;
    }
    $scope.$apply();
  });

  function isSaved (type) {
    if (ctrl.currentSet[type]) {
      return true;
    }
    return false;
  }
  this.isSaved = isSaved;

  function isActive(type) {
    if (ctrl.type == type) {
      return true;
    }
    return false;
  }
  this.isActive = isActive;

}]);
