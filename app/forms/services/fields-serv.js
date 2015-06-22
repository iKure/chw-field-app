'use strict';
angular.module('forms')
.service('Fields', ['$rootScope', 'Forms', '$q', 'Config', 'Auth', 'Clinic', function ($rootScope, Forms, $q, Config, Auth, Clinic) {
  console.log('Hello from your Service: Fields in module forms');

  var localDB = Clinic.localDB;

  var service = new Object;
  service.records = [];

  function getForm (type) {
    console.log('FieldsService: Get form' + type);
    var promise = Forms.get(type);
    promise.then( function (doc) {
      console.log('FieldsService: Got form type: ' + doc._id);
      $scope.form = doc;
      $scope.data.form_id = doc._id;
    }).catch( function (err) {
      console.log('FieldsService: Could not find form template type: ' + type);
    });
  }

  function get(id) {
    var deferred = $q.defer();
    localDB.get(id).then(function (doc) {
      Forms.get(doc.form_id).then(function (form) {
        doc.form = form;
        deferred.resolve(doc);
      });
    });
    return deferred.promise;
  }
  service.get = get;

  function all(extra_matches) {
    var deferred = $q.defer();
    var matches = {
      type: 'field',
      parent: undefined,
      archived: undefined
    };

    if (extra_matches) {
      Object.keys(extra_matches).forEach(function (key) {
        matches[key] = extra_matches[key];
      });
    }

    var promise = localDB.query(function (doc, emit) {
      var passes = true;
      Object.keys(matches).forEach(function (key) {
        if (doc[key] != matches[key]) {
          passes = false;
        }
      });
      if (!passes) {
        return false;
      }
      emit(doc.date_created);
    }, {
      include_docs: true,
      descending: true,
    });

    promise.then(function (docs) {
      var results = [];
      docs.rows.forEach(function (row) {
        results.push(row.doc);
      });
      deferred.resolve(results);
    });

    return deferred.promise;
  }
  service.all = all;

  function save (field) {
    var promise = false;
    field.date_modified = Date.now();
    field.user_modified = Auth.currentUser.name;
    if (!field._id) {
      field.type = 'field';
      field.date_created = Date.now();
      field.user_created = Auth.currentUser.name;
      promise = localDB.post(field);
    } else {
      promise = localDB.put(field);
    }
    return promise;
  }
  service.save = save;

  function toggleArchive (id) {
    console.log("FieldsService: Toggling archive " + id);
    var deferred = $q.defer();
    get(id).then(function (doc) {
      if (!doc.archived) {
        doc.archived = true;
        console.log("FieldsService: Archiving " + id);
      } else {
        doc.archived = undefined;
        console.log("FieldsService: Unarchiving " + id);
      }
      save(doc).then(function (response) {
        deferred.resolve(response);
        console.log("FieldsService: Archive toggled " + id);
      });
    });

    return deferred.promise;
  }
  service.toggleArchive = toggleArchive;

  return service;
}]);
