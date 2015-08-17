'use strict';

/**
 * Post Controller
 */

angular.module('RDash')
.controller('PostCtrl', function PostCtrl($scope, $stateParams, $location, Posts, Comments) {
    $scope.data = {};

  $scope.fetch = function(){
    Posts.getPost($stateParams.postID, function (resp) {
      $scope.data.post = resp._source;
      $scope.data.post.created_at = new Date($scope.data.post.created_at).toString();
    });
    Comments.getComments($stateParams.postID, function (resp) {
      $scope.data.comments = resp;
      console.log("===========> " + $scope.data.comments);
      $scope.data.comments.forEach(function (comment) {
        comment._source.created_at = new Date(comment._source.created_at).toString();
      });
    });
  };

  $scope.fetch();

  $scope.createComment = function() {
    $scope.comment = {
      content: marked($scope.simplemde.value()),
      postID: $stateParams.postID
    }; //keys: content
    Comments.addComment($scope.comment)
    .then(function(resp) {
      console.log("===========> 2" + $scope.data.comments);
      resp._source.created_at = new Date(resp._source.created_at).toString();
      $scope.data.comments.push(resp);
    })
    .catch(function(error) {
      console.log(error);
    });
  };

  $scope.$on('$viewContentLoaded', function(){
    $scope.simplemde = new SimpleMDE({
      tabSize: 2
    });
    $scope.simplemde.render();
  });

});
