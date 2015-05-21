'use strict';
angular.module('patients')
.service('Start', function () {
  console.log('Hello from your Service: Start in module patients');

  // some initial data
  this.someData = {
    binding: 'Yes! Got that databinding working'
  };

  // TODO: do your service thing
});
