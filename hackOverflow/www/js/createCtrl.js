angular.module('hackOverflow.create', [])

.controller('CreateCtrl', function($scope, $cordovaCamera, Posts) {
  $scope.post = {tags: []};
  $scope.addTag = function(tag) {
    $scope.post.tags.push(tag);
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

  $scope.createPost = function() {
    var text = $scope.post.content || '';
    $scope.post = {
      title: $scope.post.title,
      content: marked(text),
      tags: $scope.post.tags, //format: Tags: ["asdf","asdf"]
      data: $scope.data
      }; //keys: title, content and tags
    Posts.addPost($scope.post)
    .then(function(resp) {
      $location.path('/post/'+resp._id); //takes user to the post they created.
    })
    .catch(function(error) {
      console.log(error);
    });
  };
});
