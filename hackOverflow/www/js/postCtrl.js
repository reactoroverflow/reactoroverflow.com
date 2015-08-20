angular.module('hackOverflow.post', [])

.controller('PostCtrl', function($scope, $stateParams, Posts, Comments) {
  $scope.data = {};
  $scope.comment = {};
  $scope.showComment = false;
  $scope.fetch = function(){
    Posts.getPost($stateParams.postId, function (resp) {
      $scope.user = resp.headers().username;
      console.log($scope.user);
      $scope.data.post = resp.data._source;
      $scope.data.post.votes = resp.data._source.upvotes.length;
      $scope.data.post._id = resp._id;
      $scope.data.post.created_at = new Date($scope.data.post.created_at).toString();
      if (resp.data._source.upvotes.indexOf($scope.user) > -1) {
        $scope.data.post.isUpvoted = true;
      }
    });
    Comments.getComments($stateParams.postId, function (resp) {
      $scope.data.comments = resp || [];
      $scope.data.comments.forEach(function (comment) {
        comment._source.created_at = new Date(comment._source.created_at).toString();
        if (comment._source.upvotes.indexOf($scope.user) > -1) {
          comment.isUpvoted = true;
        }
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
    // comment.isUpvoted = true;
    if (comment.isUpvoted) {
      Comments.downVote(commentId).then(function(resp) {
        if (resp.status === 204) {
          comment.votes--;
          comment.isUpvoted = false;
        }
      });
    } else {
      Comments.upVote(commentId).then(function(resp) {
        if (resp.status === 204) {
          comment.votes++;
          comment.isUpvoted = true;
        }
      });
    }
  };

  $scope.upVotePost = function(post, postId) {
    if ($scope.data.post.isUpvoted) {
      Posts.downVote(postId).then(function(resp) {
        if (resp.status === 204) {
          $scope.data.post.votes--;
          $scope.data.post.isUpvoted = false;
        }
      });
    } else {
      Posts.upVote(postId).then(function(resp) {
        if (resp.status === 204) {
          $scope.data.post.votes++;
          $scope.data.post.isUpvoted = true;
        }
      });
    }
  };

});