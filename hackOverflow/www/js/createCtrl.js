angular.module('hackOverflow.create', [])

.controller('CreateCtrl', function($scope, $cordovaCamera, Posts) {
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
      $scope.data = "data:image/jpeg;base64," + imageURI;
    }, function(err) {
      console.err(err);
    });
  };

  $scope.createPost = function() {
    $scope.post = {
      title: $scope.post.title,
      content: marked($scope.post.content),
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
