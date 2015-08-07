'use strict';
/**
 * PostList Controller
 */

angular.module('RDash')
.controller('PostListCtrl', ['$scope', 'Posts', PostListCtrl]);

function PostListCtrl($scope, Posts) {

  $scope.getPosts = function() {
    Posts.getPosts(function(data) {
      $scope.data.posts = data;
      console.log('===========', data);
    });
  };

  $scope.getPosts();
}
