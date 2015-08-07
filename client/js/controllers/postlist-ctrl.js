'use strict';
/**
 * PostList Controller
 */

angular.module('RDash')
.controller('PostListCtrl', ['$scope', 'Posts', PostListCtrl]);

function PostListCtrl($scope, Posts) {

  $scope.getPosts = function() {
    $scope.data = {};
    Posts.getPosts(function(data) {
      $scope.data.posts = data;
    });
  };

  $scope.getPosts();
}
