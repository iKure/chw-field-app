'use strict';
angular.module('forms')
.controller('SubFormCtrl', ['$scope', '$ionicPopover', '$state', '$stateParams', 'Forms', 'Fields', function ($scope, $ionicPopover, $state, $stateParams, Forms, Fields) {

  console.log('Hello from your Controller: SubFormCtrl in module forms:. This is your controller:', this);

  function getFormFields() {
    if (!$scope.$parent.data) {
      return setTimeout(getFormFields, 100);
    }
    if (!$stateParams.name || !$scope.$parent.data[$stateParams.name]) {
      $state.go('forms.field', {
        field_id: $stateParams.field_id,
      });
      return false;
    }
    $scope.data = $scope.$parent.data[$stateParams.name]; 
    Forms.get($scope.data.include).then(function (doc){
      $scope.form = doc;
      createPopover();
    });
  }

  function createPopover () {
    $ionicPopover.fromTemplateUrl('forms/templates/sub-form.html', {
      scope: $scope
    }).then(function (popover) {
      $scope.popover = popover;
      $scope.popover.show('body');
    });

    $scope.closePopover = function () {
      $scope.popover.hide();
    };
    //Cleanup the popover when we're done with it!
    $scope.$on('$destroy', function () {
      $scope.popover.remove();
    });
    // Execute action on hide popover
    $scope.$on('popover.hidden', function () {
      console.log("SubFormCtrl: Close popover");
      setTimeout(function () {
        $state.go('forms.field', {
          field_id: $stateParams.field_id,
        });
      }, 100);
    });
    // Execute action on remove popover
    $scope.$on('popover.removed', function () {
      console.log("SubFormCtrl: Popover removed");
    });
  }

  getFormFields();
}]);
