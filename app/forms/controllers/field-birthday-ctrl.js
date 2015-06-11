'use strict';
angular.module('forms')
.controller('FieldBirthdayCtrl', ['$scope', function ($scope) {

  console.log('Hello from your Controller: FieldBirthdayCtrl in module forms:. This is your controller:', this);

  $scope.$watch ("data.birthdate", function (newValue, oldValue) {
    if (newValue) {
      // from ::::: http://stackoverflow.com/questions/8152426/how-can-i-calculate-the-number-of-years-betwen-two-dates
      var ageDifMs = Date.now() - newValue.getTime();
      var ageDelta = new Date(ageDifMs); // miliseconds from epoch
      $scope.data.value = Math.abs(ageDelta.getUTCFullYear() - 1970);
    }
  });
}]);
