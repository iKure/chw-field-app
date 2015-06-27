'use strict';
angular.module('forms')
.service('Fields', ['$rootScope', 'Forms', '$q', 'Config', 'Auth', 'Clinic', function ($rootScope, Forms, $q, Config, Auth, Clinic) {
  console.log('Hello from your Service: Fields in module forms');

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
    console.log('FieldsService: Getting field: ' + id);
    return Clinic.getClinic().then(function (db) {
      var deferred = $q.defer();
      db.get(id).then(function (doc) {
        Forms.get(doc.form_id).then(function (form) {
          doc.form = form;
          console.log("FieldsService: Got form for field: " + id);
        }).then(function () {
          console.log("FieldsService: Checking for children of field: " + id);
          doc.children = [];
          var deferred = $q.defer();
          service.all({
            parent_id: doc._id
          }).then(function (results) {
            console.log("FieldsService: Got " + results.length + " children for: " + id);
            if (results.length < 1) {
              deferred.resolve(false);
              return false;
            }
            var loaded = 0;
            function checkDone () {
              loaded++;
              if (loaded >= results.length) {
                doc.children = doc.children.reverse();
                deferred.resolve(true);
              }
            }
            results.forEach(function (res) {
              service.get(res._id).then(function (fdoc) {
                doc.children.push(fdoc);
                checkDone();
              });
            })
          });
          return deferred.promise;
        }).then(function () {
          console.log("FieldsService: Returning field: " + id);
          deferred.resolve(doc);
        });
      });
      return deferred.promise;
    });
  }
  service.get = get;

  function all(extra_matches) {
    return Clinic.getClinic().then(function (db) {
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

      var promise = db.query(function (doc, emit) {
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
    });
  }
  service.all = all;

  function save (field) {
    return Clinic.getClinic().then(function (db) {
      var promise = false;
      field.date_modified = Date.now();
      field.user_modified = Auth.currentUser.name;
      if (!field._id) {
        field.type = 'field';
        field.date_created = Date.now();
        field.user_created = Auth.currentUser.name;
        promise = db.post(field);
      } else {
        promise = db.put(field);
      }
      return promise;
    });
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
