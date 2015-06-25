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
      if (!doc.xml) {
        doc.xml = "<?xml version=\"1.0\"?><h:html xmlns=\"http://www.w3.org/2002/xforms\" xmlns:ev=\"http://www.w3.org/2001/xml-events\" xmlns:h=\"http://www.w3.org/1999/xhtml\" xmlns:jr=\"http://openrosa.org/javarosa\" xmlns:orx=\"http://openrosa.org/xforms\" xmlns:xsd=\"http://www.w3.org/2001/XMLSchema\"><h:head><h:title>General Case</h:title><model><instance><GeneralCase id=\"general_case\"><description/><gender/><symptom/><female_symptom/><injury><any_bleeding/><bleeding_note/><injury_sustained><injury_how/><injury_fall/><injury_hit/><injury_violence/><injury_when/><injury_problem/><injury_cant_move/></injury_sustained></injury></GeneralCase></instance><bind nodeset=\"/GeneralCase/description\" readonly=\"true()\" type=\"string\"/><bind nodeset=\"/GeneralCase/gender\" type=\"select1\"/><bind nodeset=\"/GeneralCase/symptom\" type=\"select\"/><bind nodeset=\"/GeneralCase/female_symptom\" relevant=\" /GeneralCase/gender  = 'female'\" type=\"select\"/><bind nodeset=\"/GeneralCase/injury\" relevant=\"selected( /GeneralCase/symptom , 'injury')\"/><bind nodeset=\"/GeneralCase/injury/any_bleeding\" type=\"select1\"/><bind nodeset=\"/GeneralCase/injury/bleeding_note\" readonly=\"true()\" relevant=\" /GeneralCase/injury/any_bleeding ='yes'\" type=\"string\"/><bind nodeset=\"/GeneralCase/injury/injury_sustained\" relevant=\" /GeneralCase/injury/any_bleeding ='no'\"/><bind nodeset=\"/GeneralCase/injury/injury_sustained/injury_how\" type=\"select1\"/><bind nodeset=\"/GeneralCase/injury/injury_sustained/injury_fall\" relevant=\" /GeneralCase/injury/injury_sustained/injury_how  = 'fall'\" type=\"select1\"/><bind nodeset=\"/GeneralCase/injury/injury_sustained/injury_hit\" relevant=\" /GeneralCase/injury/injury_sustained/injury_how  = 'hit'\" type=\"select1\"/><bind nodeset=\"/GeneralCase/injury/injury_sustained/injury_violence\" relevant=\" /GeneralCase/injury/injury_sustained/injury_how  = 'violence'\" type=\"string\"/><bind nodeset=\"/GeneralCase/injury/injury_sustained/injury_when\" type=\"string\"/><bind nodeset=\"/GeneralCase/injury/injury_sustained/injury_problem\" type=\"select1\"/><bind nodeset=\"/GeneralCase/injury/injury_sustained/injury_cant_move\" relevant=\" /GeneralCase/injury/injury_sustained/injury_problem  = 'cant_move'\" type=\"string\"/></model></h:head><h:body><input ref=\"/GeneralCase/description\"><label>General Case Form</label></input><select1 ref=\"/GeneralCase/gender\"><label>Sex</label><item><label>Female</label><value>female</value></item><item><label>Male</label><value>male</value></item></select1><select ref=\"/GeneralCase/symptom\"><label>Symptoms</label><hint>Select one or more symptoms</hint><item><label>Injury</label><value>injury</value></item><item><label>Pain</label><value>pain</value></item><item><label>Fever</label><value>fever</value></item><item><label>Swelling</label><value>swelling</value></item><item><label>Skin Rash</label><value>skin_rash</value></item><item><label>Eye Problem</label><value>eye_problem</value></item><item><label>Ear Problem</label><value>ear_problem</value></item><item><label>Acidity or Indigestion</label><value>acidity</value></item><item><label>Vomiting</label><value>vomiting</value></item><item><label>Diarrhea</label><value>diarrhea</value></item><item><label>Yellow Urine</label><value>yellow_urine</value></item><item><label>Blood with Stool</label><value>bloody_stool</value></item><item><label>Difficulty in Breathing</label><value>difficulty_breathing</value></item><item><label>Weakness</label><value>weakness</value></item><item><label>Dizziness</label><value>dizziness</value></item><item><label>Other Symptom</label><value>other</value></item><item><label>None</label><value>none</value></item></select><select ref=\"/GeneralCase/female_symptom\"><label>Female Only Symptoms</label><item><label>Period Problem</label><value>period_problem</value></item><item><label>Pregnancy</label><value>pregnancy</value></item><item><label>new_born_baby</label><value>new_baby</value></item></select><group ref=\"/GeneralCase/injury\"><label>Injury</label><select1 ref=\"/GeneralCase/injury/any_bleeding\"><label>Any bleeding?</label><item><label>Yes</label><value>yes</value></item><item><label>No</label><value>no</value></item></select1><input ref=\"/GeneralCase/injury/bleeding_note\"><label>Send Patient immediately to nearest hospital after bandaging the part.</label></input><group ref=\"/GeneralCase/injury/injury_sustained\"><label>Non-bleeding Injury</label><select1 ref=\"/GeneralCase/injury/injury_sustained/injury_how\"><label>How was it sustained?</label><item><label>Fall</label><value>fall</value></item><item><label>Hit By</label><value>hit</value></item><item><label>Crushed in Machine</label><value>machine</value></item><item><label>Violence</label><value>violence</value></item></select1><select1 appearance=\"minimal\" ref=\"/GeneralCase/injury/injury_sustained/injury_fall\"><label>Fall from:</label><item><label>At home</label><value>home</value></item><item><label>On road</label><value>road</value></item><item><label>From height</label><value>height</value></item></select1><select1 appearance=\"minimal\" ref=\"/GeneralCase/injury/injury_sustained/injury_hit\"><label>Hit by:</label><item><label>Car</label><value>car</value></item><item><label>Bike</label><value>bike</value></item><item><label>Cycle</label><value>cycle</value></item></select1><input ref=\"/GeneralCase/injury/injury_sustained/injury_violence\"><label>With what:</label></input><input ref=\"/GeneralCase/injury/injury_sustained/injury_when\"><label>When was it sustained?</label></input><select1 appearance=\"minimal\" ref=\"/GeneralCase/injury/injury_sustained/injury_problem\"><label>What is the problem?</label><item><label>Can't Walk</label><value>cant_walk</value></item><item><label>Can't Move</label><value>cant_move</value></item><item><label>N/A</label><value>na</value></item></select1><input ref=\"/GeneralCase/injury/injury_sustained/injury_cant_move\"><label>Which part can't you move?</label></input></group></group></h:body></h:html>";
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
