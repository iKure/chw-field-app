'use strict';
angular.module('forms')
.service('Fields', ['$rootScope', 'Forms', function ($rootScope, Forms) {
  console.log('Hello from your Service: Fields in module forms');

  var localDB = new PouchDB('fields');

  var service = new Object;
  service.records = [];

  function get(id) {
    return localDB.get(id);
  }
  service.get = get;

  function save (field, form) {
    if (form) {
      console.log("FieldsService: Save fields for form: " + form._id);
      field.form_id = form._id;
    }
    // Add patient_id, (parent) field_id, and anything else
    var promise = false;
    if (!field._id) {
      promise = localDB.post(field);
    } else {
      promise = localDB.put(field);
    }
    return promise;
  }
  service.save = save;

  return service;
}]);
