angular.module('hackOverflow.profile', ['ionic'])

.controller('ProfileCtrl', function ($scope, $state, $stateParams, History, Profile) {
  $scope.edit = false;
  $scope.toggleEdit = function() {
    $scope.edit = !$scope.edit;
  };

  // get username from Factory
  $scope.username = Profile.getProfile();

  $scope.goBack = function() {
    console.log("going back to: ", History.lastState);
    $state.go(History.lastState);
  };

  /**
   * Get user info from the DB
   * Stores response data as $scope.userData
  */
  $scope.userData = {};
  $scope.user = {};
  $scope.getUserInfo = function() {
    console.log("CONTROLLER USERNAME", $scope.username);
    Profile.downloadProfile($scope.username)
      .then(function(userData) {
        $scope.userData = userData;
        $scope.user = angular.copy($scope.userData);
        console.log($scope.userData);
      });
  };

  $scope.cancelEditUser = function() {
    $scope.user = angular.copy($scope.userData);
    $scope.toggleEdit();
  };

  $scope.updateUserInfo = function() {
    $scope.userData = angular.copy($scope.user);
    Profile.updateProfile($scope.username, $scope.userData._source)
      .then(function() {
        $scope.toggleEdit();
      });
  };

  $scope.log = function() {
    console.log('logged');
    console.log($scope.userData);
  };

  $scope.getUserInfo();
});