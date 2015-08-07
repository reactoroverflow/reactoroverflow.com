/**
 * PostList Controller
 */

angular.module('RDash')
.controller('PostListCtrl', function ($rootScope, $scope, Posts) {

  $scope.data = {};

  $scope.getPosts = function() {
    Posts.getPosts(function(data) {
      $scope.data.posts = data;
      console.log('===========', data);
    });
  };

  $scope.getPosts();
});
