'use strict';

/**
 * Create Controller
 */

angular.module('RDash')
.controller('CreateCtrl', function CreateCtrl ($scope, Posts) {
  $scope.title = '';
  $scope.content = '';
  $scope.tags = [];
  $scope.createPost = function() {
    $scope.post = {
      title: $scope.title, 
      content: $scope.content, 
      tags: $scope.tags
      }; //keys: title, content and tags
    Posts.addPost($scope.post)
    .then(function() {
      $location.path('#'); //takes user to the post they created.
    })
    .catch(function(error) {
      console.log(error);
    });
  };
});
