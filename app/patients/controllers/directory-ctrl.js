'use strict';
angular.module('patients')
.controller('PatientDirectoryCtrl', [ '$scope', 'Patients', 'records', function ($scope, Patients, records) {
  console.log('Hello from your Controller: PatientDirectoryCtrl in module patients:. This is your controller:', this);
  $scope.records = records;

  $scope.$on('patients.update', function () {
    Patients.list().then(function (results) {
      $scope.records = results;
    });
  });

  $scope.query = {};
  var searchListener = false;
  function startSearch () {
    $scope.searching = true;
    var timeout = false;
    searchListener = $scope.$watch('query.text', function (newValue, oldValue) {
      console.log("Query Changed: " + newValue);
      if (timeout) {
        clearTimeout(timeout);
      }
      timeout = setTimeout(function () {
        var query = {
          name_or_id: $scope.query.text,
        };
        if (!query.name_or_id || query.name_or_id == "") {
          delete query.name_or_id;
        }
        Patients.list(query).then(function (results) {
          $scope.records = results;
        });
      })
    });
  }
  $scope.startSearch = startSearch;

  function clearSearch () {
    $scope.searching = false;
    $scope.query = {};
    Patients.list().then(function (results) {
      $scope.records = results;
    });
    searchListener();
  }
  $scope.clearSearch = clearSearch;
}]);
