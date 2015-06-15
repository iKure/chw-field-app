'use strict';
angular.module('messages')
.directive('messageCreate', function () {
  return {
    templateUrl: 'messages/templates/form-create.html',
    restrict: 'E',
    link: function postLink (scope, element, attrs) {
      console.log("Yo! Message Create Directive");
    },
    controller: "MessageCreateCtrl",
    scope:{
      thread_id: "=threadId",
      create: '&onCreate',
    }
  };
});
