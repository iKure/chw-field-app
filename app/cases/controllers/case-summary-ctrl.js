'use strict';
angular.module('cases')
.controller('CaseSummaryCtrl', [ '$scope', '$stateParams', 'Cases', 'Symptoms', function ($scope, $stateParams, Cases, Symptoms) {

  console.log('Hello from your Controller: CaseSummaryCtrl in module cases:. This is your controller:', this);

  $scope.case = Cases.getCurrent();
  if ($stateParams.case_id) {
    Cases.setCurrent($stateParams.case_id);
  }
  $scope.$on('case.change', function () {
    $scope.case = Cases.getCurrent();
    $scope.$apply();
  });

  $scope.symptoms = Symptoms.get();
  $scope.$on('symptoms.update', function () {
    $scope.symptoms = Symptoms.get();
    $scope.$apply();
  });

}]);
