angular.module('hackOverflow.create', [])

.controller('CreateCtrl', function($scope, $cordovaCamera, Posts, Tags) {
  $scope.tags = Tags.tags;
  $scope.tagObj = {};
  $scope.tags.forEach(function(tag) {
    $scope.tagObj[tag] = {checked: false};
  });

  console.log($scope.tagObj);
  $scope.post = {tags: []};
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

  $scope.createPost = function() {
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
