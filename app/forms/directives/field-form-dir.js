'use strict';
angular.module('forms')
.directive('fieldInput', ['$compile', '$templateRequest', function ($compile, $templateRequest) {
  function parseCondition(str) {
    var dataKey = false;
    var condition = false;
    var cmpValue = false;
    var evalFn = function () {
      return false;
    }
    if (str.indexOf('selected(') == 0) {
      str = str.replace(/ /g, "").replace('selected(', '').replace(')', '');
      dataKey = str.split(',')[0].split('/').reverse()[0];
      cmpValue = eval(str.split(',')[1]);
      evalFn = function (arr) {
        if (Array.isArray(arr) && arr.indexOf(cmpValue) >= 0) {
          return true;
        }
        return false;
      }
    } else {
      str = str.replace(/ /g, '');
      condition = '==';
      dataKey = str.split('=')[0].split('/').reverse()[0];
      cmpValue = eval(str.split('=')[1]);
      evalFn = function (val) {
        try {
          return eval( '"' + val + '"' + condition + '"' + cmpValue + '"');
        } catch (err) {
          console.error('Error parsing condition: ' + str);
          return false;
        }
      }
    }
    return {
      dataKey: dataKey,
      eval: evalFn,
    }
  }
  function evalCondition(str, data) {
    var parts = str.split(' ');
    if (parts.length == 3) {
      var datum = data[parts[0]];
      var condition = parts[1];
      var cmpValue = eval(parts[2]);
      if (condition == '=') {
        condition = '==';
      }
      return eval(datum + condition + cmpValue);
    }
    return false;
  }
  return {
    restrict: 'A',
    link: function postLink (scope, element, attrs) {
      if (scope.field.type) {
        console.log("fieldFormDirective: Yo! Check this " + scope.field.type);
        $templateRequest('forms/templates/input-' + scope.field.type + '.html').then(function (html) {
          element.append($compile(html)(scope));
        });
      }
      scope.$watch('visible', function (value) {
        if (value) {
          console.log('Show');
          element.show();
        } else {
          console.log('Hide');
          element.hide();
        }
      });
    },
    scope: {
      field: '=field',
      data: '=?data',
    },
    template: '',
    controller: ['$scope', '$ionicScrollDelegate', function ($scope, $ionicScrollDelegate) {
      $scope.visible = true;
      if ($scope.field.condition) {
        console.log('fieldFormDirective: Has condition: ' + $scope.field.condition);
        var condition = parseCondition($scope.field.condition);
        $scope.$watch(function () {
          return $scope.$parent.data[condition.dataKey];
        }, function (value) {
          console.log('fieldFormDirective: Watching ' + condition.dataKey + '=' + value);
          if (condition.eval(value)) {
            $scope.visible = true;
          } else {
            $scope.visible = false;
          }
          setTimeout(function () {
            $ionicScrollDelegate.resize();
          }, 50);
        }, true); // sets watch collection to true
      }
    }],
  };
}]);
