'use strict';
angular.module('forms')
.directive('fieldSummary', function () {
  return {
    templateUrl: 'forms/templates/field-summary.html',
    restrict: 'E',
    link: function postLink (scope, element, attrs) {
      console.log("Yo! Field Summary Directive!");
    },
    scope: {
      data: '=data',
      form: '=?form',
      type: '=?type',
    },
    controller: ['$scope', 'Forms', function ($scope, Forms) {
      $scope.$watch('type', function () {
        if ($scope.type) {
          Forms.get($scope.type).then(function (doc) {
            $scope.form = doc;
          });
        }
      });
    }],
  };
});
