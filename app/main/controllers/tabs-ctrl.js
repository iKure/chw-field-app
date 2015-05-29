'use strict';
angular.module('main')
.controller('TabsCtrl', [ '$scope', '$state', 'Patients', function ($scope, $state, Patients) {
  console.log('Hello from your Controller: TabsCtrl in module main:. This is your controller:', this);

  var ctrl = this;

  $scope.$on('$stateChangeStart', function (event, toState, toParams, fromState, fromParams) {
    console.log("TabsCtrl: Checking state");
    if (toState.name.indexOf('tabs') == 0) {
      console.log('TabsCtrl: State passed');
      return true;
    }
    event.preventDefault();
    console.log("TabsCtrl: Editing state to: " + 'tabs.' + toState.name);
    $state.go('tabs.' + toState.name, toParams);
  });

  $scope.patient = Patients.getCurrent();
  $scope.$on('patient.change', function () {
    $scope.patient = Patients.getCurrent();
    $scope.$apply();
  });

}]);
