'use strict';

/**
 * Post Controller
 */

angular.module('RDash')
.controller('PostCtrl', function PostCtrl($scope, $stateParams, $location, Posts, Comments) {
  $scope.data = {};
  $scope.content = '';

  $scope.fetch = function(){
    Posts.getPost($stateParams.postID, function (resp) {
      $scope.data.post = resp._source;
    });
  };

  $scope.fetch();

  $scope.createComment = function() {
    $scope.content = $scope.simplemde.value();
    $scope.comment = {
      content: $scope.content
      }; //keys: content
    // console.log("$scope.comment",$scope.comment);
    Comments.addComment($scope.comment)
    .then(function(resp) {
      $location.reload(); //takes user to the post they created.
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
