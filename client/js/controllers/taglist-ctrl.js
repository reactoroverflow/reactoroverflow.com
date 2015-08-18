'use strict';
/**
 * PostList Controller
 */

angular.module('RDash')
.controller('TagListCtrl', ['$scope', '$stateParams', 'Posts', TagListCtrl]);

function TagListCtrl($scope, $stateParams, Posts) {

  $scope.getPostsByTag = function(tag) {
    $scope.data = {};
    Posts.getPostsByTag($stateParams.tagName, function (data) {
      $scope.data.posts = data;
      $scope.data.posts.forEach(function (post) {
        post._source.created_at = new Date(post._source.created_at).toString();
        post._source.contentNoTags = post._source.content.replace(/(<([^>]+)>)/ig, '');
      });
    });
  };

  $scope.getPostsByTag();
}
