// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js

angular.module('hackOverflow', [
  'ionic',
  'ngCordova',
  'hackOverflow.controllers',
  'hackOverflow.services',
  'hackOverflow.postsView',
  'hackOverflow.post',
  'hackOverflow.tags',
  'hackOverflow.create',
  'hackOverflow.edit',
  'hackOverflow.postTag',
  'hackOverflow.pairs',
  'hackOverflow.profile'
])

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

.config(function($stateProvider, $urlRouterProvider, $httpProvider, $ionicConfigProvider) {
  $ionicConfigProvider.backButton.previousTitleText(false).text('');
  $stateProvider

    .state('app', {
    url: '/app',
    abstract: true,
    cache: false,
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

  .state('app.post', {
    url: '/posts/:postId',
    views: {
      'menuContent': {
        templateUrl: 'templates/post.html',
        controller: 'PostCtrl'
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

  .state('app.edit', {
    url: '/:postId/edit',
    views: {
      'menuContent': {
        templateUrl: 'templates/create.html',
        controller: 'EditCtrl'
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
  })

  // USER PROFILE
  .state('profileTabs', {
    url: "/user/:username",
    abstract: true,
    controller: 'ProfileCtrl',
    templateUrl: "templates/profile/tabs.html",
    cache: false,
    resolve:{
      username: ['$stateParams', function($stateParams){
        return $stateParams.username;
      }]
    }
  })
  .state('profileTabs.main', {
    url: "/main",
    views: {
      'main-tab': {
        templateUrl: "templates/profile/main.html",
        // controller: 'ProfileCtrl'
      }
    }
  })
  .state('profileTabs.bio', {
    url: "/bio",
    views: {
      'bio-tab': {
        templateUrl: "templates/profile/bio.html"
      }
    }
  })
  .state('profileTabs.social', {
    url: "/social",
    views: {
      'social-tab': {
        templateUrl: "templates/profile/social.html"
      }
    }
  });
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/app/posts');

  // add http interceptor
  $httpProvider.interceptors.push('checkResponse');

})
/**
 * @ngdoc service
 * @name checkResponse
 * @requires User
 * @description
 *   Sets the signed-in user by looking at server's response header
*/
.factory('checkResponse', function(User) {
  return {
    response: function(response) {
      User.setUser(response.headers().username);
      return response;
    }
  };
});
