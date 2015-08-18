// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('hackOverflow', ['ionic', 'hackOverflow.controllers', 'hackOverflow.postsView', 'hackOverflow.tags', 'hackOverflow.create', 'hackOverflow.postTag', 'hackOverflow.pairs'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider

    .state('app', {
    url: '/app',
    abstract: true,
    templateUrl: 'templates/menu.html',
    controller: 'AppCtrl'
  })

  .state('app.posts', {
    url: '/posts',
    views: {
      'menuContent': {
        templateUrl: 'templates/posts-view.html',
        controller: 'PostsViewCtrl'
      }
    }
  })

  .state('app.tags', {
    url: '/tags',
    views: {
      'menuContent': {
        templateUrl: 'templates/tags.html',
        controller: 'TagsCtrl'
      }
    }
  })

  .state('app.create', {
    url: '/create',
    views: {
      'menuContent': {
        templateUrl: 'templates/create.html',
        controller: 'CreateCtrl'
      }
    }
  })

  .state('app.tag', {
    url: '/tags/:tagName',
    views: {
      'menuContent': {
        templateUrl: 'templates/posts-view.html',
        controller: 'PostTagCtrl'
      }
    }
  })

  .state('app.pairs', {
    url: '/pairs',
    views: {
      'menuContent': {
        templateUrl: 'templates/pairs.html',
        controller: 'PairsCtrl'
      }
    }
  });
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/app/posts');
});
