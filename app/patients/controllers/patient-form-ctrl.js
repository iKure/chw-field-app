'use strict';
angular.module('patients')
.controller('PatientFormCtrl', [ '$scope', '$state', 'Patients', 'Forms', 'Fields', function ($scope, $state, Patients, Forms, Fields) {
  console.log('Hello from your Controller: PatientFormCtrl in module patients:. This is your controller:', this);

  $scope.form = false;
  $scope.data = {};
  Forms.get('demographics').then(function (doc) { // This should be configured in a seeting somewhere
    $scope.form = doc;
  });

  function save() {
    var patient = {};
    Object.keys($scope.data).forEach(function (key) {
      if (key.indexOf('_') == 0) {
        return false;
      }
      patient[key] = $scope.data[key];
    });
    Patients.save(patient).then(function (response) {
      $scope.data.patient_id = response.id;
      Fields.save($scope.data).then(function () {
        $state.go('patient.summary', { patient_id:response.id });
      });
    });
  }
  $scope.save = save;
}]);
