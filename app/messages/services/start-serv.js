'use strict';
angular.module('messages')
.service('Start', function () {
  console.log('Hello from your Service: Start in module messages');

  // some initial data
  this.someData = {
    binding: 'Yes! Got that databinding working'
  };

  // TODO: do your service thing
});
