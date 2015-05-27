'use strict';
angular.module('patients')
.controller('VitalsAddCtrl', [ '$scope', 'Vitals', function ($scope, Vitals) {
  console.log('Hello from your Controller: VitalsCtrl in module patients:. This is your controller:', this);
  var ctrl = this;
  Vitals.clearCurrentSet();

  function isSaved (type) {
    if (Vitals.getCurrentSet(type)) {
      return true;
    }
    return false;
  }
  this.isSaved = isSaved;

}]);
