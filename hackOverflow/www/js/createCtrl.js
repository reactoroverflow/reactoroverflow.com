angular.module('hackOverflow.create', [])

.controller('CreateCtrl', function($scope, $state, $cordovaCamera, Posts, Tags) {
  var init = function () {
    $scope.tags = Tags.tags;
    $scope.tagObj = {};
    $scope.tags.forEach(function(tag) {
      $scope.tagObj[tag] = {checked: false};
    });
    $scope.post = {tags: []};
  }

  init();
  $scope.toggleTag = function(tag) {
    $scope.tagObj[tag].checked = !$scope.tagObj[tag].checked;
  };
  $scope.takePhoto = function() {
    $cordovaCamera.getPicture({
      quality: 75,
      destinationType: Camera.DestinationType.DATA_URL,
      sourceType: Camera.PictureSourceType.CAMERA,
      encodingType: Camera.EncodingType.JPEG,
      popoverOptions: CameraPopoverOptions,
      targetWidth: 250,
      targetHeight: 250,
      saveToPhotoAlbum: false
    }).then(function(imageURI) {
      console.log(imageURI);
      $scope.imgSrc = "data:image/jpeg;base64," + imageURI;
      $scope.data = imageURI;
    }, function(err) {
      console.err(err);
    });
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
      data: $scope.data
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
