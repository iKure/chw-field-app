'use strict';
angular.module('main', [
  'ionic',
  'ngCordova',
  'ui.router',
  // TODO: load other modules selected during generation
])
.config(function ($stateProvider, $urlRouterProvider) {

  console.log('Allo! Allo from your module: ' + 'main');

  $urlRouterProvider.otherwise('/tab/main');

  // some basic routing
  $stateProvider
    .state('tabs', {
      url: '/tab',
      abstract: true,
      templateUrl: 'main/templates/tabs.html'
    })
    .state('tabs.main', {
      url: '/main',
      views: {
        'tabs-main': {
          templateUrl: 'main/templates/start.html',
          controller: 'StartCtrl as start'
        }
      }
    })
    .state('tabs.directory', {
      url: '/directory',
      views: {
        'tabs-directory': {
          templateUrl: 'patients/templates/list.html',
        }
      }
    })
    .state('tabs.register', {
      url: '/register',
      views: {
        'tabs-register': {
          templateUrl: 'patients/templates/register.html',
        }
      }
    })
    .state('tabs.patient', {
      url: '/patient/:id',
      abstract: true,
      views: {
        'tabs-patient':{
          templateUrl: 'patients/templates/menu-side.html',
          controller: 'ProfileCtrl as profile',
        }
      }
    });
});
