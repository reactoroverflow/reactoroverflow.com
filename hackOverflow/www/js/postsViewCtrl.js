angular.module('hackOverflow.postsView', [])
.controller('PostsViewCtrl', function($scope, $rootScope, Posts){
  $scope.data = {};
  $scope.getPosts = function() {
    Posts.getPosts(function(data) {
      $scope.data.posts = data;
      $scope.data.posts.forEach(function (post) {
        post._source.contentNoTags = post._source.content.replace(/(<([^>]+)>)/ig, '');
        post._source.upvotes = post._source.upvotes || [];
        post.votes = post._source.upvotes.length;
      });
    });
    
  };

  // receive the broadcast data from master-ctrl.js
  $rootScope.$on('showResults', function(event, args){
    console.log("I have received the broadcasted data === ", args);
    $scope.data.posts = args;
  });

  $scope.$on('$ionicView.enter', function () {
    $scope.getPosts();
  });
});