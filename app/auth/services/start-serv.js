'use strict';
angular.module('auth')
.service('Start', function () {
  console.log('Hello from your Service: Start in module auth');

  // some initial data
  this.someData = {
    binding: 'Yes! Got that databinding working'
  };

  // TODO: do your service thing
});
