angular.module('hackOverflow.profile', ['ionic'])

.controller('ProfileCtrl', function ($scope, $state, $stateParams, History, Profile) {
  $scope.edit = false;
  $scope.toggleEdit = function() {
    $scope.edit = !$scope.edit;
  };

  // get username from Factory
  $scope.username = Profile.getUser();

  $scope.data = {};
  $scope.goBack = function() {
    console.log("going back to: ", History.lastState);
    $state.go(History.lastState);
  };

  // user data
  // $scope.data.blogUrl = $scope.user.profileInfo.blog;
  // $scope.data.websiteUrl = $scope.user.profileInfo.website;
  // $scope.data.hometown = $scope.user.profileInfo.hometown;
});