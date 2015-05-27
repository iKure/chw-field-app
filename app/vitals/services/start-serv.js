'use strict';
angular.module('vitals')
.service('Start', function () {
  console.log('Hello from your Service: Start in module vitals');

  // some initial data
  this.someData = {
    binding: 'Yes! Got that databinding working'
  };

  // TODO: do your service thing
});
