'use strict';
angular.module('forms')
.service('Forms', ['$rootScope', '$q', 'Config', 'pouchDB', function ($rootScope, $q, Config, pouchDB) {
  console.log('Hello from your Service: Forms in module forms');

  var dbName = 'forms';
  /*
  if (Config.ENV.SaltDB) {
    dbName = dbName + '-' + Config.ENV.SaltDB;
  }
  */

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
      if (!doc.xml) {
        doc.xml = "<?xml version=\"1.0\"?><h:html xmlns=\"http://www.w3.org/2002/xforms\" xmlns:ev=\"http://www.w3.org/2001/xml-events\" xmlns:h=\"http://www.w3.org/1999/xhtml\" xmlns:jr=\"http://openrosa.org/javarosa\" xmlns:orx=\"http://openrosa.org/xforms\" xmlns:xsd=\"http://www.w3.org/2001/XMLSchema\"><h:head><h:title>Patient Demographics</h:title><model><instance><Patient_Demographic_Form id=\"patient_demographic\"><patient_demographics_title/><patient_name/><patient_age/><dob/><gender/><patient_mobile/><meta><instanceID/></meta></Patient_Demographic_Form></instance><bind nodeset=\"/Patient_Demographic_Form/patient_demographics_title\" readonly=\"true()\" type=\"string\"/><bind nodeset=\"/Patient_Demographic_Form/patient_name\" type=\"string\"/><bind nodeset=\"/Patient_Demographic_Form/patient_age\" type=\"int\"/><bind nodeset=\"/Patient_Demographic_Form/dob\" type=\"date\"/><bind nodeset=\"/Patient_Demographic_Form/gender\" type=\"select1\"/><bind nodeset=\"/Patient_Demographic_Form/patient_mobile\" type=\"int\"/><bind calculate=\"concat('uuid:', uuid())\" nodeset=\"/Patient_Demographic_Form/meta/instanceID\" readonly=\"true()\" type=\"string\"/></model></h:head><h:body><input ref=\"/Patient_Demographic_Form/patient_demographics_title\"><label>Patient Demographics:</label></input><input ref=\"/Patient_Demographic_Form/patient_name\"><label>Name</label></input><input ref=\"/Patient_Demographic_Form/patient_age\"><label>Age</label></input><input appearance=\"no-calendar\" ref=\"/Patient_Demographic_Form/dob\"><label>Date of Birth</label></input><select1 ref=\"/Patient_Demographic_Form/gender\"><label>Sex</label><item><label>Female</label><value>female</value></item><item><label>Male</label><value>male</value></item></select1><input ref=\"/Patient_Demographic_Form/patient_mobile\"><label>Mobile Number</label></input></h:body></h:html>";
        doc.inputs = parseODK(doc.xml);
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
      condition: ~~ string for condition
      children: [ list of other inputs ]
    }
    */
    var x2js = new X2JS();
    var json = x2js.xml_str2json(xml);
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
        } else {
          inputs.push(parseInputObject(ele[key], key));
        }
      });
      return inputs;
    }
    function parseInputObject (ele, type) {
      var input = {};
      input.type = type;
      input._ref = ele._ref;
      input.label = ele.label;
      if (ele.item && Array.isArray(ele.item)) {
        input.choices = ele.item;
      }
      return input;
    }
    var inputs = gatherInputObjects(json.html.body);
    // sort by order of binds
    var binds = json.html.head.model.bind;
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
