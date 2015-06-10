'use strict';
angular.module('patients')
.controller('PatientSummaryCtrl', ['$scope', '$stateParams', 'Patients', 'Fields', function ($scope, $stateParams, Patients, Fields) {

  console.log('Hello from your Controller: PatientSummaryCtrl in module patients:. This is your controller:', this);

  $scope.records = null;
  Patients.get($stateParams.patient_id).then( function (doc) {
    $scope.patient = doc;
    Fields.all({
      patient_id: $scope.patient._id,
    }).then(function (results) {
      $scope.records = results;
    });
  });
}]);
