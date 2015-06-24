'use strict';
angular.module('forms')
.controller('FieldEditCtrl', ['$scope', 'Fields', function ($scope, Fields) {
  console.log('Hello from your Controller: FieldEditCtrl in module forms:. This is your controller:', this);
  if ($scope.field && $scope.field.data) {
    $scope.data = $scope.field.data;
  }
  if (!$scope.data && $scope.initialData) {
    $scope.data = $scope.initialData;
  }
  if (!$scope.form && $scope.field.form) {
    $scope.form = $scope.field.form;
  }
  if (!$scope.form.xml) {
    $scope.form.xml = "<?xml version=\"1.0\"?><h:html xmlns=\"http://www.w3.org/2002/xforms\" xmlns:ev=\"http://www.w3.org/2001/xml-events\" xmlns:h=\"http://www.w3.org/1999/xhtml\" xmlns:jr=\"http://openrosa.org/javarosa\" xmlns:orx=\"http://openrosa.org/xforms\" xmlns:xsd=\"http://www.w3.org/2001/XMLSchema\"><h:head><h:title>Patient Demographics</h:title><model><instance><Patient_Demographic_Form id=\"patient_demographic\"><patient_demographics_title/><patient_name/><patient_age/><dob/><gender/><patient_mobile/><meta><instanceID/></meta></Patient_Demographic_Form></instance><bind nodeset=\"/Patient_Demographic_Form/patient_demographics_title\" readonly=\"true()\" type=\"string\"/><bind nodeset=\"/Patient_Demographic_Form/patient_name\" type=\"string\"/><bind nodeset=\"/Patient_Demographic_Form/patient_age\" type=\"int\"/><bind nodeset=\"/Patient_Demographic_Form/dob\" type=\"date\"/><bind nodeset=\"/Patient_Demographic_Form/gender\" type=\"select1\"/><bind nodeset=\"/Patient_Demographic_Form/patient_mobile\" type=\"int\"/><bind calculate=\"concat('uuid:', uuid())\" nodeset=\"/Patient_Demographic_Form/meta/instanceID\" readonly=\"true()\" type=\"string\"/></model></h:head><h:body><input ref=\"/Patient_Demographic_Form/patient_demographics_title\"><label>Patient Demographics:</label></input><input ref=\"/Patient_Demographic_Form/patient_name\"><label>Name</label></input><input ref=\"/Patient_Demographic_Form/patient_age\"><label>Age</label></input><input appearance=\"no-calendar\" ref=\"/Patient_Demographic_Form/dob\"><label>Date of Birth</label></input><select1 ref=\"/Patient_Demographic_Form/gender\"><label>Sex</label><item><label>Female</label><value>female</value></item><item><label>Male</label><value>male</value></item></select1><input ref=\"/Patient_Demographic_Form/patient_mobile\"><label>Mobile Number</label></input></h:body></h:html>";
  }
  function save() {
    if ($scope.field) {
      $scope.field.data = $scope.data;
    }
    Fields.save($scope.field).then(function (response) {
      $scope.field._id = response.id;
      $scope.field._rev = response.rev;
      if ($scope.close) {
        $scope.close();
      }
    });
  }
  $scope.save = save;
}]);
