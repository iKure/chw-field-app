'use strict';
angular.module('forms')
.controller('FormCreateCtrl', ['$scope', '$state', '$stateParams', 'ODK', 'Forms', function ($scope, $state, $stateParams, ODK, Forms) {

  console.log('Hello from your Controller: FormCreateCtrl in module forms:. This is your controller:', this);
  if (!$stateParams.type) {
    $state.go('forms.list');
  }

}]);
