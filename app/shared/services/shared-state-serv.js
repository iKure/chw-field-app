'use strict';
angular.module('shared')
.service('SharedState', [ '$rootScope', function ($rootScope) {
  console.log('Hello from your Service: SharedState in module shared');

  var service = this;
  service.state = {};

  function setState (key, value) {
    if (!value) {
      delete service.state[key];
    } else {
      service.state[key] = value;
    }
    $rootScope.$broadcast('sharedState.update');
    return true;
  }

}]);
