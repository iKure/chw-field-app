'use strict';
angular.module('vitals')
.controller('VitalsAddCtrl', [ '$scope', 'Vitals', function ($scope, Vitals) {
  console.log('Hello from your Controller: VitalsCtrl in module vitals:. This is your controller:', this);
  var ctrl = this;
  ctrl.currentSet = {};

  $scope.$on('vital.change', function () {
    var current = Vitals.getCurrent();
    if (!current) {
      return false;
    }
    ctrl.currentSet[current.field_type] = current._id;
  });

  function isSaved (type) {
    if (ctrl.currentSet[type]) {
      return true;
    }
    return false;
  }
  this.isSaved = isSaved;

  $scope.$on('$stateChangeStart', function (event, toState, toParams, fromState, fromParams) {
    if (ctrl.currentSet[toParams.type]) {
      toParams.vitals_id = ctrl.currentSet[toParams.type];
    }
  });

}]);
