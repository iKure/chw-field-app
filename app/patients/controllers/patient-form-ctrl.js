'use strict';
angular.module('patients')
.controller('PatientFormCtrl', [ '$scope', '$state', 'Patients', 'Forms', 'Fields', function ($scope, $state, Patients, Forms, Fields) {
  console.log('Hello from your Controller: PatientFormCtrl in module patients:. This is your controller:', this);

  $scope.form = false;
  $scope.data = {};
  Forms.get('demographics').then(function (doc) { // This should be configured in a seeting somewhere
    $scope.form = doc;
  }).catch(function (err) {
    console.error(err);
    // Show error message?
    $state.go('patients.directory');
  });

  function save() {
    var patient = {};

    if (!$scope.data._id) { // if form was not saved, just close
      close();
      return false;
    }

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
