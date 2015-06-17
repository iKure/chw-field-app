'use strict';
angular.module('forms')
.directive('formPageslider', function () {
  return {
    template: '<div class="title">{{label}}</div><div field-list class="form-fields" fields="form.fields" data="data" on-close="close()" ></div><button class="button button-block" ng-click="close()">Done</button>',
    restrict: 'E',
    controller: ['$scope', 'Forms', function ($scope, Forms) {
      console.log("FormPageSliderCtrl: Says HI!");
      // show loading???
      $scope.$watch('type', function () {
        if (!$scope.type) {
          console.log("FormPageSliderCtrl: No type — going to close");
          $scope.close();
        }
        console.log("FormPageSliderCtrl: Loading form " + $scope.type);
        Forms.get($scope.type).then(function (doc) {
          console.log("FormPageSliderCtrl: Got " + doc._id);
          $scope.form = doc;
          //stop loading....
        });
      });
    }],
    scope: {
      close: '&onClose',
      label: '=label',
      type: '=type',
      data: '=data',
    },
  };
});
