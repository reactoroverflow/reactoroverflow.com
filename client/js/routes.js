'use strict';

/**
 * Route configuration for the RDash module.
 */
angular.module('RDash')
.config(['$stateProvider', '$urlRouterProvider',
  function($stateProvider, $urlRouterProvider) {

    // For unmatched routes
    $urlRouterProvider.otherwise('/');

    // Application routes
    $stateProvider
      .state('postList', {
        url: '/',
        templateUrl: 'templates/postlist.html',
        controller: 'PostListCtrl'
      })
      .state('post', {
        url: '/post',
        templateUrl: 'templates/post.html',
        controller: 'PostCtrl'
      })
      .state('ask', {
        url: '/ask',
        templateUrl: 'templates/create.html',
        controller: 'AskCtrl'
      })
      .state('tables', {
        url: '/tables',
        templateUrl: 'templates/tables.html'
      });
    }
]);
