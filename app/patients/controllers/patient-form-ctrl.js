'use strict';
angular.module('patients')
.controller('PatientFormCtrl', [ '$scope', '$state', 'Patients', 'Fields', 'form', function ($scope, $state, Patients, Fields, form) {
  console.log('Hello from your Controller: PatientFormCtrl in module patients:. This is your controller:', this);
  if (!form) {
    console.log("Could not find form: demographics");
    $state.go('patients.directory');
    return false;
  }
  $scope.form = form;
  $scope.field = {};
  $scope.data = {};

  function save() {
    var patient = {};

    $scope.form.inputs.forEach( function (field) {
      if ($scope.field.data[field.name]) {
        patient[field.name] = $scope.field.data[field.name];
      }
    });

    Patients.save(patient).then(function (patient) {
      $scope.field.patient_id = patient._id;
      Fields.save($scope.field).then(function () {
        close();
      });
    });
  }
  $scope.save = save;

  function close () {
    if ($scope.field.patient_id) {
      $state.go('patients.single.summary', { patient_id:$scope.field.patient_id });
    } else {
      $state.go('patients.directory');
    }
  }
  $scope.close = close;
}]);
