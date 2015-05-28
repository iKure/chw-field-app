'use strict';
angular.module('shared')
.service('Start', function () {
  console.log('Hello from your Service: Start in module shared');

  // some initial data
  this.someData = {
    binding: 'Yes! Got that databinding working'
  };

  // TODO: do your service thing
});
