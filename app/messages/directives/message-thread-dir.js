'use strict';
angular.module('messages')
.directive('messageThread', function () {
  return {
    templateUrl: 'messages/templates/thread.html',
    restrict: 'E',
    link: function postLink (scope, element, attrs) {
      console.log('Yo! Message Thread Directive');
    },
    scope: {
      messages: '=messages',
      thread_id: '=threadId'
    },
    controller: "MessageThreadCtrl",
  };
});
