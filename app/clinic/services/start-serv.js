'use strict';
angular.module('clinic')
.service('Start', function () {
  console.log('Hello from your Service: Start in module clinic');

  // some initial data
  this.someData = {
    binding: 'Yes! Got that databinding working'
  };

  // TODO: do your service thing
});
