'use strict';
angular.module('cases')
.controller('StartCtrl', function (Start, Config) {

  // bind data from service
  this.someData = Start.someData;
  this.ENV = Config.ENV;
  this.BUILD = Config.BUILD;

  console.log('Hello from your Controller: StartCtrl in module cases:. This is your controller:', this);
  // TODO: do your controller thing
});