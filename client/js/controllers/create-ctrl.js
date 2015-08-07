/**
 * Create Controller
 */

angular.module('RDash')
.controller('CreateCtrl', function CreateCtrl ($scope, Posts) {
  console.log("------------------------>inside controller")
  $scope.title = '';
  $scope.content = '';
  $scope.tags = [];
  $scope.post = {
    title: $scope.title, 
    content: $scope.content, 
    tags: $scope.tags
    }; //keys: title, content and tags
  console.log("----------------------------->", $scope.post);

  $scope.createPost = function() {
    console.log("----------------------------->clicked createPost");
    console.log("----------------------------->", $scope.title);

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
