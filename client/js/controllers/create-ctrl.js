/**
 * Create Controller
 */

angular.module('RDash')
.controller('CreateCtrl', function CreateCtrl($scope, Posts) {
  $scope.title = '';
  $scope.content = '';
  $scope.tags = [];
  $scope.post = {
    title: $scope.title, 
    content: $scope.content, 
    tags: $scope.tags
    }; //keys: title, content and tags
  $scope.createPost = function() {
    console.log("----------------------------->", $scope.post);
    Posts.addPost($scope.post)
    .then(function() {
      $location.path('#'); //takes user to the post they created.
    })
    .catch(function(error) {
      console.log(error);
    })
      
    
  }
});
