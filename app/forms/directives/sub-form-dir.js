'use strict';
angular.module('forms')
.directive('subForm', ['$q', '$compile', function ($q, $compile) {
  return {
    restrict: 'E',
    transclude: true,
    template: '<div ng-transclude></div>',
    link: function (scope, element, attr) {
      console.log('SubForm: Yo!');
      var div = false;
      element.hide();
      scope.$watch('showing', function (newValue) {
        if (newValue) {
          console.log("SubForm: showing!!");
          var parent = element.parents('ion-content:first');
          div = $($compile('<ion-content></ion-content>')(scope)).insertAfter(parent);
          div.attr('class', parent.attr('class'));
          div.css('left', parent.width());
          $('.scroll', div).append(element);
        } else {
          if (div) {
            div.remove();
            div = false;
          }
        }
      });
    }
  };
}]);
