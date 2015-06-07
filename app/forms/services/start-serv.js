'use strict';
angular.module('forms')
.service('Start', function () {
  console.log('Hello from your Service: Start in module forms');

  // some initial data
  this.someData = {
    binding: 'Yes! Got that databinding working'
  };

  // TODO: do your service thing
});
