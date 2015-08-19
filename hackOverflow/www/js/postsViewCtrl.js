angular.module('hackOverflow.postsView', [])
.controller('PostsViewCtrl', function($scope, $rootScope, Posts){
  $scope.data = {};
  $scope.getPosts = function() {  
    Posts.getPosts(function(data) {
      console.log("data", data)
      
      $scope.data.posts = data;
      $scope.data.posts.forEach(function (post) {
        post._source.created_at = new Date(post._source.created_at).toString();
        post._source.contentNoTags = post._source.content.replace(/(<([^>]+)>)/ig, '');
      });
    });
    // post._source.title = "What is Angular?";
    // post._source.author = "Jay";
    // post._source.created_at = 'Mon Aug 17 2015 18:28:59 GMT-0700 (PDT)';
  };

  // receive the broadcast data from master-ctrl.js
  $rootScope.$on('showResults', function(event, args){
    console.log("I have received the boradcasted data === ", args);
    $scope.data.posts = args;
  });

  $scope.getPosts();
});