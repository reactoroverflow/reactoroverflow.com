'use strict';
/**
 * PostList Controller
 */

angular.module('RDash')
.controller('PostListCtrl', ['$rootScope', '$scope', 'Posts', PostListCtrl]);

function PostListCtrl($rootScope, $scope, Posts) {
  $scope.data = {};

  $scope.getPosts = function() {
    
    Posts.getPosts(function(data) {
      $scope.data.posts = data;
      $scope.data.posts.forEach(function (post) {
        post._source.created_at = new Date(post._source.created_at).toString();
      });
    });
  };

  //receive the broadcast data from master-ctrl.js
  $rootScope.$on('showResults', function(event, args){
      console.log("I have received the boradcasted data === ", args);
      $scope.data.posts = args;
    });

  $scope.getPosts();
}
