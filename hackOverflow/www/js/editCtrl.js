angular.module('hackOverflow.edit', [])

.controller('EditCtrl', function($scope, $state, $stateParams, Posts, Tags) {
  $scope.tags = Tags.tags;
  $scope.tagObj = {};


  $scope.fetch = function(){
    Posts.getPost($stateParams.postId, function (resp) {
      $scope.user = resp.headers().username;
      $scope.post = resp.data._source;
      $scope.post._id = resp.data._id;
      console.log($scope.post)
      $scope.tags.forEach(function(tag) {
        if ($scope.post.tags.indexOf(tag) > -1) {
          $scope.tagObj[tag] = { checked: true };
        } else {
          $scope.tagObj[tag] = {checked: false};
        }
      });
    });
  };

  $scope.fetch();

  $scope.toggleTag = function(tag) {
    $scope.tagObj[tag].checked = !$scope.tagObj[tag].checked;
  };

  $scope.submitPost = function() {
    $scope.post.tags = [];
    var text = $scope.post.content || '';
    $scope.post.content = marked(text);
    for (var i in $scope.tagObj) {
      if ($scope.tagObj[i].checked) {
        $scope.post.tags.push(i);
      }
    }
    // $scope.post = {
    //   title: $scope.post.title,
    //   content: marked($scope.post.content),
    //   tags: $scope.post.tags, //format: Tags: ["asdf","asdf"]
    //   data: $scope.data
    //   }; //keys: title, content and tags

    Posts.editPost($scope.post)
    .then(function(resp) {
      init();
      console.log(resp._id);
      $state.go('app.post', {postId: resp._id}); //takes user to the post they created.
    })
    .catch(function(error) {
      console.log("err",error);
    });
  };
});
