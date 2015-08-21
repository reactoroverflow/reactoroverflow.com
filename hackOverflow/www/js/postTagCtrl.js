angular.module('hackOverflow.postTag', [])

.controller('PostTagCtrl', function($scope, $stateParams, Posts) {
  $scope.getPostsByTag = function() {
    $scope.data = {};
    Posts.getPostsByTag($stateParams.tagName, function (data) {
      $scope.data.posts = data;
      $scope.data.posts.forEach(function (post) {
        post._source.contentNoTags = post._source.content.replace(/(<([^>]+)>)/ig, '');
        post._source.upvotes = post._source.upvotes || [];
        post.votes = post._source.upvotes.length;
      });
    });
  };

  $scope.$on('$ionicView.enter', function () {
    $scope.getPostsByTag();
  });
});