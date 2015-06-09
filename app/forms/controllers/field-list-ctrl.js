'use strict';
angular.module('forms')
.controller('FieldListCtrl', ['$scope', 'Fields', function ($scope, Fields) {

  console.log('Hello from your Controller: FieldListCtrl in module forms:. This is your controller:', this);

  function save() {
    var timeout = false;
    var saving = [];
    // Set listeners to check for saved events
    $scope.$on('field.saving', function (event, name) {
      console.log("FieldListCtrl: Got saving from: " + name);
      saving.push(name);
    });
    $scope.$on('field.saved', function (event, name) {
      console.log("FieldListCtrl: " + name + ": is saved");
      saving.splice(saving.indexOf(name), 1);
    });

    function close () {
      if (saving.length > 0) {
        console.log('FieldListCtrl: Waiting for ' + saving);
        closeTimeout(100);
        return false;
      }
      console.log('FieldListCtrl: Closing');
      if ($scope.close) {
        $scope.close();
      }
    }
    function closeTimeout (duration) {
      console.log('FieldListCtrl: Set close timeout: ' + duration);
      return setTimeout(close, duration);
    }

    Fields.save($scope.data, $scope.form).then(function (response) {
      $scope.data._id = response.id;
      $scope.data._rev = response.rev;
      $scope.$broadcast('field.save', response.id);
      closeTimeout(100);
    });
  }
  $scope.save = save;
}]);
