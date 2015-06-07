'use strict';
angular.module('forms')
.controller('FormCreateCtrl', ['$scope', '$state', '$stateParams', 'Forms', function ($scope, $state, $stateParams, Forms) {

  console.log('Hello from your Controller: FormCreateCtrl in module forms:. This is your controller:', this);
  if (!$stateParams.type) {
    $state.go('forms.list');
  }
  console.log('FormCreateCtrl: Create new form type: ' + $stateParams.type);

}]);
