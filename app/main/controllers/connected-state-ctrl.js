'use strict';
angular.module('main')
.controller('ConnectedStateCtrl', [ '$scope', 'Patients', 'Cases', 'Vitals', function ($scope, Patients, Cases, Vitals) {

  console.log('Hello from your Controller: ConnectedStateCtrl in module main:. This is your controller:', this);

  $scope.patient = Patients.getCurrent();
  $scope.case = Cases.getCurrent();

  function getCaseContext () {
    if (!Cases.getCurrent()) {
      return false;
    }
    $scope.case = Cases.getCurrent();
    $scope.$apply();
    if (Patients.getCurrent() && Patients.getCurrent()._id == $scope.case.patient_id) {
      return false;
    }
    console.log('ConnectedStateService: Updating patient_id:' + $scope.case.patient_id);
    Patients.setCurrent($scope.case.patient_id);
  }
  getCaseContext();
  $scope.$on('case.change', getCaseContext);

  $scope.$on('patient.change', function () {
    console.log('ConnectedStateService: Updating patient_id:')
    $scope.patient = Patients.getCurrent();
  })
}]);
