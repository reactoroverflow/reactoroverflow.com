angular.module('hackOverflow.create', [])

.controller('CreateCtrl', function($scope, $state, $cordovaCamera, Posts, Tags, $ionicHistory) {

  var init = function () {
    $scope.tags = Tags.tags;
    $scope.tagObj = {};
    $scope.tags.forEach(function(tag) {
      $scope.tagObj[tag] = {checked: false};
    });
    $scope.post = {tags: []};
  };

  $scope.$on('$ionicView.enter' , function () {
    init();
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
    $('input').click();
  };

  $scope.submitPost = function() {
    var text = $scope.post.content || '';
    for (var i in $scope.tagObj) {
      if ($scope.tagObj[i].checked) {
        $scope.post.tags.push(i);
      }
    }
    $scope.post = {
      title: $scope.post.title,
      content: marked(text),
      tags: $scope.post.tags, //format: Tags: ["asdf","asdf"]
      data: $scope.post.data
      };
    // $scope.post = {
    //   title: $scope.post.title,
    //   content: marked($scope.post.content),
    //   tags: $scope.post.tags, //format: Tags: ["asdf","asdf"]
    //   data: $scope.data
    //   }; //keys: title, content and tags

    Posts.addPost($scope.post)
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
