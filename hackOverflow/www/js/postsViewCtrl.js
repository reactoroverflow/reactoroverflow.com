angular.module('hackOverflow.postsView', [])

// .controller('PostsViewCtrl', function($scope) {
//   $scope.playlists = [
//     { title: 'Reggae', id: 1 },
//     { title: 'Chill', id: 2 },
//     { title: 'Dubstep', id: 3 },
//     { title: 'Indie', id: 4 },
//     { title: 'Rap', id: 5 },
//     { title: 'Cowbell', id: 6 }
//   ];
// });

.controller('PostsViewCtrl', function($scope, $rootScope, Posts){

  $scope.post = {
    _source: {title: "Title", author: "Jay", created_at: "Timestamp", content: "WHAT"}
  }
  var testData = [$scope.post, $scope.post];

  $scope.data = {};
  $scope.getPosts = function() {  
    console.log("IN HERE")
    // Posts.getPosts(function(data) {
      console.log("NOW HERE")
      $scope.data.posts = testData;
      
      // $scope.data.posts = data;
      $scope.data.posts.forEach(function (post) {
        post._source.created_at = new Date(post._source.created_at).toString();
        post._source.contentNoTags = post._source.content.replace(/(<([^>]+)>)/ig, '');
      });
    // });
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