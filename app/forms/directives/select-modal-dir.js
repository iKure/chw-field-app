'use strict';
angular.module('forms')
.directive('selectModal', function () {
  return {
    templateUrl: 'forms/templates/select-modal.html',
    restrict: 'E',
    link: function postLink (scope, element, attrs) {
      console.log('SelectModalDirective: Yo!');
    },
    scope: {
      data: '=data',
      choices: '=choices',
      label: '=label',
      selectMultiple: '=selectMultiple',
    },
    controller: ['$rootScope', '$scope', '$ionicPopup', function ($rootScope, $scope, $ionicPopup) {
      $scope.show = function () {
        var $popupScope = $rootScope.$new(true, $scope);
        $popupScope.data = {value: $scope.data};
        $popupScope.choices = $scope.choices;
        $popupScope.query = {text:''};

        var timeout = false;
        $popupScope.$watch('query.text', function (value) {
          if (!value || value == "") {
            $popupScope.choices = $scope.choices;
          }
          console.log("SelectModalDirective: Query changed to " + value);
          if (timeout) {
            clearTimeout(timeout);
          }
          timeout = setTimeout(function () {
            console.log("SelectModalDirective: Filtering by " + value);
            var choices = [];
            $scope.choices.forEach(function (choice) {
              if (choice.label.toLowerCase().indexOf(value.toLowerCase()) >= 0) {
                choices.push(choice);
              }
            });
            $popupScope.choices = choices;
          })
        });

        $ionicPopup.show({
          title: $scope.label,
          templateUrl: 'forms/templates/select-modal-popup.html',
          scope: $popupScope,
          buttons: [
            {
              text: 'Done',
              onTap: function (event) {
                return true;
              }
            }
          ]
        }).then(function (results) {
          $scope.data = $popupScope.data.value;
        });
      }
      function removeChoice (value) {
        if (!$scope.selectMultiple) {
          $scope.data = false;
          return true;
        }
        var index = $scope.data.indexOf(value);
        if (index >= 0) {
          $scope.data.splice(index, 1);
          return true;
        }
        return false;
      }
      $scope.removeChoice = function (value) {
        $ionicPopup.show({
          title: 'Remove ' + $scope.getValueLabel(value, $scope.choices),
          scope: $scope,
          buttons: [
            {
              text: 'Cancel'
            },
            {
              text: 'Remove',
              type: 'button-aggressive',
              onTap: function (e) {
                return true;
              },
            },
          ],
        }).then(function (result) {
          if (result) {
            removeChoice(value);
          }
        });
      }
      $scope.getValueLabel = function (value, choices) {
        var choicesObj = {};
        choices.forEach(function (choice) {
          choicesObj[choice.value] = choice.label;
        });
        return choicesObj[value];
      }
    }],
  };
});
