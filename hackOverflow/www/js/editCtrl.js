angular.module('hackOverflow.edit', [])

.controller('EditCtrl', function($scope, $state, $stateParams, Posts, Tags, $ionicHistory) {
  $scope.tags = Tags.tags;
  $scope.tagObj = {};


  $scope.fetch = function(){
    Posts.getPost($stateParams.postId, function (resp) {
      $scope.user = resp.headers().username;
      $scope.post = resp.data._source;
      $scope.post._id = resp.data._id;
      $scope.tags.forEach(function(tag) {
        if ($scope.post.tags.indexOf(tag) > -1) {
          $scope.tagObj[tag] = { checked: true };
        } else {
          $scope.tagObj[tag] = {checked: false};
        }
      });
    });
  };
  
  $scope.$on('$ionicView.enter', function () {
    $scope.fetch();
  });

  $scope.toggleTag = function(tag) {
    $scope.tagObj[tag].checked = !$scope.tagObj[tag].checked;
  };

  $scope.add = function() {
    var f = document.getElementById('file').files[0];
    var r = new FileReader();
    r.onloadend = function(e){
      console.log("ended");
      $scope.post.data = e.target.result;
      $scope.$apply();
    };
    r.readAsDataURL( f );
  };

  $scope.fileInput = function() {
    console.log('clicked')
    $('input').click();
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
    console.log($scope.post)
    // $scope.post = {
    //   title: $scope.post.title,
    //   content: marked($scope.post.content),
    //   tags: $scope.post.tags, //format: Tags: ["asdf","asdf"]
    //   data: $scope.data
    //   }; //keys: title, content and tags
    Posts.editPost($scope.post)
    .then(function(resp) {
      $ionicHistory.goBack(); //takes user to the post they created.
    })
    .catch(function(error) {
      console.log("err",error);
    });
  };
});
