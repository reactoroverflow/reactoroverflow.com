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
    });
  };

  $scope.getPostsByTag();
}
