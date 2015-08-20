angular.module('hackOverflow.post', [])

.controller('PostCtrl', function($scope, $stateParams, Posts, Comments) {
  $scope.data = {};
  $scope.comment = {};
  $scope.showComment = false;
  $scope.fetch = function(){
    Posts.getPost($stateParams.postId, function (resp) {
      $scope.data.post = resp._source;
      $scope.data.post._id = resp._id;
      $scope.data.post.created_at = new Date($scope.data.post.created_at).toString();
    });
    Comments.getComments($stateParams.postId, function (resp) {
      $scope.data.comments = resp || [];
      $scope.data.comments.forEach(function (comment) {
        comment._source.created_at = new Date(comment._source.created_at).toString();
        comment.isUpvoted = false;
      });
    });
  };

  $scope.fetch();

  $scope.createComment = function() {
    var word = $scope.comment.word || '';
    $scope.comment = {
      content: marked(word),
      postID: $stateParams.postId
    }; //keys: content
    Comments.addComment($scope.comment)
    .then(function(resp) {
      resp._source.created_at = new Date(resp._source.created_at).toString();
      resp.votes = resp.votes || 0;
      $scope.data.comments.push(resp);
      $scope.comment.word = '';
    })
    .catch(function(error) {
      console.log(error);
    });
  };

  $scope.upVoteComment = function(comment, commentId) {
    //use commentID to send the user into the comment.upVotes array
    comment.isUpvoted = true;
    Comments.upVote(commentId).then(function(resp) {
      if (resp.status === 204) {
        comment.votes++;
      }
    });
  };

  $scope.upVotePost = function(post, postId) {
    Posts.upVote(postId).then(function() {
      post.votes++;
    });
  };

});