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
  $scope.data = {};

  function save() {
    var patient = {};

    $scope.form.fields.forEach( function (field) {
      if (!field.persistant || !$scope.data[field.name]) {
        return true;
      }
      if ($scope.data[field.name].value) {
        patient[field.name] = $scope.data[field.name].value;
      }
    });

    Patients.save(patient).then(function (patient) {
      $scope.data.patient_id = patient._id;
      Fields.save($scope.data).then(function () {
        close();
      });
    });
  }
  $scope.save = save;

  function close () {
    if ($scope.data.patient_id) {
      $state.go('patients.single.summary', { patient_id:$scope.data.patient_id });
    } else {
      $state.go('patients.directory');
    }
  }
  $scope.close = close;
}]);
