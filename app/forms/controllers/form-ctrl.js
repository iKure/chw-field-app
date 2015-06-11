'use strict';
angular.module('forms')
.controller('FormCtrl', ['$scope', 'Forms', 'Fields', function ($scope, Forms, Fields) {

  console.log('Hello from your Controller: FormCtrl in module forms:. This is your controller:', this);

  $scope.form = {};
  $scope.data = {};
  if ($scope.initialData) {
    $scope.data = $scope.initialData;
  }

  if (!$scope.close) {
    $scope.close = function () {
      console.log("FormCtrl: Default close function");
    }
  }

  if ($scope.fieldId) {
    getField($scope.fieldId);
  }else if ($scope.formType) {
    getForm($scope.formType);
  }

  function getForm (type) {
    console.log('FormCtrl: Getting form type: ' + type);
    var promise = Forms.get(type);
    promise.then( function (doc) {
      console.log('FormCtrl: Got form type: ' + doc._id);
      $scope.form = doc;
      $scope.data.form_id = doc._id;
    }).catch( function (err) {
      console.log('FormCtrl: Could not find form template type: ' + type);
      // not sure what the error state should be....
    });
  }

  function getField (id) {
    console.log('FormCtrl: Getting form id: ' + id);
    var promise = Fields.get(id).then(function (doc) {
      console.log('FormCtrl: Got form id: ' + id);
      $scope.data = doc;
      if (doc.form_id) {
        getForm(doc.form_id);
      }
    }).catch(function (err) {
      console.log('FormCtrl: Could not find form id: ' + id);
    });
  }

  function save() {
    var timeout = false;
    var saving = [];
    // Set listeners to check for saved events
    $scope.$on('field.saving', function (event, name) {
      console.log("FormCtrl: Got saving from: " + name);
      saving.push(name);
    });
    $scope.$on('field.saved', function (event, name) {
      console.log("FormCtrl: " + name + ": is saved");
      saving.splice(saving.indexOf(name), 1);
    });

    function close () {
      if (saving.length > 0) {
        console.log('FormCtrl: Waiting for ' + saving);
        closeTimeout(100);
        return false;
      }
      console.log('FormCtrl: Closing');
      if ($scope.close) {
        $scope.close();
      }
    }
    function closeTimeout (duration) {
      console.log('FormCtrl: Set close timeout: ' + duration);
      return setTimeout(close, duration);
    }

    if ($scope.form) {
      $scope.data.form_id = $scope.form._id;
      $scope.data.form_label = $scope.form.label;
    }

    if ($scope.label) {
      $scope.data.form_label = $scope.label;
    }

    Fields.save($scope.data).then(function (response) {
      $scope.data._id = response.id;
      $scope.data._rev = response.rev;
      $scope.$broadcast('field.save', response.id);
      closeTimeout(100);
    });
  }
  $scope.save = save;

}]);
