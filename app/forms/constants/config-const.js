'use strict';
angular.module('forms')
.constant('Config', {

  // gulp environment: injects environment vars
  // https://github.com/mwaylabs/generator-m#gulp-environment
  ENV: {
    /*inject-env*/
    "SERVER_URL": "https://DEVSERVER/api",
    "FORMS":[
      {
        "_id":"test",
        "label":"Test Form",
        "fields":[
          {
            "name":"age",
            "label":"Age",
            "type":"number",
            "persistant":true,
            "validators":[],
          },
          {
            "name":"ice_cream",
            "label":"Favorite ice cream flavor",
            "type":"select",
            "choices": [
              {
                "label":"Chocolate",
                "value":"chocolate",
              },
              {
                "label":"Vanilla",
                "value":"not chocolate",
              }
            ],
            "persistant": false,
            "validators":[]
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
