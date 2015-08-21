/**
 * @ngdoc overview
 * @name ProfileCtrl
 * @description
 *  Profile Controller. Controls navigating out of profiles, getting,
 *  and updating profiles
 */

angular.module('hackOverflow.profile', ['ionic'])

.controller('ProfileCtrl', function ($scope, $state, $stateParams, $rootScope, Profile, User) {
  /**
   * Scope variables
   * @property {bool} edit - Determines edit mode
   * @property {string} username - username of profile to render
   * @property {object} userData - profile data from server
   * @property {object} user - object to hold temporary changes to user's profile, which
   *    may be saved or discarded
  */
  $scope.edit = false;
  $scope.username = $state.params.username;
  // $scope.username = Profile.getProfile();
  $scope.userData = {};
  $scope.user = {};

  /**
   * Toggles edit mode
  */
  $scope.toggleEdit = function() {
    $scope.edit = !$scope.edit;
  };

  /**
   * Navigates back to view before opening up profile
  */
  $scope.goBack = function() {
    if ($rootScope.previousState && $rootScope.previousState.name) {
      $state.go($rootScope.previousState.name);
    } else {
      // default to app.posts
      $state.go('app.posts');
    }
  };


  /**
   * Check signed in user
   * @param {string} username - username to check against
  */
  $scope.checkUser = function() {
    return $scope.username === User.getUser();
  };

  /**
   * Get user info from the DB
   * Stores response data as $scope.userData
  */
  $scope.getProfile = function() {
    Profile.downloadProfile($scope.username)
      .then(function(userData) {
        $scope.userData = userData;
        $scope.user = angular.copy($scope.userData);
      });
  };

  $scope.cancelEditUser = function() {
    // restore original data
    $scope.user = angular.copy($scope.userData);
    $scope.toggleEdit();
  };

  $scope.updateUserInfo = function() {
    // get new data from ng-model bindings
    $scope.userData = angular.copy($scope.user);
    // update profile in database
    // toggle edit mode immediately
    $scope.toggleEdit();
    Profile.updateProfile($scope.username, $scope.userData._source)
      .then(function() {
        //complete
      });
  };

  // for debugging and testing
  $scope.log = function() {
    console.log('logged');
    console.log($scope.userData);
  };

  $scope.getProfile();
});