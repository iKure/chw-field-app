'use strict';
angular.module('vitals')
.controller('VitalsAddCtrl', [ '$scope', 'Vitals', function ($scope, Vitals) {
  console.log('Hello from your Controller: VitalsCtrl in module vitals:. This is your controller:', this);
  var ctrl = this;
  Vitals.clearCurrentSet();
  ctrl.currentSet = {};

  $scope.$on('vitals.update', function () {
    ctrl.currentSet = Vitals.getCurrentSet();
    $scope.$apply();
  });

  function isSaved (type) {
    if (ctrl.currentSet[type]) {
      return true;
    }
    return false;
  }
  this.isSaved = isSaved;

}]);
