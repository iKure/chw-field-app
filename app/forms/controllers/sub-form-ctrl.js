'use strict';
angular.module('forms')
.controller('SubFormCtrl', ['$scope', '$modal', '$state', '$stateParams', function ($scope, $modal, $state, $stateParams) {

  console.log('Hello from your Controller: SubFormCtrl in module forms:. This is your controller:', this);

  var modalInstance = $modal.open({
    animation: $scope.animationsEnabled,
    templateUrl: 'forms/templates/sub-form.html',
    resolve: {
      items: function () {
        return $scope.items;
      }
    }
  });

  modalInstance.result.then(function (selectedItem) {
    $scope.selected = selectedItem;
  }, function () {
    $log.info('Modal dismissed at: ' + new Date());
  });

  /*
  if (!$stateParams.name || !$scope.parent.data[$stateParams.name]) {
    $state.go('forms.field', {
      field_id: $stateParams.field_id,
    });
  }
  */
}]);
