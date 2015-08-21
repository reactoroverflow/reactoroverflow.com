angular.module('hackOverflow.post', [])

.controller('PostCtrl', function($scope, $state, $stateParams, Posts, Comments, $ionicPopup, $ionicHistory, $ionicScrollDelegate) {
  $scope.data = {};
  $scope.comment = {};
  $scope.commentBox = false;
  $scope.data.comments = [];
  $scope.fetch = function(){
    Posts.getPost($stateParams.postId, function (resp) {
      $scope.user = resp.headers().username;
      $scope.data.post = resp.data._source;
      resp.data._source.upvotes = resp.data._source.upvotes || [];
      $scope.data.post.votes = resp.data._source.upvotes.length;
      $scope.data.post._id = resp.data._id;
      if (resp.data._source.upvotes.indexOf($scope.user) > -1) {
        $scope.data.post.isUpvoted = true;
      } else {
        $scope.data.post.isUpvoted = false;
      }
    });
    Comments.getComments($stateParams.postId, function (resp) {
      $scope.user = $scope.user || resp.headers().username;
      $scope.data.comments = resp.data;
      $scope.data.comments.forEach(function (comment) {
        if (comment._source.upvotes.indexOf($scope.user) > -1) {
          comment.isUpvoted = true;
        } else {
          comment.isUpvoted = false;
        }
      });
    });
  };

  $scope.$on('$ionicView.enter', function () {
    $scope.fetch();
  });

  $scope.deletePost = function() {
    var confirm = $ionicPopup.confirm({
      title: "Delete Post",
      template: "Are you sure you want to delete this post?"
    });
    confirm.then(function(res) {
      if (res) {
        Posts.deletePost($scope.data.post);
        $ionicHistory.goBack();
      } else {
        console.log("NOOO!!!");
      }
    });
  };

  $scope.showComment = function() {
    if ($scope.commentBox) {
      $scope.commentBox = false;
      $ionicScrollDelegate.scrollBy(0, -150, true);
    } else {
      $scope.commentBox = true;
      $ionicScrollDelegate.scrollBy(0, 150, true);
    }
  };

  $scope.createComment = function() {
    var word = $scope.comment.word || '';
    $scope.comment = {
      content: marked(word),
      postID: $stateParams.postId
    }; //keys: content
    Comments.addComment($scope.comment)
    .then(function(resp) {
      resp.votes = resp.votes || 0;
      resp.isUpvoted = false;
      $scope.data.comments.push(resp);
      $ionicScrollDelegate.scrollBottom(true);
      $scope.comment.word = '';
    })
    .catch(function(error) {
      console.log(error);
    });
  };

  $scope.upVoteComment = function(comment, commentId) {
    //use commentID to send the user into the comment.upVotes array
    console.log("clicked")
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