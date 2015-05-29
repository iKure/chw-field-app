'use strict';
angular.module('cases')
.service('Start', function () {
  console.log('Hello from your Service: Start in module cases');

  // some initial data
  this.someData = {
    binding: 'Yes! Got that databinding working'
  };

  // TODO: do your service thing
});
