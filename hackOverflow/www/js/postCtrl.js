angular.module('hackOverflow.post', [])

.controller('PostCtrl', function($scope, $stateParams, Posts, Comments) {
  $scope.data = {};
  $scope.showComment = false;
  $scope.fetch = function(){
    Posts.getPost($stateParams.postId, function (resp) {
      $scope.data.post = resp._source;
      $scope.data.post.created_at = new Date($scope.data.post.created_at).toString();
    });
    Comments.getComments($stateParams.postId, function (resp) {
      $scope.data.comments = resp;
      $scope.data.comments.forEach(function (comment) {
        comment._source.created_at = new Date(comment._source.created_at).toString();
      });
    });
  };

  $scope.fetch();

  $scope.createComment = function() {
    var text = $scope.text || '';
    $scope.comment = {
      content: marked(text),
      postID: $stateParams.postId
    }; //keys: content
    Comments.addComment($scope.comment)
    .then(function(resp) {
      resp._source.created_at = new Date(resp._source.created_at).toString();
      resp.votes = resp.votes || 0;
      $scope.data.comments.push(resp);
      $scope.simplemde.value('');
    })
    .catch(function(error) {
      console.log(error);
    });
  };

  $scope.upVoteComment = function(commentId) {
    //use commentID to send the user into the comment.upVotes array
    Comments.upVote(commentId).then(function() {
      $scope.fetch();
    });
  };

  $scope.upVotePost = function(postId) {
    Posts.upVote(postId).then(function() {
      $scope.fetch();
    });
  };

});