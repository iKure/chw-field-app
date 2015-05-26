'use strict';
angular.module('patients')
.controller('VitalsAddCtrl', [ '$scope', '$state', '$stateParams', 'Patients', 'Vitals', function ($scope, $state, $stateParams, Patients, Vitals) {
  console.log('Hello from your Controller: VitalsCtrl in module patients:. This is your controller:', this);
  var ctrl = this;
  ctrl.records = Vitals.records;
  ctrl.current = {};
  ctrl.currentSet = {};
  ctrl.type = $stateParams.type;

  $scope.$on('vitals.update', function () {
    ctrl.records = Vitals.records;
    $scope.$apply();
  });
  $scope.$on('vitals.current.update', function () {
    ctrl.current = Vitals.current;
    $scope.$apply();
  });

  this.saveRecord = function (record) {
    Vitals.save(record).then(function (response) {
      // Add key to type list
      ctrl.currentSet[ctrl.type] = response.id;
    });
  }

  function showForm (type) {
    console.log("showForm");
    ctrl.type = type;
    if (ctrl.currentSet[type]) {
      console.log("Found old record" + ctrl.currentSet[type]);
      Vitals.getById(ctrl.currentSet[type]).then(function (response) {
        ctrl.record = response;
        $scope.$apply();
      });
    }
    ctrl.current = {};
  }
  this.showForm = showForm;

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
