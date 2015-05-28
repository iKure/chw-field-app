'use strict';
angular.module('shared')
.service('SharedState', [ '$rootScope', function ($rootScope) {
  console.log('Hello from your Service: SharedState in module shared');

  var state = {};

  function setState (key, value) {
    if (!value) {
      delete state[key];
    } else {
      state[key] = value;
    }
    $rootScope.$broadcast('sharedState.update');
    return true;
  }
  this.setState = setState;

  function getState (key) {
    if (!key) {
      return state;
    }
    if (state[key]) {
      return state[key];
    }
    return false;
  }
  this.getState = getState;

}]);
