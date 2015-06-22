'use strict';
angular.module('main', [
  'ionic',
  'ngCordova',
  'ui.router',
  'yaru22.angular-timeago',
  // TODO: load other modules selected during generation
])
.config(function ($ionicConfigProvider) {
  $ionicConfigProvider.views.maxCache(0);
})
.run(['Config', 'pouchDB', function (Config, pouchDB) {
  if (!Config.ENV.CLINICS) {
    return false;
  }
  console.log('MAIN: Init clinics');
  function initClinicDB(id, docs) {
    var local = new pouchDB(id);
    docs.forEach(function (doc) {
      local.put(doc);
    });
    console.log("MAIN: Put " + docs.length + " records into " + id);
  }
  Object.keys(Config.ENV.CLINICS).forEach(function (clinic_id) {
    var local = new pouchDB(clinic_id);
    local.destroy();
    initClinicDB(clinic_id, Config.ENV.CLINICS[clinic_id]);
  });
}]);
