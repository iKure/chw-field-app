'use strict';
angular.module('forms')
.service('FormAdd', ['$rootScope', '$q', '$ionicPopup', 'Forms', function ($rootScope, $q, $ionicPopup, Forms) {
  console.log('Hello from your Service: Form-add in module forms');
  return {
    show: function (ids) {
      var deferred = $q.defer();
      Forms.all(ids).then(function (results) {
        var popUpScope = $rootScope.$new(true);
        popUpScope.forms = results;
        popUpScope.choose = function (form_id) {
          myPopup.close();
          deferred.resolve(form_id);
        }
        var myPopup = $ionicPopup.show({
          templateUrl: 'forms/templates/form-popup-list.html',
          title: 'Pick a form to add',
          scope: popUpScope,
          buttons: [
            { text: 'Cancel' }
          ]
        });
      });
      return deferred.promise;
    }
  };
}]);
