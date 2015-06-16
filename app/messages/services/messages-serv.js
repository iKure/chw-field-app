'use strict';
angular.module('messages')
.service('Messages', ['$rootScope', '$q', 'Config', 'pouchDB', 'Auth', function ($rootScope, $q, Config, pouchDB, Auth) {
  console.log('Hello from your Service: Messages in module messages');

  var dbName = 'messages';
  if (Config.ENV.SaltDB) {
    dbName = dbName + '-' + Config.ENV.SaltDB;
  }

  var localDB = new pouchDB(dbName);
  var remoteDB = false;
  if (Config.ENV.SERVER_URL) {
    var fullUrl = Config.ENV.SERVER_URL + dbName;
    console.log("MessagesService: connecting to " + fullUrl);
    remoteDB = new pouchDB(fullUrl);
    var syncHandler = localDB.sync(remoteDB, {
      live: true,
      retry: true
    }).on('change', function (replication) {
      if (replication.direction == 'pull') {
        $rootScope.$broadcast('messages.update');
      }
    });
  }

  var service = {};

  function groupByThread (results) {
    var threadGroups = {}
    results.rows.forEach(function (row) {
      var doc = row.doc;
      if (!threadGroups[doc.thread_id]) {
        threadGroups[doc.thread_id] = []
      }
      threadGroups[doc.thread_id].push(doc);
    });
    var threads = [];
    Object.keys(threadGroups).forEach(function (key) {
      threads.push(organizeThread(threadGroups[key]));
    });
    threads.sort(function (a, b) {
      return +(a.date_modified > b.date_modified) || +(a.date_modified === b.date_modified) - 1;
    });
    threads.reverse();
    return threads;
  }

  function organizeThread (docs) {
    var threadObj = {
      messages:[],
      participants: [],
    };
    function addMessage (doc) {
      if (!threadObj.messages) {
        threadObj.messages = [];
      }
      threadObj.messages.push(doc);
      if (!threadObj.date_modified || doc.date_created > threadObj.date_modified) {
        threadObj.date_modified = doc.date_created;
      }
      if (!threadObj.date_created || doc.date_created < threadObj.date_created) {
        threadObj.date_created = doc.date_created;
      }
    }
    docs.forEach(function (doc) {
      threadObj._id = doc.thread_id;
      if (doc.body) {
        addMessage(doc);
      }
    });
    threadObj.messages.sort(function (a, b) {
      return +(a.date_created > b.date_created) || +(a.date_created === b.date_created) - 1;
    });
    return threadObj;
  }

  function get(id) {
    console.log('MessagesService: Getting message thread ' + id);
    var deferred = $q.defer();
    localDB.query({
      map: function (doc, emit) {
        emit(doc.thread_id);
      }
    }, {
      key: id,
      include_docs: true,
      group: true,
    }).then(function (results) {
      console.log('MessagesService: Got results ' + results.rows.length);
      var threads = groupByThread(results);
      if (threads.length < 1) {
        deferred.reject(false);
      } else {
        deferred.resolve(threads[0]);
      }
    });
    return deferred.promise;
  }
  service.get = get;

  function list (extra_matches) {
    console.log('MessagesService: Getting messages for ' + extra_matches);
    var deferred = $q.defer();

    var matches = {};
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
    });

    promise.then(function (docs) {
      var threads = groupByThread(docs);
      console.log('MessagesService: Got ' + threads.length + ' threads');
      deferred.resolve(threads);
    });

    return deferred.promise;
  }
  service.list = list;

  function save (message) {
    console.log("MessagesService: Saving " + message.body);
    message.date_created = Date.now();
    message.sender = Auth.currentUser.name;

    var deferred = $q.defer();
    localDB.post(message).then(function (response) {
      console.log("MessagesService: Saved message " + response.id);
      localDB.get(response.id).then(function (doc) {
        deferred.resolve(doc);
      });
    });
    return deferred.promise;
  }
  service.save = save;

  return service;
}]);
