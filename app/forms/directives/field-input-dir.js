'use strict';
angular.module('forms')
.directive('fieldInput', ['$q', '$compile', '$templateRequest', function ($q, $compile, $templateRequest) {
  function parseCmpValue (str) {
    try {
      return eval(str);
    } catch (err) {
      return str;
    }
  }
  function parseDataKey (str) {
    return str.split('/').reverse()[0];
  }
  function parseCondition(str) {
    var dataKey = false;
    var condition = false;
    var cmpValue = false;
    var evalFn = function () {
      return false;
    }
    if (str.indexOf('selected(') == 0) {
      str = str.replace(/ /g, "").replace('selected(', '').replace(')', '');
      dataKey = parseDataKey(str.split(',')[0]);
      cmpValue = parseCmpValue(str.split(',')[1]);
      evalFn = function (arr) {
        if (Array.isArray(arr) && arr.indexOf(cmpValue) >= 0) {
          return true;
        }
        return false;
      }
    } else {
      str = str.replace(/ /g, '');
      condition = '==';
      dataKey = parseDataKey(str.split('=')[0]);
      cmpValue = parseCmpValue(str.split('=')[1]);
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
  function getTemplate (template, scope) {
    var deferred = $q.defer();
    var templateName = template.join('-');
    var templateUri = 'forms/templates/' + templateName + '.html'
    console.log('fieldInput: Getting template: ' + templateName);
    $templateRequest(templateUri).then(function (html) {
      deferred.resolve($compile(html)(scope));
    }).catch(function (err) {
      console.log('fieldInput: No template: ' + templateName + ' (' + err.message + ')');
      template.pop();
      if (template.length) {
        getTemplate(template, scope);
      } else {
        console.error(err);
      }
    });
    return deferred.promise;
  }
  return {
    restrict: 'A',
    link: function postLink (scope, element, attrs) {
      var template = ['input'];
      if (scope.field.type) {
        console.log("fieldInput: Yo! Check this " + scope.field.type);
        template.push(scope.field.type);
        if (scope.field.appearance) {
          console.log("fieldInput: " + scope.field.type + " has appearance " + scope.field.appearance);
          template.push(scope.field.appearance);
        }
      }
      scope.$watch('visible', function (value) {
        if (value) {
          console.log('Show' + scope.field.name);
          getTemplate(template, scope).then(function (html) {
            element.append(html);
            element.show();
          });
        } else {
          console.log('Hide' + scope.field.name);
          element.hide().html('');
        }
      });
      if (scope.field.appearance == 'hidden') {
        element.remove();
      }
    },
    scope: {
      field: '=field',
      data: '=?data',
    },
    template: '',
    controller: ['$scope', '$ionicScrollDelegate', function ($scope, $ionicScrollDelegate) {
      $scope.visible = false;
      if ($scope.field.condition) {
        console.log('fieldInput: Has condition: ' + $scope.field.condition);
        var condition = parseCondition($scope.field.condition);
        $scope.$watch(function () {
          return $scope.$parent.data[condition.dataKey];
        }, function (value) {
          console.log('fieldInput: Watching ' + condition.dataKey + '=' + value);
          if (condition.eval(value)) {
            $scope.visible = true;
          } else {
            $scope.visible = false;
          }
          setTimeout(function () {
            $ionicScrollDelegate.resize();
          }, 50);
        }, true); // sets watch collection to true
      } else {
        $scope.visible = true;
      }
      function isEmpty(obj) {
        for (var prop in obj) {
          if (obj.hasOwnProperty(prop)) {
            return false;
          }
        }
        return true;
      }
      $scope.isEmpty = isEmpty;
      $scope.getValueLabel = function (value, choices) {
        var choicesObj = {};
        choices.forEach(function (choice) {
          choicesObj[choice.value] = choice.label;
        });
        return choicesObj[value];
      }
    }],
  };
}]);
