'use strict';
angular.module('patients')
.controller('PatientSummaryCtrl', ['$scope', 'Fields', 'patient', 'records', function ($scope, Fields, patient, records) {

  console.log('Hello from your Controller: PatientSummaryCtrl in module patients:. This is your controller:', this);
  console.log ("Hello RECORDS" + records);
  $scope.records = records;

  $scope.$on('clinic.update', function () {
    Fields.all({
      patient_id:patient._id
    }).then(function (results) {
      $scope.records = results;
    });
  });
}]);
