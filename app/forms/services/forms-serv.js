'use strict';
angular.module('forms')
.service('Forms', ['$rootScope', '$q', 'Config', 'pouchDB', function ($rootScope, $q, Config, pouchDB) {
  console.log('Hello from your Service: Forms in module forms');

  var dbName = 'forms';
  if (Config.ENV.SaltDB) {
    dbName = dbName + '-' + Config.ENV.SaltDB;
  }

  var localDB = new pouchDB(dbName);
  var remoteDB = false;
  if (Config.ENV.SERVER_URL) {
    console.log("FormsService: Getting data from: " + Config.ENV.SERVER_URL + dbName);
    remoteDB = new PouchDB(Config.ENV.SERVER_URL + dbName);
  }

  var service = new Object;
  service.records = [];

  function sync () {
    if (!remoteDB) {
      return false;
    }
    $rootScope.$on('forms.sync.start');
    localDB.replicate.from(remoteDB).then(function () {
      $rootScope.$broadcast('forms.synced');
      $rootScope.$on('forms.sync.stop');
    }).catch(function (err) {
      console.error(err);
      $rootScope.$on('forms.sync.stop');
    });
  }
  service.sync = sync;

  function get (id) {
    var deferred = $q.defer();
    if (!id) {
      deferred.reject(false);
      return deferred.promise;
    }
    var promise = localDB.get(id).then(function (doc) {
      if (doc.xml) {
        doc.inputs = parseODK(doc.xml);
      } else {
        doc.inputs = [];
      }
      deferred.resolve(doc);
    }).catch(function (err) {
      console.error(err);
      deferred.reject(false);
    });
    return deferred.promise;
  }
  service.get = get;

  function parseODK (xml) {
    // will return array of inputs that look like this
    /*
    {
      _ref: /FORM_NAME/data_name,
      type: int|string|select1|null (for group)
      label: String (readable, for humans)
      name: String (not for humans)
      condition: ~~ string for condition
      children: [ list of other inputs ]
    }
    */
    var x2js = new X2JS();
    var json = x2js.xml_str2json(xml);
    // used for sorting inputs
    var binds = {};
    json.html.head.model.bind.forEach(function (item, index) {
      item.position = index;
      binds[item._nodeset] = item;
    });
    function gatherInputObjects (ele) {
      var inputs = [];
      Object.keys(ele).forEach(function (key) {
        if (key.indexOf('_') == 0) {
          return false;
        }
        if (Array.isArray(ele[key])) {
          ele[key].forEach(function (item) {
            inputs.push(parseInputObject(item, key));
          });
        } else if (ele[key]._ref) {
          inputs.push(parseInputObject(ele[key], key));
        }
      });
      inputs.sort(function (a, b) {
        return +(a.position > b.position) || +(a.position === b.position) - 1;
      });
      return inputs;
    }
    function parseInputObject (ele, type) {
      var input = {};
      input._ref = ele._ref;
      input.name = ele._ref.split("/").reverse()[0];
      input.label = ele.label;
      delete ele.label;
      input.type = type;
      if (ele.item && Array.isArray(ele.item)) {
        input.choices = ele.item;
        delete ele.item;
      }
      if (ele._appearance) {
        input.appearance = ele._appearance;
      }
      if (binds[input._ref]) {
        input.position = binds[input._ref].position;
        input.condition = binds[input._ref]._relevant;
        if (binds[input._ref]._type) {
          // Overwrite previously set type because this is better
          input.type = binds[input._ref]._type;
        }
        if (binds[input._ref]._readonly) {
          input.readonly = true;
        }
      }
      if (input.type == 'string' && input.readonly) {
        input.type = 'note';
      }
      var children = gatherInputObjects(ele);
      if (children.length > 0) {
        input.children = children;
      }
      return input;
    }
    var inputs = gatherInputObjects(json.html.body);
    return inputs;
  }

  function all () {
    var deferred = $q.defer();
    var promise = localDB.allDocs({
      include_docs: true,
    }).then(function (docs) {
      var results = [];
      docs.rows.forEach(function (row) {
        if (!row.doc.hidden) {
          results.push(row.doc);
        }
      });
      deferred.resolve(results);
    });
    return deferred.promise;
  }
  service.all = all;

  return service;
}]);
