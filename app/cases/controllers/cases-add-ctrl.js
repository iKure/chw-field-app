'use strict';
angular.module('cases')
.controller('CasesAddCtrl', ['$scope', '$state', 'Cases', 'Symptoms', function ($scope, $state, Cases, Symptoms) {

  console.log('Hello from your Controller: CasesAddCtrl in module cases:. This is your controller:', this);

  $scope.record = {};
  $scope.symptoms = {};

  function saveSymptoms(case_id) {
    var keys = Object.keys($scope.symptoms);
    keys.forEach(function (key) {
      var record = $scope.symptoms[key];
      record.field_type = key;
      record.case_id = case_id;
      Symptoms.save(record);
    });
  }

  function save (record) {
    Cases.save(record).then(function (response) {
      saveSymptoms(response.id);

      $state.go('case.summary', {
        'case_id':response.id,
      });
    });
  }
  $scope.save = save;
}]);
