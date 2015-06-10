'use strict';
angular.module('forms')
.constant('Config', {

  // gulp environment: injects environment vars
  // https://github.com/mwaylabs/generator-m#gulp-environment
  ENV: {
    /*inject-env*/
    'FORMS': [
      {
        '_id': 'test',
        'label': 'Test Form',
        'fields': [
          {
            'name': 'age',
            'label': 'Age',
            'type': 'number',
            'persistant': true,
            'validators': []
          },
          {
            'name': 'ice_cream',
            'label': 'Favoriteicecreamflavor',
            'type': 'select',
            'choices': [
              {
                'label': 'Chocolate',
                'value': 'chocolate'
              },
              {
                'label': 'Vanilla',
                'value': 'notchocolate'
              }
            ],
            'persistant': false,
            'validators': []
          }
        ]
      },
      {
        '_id': 'container_form',
        'label': 'Container Form',
        'fields': [
          {
            'name': 'name',
            'label': 'Full Name',
            'type': 'text',
            'persistant': true
          },
          {
            'name': 'sub',
            'label': 'Test Sub Form',
            'type': 'form',
            'include': 'test',
            'persistant': true
          }
        ]
      },
      {
        '_id': 'demographics',
        'label': 'Patient Demographics',
        'fields': [
          {
            'name': 'name',
            'label': 'Full Name',
            'type': 'text',
            'persistant': true
          },
          {
            'name': 'age',
            'label': 'Age',
            'type': 'number',
            'persistant': true,
            'units': [
              {
                'label': 'Years',
                'value': 'years'
              },
              {
                'label': 'Months',
                'value': 'months'
              }
            ]
          },
          {
            'name': 'mobile',
            'label': 'Mobile Number',
            'type': 'number',
            'persistant': true
          }
        ]
      }
    ]
    /*endinject*/
  },

  // gulp build-vars: injects build vars
  // https://github.com/mwaylabs/generator-m#gulp-build-vars
  BUILD: {
    /*inject-build*/
    /*endinject*/
  }

});
