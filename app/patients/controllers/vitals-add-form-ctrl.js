'use strict';
angular.module('patients')
.controller('VitalsAddFormCtrl', [ '$scope', '$state', '$stateParams', 'Patients', 'Vitals', function ($scope, $state, $stateParams, Patients, Vitals) {
  console.log('Hello from your Controller: VitalsAddFormCtrl in module patients:. This is your controller:', this);
  var ctrl = this;
  this.type = $stateParams.type;

  this.current = {};
  var currentID = Vitals.getCurrentSet(this.type);
  if (currentID) {
    Vitals.getById(currentID).then(function (doc) {
      ctrl.current = doc;
    });
  }

  this.saveRecord = function (record) {
    record.type = ctrl.type;
    Vitals.save(record);
  }

  $scope.$on('vitals.current.update', function () {
    if (Vitals.current.type == ctrl.type) {
      ctrl.current = Vitals.current;
    }
  });
}]);
