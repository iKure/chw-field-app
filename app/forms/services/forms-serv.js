'use strict';
angular.module('forms')
.service('Forms', ['$rootScope', 'Config', 'PouchDB', function ($rootScope, Config, PouchDB) {
  console.log('Hello from your Service: Forms in module forms');

  var localDB = new PouchDB('forms');

  if (Config.ENV.FORMS) {
    Config.ENV.FORMS.forEach(function (form) {
      localDB.get(form._id).catch( function (err) {
        localDB.put(form).then( function (response) {
          console.log( "FormsService: PUT form id = " + response.id);
        });
      });
    });
  }
}]);
